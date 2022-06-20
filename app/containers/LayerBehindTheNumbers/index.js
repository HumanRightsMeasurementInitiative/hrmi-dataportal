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
import BehindTheNumbersQolTC from '../../components/BehindTheNumbersQolTC';
import BehindTheNumbersSfsTC from '../../components/BehindTheNumbersSfsTC';
import BehindTheNumbersEmpTC from '../../components/BehindTheNumbersEmpTC';

export function LayerBehindTheNumbers({ layer }) {
  return (
    <Box
      direction="column"
      pad={{ left: 'medium', bottom: 'medium', top: 'small' }}
    >
      {layer.key === 'esr' && (
        <>
          <BehindTheNumbersQol />
          <br />
          <BehindTheNumbersQolTC />
        </>
      )}
      {layer.key === 'physint' && (
        <>
          <BehindTheNumbersSfs />
          <br />
          <BehindTheNumbersSfsTC />
        </>
      )}
      {layer.key === 'empowerment' && (
        <>
          <BehindTheNumbersEmp />
          <br />
          <BehindTheNumbersEmpTC />
        </>
      )}

      {layer.key === 'all' && (
        <>
          <BehindTheNumbersQol />
          <br />
          <BehindTheNumbersSfs />
          <br />
          <BehindTheNumbersEmp />
          <br />
          <br />
          <BehindTheNumbersQolTC />
          <br />
          <BehindTheNumbersSfsTC />
          <br />
          <BehindTheNumbersEmpTC />
        </>
      )}
    </Box>
  );
}

LayerBehindTheNumbers.propTypes = {
  layer: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default withTheme(LayerBehindTheNumbers);
