import React from "react";
import { Navbar, Button } from 'react-bootstrap'

function Nav(props) {
  return (
    <Navbar>
      {
        props.user !== null
          ? (
            <>
              <Navbar.Brand href="#home">Logo</Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                  Signed in as: <a href="#login">{props.user.firstName}</a>
                  <Button onClick={props.onSignOut}>Sign Out</Button>

                </Navbar.Text>
              </Navbar.Collapse>
            </>
          )
          : (
            <>
              <Navbar.Brand href="#home">Logo</Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                  hi

                </Navbar.Text>
              </Navbar.Collapse>
            </>
          )
      }
    </Navbar>
  );
}

export default Nav