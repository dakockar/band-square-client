import React, { Component } from 'react';
import MusicianProfile from "./MusicianProfile";
import OwnerProfile from "./OwnerProfile";


export default class Profile extends Component {
    render() {

        const { user } = this.props;

        if (!user) return null;

        return (
            <>
                {
                    user.type === "musician"
                        ? (
                            <MusicianProfile user={user} />
                        )
                        : (
                            <OwnerProfile user={user} />
                        )
                }
            </>
        )


    }
}
