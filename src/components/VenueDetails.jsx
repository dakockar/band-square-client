import React, { Component } from 'react';
import axios from 'axios';
import config from '../config';
import { Button } from "react-bootstrap";
import { Route, Link } from "react-router-dom";
import EditVenueForm from "./EditVenueForm";

export default class VenueDetails extends Component {

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
            <div className="venue-box">
                {/* add images here */}
                <div>Title: {venue.title}</div>
                <div>Location: {venue.location}</div>
                <div>Size: {venue.size}m<sup>2</sup></div>
                <div className="buttons">
                    <Button className="button" as={Link} to={`/venue/${venue._id}/edit`}>Edit</Button>
                    <Button className="button" onClick={() => { this.props.onDelete(venue._id) }} >Delete</Button>
                </div>
            </div>
        )
    }
}
