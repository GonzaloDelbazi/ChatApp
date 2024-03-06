export interface Room {
  roomId: string;
  messages: Messages[];
  lastMsg: string;
  collaborators: string[];
}

export type Messages = {
  _id: string;
  createdAt: string;
  text: string;
  user: {
    _id: string;
    avatar: string;
  };
};
