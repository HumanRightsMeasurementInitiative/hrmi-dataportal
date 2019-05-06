/**
 *
 * Asynchronously loads the component for Metric
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
