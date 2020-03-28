// @flow
import React from "react";
import {
  Container,
  Row,
  Col,
  InputGroup,
  Form,
  Spinner,
  Table
} from "react-bootstrap";
import morsify from "morsify";

import LookupDigits from "../lib/LookupDigits"
import DigitTable from "./DigitTable"

const chineseToDigitsURL =
  "https://raw.githubusercontent.com/franklinhu/chinese-in-morse-code/master/chinese_to_morse_digits.json?token=AACUPY345KF6W2R2NNPSN7K6RC37A";


type AppState = {
  input: string,
  lookupDigits: ?LookupDigits
};

export default class App extends React.Component<{}, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      input: "你好",
      lookupDigits: null
    };
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(event) {
    this.setState({ input: event.target.value });
  }

  componentWillMount() {
    fetch(chineseToDigitsURL)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ lookupDigits: new LookupDigits(responseJson) });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    if (this.state.lookupDigits === null) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    }
    return (
      <Container>
        <Row>
          <Col>
            <h1>Chinese over Morse Code</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Chinese</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                as="textarea"
                onChange={this.handleInput}
                value={this.state.input}
              />
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <DigitTable
            input={this.state.input}
            lookupDigits={this.state.lookupDigits}
          />
        </Row>
      </Container>
    );
  }
}
