/**
 *
 * Overview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

// styles
import SectionContainer from 'styled/SectionContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';

import ButtonText from 'styled/ButtonText';

import rootMessages from 'messages';

import Slider from './Slider';
import Card from './Card';

export function SectionRights({ rights, onSelectRight, navAllRights, intl }) {
  return (
    <SectionContainer border>
      <ContentMaxWidth maxWidth="medium" column>
        Section Rights Carousel
        <ButtonText onClick={() => navAllRights()}>Rights overview</ButtonText>
        <Slider cardMargin="xsmall">
          {rights.map(r => (
            <Card
              key={r.key}
              margin="xsmall"
              onCardClick={() => {
                onSelectRight(r.key);
              }}
            >
              {`${intl.formatMessage(rootMessages.rights[r.key])} (${
                r.dimension
              })`}
            </Card>
          ))}
        </Slider>
      </ContentMaxWidth>
    </SectionContainer>
  );
}

SectionRights.propTypes = {
  rights: PropTypes.array,
  onSelectRight: PropTypes.func,
  navAllRights: PropTypes.func,
  intl: intlShape.isRequired,
};

export default injectIntl(SectionRights);
