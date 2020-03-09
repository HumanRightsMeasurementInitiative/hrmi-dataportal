import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Button, TextInput } from 'grommet';
import { Close, Search, FormClose } from 'grommet-icons';
import { isMinSize } from 'utils/responsive';

import ButtonIcon from 'styled/ButtonIcon';
const StyledButtonIcon = styled(ButtonIcon)`
  background: transparent;
  &:hover {
    background: transparent;
  }
  &:active {
    background: transparent;
  }
  &:focus {
    background: transparent;
  }
`;
const Top = styled.div`
  background-color: ${({ theme, subject }) =>
    theme.global.colors[subject || 'dark']};
  width: 100%;
  height: ${({ theme }) => theme.navTop};
`;

const StyledTextInput = styled(TextInput)`
  &::placeholder {
    color: ${({ subject, theme }) => theme.global.colors[subject]};
  }
`;

class NavTop extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    if (this.textInput && this.textInput.current)
      this.textInput.current.focus();
  }

  render() {
    const {
      search,
      onClose,
      onSearch,
      placeholder = 'search',
      size,
      subject,
    } = this.props;
    return (
      <Top subject={subject}>
        <Box
          pad={{
            left: size === 'small' ? 'small' : 'medium',
            vertical: 'small',
            right: size === 'small' ? 'none' : 'xsmall',
          }}
          direction="row"
          fill="vertical"
          align="center"
          responsive={false}
        >
          <Box
            background="white"
            direction="row"
            align="center"
            round="xlarge"
            height="32px"
            pad={{ horizontal: 'ms', vertical: 'xsmall' }}
            fill="horizontal"
          >
            <StyledTextInput
              plain
              value={search}
              onChange={evt => evt && evt.target && onSearch(evt.target.value)}
              placeholder={placeholder}
              ref={isMinSize(size, 'medium') && this.textInput}
              subject={subject}
            />
            {search && search.length > 0 && (
              <Button onClick={() => onSearch('')} pad="xsmall">
                <FormClose />
              </Button>
            )}
            {(!search || search.length === 0) && <Search stretch />}
          </Box>
          <Box pad={{ vertical: 'xsmall' }} flex={{ shrink: 0 }}>
            <StyledButtonIcon onClick={() => onClose()}>
              <Close color="white" size="large" />
            </StyledButtonIcon>
          </Box>
        </Box>
      </Top>
    );
  }
}

NavTop.propTypes = {
  onClose: PropTypes.func,
  onSearch: PropTypes.func,
  search: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.string,
  subject: PropTypes.string,
};

export default NavTop;
