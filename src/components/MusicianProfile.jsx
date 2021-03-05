import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function MusicianProfile(props) {



    console.log('props------', props)
    return (
        <div>
            <img src={props.user.imgUrl} />
            <h5>Name: {props.user.firstName} {props.user.lastName}</h5>
            <h5>Genre: {props.user.genre}</h5>
            <h5>Instrument: {props.user.instrument}</h5>
            
            <h5>Location: {props.user.location}</h5>
            <h5>Band: {props.user.bandName}</h5>
            <h5>About Me: {props.user.aboutMe}</h5>
            <Link to={`/musician-profile/edit`}>
                <Button>Edit</Button>
            </Link>

        </div>
    )
}

export default MusicianProfile