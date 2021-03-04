import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function MusicianProfile(props) {



    console.log('props------', props)
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