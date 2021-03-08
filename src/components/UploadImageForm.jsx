import React, { Component } from 'react';
import { Form, Button } from "react-bootstrap";

export default class UploadImageForm extends Component {
    render() {
        return (
            <div>
                <Form onSubmit={this.props.onUpload}>
                    <Form.Group controlId="musicianImg">
                        <Form.Control name="musicianImg" type="file" />
                    </Form.Group>
                    <Button className="button" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}
