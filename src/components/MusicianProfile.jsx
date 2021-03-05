import React from 'react'
import { Button } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import LandingPage from './LandingPage'

function MusicianProfile(props) {

    // console.log('props------', props)
    // if (!props.user) return null;

    return (

        <div>
            <img src={props.user.imgUrl} />
            <h5>Name: {props.user.firstName} {props.user.lastName}</h5>
            <h5>Genre: {props.user.genre}</h5>
            <h5>Instrument: {props.user.instrument}</h5>

            <h5>Location: {props.user.location}</h5>
            <h5>Band: {props.user.bandName}</h5>
            <h5>About Me: {props.user.aboutMe}</h5>
            <Button as={Link} to={`/musician-profile/edit`}>Edit</Button>

        </div>
    )
}

export default MusicianProfile