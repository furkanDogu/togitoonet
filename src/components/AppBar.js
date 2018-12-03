import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Business } from '@material-ui/icons';

const styles = {
  root: {
    flexGrow: 1,
    backgroundColor: "#2196f3"
  }
};

function SimpleAppBar(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar style={{ backgroundColor: '#2196f3', padding: 10 }} position="static" color="default">
        <Toolbar>
          <Business style={{ fontSize: 30, color: 'white' }} />
          <Typography style={{ color: 'white' }} variant="h4">
            Togitoonet
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAppBar);