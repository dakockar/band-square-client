import React, { Component } from 'react';
import { Form, Button } from "react-bootstrap";

export default class UploadImageForm extends Component {
    render() {
        return (
            <div>
                <Form className="upload-form" onSubmit={this.props.onUpload}>
                    <Form.Group controlId="userImg">
                        <Form.File name="userImg" type="file" label="Upload picture" />
                    </Form.Group>
                    <Button className="button" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}
