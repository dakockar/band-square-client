import React, { Component } from "react";
import axios from "axios";
import config from "../config";
import { Card } from 'react-bootstrap'

class VenueSearchDet extends Component {
  state = {
    venue: null,
  };

  componentDidMount() {
      console.log('venue props=-------', this.props)
    const venueId = this.props.match.params.venueId;

    axios
      .get(`${config.API_URL}/api/venuesDetails/${venueId}`)
      .then((response) => {
          console.log('venue id-----', response.data)
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

    if (!venue) return null
      return (
        <div className="profile-page">
          <Card className="card-style" style={{ width: "18rem" }}>
            <Card.Img variant="top" src={venue.imgUrl} />
            <Card.Body>
              <Card.Title>
                {venue.title}
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {venue.location}
              </Card.Subtitle>
              <Card.Text>
                <p>{venue.size}</p>
              </Card.Text>
              <Card.Link className="edit-btn" href="/Chat">
                Send a message
              </Card.Link>
            </Card.Body>
          </Card>
        </div>
      );
  }
}

export default VenueSearchDet;
