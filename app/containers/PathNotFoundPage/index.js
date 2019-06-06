/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Heading } from 'grommet';

import messages from './messages';

export default function PathNotFound() {
  return (
    <article>
      <Heading responsive={false}>
        <FormattedMessage {...messages.header} />
      </Heading>
    </article>
  );
}
