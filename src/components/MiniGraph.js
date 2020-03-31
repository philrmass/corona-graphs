import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/MiniGraph.module.css';
import { subtractArrays } from '../utilities/data';

function MiniGraph({
  state,
  keys,
  type,
}) {
  if (!state) {
    return null;
  }

  function buildMiniGraph() {
    let values = state.days.map((day) => {
      return keys.map((key) => day[key]);
    });
    if (type === 'new') {
      values = values.map((value, index, all) => {
        const last = all[index - 1];
        return subtractArrays(value, last);
      });
    }

    const max = values.reduce((max, value) => {
      return Math.max(...value, max);
    }, 0);

    return (
      <ul className={styles.graph}>
        {values.map((value, index) => buildBar(index, value, keys, max))}
      </ul>
    );
  }

  function buildBar(index, values, keys, max) {
    const percents = values.map((value) => 100 * value / max);

    return (
      <li
        key={index}
        className={styles.bar}
      >
        {percents.map((percent, index, all) => {
          const next = all[index + 1] || 0;
          const height = (percent - next).toFixed(2);
          const barStyle = { height: `${height}%` };
          const keyClass = keys[index] || '';
          return (
            <div
              key={keyClass}
              style={barStyle}
              className={keyClass}
            >
            </div>
          );
        })}
      </li>
    );
  }

  return (
    <div className={styles.main}>
      <div className={styles.titleBox}>
        <div className={`title ${styles.title}`}>
          {state.stateName}
        </div>
        <div className={styles.subtitle}>
          <div className={'positiveText'}>
            {`${state.positiveMax}  (+${state.positiveNew})`}
          </div>
          <div className={'deathText'}>
            {`${state.deathMax}  (+${state.deathNew})`}
          </div>
        </div>
      </div>
      {buildMiniGraph()}
    </div>
  );
}

MiniGraph.propTypes = {
  state: PropTypes.object,
  keys: PropTypes.arrayOf(PropTypes.string).isRequired,
  type: PropTypes.string.isRequired,
};

export default MiniGraph;
