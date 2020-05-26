import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Button } from 'grommet';
import { Close, Search } from 'grommet-icons';
import { isMinSize, isMaxSize } from 'utils/responsive';

import ButtonIcon from 'styled/ButtonIcon';

import TextInput from './TextInput';

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
  background-color: ${({ theme }) => theme.global.colors.dark};
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
            left: isMaxSize(size, 'sm') ? 'small' : 'medium',
            vertical: 'small',
            right: isMaxSize(size, 'sm') ? 'small' : 'medium',
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
            height={isMaxSize(size, 'sm') ? '26px' : '32px'}
            pad={{ horizontal: 'ms', vertical: 'xsmall' }}
            fill="horizontal"
          >
            <TextInput
              plain
              value={search}
              onChange={evt => evt && evt.target && onSearch(evt.target.value)}
              placeholder={placeholder}
              ref={isMinSize(size, 'medium') && this.textInput}
            />
            {search && search.length > 0 && (
              <Button
                onClick={() => onSearch('')}
                icon={
                  <Close
                    color="dark"
                    size={isMaxSize(size, 'sm') ? 'small' : 'medium'}
                  />
                }
                style={{ padding: '0' }}
              />
            )}
            {(!search || search.length === 0) && <Search color="dark" />}
          </Box>
          {isMaxSize(size, 'sm') && (
            <Box
              pad={{ vertical: 'xsmall' }}
              flex={{ shrink: 0 }}
              margin={{ left: 'small' }}
            >
              <StyledButtonIcon onClick={() => onClose()}>
                <Close color="white" size="large" />
              </StyledButtonIcon>
            </Box>
          )}
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
