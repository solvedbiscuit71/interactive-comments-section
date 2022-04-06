import styled from "@emotion/styled";

export default styled.div((props) => ({
  width: "min(91.5vw,730px)",
  margin: "2em auto",

  display: "flex",
  flexDirection: "column",
  gap: "1em",

  "@media (min-width: 769px)": {
    margin: "4em auto",
  },
}));
