import React, { Component } from 'react';
import { Form, Button } from "react-bootstrap";


export default class AddVenueForm extends Component {
    render() {
        const { onAdd } = this.props;


        return (
            <div>
                <Form onSubmit={onAdd}>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control name="title" type="text" placeholder="Enter title" />
                    </Form.Group>
                    <Form.Group controlId="location">
                        <Form.Label>Location</Form.Label>
                        <Form.Control name="location" type="text" placeholder="Location" />
                    </Form.Group>
                    <Form.Group controlId="size">
                        <Form.Label>Size</Form.Label>
                        <Form.Control name="size" type="text" placeholder="Size (m^2)" />
                    </Form.Group>
                    <Button className="button" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}
