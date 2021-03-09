import React from 'react'
import { Button } from 'react-bootstrap'
import picture from '../images/rock-bg.jpg'

function LandingPage(props) {
    return (

        <div className="landing-page">
            
            <div className='landing-page-about'>
            <h1>Band Square</h1>
                Band square is a unique platform for musicians to connect with each other.<br></br>
               - Search for bands to join <br></br>
               - Search for people to join your band<br></br>
               - Collaborate with other musicians<br></br>
               - Book practice rooms<br></br>
               <br></br>
               You have a practice room?<br></br>
               - List your practice room on the site!
            </div>
            {/* <img src={picture}></img> */}

        </div>
    )
}

export default LandingPage