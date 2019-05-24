import { RIGHTS } from 'containers/App/constants';

export const rightsForDimension = dimensionKey =>
  RIGHTS.filter(
    r => typeof r.aggregate === 'undefined' && r.dimension === dimensionKey,
  );
