import App, { Container } from "next/app";
import React from "react";
import { ThemeProvider } from "styled-components";

import theme from "../themes/light";

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Container>
    );
  }
}
