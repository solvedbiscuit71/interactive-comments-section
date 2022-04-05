import Badge from "../../styles/components/Badge";
import CardWrapper from "../../styles/wrappers/CardWrapper";
import React, { useContext } from "react";
import Tag from "../../styles/components/Tag";
import UserContext from "../../contexts/UserContext";
import Vote from "../../styles/components/Vote";
import { ReplyProps } from "../../interfaces/DataProps";

const Reply: React.FC<ReplyProps> = (props) => {
  const currentUser = useContext(UserContext);

  return (
    <CardWrapper>
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
        <p>
          <span>@{props.replyingTo}</span>
          {props.content}
        </p>
      </div>
      <Vote className="vote">
        <img src="images/icon-plus.svg" alt="plus icon" />
        <span>{props.score}</span>
        <img src="images/icon-minus.svg" alt="minus icon" />
      </Vote>
      {currentUser.username === props.user.username ? (
        <div className="action">
          <Badge modifier="secondary">
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
          <Badge modifier="primary">
            <img src="images/icon-reply.svg" alt="reply icon" />
            <span>Reply</span>
          </Badge>
        </div>
      )}
    </CardWrapper>
  );
};

export default Reply;
