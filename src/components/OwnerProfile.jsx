import React from 'react';
import { Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom'


export default function OwnerProfile(props) {

    // if (!props.user) return null;


    return (
        <div>
            <img src={props.user.imgUrl} />
            <h5>Name: {props.user.firstName} {props.user.lastName}</h5>
            <h5>Venues:
            {
                    props.user.venues.length
                        ?
                        <span>
                            venues list
                        </span>
                        :
                        <span>no venues yet</span>
                }
            </h5>

            <Link to={`/owner-profile/edit`}>
                <Button>Edit</Button>
            </Link>

        </div>
    )
}
