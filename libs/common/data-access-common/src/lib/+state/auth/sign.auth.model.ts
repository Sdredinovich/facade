export interface SignAuthPayload {
  login: string;
  password: string;
}

export interface SignAuthUser {
  authToken: string;
  user: User;
}

export type User = {
  login: string;
  email: string;
  name: string;
  id: number;
  city: string;
}
