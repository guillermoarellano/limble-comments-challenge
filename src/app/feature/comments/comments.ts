export interface User {
  userID: number;
  name: string;
}

export interface UserComment {
  commentID: number;
  comment: string;
  createdBy: User;
  mentions: User[];
  createdDate: string;
}
