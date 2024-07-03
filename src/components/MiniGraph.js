import { useState } from 'preact/hooks';
import PropTypes from 'prop-types';
import styles from '../styles/MiniGraph.module.css';
import { getDalies, getMax } from '../utilities/graph';

function MiniGraph({
  state,
  graphKey,
  graphType,
  graphMax,
  maxState,
  setGraphMax,
}) {
  const [localMax, setLocalMax] = useState(0);

  function buildMaxButton() {
    const selected = maxState === state.state ? styles.selected : '';

    return (
      <button
        className={`${styles.maxButton} ${selected}`}
        onClick={() => setGraphMax(state.state, localMax)}
      >
        <svg width='100%' height='100%' viewBox='0 0 100 100'>
          <polygon
            points='10,10 90,10 90,20 50,20 80,55 60,55 60,90 40,90 40,55 20,55 50,20 10,20'
          />
        </svg>
      </button>
    );
  }

  function buildMiniGraph(days, key, type, max) {
    const dailies = getDalies(days, key, type === 'new');
    const dailiesMax = getMax(dailies);
    const graphMax = max || dailiesMax;
    if (dailiesMax !== localMax) {
      setLocalMax(dailiesMax);
      if (state.state === maxState) {
        setGraphMax(null, dailiesMax);
      }
    }

    return (
      <ul className={styles.graph}>
        {dailies.map((daily) => buildBar(daily, graphMax, key))}
      </ul>
    );
  }

  function buildBar(daily, max, key) {
    const divisor = max > 0 ? max : 1;
    const overflow = daily.value > max ? styles.barOverflow : '';
    const percent = overflow ? '100' : (100 * daily.value / divisor).toFixed(2);
    const barStyle = { height: `${percent}%` };

    return (
      <li
        key={daily.date}
        className={`${styles.bar} ${key} ${overflow}`}
        style={barStyle}
      >
      </li>
    );
  }

  if (!state) {
    return null;
  }

  const selected = maxState === state.state ? styles.mainSelected : '';

  return (
    <div className={`${styles.main} ${selected}`}>
      <div className={`title ${styles.title}`}>
        {state.stateName}
      </div>
      <div className={styles.subtitleBox}>
        <div className={styles.subtitle}>
          <div className={'positiveText'}>
            {`${state.positiveMax}  (+${state.positiveNew})`}
          </div>
          <div className={'deathText'}>
            {`${state.deathMax}  (+${state.deathNew})`}
          </div>
        </div>
        <div className={styles.buttonBox}>
          {buildMaxButton()}
        </div>
      </div>
      <div className={styles.graphBox}>
        {buildMiniGraph(state.days, graphKey, graphType, graphMax)}
      </div>
    </div>
  );
}

MiniGraph.propTypes = {
  state: PropTypes.object,
  graphKey: PropTypes.string,
  graphType: PropTypes.string,
  graphMax: PropTypes.number,
  maxState: PropTypes.string,
  setGraphMax: PropTypes.func,
};

export default MiniGraph;
