import React, { Component } from "react";
import axios from "axios";
import config from "../config";
import { Button, Carousel, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class VenueDetails extends Component {
  state = {
    venue: null,
  };

  componentDidMount() {
    const { venueId } = this.props.match.params;

    axios
      .get(`${config.API_URL}/api/venue/${venueId}`)
      .then((response) => {
        this.setState({
          venue: response.data,
        });
      })
      .catch(() => {
        console.log("Error while getting venue");
      });
  }

  render() {
    const { venue } = this.state;
    const { user, onDelete } = this.props;

    if (!venue) return null;
    if (!user) return null;

    return (
      <div className="venue-page">
        <Card className="card-style-venue">
          <Carousel>
            {
              venue.imgUrl.map((img, index) => {
                return (
                  <Carousel.Item key={index}>
                    <img
                      src={img}
                      alt={`slide ${venue.imgUrl.indexOf(img)}`} />
                  </Carousel.Item>
                );
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
          </Card.Body>
          <Card.Body>
            {
              user._id === venue.ownerId
                ? (
                  <div className="buttons">
                    <Button className="button" as={Link} to={`/chat/owner/${venue._id}`}>Join chat</Button>
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
    );
  }
}