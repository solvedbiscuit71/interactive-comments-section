import styled from '@emotion/styled';

export default styled.div(props => ({
  width: '100%',
  minHeight: '100vh',

  display: 'grid',
  placeContent: 'center',
  backgroundColor: props.theme.bg.wrapper
}));