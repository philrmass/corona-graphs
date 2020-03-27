import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/MiniGraph.module.css';

function MiniGraph({ state }) {
  if (!state) {
    return null;
  }

  function getMax(days, key) {
    return days.reduce((max, day) => {
      const value = parseInt(day[key]);
      return value > max ? value : max;
    }, 1);
  }

  function buildMiniGraph(days) {
    console.log('DAYS', days);
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
        className={styles.caseBar}
        style={barStyle}
      >
      </li>
    );
  }

  return (
    <div className={styles.main}>
      <div className={styles.title}>{state.stateName}</div>
      {buildMiniGraph(state.days)}
    </div>
  );
}

MiniGraph.propTypes = {
  state: PropTypes.object,
};

export default MiniGraph;
