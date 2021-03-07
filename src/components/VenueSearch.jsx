import { Form } from "react-bootstrap";
import React, { Component } from "react";
import ErrorPage from "./ErrorPage";

class VenueSearch extends Component {
  render() {
    const { user, filteredVenues, onSearch } = this.props;
    if (!user) return null;

    return user.type === "owner"
      ? <ErrorPage />
      : (
        <div>
          <h1>Venue search</h1>
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
              <div key={singleVenue._id}>
                <h4>{singleVenue.title}</h4>
                <p>{singleVenue.size}</p>
                <p>{singleVenue.location}</p>
              </div>
            );
          })}
        </div>
      );
  }
}

export default VenueSearch;
