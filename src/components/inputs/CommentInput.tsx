import React, { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";
import Button from "../../styles/components/Button";
import CommentInputWrapper from "../../styles/wrappers/CommentInputWrapper";

interface Props {
  onSend: (content: string) => void;
}

const CommentInput: React.FC<Props> = (props) => {
  const [content, setContent] = useState<string>("");
  const currentUser = useContext(UserContext);

  const handleClick = () => {
    if (content.length === 0) {
      return
    }
    props.onSend(content);
    setContent("");
  };

  return (
    <CommentInputWrapper>
      <textarea
        name="content"
        value={content}
        placeholder="Add a comment..."
        onChange={(event) => setContent(event.target.value)}
      ></textarea>
      <img
        src={currentUser.image.webp}
        alt={`${currentUser.username}'s avatar`}
      />
      <Button onClick={handleClick}>SEND</Button>
    </CommentInputWrapper>
  );
};

export default CommentInput;
