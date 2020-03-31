import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Header.module.css';

function Header({
  lastChecked,
  sortTypes,
  sortType,
  typeClasses,
  setSortType,
  update,
}) {
  function buildDate() {
    const oneDay = 24 * 60 * 60 * 1000;
    const lastDate = new Date(lastChecked);
    const nextUpdate = lastDate.getTime() + oneDay;
    const canUpdate = Date.now() > nextUpdate;
    const last = lastDate.toLocaleDateString(undefined, { month: 'long', day: 'numeric' });

    return (
      <div>
        {`Through ${last}`}
        {canUpdate &&
          <button className={styles.link} onClick={update}>Update</button>
        }
      </div>
    );
  }

  function buildTabs() {
    return (
      <ul className={styles.tabs}>
        {sortTypes.map((type) => {
          const selected = (type === sortType) ? styles.selected : '';
          const typeClass = typeClasses[type] || '';
          const tabClasses = `${styles.tab} ${selected} ${typeClass}`;
          return (
            <li
              key={type}
              className={tabClasses}
            >
              <button
                onClick={() => setSortType(type)}
              >
                {type}
              </button>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div>
      <div className={styles.main}>
        <div className={`title ${styles.title}`}>
          Coronavirus US State Graphs
        </div>
        <div className={styles.subtitle}>
          {buildDate()}
          <div>Data from
            <a className={styles.link} href='https://covidtracking.com/api/'>
              The COVID Tracking Project
            </a>
          </div>
          <div>Created By
            <a className={styles.link} href='https://www.linkedin.com/in/philmass/'>
              Phil Mass
            </a>
          </div>
        </div>
      </div>
      {buildTabs()}
    </div>
  );
}

Header.propTypes = {
  lastChecked: PropTypes.string.isRequired,
  sortTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  sortType: PropTypes.string.isRequired,
  typeClasses: PropTypes.object.isRequired,
  setSortType: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
};

export default Header;
