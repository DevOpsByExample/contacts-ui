// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import { SnackbarContent } from 'material-ui/Snackbar';
import _ from 'lodash';


const styles = theme => ({
  root: {
    position: 'fixed',
    left: '0px',
    right: '0px',
    bottom: '10px',
    zIndex: 2000,
  },
  hide: {
    display: 'none',
  },
  snackbar: {
    margin: 'auto',
  },
});

class Alert extends React.Component {
  constructor(props) {
    super(props);
    const {error: {message=''}} =  props;
    this.state = {message}
    this.handleDismiss = this.handleDismiss.bind(this);
  }
  handleDismiss() {
    this.props.onDismiss();
  }
  isEmpty = () => _.isEmpty(this.state.message);
  render() {
    const {classes} = this.props;
    const action = (<Button color="accent" onClick={this.handleDismiss} dense>Dismiss</Button>);
    const { message } = this.state;
    return (
      <div className={this.isEmpty() ? classes.hide : classes.root}>
        <SnackbarContent className={classes.snackbar} message={message} action={action} />
      </div>
    );
  }
  componentWillReceiveProps(nextProps) {
    const {error: {message=''}} =  nextProps;
    this.state = {message}
  }
}

Alert.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  onDismiss: PropTypes.func.isRequired,
};

Alert.defaultProps = {
  onDismiss: () => {}
}

export default withStyles(styles)(Alert);
