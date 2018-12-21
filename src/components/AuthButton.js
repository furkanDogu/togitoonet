import React from "react";
import {
  withRouter
} from "react-router-dom";
import { connect } from 'react-redux';
import { logOut } from '../actions/userActions';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

// This is 'Çıkış' button stays in drawer menu. Whenever user clicks, it triggers logOut action.
const AuthButton = ({ history, isAuthenticated, logOut, text }) => (    
      isAuthenticated ? (
          <ListItem button
            key={'Çıkış'}
            onClick={() => {
                logOut();
                history.push("/");
            }}
          >
              <ListItemIcon><ExitToAppIcon /></ListItemIcon>
              <ListItemText primary={text} />
          </ListItem>
      ) : (
        <div></div>
      )
);

const mapDispatchToProps = {
  logOut
};

const mapStateToProps = state => ({
    isAuthenticated: !!state.userReducer.token
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthButton))