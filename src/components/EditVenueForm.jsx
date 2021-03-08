import axios from "axios";
import React, { Component } from "react";
import { Form, Button, InputGroup, FormControl, Accordion, Card } from "react-bootstrap";
import config from "../config";

export default class EditVenueForm extends Component {
  state = {
    venue: null,
    showButton1: false,
    showButton2: false,
    showButton3: false,
    image:[],
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
          image: response.data.imgUrl
        });
      })
      .catch((err) => {
        console.log("get venue failed", err);
      });
  }

  handleAddImg = (event) => {
    event.preventDefault();
    if(!this.state.imgUrl){
        return
    }
    this.setState({
        image: [ ...this.state.image, this.state.imgUrl]
    })
  };

  handleImgChange = (event) => {
      const imgUrl = event.target.value
      this.setState({
          imgUrl: imgUrl
      })
  }

  render() {
    console.log('------', this.state.image)
    const { venue, image } = this.state;
    // console.log(this.props);

    if (!venue) return null;

    return (
      <div>
        <Form
          onSubmit={(event) => {
            this.props.onEdit(event, venue._id, image);
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
            <Form.Label>Size</Form.Label>
            <Form.Control
              name="size"
              type="text"
              placeholder="Size (m^2)"
              defaultValue={venue.size}
            />
          </Form.Group>
          {/* <Form.Group controlId="imgUrl">
            <Form.Label>Image Url</Form.Label>
            <Form.Control
              name="imgUrl"
              type="text"
              placeholder="image url"
              defaultValue={venue.imgUrl}
            />
          </Form.Group> */}
          
          {/* <Form.Group controlId="imgUrl">
                        <Form.Label>Image Url</Form.Label>
                        <Form.Control name="imgUrl" type="text" placeholder="image url" defaultValue={venue.imgUrl} />
                    </Form.Group> */}
          {/* <Form.Group controlId="extra-img">
                        <Form.Control type="button" value='+' onClick={this.createNewElement}/>
                    </Form.Group>
                    <Form.Group controlId="imgUrl">
                        <Form.Control name="imgUrl" type="text" placeholder="image url" defaultValue={venue.imgUrl} />
                    </Form.Group>
                    <Form.Group controlId="extra-img">
                        <Form.Control type="button" value='+' onClick={this.createNewElement}/>
                    </Form.Group> */}
          <Form.Label>Image Url</Form.Label>
          <InputGroup className="mb-3">
          
            <FormControl
              placeholder="image url"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              name='imgUrl'
              onChange={this.handleImgChange}
            />
            <InputGroup.Append>
              <Button onClick={this.handleAddImg} variant="outline-secondary">Add image</Button>
            </InputGroup.Append>
          </InputGroup>

          {/* <Accordion defaultActiveKey="0">
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                  Add more images
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
              <Form.Group controlId="imgUrl">
            <Form.Label>Image Url</Form.Label>
            <Form.Control
              name="imgUrl2"
              type="text"
              placeholder="image url"
              defaultValue={venue.imgUrl}
            />
          </Form.Group>
          
              </Accordion.Collapse>
            </Card>
          </Accordion> */}

          <Button className="button" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}
