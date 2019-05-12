import formatScore from 'utils/format-score';

export default function(value, maxValue = 100, digits = 1) {
  const formatted = formatScore(value, digits);
  if (formatted && maxValue === 100) {
    return `${formatted}%`;
  }
  return formatted && `${formatted}/${maxValue}`;
}
