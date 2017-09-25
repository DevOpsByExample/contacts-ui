import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import keycode from 'keycode';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import FilterListIcon from 'material-ui-icons/FilterList';
import Icon from 'material-ui/Icon';
import _ from 'lodash';

const columnData = [
  { id: 'firstName', numeric: false, disablePadding: true, label: 'First Name' },
  { id: 'lastName', numeric: false, disablePadding: true, label: 'Last Name' },
  { id: 'phoneNumber', numeric: false, disablePadding: true, label: 'Phone Number' },
  { id: 'email', numeric: false, disablePadding: true, label: 'Email' },
  { id: 'address', numeric: false, disablePadding: true, label: 'Address' },
];

class ContactListHead extends React.Component {
  static propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
  };

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell checkbox>
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < 5}
              checked={numSelected === 5}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                disablePadding={column.disablePadding}
              >
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={order}
                  onClick={this.createSortHandler(column.id)}
                >
                  {column.label}
                </TableSortLabel>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

const toolbarStyles = theme => ({
  root: {
    paddingRight: 2,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.A700,
          backgroundColor: theme.palette.secondary.A100,
        }
      : {
          color: theme.palette.secondary.A100,
          backgroundColor: theme.palette.secondary.A700,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let ContactListToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography type="subheading">{numSelected} selected</Typography>
        ) : (
          <Typography type="title"></Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        ) : (
          <IconButton aria-label="Filter list">
            <FilterListIcon />
          </IconButton>
        )}
      </div>
    </Toolbar>
  );
};

ContactListToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

ContactListToolbar = withStyles(toolbarStyles)(ContactListToolbar);

const styles = theme => ({
  paper: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  emptyPaper: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    overflowX: 'auto',
    boxShadow: 'none',
  },
  icon: {
    verticalAlign: 'middle',
    marginRight: theme.spacing.unit,
  }
});

class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: 'asc',
      orderBy: 'firstName',
      selected: [],
      contacts: props.contacts,
    }
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const contacts = this.state.contacts.sort(
      (a, b) => (order === 'desc' ? b[orderBy] > a[orderBy] : a[orderBy] > b[orderBy]),
    );

    this.setState({ contacts, order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: this.state.contacts.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleKeyDown = (event, id) => {
    if (keycode(event) === 'space') {
      this.handleClick(event, id);
    }
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  isEmpty = () => _.isEmpty(this.state.contacts);

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  componentWillReceiveProps(nextProps) {
    this.setState({contacts: nextProps.contacts})
  }

  renderNoContacts() {
    const { classes } = this.props;
    if (this.isEmpty()) {
      return (
        <Paper className={classes.emptyPaper}>
          <Typography type="caption">
            <span>
              <Icon className={classes.icon}>account_circle</Icon>
              <span>No contacts found. Click '+' to create new contacts</span>
            </span>
          </Typography>
        </Paper>
      )
    } else {
      return (
        <div />
      )
    }
  }

  renderContacts() {
    const { contacts } = this.state;
    return contacts.map(contact => {
      const isSelected = this.isSelected(contact.id);
      return (
        <TableBody>
          <TableRow
            hover
            onClick={event => this.handleClick(event, contact.id)}
            onKeyDown={event => this.handleKeyDown(event, contact.id)}
            role="checkbox"
            aria-checked={isSelected}
            tabIndex={-1}
            key={contact.id}
            selected={isSelected}
          >
            <TableCell checkbox>
              <Checkbox checked={isSelected} />
            </TableCell>
            <TableCell disablePadding>{contact.firstName}</TableCell>
            <TableCell disablePadding>{contact.lastName}</TableCell>
            <TableCell disablePadding>{contact.phoneNumber}</TableCell>
            <TableCell disablePadding>{contact.email}</TableCell>
            <TableCell disablePadding>{contact.address}</TableCell>
          </TableRow>
        </TableBody>
      );
    })
  }

  render() {
    const { classes } = this.props;
    const { order, orderBy, selected } = this.state;

    return (
      <Paper className={classes.paper}>
        <ContactListToolbar numSelected={selected.length} />
        <Table className={ this.isEmpty() ? 'empty': '' }>
          <ContactListHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={this.handleSelectAllClick}
            onRequestSort={this.handleRequestSort}
          />
          { this.renderContacts() }
        </Table>
          { this.renderNoContacts() }
      </Paper>
    );
  }
}

ContactList.propTypes = {
  classes: PropTypes.object.isRequired,
  contacts: PropTypes.array,
};

ContactList.defaultProps = {
  contacts: [],
}

export default withStyles(styles)(ContactList);
