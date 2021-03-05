import React, { Component } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { Redirect } from "react-router";
import ErrorPage from "./ErrorPage";


class MusicianSearch extends Component {

  render() {
    const { user } = this.props;
    if (!user) return null;

    return (
      user.type === "owner"
        ? (<ErrorPage />)
        : (
          <div>
            <h1>musician search</h1>
            <Form>
              <fieldset>
                <Form.Group as={Row}>
                  <Col sm={10}>
                    <Form.Check
                      type="radio"
                      label="I'm looking for musicians"
                      value='musicianSearch'
                      name="formHorizontalRadios"
                      id="formHorizontalRadios1"
                    //onChange={this.onValueChange}
                    />
                    <Form.Check
                      type="radio"
                      label="I'm looking for bands"
                      value="bandSearch"
                      name="formHorizontalRadios"
                      id="formHorizontalRadios2"
                    //onChange={this.onValueChange}
                    />
                  </Col>
                </Form.Group>
              </fieldset>
            </Form>
            <Form.Group>
              <Form.Control
                onChange={this.props.myChange}
                type="text"
                placeholder="Search"
              />
            </Form.Group>
            {this.props.filteredUsers.map((singleUser) => {
              return (
                <div key={singleUser._id}>
                  <h4>
                    {singleUser.firstName} {singleUser.lastName}
                  </h4>
                  <p>{singleUser.instrument}</p>
                  <p>{singleUser.genre}</p>
                </div>
              );
            })}
          </div>
        )
    )
  }
}



// function MusicianSearch(props) {

//   //     state ={
//   //         selectedOption: {}
//   //     }

//   //   onValueChange = (event) =>{
//   //       this.setState({
//   //           selectedOption: event.target.value
//   //       })
//   //   }  




//   return (
//     <div>
//       <h1>musician search</h1>
//       <Form>
//         <fieldset>
//           <Form.Group as={Row}>
//             <Col sm={10}>
//               <Form.Check
//                 type="radio"
//                 label="I'm looking for musicians"
//                 value='musicianSearch'
//                 name="formHorizontalRadios"
//                 id="formHorizontalRadios1"
//               //onChange={this.onValueChange}
//               />
//               <Form.Check
//                 type="radio"
//                 label="I'm looking for bands"
//                 value="bandSearch"
//                 name="formHorizontalRadios"
//                 id="formHorizontalRadios2"
//               //onChange={this.onValueChange}
//               />
//             </Col>
//           </Form.Group>
//         </fieldset>
//       </Form>
//       <Form.Group>
//         <Form.Control
//           onChange={props.myChange}
//           type="text"
//           placeholder="Search"
//         />
//       </Form.Group>
//       {props.filteredUsers.map((singleUser) => {
//         return (
//           <div>
//             <h4>
//               {singleUser.firstName} {singleUser.lastName}
//             </h4>
//             <p>{singleUser.instrument}</p>
//             <p>{singleUser.genre}</p>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

export default MusicianSearch;
