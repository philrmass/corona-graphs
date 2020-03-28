import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/MiniGraph.module.css';

function MiniGraph({ state }) {
  const max = getMax(state.days, 'positive');
  const curve = calculateCurve(state.days, 'positive');

  if (!state) {
    return null;
  }

  function getMax(days, key) {
    return days.reduce((max, day) => {
      const value = parseInt(day[key]);
      return value > max ? value : max;
    }, 1);
  }

  function calculateCurve(days, key) {
    const values = days.map((day) => day[key]);
    //??? remove debugging
    const test = 'OR';
    if (state.state === test) {
      console.log(test, values); //eslint-disable-line no-console
    }
    return 0;
  }

  function buildMiniGraph(days) {
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
      <div className={styles.titleBox}>
        <div className={styles.title}>
          {state.stateName}
        </div>
        <div className={styles.cases}>
          {`${max} cases`}
        </div>
        <div className={styles.curve}>
          {curve}
        </div>
      </div>
      {buildMiniGraph(state.days)}
    </div>
  );
}

MiniGraph.propTypes = {
  state: PropTypes.object,
};

export default MiniGraph;
