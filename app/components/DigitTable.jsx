// @flow
import React from "react";
import { Badge, OverlayTrigger, Popover, Table } from "react-bootstrap";

import morsify from "morsify";

import LookupDigits from "../lib/LookupDigits";

type DigitTableProps = {
  input: string,
  lookupDigits: LookupDigits
};

export default class DigitTable extends React.Component<DigitTableProps> {
  render() {
    const rows = [...this.props.input].map((char, index) => {
      let [digits, isCustom] = this.props.lookupDigits.lookup(char);
      let morseCode;
      if (!digits) {
        digits = "unknown";
        morseCode = "unknown";
      } else {
        morseCode = morsify.encode(digits);
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
            <Badge variant="primary">custom</Badge>
          </OverlayTrigger>
        </span>
      ) : null;

      return (
        <tr key={index}>
          <td>{char}</td>
          <td className="text-monospace">
            {digits}
            {customBadge}
          </td>
          <td className="text-monospace">{morseCode}</td>
        </tr>
      );
    });

    return (
      <Table>
        <thead>
          <tr>
            <th>Input</th>
            <th>Digits</th>
            <th>Morse code</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    );
  }
}
