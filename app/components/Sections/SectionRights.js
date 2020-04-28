/**
 *
 * Overview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Paragraph } from 'grommet';

// styles
import SectionContainer from 'styled/SectionContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';

import rootMessages from 'messages';
import messages from './messages';

import SectionTitle from './SectionTitle';
import Slider from './Slider';
import Card from './Card';
import AllLinkButton from './AllLinkButton';

export function SectionRights({
  rights,
  onSelectRight,
  navAllRights,
  intl,
  title,
  allLink,
  background,
  description,
  allCats,
}) {
  return (
    <SectionContainer background={background}>
      <ContentMaxWidth column>
        <SectionTitle
          title={title || intl.formatMessage(messages.metrics.title)}
        />
        <AllLinkButton
          onClick={() => navAllRights()}
          label={allLink || intl.formatMessage(rootMessages.labels.allMetrics)}
        />
        <Slider cardMargin="xsmall">
          {rights.map(r => (
            <Card
              key={r.key}
              margin="xsmall"
              onCardClick={() => {
                onSelectRight(r.key);
              }}
              imageSrc={r.icon}
              label={`${intl.formatMessage(rootMessages.rights[r.key])}`}
              superLabel={
                allCats &&
                intl.formatMessage(rootMessages.dimensions[r.dimension])
              }
              imageWhitespace
              activeColor={`${r.dimension}Dark`}
              minHeight={allCats}
              type="icon"
            />
          ))}
        </Slider>
        {description && <Paragraph>{description}</Paragraph>}
      </ContentMaxWidth>
    </SectionContainer>
  );
}

SectionRights.propTypes = {
  title: PropTypes.string,
  allLink: PropTypes.string,
  rights: PropTypes.array,
  onSelectRight: PropTypes.func,
  navAllRights: PropTypes.func,
  background: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  allCats: PropTypes.bool,
  intl: intlShape.isRequired,
};

export default injectIntl(SectionRights);
