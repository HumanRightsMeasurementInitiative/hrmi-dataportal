/**
 *
 * Overview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

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
    <SectionContainer border background="light-4">
      <ContentMaxWidth maxWidth="1024px" column>
        Our data
        <Slider stretch>
          <CardData
            onClick={navCountries}
            no={noCountries}
            title="Country Profiles"
          />
          <CardData onClick={navRights} no={noRights} title="Rights" />
          <CardData onClick={navGroups} no={noGroups} title="Risk Groups" />
        </Slider>
      </ContentMaxWidth>
    </SectionContainer>
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
