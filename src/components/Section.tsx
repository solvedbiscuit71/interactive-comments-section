import Comment from "./cards/Comment";
import React from "react";
import Reply from "./cards/Reply";
import SectionWrapper from "../styles/wrappers/SectionWrapper";
import { CommentsProps } from "../interfaces/DataProps";

interface Props {
  onReply: (content: string, replyingTo: string, commentId: number) => void;
}

const Section: React.FC<CommentsProps & Props> = (props) => {
  const handleReply = (content: string, replyingTo: string) => {
    props.onReply(content, replyingTo, props.id);
  };

  return (
    <SectionWrapper>
      <Comment {...props} onReply={handleReply} />
      {props.replies.length !== 0 && (
        <SectionWrapper isReply={true}>
          {props.replies.map((reply) => (
            <Reply key={reply.id} {...reply} onReply={handleReply} />
          ))}
        </SectionWrapper>
      )}
    </SectionWrapper>
  );
};

export default Section;
