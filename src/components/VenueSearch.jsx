import { Form, Card } from "react-bootstrap";
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import config from "../config";
import NotAuthorized from "./NotAuthorized";


class VenueSearch extends Component {
  state = {
    venues: [],
    filteredVenues: [],
    size: 0,
    location: [],
    title: []
  };

  componentDidMount() {
    // get all venues
    axios
      .get(`${config.API_URL}/api/venues`)
      .then((response) => {
        this.setState({
          venues: response.data,
          filteredVenues: response.data,
        });
      })
      .catch(() => {
        console.log("Error while fetching venues");
      });
  }


  onVenueSearch = (event) => {
    let name = event.target.name;
    let value = event.target.value.split(" ");

    switch (name) {
      case "size":
        this.setState({ size: value[0] }, this.handleVenueSearch);
        break;
      case "location":
        this.setState({ location: value }, this.handleVenueSearch);
        break;
      case "title":
        this.setState({ title: value }, this.handleVenueSearch);
        break;
    }
  };


  handleVenueSearch = () => {
    const { size, location, title, venues } = this.state;

    // filter by size
    let filterList = venues.filter(venue => {
      if (!Number(size)) return true;
      return Number(size) && venue.size <= size;
    });

    // filter by location
    filterList = filterList.filter(venue => {
      if (!location.length) return true;
      for (let i = 0; i < location.length; i++) {
        if (i > 0 && !location[i]) return false;
        if (venue.location.toLowerCase().includes(location[i].toLowerCase())) return true;
      }
    });

    // filter by title
    filterList = filterList.filter(venue => {
      if (!title.length) return true;
      for (let i = 0; i < title.length; i++) {
        if (i > 0 && !title[i]) return false;
        if (venue.title.toLowerCase().includes(title[i].toLowerCase())) return true;
      }
    });

    this.setState({
      filteredVenues: filterList,
    });
  };


  render() {
    const { user } = this.props;
    const { filteredVenues } = this.state;

    if (!user) return null;
    if (!filteredVenues) return null;
    if (user.type === "owner") return <NotAuthorized />;


    return (
      <div className="search-page">
        <h1>Find a venue</h1>
        <div className="search-container">
          <Form className='search-form'>
            <Form.Group>
              <Form.Label>Size</Form.Label>
              <Form.Control
                onChange={this.onVenueSearch}
                name="size"
                type="number"
                placeholder="enter a number"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Location</Form.Label>
              <Form.Control
                onChange={this.onVenueSearch}
                name="location"
                type="text"
                placeholder="Munich, Ankara, Amsterdam..."
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                onChange={this.onVenueSearch}
                name="title"
                type="text"
                placeholder="the awesome place..."
              />
            </Form.Group>
          </Form>

          <div className="search-results">
            <div className='search-scroll scrollbar scrollbar-primary mx-auto'>
              {filteredVenues.map(venue => {
                return (
                  <Link key={venue._id} to={`/venue/${venue._id}`}>
                    <Card className="card-style-search">
                      <Card.Body>
                        <Card.Title className='card-title-search'>{venue.title}</Card.Title>
                        <Card.Text>Size: {venue.size}m<sup>2</sup></Card.Text>
                        <Card.Text>Location: {venue.location}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VenueSearch;