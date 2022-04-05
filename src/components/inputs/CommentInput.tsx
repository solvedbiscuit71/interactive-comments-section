import React, { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";

interface Props {
  onSend: (content: string) => void;
}

const CommentInput: React.FC<Props> = (props) => {
  const [content, setContent] = useState<string>("");
  const currentUser = useContext(UserContext);

  return (
    <div>
      <textarea
        name="content"
        value={content}
        onChange={(event) => setContent(event.target.value)}
      ></textarea>
      <div>
        <img
          src={currentUser.image.webp}
          alt={`${currentUser.username}'s avatar`}
        />
        <button onClick={(event) => props.onSend(content)}>SEND</button>
      </div>
    </div>
  );
};

export default CommentInput;
