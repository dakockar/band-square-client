# BandSquare

## Description
This is an app that connects musisicans with each other and with people who are renting out practice space or venues

## User Stories
- 404: As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
- Landing page: As a anon I can click on the sign up or sign in button
- Signup: As an anon I can sign up in the platform so that I can use platform
- Login: As a user I can login to the platform so that I can use the platform
- Logout: As a user I can logout from the platform
- Home page: As an user I can choose between two search options. If my userprofile is not complete I will get a popup message
- Search musicians/bands: As I user I can search for bands to join, find people to join my band or cooperate with musicians
- Search venues: As I user a can look for venues where I or my band can practice, or a venue where I or my band can perform
- NavBar: I want to have a navbar that allows me to move between the different pages.
- Profile page: As an user I can add/edit info on my profile
- Add Venue page: As a owner of a venue I can add my venues in the venue page 
- Delete elements As a user I can delete elements from my backlog
- Venue Details: When clicked on, I can see the details of the venue


## Backlog
- Chat function for users to communicate
- User can rate each other and the venues
- User can leave comments
- Payment system for venue booking

# Client / Frontend
## React Router Routes (React App)

<!-- |   /               | SplashPage          	public <Route>	Home page -->

<!-- /logout	n/a	user only <PrivateRoute>	Navigate to homepage after logout, expire session -->
<!-- /search/musicians	SearchForm, SearchResults	user only <PrivateRoute> -->
<!-- /search/venues	SearchForm, SearchResults	user only <PrivateRoute>	 -->
<!-- /musician/:id shows you musicians page with details -->
<!-- /profile/:id	Profile, Stats	user only <PrivateRoute>	Check profile with stat information -->
<!-- /add-venue add a venue -->
<!-- /profile/:id/edit gives you edit form to edit  -->
<!-- /venue/:id show details of venue -->
<!-- /venue/:id/edit edit info about the venue -->


| Path                      | Component                      | Permissions | Behavior                                                     |
| ------------------------- | --------------------           | ----------- | ------------------------------------------------------------ |
| `/`                       | LandingPage                    | public `<Route>`            | Home page                                              |
| `/logout`                 | n/a                            | user only `<PrivateRoute>`  | Navigate to homepage after logout, expire session      |
| `/search/musicians`       | SearchForm, SearchResults      | user only `<PrivateRoute>`  | Shows musician search page                             |
| `/search/venues`          | SearchForm, SearchResults      | user only `<PrivateRoute>`  | Shows venue search page                                |
| `/musician/:id`           | MusicianDetails                | user only `<PrivateRoute>`  | Shows musician details page                            |
| `/profile`                | Profile                        | user only `<PrivateRoute>`  | Check profile with stat information                    |
| `/add-venue`              | AddVenueForm                   | user only `<PrivateRoute>`  | Shows the form to add a new venue                      |
| `/search/games`           | SearchForm, SearchResults      | user only `<PrivateRoute>`  | Search a game to be added                              |
| `/profile/:id/edit`       | EditProfileForm                | user only `<PrivateRoute>`  | Shows edit profile form                                |
| `/venue/:id`              | VenueDetails                   | user only `<PrivateRoute>`  | Shows venue details page                               |
| `/venue/:id/edit`         | EditVenueForm                  | user only `<PrivateRoute>`  | Shows edit venue form                                  |



## Components
- LandingPage
- LoginPage
- SignupPage
- NavBar
- Footer
- Profile
- ownProfile (?)
- VenueDetails
- AddVenueForm
- EditVenueForm
- EditProfileForm
- MusicianSearch
- VenueSearch
- 404Page



## Services

- Auth Service
    - auth.login(user)
    - auth.signup(user)
    - auth.logout()
    - auth.me()


API for Maps
API for chat function
API for f



# Server / Backend
## Models

Musician Model

```javascript
Musician = {
 email: {type: string, required: true, unique: true},
 password: String,
 firstName: String,
 lastName: String,
 imgUrl: String,
 location: String,
 instrument: String,
 bandName: String,
 refUrl: String
}
```

Owner Model

```javascript
Owner = {
 email: {type: string, required: true, unique: true},
 password: String,
 firstName: String,
 lastName: String,
 imgUrl: String,
 venues: Array
}
```

Venue Model

```javascript
Venue = {
 title: String,
 imgUrl: String,
 location: String,
 size: Number,
 owner: {type: Schema.Types.ObjectId, ref: “Owner”}
}
```



## API Endpoints (backend routes)
HTTP Method	URL	Request Body	Success status	Error Status	Description
GET	/api/profile	Saved session	200	404	Check if user is logged in and return profile page
POST	/api/signup	{name, email, password}	201	404	Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session
POST	/api/signin	{username, password}	200	401	Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session
POST	/api/logout	(empty)	204	400	Logs out the user
POST    /api/add-venue

GET /api/profile/:id
GET /api/venue/:id

DELETE /api/venue/:id
DELETE /api/profile/:id

PATCH /api/venue/:id
PATCH /api/profile/:id
PATCH /owner-profile/:id



Git
The url to your repository and to your deployed project

Client repository Link

Server repository Link

Deployed App Link

Slides
The url to your presentation slides
Slides Link