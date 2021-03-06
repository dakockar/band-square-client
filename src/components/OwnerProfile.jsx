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
            <div className="profile-page">
                <img src={user.imgUrl} />
                <h5>Name: </h5><span>{user.firstName} {user.lastName}</span>
                <h5>Venues:</h5>
                <div className="venues-wrapper">
                    {
                        venues.length
                            ? (
                                venues.map(venue => {
                                    return (
                                        <div className="venue-box" key={venue._id}>
                                            <div>Title: {venue.title}</div>
                                            <div>Location: {venue.location}</div>
                                            <div>Size: {venue.size}m<sup>2</sup></div>
                                        </div>
                                    )
                                })
                            )
                            :
                            <span>no venues yet</span>
                    }
                </div>
                <Button className="button" as={Link} to={`/owner-profile/edit`}>Edit Profile</Button>
                <Button className="button" as={Link} to="/add-venue">Add Venue</Button>
            </div>
        )
    }
}