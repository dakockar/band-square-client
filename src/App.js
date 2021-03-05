import React, { Component } from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import LandingPage from "./components/LandingPage";
// import SignUp from "./components/SignUp";
import axios from 'axios'
import config from './config'
import Nav from './components/Nav'
import Home from './components/Home'
import MusicianSearch from "./components/MusicianSearch";
import VenueSearch from "./components/VenueSearch";
import MusicianProfile from "./components/MusicianProfile";
import MusicianProfileEdit from './components/MusicianProfileEdit.jsx'

class App extends Component {

  state = {
    user: null,
    filteredUsers: []
  }

  componentDidMount() {
    console.log(this.state.user);
    axios.get(`${config.API_URL}/api/musician-profile`)
      .then((response) => {
        console.log('what is this-----',response.data)
        this.setState({user: response.data})
      })
      .catch(() => {
        console.log('fetching failed')
      })

    if (!this.state.user) {
      axios.get(`${config.API_URL}/api/user`, { withCredentials: true })
        .then((response) => {
          // console.log(response);
          this.setState({
            user: response.data
          })
        })
        .catch((err) => {
          console.log("error gettin logged in user-----", err);
        });
    }
  }

  handleEditUser = (event) => {
    event.preventDefault()
    const { user } = this.state
    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const instrument = event.target.instrument.value;
    const genre = event.target.genre.value;
    const location = event.target.location.value;
    const bandName = event.target.bandName.value;
    const aboutMe = event.target.aboutMe.value;
    let editedUser = {
      firstName,
      lastName,
      instrument,
      genre,
      location,
      bandName,
      aboutMe
    }
    axios.patch(`${config.API_URL}/api/musician-profile/${user._id}`, editedUser, {withCredentials: true})
      .then((response) => {
        console.log('-----edit----', response.data)
        this.setState(
          {
            user: response.data
          },
          () => {
            this.props.history.push(`/musician-profile`)
          }
        )
      })
      .catch((err) => {
        console.log('Edit failed', err)
      })
  }

  handleSignUp = (event) => {
    event.preventDefault();

    let newUser = {
      email: event.target.email.value,
      password: event.target.password.value,
      type: event.target.type.value
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
          user: response.data,
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
          user: null,
        }, () => {
          this.props.history.push('/')
        })

      })
      .catch((err) => {
        // 
        console.log(error);
      });
  }

  handleChange = (event) => {
    let searchText = event.target.value
    let filterList = this.state.users.filter((singleUser) => {
      return singleUser.instrument.toLowerCase().includes(searchText)
    })
    this.setState({
      filteredUsers: filterList
    })
  }

  // handleOnSubmit = (event) => {
  //   event.preventDefault();
  //   const firstName = event.target.firstName.value;
  //   const instrument = event.target.instrument.value;

  //   axios.post(`${}`)
  // }

  render() {
    console.log(this.state.user)

    if (!this.state.user) return (
      <>
        <Nav
          onSignUp={this.handleSignUp}
          onSignIn={this.handleSignIn}
          onSignOut={this.handleSignOut} />
        <LandingPage />
      </>
    )
    console.log(this.state.user)


    return (
      <div className="App">
        <Nav
          user={this.state.user}
          onSignUp={this.handleSignUp}
          onSignIn={this.handleSignIn}
          onSignOut={this.handleSignOut} />

        <Switch>

          <Route exact path='/' render={(routeProps) => {
            return (
              <LandingPage {...routeProps} />
            )
          }} />


          {/* authorized routes */}

          <Route path='/home' render={(routeProps) => {
            return (
              <Home {...routeProps} user={this.state.user} />
            )
          }} />
          <Route path='/search/musicians' render={(routeProps) => {
            return (
              <MusicianSearch {...routeProps} />
            )
          }} />
          <Route path='/search/venues' render={(routeProps) => {
            return (
              <VenueSearch {...routeProps} />
            )
          }} />
          {!this.state.user ? null : (
            <Route exact path='/musician-profile' render={(routeProps) => {
              return (
                <MusicianProfile user={this.state.user} {...routeProps} />
              )
            }} />

          )
          }
          <Route exact path='/musician-profile/edit' render={(routeProps) => {
            return (
              <MusicianProfileEdit user={this.state.user} {...routeProps} onEdit={this.handleEditUser} />
            )
          }} />

        </Switch>

      </div>
    );
  }

}

export default withRouter(App);
