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
import morse from "morse-decoder";

import LookupDigits from "../lib/LookupDigits"


const dataTable = [["你", "abc"], ["好", "xyz"]];
const chineseToAlpha = new Map(dataTable.map(arr => [arr[0], arr[1]]));

const chineseToAlphaAscii = (s: String) => {
  return [...s]
    .map((char: String) => chineseToAlpha.get(char))
    .reduce((acc, x) => acc + x, "");
};

type ConverterProps = {
  lookupDigits: LookupDigits
};

class Converter extends React.Component<{ input: string }> {

  chineseToDigitAscii(value) {
    return [...value]
      .map((char: String) => this.props.lookupDigits.lookup(char)[0])
      .reduce((acc, x) => acc + x, "");
  }

  render() {
    const digits = this.chineseToDigitAscii(this.props.input);
    const digitsMorse = morse.encode(digits);
    const alpha = chineseToAlphaAscii(this.props.input);
    const alphaMorse = morse.encode(alpha);
    return (
      <React.Fragment>
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