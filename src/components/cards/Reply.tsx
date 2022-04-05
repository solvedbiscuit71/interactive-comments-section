import React, { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import { ReplyProps } from '../../interfaces/DataProps';
import CardWrapper from '../../styles/CardWrapper';

const Reply:React.FC<ReplyProps> = (props) => {
  const currentUser = useContext(UserContext)

  return (
    <CardWrapper>
      <div className='hero'>
        <div className='flex'>
          <img src={props.user.image.webp} alt={`${props.user.username}'s avatar`} />
          <h2>
            {props.user.username}
            { currentUser.username === props.user.username && <span>YOU</span>}
          </h2>
          <span>{props.createdAt}</span>
        </div>
        <p>
          <span>@{props.replyingTo}</span>
          {props.content}
        </p>
      </div>
      <div>
        <img src="images/icon-plus.svg" alt="plus icon" />
        <span>{props.score}</span>
        <img src="images/icon-minus.svg" alt="minus icon" />
      </div>
      {
        currentUser.username === props.user.username ?
        <div>
          <div>
            <img src="images/icon-delete.svg" alt="delete icon" />
            <span>Delete</span>
          </div>
          <div>
            <img src="images/icon-edit.svg" alt="edit icon" />
            <span>Edit</span>
          </div>
        </div>
        :
        <div>
          <img src="images/icon-reply.svg" alt="reply icon" />
          <span>Reply</span>
        </div>
      }
    </CardWrapper>
  );
}

export default Reply;