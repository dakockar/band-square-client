import React from 'react'
import { Button } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import LandingPage from './LandingPage'

function MusicianProfile(props) {

    // console.log('props------', props)
    // if (!props.user) return null;

    return (
        <div className="profile-page">
            <img src={props.user.imgUrl} />
            <h5>Name: </h5><span>{props.user.firstName} {props.user.lastName}</span>
            <h5>Genre: </h5><span>{props.user.genre}</span>
            <h5>Instrument: </h5><span>{props.user.instrument}</span>
            <h5>Location: </h5><span>{props.user.location}</span>
            <h5>Band: </h5><span>{props.user.bandName}</span>
            <h5>About Me: </h5><span>{props.user.aboutMe}</span>
            <Button className="button" as={Link} to={`/musician-profile/edit`}>Edit Profile</Button>
        </div>
    )
}

export default MusicianProfile