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
import {
  Box,
  Button,
  Drop,
  ResponsiveContext,
  Image,
  Text,
  Layer,
} from 'grommet';
import { Menu, Close, FormDown, FormUp } from 'grommet-icons';

import logo from 'images/HRMI-Logo-HOR-RGB-x2.png';
import logoS from 'images/HRMI-Logo-HOR-RGB-small-x2.png';

import { appLocales } from 'i18n';
import LocaleToggle from 'containers/LocaleToggle';
import { getRouterMatch, getRouterRoute } from 'containers/App/selectors';
import { PAGES, PATHS } from 'containers/App/constants';
import { navigate, loadDataIfNeeded } from 'containers/App/actions';
import saga from 'containers/App/saga';
import Search from 'containers/Search';
import NavCountry from 'containers/Search/NavCountry';
import NavMetric from 'containers/Search/NavMetric';

import ButtonNavPrimary from 'styled/ButtonNavPrimary';
import ContentMaxWidth from 'styled/ContentMaxWidth';

import { useInjectSaga } from 'utils/injectSaga';
import {
  getHeaderHeight,
  getHeaderHeightTop,
  getHeaderHeightBottom,
  isMinSize,
  isMaxSize,
} from 'utils/responsive';

import rootMessages from 'messages';

const Styled = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  width: 100%;
  height: ${({ theme }) => getHeaderHeight('small', theme)}px;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    height: ${({ theme }) => getHeaderHeight('medium', theme)}px;
  }
`;

const NavBarTop = props => (
  <Box
    direction="row"
    align="center"
    justify="end"
    height={`${getHeaderHeightTop(props.size, props.theme)}px`}
    {...props}
  />
);
NavBarTop.propTypes = {
  theme: PropTypes.object,
  size: PropTypes.string,
};

const NavBarBottom = props => (
  <Box
    direction="row"
    align="end"
    justify={props.size === 'small' ? 'start' : 'end'}
    height={`${getHeaderHeightBottom(props.size, props.theme)}px`}
    {...props}
  />
);
NavBarBottom.propTypes = {
  theme: PropTypes.object,
  size: PropTypes.string,
};

const BrandButton = styled(Button)`
  height: ${({ theme }) => theme.sizes.header.small.heightTop}px;
  width: ${({ theme }) => theme.sizes.header.small.brandWidth}px;
  &:hover {
    opacity: 0.8;
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    height: ${({ theme }) => theme.sizes.header.height}px;
    width: ${({ theme }) => theme.sizes.header.brandWidth}px;
  }
`;
// color: ${({ theme }) => theme.global.colors.hover};
const BrandInner = styled(Box)`
  padding-top: ${({ theme }) => theme.sizes.header.small.padTop}px;
  padding-bottom: ${({ theme }) => theme.sizes.header.small.padBottom - 2}px;
  padding-right: ${({ theme }) => theme.sizes.header.small.padRight}px;
  height: ${({ theme }) => theme.sizes.header.small.heightTop}px;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    height: ${({ theme }) => theme.sizes.header.height}px;
    padding-top: ${({ theme }) => theme.sizes.header.padTop}px;
    padding-bottom: ${({ theme }) => theme.sizes.header.padBottom - 2}px;
    padding-right: ${({ theme }) => theme.sizes.header.padRight}px;
  }
`;

const LogoWrap = styled(Box)``;
const Logo = styled(Image)``;

const TitleWrap = styled(Box)`
  text-transform: uppercase;
  font-weight: bold;
  margin-top: -1px;
  font-size: 15px;
  line-height: 18px;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    margin-top: -5px;
    font-size: 19px;
    line-height: 30px;
  }
`;

const MenuList = styled(Box)`
  padding: ${({ theme }) => theme.global.edgeSize.medium} 0;
`;

const MenuGroup = styled(Box)`
  vertical-align: top;
`;
// prettier-ignore
const ToggleMenu = styled(Button)`
  z-index: 300;
  width: 30px;
  height: 30px;
  background-color: transparent;
  text-align: center;
`;

const SearchWrap = styled(Box)`
  height: ${({ theme }) => getHeaderHeightBottom('small', theme)}px;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    height: ${({ theme }) => getHeaderHeightBottom('medium', theme)}px;
  }
`;
// prettier-ignore
const ButtonNavSecondary = styled(Button)`
  margin: 0 5px;
  padding-left: 1px;
  font-weight: 600;
  height: ${({ theme }) => getHeaderHeightBottom('small', theme)}px;
  color: ${({ theme, subject, active, open }) => (
    (active || open) ? theme.global.colors[subject] : 'inherit'
  )};
  background: transparent;
  border-bottom: 4px solid;
  border-color: ${({ theme, subject, active }) => (
    (active) ? theme.global.colors[subject] : 'transparent'
  )};
  &:first-child {
    margin-left: 0;
  }
  &:hover {
    color: ${({ theme, subject }) => theme.global.colors[subject]};
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    height: ${({ theme }) => getHeaderHeightBottom('medium', theme)}px;
    margin-left: 20px;
    margin-right: 20px;
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    margin-left: 27px;
    margin-right: 27px;
  }
