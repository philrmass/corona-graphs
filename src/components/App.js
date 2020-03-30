import React, { useState } from 'react';
import Header from './Header';
import Graph from './Graph';
import MiniGraph from './MiniGraph';
import { getSortedStates, combineStates, getLastChecked, calculateMetadata } from '../utilities/data';
import { saveData } from '../utilities/file';
import statesData from '../data/states.json';
import styles from '../styles/App.module.css';

function App() {
  const [states, setStates] = useState(calculateMetadata(statesData));
  const [lastChecked] = useState(getLastChecked(statesData));
  const [graphState, setGraphState] = useState(null);
  const [graphKeys, setGraphKeys] = useState(['positive', 'death']);
  const [graphType, setGraphType] = useState('max');

  async function update() {
    const url = 'https://covidtracking.com/api/states/daily';
    const response = await fetch(url);
    const data = await response.json();
    const receivedData = getSortedStates(data);
    const updatedStates = combineStates(statesData, receivedData);
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
      >
        <MiniGraph
          state={state}
          keys={graphKeys}
          type={graphType}
        />
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
