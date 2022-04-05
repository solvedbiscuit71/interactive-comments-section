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
      <div>
        <img
          src={currentUser.image.webp}
          alt={`${currentUser.username}'s avatar`}
        />
        <Button onClick={handleClick}>SEND</Button>
      </div>
    </CommentInputWrapper>
  );
};

export default CommentInput;
