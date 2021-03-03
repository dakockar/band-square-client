import React, { Component } from "react";
import { Switch, Route, withRouter, useHistory } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import SignUp from "./components/SignUp";
import axios from 'axios'
import config from './config'
import Home from './components/Home.jsx'
import MusicianSearch from "./components/MusicianSearch";
import VenueSearch from "./components/VenueSearch";
import MusicianProfile from "./components/MusicianProfile";

class App extends Component {

  state = {
    user: {}
  }

  handleSignUp = (event) => {
    event.preventDefault();

    let newUser = {
      email: event.target.email.value,
      password: event.target.password.value,
      type: event.target.type.value
      // type: event.target.
    }

    axios.post(`${config.API_URL}/api/signup`, newUser)
      .then((response) => {
        console.log('all data', response)
        console.log('response.data', response.data)
        this.handleSignIn(event)
      })
      .catch((err) => {
        console.log('error signUp', err)
      })

  }

  handleSignIn = (event) => {
    event.preventDefault();
    let newUser = {
      email: event.target.email.value,
      password: event.target.password.value
    }

    axios.post(`${config.API_URL}/api/signin`, newUser, { withCredentials: true })
      .then((response) => {
        console.log('Succesfully signed in --------', response.data)
        this.setState({
          user: response.data
        }, () => {
          this.props.history.push('/home')
        })

      })
      .catch((err) => {
        console.log('error signUp', err)
      })
  }

  handleSignOut = () => {
    axios.post(`${config.API_URL}/api/signout`, {}, { withCredentials: true })
      .then(() => {
        console.log('LOGOUT_____')
        this.setState({
          user: null
        }, () => {
          this.props.history.push('/')
        })

      })
  }

  render() {
    return (
      <div className="App">

        <Switch>
          <Route exact path='/' render={(routeProps) => {
            return (
              <LandingPage onSignUp={this.handleSignUp} onSignIn={this.handleSignIn} {...routeProps} />
            )
          }} />
          <Route path='/home' render={(routeProps) => {
            return (
              <Home {...routeProps} onSignOut={this.handleSignOut} />
            )
          }} />
          <Route path='/search/musicians' render={(routeProps) => {
            return (
              <MusicianSearch {...routeProps} onSignOut={this.handleSignOut} />
            )
          }} />
          <Route path='/search/venues' render={(routeProps) => {
            return (
              <VenueSearch {...routeProps} onSignOut={this.handleSignOut} />
            )
          }} />
          {!this.state.user ? null : (
            <Route path='/musician-profile' render={(routeProps) => {
              return (
                <MusicianProfile user={this.state.user} {...routeProps} onSignOut={this.handleSignOut} />
              )
            }} />
          )
          }


        </Switch>

      </div>
    );
  }

}

export default withRouter(App);
