import React from 'react';
import { CommentsProps } from '../interfaces/DataProps';
import SectionWrapper from '../styles/SectionWrapper';
import Comment from './cards/Comment';
import Reply from './cards/Reply';

const Section:React.FC<CommentsProps> = (props) => {
  return (
    <SectionWrapper>
      <Comment {...props}/>
      {
        props.replies.length !== 0 &&
        <SectionWrapper isReply={true}>
          {props.replies.map(reply => <Reply key={reply.id} {...reply}/>)}
        </SectionWrapper>
      }
    </SectionWrapper>
  );
}

export default Section;