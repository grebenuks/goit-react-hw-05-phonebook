import React from 'react';
import PropTypes from 'prop-types';
import './contactList.css';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

export function ContactList({ contactList, deleteContact }) {
  return (
    <TransitionGroup component="ul" className="list">
      {contactList.map(contact => {
        return (
          <CSSTransition
            key={contact.id}
            timeout={250}
            classNames="adddelete"
            unmountOnExit
          >
            <li className="item" key={contact.id}>
              <span>{contact.name}</span>
              <span>: {contact.number}</span>
              <button
                className="button"
                onClick={() => deleteContact(contact.id)}
              >
                Delete
              </button>
            </li>
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
}

ContactList.propTypes = {
  contactList: PropTypes.arrayOf(PropTypes.object),
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
  deleteContact: PropTypes.func,
};
