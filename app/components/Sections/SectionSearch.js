/**
 *
 * Overview
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import styled from 'styled-components';

import Search from 'containers/Search';
// styles
import SectionContainer from 'styled/SectionContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';

import SectionTitle from './SectionTitle';

import messages from './messages';

const SearchWrapper = styled.div`
  width: 100%;
  margin: 20px 0;
`;

export function SectionSearch({ intl }) {
  return (
    <SectionContainer pad={{ top: 'medium', bottom: 'large' }}>
      <ContentMaxWidth align="start" column>
        <SectionTitle
          title={intl.formatMessage(messages.search.title)}
          level={1}
        />
        <SearchWrapper>
          <Search stretch size="large" example />
        </SearchWrapper>
      </ContentMaxWidth>
    </SectionContainer>
  );
}

SectionSearch.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(SectionSearch);
