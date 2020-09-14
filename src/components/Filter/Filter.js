import React from 'react';
import PropTypes from 'prop-types';
import styles from './filter.module.css';

export function Filter({ filter, getFilterName }) {
  return (
    <>
      <input
        className={styles.input}
        type="text"
        name="filter"
        value={filter}
        onChange={getFilterName}
      />
    </>
  );
}

Filter.propTypes = {
  filter: PropTypes.string,
  getFilterName: PropTypes.func,
};
