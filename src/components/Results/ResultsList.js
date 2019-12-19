import React from "react";
import PropTypes from "prop-types";
import Result from "./Result";
import styled, { css } from "styled-components";
import media from "../../styles/media";

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 25px;
  width: auto;
  text-align: center;
  width: 100;

  ${media.mobileLandscape`
	flex-direction: row;
	flex-wrap: wrap;
	`}
`;

const Text = styled.h2`
  color: white;
  width: 100%;

  ${props =>
    props.resultsText &&
    css`
      font-size: 30px;
    `}
`;

const ResultsList = ({ results, noResults }) => {
  const resultsList = results.map(result => (
    <Result key={result.id} result={result} />
  ));

  const notFound = <Text>None found.</Text>;

  return (
    <ResultContainer>
      <Text resultsText>Results:</Text>
      {noResults ? notFound : resultsList}
    </ResultContainer>
  );
};

ResultsList.propTypes = {
  results: PropTypes.array.isRequired,
  noResults: PropTypes.bool.isRequired
};

export default ResultsList;
