export interface ICreateUserParams {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
}

export interface IUpdateUserParams {
  userId: string;
  firstname?: string;
  lastname?: string;
  username?: string;
}

export interface IUpdateUserPasswordParams {
  userId: string;
  currentPassword: string;
  newPassword: string;
}

export interface IDeleteUserParams {
  userId: string;
}
