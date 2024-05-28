import type { IUser } from './user.interface';

export interface ILoginParams {
  username: string;
  password: string;
}

export interface ILoginResponse {
  user: IUser;
  token: string;
}
