import React from "react";
import { Container, Nav, Navbar, Row, Col } from "react-bootstrap";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";

import Introduction from "./Introduction";
import Version1 from "./Version1";
import Version2 from "./Version2";
import App from "./App";

export default class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Container>
          <Navbar bg="light" variant="light">
            <Navbar.Brand>Translate Chinese into Morse code!</Navbar.Brand>
            <Nav variant="pills">
              <Nav.Item>
                <NavLink exact={true} to="/" className="nav-link">
                  Introduction
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink to="/v1" className="nav-link">
                  Version 1: Digits
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink to="/v2" className="nav-link">
                  Version 2: Trigraphs
                </NavLink>
              </Nav.Item>
            </Nav>
          </Navbar>

          <Switch>
            <Route exact path="/" component={Introduction} />
            <Route path="/v1" component={Version1} />
            <Route path="/v2" component={Version2} />
            <Route path="/beta" component={App} />
          </Switch>
        </Container>
      </BrowserRouter>
    );
  }
}
