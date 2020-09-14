import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import styles from './form.module.css';

export class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  handleNameChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
    this.props.getName(this.state.name);
  };

  hanndleSubmit = e => {
    e.preventDefault();
    this.props.getContact({ ...this.state, id: uuidv4() });
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={styles.form} onSubmit={this.hanndleSubmit}>
        <label className={styles.label}>
          Name:
          <input
            className={styles.input}
            type="text"
            name="name"
            value={name}
            onChange={this.handleNameChange}
          ></input>
        </label>
        <label className={styles.label}>
          Phone:
          <input
            className={styles.input}
            type="tel"
            name="number"
            value={number}
            onChange={this.handleNameChange}
          ></input>
        </label>

        <button className={styles.button} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  getContact: PropTypes.func,
  getName: PropTypes.func,
};
