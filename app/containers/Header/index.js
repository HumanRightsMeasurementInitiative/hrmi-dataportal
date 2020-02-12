/**
 *
 * Header
 *
 */

import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Box, Button, Drop, ResponsiveContext, TextInput } from 'grommet';
import {
  Menu,
  Close,
  FormClose,
  Search,
  FormDown,
  FormUp,
} from 'grommet-icons';

import { getRouterMatch } from 'containers/App/selectors';

import ContentContainer from 'styled/ContentContainer';
import ButtonNavPrimary from 'styled/ButtonNavPrimary';
import { isMinSize, isMaxSize } from 'utils/responsive';

import Icon from 'components/Icon';

import LocaleToggle from 'containers/LocaleToggle';
import { appLocales } from 'i18n';
import { PAGES } from 'containers/App/constants';
import { navigate, loadDataIfNeeded, trackEvent } from 'containers/App/actions';

// import { isMinSize, isMaxSize } from 'utils/responsive';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/App/saga';

import rootMessages from 'messages';
import messages from './messages';

import NavCountry from './NavCountry';
import NavMetric from './NavMetric';
import SearchResults from './SearchResults';

const Styled = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  width: 100%;
  height: ${({ theme }) => theme.sizes.header.height}px;
  color: ${props => props.theme.global.colors.white};
`;

const StyledTextInput = styled(TextInput)`
  &::placeholder {
    color: black;
  }
`;

const NavBarTop = props => (
  <ContentContainer
    direction="row"
    align="center"
    background="dark-1"
    height="44px"
    width="full"
    fill="horizontal"
    pad={{ horizontal: 'small', vertical: 'none' }}
    {...props}
  />
);
const NavBarBottom = props => (
  <Box
    elevation="large"
    direction="row"
    align="center"
    background="dark"
    height="56px"
    width="full"
    fill="horizontal"
    {...props}
  />
);

const BrandButton = styled(Button)`
  height: 44px;
  padding: 1px 5px;
  width: 100px;
  margin-right: -10px;
  color: ${props => props.theme.global.colors.white};
  &:hover {
    color: ${props => props.theme.global.colors['light-3']};
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    width: 120px;
    margin-right: -5px;
  }
`;
const TitleButton = styled(Button)`
  height: 44px;
  padding: 1px 5px;
  margin-right: 10px;
  color: ${props => props.theme.global.colors.white};
  &:hover {
    color: ${props => props.theme.global.colors['light-3']};
  }
`;

// prettier-ignore
const MenuList = styled.div`
  display: ${props => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  z-index: 99999;
  background: ${props => props.theme.global.colors['dark-2']};
  padding: ${({ theme }) => theme.global.edgeSize.medium} 0;
  overflow: auto;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    padding: 0;
    position: relative;
    z-index: 300;
    top: auto;
    left: auto;
    right: auto;
    bottom: auto;
    width: auto;
    height: 44px;
    background: transparent;
    display: table;
    margin: 0 0 0 auto;
  }
`;

const MenuGroup = styled.div`
  vertical-align: top;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    display: table-cell;
    height: 44px;
  }
`;
// prettier-ignore
const ToggleMenu = styled(Button)`
  display: block;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 300;
  width: 44px;
  height: 44px;
  background-color: transparent;
  text-align: center;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    display: none;
  }
`;

// prettier-ignore
const ButtonNavSecondary = styled(Button)`
  height: 56px;
  padding: 5px 10px;
  min-width: 160px;
  width: 50%;
  background-color: ${({ active, theme }) =>
    active ? theme.global.colors['dark-2'] : 'transparent'};
  border-right: ${({ last }) => last ? 2 : 1}px solid;
  border-left: ${({ first }) => first ? 0 : 1}px solid;
  border-color: ${({ theme }) => theme.global.colors['dark-2']};
  &:hover {
    background-color: ${({ active, theme }) =>
    theme.global.colors[active ? 'dark-2' : 'dark-3']};
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding: 5px 10px 5px 12px;
    width: auto;
  }
