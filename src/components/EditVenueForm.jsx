import axios from "axios";
import React, { Component } from "react";
import { Form, Button, InputGroup, FormControl, ListGroup } from "react-bootstrap";
import config from "../config";

export default class EditVenueForm extends Component {
  state = {
    venue: null,
    showButton1: false,
    showButton2: false,
    showButton3: false,
    imageList: [],
    imgUrl: null
  };

  componentDidMount() {
    const { venueId } = this.props.match.params;

    axios
      .get(`${config.API_URL}/api/venue/${venueId}`)
      .then((response) => {
        // console.log("get venue by id");
        console.log("venue-----", response.data);
        this.setState({
          venue: response.data,
          imageList: response.data.imgUrl
        });
      })
      .catch((err) => {
        console.log("get venue failed", err);
      });
  }

  handleAddImg = (event) => {
    event.preventDefault();
    const { imgUrl, imageList } = this.state;

    if (!imgUrl) {
      return
    }
    this.setState({
      imageList: [...imageList, imgUrl],
      imgUrl: ""
    })
  };

  handleImgChange = (event) => {
    const imgUrl = event.target.value
    this.setState({
      imgUrl
    })
  }

  handleDeleteImg = (index) => {
    const { imageList } = this.state;
    let clonedImageList = JSON.parse(JSON.stringify(imageList));
    clonedImageList.splice(index, 1);

    this.setState({
      imageList: clonedImageList
    })
  }

  render() {
    console.log('------', this.state.imageList)
    const { venue, imageList } = this.state;
    // console.log(this.props);

    if (!venue) return null;

    return (
      <div>
        <Form
          onSubmit={(event) => {
            this.props.onEdit(event, venue._id, imageList);
          }}
        >
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              type="text"
              placeholder="Enter title"
              defaultValue={venue.title}
            />
          </Form.Group>
          <Form.Group controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Control
              name="location"
              type="text"
              placeholder="Location"
              defaultValue={venue.location}
            />
          </Form.Group>
          <Form.Group controlId="size">
            <Form.Label>Size (m<sup>2</sup>)</Form.Label>
            <Form.Control
              name="size"
              type="text"
              placeholder="Size (m^2)"
              defaultValue={venue.size}
            />
          </Form.Group>
          <Form.Label>Images</Form.Label>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="image url"
              aria-describedby="basic-addon2"
              name='imgUrl'
              onChange={this.handleImgChange}
            />
            <InputGroup.Append>
              <Button onClick={this.handleAddImg} variant="outline-secondary">Add image</Button>
            </InputGroup.Append>
          </InputGroup>
          <ul>
            {
              imageList.map((img, index) => {
                return (
                  <li key={index}>
                    <img className="thumbnail" src={img} alt="room" />
                    <Button onClick={() => { this.handleDeleteImg(index) }} className="x-btn" variant="danger">x</Button>
                  </li>
                )
              })
            }
          </ul>
          <Button className="button" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}
