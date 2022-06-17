import { UserType } from 'components/CounterManagement/types';

export const hasUserAlreadyFetched = (users: UserType[], userID: number): boolean =>
  !!users.find(user => user.id === userID);
