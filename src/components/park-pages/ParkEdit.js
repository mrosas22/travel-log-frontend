import React, { Component } from 'react';
import axios from "axios";



class ParkEdit extends Component {
    constructor(props){
        super(props);
        console.log('please show props: ',this.props)
        const { name, description, imagePark } = this.props.thePark;
        this.state = {
            name,
            description,
            imagePark
        };
    }

     // for all fields except images and specs
     genericSync(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }


    handleSubmit(event) {
        event.preventDefault();

        axios.put(
            `${process.env.REACT_APP_API_URL}/api/parks/${this.props.thePark._id}`,
          this.state,
          { withCredentials: true } // FORCE axios to send cookies across domains
        )
          .then(response => {
            //   instead of using <Redirect /> we use this.props.history.push()
            this.props.history.push('/park-list'); 
          })
          .catch(err => {
            console.log("Update Park ERROR", err);
            alert("Sorry! Something went wrong.");
          });
      }

    render(){
        const { name, description, imagePark} = this.state;
        return (
            <section>
                <h2>{ name }</h2>

                <form class="was-validated" onSubmit={ e => this.handleSubmit(e) } >
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Name</label>
                            <input name = "name" type = "text" className="form-control" placeholder="" 
                            value = { name }
                            onChange={ e => this.genericSync(e) }
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="validationTextarea">Description</label>
                            <textarea name = "description" type = "text" className="form-control is-invalid" id="validationTextarea" placeholder = "" 
                            value = { description }
                            onChange={ e => this.genericSync(e) }
                            />
                            <div className="invalid-feedback">
                            
                            </div>
                        </div>
                            <div className="custom-file">
                            <input type="file" className="custom-file-input" id="validatedCustomFile" 
                            onChange={ e => this.uploadImage(e) }
                            />
                            <label className="custom-file-label" htmlFor="validatedCustomFile">Choose file...</label>
                        </div>
                        <img src={ imagePark } width="200"/><br/>
                        <button> Save </button>

                   </form>

            </section>
        )
    }
}

export default ParkEdit;