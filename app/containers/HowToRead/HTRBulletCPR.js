import React from 'react';
import PropTypes from 'prop-types';
import {
  injectIntl,
  intlShape,
  FormattedMessage,
  FormattedHTMLMessage,
} from 'react-intl';
import styled from 'styled-components';
import { Paragraph, Heading, Box } from 'grommet';
import BarBullet from 'components/Bars/BarBullet';
import AnnotateBetterWorse from 'components/AnnotateBetterWorse';
import Hint from 'styled/Hint';

import messages from './messages';

const Styled = styled.div``;

function HTRBulletCPR({ contxt, dimension, intl }) {
  const level = contxt === 'narrative' ? 1 : 2;
  return (
    <Styled>
      <Paragraph>
        <FormattedMessage {...messages.bullet.intro} />
      </Paragraph>
      {contxt === 'narrative' && (
        <Paragraph>
          <Hint italic>
            <FormattedMessage {...messages.bullet.drilldownHint} />
          </Hint>
        </Paragraph>
      )}
      <Heading responsive={false} level={4}>
        <FormattedMessage {...messages.bullet.rangeTitle} />
      </Heading>
      <Box pad={{ horizontal: 'small', top: 'small', bottom: 'medium' }}>
        <Box flex style={{ position: 'relative' }}>
          <BarBullet
            level={level}
            showLabels
            annotate
            hoverEnabled={false}
            data={{
              color: dimension,
              value: 5,
              maxValue: 10,
              unit: '',
              band: {
                lo: 3.5,
                hi: 6.5,
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
      <Paragraph>
        <FormattedHTMLMessage {...messages.bullet.scores} />
      </Paragraph>
      <Box pad={{ horizontal: 'small', top: 'small', bottom: 'small' }}>
        <BarBullet
          level={level}
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
      <Paragraph>
        <FormattedHTMLMessage {...messages.bullet.longBars} />
      </Paragraph>
      <Box pad={{ horizontal: 'small', top: 'small', bottom: 'small' }}>
        <BarBullet
          level={level}
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
      <Paragraph>
        <FormattedHTMLMessage {...messages.bullet.shortBars} />
      </Paragraph>
      {contxt !== 'narrative' && (
        <>
          <Box pad={{ horizontal: 'small', top: 'small', bottom: 'xsmall' }}>
            <BarBullet
              level={level}
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
          <Box pad={{ horizontal: 'small', top: 'none', bottom: 'small' }}>
            <BarBullet
              level={level}
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
          <Paragraph>
            <FormattedHTMLMessage {...messages.bullet.countryComparison} />
          </Paragraph>
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
