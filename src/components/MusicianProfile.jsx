import React from 'react'
import { Button } from 'react-bootstrap'

function MusicianProfile(props) {
    console.log('props------', props)
    return (
        <div>

            <img src={props.user.imgUrl} />
            <h5>Name: {props.user.email}</h5>
            <h5>Instrument: {props.user.instrument}</h5>
            <Button>Edit profile</Button>

        </div>
    )
}

export default MusicianProfile