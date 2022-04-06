import styled from "@emotion/styled";

interface Props {
  show: boolean;
}

export default styled.div<Props>((props) => ({
  width: "100vw",
  minHeight: "100vh",

  display: props.show ? "grid" : "none",
  placeContent: "center",
  position: "fixed",
  top: 0,
  left: 0,
  
  backgroundColor: 'hsla(0,0%,0%,.5)',
  '.modal': {
    backgroundColor: 'white',
    borderRadius: '.625em',
    width: 'min(91.5vw,400px)',
    minHeight: 252,
    padding: '2em',
    'h1': {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: props.theme.text.heading,
      margin: 0
    },
    'p': {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: '1.375em',
      color: props.theme.text.para,
      margin: '1.375em 0'
    },

    '&-action': {
      display: 'flex',
      gap: '.875em',
      '> *': {
        flexGrow: 1
      }
    }
  }
}));
