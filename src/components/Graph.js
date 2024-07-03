import PropTypes from 'prop-types';
import styles from '../styles/Graph.module.css';
import { getDalies, getMax } from '../utilities/graph';

function Graph({
  state,
  graphKey,
  graphType,
  close,
}) {
  function buildGraph(days, key, type) {
    const dailies = getDalies(days, key, type === 'new');
    const graphMax = getMax(dailies);

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
