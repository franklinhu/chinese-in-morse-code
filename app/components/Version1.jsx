// @flow
import React from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Nav,
  Navbar,
  Spinner,
  Table
} from "react-bootstrap";
import morsify from "morsify";

import LookupDigits from "../lib/LookupDigits";
import {sanitizeInput} from "../lib/sanitizeInput";

import DigitTable from "./DigitTable";
import InputTextArea from "./InputTextArea";

const chineseToDigitsURL =
  "https://raw.githubusercontent.com/franklinhu/chinese-in-morse-code/master/data/chinese_to_morse_digits.json?token=AACUPYZOH7D2VSZRFS2JLE26SHHQE";

type AppState = {
  input: string,
  lookupDigits: ?LookupDigits
};

export default class Version1 extends React.Component<{}, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      input: "床前明月光，疑是地上霜。举头望明月，低头思故乡。",
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
      <React.Fragment>
        <Row>
          <InputTextArea
            handleInput={this.handleInput}
            input={this.state.input}
          />
        </Row>
        <Row>
          <DigitTable
            input={sanitizeInput(this.state.input)}
            lookupDigits={this.state.lookupDigits}
          />
        </Row>
      </React.Fragment>
    );
  }
}
