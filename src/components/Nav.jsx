import React from "react";
import { Navbar } from 'react-bootstrap'

function Nav(props) {
  return (
    <Navbar>
      {/* {
        props.user
          ? ( */}
      <>
        <Navbar.Brand href="#home">Logo</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">{props.user.firstName}</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </>
      {/* ) : (return null)
    } */}
    </Navbar>
  );
}

export default Nav