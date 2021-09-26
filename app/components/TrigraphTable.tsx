import * as React from "react";
import { Badge, OverlayTrigger, Popover, Table } from "react-bootstrap";

import morse from "morse-decoder";

import LookupTrigraphs from "../lib/LookupTrigraphs";

type TrigraphTableProps = {
  input: string,
  lookupTrigraphs: LookupTrigraphs
};

export default class TrigraphTable extends React.Component<TrigraphTableProps> {
  render() {
    const rows = [...this.props.input].map((char, index) => {
      let [trigraph, chineseTrigraph] = this.props.lookupTrigraphs.lookup(char);
      let morseCode = morse.encode(trigraph);

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
                  These trigraphs are randomaly generated in your browser for
                  each character since we haven't gotten our hands on actual
                  codebooks yet.
                </Popover.Content>
              </Popover>
            }
          >
            <Badge variant="primary">custom</Badge>
          </OverlayTrigger>
        </span>
      );

      return (
        <tr key={index}>
          <td>{char}</td>
          <td className="text-monospace">
            {chineseTrigraph}/{trigraph}{customBadge}</td>
          <td className="text-monospace">{morseCode}</td>
        </tr>
      );
    });

    return (
      <Table>
        <thead>
          <tr>
            <th>Input</th>
            <th>Trigraph</th>
            <th>Morse code</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    );
  }
}
