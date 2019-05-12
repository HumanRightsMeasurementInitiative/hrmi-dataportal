import isNumber from 'utils/is-number';
import roundScore from 'utils/round-score';

export default function(value, digits = 1) {
  const d = Math.min(digits, 3);
  return isNumber(value) && roundScore(value, d).toFixed(d);
}
