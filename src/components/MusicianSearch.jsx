import React from "react";
import { Form } from "react-bootstrap";

function MusicianSearch(props) {
  return (
    <div>
      <h1>musician search</h1>
      <Form>
        <div key="default-checkbox" className="mb-3">
          <Form.Check
            type="checkbox"
            id="band-check"
            label="I'm looking for a band"
          />
          <Form.Check
            type="checkbox"
            id="music-check"
            label="I'm looking for musicians"
          />
        </div>
      </Form>
      <Form.Group>
        <Form.Control onChange={props.myChange} type="text" placeholder="Search" />
      </Form.Group>

      {/* <p>{props.user.firstName}</p>
      <p>{props.user.genre}</p>
      <p>{props.user.instrument}</p>
      <p>{props.user.location}</p> */}
    </div>
  );
}

export default MusicianSearch;
