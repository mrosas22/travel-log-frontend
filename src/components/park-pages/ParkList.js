import React from 'react';
import axios from 'axios';

import ParkAdd from './ParkAdd';

class ParkList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        // the array stays empty until the response from server doesn't fill it
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
                    {park.name}
                  </div>
                  <div className="card-body">
                    {park.description}
                    <img  width="100" src={ park.image } alt={ park.name }/>
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