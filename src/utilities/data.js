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

export function getLastChecked(counts) {
  return counts.reduce((last, count) => {
    return (count.dateChecked > last) ? count.dateChecked : last;
  }, '');
}
