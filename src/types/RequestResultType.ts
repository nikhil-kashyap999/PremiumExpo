export type RequestsSenderType = {
  _id: string;
  avatarUrl: string;
  email: string;
  username: string;
};

export type RequestsType = {
  requestId: string;
  sender: RequestsSenderType;
  status: string;
};
