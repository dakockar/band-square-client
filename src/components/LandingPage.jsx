import React from 'react'
import SignUp from './SignUp'
import SignIn from './SignIn'
import {Button } from 'react-bootstrap'

function LandingPage(props) {
    return (
        <div>
            <h1>Landing Page</h1>
            <SignUp onSignUp={props.onSignUp}/>
            <SignIn onSignIn={props.onSignIn}/>
            
        </div>
    )
}

export default LandingPage