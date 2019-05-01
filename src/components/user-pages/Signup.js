import React, {Component} from 'react';
import axios from 'axios'

class Signup extends Component{
    constructor(props){
        super(props);
        this.state ={
            //these are req.body.name of each input field in the form
            fullName: "",
            email: "",
            originalPassword: ""
        }
    }
    genericSync(event){
        const {name, value} = event.target;
        this.setState({[name]: value})
    }
    handleSubmit(event){
        event.preventDefault();
        axios.post(
            'http://localhost:3001/api/signup', //1st which route I am hitting in the backend
            this.state, //2nd, since this is a post route, I have to send something
            {withCredentials:true}//3rd and optional===> credentials:true ???
        )
        .then(responseFromServer =>{
            console.log('response is: ', responseFromServer)
            const {userDoc} =responseFromServer.data
            this.props.onUserChange(userDoc)//ask question
        })
        .catch(err =>{
            // console.log('error while signup: ', err) ??
            if(err.response && err.response.data){
                return this.setState({message: err.response.data.message})
            }
        })
    }

    render(){
        const {currentUser} = this.props
        if(currentUser){
            return(
                <section>
                    <h2>You already signed up!</h2>
                    <p>Welcome, {currentUser.fullName}! Your email is: {currentUser.email}</p>
                </section>
            )
        }

        return(

            <section>
                <h2>Signup</h2>
                <form onSubmit={event => this.handleSubmit(event)}>
                    <label>Full Name</label>
                    <input
                        value = {this.state.fullName}
                        onChange ={event => this.genericSync(event)}
                        type="text"
                        name="fullName"
                        placeholder=""
                    />
                    <label>Email</label>
                    <input
                        value = {this.state.email}
                        onChange ={event => this.genericSync(event)}
                        type="text"
                        name="email"
                        placeholder=""
                    />
                    <label>Password</label>
                    <input
                        value = {this.state.originalPassword}
                        onChange ={event => this.genericSync(event)}
                        type="password"
                        name="originalPassword"
                        placeholder="********"
                    />
                    <button> Sign Up </button>
                </form>
                    {this.state.message && <div>{this.state.message}</div>}
            </section>
        )
    }
}

export default Signup;