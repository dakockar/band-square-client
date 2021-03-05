import React, { Component } from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { Spinner } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import config from './config';
import Nav from './components/Nav';
import LandingPage from "./components/LandingPage";
import Home from './components/Home';
import MusicianSearch from "./components/MusicianSearch";
import VenueSearch from "./components/VenueSearch";
import Profile from "./components/Profile";
import MusicianProfileEdit from './components/MusicianProfileEdit';
import OwnerProfileEdit from './components/OwnerProfileEdit';
import AddVenueForm from "./components/AddVenueForm";
import "./App.css";

class App extends Component {

  state = {
    user: null,
    isMounted: false,
    filteredUsers: [],
    users: [],
    venues: [],
    filteredVenues: []
  }



  componentDidMount() {
    console.log(this.state.user);

    axios.get(`${config.API_URL}/api/users`)
      .then((response) => {
        console.log('what is this-----', response.data)
        this.setState({
          users: response.data,
          filteredUsers: response.data
        })
      })
      .catch(() => {
        console.log('fetching failed')
      })

    if (!this.state.user) {
      axios.get(`${config.API_URL}/api/user`, { withCredentials: true })
        .then((response) => {
          console.log("logged in user info", response);
          this.setState({
            user: response.data
          })
        })
        .catch((err) => {
          console.log("error gettin logged in user-----", err);
        });
    }

    this.setState({
      isMounted: true
    })
  }


  handleEditMusician = (event) => {
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


    axios.patch(`${config.API_URL}/api/musician-profile/${user._id}`, editedUser, { withCredentials: true })
      .then((response) => {
        console.log('-----edit----', response.data)
        this.setState(
          { user: response.data },
          () => {
            this.props.history.push(`/profile`)
          }
        )
      })
      .catch((err) => {
        console.log('Edit musician failed', err)
      })
  }


  handleEditOwner = (event) => {
    event.preventDefault();
    const { user } = this.state;

    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;

    let editedOwner = {
      firstName,
      lastName
    }

    axios.patch(`${config.API_URL}/api/owner-profile/${user._id}`, editedOwner, { withCredentials: true })
      .then((response) => {
        this.setState({
          user: response.data
        }, () => {
          this.props.history.push(`/profile`)
        })
      })
      .catch((err) => {
        console.log("edit owner failed", err);
      });
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
        console.log(err);
      });
  }

  handleVenueChange = (event) => {
    let searchText = event.target.value.split(' ')
    let filteredVenueList = this.state.venues.filter((singleVenue) => {
      {
        for (let i = 0; i < searchText.length; i++) {
          if (searchText.length === 1) {
            return singleVenue.size[0].toLowerCase().includes(searchText[i]) || singleVenue.location[0].toLowerCase().includes(searchText[i])
          }
          else {
            return singleVenue.size[0].toLowerCase().includes(searchText[0]) && singleVenue.location[0].toLowerCase().includes(searchText[1]) || singleVenue.size[0].toLowerCase().includes(searchText[1]) && singleVenue.location[0].toLowerCase().includes(searchText[0])
          }
        }
      }
      return
    })
    this.setState({
      filteredVenues: filteredVenueList
    })
  }


  handleChange = (event) => {
    let searchText = event.target.value.split(' ')
    let filterList = this.state.users.filter((singleUser) => {
      {
        for (let i = 0; i < searchText.length; i++) {
          console.log(searchText.length)
          if (searchText.length === 1) {
            return singleUser.instrument[0].toLowerCase().includes(searchText[i]) || singleUser.genre[0].toLowerCase().includes(searchText[i])
          }
          else {
            return singleUser.instrument[0].toLowerCase().includes(searchText[0]) && singleUser.genre[0].toLowerCase().includes(searchText[1]) || singleUser.instrument[0].toLowerCase().includes(searchText[1]) && singleUser.genre[0].toLowerCase().includes(searchText[0])
          }
        }
      }
      //console.log('singleUser-----',singleUser)
      return
    })
    this.setState({
      filteredUsers: filterList
    })
  }

  handleAddVenue = (event) => {
    event.preventDefault();

    const { user } = this.state;
    const { title, location, size } = event.target;

    let newVenue = {
      title: title.value,
      location: location.value,
      size: size.value,
      ownerId: user._id
    }

    axios.post(`${config.API_URL}/api/add-venue`, newVenue)
      .then((response) => {
        console.log(response.data);
        this.setState({
          venues: [...this.state.venues, response.data]
        }, () => {
          this.props.history.push('/profile')
        })
      })
      .catch((err) => {
        console.log(err);
      });

  }




  render() {
    const { user, users, filteredUsers, venues } = this.state
    // console.log(this.state.user)
    // console.log(this.state.isMounted);

    if (!this.state.isMounted) {
      // <Spinner animation="grow" />
      // return <Spinner animation="border" role="status">
      //   <span className="sr-only">Loading...</span>
      // </Spinner>
      return null
    }


    // if (!this.state.user) return (
    //   <>
    //     {/* <Nav
    //       onSignUp={this.handleSignUp}
    //       onSignIn={this.handleSignIn}
    //       onSignOut={this.handleSignOut} />
    //     <LandingPage /> */}
    //     {/* <Redirect to="/" /> */}
    //   </>
    // )


    // console.log(this.state.user)


    return (
      <div className="App">
        <Nav
          user={user}
          onSignUp={this.handleSignUp}
          onSignIn={this.handleSignIn}
          onSignOut={this.handleSignOut} />


        <div className="page">

          <Switch>
            <Route exact path='/' render={(routeProps) => {
              return (
                <LandingPage {...routeProps} />
              )
            }} />


            {/* authorized routes */}

            <Route path='/home' render={(routeProps) => {
              return (
                <Home {...routeProps} user={user} />
              )
            }} />

            <Route path='/search/musicians' render={(routeProps) => {
              return (
                <MusicianSearch user={user} filteredUsers={filteredUsers} myChange={this.handleChange} {...routeProps} />
              )
            }} />

            <Route path='/search/venues' render={(routeProps) => {
              return (
                <VenueSearch user={user} venueChange={this.handleVenueChange} {...routeProps} />
                // filteredVenues={filteredVenues}
              )
            }} />

            <Route exact path="/profile" render={(routeProps) => {
              return (
                <Profile user={user} venues={venues} {...routeProps} />
              )
            }} />

            <Route exact path='/musician-profile/edit' render={(routeProps) => {
              return (
                <MusicianProfileEdit user={user} {...routeProps} onEdit={this.handleEditMusician} />
              )
            }} />

            <Route exact path='/owner-profile/edit' render={(routeProps) => {
              return (
                <OwnerProfileEdit user={user} {...routeProps} onEdit={this.handleEditOwner} />
              )
            }} />

            <Route path='/add-venue' render={routeProps => {
              return (
                <AddVenueForm {...routeProps} onAdd={this.handleAddVenue} />
              )
            }} />


          </Switch>

        </div>
      </div>
    );
  }

}

export default withRouter(App);
