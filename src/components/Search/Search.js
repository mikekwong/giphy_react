import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import media from '../../styles/media'
import { fonts, colors } from '../../styles/constants'

const SearchContainer = styled.div`
  display: block;
  text-align: center;
`

const Input = styled.input`

  border-style: none;
  width: 250px;
  height: 40px;
  border-radius: 5px;
  transition: all 0.4s;
  padding-left: 15px;
  font-size: 18px;

  &:hover {
    background-color: ${colors.lightgray};
  }

  &:focus {
    width: 300px;
	}

	${media.mobileLandscape`
	width: 350px;
	&:focus {
    width: 450px;
  }
	`}

  ${media.tabletPortrait`
	width: 550px;
	&:focus {
    width: 650px;
  }
	`}

  ${media.tabletLandscape`
	width: 750px;
	&:focus {
    width: 850px;
  }
	`}

  ${media.laptops`
	width: 950px;
	&:focus {
    width: 1050px;
  }
	`}
`

const Type = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  font-size: 20px;
  color: white;
  width: 100%;
`

const TypeLabel = styled.label`
  font-size: 20px;
  color: white;
  cursor: pointer;
`

const TypeInput = styled.input`
  margin: 2px 10px;
  cursor: pointer;
`

const Warning = styled.p`
  color: ${colors.warning};
`

const Button = styled.button`
  margin-top: 15px;
  ${fonts.wendyOne};
  font-size: 20px;
  background-color: ${colors.primary};
  border-style: none;
  width: 180px;
  height: 40px;
  padding-top: 2px;
  cursor: pointer;
  transition: 0.4s all;
  border-radius: 5px;

  &:hover {
    background-color: ${colors.neonpink};
  }
`

const Search = ({ onTypeChange, type, onSubmit }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [hasSubmitted, setHasSubmitted] = useState(null)

  useEffect(() => {
    let data = sessionStorage.getItem('query')
    if (data !== null) {
      setSearchTerm(JSON.parse(data))
      setHasSubmitted(JSON.parse(data))
    } else {
      setSearchTerm('')
      setHasSubmitted(null)
    }
  }, [])

  const onSearchSubmit = e => {
    e.preventDefault()
    if (searchTerm) {
      setHasSubmitted(true)

      sessionStorage.setItem('query', JSON.stringify(searchTerm, hasSubmitted))

      onSubmit(searchTerm)
    } else {
      setHasSubmitted(false)
    }
  }

  const validation = hasSubmitted === false && (
    <Warning>This field can't be empty!</Warning>
  )

  return (
    <SearchContainer>
      <form onSubmit={onSearchSubmit}>
        <Input
          placeholder='Search all Gifs and Stickers'
          type='text'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        {validation}
        <Type>
          <legend>Type:</legend>
          <TypeInput
            id='gifs'
            onChange={onTypeChange}
            type='radio'
            value='gifs'
            checked={type === 'gifs'}
          />
          <TypeLabel htmlFor='gifs'>Gifs</TypeLabel>
          <br />
          <TypeInput
            id='stickers'
            onChange={onTypeChange}
            type='radio'
            value='stickers'
            checked={type === 'stickers'}
          />
          <TypeLabel htmlFor='stickers'>Stickers</TypeLabel>
        </Type>
        <div>
          <Button type='submit'>
            {type === 'gifs' ? 'Gif-it-to-me!' : 'I love Stickers!'}
          </Button>
        </div>
      </form>
    </SearchContainer>
  )
}

Search.propTypes = {
  type: PropTypes.oneOf(['gifs', 'stickers']).isRequired,
  onTypeChange: PropTypes.func.isRequired
}

export default Search
