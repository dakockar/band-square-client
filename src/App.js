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
import EditVenueForm from "./components/EditVenueForm";
import "./App.css";
import VenueDetails from "./components/VenueDetails";

class App extends Component {

  state = {
    user: null,
    isMounted: false,
    users: [],
    filteredUsers: [],
    venues: [],
    filteredVenues: [],
    // for keeping search terms
    instrument: [],
    genre: [],
    size: 0,
    location: [],
    title: []
  }


  componentDidMount() {
    console.log(this.state.user);


    // get all users
    axios.get(`${config.API_URL}/api/users`)
      .then((response) => {
        console.log('what is this-----', response.data)
        this.setState({
          users: response.data,
          filteredUsers: response.data
        })
      })
      .catch(() => {
        console.log('fetching users failed')
      })

    // get all venues
    axios.get(`${config.API_URL}/api/venues`)
      .then((response) => {
        this.setState({
          venues: response.data,
          filteredVenues: response.data
        })
      })
      .catch(() => {
        console.log('fetching venues failed')
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
    const { user, users } = this.state
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

        // update the users and filteredUsers states
        let editedUsersList = users.map(singleUser => {
          if (user._id === singleUser._id) {
            singleUser = response.data;
          }
          return singleUser;
        })

        this.setState({
          user: response.data,
          users: editedUsersList,
          filteredUsers: editedUsersList
        },
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

  onMusicianSearch = (event) => {
    let name = event.target.name;
    let value = event.target.value.split(' ');

    switch (name) {
      case 'instrument': this.setState({ instrument: value }, this.handleMusicianSearch);
        break;
      case 'genre': this.setState({ genre: value }, this.handleMusicianSearch)
        break;
    }
  }

  handleMusicianSearch = () => {
    const { instrument, genre } = this.state;
    // console.log(instrument, genre)

    let clonedUsers = JSON.parse(JSON.stringify(this.state.users));
    // console.log(clonedUsers);

    // filter by instrument
    let filterList = clonedUsers.filter(singleUser => {
      if (!instrument.length) return true;
      for (let i = 0; i < instrument.length; i++) {
        if (i > 0 && !instrument[i]) return false;

        for (let inst of singleUser.instrument) {
          if (inst.toLowerCase().includes(instrument[i].toLowerCase())) return true;
        }
      }
    })
    // console.log(filterList);

    // filter by genre
    filterList = filterList.filter(singleUser => {
      if (!genre.length) return true;
      for (let i = 0; i < genre.length; i++) {
        if (i > 0 && !genre[i]) return false;

        for (let gen of singleUser.genre) {
          if (gen.toLowerCase().includes(genre[i].toLowerCase())) return true;
        }
      }
    })
    // console.log(filterList)

    this.setState({
      filteredUsers: filterList
    })
  }

  onVenueSearch = (event) => {
    let name = event.target.name;
    let value = event.target.value.split(' ');

    switch (name) {
      case 'size': this.setState({ size: value[0] }, this.handleVenueSearch);
        break;
      case 'location': this.setState({ location: value }, this.handleVenueSearch)
        break;
      case 'title': this.setState({ title: value }, this.handleVenueSearch)
        break;
    }
  }

  handleVenueSearch = () => {
    let clonedVenues = JSON.parse(JSON.stringify(this.state.venues));

    const { size, location, title } = this.state;

    // filter by size
    let filterList = clonedVenues.filter(singleVenue => {
      if (!Number(size)) return true;
      return Number(size) && singleVenue.size <= size
    })
    // console.log(filterList);

    // filter by location
    filterList = filterList.filter(singleVenue => {
      if (!location.length) return true;
      for (let i = 0; i < location.length; i++) {
        if (i > 0 && !location[i]) return false;
        if (singleVenue.location.toLowerCase().includes(location[i].toLowerCase())) return true;
      }
    })
    // console.log(filterList);

    // filter by title
    filterList = filterList.filter(singleVenue => {
      if (!title.length) return true;
      for (let i = 0; i < title.length; i++) {
        if (i > 0 && !title[i]) return false;
        if (singleVenue.title.toLowerCase().includes(title[i].toLowerCase())) return true;
      }
    })
    // console.log(filterList);

    this.setState({
      filteredVenues: filterList
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
          venues: [...this.state.venues, response.data],
          filteredVenues: [...this.state.venues, response.data]
        }, () => {
          this.props.history.push('/profile')
        })
      })
      .catch((err) => {
        console.log(err);
      });

  }

  handleEditVenue = (event, venueId) => {
    event.preventDefault();
    const { venues } = this.state;

    // console.log(event.target.title.value);
    // console.log(venueId);

    const { title, location, size } = event.target;

    let editedVenue = {
      title: title.value,
      location: location.value,
      size: size.value
    }

    axios.patch(`${config.API_URL}/api/venue/${venueId}`, editedVenue, { withCredentials: true })
      .then((response) => {
        console.log("venue edited: ", response.data);

        let editedVenuesList = venues.map(venue => {
          if (venue._id === venueId) {
            venue = response.data;
          }
          return venue;
        })

        // console.log(editedVenuesList);

        this.setState({
          venues: editedVenuesList,
          filteredVenues: editedVenuesList
        }, () => {
          this.props.history.push(`/profile`)
        })
      })
      .catch((err) => {
        console.log("venue edit failed", err);
      });
  }

  handleDeleteVenue = (venueId) => {
    const { venues } = this.state;

    const clonedVenues = JSON.parse(JSON.stringify(venues));

    // console.log("venue to be deleted: ", venueId);

    axios.delete(`${config.API_URL}/api/venue/${venueId}`)
      .then((response) => {
        // console.log(response);

        let venuesList = clonedVenues.filter(venue => venue._id !== venueId)

        this.setState({
          venues: venuesList,
          filteredVenues: venuesList
        }, () => {
          this.props.history.push("/profile");
        })
      })
      .catch((err) => {
        console.log("venue deletion failed", err);
      });

  }


  render() {
    const { user, users, filteredUsers, venues, filteredVenues } = this.state;


    // console.log("render venues", this.state.venues);
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
                <MusicianSearch user={user} filteredUsers={filteredUsers} onSearch={this.onMusicianSearch} {...routeProps} />
              )
            }} />

            <Route path='/search/venues' render={(routeProps) => {
              return (
                <VenueSearch user={user} filteredVenues={filteredVenues} onSearch={this.onVenueSearch} {...routeProps} />
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


            <Route exact path='/venue/:venueId' render={routeProps => {
              return (
                <VenueDetails {...routeProps} onDelete={this.handleDeleteVenue} />
              )
            }} />

            <Route path='/venue/:venueId/edit' render={routeProps => {
              return (
                <EditVenueForm {...routeProps} onEdit={this.handleEditVenue} />
              )
            }} />


          </Switch>

        </div>
      </div>
    );
  }

}

export default withRouter(App);
