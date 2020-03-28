// @flow
import React from "react";
import { Badge, Table } from "react-bootstrap";

import morsify from "morsify";

import LookupDigits from "../lib/LookupDigits";

type DigitTableProps = {
  input: string,
  lookupDigits: LookupDigits
};

export default class DigitTable extends React.Component<DigitTableProps> {
  render() {
    const rows = [...this.props.input].map(char => {
      let [digits, isCustom] = this.props.lookupDigits.lookup(char);
      let morseCode;
      if (!digits) {
        digits = "unknown";
        morseCode = "unknown";
      } else {
        morseCode = morsify.encode(digits);
      }

      const customBadge = isCustom ? (
        <span>&nbsp;<Badge variant="primary">custom</Badge></span>
      ) : null;

      return (
        <tr>
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
