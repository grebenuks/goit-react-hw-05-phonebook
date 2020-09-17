import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import styles from './form.module.css';

export function Form({ getName, getContact }) {
  const [state, setState] = useState({ name: '', number: '' });

  const handleNameChange = ({ target: { name, value } }) => {
    setState(prev => ({ ...prev, [name]: value }));
  };

  const hanndleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    if (state.name === '' || state.number === '') {
      return;
    } else {
      getContact({ ...state, id: uuidv4() });
    }
    setState({ name: '', number: '' });
    form.reset();
  };

  return (
    <form className={styles.form} onSubmit={hanndleSubmit}>
      <label className={styles.label}>
        Name:
        <input
          className={styles.input}
          type="text"
          name="name"
          onChange={handleNameChange}
        ></input>
      </label>
      <label className={styles.label}>
        Phone:
        <input
          className={styles.input}
          type="tel"
          name="number"
          onChange={handleNameChange}
        ></input>
      </label>

      <button className={styles.button} type="submit">
        Add contact
      </button>
    </form>
  );
}

Form.propTypes = {
  getContact: PropTypes.func,
  getName: PropTypes.func,
};

//? На классах
// export class Form extends Component {
//   state = {
//     name: '',
//     number: '',
//   };

//   handleNameChange = ({ target: { name, value } }) => {
//     this.setState({ [name]: value });
//     this.props.getName(this.state.name);
//   };

//   hanndleSubmit = e => {
//     e.preventDefault();
//     this.props.getContact({ ...this.state, id: uuidv4() });
//     this.setState({ name: '', number: '' });
//   };

//   render() {
//     const { name, number } = this.state;
//     return (
//       <form className={styles.form} onSubmit={this.hanndleSubmit}>
//         <label className={styles.label}>
//           Name:
//           <input
//             className={styles.input}
//             type="text"
//             name="name"
//             value={name}
//             onChange={this.handleNameChange}
//           ></input>
//         </label>
//         <label className={styles.label}>
//           Phone:
//           <input
//             className={styles.input}
//             type="tel"
//             name="number"
//             value={number}
//             onChange={this.handleNameChange}
//           ></input>
//         </label>

//         <button className={styles.button} type="submit">
//           Add contact
//         </button>
//       </form>
//     );
//   }
// }
