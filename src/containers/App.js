import React, { Component } from 'react';
import 'typeface-roboto';
import './App.css';
import Header from '../components/Header';
import ContactList from '../components/ContactList';
import AddContactButton from '../components/AddContactButton';
import AddContactDialog from '../components/AddContactDialog';
import { fetch } from '../models/contacts';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      selectedContact: {},
      addOrEdit: false
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
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
          onSave={this.handleSave}
          onCancel={this.handleCancel} />
      </div>
    );
  }
  componentDidMount() {
    fetch().then((contacts) => this.setState({contacts}));
  }
  handleAdd() {
    this.setState({addOrEdit: true});
  }
  handleSave(contact) {
    const { contacts } = this.state;
    contacts.push(contact);
    this.setState({ contacts, addOrEdit: false, selectedContact: {} })
  }
  handleCancel() {
    this.setState({addOrEdit: false});
  }
}

export default App;
