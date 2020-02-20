/**
 *
 * Overview
 *
 */

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Box, Drop, Button } from 'grommet';
import { FormDown, FormUp } from 'grommet-icons';

import styled, { withTheme } from 'styled-components';

import Search from 'containers/Search';
import NavCountry from 'containers/Search/NavCountry';
import NavMetric from 'containers/Search/NavMetric';

import Icon from 'components/Icon';

// styles
import SectionContainer from 'styled/SectionContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';

import PageTitle from 'styled/PageTitle';
import rootMessages from 'messages';

import messages from './messages';
const Bar = props => (
  <Box
    direction="row"
    align="center"
    height={`${props.theme.sizes.header.heightBottom}px`}
    background="dark"
    {...props}
  />
);
Bar.propTypes = {
  theme: PropTypes.object,
};

// prettier-ignore
const DropdownButton = styled(Button)`
  height: 56px;
  padding: 5px 10px;
  min-width: 160px;
  width: 50%;
  background-color: ${({ active, theme }) =>
    active ? theme.global.colors['dark-2'] : 'transparent'};
  border-right: ${({ last }) => last ? 2 : 1}px solid;
  border-left: ${({ first }) => first ? 0 : 1}px solid;
  border-color: ${({ theme }) => theme.global.colors['dark-2']};
  &:hover {
    background-color: ${({ active, theme }) =>
    theme.global.colors[active ? 'dark-2' : 'dark-3']};
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding: 5px 10px 5px 12px;
    width: auto;
  }
`;

export function SectionIntro({ theme }) {
  const [showCountries, setShowCountries] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);
  const countryTarget = useRef(null);
  const metricTarget = useRef(null);

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
          Section Search
          <Search />
          <Bar theme={theme}>
            <DropdownButton
              plain
              first
              active={showCountries}
              onClick={() => {
                setShowMetrics(false);
                setShowCountries(!showCountries);
              }}
              icon={<Icon name="COUNTRY" style={{ minWidth: '24px' }} />}
              label={
                <Box
                  direction="row"
                  align="center"
                  justify="between"
                  fill="horizontal"
                >
                  <FormattedMessage {...rootMessages.labels.countries} />
                  {showCountries && <FormUp size="large" />}
                  {!showCountries && <FormDown size="large" />}
                </Box>
              }
              ref={countryTarget}
            />
            {showCountries && (
              <Drop
                align={{ top: 'bottom', left: 'left' }}
                target={countryTarget.current}
                onClickOutside={() => setShowCountries(false)}
                overflow="hidden"
              >
                <NavCountry onClose={() => setShowCountries(false)} />
              </Drop>
            )}
            <DropdownButton
              plain
              active={showMetrics}
              onClick={() => {
                setShowCountries(false);
                setShowMetrics(!showMetrics);
              }}
              icon={<Icon name="METRICS" style={{ minWidth: '24px' }} />}
              justify="between"
              label={
                <Box
                  direction="row"
                  align="center"
                  justify="between"
                  fill="horizontal"
                >
                  <FormattedMessage {...rootMessages.labels.metrics} />
                  {showCountries && <FormUp size="large" />}
                  {!showCountries && <FormDown size="large" />}
                </Box>
              }
              ref={metricTarget}
            />
            {showMetrics && (
              <Drop
                align={{ top: 'bottom', left: 'left' }}
                target={metricTarget.current}
                onClickOutside={() => setShowMetrics(false)}
              >
                <NavMetric onClose={() => setShowMetrics(false)} />
              </Drop>
            )}
          </Bar>
        </ContentMaxWidth>
      </SectionContainer>
    </>
  );
}

SectionIntro.propTypes = {
  theme: PropTypes.object,
};

export default withTheme(SectionIntro);
