/**
 *
 * PacificIssue
 *
 */

import React from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Flex,
  Box,
  Text,
  Heading,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import { injectIntl, FormattedMessage } from 'react-intl';

import rootMessages from 'messages';

import SingleBarChart from '../SingleBarChart';

function PacificIssue({
  intl,
  year,
  issueTKeyPart,
  countryWithArticle,
  score,
  qualData,
  barChartResponseOptions,
  responseCount,
  id,
}) {
  // assumption is that barChartResponseOptions are already sorted from lower -> higher values
  // TODO: tidy up needing to clone array
  //  const upperBand = barChartResponseOptions.find(o => o.value > score)
  //  const lowerBand = [...barChartResponseOptions]
  //    .reverse()
  //    .find(o => o.value < score)

  return (
    <Flex id={id} mb={12} direction="column" width="100%">
      <Flex direction="column">
        <Heading fontSize={24} fontWeight="600" color="purple">
          <FormattedMessage {...rootMessages.pacific[issueTKeyPart]} />
        </Heading>
        <Text display="inline" mt={1} fontSize={14} color="purple">
          {' '}
          ({year})
        </Text>
      </Flex>
      <Box mt={2}>
        <Text color="purple">
          <FormattedMessage
            {...{
              ...rootMessages.pacific[`${issueTKeyPart}-subheading`],
              values: { countryWithArticle },
            }}
          />
        </Text>
      </Box>
      <Box my={4}>
        <SingleBarChart
          // @ts-ignore
          score={score}
          responseOptions={barChartResponseOptions}
        />
      </Box>
      {/* <Box mb={2}>
			   <Text>
						<FormattedMessage {...{...rootMessages.pacific.explanation, values: {
			       no: responseCount,
			       countryWithArticle,
			       score: parseFloat(score).toFixed(1),
			       issue: intl.formatMessage(rootMessages.pacific[issueTKeyPart]), 
						lowerBandLabel: intl.formatMessage(rootMessages.pacific[lowerBand.tKey]).toLocaleLowerCase(),
						upperBandLabel: intl.formatMessage(rootMessages.pacific[upperBand.tKey]).toLocaleLowerCase()
						 }
						}} />
			   </Text>
			 </Box> */}
      <ReactMarkdown
        components={
          {
            //  p: props => <Text color='purple' {...props} />,
            //  ul: props => <UnorderedList mt={4} ms={12} {...props} />,
            //  li: props => <ListItem color='purple' {...props} />
          }
        }
        children={qualData}
      />
    </Flex>
  );
}

export default injectIntl(PacificIssue);

// /**
//  *
//  * PacificIssue
//  *
//  */

// import React, { useState, useRef } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import ReactMarkdown from 'react-markdown';

// import {
// 	Heading,
// 	Paragraph,
// 	Box,
// 	Text,
// 	ResponsiveContext,
// 	Button,
// 	Drop,
// } from 'grommet';

// import rootMessages from 'messages';
// import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// import { prepGroups } from 'containers/Search/search';
// import { AT_RISK_GROUPS } from 'containers/App/constants';

// import { getMessageGrammar } from 'utils/narrative';

// // prettier-ignore
// const StyledHeading = styled(Heading)`
//   font-size: ${({ theme, level = 1 }) => theme.heading.level[level].small.size};
//   line-height: ${({ theme, level = 1 }) => theme.heading.level[level].small.height};
//   @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
//     font-size: ${({ theme, level = 1 }) => theme.heading.level[level].medium.size};
//     line-height: ${({ theme, level = 1 }) => theme.heading.level[level].medium.height};
//   }
// `;

// function GradeAndLabel ({ left, tKey, value }) {
//   // const { t } = useHRMIIntl()
//   return (
//     <Box
//       position='absolute'
//       left={left}
//       height={6}
//       borderLeftStyle='solid'
//       borderLeftWidth='1px'
//       borderLeftColor='dark'
//     >
//       <Box
//         position='absolute'
//         top='100%'
//         mt={1}
//         transform='translate(-50%)'
//         minW={12}
//       >
//         <Text textAlign='center'>
//           {/* {t(tKey)} {`(${value})`} */}
// 					test
//         </Text>
//       </Box>
//     </Box>
//   )
// }

