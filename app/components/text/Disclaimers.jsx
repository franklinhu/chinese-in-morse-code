// @flow
import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default class Disclaimers extends React.Component {
  render() {
    return (
      <Col>
        <Row>
          <h4 className="center">Disclaimers</h4>
        </Row>
        <Row>
          <div className="center">
            <p className="intro-text">
              While the data for the digit conversion is real, we haven't been
              able to source the codebooks with trigraph data, so it's currently
              randomly generated. This is to give you a sense of the general
              shape of the data, especially when compared to the digit-encoded
              version.
            </p>
            <p className="intro-text">
              The Latin to Chinese character mapping table used for trigraphs is
              real and uses traditional Chinese character, and since it predates
              the invention of simplified Chinese. Otherwise this app only
              supports simiplified Chinese.
            </p>
          </div>
        </Row>
      </Col>
    );
  }
}
