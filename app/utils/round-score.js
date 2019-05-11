import isNumber from 'utils/is-number';

export default function(value) {
  return isNumber(value) && Math.round(value * 100) / 100;
}