// function PacificIssueOLD({
// 	intl,
// 	messageValues,
// 	score,
// 	barChartResponseOptions
// }) {
// 	console.log({ score, messageValues, barChartResponseOptions })
// 	// assumption is that barChartResponseOptions are already sorted from lower -> higher values
//   // TODO: tidy up needing to clone array
//   // const upperBand = barChartResponseOptions.find(o => o.value > score.mean)
//   // const lowerBand = [...barChartResponseOptions]
//   //   .reverse()
//   //   .find(o => o.value < score.mean)

// 	return (
// 		<Box>
// 			<StyledHeading responsive={false} level={2}>
// 				<FormattedMessage {...rootMessages.pacific['climate-crisis']} />
// 			</StyledHeading>
// 			<Text>({score.year})</Text>
// 			<Paragraph>
// 				<FormattedMessage {...{ ...rootMessages.pacific['climate-crisis-subheading'], values: messageValues }} />
// 			</Paragraph>
// 			{/* <Paragraph>
// 				<FormattedMessage {...{ ...rootMessages.pacific['explanation'], values: { ...messageValues, no: score.resp_count, score: parseFloat(score.mean).toFixed(1), issue: score.metric_code, lowerBandLabel: `"${intl.formatMessage(rootMessages.pacific[lowerBand.tKey]).toLowerCase()}"`, upperBandLabel: `"${intl.formatMessage(rootMessages.pacific[upperBand.tKey]).toLowerCase()}"` }  }} />
// 			</Paragraph> */}
// 			<Box direction="row" mt={8} mb={24} px={12} width='100%' height={6}>
// 				<Box
// 					direction="row"
// 					position='relative'
// 					width='100%'
// 					borderBottomStyle='solid'
// 					borderBottomWidth='1px'
// 					borderBottomColor='dark'
// 				>
// 					<Box
// 						position='absolute'
// 						left={`${(score.mean / (barChartResponseOptions.length - 1)) * 100 -
// 							100 / (barChartResponseOptions.length - 1)}%`}
// 						height={7}
// 						borderLeftStyle='solid'
// 						borderLeftWidth='2px'
// 						borderLeftColor='red'
// 					>
// 						<Box
// 							mb={2}
// 							py={1}
// 							px={2}
// 							style={{
// 								position: 'absolute',
// 								bottom: '100%',
// 								transform: 'translate(-50%)',
// 								backgroundColor: 'white'
// 								// borderRadius='sm'
// 								// boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 4px'
// 							}}
// 						>
// 							<Text fontWeight='600' color='purple'>
// 								{parseFloat(score.mean).toFixed(1)}
// 							</Text>
// 						</Box>
// 					</Box>

// 					{barChartResponseOptions.map((o, i) => (
// 						<GradeAndLabel
// 							left={`${(100 / (barChartResponseOptions.length - 1)) * i}%`}
// 							tKey={o.tKey}
// 							value={o.value}
// 						/>
// 					))}
// 				</Box>
// 			</Box>

//       <ReactMarkdown
//         components={{
//           // p: props => <Text color='purple' {...props} />,
//           // ul: props => <UnorderedList mt={4} ms={12} {...props} />,
//           // li: props => <ListItem color='purple' {...props} />
//         }}
//         children={'TODO qual data load'}
//       />
// 		</Box>
// 	);
// }

// PacificIssueOLD.propTypes = {
// 	hasAside: PropTypes.bool,
// 	data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
// 	highlight: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
// 	setHighlight: PropTypes.func,
// 	content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
// 	countryCode: PropTypes.string,
// 	intl: intlShape,
// 	onSelectCountry: PropTypes.func,
// };

// export default injectIntl(PacificIssueOLD);
