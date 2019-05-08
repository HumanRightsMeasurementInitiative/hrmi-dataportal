import styled from 'styled-components';
import Button from 'styled/Button';

/**
 * @component
 * Standard link, consistent with global 'a' of global-styles.js
 *
 */
export default styled(Button)`
  text-decoration: underline;
  &:focus {
    outline: 0;
  }
`;
