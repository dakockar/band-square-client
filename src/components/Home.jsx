import React, { Component } from 'react';
// import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
// import Nav from './Nav'


class Home extends Component {
    render() {
        const { user } = this.props;
        if (!user) return null;

        return (
            <div>

                <h1>Home page</h1>
                {
                    user.type === "musician"
                        ? (
                            <>
                                <div>
                                    <Link to='/search/musicians'>Search musicians</Link>
                                </div>
                                <div>
                                    <Link to='/search/venues'>Search Venues</Link>
                                </div>
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