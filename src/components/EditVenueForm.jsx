import axios from 'axios';
import React, { Component } from 'react';
import { Form, Button } from "react-bootstrap";
import config from '../config';

export default class EditVenueForm extends Component {

    state = {
        venue: null
    }

    componentDidMount() {

        const { venueId } = this.props.match.params;

        axios.get(`${config.API_URL}/api/venue/${venueId}`)
            .then((response) => {
                // console.log("get venue by id");
                // console.log(response.data);
                this.setState({
                    venue: response.data
                })
            })
            .catch((err) => {
                console.log("get venue failed", err);
            });
    }


    render() {
        const { venue } = this.state;
        // console.log(this.props);

        if (!venue) return null;

        return (
            <div>
                <Form onSubmit={(event) => { this.props.onEdit(event, venue._id) }}>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control name="title" type="text" placeholder="Enter title" defaultValue={venue.title} />
                    </Form.Group>
                    <Form.Group controlId="location">
                        <Form.Label>Location</Form.Label>
                        <Form.Control name="location" type="text" placeholder="Location" defaultValue={venue.location} />
                    </Form.Group>
                    <Form.Group controlId="size">
                        <Form.Label>Size</Form.Label>
                        <Form.Control name="size" type="text" placeholder="Size (m^2)" defaultValue={venue.size} />
                    </Form.Group>
                    <Button className="button" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}
