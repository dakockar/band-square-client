import React, { Component } from "react";
import { Form, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../config";
import NotAuthorized from "./NotAuthorized";


export default class BandSearch extends Component {

    state = {
        musiciansLooking: null,
        filteredMusiciansLooking: null,
        instrument: [],
        genre: []
    }

    componentDidMount() {
        // get all musicians and filter the ones that are lookingFor a musician
        axios
            .get(`${config.API_URL}/api/users`)
            .then((response) => {
                //console.log("all users", response.data);

                // filter the current user out of the list
                let filterList = response.data.filter(musician => musician._id !== this.props.user._id);
                filterList = filterList.filter(musician => musician.firstName && musician.lastName)

                // get the users that are looking for a musician
                filterList = filterList.filter(band => band.lookingFor)

                this.setState({
                    musiciansLooking: filterList,
                    filteredMusiciansLooking: filterList
                });
            })
            .catch((err) => {
                console.log("Fetching users failed", err);
            });
    }


    onBandSearch = (event) => {
        let name = event.target.name;
        let value = event.target.value.split(" ");

        switch (name) {
            case "instrument":
                this.setState({ instrument: value }, this.handleBandSearch);
                break;
            case "genre":
                this.setState({ genre: value }, this.handleBandSearch);
                break;
        }
    }

    handleBandSearch = () => {
        const { instrument, genre, musiciansLooking } = this.state;
        // console.log(instrument, genre);

        // filter by instrument
        let filterList = musiciansLooking.filter(musician => {
            if (!instrument.length) return true;
            for (let i = 0; i < instrument.length; i++) {
                if (i > 0 && !instrument[i]) return false;
                if (musician.lookingFor.toLowerCase().includes(instrument[i].toLowerCase())) return true;
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
            filteredMusiciansLooking: filterList,
        });
    }


    render() {
        const { user } = this.props;
        const { filteredMusiciansLooking } = this.state;

        if (!user) return null;
        if (!filteredMusiciansLooking) return null;
        if (user.type === "owner") return <NotAuthorized />


        return (
            <div className="search-page">
                <h1>Find a band</h1>
                <div className="search-container">
                    <Form className='search-form'>
                        <Form.Group>
                            <Form.Label>Instrument</Form.Label>
                            <Form.Control
                                onChange={this.onBandSearch}
                                type="text"
                                name="instrument"
                                placeholder="guitar, bass..."
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Genre</Form.Label>
                            <Form.Control
                                onChange={this.onBandSearch}
                                type="text"
                                name="genre"
                                placeholder="pop, house..."
                            />
                        </Form.Group>
                    </Form>

                    <div className="search-results">
                        {/* <h3>Results:</h3> */}
                        <div className='search-scroll scrollbar scrollbar-primary mx-auto'>
                            {
                                !filteredMusiciansLooking.length
                                    ? <h6>No results</h6>
                                    : (
                                        filteredMusiciansLooking.map(musician => {
                                            return (
                                                <Link key={musician._id} to={`/musician/${musician._id}`}>
                                                    <Card className="card-style-search">
                                                        <Card.Body>
                                                            <Card.Title className='card-title-search'>{musician.firstName} {musician.lastName}</Card.Title>
                                                            <Card.Text>I play: {musician.instrument}</Card.Text>
                                                            <Card.Text>Genre: {musician.genre}</Card.Text>
                                                            {
                                                                musician.bandName && <Card.Text>Band: {musician.bandName}</Card.Text>
                                                            }
                                                            <Card.Text>Looking for: {musician.lookingFor}</Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                </Link>
                                            );
                                        })
                                    )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
