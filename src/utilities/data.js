import stateNames from '../data/stateNames.json';

export function getSortedStates(counts) {
  const statesObj = counts.reduce((result, count) => {
    const state = count.state;
    if (!result[state]) {
      result[state] = {
        state,
        stateName: stateNames[state],
        days: [],
      };
    }
    result[state].days.push({
      date: count.date,
      dateChecked: count.dateChecked,
      positive: count.positive,
      death: count.death,
    });
    return result;
  }, {});

  const states = Object.values(statesObj);
  const filtered = states.filter((state) => state.stateName);

  const byStateName = (a, b) => a.stateName.localeCompare(b.stateName);
  filtered.sort(byStateName);

  const byDate = (a, b) => a.date - b.date;
  for (const state of filtered) {
    state.days.sort(byDate);
  }

  return filtered;
}

export function combineStates(states0, states1) {
  return states0.map((state, index) => {
    const state0 = { ...state };
    const state1 = states1[index];
    const days0 = state0.days;
    const days1 = state1.days;

    days1.map((day1) => {
      const found = days0.find((day0) => day0.date === day1.date);
      if (!found) {
        days0.push({
          date: day1.date,
          dateChecked: day1.dateChecked,
          positive: day1.positive,
          death: day1.death,
        });
      }
    });

    return state0;
  });
}

export function getLastCheckedOLD(counts) {
  return counts.reduce((last, count) => {
    return (count.dateChecked > last) ? count.dateChecked : last;
  }, '');
}

export function getLastChecked(states) {
}
