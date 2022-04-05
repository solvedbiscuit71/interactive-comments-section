import styled from '@emotion/styled';

export default styled.span(props => ({
  fontSize: '.85rem',
  fontWeight: 400,
  backgroundColor: props.theme.bg.tag,
  borderRadius: '.25em',

  color: 'white',
  padding: '.025em .375em .15em',
  marginLeft: '.5em',
  verticalAlign: 'center'
}));