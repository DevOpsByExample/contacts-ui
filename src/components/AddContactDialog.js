import React from 'react';
import PropTypes from 'prop-types';
import withStyles  from '@material-ui/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import blue from '@material-ui/core/colors/blue';
import TextField from '@material-ui/core/TextField';
import { add } from '../models/contacts';

const styles = {
  root: {},
  textField: {
    width: '100%',
  },
  avatar: {
    background: blue[100],
    color: blue[600],
  },
};

class AddContactDialog extends React.Component {
  constructor(props) {
    super(props);
    const { firstName='', lastName='', email='', phoneNumber='', address='' } = this.props.contact;
    this.state = {
      firstName,
      lastName,
      email,
      phoneNumber,
      address
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  render() {
    const { classes, open } = this.props;
    return (
      <Dialog open={open} disableBackdropClick >
        <DialogTitle>Create Contact</DialogTitle>
        <DialogContent>
          <form className={classes.container} noValidate autoComplete="off">
            <Grid container className={classes.root}>
              <Grid item xs={6}>
                <TextField id="firstName"
                  required
                  label="Firstname"
                  className={classes.textField}
                  value={this.state.firstName}
                  type="email"
                  onChange={this.handleChange('firstName')}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField id="lastName"
                  label="Lastname"
                  className={classes.textField}
                  value={this.state.lastName}
                  onChange={this.handleChange('lastName')}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField id="email"
                  label="Email"
                  className={classes.textField}
                  value={this.state.email}
                  onChange={this.handleChange('email')}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField id="phoneNumber"
                  label="Phone Number"
                  className={classes.textField}
                  value={this.state.phoneNumber}
                  onChange={this.handleChange('phoneNumber')}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField id="address"
                  label="Address"
                  className={classes.textField}
                  value={this.state.address}
                  onChange={this.handleChange('address')}
                  multiline
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container align={'center'} justify={'flex-end'} direction={'row'}>
                  <Grid item >
                    <Button className={classes.button} onClick={this.handleCancel}>Cancel</Button>
                  </Grid>
                  <Grid item >
                    <Button color="primary" className={classes.button} onClick={this.handleSave}>Save</Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
  handleSave() {
    add(this.state)
    .then((contact) => this.props.onSave(contact))
    .catch((error) => this.props.onError(error))
  }
  handleCancel() {
    this.props.onCancel();
  }
  handleChange = name => event => {
    this.setState({[name]: event.target.value});
  }
}

AddContactDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  onError: PropTypes.func,
  selectedValue: PropTypes.string,
};

AddContactDialog.defaultProps = {
  onSave: () => {},
  onCancel: () => {},
  onError: () => {},
};

export default withStyles(styles)(AddContactDialog);
