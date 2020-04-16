import React, { useState } from 'react';
import Header from './Header';
import Graph from './Graph';
import MiniGraph from './MiniGraph';
import { getSortedStates, getLastChecked, calculateMetadata } from '../utilities/data';
import { saveData } from '../utilities/file';
import statesData from '../data/states.json';
import styles from '../styles/App.module.css';

function App() {
  const sortTypes = ['Name', 'Cases', 'New Cases', 'Deaths', 'New Deaths'];
  const typeClasses = {
    Cases: 'positiveText',
    'New Cases': 'positiveText',
    Deaths: 'deathText',
    'New Deaths': 'deathText',
  };
  const [states, setStates] = useState(calculateMetadata(statesData));
  const [sortedStates, setSortedStates] = useState(states);
  const [lastChecked, setLastChecked] = useState(getLastChecked(statesData));
  const [graphState, setGraphState] = useState(null);
  const [graphKey, setGraphKey] = useState('positive');
  const [graphType, setGraphType] = useState('max');
  const [graphMax, setGraphMax] = useState(null);
  const [maxState, setMaxState] = useState(null);
  const [sortType, setSortType] = useState(sortTypes[0]);
  const isLocalhost = location.hostname === 'localhost';

  function setSort(type) {
    setSortType(type);

    let sortKey = '';
    switch (type) {
      case 'Cases':
        setGraphKey('positive');
        setGraphType('max');
        sortKey = 'positiveMax';
        break;
      case 'New Cases':
        setGraphKey('positive');
        setGraphType('new');
        sortKey = 'positiveNew';
        break;
      case 'Deaths':
        setGraphKey('death');
        setGraphType('max');
        sortKey = 'deathMax';
        break;
      case 'New Deaths':
        setGraphKey('death');
        setGraphType('new');
        sortKey = 'deathNew';
        break;
      default:
        setGraphKey('positive');
        setGraphType('max');
    }

    if (sortKey) {
      const byKey = (a, b) => b[sortKey] - a[sortKey];
      setSortedStates([...states].sort(byKey));
    } else {
      setSortedStates(states);
    }
  }

  function updateGraphMax(state, max) {
    if (state === maxState) {
      setMaxState(null);
      setGraphMax(null);
    } else if (state === null) {
      setGraphMax(max);
    } else {
      setMaxState(state);
      setGraphMax(max);
    }
  }

  async function update() {
    const url = 'https://covidtracking.com/api/states/daily';
    const response = await fetch(url);
    const data = await response.json();
    const updatedData = getSortedStates(data);
    const updatedStates = calculateMetadata(updatedData);
    setStates(updatedStates);
    setLastChecked(getLastChecked(updatedData));

    setGraphKey('positive');
    setGraphType('max');
    setSortType(sortTypes[0]);
    setSortedStates(updatedStates);

    if (isLocalhost) {
      saveData('states.json', updatedData);
    }
  }

  function buildState(state) {
    return (
      <li
        key={state.state}
        className={styles.state}
        onDoubleClick={() => setGraphState(state)}
      >
        <MiniGraph
          state={state}
          graphKey={graphKey}
          graphType={graphType}
          graphMax={graphMax}
          maxState={maxState}
          setGraphMax={updateGraphMax}
        />
      </li>
    );
  }

  const showGraph = Boolean(graphState);

  return (
    <div className={styles.page}>
      <Header
        lastChecked={lastChecked}
        sortTypes={sortTypes}
        sortType={sortType}
        typeClasses={typeClasses}
        setSortType={setSort}
        update={update}
      />
      <div className={styles.main}>
        {!showGraph &&
        <ul className={styles.stateList}>
          {sortedStates.map((state) => buildState(state))}
        </ul>
        }
        {showGraph &&
          <Graph
            state={graphState}
            graphKey={graphKey}
            graphType={graphType}
            close={() => setGraphState(null)}
          />
        }
      </div>
    </div>
  );
}

export default App;
