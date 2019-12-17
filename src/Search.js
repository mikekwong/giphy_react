import React, { Component } from "react";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ""
    };
  }

  onSearchSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.searchTerm);
  };

  onInputChange = e => {
    this.setState({
      searchTerm: e.target.value
    });
  };

  render() {
    const { onTypeChange, type } = this.props;
    return (
      <div>
        <form onSubmit={this.onSearchSubmit}>
          <input
            type="text"
            value={this.state.searchTerm}
            onChange={this.onInputChange}
          ></input>
          <fieldset>
            <legend>Search Type:</legend>
            <input
              id="gifs"
              onChange={onTypeChange}
              type="radio"
              value="gifs"
              checked={type === "gifs"}
            ></input>
            <label htmlFor="gifs">Gifs</label>
            <br></br>
            <input
              id="stickers"
              onChange={onTypeChange}
              type="radio"
              value="stickers"
              checked={type === "stickers"}
            ></input>
            <label htmlFor="stickers">Stickers</label>
          </fieldset>
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
}
