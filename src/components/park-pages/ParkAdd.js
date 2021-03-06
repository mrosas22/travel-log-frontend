import React, { Component } from "react";
import {Redirect} from 'react-router-dom'
import axios from "axios";

class ParkAdd extends Component {
       constructor(props){
           super(props);
           this.state = {
               name: "",
               description: "",
               imagePark: "",
               isSubmitSuccessful: false,
           };
       } 

       // for all fields except images and specs
        genericSync(event) {
            const { name, value } = event.target;
            this.setState({ [name]: value });
        }

        uploadImage(event){
            // console.log("upload image: ", event.target.files);
            const { files } = event.target;    
            const uploadData = new FormData();

            uploadData.append("submittedFile", files[0]);

            axios.post(
                `${process.env.REACT_APP_API_URL}/api/upload/file`,
                uploadData,
                { withCredentials: true }
            )
            .then( response  => this.setState({ imagePark:response.data.fileUrl }))
            .then( response => {
                console.log('The response from the server is: ',response )
                this.setState({ imagePark: response.data }) })
            .catch( err => console.log(err) );
        }


        handleSubmit(event){
            event.preventDefault();

            axios.post(
                `${process.env.REACT_APP_API_URL}/api/parks`,
                this.state,
                { withCredentials: true }
            )
            .then( response => {
                console.log("new park: ", response.data);
                this.setState({ isSubmitSuccessful: true })
            } )
            .catch( err => console.log(err) );
        }


       render(){
            const { name, description, imagePark} = this.state;
            if(!this.props.currentUser){
                return <Redirect to='login-page'/>
            }
           if(this.state.isSubmitSuccessful){
               return <Redirect to='/park-list'/>
           }
           return(
               <section>
                   <h2> Add a Park </h2>
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
                                Please insert an image.
                            </div>
                        </div>
                            <div className="custom-file">
                            <input type="file" className="custom-file-input" id="validatedCustomFile" required 
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


export default ParkAdd;