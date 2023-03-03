import React, { Component } from "react";
import { Form, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../config";
import NotAuthorized from "./NotAuthorized";

class MusicianSearch extends Component {
  state = {
    musicians: null,
    filteredMusicians: null,
    instrument: [],
    genre: []
  };

  componentDidMount() {
    // get all musicians
    axios
      .get(`${config.API_URL}/api/users`)
      .then((response) => {
        console.log("all musicians---", response.data);

        // filtering the current user out of the results list
        let filterList = response.data.filter(musician => musician._id !== this.props.user._id);
        filterList = filterList.filter(musician => musician.firstName && musician.lastName);

        this.setState({
          musicians: filterList,
          filteredMusicians: filterList,
        });
      })
      .catch((err) => {
        console.log("Fetching users failed", err);
      });
  }


  onMusicianSearch = (event) => {
    let name = event.target.name;
    let value = event.target.value.split(" ");

    switch (name) {
      case "instrument":
        this.setState({ instrument: value }, this.handleMusicianSearch);
        break;
      case "genre":
        this.setState({ genre: value }, this.handleMusicianSearch);
        break;
    }
  };

  handleMusicianSearch = () => {
    const { instrument, genre, musicians } = this.state;

    // filter by instrument
    let filterList = musicians.filter(musician => {
      if (!instrument.length) return true;
      for (let i = 0; i < instrument.length; i++) {
        if (i > 0 && !instrument[i]) return false;

        for (let inst of musician.instrument) {
          if (inst.toLowerCase().includes(instrument[i].toLowerCase()))
            return true;
        }
      }
    });

    // filter by genre
    filterList = filterList.filter(musician => {
      if (!genre.length) return true;
      for (let i = 0; i < genre.length; i++) {
        if (i > 0 && !genre[i]) return false;

        for (let gen of musician.genre) {
          if (gen.toLowerCase().includes(genre[i].toLowerCase())) return true;
        }
      }
    });

    this.setState({
      filteredMusicians: filterList,
    });
  };


  render() {
    const { user } = this.props;
    const { filteredMusicians } = this.state;

    if (!user) return null;
    if (!filteredMusicians) return null;
    if (user.type === "owner") return <NotAuthorized />;

    return (
      <div className="search-page">
        <h1>Find musicians</h1>
        <div className="search-container">
          <Form className='search-form'>
            <Form.Group>
              <Form.Label>Instrument</Form.Label>
              <Form.Control
                onChange={this.onMusicianSearch}
                type="text"
                name="instrument"
                placeholder="drums, guitar..."
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Genre</Form.Label>
              <Form.Control
                onChange={this.onMusicianSearch}
                type="text"
                name="genre"
                placeholder="rock, jazz..."
              />
            </Form.Group>
          </Form>

          <div className="search-results">
            <div className='search-scroll scrollbar scrollbar-primary mx-auto'>
              {filteredMusicians.map((singleUser) => {
                return (
                  <Link key={singleUser._id} to={`/musician/${singleUser._id}`}>
                    <Card className="card-style-search">
                      <Card.Body>
                        <Card.Title className='card-title-search' >{singleUser.firstName} {singleUser.lastName}</Card.Title>
                        <Card.Text>{singleUser.instrument}</Card.Text>
                        <Card.Text>{singleUser.genre}</Card.Text>
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

export default MusicianSearch;