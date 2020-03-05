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
}) {
  return (
    <SectionContainer>
      <ContentMaxWidth maxWidth="medium" column>
        <SectionTitle
          title={title || intl.formatMessage(messages.metrics.title)}
        />
        <AllLinkButton
          onClick={() => navAllRights()}
          label={allLink || intl.formatMessage(messages.metrics.allLink)}
        />
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
  title: PropTypes.string,
  allLink: PropTypes.string,
  rights: PropTypes.array,
  onSelectRight: PropTypes.func,
  navAllRights: PropTypes.func,
  intl: intlShape.isRequired,
};

export default injectIntl(SectionRights);
