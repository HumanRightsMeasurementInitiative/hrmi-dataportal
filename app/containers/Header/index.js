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
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import styled, { withTheme } from 'styled-components';
import { Box, Button, Drop, ResponsiveContext, Image, Text } from 'grommet';
import { Menu, Close, FormDown, FormUp } from 'grommet-icons';

import { getRouterMatch, getRouterRoute } from 'containers/App/selectors';

import ButtonNavPrimary from 'styled/ButtonNavPrimary';
import { isMinSize, isMaxSize } from 'utils/responsive';

import logo from 'images/HRMI-Logo-HOR-RGB-x2.png';

import LocaleToggle from 'containers/LocaleToggle';
import { appLocales } from 'i18n';
import { PAGES, PATHS } from 'containers/App/constants';
import { navigate, loadDataIfNeeded } from 'containers/App/actions';

// import { isMinSize, isMaxSize } from 'utils/responsive';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/App/saga';
import Search from 'containers/Search';
import NavCountry from 'containers/Search/NavCountry';
import NavMetric from 'containers/Search/NavMetric';

import rootMessages from 'messages';
import messages from './messages';

const Styled = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  width: 100%;
  height: ${({ theme, showSecondary }) =>
    showSecondary
      ? theme.sizes.header.heightTop
      : theme.sizes.header.heightTop + theme.sizes.header.heightBottom}px;
`;

const NavBarTop = props => (
  <Box
    direction="row"
    align="center"
    justify="end"
    background="white"
    height={`${props.theme.sizes.header.heightTop}px`}
    fill="horizontal"
    pad={{ horizontal: 'small' }}
    {...props}
  />
);
NavBarTop.propTypes = {
  theme: PropTypes.object,
};

const NavBarBottom = props => (
  <Box
    direction="row"
    align="end"
    justify="end"
    background="white"
    fill="horizontal"
    height={`${props.theme.sizes.header.heightBottom}px`}
    pad={{ horizontal: 'small' }}
    {...props}
  />
);
NavBarBottom.propTypes = {
  theme: PropTypes.object,
};

const BrandButton = styled(Button)`
  height: ${({ theme }) => theme.sizes.header.height}px;
  width: ${({ theme }) => theme.sizes.header.brandWidth}px;
  &:hover {
    opacity: 0.8;
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    width: ${({ theme }) => theme.sizes.header.brandWidth}px;
  }
`;
// color: ${({ theme }) => theme.global.colors.hover};
const BrandInner = styled(Box)`
  height: ${({ theme }) => theme.sizes.header.height}px;
  padding-top: ${({ theme }) => theme.sizes.header.padTop}px;
  padding-bottom: ${({ theme }) => theme.sizes.header.padBottom - 2}px;
  padding-left: ${({ theme }) => theme.sizes.header.padLeft}px;
  padding-right: ${({ theme }) => theme.sizes.header.padLeft}px;
`;

const LogoWrap = styled(Box)``;
const Logo = styled(Image)``;

const TitleWrap = styled(Box)`
  text-transform: uppercase;
  font-weight: bold;
  margin-top: -5px;
  font-size: 19px;
  line-height: 30px;
`;

// prettier-ignore
// display: ${props => (props.visible ? 'block' : 'none')};
// position: fixed;
// left: 0;
// right: 0;
// bottom: 0;
// width: 100%;
// background: ${props => props.theme.global.colors['dark-2']};
const MenuList = styled(Box)`
  z-index: 99999;
  padding: ${({ theme }) => theme.global.edgeSize.medium} 0;
  overflow: auto;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    padding: 0;
    position: relative;
    z-index: 300;
  }
`;

const MenuGroup = styled(Box)`
  vertical-align: top;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
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

const SearchWrap = styled(Box)`
  height: ${({ theme }) => theme.sizes.header.heightBottom}px;
`;
// prettier-ignore
const ButtonNavSecondary = styled(Button)`
  margin: 0px 10px;
  padding-left: 3px;
  font-weight: 600;
  height: ${({ theme }) => theme.sizes.header.heightBottom - 4}px;
  color: ${({ theme, subject, active, open }) => (
    (active || open) ? theme.global.colors[subject] : 'inherit'
  )};
  background: transparent;
  border-bottom: 4px solid;
  border-color: ${({ theme, subject, active }) => (
    (active) ? theme.global.colors[subject] : 'transparent'
  )};
  &:hover {
    color: ${({ theme, subject }) => theme.global.colors[subject]};
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    margin: 0 20px;
  }
`;

const ButtonSecondary = React.forwardRef(
  ({ active, open, onClick, label, subject }, ref) => (
    <ButtonNavSecondary
      plain
      active={active}
      open={open}
      subject={subject}
      onClick={onClick}
      justify="between"
      ref={ref}
      label={
        <Box
          direction="row"
          align="center"
          justify="between"
          fill="horizontal"
          gap="xsmall"
        >
          <Text size="large">
            <FormattedMessage {...rootMessages.labels[label]} />
          </Text>
          {open && <FormUp size="xlarge" style={{ stroke: 'currentColor' }} />}
          {!open && (
            <FormDown size="xlarge" style={{ stroke: 'currentColor' }} />
          )}
        </Box>
      }
    />
  ),
);

ButtonSecondary.propTypes = {
  active: PropTypes.bool,
  open: PropTypes.bool,
  onClick: PropTypes.func,
  label: PropTypes.string,
  subject: PropTypes.string,
};

const DEPENDENCIES = ['countries'];

