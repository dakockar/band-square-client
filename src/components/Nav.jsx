import React from "react";
import { Navbar, Button, NavDropdown, Dropdown, NavItem, NavLink } from 'react-bootstrap';
import { Link, Redirect } from "react-router-dom";
import SignUp from './SignUp';
import SignIn from './SignIn';

function Nav(props) {
  return (
    <Navbar>
      {
        props.user
          ? (
            <>
              <Navbar.Brand>
                <Link to="/home">Home</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                  {/* <NavDropdown title={props.user.email} id="basic-nav-dropdown">
                    <NavDropdown.Item>
                      <Link to='/musician-profile'>profile</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={props.onSignOut}>
                      Sign Out
                    </NavDropdown.Item>
                  </NavDropdown> */}
                  <Dropdown as={NavItem} >
                    <Dropdown.Toggle as={NavLink}>
                      {props.user.email}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <Link to='/musician-profile'>Profile</Link>
                      </Dropdown.Item>
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
                Logo
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
              <Redirect to="/" />
            </>
          )
      }
    </Navbar>
  );
}

export default Nav