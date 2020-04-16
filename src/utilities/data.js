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

export function getLastChecked(states) {
  return states.reduce((last, state) => {
    return state.days.reduce((dayLast, day) => {
      return (day.dateChecked > dayLast) ? day.dateChecked : dayLast;
    }, last);
  }, '');
}

export function calculateMetadata(states) {
  return states.map((state) => {
    const positiveMax = getMax(state.days, 'positive');
    const positiveNew = getNew(state.days, 'positive');
    const deathMax = getMax(state.days, 'death');
    const deathNew = getNew(state.days, 'death');

    return {
      ...state,
      positiveMax,
      positiveNew,
      deathMax,
      deathNew,
    };
  });
}

function getMax(days, key) {
  return days.reduce((max, day) => {
    const value = parseInt(day[key]);
    return value > max ? value : max;
  }, 0);
}

function getNew(days, key) {
  const last = days[days.length - 1];
  const second = days[days.length - 2];
  const lastValue = last && last[key];
  const secondValue = second && second[key];

  if (lastValue && secondValue) {
    return lastValue - secondValue;
  }
  return 0;
}
