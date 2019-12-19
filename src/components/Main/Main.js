import React, { Component } from "react";
import Search from "../Search/Search";
import giphy, { API_KEY } from "../../api/giphy";
import ResultsList from "../Results/ResultsList";
import styled, { css } from "styled-components";
import GlobalStyle from "../../styles/globalStyle";
import { colors } from "../../styles/constants";

const Headline = styled.h1`
  font-size: 80px;
  text-align: center;
  color: ${colors.primary};
  padding: 10px;
  text-decoration: none;
`;

const StatusLoading = styled.p`
  color: ${colors.loading};
  font-size: 25px;
  margin-top: 100px;
  text-align: center;

  ${props =>
    props.error &&
    css`
      color: ${colors.error};
      font-size: 20px;
    `}
`;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      isLoading: true,
      error: null,
      type: "gifs",
      noResults: false,
      searchSubmitted: false
    };
  }

  onSearchSubmit = async searchTerm => {
    this.setState({ searchSubmitted: true, error: null });

    try {
      const { data } = await giphy.get(
        `${this.state.type}/search?q=${searchTerm}&api_key=${API_KEY}&limit=20`
      );
      this.setState({
        results: data.data,
        isLoading: false,
        noResults: data.pagination.total_count ? false : true
      });
    } catch (error) {
      this.setState({
        error,
        isLoading: false
      });
    }

    this.setState({ isLoading: true, searchSubmitted: false });
  };

  onTypeChange = e => {
    this.setState({
      type: e.target.value
    });
  };

  render() {
    const {
      isLoading,
      results,
      type,
      noResults,
      error,
      searchSubmitted
    } = this.state;

    const renderResults = !error ? (
      <ResultsList results={results} noResults={noResults} />
    ) : (
      <StatusLoading error>There was a network error: {error}</StatusLoading>
    );

    return (
      <>
        <GlobalStyle />
        <Headline>Gif-it!</Headline>
        <Search
          onSubmit={this.onSearchSubmit}
          onTypeChange={this.onTypeChange}
          type={type}
        />
        <br />
        {isLoading && searchSubmitted ? (
          <StatusLoading>...loading...</StatusLoading>
        ) : (
          renderResults
        )}
      </>
    );
  }
}
