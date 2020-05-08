// @flow
import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default class Sources extends React.Component {
  render() {
    return (
      <Col>
        <Row>
          <h4 className="center">Sources</h4>
        </Row>
        <Row>
          <div className="center">
            <span>
              <u>The Chinese Typewriter</u>, Thomas S. Mullaney
            </span>
          </div>
        </Row>
        <Row>
          <div className="center">
            <span>
              <a href="https://en.wiktionary.org/wiki/Appendix:Chinese_telegraph_code/Mainland_1983">
                Standard Telegraph Codebook (标准电码本（修订本）), 1983
              </a>
            </span>
          </div>
        </Row>
      </Col>
    );
  }
}
