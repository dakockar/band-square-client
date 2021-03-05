import { Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom'
import React, { Component } from 'react';
import axios from "axios";
import config from '../config';



export default class OwnerProfile extends Component {

    state = {
        venues: []
    }


    componentDidMount() {
        const { user } = this.props;

        axios.get(`${config.API_URL}/api/venues/${user._id}`)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    venues: response.data
                })
            })
            .catch((err) => {
                console.log("error while fetching venues", err);
            });
    }



    render() {
        const { user } = this.props;
        const { venues } = this.state;

        if (!user) return null;

        return (
            <div>
                <img src={user.imgUrl} />
                <h5>Name: {user.firstName} {user.lastName}</h5>
                <h5>Venues:
            {
                        venues.length
                            ?
                            <ul>
                                {
                                    venues.map(venue => {
                                        return (
                                            <li key={venue._id}>
                                                <div>{venue.title}</div>
                                                <div>{venue.location}</div>
                                                <div>{venue.size}</div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            :
                            <span>no venues yet</span>
                    }
                </h5>

                <Button as={Link} to={`/owner-profile/edit`}>Edit Profile</Button>
                <Button variant="dark" as={Link} to="/add-venue">Add Venue</Button>

            </div>
        )
    }
}