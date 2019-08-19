import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import './styles/button.css';

const styles = theme => ({
  button: {
    margin: theme.spacing(1),
  },
});

class AddContactButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  render() {
    const {classes} = this.props;
    return (
      <div className="add-contact">
        <Fab onClick={this.handleClick} color="primary" aria-label="add" className={classes.button}>
          <AddIcon />
        </Fab>
      </div>
    );
  }
  handleClick() {
    this.props.onAdd();
  }
}

AddContactButton.propTypes = {
  classes: PropTypes.object.isRequired,
  onAdd: PropTypes.func,
};

AddContactButton.defaultProps = {
  onAdd: () => {}
};

export default withStyles(styles)(AddContactButton);
