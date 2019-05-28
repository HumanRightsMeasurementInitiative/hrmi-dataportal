import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import ButtonHowToRead from 'styled/ButtonHowToRead';
import { Layer, Box } from 'grommet';
import messages from './messages';

function HowToRead({ chart, context, data }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ButtonHowToRead onClick={() => setOpen(true)}>
        <FormattedMessage {...messages.label} />
      </ButtonHowToRead>
      {open && (
        <Layer
          onEsc={() => setOpen(false)}
          onClickOutside={() => setOpen(false)}
        >
          <Box pad="medium">
            <div>Context: {context}</div>
            <div>Chart: {chart}</div>
            <div>Data: {data}</div>
          </Box>
        </Layer>
      )}
    </>
  );
}

HowToRead.propTypes = {
  chart: PropTypes.string,
  context: PropTypes.string,
  data: PropTypes.string,
};

export default HowToRead;
