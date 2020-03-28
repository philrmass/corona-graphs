import React, { useState } from 'react';
import Header from './Header';
import Graph from './Graph';
import MiniGraph from './MiniGraph';
import { getSortedStates, combineStates, getLastChecked, getLastCheckedOLD } from '../utilities/data';
import { saveData } from '../utilities/file';
//??? remove counts data
import countsData from '../data/counts.json';
import statesData from '../data/states.json';
import styles from '../styles/App.module.css';

function App() {
  const [states, setStates] = useState(statesData);
  const [lastChecked] = useState(getLastCheckedOLD(countsData));
  const [graphState, setGraphState] = useState(null);

  async function update() {
    const url = 'https://covidtracking.com/api/states/daily';
    const response = await fetch(url);
    const data = await response.json();
    const statesData = getSortedStates(data);
    console.log('OLD', states[37]);
    console.log('NEW', statesData[37]);
    const updatedStates = combineStates(states, statesData);
    console.log('BOTH', updatedStates[37]);
    setStates(updatedStates);

    if (location.hostname === 'localhost') {
      saveData('states.json', updatedStates);
    }
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
