import React, { Component } from "react";
import Head from "next/head";
import PropTypes from "prop-types";

import API from "../utils/api-client";
import { withSSR } from "./_ssr";

import Page from "../components/Page";
import { H1 } from "../components/Headers";

class CommentsScreen extends Component {
  static propTypes = {
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        comment: PropTypes.string.isRequired,
      }),
    ),
  };

  static defaultProps = {
    comments: [],
  };

  state = {
    comments: this.props.comments,
    text: "",
    loading: false,
    error: null,
  };

  handleTextChange = e => {
    this.setState({ text: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true, error: null });

    try {
      // Do some validations
      if (!this.state.text) {
        throw new Error("Empty comment not allowed");
      }
      // Send data to API endpoint
      await API.post("/api/comments", {
        comment: this.state.text,
      });
      // Get the updated list
      const { data: comments } = await API.get("/api/comments");

      // Update state
      this.setState({ comments, error: null, text: "" });
    } catch (err) {
      this.setState({ error: err });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { comments, loading, text, error } = this.state;

    return (
      <Page {...this.props}>
        <Head>
          <title>Comments | Koa + Next.js</title>
        </Head>
        <Page.Body>
          <H1>Comments:</H1>
          <ul>
            {comments.map(comment => (
              <li key={comment["date"]}>{comment["comment"]}</li>
            ))}
          </ul>
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={text} onChange={this.handleTextChange} />
            <input
              type="submit"
              value={loading ? "Loading..." : "Submit"}
              disabled={loading}
            />
          </form>
          {error && <p>Error: {error.message}</p>}
        </Page.Body>
      </Page>
    );
  }
}

export default withSSR()(CommentsScreen);
