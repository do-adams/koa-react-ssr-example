import React from "react";
import PropTypes from "prop-types";

import { withSSR } from "../_ssr";

import Page from "../../components/Page";
import { H1 } from "../../components/Headers";

const Error400Page = ({ statusCode, error, message, ...props }) => (
  <Page {...props}>
    <Page.Body>
      <H1>
        Error {statusCode}: {error}
      </H1>
      <p>{message}</p>
    </Page.Body>
  </Page>
);

Error400Page.propTypes = {
  statusCode: PropTypes.number.isRequired,
  error: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default withSSR()(Error400Page);
