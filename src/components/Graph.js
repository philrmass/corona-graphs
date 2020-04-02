import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Graph.module.css';

function Graph({
  state,
  graphKey,
  graphType,
  close,
}) {
  function getDalies(days, key, useChanges) {
    const dailies = days.map((day) => {
      const date = getDate(day.date);
      const value = day[key] || 0;
      return {
        date,
        value,
      };
    });

    if (useChanges) {
      return dailies.map(({ date, value }, index) => {
        const last = dailies[index - 1];
        const lastValue = (last && last.value) || 0;
        const change = Math.max(0, value - lastValue);
        return {
          date,
          value: change,
        };
      });
    }

    return dailies;
  }

  function getDate(dateValue) {
    const dateStr = dateValue.toString();
    const year = parseInt(dateStr.slice(0, 4)) || 0;
    const month = parseInt(dateStr.slice(4, 6)) || 0;
    const day = parseInt(dateStr.slice(6, 8)) || 0;

    return new Date(year, month - 1, day, 16);
  }

  function getMax(dailies) {
    return dailies.reduce((max, daily) => {
      const value = daily.value || 0;
      return value > max ? value : max;
    }, 0);
  }

  function buildGraph(days, key, type, max) {
    const dailies = getDalies(days, key, type === 'new');
    const graphMax = max || getMax(dailies);

    return (
      <ul className={styles.graph}>
        {dailies.map((daily) => buildBar(daily, graphMax, key))}
      </ul>
    );
  }

  function buildBar(daily, max, key) {
    const divisor = max > 0 ? max : 1;
    const percent = (100 * daily.value / divisor).toFixed(2);
    const options = { month: 'long', day: 'numeric' };
    const date = daily.date.toLocaleDateString(undefined, options);
    const barStyle = { height: `${percent}%` };
    return (
      <li
        key={daily.date}
        className={`${styles.bar} ${key}`}
        style={barStyle}
      >
        <span className={styles.tooltip}>
          <span className={styles.tooltipDate}>
            {date}
          </span>
          <span className={styles.tooltipValue}>
            {daily.value}
          </span>
        </span>
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
        {buildGraph(state.days, graphKey, graphType)}
      </div>
    </div>
  );
}

Graph.propTypes = {
  state: PropTypes.object,
  graphKey: PropTypes.string,
  graphType: PropTypes.string,
  close: PropTypes.func,
};

export default Graph;
