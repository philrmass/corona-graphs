export function getDalies(days, key, useChanges) {
  const dailies = days.map((day) => {
    const date = getDate(day.date);
    const value = day[key] || 0;
    return {
      date,
      value,
    };
  });

  if (useChanges) {
    return dailies.map(({ date, value }, index) => {
      const last = dailies[index - 1];
      const lastValue = (last && last.value) || 0;
      const change = Math.max(0, value - lastValue);
      return {
        date,
        value: change,
      };
    });
  }

  return dailies;
}

function getDate(dateValue) {
  const dateStr = dateValue.toString();
  const year = parseInt(dateStr.slice(0, 4)) || 0;
  const month = parseInt(dateStr.slice(4, 6)) || 0;
  const day = parseInt(dateStr.slice(6, 8)) || 0;

  return new Date(year, month - 1, day, 16);
}

export function getMax(dailies) {
  return dailies.reduce((max, daily) => {
    const value = daily.value || 0;
    return value > max ? value : max;
  }, 0);
}

