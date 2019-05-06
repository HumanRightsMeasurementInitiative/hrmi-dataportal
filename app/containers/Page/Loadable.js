/**
 *
 * Asynchronously loads the component for Page
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
