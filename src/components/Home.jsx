import React, { Component } from 'react';
// import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
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
                                <Link className="search-link" to='/search/musicians'>looking for <br /> musicians/bands</Link>
                                <Link className="search-link" to='/search/venues'>looking for <br /> rehearsal rooms/venues</Link>
                            </>
                        )
                        : (
                            <div>owner's home page</div>
                        )
                }

                {/* <Link to='/profile'>profile</Link> */}
            </div>
        )
    }
}

export default Home