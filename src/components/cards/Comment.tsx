import Badge from "../../styles/components/Badge";
import CardWrapper from "../../styles/wrappers/CardWrapper";
import React, { useContext, useState } from "react";
import Tag from "../../styles/components/Tag";
import UserContext from "../../contexts/UserContext";
import Vote from "../../styles/components/Vote";
import { CommentProps } from "../../interfaces/DataProps";
import ReplyInput from "../inputs/ReplyInput";
import Button from "../../styles/components/Button";

interface Props {
  onReply: (content: string, replyingTo: string) => void;
  onDelete: (replyId: number | null) => void;
  onVote: (replyId: number | null, type: "up" | "down") => void;
  onUpdate: (replyId: number | null, newContent: string) => void;
}

const Comment: React.FC<CommentProps & Props> = (props) => {
  const [reply, setReply] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [content, setContent] = useState(props.content);
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

  const handleUpdate = () => {
    props.onUpdate(null,content)
    setEdit(false);
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
          {edit ? (
            <div className="edit">
              <textarea
                name="content"
                value={content}
                placeholder="Add a comment..."
                onChange={(event) => setContent(event.target.value)}
              ></textarea>
              <Button onClick={handleUpdate}>UPDATE</Button>
            </div>
          ) : (
            <p>{props.content}</p>
          )}
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
            <Badge modifier="primary" onClick={(_) => setEdit(true)}>
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
