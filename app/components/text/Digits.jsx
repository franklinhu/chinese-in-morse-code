// @flow
import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default class Digits extends React.Component {
  render() {
    return (
      <Col>
        <Row>
          <h4 className="center">How does digit encoding work?</h4>
        </Row>
        <Row>
          <div className="center">
            <p className="intro-text">
              In 1871, H.C.F.C Schjellerup and Septime Auguste Viguier were
              given the job to come up with an encoding scheme, and they chose a
              "common usage model". They took the ~6,800 most commonly used
              Chinese characters and mapped each of them to a four digit number
              from 0000 to 9999. This was known as the Chinese Telegraph Code of
              1871.
            </p>
            <p className="intro-text">
              While this was conceptually simple, it had a number of
              limitations. The digits 0-9 have long Morse code sequences
              compared to alphabet letters, so using four digits for each
              Chinese character was expensive to encode.
            </p>
          </div>
        </Row>
      </Col>
    );
  }
}
