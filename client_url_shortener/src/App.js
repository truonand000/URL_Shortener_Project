import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Col, Container, Row, Form, Button } from "react-bootstrap";

function App() {
  return (
      <Container>
          <Row>
              <Col className="text-center">
                  <h1>
                      URL Shortener
                  </h1>
                  <Form>
                      <Form.Group controlId="formBasicInput">
                          <Form.Label>URL to be Shortened</Form.Label>
                          <Form.Control type="email" placeholder="Input URL" />
                      </Form.Group>

                      <Form.Group controlId="formBasicOutput">
                          <Form.Label>Output URL</Form.Label>
                          <Form.Control type="email" placeholder="Output URL" />
                      </Form.Group>
                      <Button variant="primary" type="submit">
                          Shorten
                      </Button>
                  </Form>
              </Col>
          </Row>
      </Container>
  );
}

export default App;
