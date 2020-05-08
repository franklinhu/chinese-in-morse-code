import React from "react";
import { Container, Nav, Navbar, Row, Col } from "react-bootstrap";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";

import App from "./App";

export default class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Container>
          <Navbar bg="light" variant="light">
            <Navbar.Brand className="center">Translate Chinese into Morse code!</Navbar.Brand>
          </Navbar>

          <Switch>
            <Route exact path="/" component={App} />
          </Switch>
          
          <div className="text-center">
            <span>Made with ❤️ by <a href="https://twitter.com/thisisfranklin">Franklin Hu</a></span>
          </div>
        </Container>
      </BrowserRouter>
    );
  }
}
