import React, { useState } from 'react';
import Header from './Header';
import Graph from './Graph';
import MiniGraph from './MiniGraph';
import { getSortedStates, getLastChecked } from '../utilities/data';
import countsData from '../data/counts.json';
import styles from '../styles/App.module.css';

function App() {
  const [states] = useState(getSortedStates(countsData));
  const [lastChecked] = useState(getLastChecked(countsData));
  const [graphState, setGraphState] = useState(null);

  function update() {
    console.log('UPDATE'); // eslint-disable-line no-console
    /*
    const request = await fetch('https://covidtracking.com/api/states/daily');
    const data = await request.json();
    console.log('DATA', data);
    */
  }

  function buildState(state) {
    return (
      <li
        key={state.state}
        className={styles.stateLink}
        onClick={() => setGraphState(state)}
      >
        <MiniGraph state={state} />
      </li>
    );
  }

  return (
    <div className={styles.page}>
      <Header
        lastChecked={lastChecked}
        update={update}
      />
      <div className={styles.main}>
        <ul className={styles.stateList}>
          {states.map((state) => buildState(state))}
        </ul>
      </div>
      <Graph
        state={graphState}
        close={() => setGraphState(null)}
      />
    </div>
  );
}

export default App;
