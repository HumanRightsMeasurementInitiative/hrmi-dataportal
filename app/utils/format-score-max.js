import formatScore from 'utils/format-score';

export default function(value, maxValue = 100, digits = 1, showMax) {
  const formatted = formatScore(value, digits);
  if (formatted && maxValue === 100) {
    return `${formatted}%`;
  }
  if (formatted && !showMax) {
    return formatted;
  }
  return formatted && `${formatted}/${maxValue}`;
}
