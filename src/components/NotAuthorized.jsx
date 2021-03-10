import React, { Component } from 'react'

export default class NotAuthorized extends Component {
    render() {
        return (
            <div className='error-page'>
                <h3>You are not authorized for this page.</h3>
            </div>
        )
    }
}