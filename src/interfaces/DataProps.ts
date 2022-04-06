export interface UserProps {
  image: {
    png: string;
    webp: string;
  };
  username: string;
}

export interface CommentProps {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  voted?: boolean;
  user: UserProps;
}

export interface ReplyProps {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  voted?: boolean;
  replyingTo: string;
  user: UserProps;
}

export interface CommentsProps {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  voted?: boolean;
  user: UserProps;
  replies: ReplyProps[];
}

interface DataProps {
  currentUser: UserProps;
  comments: CommentsProps[];
}

export default DataProps;
