import styled from "@emotion/styled";

interface Props {
  modifier?: "primary" | "secondary" | "ghost" | undefined;
}

export default styled.button<Props>((props) => ({
  width: "6.5em",
  minHeight: "3em",

  backgroundColor:
    props.modifier === undefined
      ? props.theme.bg.button.primary
      : props.theme.bg.button[props.modifier],
  border: "none",
  borderRadius: ".625em",
  color: "white",

  fontSize: "1rem",
  fontWeight: 500,
  textTransform: "uppercase",
}));
