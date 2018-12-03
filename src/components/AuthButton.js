import React from "react";
import {
  withRouter
} from "react-router-dom";
import { connect } from 'react-redux';
import { logOut } from '../actions/userActions';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';

const AuthButton = ({ history, isAuthenticated, logOut, text }) => (
      
      isAuthenticated ? (
          <ListItem button
            key={'Çıkış'}
            onClick={() => {
                logOut();
                history.push("/");
            }}
          >
              <ListItemIcon><InboxIcon /></ListItemIcon>
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