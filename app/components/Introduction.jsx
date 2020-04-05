// @flow
import React from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default class Introduction extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Col>
          <div>
            <p>
              In the 1871, telegraph lines connected Hong Kong and Shanghai for
              the first time! Telegraph operators had used{" "}
              <a href="https://en.wikipedia.org/wiki/Morse_code" rel="external">
                Morse code
              </a>{" "}
              to send messages for many years, however it had been designed with
              English in mind and extended with special characters for other
              alphabetic lanauges. It was not obvious how to adapt the
              technology to character-based languages like Chinese, and it
              gradually evolved over time.
            </p>
          </div>
          <div>
            <strong>The Chinese Telegraph Code of 1871</strong>
            <p>
              H.C.F.C Schjellerup and Septime Auguste Viguier were given the job
              to come up with an encoding scheme, and they chose a "common usage
              model". They took the ~6,800 most commonly used Chinese characters
              and mapped each of them to a four digit number from 0000 to 9999.
            </p>
            <p>
              While this was conceptually simple, it had a number of
              limitations. The digits 0-9 have long Morse code sequences
              compared to alphabet letters, so using four digits for each
              Chinese character was expensive to encode.
            </p>
          </div>
        </Col>
        <Col>
          <div>
            <strong>Experiments with trigraphs</strong>
            <p>TODO</p>
          </div>
        </Col>
      </React.Fragment>
    );
  }
}
