import * as React from "react";
import { chunk } from "lodash";
import {
  Badge,
  Col,
  Form,
  OverlayTrigger,
  Popover,
  Row,
  Table
} from "react-bootstrap";

import morse from "morse-decoder";

import LookupDigits from "../lib/LookupDigits";
import { charsPerRow } from "../lib/util"

const highlights = ["#fdb9c9", "#ffdcbe", "#f6f3b5", "#bbf6f3", "#a7e0f4"];

const pickHighlight = (index: number) => {
  return highlights[index % highlights.length];
};

type DigitColumnsProps = {
  input: string,
  lookupDigits: LookupDigits
};

type DigitColumnsState = {
  characterFocus?: number
};

export default class DigitColumns extends React.Component<
  DigitColumnsProps,
  DigitColumnsState
> {
  constructor(props) {
    super(props);

    const randomFocus = Math.floor(Math.random() * this.props.input.length);
    this.state = {
      characterFocus: randomFocus
    };
    this.handleCharacterFocus = this.handleCharacterFocus.bind(this);
    this.handleCharacterUnfocus = this.handleCharacterUnfocus.bind(this);
  }

  handleCharacterFocus(index) {
    return event => {
      this.setState({ characterFocus: index });
    };
  }

  handleCharacterUnfocus(index) {
    return event => {
      this.setState((state, props) => {
        if (state.characterFocus === index) {
          // state.characterFocus = null;
        }

        return state;
      });
    };
  }

  render() {
    const pairs = [...this.props.input].map((char, index) => {
      let [digits, isCustom] = this.props.lookupDigits.lookup(char);
      let morseCode;
      if (!digits) {
        digits = "unknown";
        morseCode = "unknown";
      } else {
        morseCode = morse.encode(digits);
      }

      const customBadge = isCustom ? (
        <span>
          &nbsp;
          <OverlayTrigger
            key="right"
            placement="right"
            overlay={
              <Popover id="some-id">
                <Popover.Title as="h3">Custom encoding</Popover.Title>
                <Popover.Content>
                  This character isn't in the{" "}
                  <a
                    href="https://en.wiktionary.org/wiki/Appendix:Chinese_telegraph_code/Mainland_1983"
                    rel="_external"
                  >
                    Standard Telegraph Codebook (1983)
                  </a>
                  , so we've randomly assigned it an unused number. Codebooks
                  had empty spaces that allowed for adaptation over time.
                </Popover.Content>
              </Popover>
            }
          >
            <Badge variant="primary">*</Badge>
          </OverlayTrigger>
        </span>
      ) : null;

      const focusClass =
        this.state.characterFocus === index ? "character-focus" : null;

      const style =
        this.state.characterFocus === index
          ? { backgroundColor: pickHighlight(index) }
          : {};

      const charBlock = (
        <Col
          key={index}
          datakey={index}
          onMouseEnter={this.handleCharacterFocus(index)}
          onMouseLeave={this.handleCharacterUnfocus(index)}
          className={focusClass}
          style={style}
        >
          <div style={{ fontSize: "1.2em", textAlign: "center" }}>{char}</div>
          <div style={{ fontSize: "0.75em", textAlign: "center" }}>
            {digits}{customBadge}
          </div>
        </Col>
      );

      return [charBlock, morseCode];
    });

    const chunkedChars = chunk(
      pairs.map(pair => pair[0]),
      charsPerRow(this.props.input.length)
    ).map((charChunk, index) => {
      return (
        <Row key={index} className="encoded-charater-row-body">
          {charChunk}
        </Row>
      );
    });

    const morseDivs = pairs.map((pair, index) => {
      const style =
        this.state.characterFocus === index
          ? { backgroundColor: pickHighlight(index) }
          : {};
      return (
        <span
          key={index}
          style={style}
          className="text-monospace"
          onMouseEnter={this.handleCharacterFocus(index)}
          onMouseLeave={this.handleCharacterUnfocus(index)}
        >
          {pair[1]}
        </span>
      );
    });

    return (
      <React.Fragment>
        <Col>
          <Row>
            <h4 className="center">Characters encoded to digits...</h4>
          </Row>
          {chunkedChars}
        </Col>
        <Col>
          <Row>
            <h4 className="center">...then to Morse code</h4>
          </Row>
          <Row>
            <div className="morse-code-block">{morseDivs}</div>
          </Row>
        </Col>
      </React.Fragment>
    );
  }
}