`;
// prettier-ignore
// const PrimaryDropButton = styled(Button)`
//   padding: 10px 24px;
//   background-color: ${({ theme, active }) => active ? theme.global.colors['dark-3'] : 'transparent' };
//   border-top: 1px solid;
//   border-bottom: 1px solid;
//   border-color: ${({ theme }) => theme.global.colors['light-4']};
//   background-color: ${({ theme, active }) => active ? theme.global.colors['light-3'] : 'transparent' };
//   display: block;
//   width: 100%;
//   text-align: center;
//   @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
//     display: inline-block;
//     height: 44px;
//     padding: 5px 10px;
//     border: none;
//     width: auto;
//   }
//   &:hover {
//     background-color: ${({ theme}) => theme.global.colors['dark-3']};
//   }
//   &:active {
//     background-color: ${({ theme }) => theme.global.colors['dark-3']};
//   }
//   &:visited {
//     background-color: ${({ theme }) => theme.global.colors['dark-3']};
//   }
//   &:focus {
//     background-color: ${({ theme }) => theme.global.colors['dark-3']};
//   }
// `;

const DEPENDENCIES = ['countries'];

export function Header({ nav, intl, onLoadData, match, searched }) {
  useInjectSaga({ key: 'app', saga });

  useEffect(() => {
    // kick off loading of page content
    onLoadData();
  }, []);

  const [showMenu, setShowMenu] = useState(false);
  const [showCountries, setShowCountries] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);
  const [search, setSearch] = useState('');
  const countryTarget = useRef(null);
  const metricTarget = useRef(null);
  const searchRef = useRef(null);

  const onHome = () => {
    setShowMenu(false);
    nav({ pathname: '', search: '' });
  };

  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Styled role="banner">
          <NavBarTop>
            <BrandButton plain onClick={onHome}>
              <Icon name="BRAND" />
            </BrandButton>
            <TitleButton plain onClick={onHome}>
              <FormattedMessage {...messages.appTitle} />
            </TitleButton>
            {appLocales.length > 1 && isMaxSize(size, 'medium') && (
              <Box margin={{ left: 'auto', right: 'large' }}>
                <LocaleToggle />
              </Box>
            )}
            <ToggleMenu plain onClick={() => setShowMenu(!showMenu)}>
              {!showMenu && <Menu />}
              {showMenu && <Close />}
            </ToggleMenu>
            <MenuList visible={showMenu}>
              {appLocales.length > 1 && isMinSize(size, 'large') && (
                <MenuGroup>
                  <LocaleToggle />
                </MenuGroup>
              )}
              <MenuGroup>
                {PAGES &&
                  PAGES.filter(page => page.primary).map(page => (
                    <ButtonNavPrimary
                      key={page.key}
                      active={page.key === match}
                      disabled={page.key === match}
                      onClick={() => {
                        setShowMenu(false);
                        nav(`page/${page.key}`);
                      }}
                    >
                      <FormattedMessage {...rootMessages.page[page.key]} />
                    </ButtonNavPrimary>
                  ))}
              </MenuGroup>
            </MenuList>
          </NavBarTop>
          <NavBarBottom>
            <ButtonNavSecondary
              plain
              first
              active={showCountries}
              onClick={() => {
                setShowMetrics(false);
                setShowCountries(!showCountries);
              }}
              icon={<Icon name="COUNTRY" style={{ minWidth: '24px' }} />}
              label={
                <Box
                  direction="row"
                  align="center"
                  justify="between"
                  fill="horizontal"
                >
                  <span>{intl.formatMessage(messages.countries)}</span>
                  {showCountries && <FormUp size="large" />}
                  {!showCountries && <FormDown size="large" />}
                </Box>
              }
              ref={countryTarget}
            />
            {showCountries && size === 'small' && (
              <NavCountry onClose={() => setShowCountries(false)} size={size} />
            )}
            {showCountries && isMinSize(size, 'medium') && (
              <Drop
                align={{ top: 'bottom', left: 'left' }}
                target={countryTarget.current}
                onClickOutside={() => setShowCountries(false)}
                overflow="hidden"
              >
                <NavCountry
                  onClose={() => setShowCountries(false)}
                  size={size}
                />
              </Drop>
            )}
            <ButtonNavSecondary
              plain
              active={showMetrics}
              onClick={() => {
                setShowCountries(false);
                setShowMetrics(!showMetrics);
              }}
              icon={<Icon name="METRICS" style={{ minWidth: '24px' }} />}
              justify="between"
              label={
                <Box
                  direction="row"
                  align="center"
                  justify="between"
                  fill="horizontal"
                >
                  <span>{intl.formatMessage(messages.metrics)}</span>
                  {showCountries && <FormUp size="large" />}
                  {!showCountries && <FormDown size="large" />}
                </Box>
              }
              ref={metricTarget}
            />
            {showMetrics && size === 'small' && (
              <NavMetric onClose={() => setShowMetrics(false)} size={size} />
            )}
            {showMetrics && isMinSize(size, 'medium') && (
              <Drop
                align={{ top: 'bottom', left: 'left' }}
                target={metricTarget.current}
                onClickOutside={() => setShowMetrics(false)}
              >
                <NavMetric onClose={() => setShowMetrics(false)} size={size} />
              </Drop>
            )}
            <ButtonNavSecondary
              key="at-risk"
              plain
              last
              active={match === 'at-risk'}
              onClick={() => {
                setShowMenu(false);
                nav('page/at-risk/');
              }}
            >
              <FormattedMessage {...rootMessages.page['at-risk']} />
            </ButtonNavSecondary>
            {isMinSize(size, 'medium') && (
              <Box flex={{ grow: 1 }} margin={{ horizontal: 'medium' }}>
                <Box
                  background="white"
                  direction="row"
                  align="center"
                  pad={{ horizontal: 'small', vertical: 'xsmall' }}
                  round="small"
                  ref={searchRef}
                  style={{ maxWidth: '500px' }}
                >
                  <StyledTextInput
                    plain
                    value={search}
                    onChange={evt => {
                      if (evt && evt.target) {
                        searched(evt.target.value);
                        setSearch(evt.target.value);
                      }
                    }}
                    placeholder={intl.formatMessage(messages.search.allSearch)}
                    pad="xsmall"
                  />
                  {search && search.length > 0 && (
                    <Button onClick={() => setSearch('')} pad="xsmall">
                      <FormClose />
                    </Button>
                  )}
                  {(!search || search.length === 0) && <Search />}
                </Box>
              </Box>
            )}
            {search.length > 1 && isMinSize(size, 'medium') && (
              <Drop
                align={{ top: 'bottom', left: 'left' }}
                target={searchRef.current}
                onClickOutside={() => setSearch('')}
              >
                <SearchResults onClose={() => setSearch('')} search={search} />
              </Drop>
            )}
          </NavBarBottom>
        </Styled>
      )}
    </ResponsiveContext.Consumer>
  );
}

Header.propTypes = {
  /** Navigation action */
  nav: PropTypes.func.isRequired,
  match: PropTypes.string,
  onLoadData: PropTypes.func.isRequired,
  downloadClicked: PropTypes.func.isRequired,
  searched: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onLoadData: () => {
    DEPENDENCIES.forEach(key => dispatch(loadDataIfNeeded(key)));
  },
  downloadClicked: () => {
    dispatch(
      trackEvent({
        category: 'Download',
        action: 'Agree & download clicked',
      }),
    );
  },
  searched: value => {
    dispatch(
      trackEvent({
        category: 'Search',
        action: value,
      }),
    );
  },
  // navigate to location
  nav: location => {
    dispatch(
      navigate(location, {
        keepTab: true,
        trackEvent: {
          category: 'Content',
          action: 'Header: navigate',
          value: typeof location === 'object' ? location.pathname : location,
        },
      }),
    );
  },
});

const mapStateToProps = createStructuredSelector({
  match: state => getRouterMatch(state),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(Header));
