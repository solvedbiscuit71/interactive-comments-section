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

function getTimeStamp(createAt: number) {
  const differ = Date.now() - createAt

  const second = Math.floor(differ / 1000)
  const minute = Math.floor(second / 60)
  const hour = Math.floor(minute / 60)
  const day = Math.floor(hour / 24)
  const week = Math.floor(day / 7)
  const month = Math.floor(week / 4)
  const year = Math.floor(month / 12)
  console.log([second,minute,hour,day,month,year])
  return [second,minute,hour,day,month,year];
}

function getCreateAt(createAt: number) {
  const keys = ['second','minute','hour','day','week','month','year']
  const values = getTimeStamp(createAt)

  const index = values.reduce((i,value) => {
    if (value !== 0) {
      return i + 1
    }
    return i
  },-1)

  if (index === -1) {
    return "few seconds ago"
  }
  return values[index] + ' ' + keys[index] + ( values[index] === 1 ? '' : 's' ) + ' ago'
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
    props.onUpdate(null, content);
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
            <h1>
              {props.user.username}
              {currentUser.username === props.user.username && <Tag>you</Tag>}
            </h1>
            <span>{getCreateAt(props.createdAt)}</span>
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
