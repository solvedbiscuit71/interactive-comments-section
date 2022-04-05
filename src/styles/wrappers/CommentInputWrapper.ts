import styled from "@emotion/styled";

export default styled.div((props) => ({
  backgroundColor: props.theme.bg.card,
  borderRadius: ".625em",

  padding: "1em",
  textarea: {
    width: "100%",
    minHeight: "6em",

    border: `.125em solid ${props.theme.color.border}`,
    borderRadius: ".625em",
    padding: "1em 1.375em",
    resize: "vertical",

    fontSize: "1rem",
    fontWeight: 400,
    fontFamily: "Rubik",
    color: props.theme.text.heading,

    "&:focus": {
      borderColor: props.theme.text.para,
      outline: "none",
    },
  },
  "> div": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "1em",
    img: {
      width: "2em",
    },
  },
}));
