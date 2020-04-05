import React from "react";

import {
  InputGroup,
  Form,
} from "react-bootstrap";

export default class InputTextArea extends React.Component {
  render() {
    return (
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>Chinese</InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          as="textarea"
          size="lg"
          onChange={this.props.handleInput}
          value={this.props.input}
        />
      </InputGroup>
    );
  }
}
