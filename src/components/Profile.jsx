import React, { Component } from 'react';
import { BrowserRouter, Redirect } from 'react-router-dom';
import MusicianProfile from "./MusicianProfile";
import OwnerProfile from "./OwnerProfile";


export default class Profile extends Component {
    render() {

        const { user } = this.props;

        if (!user) return null;
        // if (!user) return <Redirect push to="/" />;


        return (
            <div>
                {
                    user.type === "musician"
                        ? (
                            <MusicianProfile user={user} />
                        )
                        : (
                            <OwnerProfile user={user} />
                        )
                }
            </div>
        )


    }
}
