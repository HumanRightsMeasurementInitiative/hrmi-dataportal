/**
 *
 * LayerSettings
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { Box } from 'grommet';
import BehindTheNumbersQol from '../../components/BehindTheNumbersQol';
import BehindTheNumbersSfs from '../../components/BehindTheNumbersSfs';
import BehindTheNumbersEmp from '../../components/BehindTheNumbersEmp';

export function LayerBehindTheNumbers({ layer }) {
  return (
    <Box
      direction="column"
      pad={{ left: 'medium', bottom: 'medium', top: 'small' }}
    >
      {layer.key === 'esr' && <BehindTheNumbersQol />}
      {layer.key === 'physint' && <BehindTheNumbersSfs />}
      {layer.key === 'empowerment' && <BehindTheNumbersEmp />}
    </Box>
  );
}

LayerBehindTheNumbers.propTypes = {
  layer: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default withTheme(LayerBehindTheNumbers);
