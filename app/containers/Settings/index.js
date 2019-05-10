/**
 *
 * Settings
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import { Box, Text } from 'grommet';

import {
  getRouterPath,
  getScaleSearch,
  getStandardSearch,
  getBenchmarkSearch,
} from 'containers/App/selectors';
// import messages from './messages';

const Styled = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
`;

export function Settings({ path, scale, standard, benchmark }) {
  if (path === 'page') return null;
  return (
    <Styled>
      <Box
        elevation="medium"
        direction="column"
        background="white"
        height="100px"
        width="full"
      >
        <div>
          <Text>Scale: {scale}</Text>
        </div>
        <div>
          <Text>Standard: {standard}</Text>
        </div>
        <div>
          <Text>Benchmark: {benchmark}</Text>
        </div>
      </Box>
    </Styled>
  );
}

Settings.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  scale: PropTypes.string,
  standard: PropTypes.string,
  benchmark: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  path: state => getRouterPath(state),
  scale: state => getScaleSearch(state),
  standard: state => getStandardSearch(state),
  benchmark: state => getBenchmarkSearch(state),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Settings);
