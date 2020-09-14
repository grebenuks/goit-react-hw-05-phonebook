import React from 'react';
import PropTypes from 'prop-types';
import styles from './contactList.module.css';

export function ContactList({ contactList, deleteContact }) {
  return (
    <ul className={styles.list}>
      {contactList.map(contact => {
        return (
          <li className={styles.item} key={contact.id}>
            <span>{contact.name}</span>
            <span>: {contact.number}</span>
            <button
              className={styles.button}
              onClick={() => deleteContact(contact.id)}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
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
