import * as React from "react";
import DataProps from "../interfaces/DataProps";
import Section from "./Section";
import UserContext from "../contexts/UserContext";
import Wrapper from "../styles/Wrapper";
import theme from "../styles/Theme";
import { Global, ThemeProvider } from "@emotion/react";
import { useState, useEffect } from "react";

const App: React.FC = () => {
  const [data, setData] = useState<DataProps | null>(null);
  useEffect(() => {
    fetch("data.json")
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Global
        styles={`
      @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap');

      *,*::before,*::after {
        box-sizing: border-box;
      }

      html,body {
        font-family: 'Rubik';
        margin: 0;
        padding: 0;
        background-color: ${theme.bg.wrapper};
        min-height: 100vh;
      }
      `}
      />

      <ThemeProvider theme={theme}>
        <Wrapper>
          {data && (
            <UserContext.Provider value={data.currentUser}>
              {data.comments.map((comment) => {
                return <Section key={comment.id} {...comment} />;
              })}
            </UserContext.Provider>
          )}
        </Wrapper>
      </ThemeProvider>
    </>
  );
};

export default App;
