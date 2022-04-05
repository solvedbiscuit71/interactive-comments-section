import styled from "@emotion/styled";

interface Props {
  modifier: "primary" | "secondary";
}

export default styled.div<Props>((props) => ({
  color: props.theme.text.badge[props.modifier],

  fontSize: "1rem",
  fontWeight: 500,
  display: "flex",
  gap: ".5em",
  alignItems: "center",
}));
