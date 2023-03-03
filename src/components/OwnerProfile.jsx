import { Button, Card } from "react-bootstrap";
import { Link, withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import axios from "axios";
import config from '../config';

class OwnerProfile extends Component {
  state = {
    venues: []
  };

  componentDidMount() {
    const { user } = this.props;

    // get logged in user's venues
    axios.get(`${config.API_URL}/api/venues/${user._id}`)
      .then((response) => {
        this.setState({
          venues: response.data
        });
      })
      .catch(() => {
        console.log("Error while fetching venues");
      });
  }

  render() {
    const { user } = this.props;
    const { venues } = this.state;

    if (!user) return null;

    return (
      <div className="profile-page">
        <Card className='card-style' >
          <div className='pic-and-text' >
            <Card.Img className='profile-picture' variant="top" src={user.imgUrl} />
            <Card.ImgOverlay className='add-picture-btn' as={Link} to="/upload-image">+</Card.ImgOverlay>
            <Card.Body>
              <Card.Title>
                {user.firstName} {user.lastName}
              </Card.Title>
            </Card.Body>
          </div>
          <Card.Body>
            <h3>Venues: </h3>
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
                    );
                  })
                }</>
                )
                :
                <div>no venues yet</div>
            }
            <div className="buttons">
              <Button className='button' as={Link} to='/owner-profile/edit'>Edit Profile</Button>
              <Button className='button' as={Link} to='/add-venue'>Add Venue</Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default withRouter(OwnerProfile);