export function Header({ nav, onLoadData, match, path, theme, intl }) {
  useInjectSaga({ key: 'app', saga });

  useEffect(() => {
    // kick off loading of page content
    onLoadData();
  }, []);

  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showCountries, setShowCountries] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);
  const countryTarget = useRef(null);
  const metricTarget = useRef(null);

  const onHome = () => {
    setShowMenu(false);
    nav({ pathname: '', search: '' });
  };
  const showSecondary = true;
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Styled role="banner" showSecondary={showSecondary}>
          <Box direction="row" elevation="medium" background="white">
            <BrandButton plain onClick={onHome}>
              <BrandInner
                direction="row"
                justify="start"
                gap="10px"
                fill="false"
              >
                <LogoWrap
                  justify="start"
                  width={`${theme.sizes.header.logoWidth}px`}
                  flex={{ shrink: false }}
                >
                  <Logo
                    src={logo}
                    alt={`${intl.formatMessage(messages.appTitle)}`}
                    a11yTitle={`${intl.formatMessage(messages.appTitle)}`}
                    fit="contain"
                  />
                </LogoWrap>
                <TitleWrap>
                  <FormattedMessage {...messages.appTitle} />
                </TitleWrap>
              </BrandInner>
            </BrandButton>
            <Box fill>
              <NavBarTop theme={theme}>
                {appLocales.length > 1 && isMaxSize(size, 'medium') && (
                  <Box margin={{ left: 'auto', right: 'large' }}>
                    <LocaleToggle />
                  </Box>
                )}
                <ToggleMenu plain onClick={() => setShowMenu(!showMenu)}>
                  {!showMenu && <Menu />}
                  {showMenu && <Close />}
                </ToggleMenu>
                <MenuList visible={showMenu} direction="row">
                  <MenuGroup direction="row">
                    {PAGES &&
                      Object.values(PAGES)
                        .filter(page => page.primary)
                        .map(page => (
                          <ButtonNavPrimary
                            key={page.key}
                            active={page.key === match}
                            disabled={page.key === match}
                            onClick={() => {
                              setShowMenu(false);
                              nav(`${PATHS.PAGE}/${page.key}`);
                            }}
                          >
                            <FormattedMessage
                              {...rootMessages.page[page.key]}
                            />
                          </ButtonNavPrimary>
                        ))}
                  </MenuGroup>
                  {appLocales.length > 1 && isMinSize(size, 'large') && (
                    <MenuGroup direction="row">
                      <LocaleToggle />
                    </MenuGroup>
                  )}
                </MenuList>
              </NavBarTop>
              {showSecondary && (
                <NavBarBottom theme={theme}>
                  {(!showSearch || isMaxSize(size, 'small')) && (
                    <>
                      <ButtonSecondary
                        active={
                          path === PATHS.COUNTRIES || path === PATHS.COUNTRY
                        }
                        open={showCountries}
                        onClick={() => {
                          setShowMetrics(false);
                          setShowCountries(!showCountries);
                        }}
                        label="countries"
                        ref={countryTarget}
                        subject="countries"
                      />
                      {showCountries && size === 'small' && (
                        <NavCountry
                          onClose={() => setShowCountries(false)}
                          size={size}
                        />
                      )}
                      {showCountries && isMinSize(size, 'medium') && (
                        <Drop
                          align={{ top: 'bottom', right: 'right' }}
                          target={countryTarget.current}
                          onClickOutside={() => setShowCountries(false)}
                          overflow="hidden"
                        >
                          <NavCountry
                            onClose={() => setShowCountries(false)}
                            size={size}
                            subject="countries"
                          />
                        </Drop>
                      )}
                      <ButtonSecondary
                        active={path === PATHS.METRICS || path === PATHS.METRIC}
                        open={showMetrics}
                        onClick={() => {
                          setShowCountries(false);
                          setShowMetrics(!showMetrics);
                        }}
                        label="metrics"
                        subject="metrics"
                        ref={metricTarget}
                      />
                      {showMetrics && size === 'small' && (
                        <NavMetric
                          onClose={() => setShowMetrics(false)}
                          size={size}
                        />
                      )}
                      {showMetrics && isMinSize(size, 'medium') && (
                        <Drop
                          align={{ top: 'bottom', right: 'right' }}
                          target={metricTarget.current}
                          onClickOutside={() => setShowMetrics(false)}
                        >
                          <NavMetric
                            onClose={() => setShowMetrics(false)}
                            size={size}
                            subject="metrics"
                          />
                        </Drop>
                      )}
                      <ButtonNavSecondary
                        key="at-risk"
                        subject="people"
                        plain
                        last
                        active={match === 'at-risk'}
                        onClick={() => {
                          nav('page/at-risk/');
                        }}
                      >
                        <Text size="large">
                          <FormattedMessage {...rootMessages.page['at-risk']} />
                        </Text>
                      </ButtonNavSecondary>
                    </>
                  )}
                  {isMinSize(size, 'medium') && (
                    <SearchWrap justify="center">
                      <Search
                        expand={showSearch}
                        onToggle={() => setShowSearch(!showSearch)}
                        dark
                      />
                    </SearchWrap>
                  )}
                </NavBarBottom>
              )}
            </Box>
          </Box>
        </Styled>
      )}
    </ResponsiveContext.Consumer>
  );
}

Header.propTypes = {
  /** Navigation action */
  nav: PropTypes.func.isRequired,
  match: PropTypes.string,
  path: PropTypes.string,
  onLoadData: PropTypes.func.isRequired,
  theme: PropTypes.object,
  intl: intlShape.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onLoadData: () => {
    DEPENDENCIES.forEach(key => dispatch(loadDataIfNeeded(key)));
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
  path: state => getRouterRoute(state),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(withTheme(injectIntl(Header)));
