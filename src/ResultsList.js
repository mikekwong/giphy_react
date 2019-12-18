import React, { Component } from "react";
import PropTypes from "prop-types";
import Result from "./Result";
import styled from "styled-components";

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 50px;
  width: auto;
  text-align: center;
`;

const ResultsText = styled.h2`
  color: white;
  letter-spacing: 1px;
`;

export default class ResultsList extends Component {
  render() {
    const { results, noResults } = this.props;

    const resultsList = results.map(result => (
      <Result key={result.id} result={result} />
    ));

    const notFound = <p>No results.</p>;

    return (
      <ResultContainer>
        <ResultsText>Results:</ResultsText>
        {noResults ? notFound : resultsList}
      </ResultContainer>
    );
  }
}

ResultsList.propTypes = {
  results: PropTypes.array.isRequired,
  noResults: PropTypes.bool.isRequired
};
