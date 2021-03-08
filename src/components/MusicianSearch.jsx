import React, { Component } from "react";
import { Form, Row, Col, Card } from "react-bootstrap";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import ErrorPage from "./ErrorPage";


class MusicianSearch extends Component {

  render() {
    const { user, filteredUsers, onSearch } = this.props;
    if (!user) return null;

    return (
      user.type === "owner"
        ? (<ErrorPage />)
        : (
          <div className="search-results">
            <h1>musician search</h1>
            <Form>
              <fieldset>
                <Form.Group as={Row}>
                  <Col sm={10}>
                    <Form.Check
                      type="radio"
                      label="I'm looking for musicians"
                      value='musicianSearch'
                      name="searchType"
                      id="musicianSearch"
                      defaultChecked
                    //onChange={this.onValueChange}
                    />
                    <Form.Check
                      type="radio"
                      label="I'm looking for bands"
                      value="bandSearch"
                      name="searchType"
                      id="bandSearch"
                    //onChange={this.onValueChange}
                    />
                  </Col>
                </Form.Group>
              </fieldset>
            </Form>
            <Form.Group>
              <Form.Control
                onChange={onSearch}
                type="text"
                name="instrument"
                placeholder="Instrument"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                onChange={onSearch}
                type="text"
                name="genre"
                placeholder="Genre"
              />
            </Form.Group>
            <h3>Results:</h3>
            {filteredUsers.map((singleUser) => {
              return (
                <Link key={singleUser._id} to={`/musician/${singleUser._id}`}>
                  <Card className="card-style">
                    <Card.Body>
                      <Card.Title>{singleUser.firstName} {singleUser.lastName}</Card.Title>
                      <Card.Text>{singleUser.instrument}</Card.Text>
                      <Card.Text>{singleUser.genre}</Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              );
            })}
          </div>
        )
    )
  }
}

export default MusicianSearch;
