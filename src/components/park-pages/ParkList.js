import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import ParkAdd from './ParkAdd';

class ParkList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        parksArray: [],
    };

  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/parks')
        .then( responseFromAPI => {
            console.log('The response from the server is: ',responseFromAPI )
            this.setState({ parksArray: responseFromAPI.data }) })
  }

  render() {
    const { parksArray } = this.state;

    return (
      <div className="container">
        <div className="row pt-5">
          <div className="col-12 col-lg-6 offset-lg-3">
            <h1 className="text-center">Park</h1>
          </div>
          {/* <ParkAdd /> */}
        </div>
        <div className="row pt-5">
          <div className="col-12 col-lg-6 offset-lg-3">
            {parksArray.map((park) => {
              return (
                <div className="card my-3">
                  <div className="card-header">
                    <li key={ park._id }>
                      <Link to={`/park-details/${park._id}`}> { park.name }</Link>
                    </li>
                  </div>
                  <div className="card-body">
                    <p>{park.description}</p>
                    <img  width="200" src={ park.imagePark } alt={ park.name }/>
                  </div>
                  
                </div>
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default ParkList;