// @flow
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

import LookupTrigraphs from "../lib/LookupTrigraphs";
import { charsPerRow } from "../lib/util";

const highlights = ["#fdb9c9", "#ffdcbe", "#f6f3b5", "#bbf6f3", "#a7e0f4"];

const pickHighlight = (index: number) => {
  return highlights[index % highlights.length];
};

type Props = {
  input: string,
  lookupTrigraphs: LookupTrigraphs
};

type State = {
  characterFocus?: number
};

export default class TrigraphColumns extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const randomFocus = Math.floor(Math.random() * this.props.input.length);
    this.state = {
      characterFocus: randomFocus
    };
    this.handleCharacterFocus = this.handleCharacterFocus.bind(this);
    this.handleCharacterUnfocus = this.handleCharacterUnfocus.bind(this);
    this.handlePlay = this.handlePlay.bind(this);

    this.processInput = this.processInput.bind(this);
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

  handlePlay() {
    const toPlay = this.processInput().map((tuple) => {
      const [char, trigraph, chineseTrigraph, morseCode] = tuple;
      return morseCode;
    }).join()
    const audio = morse.audio(toPlay)
    audio.play();
  }

  processInput() {
    return [...this.props.input].map((char, index) => {
      const [trigraph, chineseTrigraph] = this.props.lookupTrigraphs.lookup(
        char
      );
      const morseCode = morse.encode(trigraph);
      return [char, trigraph, chineseTrigraph, morseCode];
    });
  }

  render() {
    const pairs = this.processInput().map((tuple, index) => {
      const [char, trigraph, chineseTrigraph, morseCode] = tuple;
      const customBadge = (
        <span>
          &nbsp;
          <OverlayTrigger
            key="right"
            placement="right"
            overlay={
              <Popover id="some-id">
                <Popover.Title as="h3">Custom encoding</Popover.Title>
                <Popover.Content>
                  We don't currently have actual trigraph data from code books,
                  so we've randomly assigned it a random trigraph to give you a
                  sense of what this would look like.
                </Popover.Content>
              </Popover>
            }
          >
            <Badge variant="primary">*</Badge>
          </OverlayTrigger>
        </span>
      );

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
          <div
            style={{ fontSize: "0.75em", textAlign: "center" }}
            className="text-monospace"
          >
            {chineseTrigraph}/{trigraph}
          </div>
          <div className="text-center">{customBadge}</div>
        </Col>
      );

      return [charBlock, morseCode];
    });

    const chunkedChars = chunk(
      pairs.map(pair => pair[0]),
      charsPerRow([...this.props.input].length)
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
        <Col xs={6}>
          <Row>
            <h4 className="center">Characters encoded to trigraphs...</h4>
          </Row>
          {chunkedChars}
        </Col>
        <Col xs={6}>
          <Row>
            <h4 className="center">
              ...then to Morse code <a onClick={this.handlePlay}>🎵</a>
            </h4>
          </Row>
          <Row>
            <div className="morse-code-block">{morseDivs}</div>
          </Row>
        </Col>
      </React.Fragment>
    );
  }
}
