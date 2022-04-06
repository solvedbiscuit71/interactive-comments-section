import Badge from "../../styles/components/Badge";
import CardWrapper from "../../styles/wrappers/CardWrapper";
import React, { useContext, useState } from "react";
import Tag from "../../styles/components/Tag";
import UserContext from "../../contexts/UserContext";
import Vote from "../../styles/components/Vote";
import { CommentProps } from "../../interfaces/DataProps";
import ReplyInput from "../inputs/ReplyInput";

interface Props {
  onReply: (content: string, replyingTo: string) => void;
  onDelete: (replyId: number | null) => void;
  onVote: (replyId: number | null, type: "up" | "down") => void;
}

const Comment: React.FC<CommentProps & Props> = (props) => {
  const [reply, setReply] = useState<boolean>(false);
  const currentUser = useContext(UserContext);

  const handleReply = (content: string) => {
    props.onReply(content, props.user.username);
    setReply(false);
  };

  const handleVote = (type: "up" | "down") => {
    if (currentUser.username === props.user.username) {
      return;
    }
    props.onVote(null, type);
  };

  return (
    <CardWrapper>
      <div className="card">
        <div className="hero">
          <div className="flex">
            <img
              src={props.user.image.webp}
              alt={`${props.user.username}'s avatar`}
            />
            <h2>
              {props.user.username}
              {currentUser.username === props.user.username && <Tag>you</Tag>}
            </h2>
            <span>{props.createdAt}</span>
          </div>
          <p>{props.content}</p>
        </div>
        <Vote className="vote">
          <img
            src="images/icon-plus.svg"
            alt="plus icon"
            onClick={(_) => handleVote("up")}
          />
          <span>{props.score}</span>
          <img
            src="images/icon-minus.svg"
            alt="minus icon"
            onClick={(_) => handleVote("down")}
          />
        </Vote>
        {currentUser.username === props.user.username ? (
          <div className="action">
            <Badge modifier="secondary" onClick={(_) => props.onDelete(null)}>
              <img src="images/icon-delete.svg" alt="delete icon" />
              <span>Delete</span>
            </Badge>
            <Badge modifier="primary">
              <img src="images/icon-edit.svg" alt="edit icon" />
              <span>Edit</span>
            </Badge>
          </div>
        ) : (
          <div className="action">
            <Badge modifier="primary" onClick={(_) => setReply(true)}>
              <img src="images/icon-reply.svg" alt="reply icon" />
              <span>Reply</span>
            </Badge>
          </div>
        )}
      </div>
      {reply && (
        <ReplyInput
          onReply={handleReply}
          replyingTo={"@" + props.user.username}
        />
      )}
    </CardWrapper>
  );
};

export default Comment;
