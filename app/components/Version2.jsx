import React from "react";

import {Row, Spinner} from "react-bootstrap";

import {sanitizeInput} from "../lib/sanitizeInput";
import LookupTrigraphs from "../lib/LookupTrigraphs";

import InputTextArea from "./InputTextArea";
import TrigraphTable from "./TrigraphTable";

export default class Version2 extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      input: "床前明月光，疑是地上霜。举头望明月，低头思故乡。",
      lookupTrigraphs: new LookupTrigraphs()
    };
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(event) {
    this.setState({ input: event.target.value });
  }
  
  
  render() {
    return (
      <React.Fragment>
        <Row>
          <InputTextArea
            handleInput={this.handleInput}
            input={this.state.input}
          />
        </Row>
        <Row>
          <TrigraphTable
            input={sanitizeInput(this.state.input)}
            lookupTrigraphs={this.state.lookupTrigraphs}
          />
        </Row>
      </React.Fragment>
    );
  }
}
