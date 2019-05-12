import React, { Component } from "react";
import {Redirect} from 'react-router-dom'
import axios from "axios";

class ProfileAdd extends Component {
       constructor(props){
           super(props);
           this.state = {
               skills: "",
               bio: "",
               avatar: "",
               isSubmitSuccessful: false,
           };
       }
       componentWillReceiveProps(nextProps){
            if(nextProps.errors){
                this.setState({
                errors: nextProps.errors
                });
            }
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
            .then( response  => this.setState({ avatar:response.data.fileUrl }))
            .then( response => {
                console.log('The response from the server is: ',response )
                this.setState({ imagePark: response.data }) })
            .catch( err => console.log(err) );
        }

        handleSubmit(event){
            event.preventDefault(); 
            axios.post(
                //POST /api/profile
                `${process.env.REACT_APP_API_URL}/api/profile`,
                this.state,
                { withCredentials: true }
            )
            .then( response => {
                console.log("new profile: ", response.data);
                this.setState({ isSubmitSuccessful: true })
            } )
            .catch( err => console.log(err) );
        }


       render(){
            const { skills, bio, avatar} = this.state;
            // if(!this.props.currentUser){
            //     return <Redirect to='login-page'/>
            // }
           if(this.state.isSubmitSuccessful){
               return <Redirect to='/profile'/>
           }
           return(
               <section>
                   <h2> Add Profile </h2>
                   <form class="was-validated" onSubmit={ e => this.handleSubmit(e) } >
                        <div className="form-group">
                            <label htmlFor="exampleFormControlSelect2">Select your skills</label>
                            <select name = "skills" multiple className="form-control" id="exampleFormControlSelect2"
                                value = { skills }
                                onChange={ e => this.genericSync(e) }
                            >
                                <option>JavaScript</option>
                                <option>React</option>
                                <option>Node</option>
                                <option>Express</option>
                                <option>MongoDB</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="validationTextarea">Bio</label>
                            <textarea name = "bio" type = "text" className="form-control is-invalid" id="validationTextarea" placeholder = "" 
                            value = { bio }
                            onChange={ e => this.genericSync(e) }
                            />
                            <div className="invalid-feedback">
                                Please Add image to your profile.
                            </div>
                        </div>
                            <div className="custom-file">
                            <input type="file" className="custom-file-input" id="validatedCustomFile" required 
                            onChange={ e => this.uploadImage(e) }
                            />
                            <label className="custom-file-label" htmlFor="validatedCustomFile">Choose file...</label>
                        </div>
                        <img src={ avatar } width="200"/><br/>
                        <button> Save </button>

                   </form>
               </section>
           )
       }

}


export default ProfileAdd;