export interface User {
  userID: number;
  name: string;
}

export interface UserComment {
  commentID: number;
  comment: string;
  createdBy: string;
  mentions: User[];
  createdDate: string;
}
