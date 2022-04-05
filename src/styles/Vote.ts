import styled from "@emotion/styled";

export default styled.div((props) => ({
  width: "6.125em",
  minHeight: "2.5em",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "1em",

  backgroundColor: props.theme.bg.vote,
  borderRadius: ".5em",

  span: {
    fontSize: "1rem",
    fontWeight: 500,
    color: props.theme.text.vote,
  },
}));
