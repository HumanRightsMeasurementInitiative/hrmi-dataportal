/**
 *
 * Overview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import styled, { withTheme } from 'styled-components';
import { Helmet } from 'react-helmet';

import { ResponsiveContext, Paragraph } from 'grommet';

// containers
import { RIGHTS, DIMENSIONS } from 'containers/App/constants';
import { selectMetric, navigate } from 'containers/App/actions';

// components
import SectionRights from 'components/Sections/SectionRights';
import Aside from 'components/Aside';

// styles
import MainColumn from 'styled/MainColumn';
import ContentWrap from 'styled/ContentWrap';
import ContentContainer from 'styled/ContentContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';
import PageTitle from 'styled/PageTitle';
import ButtonTextIcon from 'styled/ButtonTextIcon';
import ButtonText from 'styled/ButtonText';

import { isMinSize, isMaxSize } from 'utils/responsive';

import graphic from 'images/graphics/rights_overview.svg';

import rootMessages from 'messages';
import messages from './messages';

const Image = styled.img`
  width: 100%;
  max-width: 200px;
`;

export function PathMetricOverview({
  onSelectMetric,
  navMethodology,
  intl,
  theme,
}) {
  const metaTitle = intl.formatMessage(rootMessages.labels.allMetrics);

  const metaDescription =
    intl.formatMessage(rootMessages.app.metaTitle) + ' - ' + metaTitle;

  return (
    <ResponsiveContext.Consumer>
      {size => (
        <ContentWrap>
          <Helmet>
            <title>{metaTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta property="og:description" content={metaDescription} />
          </Helmet>
          <ContentContainer direction="column" header>
            <ContentMaxWidth
              header
              height={
                isMinSize(size, 'large')
                  ? `${theme.sizes.top.height}px`
                  : 'auto'
              }
              hasAside={isMinSize(size, 'large')}
            >
              <MainColumn hasAside={isMinSize(size, 'large')} header>
                <PageTitle>
                  <FormattedMessage
                    {...messages.title}
                    values={{ no: RIGHTS.length }}
                  />
                </PageTitle>
                <Paragraph size={isMaxSize(size, 'sm') ? 'medium' : 'large'}>
                  <FormattedMessage
                    {...messages.header}
                    values={{
                      no: RIGHTS.length,
                      esrLink: (
                        <ButtonTextIcon
                          color="esrDark"
                          size={isMaxSize(size, 'sm') ? 'medium' : 'large'}
                          weight={700}
                          label={intl.formatMessage(
                            rootMessages.dimensions.esr,
                          )}
                          onClick={() => onSelectMetric('esr')}
                        />
                      ),
                      physintLink: (
                        <ButtonTextIcon
                          color="physintDark"
                          size={isMaxSize(size, 'sm') ? 'medium' : 'large'}
                          weight={700}
                          label={intl.formatMessage(
                            rootMessages.dimensions.physint,
                          )}
                          onClick={() => onSelectMetric('physint')}
                        />
                      ),
                      empowerLink: (
                        <ButtonTextIcon
                          color="empowermentDark"
                          size={isMaxSize(size, 'sm') ? 'medium' : 'large'}
                          weight={700}
                          label={intl.formatMessage(
                            rootMessages.dimensions.empowerment,
                          )}
                          onClick={() => onSelectMetric('empowerment')}
                        />
                      ),
                    }}
                  />
                </Paragraph>
              </MainColumn>
              {isMinSize(size, 'large') && (
                <Aside align="center" justify="center">
                  <Image src={graphic} />
                </Aside>
              )}
            </ContentMaxWidth>
          </ContentContainer>
          {DIMENSIONS.map((d, index) => {
            const rights = RIGHTS.filter(r => r.dimension === d.key);
            return (
              <SectionRights
                hasLongTitle
                key={d.key}
                rights={rights}
                onSelectRight={onSelectMetric}
                navAllRights={() => onSelectMetric(d.key)}
                allLink={`${intl.formatMessage(messages.categoryLink)}`}
                title={`${intl.formatMessage(messages.sectionTitle, {
                  no: rights.length,
                  category: intl.formatMessage(rootMessages.dimensions[d.key]),
                  categoryCode: d.key,
                })}`}
                background={index % 2 === 0 ? `${d.key}Light` : 'white'}
                minHeight={d.type === 'cpr'}
                stretchAllLink={false}
                description={
                  <span>
                    <FormattedMessage
                      {...messages.description[d.key]}
                      values={{
                        methodologyLink: (
                          <ButtonText onClick={() => navMethodology()}>
                            <FormattedMessage
                              {...messages.description.methodologyLink[d.type]}
                            />
                          </ButtonText>
                        ),
                      }}
                    />
                  </span>
                }
              />
            );
          })}
        </ContentWrap>
      )}
    </ResponsiveContext.Consumer>
  );
}

PathMetricOverview.propTypes = {
  onSelectMetric: PropTypes.func,
  navMethodology: PropTypes.func,
  intl: intlShape.isRequired,
  theme: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    onSelectMetric: metric => dispatch(selectMetric(metric)),
    // navigate to location
    navMethodology: () => {
      dispatch(
        navigate('page/methodology', {
          trackEvent: {
            category: 'Content',
            action: 'FAQs: open page',
            value: 'methodology',
          },
        }),
      );
    },
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(withTheme(PathMetricOverview)));
