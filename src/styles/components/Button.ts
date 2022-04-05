import styled from "@emotion/styled";

export default styled.button((props) => ({
  width: "6.5em",
  minHeight: "3em",

  backgroundColor: props.theme.bg.button,
  border: "none",
  borderRadius: ".625em",
  color: "white",

  fontSize: "1rem",
  fontWeight: 500,
  textTransform: "uppercase",
}));
