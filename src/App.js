import React, { Component } from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from "axios";
import config from "./config";
import Nav from "./components/Nav";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import MusicianSearch from "./components/MusicianSearch";
import BandSearch from "./components/BandSearch";
import VenueSearch from "./components/VenueSearch";
import Profile from "./components/Profile";
import MusicianProfileEdit from "./components/MusicianProfileEdit";
import OwnerProfileEdit from "./components/OwnerProfileEdit";
import AddVenueForm from "./components/AddVenueForm";
import EditVenueForm from "./components/EditVenueForm";
import VenueDetails from "./components/VenueDetails";
import MusicianDetails from "./components/MusicianDetails.jsx";
import UploadImageForm from "./components/UploadImageForm";
import ErrorPage from './components/ErrorPage'
import Chat from "./components/Chat";


class App extends Component {
  state = {
    user: null,
    isMounted: false,
    isLoggedIn: false,
    error: null,
  };

  componentDidMount() {
    if (!this.state.user) {
      axios
        .get(`${config.API_URL}/api/user`, { withCredentials: true })
        .then((response) => {
          this.setState({
            user: response.data,
            isLoggedIn: true,
          });
        })
        .catch((err) => {
          console.log("Error getting logged in user-----", err);
        });
    }


    this.setState({
      isMounted: true,
    });
  }

  // Sign up logic 
  handleSignUp = (event) => {
    event.preventDefault();

    let newUser = {
      email: event.target.email.value,
      password: event.target.password.value,
      type: event.target.type.value,
    };

    axios
      .post(`${config.API_URL}/api/signup`, newUser)
      .then((response) => {
        this.handleSignIn(event);
      })
      .catch((error) => {
        this.setState({
          error: error
        })
      });
  };

  // Sign in logic
  handleSignIn = (event) => {
    event.preventDefault();
    let newUser = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    axios
      .post(`${config.API_URL}/api/signin`, newUser, { withCredentials: true })
      .then((response) => {
        this.setState(
          {
            user: response.data,
            isLoggedIn: false
          },
          () => {
            this.props.history.push("/home");
          }
        );
      })
      .catch((error) => {
        console.log("Error while signing in", error);
        this.setState({
          error: error
        })
      });
  };

  // Sign out logic
  handleSignOut = () => {
    axios
      .post(`${config.API_URL}/api/signout`, {}, { withCredentials: true })
      .then(() => {
        this.setState(
          {
            user: null,
            isLoggedIn: false
          },
          () => {
            this.props.history.push("/");
          }
        );
      })
      .catch((err) => {
        console.log('Error while signin out', err);
      });
  };

  // Edit Musician profile logic
  handleEditMusician = (event) => {
    event.preventDefault();
    const { user } = this.state;
    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const instrument = event.target.instrument.value;
    const genre = event.target.genre.value;
    const location = event.target.location.value;
    const bandName = event.target.bandName.value;
    const aboutMe = event.target.aboutMe.value;
    const lookingFor = event.target.lookingFor.value;

    let editedUser = {
      firstName,
      lastName,
      instrument,
      genre,
      location,
      bandName,
      aboutMe,
      lookingFor
    };

    axios
      .patch(
        `${config.API_URL}/api/musician-profile/${user._id}`,
        editedUser,
        { withCredentials: true }
      )
      .then((response) => {
        this.setState(
          {
            user: response.data,
          },
          () => {
            this.props.history.push(`/profile`);
          }
        );
      })
      .catch((err) => {
        console.log("Edit musician failed", err);
      });
  };

  // Edit Owner profile logic
  handleEditOwner = (event) => {
    event.preventDefault();
    const { user } = this.state;

    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;

    let editedOwner = {
      firstName,
      lastName,
    };

    axios
      .patch(`${config.API_URL}/api/owner-profile/${user._id}`, editedOwner, {
        withCredentials: true,
      })
      .then((response) => {
        this.setState(
          {
            user: response.data,
          },
          () => {
            this.props.history.push(`/profile`);
          }
        );
      })
      .catch((err) => {
        console.log("Edit owner failed", err);
      });
  };

  // Uploading Image using cloudinary
  handleUploadImage = (event) => {
    event.preventDefault();

    const { user } = this.state;
    const image = event.target.userImg.files[0];

    let uploadForm = new FormData();
    uploadForm.append("imageUrl", image);

    axios.post(`${config.API_URL}/api/upload`, uploadForm)
      .then((response) => {
        let imgUrl = response.data.image;
        let type = user.type;

        axios.patch(`${config.API_URL}/api/upload/${user._id}`, { imgUrl, type }, { withCredentials: true })
          .then((response) => {
            this.setState(
              {
                user: response.data,
              },
              () => {
                this.props.history.push(`/profile`);
              }
            );
          })
          .catch((err) => {
            console.log("Error uploading musician image", err);
          });
      })
      .catch((err) => {
        console.log('Error while uploading musician image', err)
      });

  }

