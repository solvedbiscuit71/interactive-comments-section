import * as React from "react";
import DataProps, { CommentsProps, ReplyProps } from "../interfaces/DataProps";
import Section from "./Section";
import UserContext from "../contexts/UserContext";
import Wrapper from "../styles/wrappers/Wrapper";
import theme from "../styles/Theme";
import { Global, ThemeProvider } from "@emotion/react";
import { useState, useEffect } from "react";
import CommentInput from "./inputs/CommentInput";

const App: React.FC = () => {
  const [data, setData] = useState<DataProps | null>(null);
  useEffect(() => {
    fetch("data.json")
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, []);

  const createComment = (content: string) => {
    if (data !== null) {
      const newId = data.comments.length + 1;
      const newComment: CommentsProps = {
        id: newId,
        content: content,
        createdAt: "a few seconds ago",
        score: 0,
        user: data?.currentUser,
        replies: [],
      };
      setData((oldData) => {
        let newData = JSON.parse(JSON.stringify(oldData))
        newData.comments.push(newComment);
        return newData;
      });
    }
  };

  const createReply = (
    content: string,
    replyingTo: string,
    commentId: number
  ) => {
    if (data !== null) {
      const newId = data.comments[commentId - 1].replies.length + 1;
      const newReply: ReplyProps = {
        id: newId,
        content: content,
        replyingTo: replyingTo,
        createdAt: "a few seconds ago",
        user: data.currentUser,
        score: 0,
      };

      setData((oldData) => {
        let newData = JSON.parse(JSON.stringify(oldData))
        newData.comments[commentId - 1].replies.push(newReply);
        return newData;
      });
    }
  };

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
                return (
                  <Section
                    key={comment.id}
                    {...comment}
                    onReply={createReply}
                  />
                );
              })}
              <CommentInput onSend={createComment} />
            </UserContext.Provider>
          )}
        </Wrapper>
      </ThemeProvider>
    </>
  );
};

export default App;
