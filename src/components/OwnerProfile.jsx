import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
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

        // get logged in user's venues 
        axios.get(`${config.API_URL}/api/venues/${user._id}`)
            .then((response) => {
                // console.log(response.data);
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
                <Card className='card-style' >
                    <Card.Img variant="top" src={user.imgUrl} />
                    <Card.ImgOverlay as={Link} to="/upload-image">+</Card.ImgOverlay>
                    <Card.Body>
                        <Card.Title>
                            {user.firstName} {user.lastName}
                        </Card.Title>
                        {/* <Card.Subtitle className="mb-2 text-muted">
                        {props.user.location}
                    </Card.Subtitle> */}
                        <Card.Title>Venues: </Card.Title>
                        {
                            venues.length
                                ? (<>{
                                    venues.map(venue => {
                                        return (
                                            <Card.Text key={venue._id}>
                                                <Link to={`/venue/${venue._id}`}>
                                                    {venue.title}
                                                </Link>
                                            </Card.Text>
                                        )
                                    })
                                }</>
                                )
                                :
                                <span>no venues yet</span>
                        }
                        <Button className='button' as={Link} to='/owner-profile/edit'>Edit Profile</Button>
                        <Button className='button' as={Link} to='/add-venue'>Add Venue</Button>
                        {/* <Card.Link className="edit-btn" as={Link} to="/owner-profile/edit">
                            Edit Profile
                    </Card.Link> */}
                    </Card.Body>
                </Card>
            </div>

            // <div className="profile-page">
            //     <img src={user.imgUrl} />
            //     <Link to="/upload-image">upload img</Link>
            //     <h5>Name: </h5><span>{user.firstName} {user.lastName}</span>
            //     <h5>Venues:</h5>
            //     <div className="venues-wrapper">
            // {
            //     venues.length
            //         ? (<ol> {
            //             venues.map(venue => {
            //                 return (
            //                     <li key={venue._id}>
            //                         <Link to={`/venue/${venue._id}`}>
            //                             {venue.title}
            //                         </Link>
            //                     </li>
            //                 )
            //             })
            //         }</ol>
            //         )
            //         :
            //         <span>no venues yet</span>
            // }
            //     </div>
            // <Button className='button' as={Link} to='/owner-profile/edit'>Edit Profile</Button>
            // <Button className='button' as={Link} to='/add-venue'>Add Venue</Button>
            // </div>
        )
    }
}