import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Graph.module.css';

function Graph({
  state,
  close,
}) {
  function getMax(days, key) {
    return days.reduce((max, day) => {
      const value = parseInt(day[key]);
      return value > max ? value : max;
    }, 1);
  }

  function buildGraph(days) {
    const key = 'positive';
    const max = getMax(days, key);
    return (
      <ul className={styles.graph}>
        {days.map((day) => buildBar(day, key, max))}
      </ul>
    );
  }

  function buildBar(day, key, max) {
    const value = parseInt(day[key]);
    const percent = (100 * value / max).toFixed(2);
    const barStyle = { height: `${percent}%` };
    return (
      <li
        key={day.date}
        className={styles.bar}
        style={barStyle}
      >
      </li>
    );
  }

  return (
    <div
      className={styles.main}
      onClick={close}
    >
      <div className={styles.box}>
        <div className={styles.title}>{state.stateName}</div>
        {buildGraph(state.days)}
      </div>
    </div>
  );
}

Graph.propTypes = {
  state: PropTypes.object,
  close: PropTypes.func,
};

export default Graph;
