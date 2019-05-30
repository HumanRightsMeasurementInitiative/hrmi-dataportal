import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled, { withTheme } from 'styled-components';
import { Layer, Box, ResponsiveContext, Heading } from 'grommet';
import { Close as CloseIcon } from 'grommet-icons';

import { getHowToRead } from 'containers/App/selectors';
import { openHowToRead } from 'containers/App/actions';
import ButtonIcon from 'styled/ButtonIcon';

import HTROverviewDimensions from './HTROverviewDimensions';
import HTROverviewRights from './HTROverviewRights';
import HTRSummaryDimensions from './HTRSummaryDimensions';
import HTRSummaryRights from './HTRSummaryRights';
import HTRBulletCPR from './HTRBulletCPR';
import HTRBarESR from './HTRBarESR';
import HTRTrendESR from './HTRTrendESR';
import HTRTrendCPR from './HTRTrendCPR';
import messages from './messages';

const ButtonWrap = styled.div`
  position: absolute;
  top: 1em;
  right: 1em;
`;

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

const getWidth = (size, theme, { width }) => {
  const asideWidth = size === 'medium' ? 280 : 360;
  const maxWidth = parseInt(theme.maxWidth, 10);
  const padding = parseInt(theme.global.edgeSize.large, 10);
  return asideWidth + padding + Math.max(0, (width - maxWidth) / 2);
};

function HowToReadLayer({ layer, theme, onClose }) {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!layer) return null;

  const { contxt, chart, data } = layer;
  return (
    <Layer
      onEsc={() => onClose()}
      onClickOutside={() => onClose()}
      modal={false}
      position="right"
      full="vertical"
    >
      <ResponsiveContext.Consumer>
        {size => (
          <Box
            elevation="large"
            width={`${getWidth(size, theme, windowDimensions)}px`}
            direction="column"
            flex={{ shrink: 0 }}
            pad="medium"
            fill="vertical"
            overflow="auto"
            style={{ position: 'relative' }}
          >
            <Heading level={4}>
              <FormattedMessage {...messages.label} />
            </Heading>
            <ButtonWrap>
              <ButtonIcon onClick={() => onClose()}>
                <CloseIcon size="xlarge" color="white" />
              </ButtonIcon>
            </ButtonWrap>
            {chart === 'Diamonds' && data === 'd' && <HTROverviewDimensions />}
            {chart === 'Diamonds' && data === 'r' && <HTROverviewRights />}
            {chart === 'Summary' && data === 'd' && <HTRSummaryDimensions />}
            {chart === 'Summary' && data === 'r' && <HTRSummaryRights />}
            {chart === 'Bullet' && contxt === 'narrative' && (
              <HTRBulletCPR contxt={contxt} dimension={data} />
            )}
            {chart === 'Bullet' && (
              <HTRBulletCPR contxt={contxt} dimension={data} />
            )}
            {chart === 'Bar' && <HTRBarESR contxt={contxt} />}
            {chart === 'Trend' && data === 'esr' && <HTRTrendESR />}
            {chart === 'Trend' && data === 'cpr' && <HTRTrendCPR />}
          </Box>
        )}
      </ResponsiveContext.Consumer>
    </Layer>
  );
}

HowToReadLayer.propTypes = {
  layer: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  theme: PropTypes.object,
  onClose: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  layer: state => getHowToRead(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onClose: () => dispatch(openHowToRead(false)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(withTheme(HowToReadLayer));
