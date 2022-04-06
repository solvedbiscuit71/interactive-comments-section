import styled from "@emotion/styled";

export default styled.div((props) => ({
  display: "flex",
  flexDirection: "column",
  gap: ".5em",
  ".card": {
    backgroundColor: props.theme.bg.card,
    borderRadius: ".625em",

    padding: "1em",
    position: "relative",
  },

  ".hero": {
    ".flex": {
      display: "flex",
      gap: "1em",
      alignItems: "center",
      justifyContent: "flex-start",

      img: {
        width: "2em",
      },
      h2: {
        fontSize: "1rem",
        fontWeight: 500,
        color: props.theme.text.heading,

        "~ span:last-of-type": {
          color: props.theme.text.para,
        },
      },
    },
    p: {
      color: props.theme.text.para,
      lineHeight: "1.375em",
      "> span:first-of-type": {
        color: props.theme.text.vote,
        fontWeight: 500,
        marginRight: ".25em",
      },
    },
    ".edit": {
      display: "flex",
      gap: "1em",
      flexDirection: "column",
      marginBlock: "1em",

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
          borderColor: props.theme.bg.button.primary,
          caretColor: props.theme.bg.button.primary,
          outline: "none",
        },
      },
      "> button": {
        alignSelf: "flex-end",
      },
    },
  },

  ".action": {
    display: "flex",
    gap: "1em",

    position: "absolute",
    bottom: "1.625em",
    right: "1em",
  },

  "@media (min-width: 769px)": {
    ".card": {
      display: "flex",
      flexDirection: "row-reverse",
      gap: "1.5em",

      padding: "1.5em",
    },

    ".hero": {
      flexGrow: 1,
    },

    ".vote": {
      flexShrink: 0,
    },

    ".action": {
      alignItems: "flex-start",
      maxHeight: "2em",

      right: "1.5em",
      top: "2.25em",
    },
  },
}));
