import React, { Component } from 'react';
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
import NotAuthorized from './NotAuthorized';


export default class AddVenueForm extends Component {
  state = {
    imageList: [],
    imgUrl: null
  };

  // Adding an image
  handleAddImg = (event) => {
    event.preventDefault();
    const { imgUrl, imageList } = this.state;

    if (!imgUrl) {
      return;
    }
    this.setState({
      imageList: [...imageList, imgUrl],
      imgUrl: ""
    });
  };

  // Changing an image
  handleImgChange = (event) => {
    const imgUrl = event.target.value;
    this.setState({
      imgUrl
    });
  };

  // Deleting an image
  handleDeleteImg = (index) => {
    const { imageList } = this.state;
    let clonedImageList = JSON.parse(JSON.stringify(imageList));
    clonedImageList.splice(index, 1);

    this.setState({
      imageList: clonedImageList
    });
  };

  render() {
    const { onAdd, user } = this.props;
    const { imageList } = this.state;

    if (!user) return null;
    if (user.type === "musician") return <NotAuthorized />;

    return (
      <div>
        <Form onSubmit={(event) => { onAdd(event, imageList); }}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control name="title" type="text" placeholder="Enter title" />
          </Form.Group>
          <Form.Group controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Control name="location" type="text" placeholder="Location" />
          </Form.Group>
          <Form.Group controlId="size">
            <Form.Label>Size (m<sup>2</sup>)</Form.Label>
            <Form.Control name="size" type="text" placeholder="Size" />
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
                    <Button onClick={() => { this.handleDeleteImg(index); }} className="x-btn" variant="danger">x</Button>
                  </li>
                );
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