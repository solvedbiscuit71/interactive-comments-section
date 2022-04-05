import styled from "@emotion/styled";

export default styled.div((props) => ({
  backgroundColor: props.theme.bg.card,
  borderRadius: "1em",

  padding: "1em",
  position: "relative",

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
  },

  ".action": {
    display: "flex",
    gap: "1em",

    position: "absolute",
    bottom: "1.625em",
    right: "1em",
  },
}));
