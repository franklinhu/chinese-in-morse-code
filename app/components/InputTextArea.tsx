import * as React from "react";

import { Button, InputGroup, Form } from "react-bootstrap";

type TypeHandler = (name: string) => void;
type InputHandler = (event: any) => void;

type Props = {
  handleType: TypeHandler
  handleInput: InputHandler
  input: string
};

type State = {
  selected: string
};

export default class InputTextArea extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selected: "digits"
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleButton = this.handleButton.bind(this);
  }

  handleInput(event) {
    // Resize the input form element automatically
    event.target.style.height = 'auto';
    event.target.style.height = event.target.scrollHeight + 'px';

    // Pass along the event
    this.props.handleInput(event);
  }

  handleButton(name) {
    return () => {
      this.setState({ selected: name });
      this.props.handleType(name);
    };
  }

  render() {
    const digitsButtonVariant = this.state.selected === "digits" ? "primary" : "outline-primary";
    const trigraphsButtonVariant = this.state.selected === "trigraphs" ? "primary" : "outline-primary";

    return (
      <React.Fragment>
        <InputGroup>
          <Form.Control
            as="textarea"
            size="lg"
            className="input-text-area center"
            onChange={this.handleInput}
            style={{ maxWidth: "50%" }}
            value={this.props.input}
          />
        </InputGroup>
        <div className="encoding-selector">
          <InputGroup>
            <span style={{ margin: "auto 5px" }}>Encode with</span>
            <Button
              variant={digitsButtonVariant}
              onClick={this.handleButton("digits")}
            >
              digits
            </Button>
            <span style={{ margin: "auto 5px" }}>or</span>
            <Button
              variant={trigraphsButtonVariant}
              onClick={this.handleButton("trigraphs")}
            >
              trigraphs
            </Button>
          </InputGroup>
        </div>
      </React.Fragment>
    );
  }
}
