import React from "react";
import { Navbar, Dropdown, NavItem, NavLink } from 'react-bootstrap';
import { Link } from "react-router-dom";
import SignUp from './SignUp';
import SignIn from './SignIn';
import logo from '../images/bandsquare-logo.png';

function Nav(props) {
  const { user, error } = props;

  return (
    <Navbar className="navbar">
      {
        user
          ? (
            <>
              <Navbar.Brand as={Link} to='/home'>
                <img className="logo" src={logo} alt="logo" />
              </Navbar.Brand>

              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                {
                  user.type === "musician"
                  && (
                    <div className='nav-search'>
                      <Link className='search-navlink' to='/search/musicians'>Musicians</Link>
                      <Link className='search-navlink' to='/search/bands'>Bands</Link>
                      <Link className='search-navlink' to='/search/venues'>Venues</Link>
                    </div>
                  )
                }
                <Navbar.Text>
                  <Dropdown as={NavItem} alignRight>
                    <Dropdown.Toggle className="grey-text" as={NavLink}>
                      {user.firstName || user.email}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-box">
                      <Dropdown.Item as={Link} to='/profile'>
                        Profile
                      </Dropdown.Item>
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
                  <SignIn error={error} onSignIn={props.onSignIn} />
                </Navbar.Text>
                <Navbar.Text>
                  <SignUp error={error} onSignUp={props.onSignUp} />
                </Navbar.Text>
              </Navbar.Collapse>
            </>
          )
      }
    </Navbar>
  );
}

export default Nav;