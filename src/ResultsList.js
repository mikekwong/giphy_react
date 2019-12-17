import React, { Component } from "react";
import Result from "./Result";

export default class ResultsList extends Component {
  render() {
    const { results, noResults } = this.props;

    const resultsList = results.map(result => (
      <Result key={result.id} result={result} />
    ));

    const notFound = <div>No results.</div>;

    return <>{noResults ? notFound : resultsList}</>;
  }
}
