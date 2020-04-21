import React from 'react';
import {Col, Container, Row, Form, Button } from "react-bootstrap";
import Axios from 'axios';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            prefix: "https://andrew-truong-webdev-assign4.herokuapp.com/url/",
            isCustomUrl: false,
            isDelete: false,
            formBasicInput: "",
            formBasicOutput: "",
            formCustomUrlBrand: "",
            formBasicEditInput: "",
            formBasicEditNewUrl: "",
            responseMessage: "",
            editResponseMessage: ""

        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.enableCustomUrl = this.enableCustomUrl.bind(this);
        this.enableDeleteUrl = this.enableDeleteUrl.bind(this);
        this.handleTypingChange = this.handleTypingChange.bind(this);
        this.getAllUrlMappings = this.getAllUrlMappings.bind(this);
        this.validateUrl = this.validateUrl.bind(this);
        this.addShortenedUrlBranded = this.addShortenedUrlBranded.bind(this);
        this.addShortenedUrlUnbranded = this.addShortenedUrlUnbranded.bind(this);
        this.insertUrlMapping = this.insertUrlMapping.bind(this);
        this.deleteShortenedUrl = this.deleteShortenedUrl.bind(this);
        this.editShortenedUrl = this.editShortenedUrl.bind(this);
    }

    handleTypingChange(event) {
        this.setState({
           [event.target.id] : event.target.value
        }, () => {
            console.log(this.state)
        });
    }

    handleSubmit(event) {
        console.log(event.target)
    }

    enableCustomUrl() {
        this.setState({
           isCustomUrl: !this.state.isCustomUrl
        });
    }

    enableDeleteUrl() {
        this.setState({
            isDelete: !this.state.isDelete
        });
    }

    validateUrl(url) {
        let pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        if (pattern.test(url)) {
            return true;
        }
        return false;
    }

    getAllUrlMappings() {
        Axios.post('/url', {shortenedUrl: "dontdoit", actualUrl: "https://youtube.com"})
            .then((result) => {
                console.log(result);
            })
    }

    getRandomString() {
        return Math.random().toString(36).substring(2, 6) + Math.random().toString(36).substring(2, 6);
    }


    insertUrlMapping() {
        this.setState({
            responseMessage: ""
        });
        if (this.validateUrl(this.state.formBasicInput)) {
            if (this.state.isCustomUrl) {
                this.addShortenedUrlBranded();
            } else {
                this.addShortenedUrlUnbranded();
            }
        } else {
            this.setState({
                responseMessage: "Something went wrong... please enter in a correct URL and try again"
            })
        }
    }

    addShortenedUrlUnbranded() {
        let randomString = this.getRandomString();
        Axios.post("/url", {
            shortenedUrl: randomString,
            actualUrl: this.state.formBasicInput
        }).then((response) => {
            this.setState({
                responseMessage: response.data,
                formBasicOutput: this.state.prefix + randomString
            })
        }).catch((err) => {
            this.setState({
                responseMessage: "An Error Has Occurred. Please try again"
            })
        });
    }

    addShortenedUrlBranded() {
        if (this.state.formCustomUrlBrand === "") {
            this.setState({
                responseMessage: "Custom Branded Url field is empty. Please enter something in and try again"
            })
        } else {
            Axios.post('/url', {
                shortenedUrl: this.state.formCustomUrlBrand, actualUrl: this.state.formBasicInput
            }).then((response) => {
                this.setState({
                    responseMessage: response.data,
                    formBasicOutput: this.state.prefix + this.state.formCustomUrlBrand
                })
            }).catch(err => {
                this.setState({
                    responseMessage: "An Error Has Occurred. Please try again"
                })
            })
        }
    }

    deleteShortenedUrl() {
        if (this.state.formBasicEditInput !== "") {
            let prefixSize = this.state.prefix.length;
            let extension = this.state.formBasicEditInput.substring(prefixSize);
            console.log(extension);
            Axios.delete('/url/' + extension)
                .then((response) => {
                    this.setState({
                        editResponseMessage: response.data
                    })
                })
                .catch(() => {
                    this.setState({
                        editResponseMessage: "The provided shortened URL is not recognized. Please try again"
                    })
                })
        }
    }

    editShortenedUrl() {
        if (this.state.formBasicEditInput !== "" && this.validateUrl(this.state.formBasicEditNewUrl)) {
            let prefixSize = this.state.prefix.length;
            let extension = this.state.formBasicEditInput.substring(prefixSize);
            console.log(extension);
            Axios.put('/url/' + extension, {
                shortenedUrl: this.state.formBasicEditInput,
                actualUrl: this.state.formBasicEditNewUrl
            }).then((response) => {
                this.setState({
                    editResponseMessage: response.data
                })
            }).catch(() => {
                this.setState({
                    editResponseMessage: "Something went wrong, please try again."
                })
            })
        } else {
            this.setState({
                editResponseMessage: "Either the provided shortened URL or the new destination URL is invalid." +
                    " Please try again."
            })
        }
    }




    render() {
        return (
            <Container>
                <Row>
                    <Col className="text-center">
                        <br/>
                        <h1>
                            URL Shortener
                        </h1>
                        <Form.Group controlId="formBasicInput">
                            <Form.Label>URL to be Shortened</Form.Label>
                            <Form.Control type="text"
                                          placeholder="Input URL"
                                          onChange={this.handleTypingChange}
                                          value={this.state.formBasicInput}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Check
                                type="checkbox"
                                id="custom-url-checkbox"
                                label="Custom Branded Url"
                                onClick={this.enableCustomUrl}
                            />
                        </Form.Group>
                        {
                            this.state.isCustomUrl ?
                                <Form.Group controlId="formCustomUrlBrand">
                                    <Form.Label>Custom URL Brand</Form.Label>
                                    <Form.Control type="text"
                                                  placeholder="Custom URL Brand"
                                                  value={this.state.formCustomUrlBrand}
                                                  onChange={this.handleTypingChange}
                                    />
                                </Form.Group> : ""
                        }
                        <Form.Group controlId="formBasicOutput">
                            <Form.Label>Output URL</Form.Label>
                            <Form.Control type="text" placeholder="Output URL" value={this.state.formBasicOutput}
                                onChange={this.handleTypingChange}/>
                        </Form.Group>
                        <Button type="button" variant="outline-primary" onClick={this.insertUrlMapping}>
                            Shorten
                        </Button>
                        <br/>
                        {
                            this.state.responseMessage
                        }
                    </Col>
                </Row>

                <Row>
                    <Col className="text-center">
                        <br/>
                        <br/>
                        <br/>
                        <h1>
                            Edit URL
                        </h1>
                        <Form.Group controlId="formBasicEditInput">
                            <Form.Label>Our Shortened URL</Form.Label>
                            <Form.Control type="text" placeholder="Our Shortened URL"
                                value={this.state.formBasicEditInput}
                                onChange={this.handleTypingChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Check
                                type="checkbox"
                                id="custom-url-checkbox"
                                label="Delete This URL"
                                onClick={this.enableDeleteUrl}
                            />
                        </Form.Group>
                        {
                            this.state.isDelete ?
                                "" :
                                <Form.Group controlId="formBasicEditNewUrl">
                                    <Form.Label>New Destination URL</Form.Label>
                                    <Form.Control type="text" placeholder="New Destination URL"
                                        value={this.state.formBasicEditNewUrl}
                                        onChange={this.handleTypingChange}/>
                                </Form.Group>
                        }
                        {
                            this.state.isDelete ?
                                <Button type="button" variant={"outline-danger"}
                                    onClick={this.deleteShortenedUrl}>Delete</Button> :
                                <Button type="button" variant={"outline-primary"}
                                    onClick={this.editShortenedUrl}>Submit Change</Button>
                        }
                        <br/>
                        {
                            this.state.editResponseMessage
                        }
                    </Col>
                    <br/>
                </Row>
            </Container>
        );
    }
}

export default App;
