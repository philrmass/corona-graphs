import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/MiniGraph.module.css';
import { getDalies, getMax } from '../utilities/graph';

function MiniGraph({
  state,
  graphKey,
  graphType,
}) {
  if (!state) {
    return null;
  }

  function buildMiniGraph(days, key, type, max) {
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
    const barStyle = { height: `${percent}%` };

    return (
      <li
        key={daily.date}
        className={`${styles.bar} ${key}`}
        style={barStyle}
      >
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
      {buildMiniGraph(state.days, graphKey, graphType)}
    </div>
  );
}

MiniGraph.propTypes = {
  state: PropTypes.object,
  graphKey: PropTypes.string,
  graphType: PropTypes.string,
};

export default MiniGraph;
