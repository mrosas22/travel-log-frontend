import React, { Component } from 'react';
import './App.css';

import { Switch, NavLink, Route } from "react-router-dom";

import axios from "axios";

import Signup from './components/user-pages/Signup';
import Login from './components/user-pages/Login';
import Home from './components/Home';
import ParkAdd from './components/park-pages/ParkAdd';
import ParkList from './components/park-pages/ParkList';



class App extends Component {
  constructor(){
    super();
    this.state = {
      currentUser: null,
    }
  }

  componentDidMount(){
    axios.get("http://localhost:3001/api/checkuser", { withCredentials:true })
    .then(responseFromBackend => {
      // console.log("Check User in APP.JS: ",responseFromBackend.data)
      const { userDoc } = responseFromBackend.data;
      this.syncCurrentUser(userDoc);
    });
  }
  syncCurrentUser(user){
    this.setState({ currentUser: user });
  }
  logout(){
    axios.delete(
      "http://localhost:3001/api/logout",
      {withCredentials:true}
    )
    .then(()=> this.syncCurrentUser(null))
    .catch(err => console.log(err))
  }


  render() {
    return (
      <div className="App">
        <header>
         <h1> U.S. National Parks </h1>
         <nav>

            <NavLink to="/"> Home </NavLink>
            <NavLink to='/park-list'>Parks</NavLink>
            {this.state.currentUser ? (
              <span>
                <NavLink to='/add-park'>Add Park</NavLink>
                <br/>
                <b> {this.state.currentUser.fullName}</b>
                <button onClick={() => this.logout()}>Log Out</button>
              </span>
              ):(
                <span>
                  <NavLink to="/signup-page"> Signup </NavLink>
                  <NavLink to="/login-page"> Login </NavLink>  
                </span>
            )}

         </nav>
        </header>

        <Switch>
          
        <Route exact path="/" component={ Home } />


         {/*  */}
          <Route path="/signup-page" render={ () => 
            <Signup currentUser={this.state.currentUser} 
            onUserChange={ userDoc => this.syncCurrentUser(userDoc) }   />
          }  />

          
          <Route path="/login-page" render={ () => 
            <Login currentUser={ this.state.currentUser } 
            onUserChange={userDoc => this.syncCurrentUser(userDoc)} />
          }  />
          <Route path="/add-park" render={() => <ParkAdd currentUser={this.state.currentUser}/>}/>
          <Route path="/park-list" component={ParkList}/>
          
        </Switch>

        

        <footer>
          Made with React
        </footer>
      </div>
    );
  }
}

export default App;
