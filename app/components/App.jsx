// @flow
import React from "react";
import { Container, Row, Col, InputGroup, Form } from "react-bootstrap";
import morsify from "morsify";

import * as ChineseToDigits from "./chinese_to_digits.json"

const dataTable = [
  ["你", "00001", "abc"],
  ["好", "99999", "xyz"],
];

// const chineseToDigit = new Map(dataTable.map((arr) => [arr[0], arr[1]]));
const chineseToAlpha = new Map(dataTable.map((arr) => [arr[0], arr[2]]));

const chineseToDigitAscii = (s: String) => {
  return [...s].map((char: String) => ChineseToDigits[char]).reduce((acc, x) => acc + x, '');
};

const chineseToAlphaAscii = (s: String) => {
  return [...s].map((char: String) => chineseToAlpha.get(char)).reduce((acc, x) => acc + x, '');
};

type ConverterState = {
  value: string
};

class Converter extends React.Component<{}, ConverterState> {
  constructor(props) {
    super(props);
    this.state = {
      value: "你好"
    };
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    const digits = chineseToDigitAscii(this.state.value);
    const digitsMorse = morsify.encode(digits);
    const alpha = chineseToAlphaAscii(this.state.value)
    const alphaMorse = morsify.encode(alpha);
    return (
      <React.Fragment>
        <Col>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Chinese</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              as="textarea"
              aria-label="你好"
              onChange={this.handleInput}
              value={this.state.value}
            />
          </InputGroup>
        </Col>
        <Col>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>V1 (to digits)</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control as="textarea" value={digitsMorse} disabled />
          </InputGroup>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>V2 (to alpha)</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control as="textarea" value={alphaMorse} disabled />
          </InputGroup>
        </Col>
      </React.Fragment>
    );
  }
}

export default class App extends React.Component<{}> {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1>Chinese over Morse Code</h1>
          </Col>
        </Row>
        <Row>
          <Converter />
        </Row>
      </Container>
    );
  }
}
