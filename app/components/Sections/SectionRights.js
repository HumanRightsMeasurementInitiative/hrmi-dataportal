/**
 *
 * Overview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Paragraph, Box, ResponsiveContext } from 'grommet';

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
  minHeight,
  stretchAllLink = true,
  marginTop,
}) {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <SectionContainer background={background}>
          <ContentMaxWidth column>
            <Box
              direction="row"
              align="center"
              margin={{ top: 'small' }}
              justify={stretchAllLink ? 'between' : 'stretch'}
              gap={stretchAllLink ? 'none' : 'large'}
            >
              <SectionTitle
                title={title || intl.formatMessage(messages.metrics.title)}
                marginTop={marginTop}
              />
              {size !== 'small' && (
                <AllLinkButton
                  margin={{ top: 'xsmall' }}
                  onClick={() => navAllRights()}
                  label={
                    allLink ||
                    intl.formatMessage(rootMessages.labels.allMetrics)
                  }
                />
              )}
            </Box>
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
                  minHeight={allCats || minHeight}
                  type="icon"
                />
              ))}
            </Slider>
            {description && (
              <Paragraph margin={{ top: 'ms' }}>{description}</Paragraph>
            )}
            {size === 'small' && (
              <Box margin={{ top: 'medium' }}>
                <AllLinkButton
                  margin={{ top: 'xsmall' }}
                  onClick={() => navAllRights()}
                  label={
                    allLink ||
                    intl.formatMessage(rootMessages.labels.allMetrics)
                  }
                />
              </Box>
            )}
          </ContentMaxWidth>
        </SectionContainer>
      )}
    </ResponsiveContext.Consumer>
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
  minHeight: PropTypes.bool,
  stretchAllLink: PropTypes.bool,
  marginTop: PropTypes.bool,
  intl: intlShape.isRequired,
};

export default injectIntl(SectionRights);
