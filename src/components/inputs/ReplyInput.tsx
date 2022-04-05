import React, { useState, useContext } from "react";
import UserContext from "../../contexts/UserContext";
import CommentInputWrapper from "../../styles/wrappers/CommentInputWrapper";
import Button from "../../styles/components/Button";

interface Props {
  onReply: (content: string) => void;
  replyingTo: string;
}

const ReplyInput: React.FC<Props> = ({ onReply, replyingTo }) => {
  const [content, setContent] = useState<string>(replyingTo + ", ");
  const currentUser = useContext(UserContext);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();

    const newContent = event.target.value;
    if (
      newContent.slice(0, replyingTo.length) === replyingTo &&
      newContent.length > replyingTo.length + 1
    ) {
      setContent(newContent);
    }
  };

  const handleReply = (event: React.MouseEvent<HTMLButtonElement>) => {
    const trimContent = content.slice(replyingTo.length + 2).trim();
    onReply(trimContent);
  };

  return (
    <CommentInputWrapper>
      <textarea
        name="content"
        value={content}
        placeholder="Add a comment..."
        onChange={handleChange}
      ></textarea>
      <div>
        <img
          src={currentUser.image.webp}
          alt={`${currentUser.username}'s avatar`}
        />
        <Button onClick={handleReply}>REPLY</Button>
      </div>
    </CommentInputWrapper>
  );
};

export default ReplyInput;
