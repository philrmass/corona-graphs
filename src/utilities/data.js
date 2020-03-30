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

export function subtractArrays(as, bs) {
  if (!bs) {
    return as;
  }
  return as.map((a, index) => {
    const b = bs[index];
    if (a && b) {
      return a - b;
    }
    return 0;
  });
}
