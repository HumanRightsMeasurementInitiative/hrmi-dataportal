import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import ButtonHowToRead from 'styled/ButtonHowToRead';
import { Layer } from 'grommet';
import messages from './messages';

function HowToRead({ type, context }) {
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
          <div>Type: {type}</div>
          <div>Context: {context}</div>
        </Layer>
      )}
    </>
  );
}

HowToRead.propTypes = {
  type: PropTypes.string,
  context: PropTypes.string,
};

export default HowToRead;
