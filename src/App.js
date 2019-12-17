import React, { Component } from "react";
import giphy, { API_KEY } from "./api/giphy";
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      isLoading: true,
      error: null
    };
  }

  onSearchSubmit = async searchTerm => {
    try {
      const { data } = await giphy.get(
        `gifs/search?q=${searchTerm}&api_key=${API_KEY}&limit=20`
      );
      this.setState({
        results: data.items,
        isLoading: false
      });
    } catch (error) {
      this.setState({
        error,
        isLoading: false
      });
    }
  };

  render() {
    const { isLoading, results } = this.state;
    return <div></div>;
  }
}
