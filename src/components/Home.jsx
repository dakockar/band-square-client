import React, { Component } from 'react';
// import { Button } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'


class Home extends Component {
    render() {
        const { user } = this.props;
        if (!user) return null;

        return (
            <div className="home-page">

                {user.firstName ? <h3>Welcome {user.firstName}!</h3> : null}

                {
                    user.type === "musician"
                        ? (
                            <>
                                <Link className="search-link" to='/search/musicians'>find me a<br />talented musician!</Link>
                                <Link className="search-link" to='/search/bands'>find me an<br /> awesome band!</Link>
                                <Link className="search-link" to='/search/venues'>need a place for my<br />gigs or rehearsals!</Link>
                            </>
                        )
                        : (
                            <Redirect to='profile' />
                        )
                }
            </div>
        )
    }
}

export default Home