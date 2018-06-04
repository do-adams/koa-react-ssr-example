import React from "react";

import { withSSR } from "./_ssr";

import Page from "../components/Page";
import { H1 } from "../components/Headers";

const HomeScreen = props => (
  <Page {...props}>
    <Page.Body>
      <H1>Hi there!</H1>
      <p>Hey, checkout the comments section:</p>
      <p>
        <a href="/comments">Show comments</a>
      </p>
    </Page.Body>
  </Page>
);

export default withSSR()(HomeScreen);
