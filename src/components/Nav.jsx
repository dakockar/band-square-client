import React from "react";
import { Navbar, Dropdown, NavItem, NavLink } from 'react-bootstrap';
import { Link, Redirect } from "react-router-dom";
import SignUp from './SignUp';
import SignIn from './SignIn';

function Nav(props) {

  const { user } = props;

  return (
    <Navbar>
      {
        props.user
          ? (
            <>
              <Navbar.Brand>
                <Link to="/home">Logo</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                  <Dropdown as={NavItem} alignRight>
                    <Dropdown.Toggle as={NavLink}>
                      {user.firstName || user.email}
                    </Dropdown.Toggle>
                    <Dropdown.Menu >
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
              {/* <Redirect to="/" /> */}
            </>
          )
      }
    </Navbar>
  );
}

export default Nav