/**
 *
 * CountryPeople
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Heading } from 'grommet';

import rootMessages from 'messages';
import { FormattedMessage } from 'react-intl';

function CountryPeople({ data }) {
  console.log(data);
  return (
    <div>
      {data &&
        Object.values(data).map(i => (
          <div>
            <Heading level={3}>{i.key}</Heading>
            {Object.values(i.atRiskData).map(d => (
              <div>
                <Heading level={4}>{d.code}</Heading>
                {d.scores
                  .sort((a, b) => (a.proportion > b.proportion ? -1 : 1))
                  .map(s => (
                    <div>
                      <FormattedMessage
                        {...rootMessages['people-at-risk'][s.people_code]}
                      />
                      <span>{`: ${s.proportion}`}</span>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}

CountryPeople.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default CountryPeople;
