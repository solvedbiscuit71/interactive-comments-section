import React from 'react';
import { CommentsProps } from '../interfaces/DataProps';
import Comment from './cards/Comment';
import Reply from './cards/Reply';

const Section:React.FC<CommentsProps> = (props) => {
  return (
    <section className='comment-section'>
      <Comment {...props}/>
      {
        props.replies.length !== 0 &&
        <section className='reply-section'>
          {props.replies.map(reply => <Reply key={reply.id} {...reply}/>)}
        </section>
      }
    </section>
  );
}

export default Section;