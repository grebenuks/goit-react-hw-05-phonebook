import React from 'react';
import PropTypes from 'prop-types';
import styles from './filter.module.css';

export function Filter({ filter, getFilterName }) {
  const getName = ({ target: { value } }) => {
    getFilterName(value);
  };
  return (
    <>
      <input
        className={styles.input}
        type="text"
        name="filter"
        // value={filter}
        onChange={getName}
      />
    </>
  );
}

Filter.propTypes = {
  filter: PropTypes.string,
  getFilterName: PropTypes.func,
};
