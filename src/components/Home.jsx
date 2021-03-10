import React, { Component } from 'react';
// import { Button } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
// import Nav from './Nav'


class Home extends Component {
    render() {
        const { user } = this.props;
        if (!user) return null;

        return (
            <div className="home-page">

                {/* <h2>Welcome, {user.firstName}</h2> */}
                <h3>Home page</h3>
                {
                    user.type === "musician"
                        ? (
                            <>
                                <Link className="search-link" to='/search/musicians'>find me a<br />talented musician!</Link>
                                <Link className="search-link" to='/search/bands'>find me an<br /> awesome band!</Link>
                                <Link className="search-link" to='/search/venues'>need a place for my gigs<br /> or rehearsals!</Link>
                            </>
                        )
                        : (
                            <Redirect to='profile'/>
                        )
                }

                {/* <Link to='/profile'>profile</Link> */}
            </div>
        )
    }
}

export default Home