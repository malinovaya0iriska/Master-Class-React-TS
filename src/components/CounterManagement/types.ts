export type CounterManagementProps = {
  ownerName: string;
};
export type CounterManagementState = {
  currentUserID: number;
  users: UserType[];
};

export type UserTypeAPI = {
  data: UserType;
};

export type UserType = {
  avatar: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
};
