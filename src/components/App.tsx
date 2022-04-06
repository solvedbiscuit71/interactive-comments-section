import * as React from "react";
import DataProps, { CommentsProps, ReplyProps } from "../interfaces/DataProps";
import Section from "./Section";
import UserContext from "../contexts/UserContext";
import Wrapper from "../styles/wrappers/Wrapper";
import theme from "../styles/Theme";
import { Global, ThemeProvider } from "@emotion/react";
import { useState, useEffect } from "react";
import CommentInput from "./inputs/CommentInput";
import Modal from "./cards/Modal";

const key = 'commentData'
interface DeleteProps {
  commentId: number;
  replyId: number | null;
}

const App: React.FC = () => {
  const [data, setData] = useState<DataProps | null>(null);
  const [toDelete, setDelete] = useState<DeleteProps | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(key) !== null) {
      setData(JSON.parse(localStorage.getItem(key)!))
    } else {
      fetch("data.json")
        .then((res) => res.json())
        .then((res) => { 
          localStorage.setItem(key,JSON.stringify(res))
          setData(res) 
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const createComment = (content: string) => {
    if (data !== null) {
      const newId = data.comments.length + 1;
      const newComment: CommentsProps = {
        id: newId,
        content: content,
        createdAt: Date.now() - 1,
        score: 0,
        user: data?.currentUser,
        replies: [],
      };
      setData((oldData) => {
        let newData = JSON.parse(JSON.stringify(oldData));
        newData.comments.push(newComment);
        localStorage.setItem(key,JSON.stringify(newData))
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
        createdAt: Date.now() - 1,
        user: data.currentUser,
        score: 0,
      };

      setData((oldData) => {
        let newData = JSON.parse(JSON.stringify(oldData));
        newData.comments[commentId - 1].replies.push(newReply);
        localStorage.setItem(key,JSON.stringify(newData))
        return newData;
      });
    }
  };

  const deleteComment = (confirm: boolean) => {
    setShowModal(false);

    if (confirm && toDelete !== null) {
      if (toDelete.replyId === null) {
        setData((oldData) => {
          let newData: DataProps = JSON.parse(JSON.stringify(oldData));
          newData.comments = newData.comments.filter(
            (comment) => comment.id !== toDelete.commentId
          );
          localStorage.setItem(key,JSON.stringify(newData))
          return newData;
        });
      } else {
        setData((oldData) => {
          let newData: DataProps = JSON.parse(JSON.stringify(oldData));
          newData.comments[toDelete.commentId - 1].replies = newData.comments[
            toDelete.commentId - 1
          ].replies.filter((reply) => reply.id !== toDelete.replyId);
          localStorage.setItem(key,JSON.stringify(newData))
          return newData;
        });
      }
    }
    setDelete(null);
  };

  const comfirmDelete = (commentId: number, replyId: number | null) => {
    setDelete({
      commentId: commentId,
      replyId: replyId,
    });
    setShowModal(true);
  };

  const editComment = (
    commentId: number,
    replyId: number | null,
    newContent: string
  ) => {
    setData((oldData) => {
      let newData: DataProps = JSON.parse(JSON.stringify(oldData));
      if (replyId === null) {
        newData.comments[commentId - 1].createdAt = Date.now() - 1
        newData.comments[commentId - 1].content = newContent;
      } else {
        newData.comments[commentId - 1].replies[replyId - 1].createdAt = Date.now() - 1
        newData.comments[commentId - 1].replies[replyId - 1].content = newContent;
      }
      localStorage.setItem(key,JSON.stringify(newData))
      return newData;
    });
  };

  const handleVote = (
    commentId: number,
    replyId: number | null,
    type: "up" | "down"
  ) => {
    setData((oldData) => {
      let newData: DataProps = JSON.parse(JSON.stringify(oldData));
      let comment = newData.comments[commentId - 1];
      switch (type) {
        case "up":
          if (replyId === null) {
            if (comment.voted === false) {
              comment.score++;
              comment.voted = true;
            }
          } else {
            if (comment.replies[replyId - 1].voted === false) {
              comment.replies[replyId - 1].score++;
              comment.replies[replyId - 1].voted = true;
            }
          }
          break;
        case "down":
          if (replyId === null) {
            if (comment.voted === true) {
              comment.score--;
              comment.voted = false;
            }
          } else {
            if (comment.replies[replyId - 1].voted === true) {
              comment.replies[replyId - 1].score--;
              comment.replies[replyId - 1].voted = false;
            }
          }
          break;
      }
      localStorage.setItem(key,JSON.stringify(newData))
      return newData;
    });
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
                    onDelete={comfirmDelete}
                    onVote={handleVote}
                    onUpdate={editComment}
                  />
                );
              })}
              <CommentInput onSend={createComment} />
            </UserContext.Provider>
          )}
        </Wrapper>
        <Modal show={showModal} onDelete={deleteComment} />
      </ThemeProvider>
    </>
  );
};

export default App;
