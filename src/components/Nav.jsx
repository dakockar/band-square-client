import React from "react";
import { Navbar, Dropdown, NavItem, NavLink } from 'react-bootstrap';
import { Link, Redirect } from "react-router-dom";
import SignUp from './SignUp';
import SignIn from './SignIn';
import logo from '../images/bandsquare-logo.png';

function Nav(props) {

  const { user } = props;

  return (
    <Navbar className="navbar">
      {
        props.user
          ? (
            <>
              <Navbar.Brand as={Link} to='/home'>
                <img className="logo" src={logo} alt="logo" />
              </Navbar.Brand>
              
              <Navbar.Toggle aria-controls="responsive-navbar-nav"/>              
              <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
              <div className='nav-search'>
              <Link className='search-navlink' to='/search/musicians'>Musicians</Link>
              <Link className='search-navlink' to='/search/bands'>Bands</Link>
              <Link className='search-navlink' to='/search/venues'>Venues</Link>
              </div>
                <Navbar.Text>
                  <Dropdown as={NavItem} alignRight>
                    <Dropdown.Toggle className="grey-text" as={NavLink}>
                      {user.firstName || user.email}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-box">
                      <Dropdown.Item as={Link} to='/profile'>
                        Profile
                      </Dropdown.Item>
                      {/* <Dropdown.Item as={Link} to='/chat'>
                        Chat
                      </Dropdown.Item> */}
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={props.onSignOut}>
                        Sign Out
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Navbar.Text>
              </Navbar.Collapse>
            </>
          )
          : (
            <>
              <Navbar.Brand>
                <img className="logo" src={logo} alt="logo" />
              </Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                  <SignIn onSignIn={props.onSignIn} />
                </Navbar.Text>
                <Navbar.Text>
                  <SignUp onSignUp={props.onSignUp} />
                </Navbar.Text>
              </Navbar.Collapse>
              {/* <Redirect to="/" /> */}
            </>
          )
      }
    </Navbar>
  );
}

export default Nav