`;

const ButtonSecondary = React.forwardRef(
  ({ active, open, onClick, label, subject, size }, ref) => (
    <ButtonNavSecondary
      size={size}
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
          gap={size === 'small' ? 'xxsmall' : 'xsmall'}
        >
          <Text size={size === 'small' ? 'medium' : 'large'}>
            <FormattedMessage {...rootMessages.labels[label]} />
          </Text>
          {open && (
            <FormUp
              size={size === 'small' ? 'large' : 'xlarge'}
              style={{ stroke: 'currentColor', marginRight: '-3px' }}
            />
          )}
          {!open && (
            <FormDown
              size={size === 'small' ? 'large' : 'xlarge'}
              style={{ stroke: 'currentColor', marginRight: '-3px' }}
            />
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
  size: PropTypes.string,
};

const renderPages = (match, nav, setShowMenu) =>
  PAGES &&
  Object.values(PAGES)
    .filter(page => page.primary)
    .map(page => (
      <ButtonNavPrimary
        key={page.key}
        active={page.key === match}
        disabled={page.key === match}
        onClick={() => {
          if (setShowMenu) setShowMenu(false);
          nav(`${PATHS.PAGE}/${page.key}`);
        }}
      >
        <FormattedMessage {...rootMessages.page[page.key]} />
      </ButtonNavPrimary>
    ));

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
  const menuRef = useRef(null);

  const onHome = () => {
    setShowMenu(false);
    nav({ pathname: '', search: '' });
  };
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Styled role="banner" size={size}>
          <Box elevation="medium" background="white">
            <ContentMaxWidth column={size === 'small'}>
              <Box
                direction="row"
                align="center"
                justify="stretch"
                fill={isMaxSize(size, 'small') ? 'horizontal' : false}
              >
                <BrandButton plain onClick={onHome}>
                  <BrandInner
                    direction="row"
                    justify="start"
                    gap="10px"
                    fill={false}
                  >
                    <LogoWrap
                      justify="start"
                      width={`${
                        size === 'small'
                          ? theme.sizes.header.small.logoWidth
                          : theme.sizes.header.logoWidth
                      }px`}
                      flex={{ shrink: 0 }}
                    >
                      <Logo
                        src={size === 'small' ? logoS : logo}
                        alt={`${intl.formatMessage(rootMessages.app.title)}`}
                        a11yTitle={`${intl.formatMessage(
                          rootMessages.app.title,
                        )}`}
                        fit="contain"
                      />
                    </LogoWrap>
                    <TitleWrap>
                      <FormattedMessage {...rootMessages.app.title} />
                    </TitleWrap>
                  </BrandInner>
                </BrandButton>
                {size === 'small' && appLocales.length > 1 && (
                  <Box margin={{ left: 'auto' }}>
                    <LocaleToggle />
                  </Box>
                )}
                {size === 'small' && (
                  <ToggleMenu
                    plain
                    onClick={() => setShowMenu(!showMenu)}
                    ref={menuRef}
                  >
                    {!showMenu && <Menu color="dark-3" />}
                    {showMenu && <Close color="dark-3" />}
                  </ToggleMenu>
                )}
                {showMenu && size === 'small' && (
                  <Layer
                    full="horizontal"
                    margin={{ top: '50px' }}
                    onClickOutside={() => setShowMenu(false)}
                    responsive={false}
                    position="top"
                    modal={false}
                    animate={false}
                  >
                    <MenuList elevation="large">
                      <MenuGroup>
                        {renderPages(match, nav, setShowMenu)}
                      </MenuGroup>
                    </MenuList>
                  </Layer>
                )}
              </Box>
              <Box fill>
                {isMinSize(size, 'medium') && (
                  <NavBarTop
                    theme={theme}
                    direction="row"
                    justify="end"
                    size={size}
                  >
                    {renderPages(match, nav)}
                    {appLocales.length > 1 && isMinSize(size, 'medium') && (
                      <LocaleToggle />
                    )}
                  </NavBarTop>
                )}
                <NavBarBottom theme={theme} size={size}>
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
                        size={size}
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
                        size={size}
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
                        size={size}
                      >
                        <Text size={size === 'small' ? 'medium' : 'large'}>
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
              </Box>
            </ContentMaxWidth>
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
