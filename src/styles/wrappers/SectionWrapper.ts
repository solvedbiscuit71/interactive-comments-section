import styled from "@emotion/styled";

interface Props {
  isReply?: boolean;
}

export default styled("section")<Props>(
  {
    width: "100%",

    display: "flex",
    flexDirection: "column",
    gap: "1em",
  },
  (props) => {
    if (props.isReply !== undefined) {
      return {
        borderLeft: `.125em solid ${props.theme.color.border}`,
        paddingLeft: ".875em",

        "@media (min-width: 769px)": {
          width: 686,
          paddingLeft: "2.625em",
          marginLeft: "2.625em",
        },
      };
    }
  }
);
