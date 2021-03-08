import React, { Component } from 'react';
import { Form, Button } from "react-bootstrap";


export default class OwnerProfileEdit extends Component {


    render() {
        const { user } = this.props
        if (!user) return null;

        return (
            <div>
                <h1>Edit Owner Profile</h1>

                <Form onSubmit={this.props.onEdit}>
                    <Form.Group controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control name='firstName' type="text" placeholder="Enter Name" defaultValue={user.firstName} />
                    </Form.Group>
                    <Form.Group controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control name="lastName" type="text" placeholder="Last Name" defaultValue={user.lastName} />
                    </Form.Group>
                    <Button className="button" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}
