import React from 'react'

function MusicianProfile(props) {
    console.log('props------', props)
    return (
        <div>

            <img src={props.user.imgUrl} />
            <h5>Name: {props.user.email}</h5>
            <h5>Instrument: {props.user.instrument}</h5>

        </div>
    )
}

export default MusicianProfile