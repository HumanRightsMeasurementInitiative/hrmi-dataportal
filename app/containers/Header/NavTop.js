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
// prettier-ignore
const Top = styled.div`
  background-color: ${({ theme }) => theme.global.colors['dark-2']};
  width: 100%;
  height: ${({ theme }) => theme.navTop};
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
    } = this.props;
    return (
      <Top>
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
            background="dark-1"
            width="large"
            direction="row"
            align="center"
            pad={{ horizontal: 'small', vertical: 'xsmall' }}
            round="small"
            margin={{ right: 'small' }}
          >
            <TextInput
              plain
              value={search}
              onChange={evt => evt && evt.target && onSearch(evt.target.value)}
              placeholder={placeholder}
              pad="xsmall"
              ref={isMinSize(size, 'medium') && this.textInput}
            />
            {search && search.length > 0 && (
              <Button onClick={() => onSearch('')} pad="xsmall">
                <FormClose />
              </Button>
            )}
            {(!search || search.length === 0) && <Search />}
          </Box>
          <Box
            pad={{ left: 'medium', vertical: 'xsmall' }}
            flex={{ shrink: 0 }}
          >
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
};

export default NavTop;
