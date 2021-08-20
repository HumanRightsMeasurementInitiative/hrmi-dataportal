import { DIMENSIONS, RIGHTS, INDICATORS } from 'containers/App/constants';

export default function(code) {
  const dimension = DIMENSIONS.find(m => m.key === code);
  if (dimension) {
    return {
      metricType: 'dimensions',
      metricTypeSingle: 'dimension',
      color: dimension.key,
      ...dimension,
    };
  }
  const right = RIGHTS.find(m => m.key === code);
  if (right) {
    return {
      metricType: 'rights',
      metricTypeSingle: 'right',
      color: right.dimension,
      ...right,
    };
  }
  const indicator = INDICATORS.find(m => m.key === code)
  if (indicator) {
    return {
      metricType: 'indicators',
      metricTypeSingle: 'indicator',
      type: 'esr',
      color: 'esr',
      ...indicator,
    };
  }
  // N.B. violence exceptions
  if (
    code === 'vchild'
    || code === 'vdisab'
    || code === 'vwomen'
    || code === 'vmvpfaff'
  ) {
    return {
      metricType: 'indicators',
      metricTypeSingle: 'indicator',
      type: 'cpr',
      color: 'cpr',
      key: code === 'vchild' ? 'violence-children' : code === 'vdisab' ? 'violence-disabilities' : code === 'vwomen' ? 'violence-women-and-girls' : 'violence-mvpfaff-lgbtqia',
      code,
      right: 'violence',
      resource: 'pacific'
    };
  }
  return false;
}
