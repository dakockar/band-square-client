import { Form } from "react-bootstrap";
import React, { Component } from "react";
import ErrorPage from "./ErrorPage";
import { Link } from 'react-router-dom'

class VenueSearch extends Component {
  render() {
    const { user, filteredVenues, onSearch } = this.props;
    if (!user) return null;

    return user.type === "owner"
      ? <ErrorPage />
      : (
        <div>
          <h3>Search for: </h3>
          <Form.Group>
            <Form.Control
              onChange={onSearch}
              name="size"
              type="number"
              placeholder="Size"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              onChange={onSearch}
              name="location"
              type="text"
              placeholder="Location"
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              onChange={onSearch}
              name="title"
              type="text"
              placeholder="Title"
            />
          </Form.Group>
          <h3>Results:</h3>
          {filteredVenues.map((singleVenue) => {
            return (
              <Link to={`/venuesDetails/${singleVenue._id}`}>
              <div key={singleVenue._id}>
                <h4>{singleVenue.title}</h4>
                <p>{singleVenue.size}</p>
                <p>{singleVenue.location}</p>
              </div>
              </Link>
            );
          })}
        </div>
      );
  }
}

export default VenueSearch;
