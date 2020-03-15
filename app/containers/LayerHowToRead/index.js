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

import {
  isMaxSize,
  getWindowDimensions,
  getFloatingAsideWidth,
} from 'utils/responsive';

import HTROverviewDimensions from './HTROverviewDimensions';
import HTROverviewRights from './HTROverviewRights';
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

function LayerHowToRead({ layer, theme, onClose }) {
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
  const { contxt, type, dimension, charts } = layer;
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Layer
          onEsc={() => onClose()}
          onClickOutside={() => onClose()}
          modal={isMaxSize(size, 'medium')}
          position="right"
          full="vertical"
        >
          <Box
            elevation="large"
            width={
              isMaxSize(size, 'medium')
                ? '100%'
                : `${getFloatingAsideWidth(size, theme, windowDimensions)}px`
            }
            direction="column"
            flex={{ shrink: 0 }}
            pad={isMaxSize(size, 'medium') ? 'small' : 'medium'}
            fill="vertical"
            overflow="auto"
            style={{ position: 'relative' }}
            responsive={false}
          >
            <Heading level={2}>
              <FormattedMessage {...messages.label} />
            </Heading>
            <ButtonWrap>
              <ButtonIcon onClick={() => onClose()} subtle>
                <CloseIcon size="xlarge" color="dark" />
              </ButtonIcon>
            </ButtonWrap>
            {charts &&
              charts.map(chart => (
                <div key={chart}>
                  {chart === 'Diamonds' && type === 'd' && (
                    <HTROverviewDimensions />
                  )}
                  {chart === 'Diamonds' && type === 'r' && (
                    <HTROverviewRights />
                  )}
                  {chart === 'Bullet' && (
                    <HTRBulletCPR contxt={contxt} dimension={dimension} />
                  )}
                  {chart === 'Bar' && <HTRBarESR contxt={contxt} />}
                  {chart === 'Trend' && type === 'esr' && <HTRTrendESR />}
                  {chart === 'Trend' && type === 'cpr' && <HTRTrendCPR />}
                </div>
              ))}
          </Box>
        </Layer>
      )}
    </ResponsiveContext.Consumer>
  );
}

LayerHowToRead.propTypes = {
  layer: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onClose: PropTypes.func,
  theme: PropTypes.object,
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

export default compose(withConnect)(withTheme(LayerHowToRead));
