import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Header.module.css';

function Header({
  lastChecked,
}) {
  const now = Date.now();
  const margin = 1000 * 60 * 60 * 12;
  const last = new Date(lastChecked).getTime() + margin;
  const isOld = now > last;

  function buildButton() {
    if (!isOld) {
      return null;
    }

    return (
      <button
      >
        Update
      </button>
    );
  }

  return (
    <div className={styles.main}>
      <div>
        Coronavirus Cases By State
      </div>
      {buildButton()}
    </div>
  );
}

Header.propTypes = {
  lastChecked: PropTypes.string.isRequired,
};

export default Header;
