/**
 *
 * Methodology Page
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import styled from 'styled-components';
import { intlShape, injectIntl } from 'react-intl';

import { loadContentIfNeeded } from 'containers/App/actions';
import { getContentByKey, getCloseTargetPage } from 'containers/App/selectors';

import Close from 'containers/Close';
import LoadingIndicator from 'components/LoadingIndicator';
import ContentWrap from 'styled/ContentWrap';
import ContentContainer from 'styled/ContentContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';
import PageTitle from 'styled/PageTitle';
import icon from 'images/graphics/methodology.png';

import rootMessages from 'messages';

const StyledContent = styled.div`
  width: 100%;
  margin-bottom: 60px;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    width: 70%;
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    width: 50%;
  }
`;

const StyledContentHeader = styled.div`
  width: 100%;
  margin-top: 36px;
  margin-bottom: 48px;
  height: 260px;
  background-color: #dbf2e5;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledContentSubHeading = styled.div`
  width: 100%;
  fontsize: '1.2em';
  lineheight: '1.4';
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    width: 80%;
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    width: 60%;
  }
`;

const StyledContentImg = styled.img`
  display: none;
  position: absolute;
  top: -30px;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    left: 60%;
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    display: block;
    left: 70%;
    width: 300px;
  }
`;

const StyledContentInfoBox = styled.div`
  width: 100%;
  padding: 40px;
  background-color: #dbf2e5;
  line-height: 150%;
  margin-top: 50px;
  margin-bottom: 50px;
`;

export function MethodologyPathPage({
  match,
  onLoadContent,
  // content,
  closeTarget,
  intl,
}) {
  useEffect(() => {
    // kick off loading of page content
    onLoadContent(match.params.page);
  }, [match.params.page]);
  const page = match && match.params.page;
  const pageTitle = intl.formatMessage(rootMessages.page[page]);

  // actual data
  // let bulkContent = content.content
  // console.log('methodology content', content.content);
  // dummy data
  let bulkContent =
    '<div><p>---sub-heading</p><p>It\'s a new thing to measure human rights. Here you learn <strong> how we measure</strong> the different rights and how you can <strong>interpret these.</strong><p>---end-sub-heading</p><p>---text-section</p><h2>Measuring Human Rights</h2><p>There is no one-size-fits-all methodology for measuring human rights performance, so we use different methodologies, tailored to measure each set of rights.</p>---text-section<h3 id="measuring-civil-and-political-rights">Measuring civil and political rights</h3><p>For civil and political rights, where violations often take place in secret and reporting is inconsistent across different countries, we use a multilingual expert survey approach to get our information directly from the human rights experts who are monitoring events in each country.</p><p>---end-text-section</p><p>---info-box</p><p><b>Learn more:</b></p><p><a href="https://humanrightsmeasurement.org//methodology/measuring-civil-political-rights/">Get an overview of our methodology for measuring civil and political rights</a></p><p><a href="https://humanrightsmeasurement.org/methodology-handbook/">Read our more in-depth methodology handbook</a></p><p><a href="https://ugeorgia.ca1.qualtrics.com/jfe/preview/SV_72IQjpYjeCbIw3b?Q_SurveyVersionID=current&amp;Q_CHL=preview">See the HRMI expert survey for civil and political rights</a> (please note this is a link to a preview of the most recent version of the survey, and any responses you enter will not be collected)</p><p>---end-info-box</p><hr /><p>---text-section</p><h3 id="measuring-economic-and-social-rights">Measuring economic and social rights</h3><p>For economic and social rights, we draw on national statistics produced by governments and international agencies, and use the award-winning SERF Index methodology to compare countries’ human rights outcomes with their income, to capture the concept of ‘progressive realisation’.</p><p>---end-text-section</p><p>---info-box</p><p><b>Learn more:</b></p><p><a href="https://humanrightsmeasurement.org//methodology/measuring-economic-social-rights/">Get an overview of our methodology for measuring economic and social rights</a></p><p><a href="https://humanrightsmeasurement.org/methodology-handbook/">Read our more in-depth methodology handbook</a></p><p><a href="https://serfindex.uconn.edu/">Visit the SERF Index website</a></p><p>---end-info-box</p><hr /><p>---text-section</p><h3 id="understanding-how-to-interpret-the-good-fair-bad-and-very-bad-labels-on-the-country-charts">Understanding how to interpret the good, fair, bad, and very bad labels on the country charts</h3><p>What do the <strong>good</strong>, <strong>fair</strong>, <strong>bad</strong>, and <strong>very bad</strong> ranges mean, exactly?</p><p>The labels on the country charts of <strong>good</strong>, <strong>fair</strong>, <strong>bad</strong>, and <strong>very bad</strong> are used to give a general indication of how to understand the scores. They are NOT comprehensive descriptions of a country’s performance on an individual right.</p><hr /><h3 id="interpreting-these-labels-for-the-civil-and-political-rights-safety-from-the-state-and-empowerment">Interpreting these labels for the civil and political rights (Safety from the State and Empowerment)</h3><p><strong>Good</strong> (8-10): Governments with scores in the <strong>good</strong> range respect these rights more than most other governments in our sample since 2017. However, countries in this range, particularly those with scores close to the lower end of the range, may still have significant problems that lead to the violation of some peoples’ rights.</p><p><strong>Fair</strong> (6-8): Governments with scores in the <strong>fair</strong> range respect these rights more than many countries since 2017, but still violate the rights of a significant number of people.</p><p><strong>Bad</strong> (3.5-6): Governments with scores in the <strong>bad</strong> range engage in numerous violations of civil and political rights, performing worse than many governments in our sample since 2017.</p><p><strong>Very bad</strong> (0-3.5): Governments with scores in the <strong>very bad</strong> range violate these rights more than most other governments in our sample since 2017.</p><hr /><h3 id="interpreting-these-labels-for-the-economic-and-social-rights-quality-of-life">Interpreting these labels for the economic and social rights (Quality of Life)</h3><h4 id="income-adjusted-scores">Income adjusted scores</h4><p>HRMI’s income adjusted Quality of Life scores can be broadly interpreted as showing the percentage of the country’s obligation it has met, compared to what the best performing countries have achieved at each income level.</p><p><strong>Good</strong> (95-100%): Countries scoring 100% set the benchmark for the country per capita income level concerned. That is, they show what is possible to achieve at their resource level given current technologies and knowledge. These countries are meeting their immediate obligation under international law to use the maximum of their available resources to progressively fulfil the right concerned. Countries scoring more than 95 but less than 100, are doing a good job of ensuring the resources they have enable as many people as possible to enjoy the right concerned, but there is always room for improvement.</p><p><strong>Fair</strong> (85-94.9%): Countries scoring in this range are not doing nearly as much as they could to meet their obligations under international human rights law. They are only doing a <strong>fair</strong> (okay, but not good enough) job of putting in place the structures and policies that enable people to enjoy the right concerned.</p><p><strong>Bad</strong> (75-84.9%):  Countries scoring in this range have a long way to go to meet their obligations under human rights law. They have failed to put in place the kinds of structures and policies that enable people to claim the right concerned.</p><p><strong>Very bad</strong> (below 75%): There is no reason for any country to score this low. Not only are countries scoring below 75% failing to put in place the kinds of structures and policies that help people claim the right concerned, but the structures and policies in place most likely prevent many people from claiming their rights.</p><h4 id="global-best-scores">Global best scores</h4><p>The global best scores assess country performance compared to the ultimate goal of ensuring <em>all</em> people can enjoy their economic and social rights. Countries performing well against the income adjusted performance benchmark might still perform poorly against the global best benchmark if they face resource constraints.</p><p><strong>Good</strong> (95-100%): Countries scoring 100% set the benchmark for what is possible at any income level. These are usually high income countries who are demonstrating what is possible to achieve with sufficient income and given current technologies and knowledge. These countries will not be perfect, but are showing what it is so far possible to achieve. Countries scoring more than 95 but less than 100 have enabled people to broadly claim the right concerned, but, as in every country, there will still be some vulnerable population subgroups that are unable to claim their rights.</p><p><strong>Fair</strong> (85-94.9%): Countries scoring in this range likely enable the majority of people to claim the right concerned but there remain segments of the population that are unable to do so.</p><p><strong>Bad</strong> (75-84.9%): Countries scoring in this range have a long way to go to ensure that most people enjoy the right concerned, and there remain substantial segments of society that are unable to do so.</p><p><strong>Very bad</strong> (below 75%): In countries scoring in this range, broad segments of society are unable to claim the right concerned. These countries are likely very low income countries, or countries that have failed to put in place the kinds of structures and policies that help people claim the right concerned, or both.</p><p>---end-text-section</p></div>';

  let subHeading = '';

  const sortText = () => {
    subHeading = bulkContent
      .split('sub-heading')[1]
      .replace('---end-', ' ')
      .replace(/<\W?p>/g, ' ');
    bulkContent = bulkContent.split('---');
  };
  sortText();

  return (
    <ContentWrap>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content="Description of Page" />
      </Helmet>
      <ContentContainer direction="column" header>
        <StyledContentHeader>
          <Close closeTarget={closeTarget} />
          <ContentMaxWidth direction="column">
            <PageTitle level={1}>{pageTitle}</PageTitle>
            <StyledContentSubHeading>
              {/* eslint-disable react/no-danger */}
              <p dangerouslySetInnerHTML={{ __html: subHeading }} />
              {/* eslint-enable react/no-danger */}
            </StyledContentSubHeading>
            <StyledContentImg src={icon} />
          </ContentMaxWidth>
        </StyledContentHeader>

        <ContentMaxWidth>
          <StyledContent>
            {/* eslint-disable react/no-danger  */}
            {bulkContent &&
              bulkContent.map(section => {
                if (
                  section.includes('text-section') &&
                  !section.includes('end-')
                ) {
                  const sectionReplaced = section.replace('text-section', ' ');
                  return (
                    <p
                      key={section}
                      dangerouslySetInnerHTML={{ __html: sectionReplaced }}
                    />
                  );
                }
                if (section.includes('info-box') && !section.includes('end-')) {
                  const sectionReplaced = section.replace('info-box', ' ');
                  return (
                    <StyledContentInfoBox
                      key={section}
                      dangerouslySetInnerHTML={{ __html: sectionReplaced }}
                    />
                  );
                }
                return null;
              })}
            {/* eslint-enable react/no-danger  */}
            {!bulkContent && <LoadingIndicator />}
          </StyledContent>
        </ContentMaxWidth>
      </ContentContainer>
    </ContentWrap>
  );
}

MethodologyPathPage.propTypes = {
  match: PropTypes.object,
  onLoadContent: PropTypes.func,
  closeTarget: PropTypes.object,
  // content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  content: (state, props) => getContentByKey(state, props.match.params.page),
  closeTarget: state => getCloseTargetPage(state),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoadContent: page => {
      dispatch(loadContentIfNeeded(page));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(MethodologyPathPage));
