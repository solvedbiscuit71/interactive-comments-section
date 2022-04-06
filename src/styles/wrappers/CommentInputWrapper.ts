import styled from "@emotion/styled";

export default styled.div((props) => ({
  backgroundColor: props.theme.bg.card,
  borderRadius: ".625em",

  padding: "1em",
  display: "grid",
  gap: "1em",
  alignItems: "center",
  gridTemplateAreas: `
  "textarea textarea"
  "img button"
  `,

  textarea: {
    gridArea: "textarea",
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

    "&:focus,&:hover": {
      borderColor: props.theme.bg.button.primary,
      cursor: "pointer",
      caretColor: props.theme.bg.button.primary,
      outline: "none",
    },
  },

  img: {
    gridArea: "img",
    justifySelf: "flex-start",
    width: "2em",
  },

  button: {
    gridArea: "button",
    justifySelf: "flex-end",
  },

  "@media (min-width: 769px)": {
    padding: "1.5em",
    alignItems: "flex-start",
    gridTemplateColumns: "2.5em 1fr 6.5em",
    gridTemplateAreas: `
    "img textarea button"
    `,

    textarea: {
      justifySelf: "flex-start",
    },

    img: {
      width: "2.5em",
    },
  },
}));
