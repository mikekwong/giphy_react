import React, { Component } from "react";
import Result from "./Result";

export default class ResultsList extends Component {
  render() {
    const { results } = this.props;
    const resultsList = results.map(result => (
      <Result key={result.id} result={result} />
    ));

    return <div>{resultsList}</div>;
  }
}
