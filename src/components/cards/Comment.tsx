import React from 'react';
import { CommentProps } from '../../interfaces/DataProps';

const Comment:React.FC<CommentProps> = (props) => {
  return (
    <div>
      <div>
        <div>
          <img src={props.user.image.webp} alt={`${props.user.username}'s avatar`} />
          <h2>{props.user.username}</h2>
          <span>{props.createdAt}</span>
        </div>
        <p>{props.content}</p>
      </div>
      <div>
        <img src="images/icon-plus.svg" alt="plus icon" />
        <span>{props.score}</span>
        <img src="images/icon-minus.svg" alt="minus icon" />
      </div>
      <div>
        <img src="images/icon-reply.svg" alt="reply icon" />
        <span>Reply</span>
      </div>
    </div>
  );
}

export default Comment;