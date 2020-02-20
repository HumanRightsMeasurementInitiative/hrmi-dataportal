/**
 *
 * Overview
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import Search from 'containers/Search';

// styles
import SectionContainer from 'styled/SectionContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';

import PageTitle from 'styled/PageTitle';

import messages from './messages';

const SearchWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 20px 0;
`;

export function SectionIntro() {
  return (
    <SectionContainer border>
      <ContentMaxWidth maxWidth="1024px" column>
        <PageTitle level={3}>
          <FormattedMessage {...messages.title} />
        </PageTitle>
        <FormattedMessage {...messages.intro} />
        <SearchWrapper>
          <Search dark stretch />
        </SearchWrapper>
      </ContentMaxWidth>
    </SectionContainer>
  );
}

SectionIntro.propTypes = {};

export default SectionIntro;
