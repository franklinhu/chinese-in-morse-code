import * as React from "react";

import { Nav, Row, Col, Spinner, Button } from "react-bootstrap";

import { fetchChineseToDigitsJson } from "../lib/fetchChineseToDigitsJson";
import { sanitizeInput } from "../lib/sanitizeInput";
import LookupDigits from "../lib/LookupDigits";
import LookupTrigraphs from "../lib/LookupTrigraphs";
import { GetRandomPhrase } from "../lib/phrases";

import Introduction from "./text/Introduction";
import DigitsText from "./text/Digits";
import TrigraphsText from "./text/Trigraphs";
import Disclaimers from "./text/Disclaimers";
import Sources from "./text/Sources";

import InputTextArea from "./InputTextArea";
import DigitColumns from "./DigitColumns";
import DigitTable from "./DigitTable";
import TrigraphColumns from "./TrigraphColumns";
import TrigraphTable from "./TrigraphTable";

type AppState = {
  input: string,
  lookupDigits: LookupDigits,
  lookupTrigraphs: LookupTrigraphs,
  eventKey: string
};

export default class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);

    const phrase = GetRandomPhrase();
    this.state = {
      input: phrase,
      lookupTrigraphs: new LookupTrigraphs(),
      lookupDigits: null,
      eventKey: "digits"
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleType = this.handleType.bind(this);
    this.handleRefreshInput = this.handleRefreshInput.bind(this);
  }

  componentWillMount() {
    fetchChineseToDigitsJson()
      .then(responseJson => {
        this.setState({ lookupDigits: new LookupDigits(responseJson) });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleInput(event: any) {
    this.setState({ input: event.target.value });
  }

  handleSelect(eventKey: string) {
    this.setState({ eventKey: eventKey });
  }

  handleType(name: string) {
    this.setState({ eventKey: name });
  }

  handleRefreshInput() {
    this.setState((state) => {
      const newInput = GetRandomPhrase(state.input);
      return { input: newInput }
    });
  }

  renderTabContent(eventKey: string) {
    const input = sanitizeInput(this.state.input);
    if (eventKey == "trigraphs") {
      return (
        <React.Fragment>
          <Row xs={1} md={2} className="page-section">
            <TrigraphColumns
              input={input}
              lookupTrigraphs={this.state.lookupTrigraphs}
            />
          </Row>
          <Row>
            <TrigraphsText />
          </Row>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <Row xs={1} md={2} className="page-section">
          <DigitColumns input={input} lookupDigits={this.state.lookupDigits} />
        </Row>
        <Row className="page-section">
          <DigitsText />
        </Row>
      </React.Fragment>
    );
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
        <Row className="page-section">
          <Introduction />
        </Row>
        <Row>
          <h3 className="center">Try it! <a onClick={this.handleRefreshInput}>🔁</a></h3>

        </Row>
        <Row>
          <InputTextArea
            handleInput={this.handleInput}
            input={this.state.input}
            handleType={this.handleType}
          />
        </Row>

        {this.renderTabContent(this.state.eventKey)}
        <Row className="page-section">
          <Disclaimers />
        </Row>
        <Row className="page-section">
          <Sources />
        </Row>
      </React.Fragment>
    );
  }
}
