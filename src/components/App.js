import React, { useState, useEffect } from 'react';
import { Form } from './Form/Form';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Notification } from './Notification/Notification';

import { CSSTransition } from 'react-transition-group';

import './app.css';

export default function App() {
  const [state, setState] = useState({
    contacts: [],
    name: '',
    filter: '',
  });

  const [filterItems, setFilterItems] = useState([]);

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const contactsParsed = JSON.parse(contacts);
    if (contactsParsed) {
      setState({ contacts: contactsParsed });
    }
  }, []);

  const getName = data => {
    setState(prev => ({ ...prev, name: data }));
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(state.contacts));
    if (state.filter) {
      setFilterItems(
        state.contacts.filter(el =>
          el.name.toLowerCase().includes(state.filter.toLowerCase()),
        ),
      );
    } else {
      setFilterItems([]);
    }
  }, [state.filter, state.contacts]);

  const [notify, setNotify] = useState(false);

  const getContact = contact => {
    let flag = true;

    state.contacts.map(el => (el.name === contact.name ? (flag = false) : ''));
    flag
      ? setState(prev => ({ ...prev, contacts: [...prev.contacts, contact] }))
      : notifyTrue();
  };

  const notifyTrue = () => {
    setNotify(true);
  };

  const getFilterName = value => {
    setState(prev => ({ ...prev, filter: value }));
  };

  const deleteContact = contactId => {
    setState(prev => ({
      contacts: prev.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  return (
    <>
      <CSSTransition
        in={notify}
        timeout={2000}
        classNames="notify"
        unmountOnExit
        onEntered={() => setNotify(false)}
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
      <Form getContact={getContact} getName={getName} />
      <CSSTransition
        in={state.contacts.length >= 1}
        timeout={300}
        unmountOnExit
        classNames="title-contacts"
      >
        <h2 className="title-contacts">Contacts</h2>
      </CSSTransition>
      <CSSTransition
        in={state.contacts.length >= 2}
        timeout={300}
        unmountOnExit
        classNames="filter"
      >
        <Filter filter={state.filter} getFilterName={getFilterName} />
      </CSSTransition>
      <ContactList
        contactList={filterItems.length > 0 ? filterItems : state.contacts}
        deleteContact={deleteContact}
      />
    </>
  );
}

//? На классах
// export default class App extends Component {
//   state = {
//     contacts: [],
//     name: '',
//     notify: false,
//   };

//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const contactsParsed = JSON.parse(contacts);
//     if (contactsParsed) {
//       this.setState({ contacts: contactsParsed });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   getName = data => {
//     this.setState({ name: data });
//   };

//   getContact = contact => {
//     let flag = true;

//     this.state.contacts.map(el =>
//       el.name === contact.name ? (flag = false) : '',
//     );

//     flag
//       ? this.setState(prev => {
//           return { ...prev, contacts: [...prev.contacts, contact] };
//         })
//       : this.notifyTrue();
//   };

//   notifyTrue() {
//     this.setState({ notify: true });
//   }

//   getFilterName = event => {
//     this.setState({ filter: event.target.value });
//   };

//   filteredItems = () => {
//     return this.state.filter
//       ? this.state.contacts.filter(el =>
//           el.name.toLowerCase().includes(this.state.filter.toLowerCase()),
//         )
//       : this.state.contacts;
//   };

//   deleteContact = contactId => {
//     this.setState(prev => ({
//       contacts: prev.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   render() {
//     return (
//       <>
//         <CSSTransition
//           in={this.state.notify}
//           timeout={2000}
//           classNames="notify"
//           unmountOnExit
//           onEntered={() => this.setState({ notify: false })}
//         >
//           <Notification />
//         </CSSTransition>
//         <CSSTransition
//           in={true}
//           appear={true}
//           timeout={2000}
//           classNames="op"
//           unmountOnExit
//         >
//           <h2 className="title">Phonebook</h2>
//         </CSSTransition>
//         <Form getContact={this.getContact} getName={this.getName} />
//         <CSSTransition
//           in={this.state.contacts.length >= 1}
//           timeout={300}
//           unmountOnExit
//           classNames="title-contacts"
//         >
//           <h2 className="title-contacts">Contacts</h2>
//         </CSSTransition>
//         <CSSTransition
//           in={this.state.contacts.length >= 2}
//           timeout={300}
//           unmountOnExit
//           classNames="filter"
//         >
//           <Filter
//             filter={this.state.filter}
//             getFilterName={this.getFilterName}
//           />
//         </CSSTransition>
//         <ContactList
//           contactList={this.filteredItems()}
//           deleteContact={this.deleteContact}
//         />
//       </>
//     );
//   }
// }
