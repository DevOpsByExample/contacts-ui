import React, { Component } from 'react';
import 'typeface-roboto';
import './App.css';
import Header from '../components/Header';
import ContactList from '../components/ContactList';
import AddContactButton from '../components/AddContactButton';
import AddContactDialog from '../components/AddContactDialog';
import Alert from '../components/Alert';
import { fetch } from '../models/contacts';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      selectedContact: {},
      addOrEdit: false,
      error: {message: ''}
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
    this.handleErrorOnSave = this.handleErrorOnSave.bind(this);
  }
  render() {
    const {addOrEdit, contacts, selectedContact} = this.state;
    return (
      <div className="App">
        <Header />
        <ContactList contacts={contacts} />
        <AddContactButton onAdd={this.handleAdd} />
        <AddContactDialog
          contact={selectedContact}
          open={addOrEdit}
          onError={this.handleErrorOnSave}
          onSave={this.handleSave}
          onCancel={this.handleCancel} />
        <Alert error={this.state.error} onDismiss={this.handleAlertDismiss} />
      </div>
    );
  }
  componentDidMount() {
    fetch()
    .then((contacts) => this.setState({contacts}))
    .catch(({message}) => {
      this.setState({error: {message}})
    });
  }
  handleAdd() {
    this.setState({addOrEdit: true});
  }
  handleAlertDismiss() {
    this.updateError();
  }
  handleSave(contact) {
    const { contacts } = this.state;
    contacts.push(contact);
    this.setState({ contacts, addOrEdit: false, selectedContact: {} })
  }
  handleCancel() {
    this.setState({addOrEdit: false});
  }
  handleErrorOnSave({message}) {
    this.updateError(`Unable to save, reason: ${message}`);
  }
  updateError(message='') {
    this.setState({error: {message}});
  }
}

export default App;
