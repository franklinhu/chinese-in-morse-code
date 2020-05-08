// @flow
import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { chunk } from "lodash";

import { LetterToChinese } from "../../lib/LookupTrigraphs";

export default class Trigraphs extends React.Component {
  render() {
    const mapping = Object.keys(LetterToChinese).map(letter => {
      const chinese = LetterToChinese[letter];
      return (
        <div key={letter} className="text-monospace text-center">
          {letter}: {chinese}
        </div>
      );
    });

    const chunked = chunk(mapping, 7).map((pairChunk, index) => {
      return <Col key={index}>{pairChunk}</Col>;
    });

    return (
      <React.Fragment>
        <Col>
          <Row>
            <h4 className="center">How does trigraph encoding work?</h4>
          </Row>
          <Row>
            <div className="center">
              <p className="intro-text">
                Instead of mapping each character onto four digits, trigraph
                encoding instead uses three alphabet letter. Letters are
                relatively short Morse code sequences, so not only improved
                transmission times lengths but also allowed a greater number of
                characters to be represented (26^3 17,576).
              </p>
              <p className="intro-text">
                When trigraph encoding was first devised, the Latin alphabet was
                not widely taught or understood. To work around this, each
                alphabet letter was mapped to a phoentically similar Chinese
                character:
              </p>
              <Row>{chunked}</Row>
            </div>
          </Row>
        </Col>
      </React.Fragment>
    );
  }
}
