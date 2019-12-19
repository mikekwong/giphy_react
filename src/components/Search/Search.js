import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import media from "../../styles/media";
import { fonts, colors } from "../../styles/constants";

const SearchContainer = styled.div`
  display: block;
  text-align: center;
`;

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
`;

const Type = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  font-size: 20px;
  color: white;
  width: 100%;
`;

const TypeLabel = styled.label`
  font-size: 20px;
  color: white;
  cursor: pointer;
`;

const TypeInput = styled.input`
  margin: 2px 10px;
  cursor: pointer;
`;

const Warning = styled.p`
  color: ${colors.warning};
`;

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
`;

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      hasSubmitted: null
    };
  }

  onSearchSubmit = e => {
    e.preventDefault();
    if (this.state.searchTerm) {
      this.setState({ hasSubmitted: true });
      this.props.onSubmit(this.state.searchTerm);
    } else {
      this.setState({ hasSubmitted: false });
    }
  };

  onInputChange = e => {
    this.setState({
      searchTerm: e.target.value
    });
  };

  render() {
    const { onTypeChange, type } = this.props;
    const { hasSubmitted, searchTerm } = this.state;

    const validation = hasSubmitted === false && (
      <Warning>This field can't be empty!</Warning>
    );

    return (
      <SearchContainer>
        <form onSubmit={this.onSearchSubmit}>
          <Input
            placeholder="Search all Gifs and Stickers"
            type="text"
            value={searchTerm}
            onChange={this.onInputChange}
          ></Input>
          {validation}
          <Type>
            <legend>Type:</legend>
            <TypeInput
              id="gifs"
              onChange={onTypeChange}
              type="radio"
              value="gifs"
              checked={type === "gifs"}
            ></TypeInput>
            <TypeLabel htmlFor="gifs">Gifs</TypeLabel>
            <br></br>
            <TypeInput
              id="stickers"
              onChange={onTypeChange}
              type="radio"
              value="stickers"
              checked={type === "stickers"}
            ></TypeInput>
            <TypeLabel htmlFor="stickers">Stickers</TypeLabel>
          </Type>
          <div>
            <Button type="submit">
              {type === "gifs" ? "Gif-it-to-me!" : "I love Stickers!"}
            </Button>
          </div>
        </form>
      </SearchContainer>
    );
  }
}

Search.propTypes = {
  type: PropTypes.oneOf(["gifs", "stickers"]).isRequired,
  onTypeChange: PropTypes.func.isRequired
};
