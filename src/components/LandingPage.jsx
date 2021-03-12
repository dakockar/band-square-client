import React from 'react'
import { Button } from 'react-bootstrap'
import picture from '../images/rock-bg.jpg'

function LandingPage(props) {

    return (

        <div className="landing-page">
        <div className='top-landing'>
        <div className='landing-right'>
        <div>
            <h2>Looking for talent?</h2>
        </div>
            <div>
            <h5> - Get together with other <br></br>musicians</h5>
            <h5> - Book venues</h5>
           
            </div>
            </div>
        
        <div className='landing-right'>
            <h2>Have a place for making music?</h2>
            <h5> - List your venues</h5>
        </div>
        </div>
        <h2>Join and find your place!</h2>    
        </div>
    )
}

export default LandingPage