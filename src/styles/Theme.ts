declare module "@emotion/react" {
  export interface Theme {
    bg: {
      button: string;
      card: string;
      tag: string;
      vote: string;
      wrapper: string;
    };
    color: {
      border: string;
    };
    text: {
      badge: {
        primary: string;
        secondary: string;
      };
      button: string;
      heading: string;
      para: string;
      vote: string;
    };
  }
}

const theme = {
  bg: {
    button: "#5457b6",
    card: "#ffffff",
    tag: "#5457b6",
    vote: "#f5f6fa",
    wrapper: "#f5f6fa",
  },
  color: {
    border: "#eaecf1",
  },
  text: {
    badge: {
      primary: "#5457b6",
      secondary: "#ed6468",
    },
    button: "#ffffff",
    heading: "#324152",
    para: "#67727e",
    vote: "#5457b6",
  },
};

export default theme;
