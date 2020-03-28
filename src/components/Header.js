import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Header.module.css';

function Header({ lastChecked, update }) {
  function buildDate() {
    const now = Date.now();
    const hour = 1000 * 60 * 60;
    const margin = 24 * hour;
    const lastDate = new Date(lastChecked);
    const nextUpdate = lastDate.getTime() + margin;
    const canUpdate = now > nextUpdate;
    const last = lastDate.toLocaleDateString(undefined, { month: 'long', day: 'numeric' });

    return (
      <div className={styles.date}>
        {`Through ${last}`}
        {canUpdate &&
          <button className={styles.link} onClick={update}>Update</button>
        }
      </div>
    );
  }

  return (
    <div className={styles.main}>
      <div className={styles.title}>
        Coronavirus Cases By State
      </div>
      <div className={styles.subtitle}>
        {buildDate()}
        <div>Data from
          <a className={styles.link} href='https://covidtracking.com/api/'>
            The COVID Tracking Project
          </a>
        </div>
        <div>By
          <a className={styles.link} href='https://www.linkedin.com/in/philmass/'>
            Phil Mass
          </a>
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  lastChecked: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
};

export default Header;
