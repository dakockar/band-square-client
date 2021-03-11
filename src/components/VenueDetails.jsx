import React, { Component } from "react";
import axios from "axios";
import config from "../config";
import { Button, Carousel, Card } from "react-bootstrap";
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
            <div className='profile-page'>
            <Card className="card-style">
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
                <Card.Body>
                <Card.Title>
              {venue.title}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {venue.location}
            </Card.Subtitle>
            <Card.Text>
                    Size: {venue.size}m<sup>2</sup>
                </Card.Text>
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
                </Card.Body>
                </Card>
                </div>
            </div>
        );
    }
}
