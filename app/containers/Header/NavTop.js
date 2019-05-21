import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Button, TextInput } from 'grommet';
import { Close, Search, FormClose } from 'grommet-icons';

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
    this.textInput.current.focus();
  }

  render() {
    const { search, onClose, onSearch, placeholder = 'search' } = this.props;
    return (
      <Top>
        <Box pad="small" direction="row">
          <Box
            background="dark-1"
            width="large"
            direction="row"
            align="center"
            pad={{ horizontal: 'small', vertical: 'xsmall' }}
            round="small"
            border={{ side: 'all' }}
            margin={{ right: 'small' }}
          >
            <TextInput
              plain
              value={search}
              onChange={evt => evt && evt.target && onSearch(evt.target.value)}
              placeholder={placeholder}
              pad="xsmall"
              ref={this.textInput}
            />
            {search && search.length > 0 && (
              <Button onClick={() => onSearch('')} pad="xsmall">
                <FormClose />
              </Button>
            )}
            {(!search || search.length === 0) && <Search />}
          </Box>
          <Box pad={{ horizontal: 'medium', vertical: 'xsmall' }}>
            <Button onClick={() => onClose()}>
              <Close color="white" size="large" />
            </Button>
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
};

export default NavTop;
