import React, { Component } from "react";
import axios from "axios";
import config from "../config";
import { Button, Carousel } from "react-bootstrap";
import { Route, Link } from "react-router-dom";
import EditVenueForm from "./EditVenueForm";

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
        console.log('venue-id-------',response.data);
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
    // console.log(this.props);

    if (!venue) return null;

    return (
      <div className="venue-box">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={venue.imgUrl[0]}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={venue.imgUrl[1]}
              alt="Second slide"
            />
          </Carousel.Item>
        </Carousel>
        {/* add images here */}
        {/* <h1>Image</h1>
        <img src={venue.imgUrl} /> */}
        <div>{venue.title}</div>
        <div>Location: {venue.location}</div>
        <div>
          Size: {venue.size}m<sup>2</sup>
        </div>
        <div className="buttons">
          <Button
            className="btn-edit-delete"
            as={Link}
            to={`/venue/${venue._id}/edit`}
          >
            Edit
          </Button>
          <Button
            className="btn-edit-delete"
            onClick={() => {
              this.props.onDelete(venue._id);
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    );
  }
}
