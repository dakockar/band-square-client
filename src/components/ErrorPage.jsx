import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ErrorPage extends Component {
  render() {
    return (
      <div className='error-page'>
        <h1>404</h1>
        <h2>PAGE NOT FOUND</h2>
        <h3>The page you're looking for does not exist.</h3>
        <br />
        <Link className='error-link' to='/home'><h3>Take me home!</h3></Link>
      </div>
    );
  }
}