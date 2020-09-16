import React, { Component } from 'react';
import { Form } from './Form/Form';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Notification } from './Notification/Notification';

import { CSSTransition } from 'react-transition-group';

import './app.css';

export default class App extends Component {
  state = {
    contacts: [],
    name: '',
    notify: false,
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
      : this.notifyTrue();
  };

  notifyTrue() {
    this.setState({ notify: true });
  }

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
        <CSSTransition
          in={this.state.notify}
          timeout={2000}
          classNames="notify"
          unmountOnExit
          onEntered={() => this.setState({ notify: false })}
        >
          <Notification />
        </CSSTransition>
        <CSSTransition
          in={true}
          appear={true}
          timeout={2000}
          classNames="op"
          unmountOnExit
        >
          <h2 className="title">Phonebook</h2>
        </CSSTransition>
        <Form getContact={this.getContact} getName={this.getName} />
        <CSSTransition
          in={this.state.contacts.length >= 1}
          timeout={300}
          unmountOnExit
          classNames="title-contacts"
        >
          <h2 className="title-contacts">Contacts</h2>
        </CSSTransition>
        <CSSTransition
          in={this.state.contacts.length >= 2}
          timeout={300}
          unmountOnExit
          classNames="filter"
        >
          <Filter
            filter={this.state.filter}
            getFilterName={this.getFilterName}
          />
        </CSSTransition>
        <ContactList
          contactList={this.filteredItems()}
          deleteContact={this.deleteContact}
        />
      </>
    );
  }
}
