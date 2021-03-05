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
            <h5>Name: {props.user.firstName}</h5>
            <h5>Instrument: {props.user.instrument}</h5>
            <Link to={`/musician-profile/edit`}>
                <Button>Edit</Button>
            </Link>

        </div>
    )
}

export default MusicianProfile