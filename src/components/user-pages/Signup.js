import React, {Component} from 'react';
import axios from 'axios'
import {NavLink, Redirect} from 'react-router-dom'
//Styling Components from Semantic UI
import {
    Button,
    Form,
    Grid,
    Header,
    Message,
    Segment,
  } from 'semantic-ui-react';

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
            return <Redirect to='/' />
        }

        return(
            <Grid centered columns={2}>
                <Grid.Column>
                <Header as="h2" textAlign="center">
                    Sign Up
                </Header>
                <Segment>
                    <Form size="large" onSubmit={event => this.handleSubmit(event)}>
                    <Form.Input
                        value={this.state.fullName}
                        onChange={event => this.genericSync(event)}
                        name="fullName" 
                        fluid
                        icon="user"
                        iconPosition="left"
                        placeholder="Full Name"
                    />
                    <Form.Input
                        value={this.state.email}
                        onChange={event => this.genericSync(event)}
                        name="email" 
                        fluid
                        icon="user"
                        iconPosition="left"
                        placeholder="Email address"
                    />
                    <Form.Input
                        value={this.state.originalPassword}
                        onChange={event => this.genericSync(event)}
                        name="originalPassword" 
                        fluid
                        icon="lock"
                        iconPosition="left"
                        placeholder="Password"
                        type="password"
                    />

                    <Button color="blue" fluid size="large">
                        Sign Up
                    </Button>
                    </Form>
                </Segment>
                <Message>
                    Already Have an account? <NavLink to={"/login-page"}> Login</NavLink>
                </Message >
                    { this.state.message && <Message>{ this.state.message } </Message >}
                </Grid.Column>
            </Grid>
           
        )
    }
}

export default Signup;