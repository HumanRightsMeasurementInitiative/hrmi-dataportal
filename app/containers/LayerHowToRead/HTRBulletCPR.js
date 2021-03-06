import React from 'react';
import PropTypes from 'prop-types';
import {
  injectIntl,
  intlShape,
  FormattedMessage,
  FormattedHTMLMessage,
} from 'react-intl';
import styled from 'styled-components';
import { Heading, Box } from 'grommet';
import BarBullet from 'components/ChartBars/BarBullet';
import AnnotateBetterWorse from 'components/AnnotateBetterWorse';

import HTRParagraph from './HTRParagraph';
import messages from './messages';

const Styled = styled.div``;

function HTRBulletCPR({ contxt, dimension, intl }) {
  return (
    <Styled>
      <HTRParagraph>
        <FormattedMessage {...messages.bullet.intro} />
      </HTRParagraph>
      <Heading responsive={false} level={4}>
        <FormattedMessage {...messages.bullet.rangeTitle} />
      </Heading>
      <Box
        pad={{ horizontal: 'small', top: 'xsmall', bottom: 'medium' }}
        responsive={false}
      >
        <Box
          flex
          style={{ position: 'relative' }}
          margin={{ bottom: 'medium' }}
          responsive={false}
        >
          <BarBullet
            scoreAbove
            showLabels
            annotate
            hoverEnabled={false}
            data={{
              color: dimension,
              value: 5,
              maxValue: 10,
              unit: '',
              band: {
                lo: 2.5,
                hi: 7.5,
              },
              labels: {
                value: intl.formatMessage(messages.bullet.scoreAverage),
                lo: intl.formatMessage(messages.bullet.score10),
                hi: intl.formatMessage(messages.bullet.score90),
              },
            }}
          />
          <AnnotateBetterWorse absolute />
        </Box>
      </Box>
      <HTRParagraph above>
        <FormattedHTMLMessage {...messages.bullet.longBars} />
      </HTRParagraph>
      <Box
        pad={{ horizontal: 'small', top: 'xsmall', bottom: 'small' }}
        responsive={false}
      >
        <BarBullet
          showLabels
          hoverEnabled={false}
          data={{
            color: dimension,
            value: 7,
            maxValue: 10,
            unit: '',
            band: {
              lo: 5,
              hi: 9,
            },
          }}
        />
      </Box>
      <HTRParagraph above>
        <FormattedHTMLMessage {...messages.bullet.shortBars} />
      </HTRParagraph>
      <Box
        pad={{ horizontal: 'small', top: 'xsmall', bottom: 'small' }}
        responsive={false}
      >
        <BarBullet
          showLabels
          hoverEnabled={false}
          data={{
            color: dimension,
            value: 7,
            maxValue: 10,
            unit: '',
            band: {
              lo: 6,
              hi: 8,
            },
          }}
        />
      </Box>
      {contxt === 'metrics' && (
        <>
          <HTRParagraph above>
            <FormattedHTMLMessage {...messages.bullet.countryComparison} />
          </HTRParagraph>
          <Box
            pad={{ horizontal: 'small', top: 'small', bottom: 'xsmall' }}
            responsive={false}
          >
            <BarBullet
              showLabels
              hoverEnabled={false}
              data={{
                color: dimension,
                value: 8,
                maxValue: 10,
                unit: '',
                band: {
                  lo: 6.5,
                  hi: 9.5,
                },
              }}
            />
          </Box>
          <Box
            pad={{ horizontal: 'small', top: 'none', bottom: 'small' }}
            responsive={false}
          >
            <BarBullet
              showLabels
              hoverEnabled={false}
              data={{
                color: dimension,
                value: 5.5,
                maxValue: 10,
                unit: '',
                band: {
                  lo: 4,
                  hi: 7,
                },
              }}
            />
          </Box>
        </>
      )}
    </Styled>
  );
}

HTRBulletCPR.propTypes = {
  contxt: PropTypes.string,
  dimension: PropTypes.string,
  intl: intlShape.isRequired,
};

export default injectIntl(HTRBulletCPR);
