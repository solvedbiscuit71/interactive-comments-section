import Badge from "../../styles/components/Badge";
import CardWrapper from "../../styles/wrappers/CardWrapper";
import React, { useContext, useState } from "react";
import Tag from "../../styles/components/Tag";
import UserContext from "../../contexts/UserContext";
import Vote from "../../styles/components/Vote";
import { ReplyProps } from "../../interfaces/DataProps";
import ReplyInput from "../inputs/ReplyInput";
import Button from "../../styles/components/Button";

interface Props {
  onReply: (content: string, replyingTo: string) => void;
  onDelete: (replyId: number | null) => void;
  onVote: (replyId: number | null, type: "up" | "down") => void;
  onUpdate: (replyId: number | null, newContent: string) => void;
}

const Reply: React.FC<ReplyProps & Props> = (props) => {
  const [reply, setReply] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [content, setContent] = useState(
    `@${props.replyingTo}, ${props.content}`
  );
  const currentUser = useContext(UserContext);

  const handleReply = (content: string) => {
    props.onReply(content, props.user.username);
    setReply(false);
  };

  const handleVote = (type: "up" | "down") => {
    if (currentUser.username === props.user.username) {
      return;
    }
    props.onVote(props.id, type);
  };

  const handleUpdate = () => {
    const trimContent = content.slice(props.replyingTo.length + 3).trim();
    props.onUpdate(props.id, trimContent);
    setEdit(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();

    const newContent = event.target.value;
    if (
      newContent.slice(0, props.replyingTo.length + 3) ===
        "@" + props.replyingTo + ", " &&
      newContent.length > props.replyingTo.length + 2
    ) {
      setContent(newContent);
    }
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
                onChange={handleChange}
              ></textarea>
              <Button onClick={handleUpdate}>UPDATE</Button>
            </div>
          ) : (
            <p>
              <span>@{props.replyingTo}</span>
              {props.content}
            </p>
          )}
        </div>
        <Vote
          className="vote"
          disable={props.user.username === currentUser.username}
        >
          <svg
            onClick={(_) => handleVote("up")}
            width="11"
            height="11"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
              fill="#C5C6EF"
            />
          </svg>
          <span>{props.score}</span>
          <svg
            onClick={(_) => handleVote("down")}
            width="11"
            height="3"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
              fill="#C5C6EF"
            />
          </svg>
        </Vote>
        {currentUser.username === props.user.username ? (
          <div className="action">
            <Badge
              modifier="secondary"
              onClick={(_) => props.onDelete(props.id)}
            >
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

export default Reply;
