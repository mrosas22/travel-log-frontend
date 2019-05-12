import React, { Component } from "react";
import axios from "axios";
import {NavLink, Redirect} from 'react-router-dom'
import ProfileAdd from './ProfileAdd'

class UserProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            showEdit: false,
        };
    }

    componentDidMount(){
        // console.log(' = == = = =', this.props.match.params);
        const { params } = this.props.match;

        axios.get(`${process.env.REACT_APP_API_URL}/api/profile/${params.id}`)
        .then(responseFromApi => {
            console.log('this is res: ', responseFromApi);
            this.setState(responseFromApi.data);
        })
        .catch(err => console.log(err));
    }
    render(){
        const {fullName, skills, bio, avatar} = this.state
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                        <div className="card">
                            <img className="card-img-top" src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/oslo.jpg" alt="Bologna" />
                            <div className="card-body text-center">
                                <img className="avatar rounded-circle" src={avatar} width='55'alt="Bologna" />
                                <h4 className="card-title">{fullName}</h4>
                                <h6 className="card-subtitle mb-2 text-muted">Iron Man</h6>
                                <p className="card-text">Anthony Edward Stark is the son of wealthy industrialist and head of Stark Industries, Howard Stark, and Maria Stark. A boy genius, he enters MIT at the age of 15 to study engineering and later receives master's degrees in engineering and physics. </p>
                                <a href="/profile" className="btn btn-info">Follow</a>
                                <a href="/profile" className="btn btn-outline-info">Message</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <ProfileAdd/>
            
            
                </div>
            </div>

        )
    }
    
}
export default UserProfile;