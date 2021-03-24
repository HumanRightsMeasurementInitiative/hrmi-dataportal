import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from 'grommet';
import { Close } from 'grommet-icons';
import styled from 'styled-components';

const ContentWrap = styled.span`
  width: 100%;
`;

function Content({ maxWidth, component, text, onClose, inModal, inverse }) {
  return (
    <Box
      pad={{ vertical: 'small', horizontal: 'small' }}
      background={inverse ? 'white' : 'darker'}
      style={{ maxWidth }}
      onClick={evt => {
        if (evt) evt.preventDefault();
        if (evt) evt.stopPropagation();
      }}
      align={inModal ? 'center' : 'start'}
    >
      {onClose && (
        <Button
          onClick={evt => {
            if (evt) evt.preventDefault();
            if (evt) evt.stopPropagation();
            onClose();
          }}
          margin={{ left: 'auto' }}
        >
          <Close color="white" size="large" />
        </Button>
      )}
      <ContentWrap>
        {component}
        {!component && <span style={{ whiteSpace: 'pre-line' }}>{text}</span>}
      </ContentWrap>
    </Box>
  );
}

Content.propTypes = {
  maxWidth: PropTypes.string,
  component: PropTypes.node,
  text: PropTypes.string,
  onClose: PropTypes.func,
  inModal: PropTypes.bool,
  inverse: PropTypes.bool,
};

export default Content;
