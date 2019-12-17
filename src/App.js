import React, { Component } from "react";
import Search from "./Search";
import giphy, { API_KEY } from "./api/giphy";
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      isLoading: true,
      error: null,
      type: "gifs",
      noResults: false
    };
  }

  onSearchSubmit = async searchTerm => {
    try {
      const { data } = await giphy.get(
        `${this.state.type}/search?q=${searchTerm}&api_key=${API_KEY}&limit=20`
      );
      this.setState({
        results: data,
        isLoading: false,
        noResults: data.pagination.total_count ? false : true
      });
      console.log(data);
    } catch (error) {
      this.setState({
        error,
        isLoading: false
      });
    }
  };

  onTypeChange = e => {
    this.setState({
      type: e.target.value
    });
  };

  render() {
    console.log(this.state.noResults);
    const { isLoading, results, type } = this.state;
    return (
      <div>
        <Search
          onSubmit={this.onSearchSubmit}
          onTypeChange={this.onTypeChange}
          type={type}
        />
        <br />
      </div>
    );
  }
}
