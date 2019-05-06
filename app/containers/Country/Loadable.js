/**
 *
 * Asynchronously loads the component for Country
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
