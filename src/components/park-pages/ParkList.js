import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import ParkAdd from './ParkAdd';
//Styling Components from MD
import {
  Button,
  Card,
  CardTitle,
  CardText,
  Media,
  MediaOverlay,
} from 'react-md';
// import { Card, CardTitle, CardText, Media, MediaOverlay } from 'react-md';

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
      <div className="md-grid md-text-container">
        <h2 className="md-cell md-cell--12">
          Parks
        </h2>
  
        <div className="md-grid">
            {parksArray.map((park) => {
              return (
                <Card className="cards__example md-cell md-cell--6 md-cell--8-tablet">
                  <Media>
                    <img src={park.imagePark} alt="" />
                    <MediaOverlay>
                      <CardTitle title={park.name} >
                        <Button className="md-cell--right" icon></Button>
                      </CardTitle>
                    </MediaOverlay>
                  </Media>
                  <CardText>
                      <p>{park.description}</p>
                    </CardText>
                </Card>
              )
            })}
         
        </div>
      </div>
    );
  }
}

export default ParkList;