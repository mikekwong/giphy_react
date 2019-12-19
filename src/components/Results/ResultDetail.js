import React, { Component } from "react";
import giphy, { API_KEY } from "../../api/giphy";

export default class ResultDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      metaData: [],
      isLoading: true,
      error: null
    };
  }

  async componentDidMount() {
    const { id } = this.props.match.params;

    try {
      const { data } = await giphy.get(`/gifs/${id}?api_key=${API_KEY}`);
      this.setState({
        metaData: data.data,
        isLoading: false
      });
    } catch (error) {
      this.setState({
        error,
        isLoading: false
      });
    }
  }

  render() {
    const {
      metaData: { source, title }
    } = this.state;
    console.log(this.state.metaData);
    return (
      <div>
        <p>{title}</p>
        <img src={source} />
      </div>
    );
  }
}
