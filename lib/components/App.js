const React = require("react");

class InputTextArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "something"
    };
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return React.createElement("textarea", { value: this.state.value, onChange: this.handleChange });
  }
}

class Converter extends React.Component {

  handleInput(str) {}

  render() {
    return React.createElement(InputTextArea, { inputHandler: this.handleInput });
  }
}

/* the main page for the index route of this app */
const App = function () {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "h1",
      null,
      "Chinese in Morse Code"
    ),
    React.createElement(Converter, null)
  );
};

module.exports = App;