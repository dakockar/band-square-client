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
import Chat from "./components/Chat";
import EditVenueForm from "./components/EditVenueForm";
import VenueDetails from "./components/VenueDetails";
import MusicianDetails from "./components/MusicianDetails.jsx";
import UploadImageForm from "./components/UploadImageForm";
import ErrorPage from './components/ErrorPage'


class App extends Component {
  state = {
    user: null,
    isMounted: false,
    isLoggedIn: false,
    users: [],
    venues: [],
    error: null
  };

  componentDidMount() {
    console.log(this.state.user);

    if (!this.state.user) {
      axios
        .get(`${config.API_URL}/api/user`, { withCredentials: true })
        .then((response) => {
          //console.log("logged in user info", response);
          this.setState({
            user: response.data,
          });
        })
        .catch((err) => {
          console.log("Error gettin logged in user-----", err);
        });
    }


    this.setState({
      isMounted: true,
    });
  }

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
        console.log("all data", response);
        console.log("response.data", response.data);
        this.handleSignIn(event);
      })
      .catch((error) => {
        console.log("Error while signin up", error);
        this.setState({
          error:error
        })
      });
  };

  handleSignIn = (event) => {
    event.preventDefault();
    let newUser = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    axios
      .post(`${config.API_URL}/api/signin`, newUser, { withCredentials: true })
      .then((response) => {
        console.log("Succesfully signed in --------", response.data);
        this.setState(
          {
            user: response.data,
            isLoggedIn: true
          },
          () => {
            this.props.history.push("/home");
          }
        );
      })
      .catch((error) => {
        console.log("Error while signin in", error);
        this.setState({
          error: error
        })
      });
  };

  handleSignOut = () => {
    axios
      .post(`${config.API_URL}/api/signout`, {}, { withCredentials: true })
      .then(() => {
        console.log("LOGOUT_____");
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

  handleEditMusician = (event) => {
    event.preventDefault();
    const { user, users } = this.state;
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
        console.log("-----edit----", response.data);
        let editedUsersList = users.map((singleUser) => {
          if (user._id === singleUser._id) {
            singleUser = response.data;
          }
          return singleUser;
        });

        this.setState(
          {
            user: response.data,
            users: editedUsersList,
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

  handleUploadImage = (event) => {
    event.preventDefault();

    const { user, users } = this.state;
    const image = event.target.userImg.files[0];
    // console.log(image);

    let uploadForm = new FormData();
    uploadForm.append("imageUrl", image);

    axios.post(`${config.API_URL}/api/upload`, uploadForm)
      .then((response) => {
        // console.log(response.data.image);
        let imgUrl = response.data.image;
        let type = user.type;

        axios.patch(`${config.API_URL}/api/upload/${user._id}`, { imgUrl, type }, { withCredentials: true })
          .then((response) => {
            console.log(response.data);
            let editedUsersList = users.map((singleUser) => {
              if (user._id === singleUser._id) {
                singleUser = response.data;
              }
              return singleUser;
            });

            this.setState(
              {
                user: response.data,
                users: editedUsersList,
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

  handleAddVenue = (event, imageArr) => {
    event.preventDefault();

    const { user, venues } = this.state;
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
        console.log(response.data);
        this.props.history.push("/profile");

        // this.setState(
        //   {
        //     venues: [...venues, response.data],
        //   },
        //   () => {
        //     this.props.history.push("/profile");
        //   }
        // );
      })
      .catch((err) => {
        console.log('Errow while adding new venue', err);
      });
  };

  handleEditVenue = (event, venueId, imageArr) => {
    event.preventDefault();
    const { venues } = this.state;

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
        console.log("venue edited: ", response.data);

        let editedVenuesList = venues.map((venue) => {
          if (venue._id === venueId) {
            venue = response.data;
          }
          return venue;
        });

        // console.log(editedVenuesList);

        this.setState(
          {
            venues: editedVenuesList,
          },
          () => {
            this.props.history.push(`/venue/${venueId}`);
          }
        );
      })
      .catch((err) => {
        console.log("Error while editing venue", err);
      });
  };

  handleDeleteVenue = (venueId) => {
    const { venues } = this.state;

    const clonedVenues = JSON.parse(JSON.stringify(venues));

    // console.log("venue to be deleted: ", venueId);

    axios
      .delete(`${config.API_URL}/api/venue/${venueId}`)
      .then((response) => {
        // console.log(response);

        let venuesList = clonedVenues.filter((venue) => venue._id !== venueId);

        this.setState(
          {
            venues: venuesList,
          },
          () => {
            this.props.history.push("/profile");
          }
        );
      })
      .catch((err) => {
        console.log("Error while deleting venue", err);
      });
  };


  render() {
    const { user, venues, isMounted, isLoggedIn, error } = this.state;

    // console.log("render venues", this.state.venues);

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

            {/* authorized routes */}



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

            <Route path="/chat/:userId" render={(routeProps) => {
              return (<Chat {...routeProps} user={user} />)
            }} />

            {/* <Route path="/join" component={Join} /> */}
            <Route path='*' component={ErrorPage} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
