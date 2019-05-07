import React, { Component } from 'react';
import axios from "axios";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AuthMenu from './AuthMenu'
import { NavLink } from "react-router-dom";

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class Navbar extends Component {
    constructor(props){
      super(props);
      this.state = {
          currentUser: null
      }
    }

    render() {
      console.log('Current user in Navbar ', this.props.currentUser)
        // const { classes } = this.props;
        return (
            <div >
            <AppBar position="static">
              <p>Test</p>
                {/* <Toolbar>
                <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                    <MenuIcon />
                </IconButton>
                <NavLink to="/" variant="h6" color="white" className={classes.grow}> Home </NavLink>
                <AuthMenu currentUser={this.props.currentUser}/>
                </Toolbar> */}
            </AppBar>
            </div>
        );
    }

}

// Navbar.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(Navbar);