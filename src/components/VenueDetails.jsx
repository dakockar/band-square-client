import React, { Component } from "react";
import axios from "axios";
import config from "../config";
import { Button, Carousel } from "react-bootstrap";
import { Route, Link } from "react-router-dom";

export default class VenueDetails extends Component {
    state = {
        venue: null,
    };

    componentDidMount() {
        const { venueId } = this.props.match.params;

        axios
            .get(`${config.API_URL}/api/venue/${venueId}`)
            .then((response) => {
                // console.log("get venue by id");
                console.log('venue-id-------', response.data);
                this.setState({
                    venue: response.data,
                });
            })
            .catch((err) => {
                console.log("get venue failed", err);
            });
    }

    render() {
        const { venue } = this.state;
        const { user, onDelete } = this.props;
        // console.log(this.props);

        if (!venue) return null;
        if (!user) return null;

        return (
            <div className="venue-box">
                <Carousel>
                    {
                        venue.imgUrl.map((img, index) => {
                            return (
                                <Carousel.Item key={index}>
                                    <img
                                        src={img}
                                        alt={`slide ${venue.imgUrl.indexOf(img)}`} />
                                </Carousel.Item>
                            )
                        })
                    }
                </Carousel>
                <div>{venue.title}</div>
                <div>Location: {venue.location}</div>
                <div>
                    Size: {venue.size}m<sup>2</sup>
                </div>
                {
                    user._id === venue.ownerId
                        ? (
                            <div className="buttons">
                                <Button
                                    className="button"
                                    as={Link}
                                    to={`/venue/${venue._id}/edit`}>
                                    Edit
                        </Button>
                                <Button
                                    className="button"
                                    onClick={() => {
                                        onDelete(venue._id);
                                    }}>
                                    Delete
                        </Button>
                            </div>
                        )
                        : (
                            <Link className="edit-btn" to={`/chat/owner/${venue._id}`}>
                                Send a message
                            </Link>
                        )
                }
            </div>
        );
    }
}
