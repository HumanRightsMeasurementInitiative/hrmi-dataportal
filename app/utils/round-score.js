import isNumber from 'utils/is-number';

export default function(value, digits = 1) {
  const factor = 10 ** Math.min(digits, 3);
  return isNumber(value) && Math.round(value * factor) / factor;
}
