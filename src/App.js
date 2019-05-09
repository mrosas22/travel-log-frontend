import React, { Component } from 'react';
import './App.css';
import { Switch, NavLink, Route } from "react-router-dom";
import axios from "axios";
//Main Components
import Signup from './components/user-pages/Signup';
import Login from './components/user-pages/Login';
import Home from './components/Home';
import ParkAdd from './components/park-pages/ParkAdd';
import ParkList from './components/park-pages/ParkList';
import ParkDetails from './components/park-pages/ParkDetails';
import Activities from './components/Activities';
import Community from './components/Community';
import NotFound from './components/NotFound';
//Style Components
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar';
import { NavigationDrawer } from 'react-md';
import HeaderSection from './components/HeaderSection';

const navItems = [{
  exact: true,
  label: 'Home',
  to: '/',
}, {
  label: 'Parks',
  to: '/park-list',
},{
  label: 'Activities',
  to: '/activities',
}, {
  label: 'Community',
  to: '/community',
}];

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
    console.log(this.state);
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
        <Navbar currentUser={this.state.currentUser} logoutUser={this.state.currentUser} />
        <HeaderSection/>
        <header>
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
        <Route
        render={({ location }) => (
          <NavigationDrawer
            drawerTitle="U.S. National Parks"
            toolbarTitle="Community Travel Guide"
            navItems={navItems.map(props => <Sidebar {...props} key={props.to} />)}
          >
            <Switch key={location.key}>
              <Route exact path="/" location={location} component={Home} />
              <Route path="/signup-page" location={location} render={ () => 
                <Signup currentUser={ this.state.currentUser } 
                  onUserChange={userDoc => this.syncCurrentUser(userDoc)} />
                } />
              <Route path="/login-page" location={location} render={ () => 
                <Login currentUser={ this.state.currentUser } 
                  onUserChange={userDoc => this.syncCurrentUser(userDoc)} />
                } />
              <Route path="/park-list" location={location} component={ParkList} />
              <Route path="/activities" location={location} component={Activities} />
              <Route path="/community" location={location} component={Community} />
            </Switch>
          </NavigationDrawer>
        )}
      />
        

        <footer>
          Made with React
        </footer>
      </div>
    );
  }
}

export default App;