  // Adding a venue logic
  handleAddVenue = (event, imageArr) => {
    event.preventDefault();

    const { user } = this.state;
    const { title, location, size } = event.target;

    let newVenue = {
      title: title.value,
      location: location.value,
      size: size.value,
      ownerId: user._id,
      imgUrl: imageArr
    };

    axios
      .post(`${config.API_URL}/api/add-venue`, newVenue)
      .then((response) => {
        this.props.history.push("/profile");
      })
      .catch((err) => {
        console.log('Errow while adding new venue', err);
      });
  };

  // Editing a venue logic
  handleEditVenue = (event, venueId, imageArr) => {
    event.preventDefault();

    const { title, location, size } = event.target;

    let editedVenue = {
      title: title.value,
      location: location.value,
      size: size.value,
      imgUrl: imageArr
    };

    axios
      .patch(`${config.API_URL}/api/venue/${venueId}`, editedVenue, {
        withCredentials: true,
      })
      .then((response) => {
        // console.log("venue edited: ", response.data);
        this.props.history.push(`/venue/${venueId}`)
      })
      .catch((err) => {
        console.log("Error while editing venue", err);
      });
  };

  // Deleting a venue logic
  handleDeleteVenue = (venueId) => {

    axios
      .delete(`${config.API_URL}/api/venue/${venueId}`)
      .then((response) => {
        this.props.history.push("/profile");
      })
      .catch((err) => {
        console.log("Error while deleting venue", err);
      });
  };


  render() {
    const { user, isMounted, error } = this.state;

    if (!isMounted) return null;

    return (
      <div className="App">
        <Nav
          user={user}
          error={error}
          onSignUp={this.handleSignUp}
          onSignIn={this.handleSignIn}
          onSignOut={this.handleSignOut}
        />

        <div className='page'>
          <Switch>
            <Route
              exact
              path="/"
              render={(routeProps) => {
                return <LandingPage {...routeProps} />;
              }}
            />

            <Route
              path="/home"
              render={(routeProps) => {
                return <Home {...routeProps} user={user} />;
              }}
            />

            <Route
              path="/search/musicians"
              render={(routeProps) => {
                return (
                  <MusicianSearch
                    user={user} {...routeProps} />
                );
              }} />

            <Route
              path="/search/bands"
              render={(routeProps) => {
                return (
                  <BandSearch
                    user={user} {...routeProps} />
                );
              }} />

            <Route
              path="/search/venues"
              render={(routeProps) => {
                return (
                  <VenueSearch
                    user={user} {...routeProps} />
                );
              }} />

            <Route
              exact
              path="/profile"
              render={(routeProps) => {
                return (
                  <Profile
                    {...routeProps}
                    user={user}
                  />
                );
              }}
            />

            <Route
              path="/upload-image"
              render={routeProps => {
                return (
                  <UploadImageForm
                    {...routeProps}
                    user={user}
                    onUpload={this.handleUploadImage} />
                )
              }} />

            <Route
              exact
              path="/musician-profile/edit"
              render={(routeProps) => {
                return (
                  <MusicianProfileEdit
                    {...routeProps}
                    user={user}
                    onImageUpload={this.handleUploadImage}
                    onEdit={this.handleEditMusician} />
                );
              }} />

            <Route
              exact
              path="/musician/:musicianId"
              render={(routeProps) => {
                return <MusicianDetails {...routeProps} />;
              }} />

            <Route
              exact
              path="/owner-profile/edit"
              render={(routeProps) => {
                return (
                  <OwnerProfileEdit
                    user={user}
                    {...routeProps}
                    onEdit={this.handleEditOwner} />
                );
              }} />

            <Route
              path="/add-venue"
              render={(routeProps) => {
                return (
                  <AddVenueForm
                    {...routeProps}
                    user={user}
                    onAdd={this.handleAddVenue} />
                );
              }} />

            <Route
              exact
              path="/venue/:venueId"
              render={(routeProps) => {
                return (
                  <VenueDetails
                    {...routeProps}
                    user={user}
                    onDelete={this.handleDeleteVenue} />
                );
              }} />

            <Route
              path="/venue/:venueId/edit"
              render={(routeProps) => {
                return (
                  <EditVenueForm
                    {...routeProps}
                    user={user}
                    onEdit={this.handleEditVenue} />
                );
              }} />

            <Route path="/chat/musician/:recipientId" render={(routeProps) => {
              return (<Chat {...routeProps} user={user} recipientType="musician" />)
            }} />

            <Route path="/chat/owner/:recipientId" render={(routeProps) => {
              return (<Chat {...routeProps} user={user} recipientType="venue" />)
            }} />

            <Route path='*' component={ErrorPage} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);