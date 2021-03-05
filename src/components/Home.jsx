import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Nav from './Nav'

function Home(props) {

    return (
        <div>

            <h1>Home page</h1>
            <Link to='/search/musicians'>Search musicians</Link>
            <Link to='/search/venues'>Search Venues</Link>
            <Link to='/profile'>profile</Link>
        </div>
    )
}

export default Home