// @flow
import React from "react";

import { Nav, Row, Spinner } from "react-bootstrap";

import { sanitizeInput } from "../lib/sanitizeInput";
import LookupTrigraphs from "../lib/LookupTrigraphs";

import Introduction from "./Introduction";
import InputTextArea from "./InputTextArea";
import TrigraphTable from "./TrigraphTable";

type AppState = {
  input: string,
  lookupTrigraphs: LookupTrigraphs,
  eventKey: string
};

export default class App extends React.Component<{}, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      input: "床前明月光，疑是地上霜。举头望明月，低头思故乡。",
      lookupTrigraphs: new LookupTrigraphs()
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleInput(event) {
    this.setState({ input: event.target.value });
  }

  handleSelect(eventKey) {
    this.setState({ eventKey: eventKey });
  }

  renderTabContent(eventKey) {
    if (eventKey == "digits") {
      return null;
    }
    return (
      <TrigraphTable
        input={sanitizeInput(this.state.input)}
        lookupTrigraphs={this.state.lookupTrigraphs}
      />
    );
  }

  render() {
    return (
      <React.Fragment>
        <Row>
          <Introduction />
        </Row>
        <Row>
          <h2 style={{ marginLeft: "auto", marginRight: "auto" }}>Try it!</h2>
        </Row>
        <Row>
          <InputTextArea
            handleInput={this.handleInput}
            input={this.state.input}
          />
        </Row>
        <Row>
          <Nav variant="tabs" onSelect={this.handleSelect}>
            <Nav.Item>
              <Nav.Link eventKey="digits">Digits</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="trigraph">Trigraphs</Nav.Link>
            </Nav.Item>
          </Nav>
        </Row>
        <Row>{this.renderTabContent(this.state.eventKey)}</Row>
      </React.Fragment>
    );
  }
}
