import { Form } from 'react-bootstrap';
import React, { Component } from 'react';
import ErrorPage from "./ErrorPage";

class VenueSearch extends Component {
  render() {
    const { user } = this.props;
    if (!user) return null;

    return (
      user.type === "owner"
        ? (<ErrorPage />)
        : (
          <div>
            <h1>Venue search</h1>
            <Form.Group>
              <Form.Control
                onChange={this.props.myChange}
                type="text"
                placeholder="Search"
              />
            </Form.Group>
          </div>
        )
    )
  }
}

export default VenueSearch;


// {
//     props.filteredVenues.map((singleVenue) => {
//   return (
//     <div>
//       <h4>
//         {singleVenue.title}
//       </h4>
//       <p>{singleVenue.size}</p>
//       {/* <p>{singleVenue.location}</p> */}
//     </div>
//   );
// })
// }