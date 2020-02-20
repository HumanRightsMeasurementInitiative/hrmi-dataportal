/**
 *
 * Overview
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Search from 'containers/Search';

// styles
import SectionContainer from 'styled/SectionContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';

import PageTitle from 'styled/PageTitle';

import messages from './messages';

export function SectionIntro() {
  return (
    <>
      <SectionContainer border>
        <ContentMaxWidth maxWidth="1024px" column>
          <PageTitle level={3}>
            <FormattedMessage {...messages.title} />
          </PageTitle>
          <FormattedMessage {...messages.intro} />
        </ContentMaxWidth>
      </SectionContainer>
      <SectionContainer border background="dark">
        <ContentMaxWidth maxWidth="1024px" column>
          <Search />
        </ContentMaxWidth>
      </SectionContainer>
    </>
  );
}

SectionIntro.propTypes = {};

export default SectionIntro;
