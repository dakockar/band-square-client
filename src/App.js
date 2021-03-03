import React, { useState } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import SignUp from "./components/SignUp";
import axios from 'axios'
import config from './config'

function App(props) {

  const[user, setUser] = useState({})

  const handleSignUp = (event) =>{
    event.preventDefault();
    let newUser = {
      email: event.target.email.value,
      password: event.target.password.value
    }

    axios.post(`${config.API_URL}/api/signup`, newUser)
      .then((response) => {
        console.log('all data', response.data)
        handleSignIn(event)
        setUser(response.data)
      })
      .catch((err) => {
        console.log('error signUp', err)
      })

  }

  const handleSignIn = (event) => {
    event.preventDefault();
    let newUser = {
      email: event.target.email.value,
      password: event.target.password.value
    }

    axios.post(`${config.API_URL}/api/signin`, newUser, {withCredentials:true})
      .then((response) => {
        console.log('Succesfully signed in --------', response.data)
        setUser(response.data)
      })
      .catch((err) => {
        console.log('error signUp', err)
      })
  }

  const handleSignOut = () => {
    axios.post(`${config.API_URL}/api/signout`, {}, {withCredentials: true})
      .then(() => {
        console.log('LOGOUT_____')
        setUser(null)
      }, () => {
        props.history.push('/')
      })
  }


  return (
    <div className="App">
    
      <Switch>
        <Route exact path='/' render={(routeProps) => {
          return (
            <LandingPage onSignUp={handleSignUp} onSignIn={handleSignIn} {...routeProps} onSignOut={handleSignOut}/>
          )
        }}/>

      </Switch>
      
    </div>
  );
}

export default withRouter(App);
