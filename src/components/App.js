import React, { Component } from "react";
import Search from "./Search/Search";
import giphy, { API_KEY } from "../api/giphy";
import ResultsList from "./Results/ResultsList";
import styled, { css } from "styled-components";
import GlobalStyle from "../styles/globalStyle";
import { colors } from "../styles/constants";

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

const PageNumbersContainer = styled.div`
  text-align: center;
  margin: 80px 0 0 0;
`;

const Page = styled.span`
  color: #fff;
  margin: 0 10px;
  font-size: 30px;
  color: ${colors.neonpink};

  ${props =>
    props.number &&
    css`
      cursor: pointer;
      &:hover {
        color: #fff;
      }
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
      searchSubmitted: false,
      searchTerm: "",
      total: null,
      currentPage: 1
    };
  }

  componentDidMount() {
    let data = sessionStorage.getItem("results");
    this.setState(
      data !== null
        ? JSON.parse(data)
        : {
            results: [],
            isLoading: true,
            error: null,
            type: "gifs",
            noResults: false,
            searchSubmitted: false,
            searchTerm: "",
            total: 0,
            currentPage: 1
          }
    );
  }

  onSearchSubmit = async (searchTerm, pageNumber = 1) => {
    this.setState({
      searchSubmitted: true,
      error: null,
      searchTerm: searchTerm
    });

    try {
      const { data } = await giphy.get(
        `${this.state.type}/search?q=${searchTerm}&offset=${pageNumber}&api_key=${API_KEY}`
      );
      this.setState(
        {
          results: data.data,
          total: data.pagination.total_count,
          currentPage: pageNumber,
          isLoading: false,
          noResults: data.pagination.total_count ? false : true
        },
        () => sessionStorage.setItem("results", JSON.stringify(this.state))
      );
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
      searchSubmitted,
      searchTerm,
      total,
      currentPage
    } = this.state;

    const pagination = () => {
      const pageNumbers = [];
      if (total > 0) {
        for (let i = 1; i < Math.ceil(total / 25); i++) {
          pageNumbers.push(i);
        }
        return pageNumbers.map(number => {
          if (number >= currentPage - 2 && number <= currentPage + 2) {
            return (
              <Page
                number
                key={number}
                style={{ fontSize: currentPage === number ? "60px" : "" }}
                onClick={() => this.onSearchSubmit(searchTerm, number)}
              >
                {number}
              </Page>
            );
          }
        });
      }
    };

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
        {results.length && (
          <PageNumbersContainer>
            <Page>&laquo;</Page>
            {pagination()}
            <Page>&raquo;</Page>
          </PageNumbersContainer>
        )}
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
