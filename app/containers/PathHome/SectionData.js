/**
 *
 * Overview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveContext } from 'grommet';
import { isMaxSize } from 'utils/responsive';

// styles
import SectionContainer from 'styled/SectionContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';

import Slider from './Slider';
import CardData from './CardData';

export function SectionData({
  noCountries = 0,
  noRights = 0,
  noGroups = 0,
  navCountries,
  navRights,
  navGroups,
}) {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <SectionContainer border background="light-4">
          <ContentMaxWidth maxWidth="medium" column>
            Our data
            <Slider
              stretch
              cardMargin={isMaxSize(size, 'small') ? 'xsmall' : 'small'}
            >
              <CardData
                onClick={navCountries}
                no={noCountries}
                title="Country Profiles"
                margin={isMaxSize(size, 'small') ? 'xsmall' : 'small'}
              />
              <CardData
                onClick={navRights}
                no={noRights}
                title="Rights"
                margin={isMaxSize(size, 'small') ? 'xsmall' : 'small'}
              />
              <CardData
                onClick={navGroups}
                no={noGroups}
                title="Risk Groups"
                margin={isMaxSize(size, 'small') ? 'xsmall' : 'small'}
              />
            </Slider>
          </ContentMaxWidth>
        </SectionContainer>
      )}
    </ResponsiveContext.Consumer>
  );
}

SectionData.propTypes = {
  noCountries: PropTypes.number,
  noRights: PropTypes.number,
  noGroups: PropTypes.number,
  navCountries: PropTypes.func,
  navRights: PropTypes.func,
  navGroups: PropTypes.func,
};

export default SectionData;
