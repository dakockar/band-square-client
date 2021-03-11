import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

function MusicianProfile(props) {
  console.log('props------', props)
  // if (!props.user) return null;
  const { user } = props;
  // if(!user) {
  //   return <Redirect to={'/signin'} />
  // }
  return (
    <div className="profile-page">
      <Card className='card-style' >
      <div className='pic-and-text'>
        <Card.Img className='profile-picture' variant="top" src={user.imgUrl} />
        <Card.ImgOverlay as={Link} to="/upload-image">+</Card.ImgOverlay>
        <Card.Body>
          <Card.Title>
            {user.firstName} {user.lastName}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {user.location}
          </Card.Subtitle>
          </Card.Body>
          </div>
          <Card.Body>
          <Card.Text>{user.aboutMe}</Card.Text>
          <Card.Text>{user.genre}</Card.Text>
          <Card.Text>{user.instrument}</Card.Text>
          <Card.Text>{user.bandName}</Card.Text>
          {
            user.lookingFor && <Card.Text>Looking for: {user.lookingFor}</Card.Text>
          }
          <Card.Link className="button" as={Link} to="/musician-profile/edit">
            Edit Profile
          </Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default MusicianProfile;
