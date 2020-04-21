import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import styled, { withTheme } from 'styled-components';
import ContentMaxWidth from 'styled/ContentMaxWidth';
import ContentContainer from 'styled/ContentContainer';
import { Box, Text, ResponsiveContext } from 'grommet';

import { getFloatingAsideWidth, getWindowDimensions } from 'utils/responsive';

import rootMessages from 'messages';
import messages from './messages';

const Styled = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: ${({ rightPosition }) => rightPosition}px;
  background: white;
  z-index: 14;
  box-shadow: 0px -10px 5px -5px rgba(255, 255, 255, 1);
`;

function HINote({ intl, hasAside, theme }) {
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
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Styled
          rightPosition={
            hasAside ? getFloatingAsideWidth(size, theme, windowDimensions) : 0
          }
        >
          <ContentContainer direction="column">
            <ContentMaxWidth>
              <Box
                pad={{ bottom: 'xsmall', top: 'xsmall' }}
                align="end"
                fill="horizontal"
              >
                <Text size="xxsmall" color="dark" textAlign="end">
                  <FormattedMessage
                    {...messages.hiNote}
                    values={{
                      hiLabel: intl.formatMessage(
                        rootMessages.labels.hiCountry,
                      ),
                    }}
                  />
                </Text>
              </Box>
            </ContentMaxWidth>
          </ContentContainer>
        </Styled>
      )}
    </ResponsiveContext.Consumer>
  );
}

HINote.propTypes = {
  intl: intlShape.isRequired,
  hasAside: PropTypes.bool,
  theme: PropTypes.object,
};

export default injectIntl(withTheme(HINote));
