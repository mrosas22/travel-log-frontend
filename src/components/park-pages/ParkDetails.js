import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import ParkEdit from './ParkEdit';

class ParkDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            showEdit: false,
        };
    }

    componentDidMount(){
        // console.log(' = == = = =', this.props.match.params);
        const { params } = this.props.match;

        axios.get(`http://localhost:3001/api/parks/${params.id}`)
        .then(responseFromApi => {
            // console.log('this is res: ', responseFromApi);
            this.setState(responseFromApi.data.park);
        })
        .catch(err => console.log(err));
    }

    handleEdit(){
        this.setState({ showEdit: true });   
    }

    handleDelete(id){
        axios.delete(`http://localhost:3001/api/parks/${id}`)
        .then(responseFromApi => {
            this.props.history.push('/park-list'); 
        })
        .catch(err => console.log(err));
    }

    render(){
        // console.log('state of Park Details: ', this.state);
        
        const { _id, name, description, imagePark, createdAt } = this.state;
        return (
            <section>

                { this.state.showEdit ? <ParkEdit thePark={ this.state } { ...this.props }  /> : (
                    <section>
                        <h2> { name } </h2>
                        <p>  { description }</p>
                        <img src={ imagePark } alt={ name } width='200'/>
                        <p> Added on: { createdAt } </p>
                        <div className="card-footer">
                            <div className="row">
                                <button onClick={() => this.handleEdit()} className="btn btn-primary mx-3">
                                    Edit
                                </button>
                                <button onClick={() => this.handleDelete(_id)} className="btn btn-danger">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </section>
                    
                ) }
              
                <Link to={"/park-list"}>Go to parks page </Link>
            </section>
        )
    }
}

export default ParkDetails;

