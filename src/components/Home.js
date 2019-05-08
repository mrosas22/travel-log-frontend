import React, { Component } from "react";
import '../styles/index.css';
import ParkHeader from '../styles/img/MountRushmore.jpg';

class Home extends Component {
    render (){
        return (
            <div className="home">
                <div className="home-header">
                    <img src={ParkHeader} className="home-img" alt="park" />
                </div>
                <div className="home-intro">
                    <p> Welcome to National Parks community</p>
                </div>
            </div>
        )
    }
}
export default Home;


