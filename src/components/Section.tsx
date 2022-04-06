import Comment from "./cards/Comment";
import React from "react";
import Reply from "./cards/Reply";
import SectionWrapper from "../styles/wrappers/SectionWrapper";
import { CommentsProps } from "../interfaces/DataProps";

interface Props {
  onReply: (content: string, replyingTo: string, commentId: number) => void;
  onDelete: (commentId: number, replyId: number | null) => void;
  onVote: (
    commentId: number,
    replyId: number | null,
    type: "up" | "down"
  ) => void;
  onUpdate: (
    commentId: number,
    replyId: number | null,
    newContent: string
  ) => void;
}

const Section: React.FC<CommentsProps & Props> = (props) => {
  const handleReply = (content: string, replyingTo: string) => {
    props.onReply(content, replyingTo, props.id);
  };

  const handleDelete = (replyId: number | null) => {
    props.onDelete(props.id, replyId);
  };

  const handleVote = (replyId: number | null, type: "up" | "down") => {
    props.onVote(props.id, replyId, type);
  };

  const handleUpdate = (replyId: number | null, newContent: string) => {
    props.onUpdate(props.id, replyId, newContent);
  };

  return (
    <SectionWrapper>
      <Comment
        {...props}
        onReply={handleReply}
        onDelete={handleDelete}
        onVote={handleVote}
        onUpdate={handleUpdate}
      />
      {props.replies.length !== 0 && (
        <SectionWrapper isReply={true}>
          {props.replies.map((reply) => (
            <Reply
              key={reply.id}
              {...reply}
              onReply={handleReply}
              onDelete={handleDelete}
              onVote={handleVote}
              onUpdate={handleUpdate}
            />
          ))}
        </SectionWrapper>
      )}
    </SectionWrapper>
  );
};

export default Section;
