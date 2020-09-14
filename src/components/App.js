import React, { Component } from 'react';
import { Form } from './Form/Form';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

import styles from './app.module.css';

export default class App extends Component {
  state = {
    contacts: [],
    name: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const contactsParsed = JSON.parse(contacts);
    if (contactsParsed) {
      this.setState({ contacts: contactsParsed });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  getName = data => {
    this.setState({ name: data });
  };

  getContact = contact => {
    let flag = true;

    this.state.contacts.map(el =>
      el.name === contact.name ? (flag = false) : '',
    );

    flag
      ? this.setState(prev => {
          return { ...prev, contacts: [...prev.contacts, contact] };
        })
      : alert(`${contact.name} is already in contacts`);
  };

  getFilterName = event => {
    this.setState({ filter: event.target.value });
  };

  filteredItems = () => {
    return this.state.filter
      ? this.state.contacts.filter(el =>
          el.name.toLowerCase().includes(this.state.filter.toLowerCase()),
        )
      : this.state.contacts;
  };

  deleteContact = contactId => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    return (
      <>
        <h2 className={styles.title}>Phonebook</h2>
        <Form getContact={this.getContact} getName={this.getName} />
        <h2 className={styles.title}>Contacts</h2>
        <Filter filter={this.state.filter} getFilterName={this.getFilterName} />
        <ContactList
          contactList={this.filteredItems()}
          deleteContact={this.deleteContact}
        />
      </>
    );
  }
}
