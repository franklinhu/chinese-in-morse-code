import * as React from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default class Introduction extends React.Component {
  render() {
    return (
      <div className="center">
        <p className="intro-text">
          In the 1871, telegraph lines connected Hong Kong and Shanghai for the
          first time! Telegraph operators had used{" "}
          <a href="https://en.wikipedia.org/wiki/Morse_code" rel="external">
            Morse code
          </a>{" "}
          to send messages for many years, however it had been designed with
          English in mind and later extended with special characters for other
          alphabetic lanauges. Initially, it was not obvious how to adapt the
          technology to character-based languages like Chinese. This is a demo
          of the different encoding schemes that were developed!
        </p>
      </div>
    );
  }
}
