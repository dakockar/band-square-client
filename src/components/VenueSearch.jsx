import React from "react";
import { Form } from 'react-bootstrap'


function VenueSearch(props) {
  return (
    <div>
      <h1>Venue search</h1>
      <Form.Group>
        <Form.Control
          onChange={props.myChange}
          type="text"
          placeholder="Search"
        />
      </Form.Group>

    </div>
  );
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