export interface AuthPayload {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string | null;
}

export interface AuthResponse {
  resultCode: number;
  messages: string[];
  data: {
    id: number;
    email: string;
    login: string;
  };
}

export type AuthUserData = {
  id: number;
  email: string;
  login: string;
};

export type SignLoginResponse = {
  resultCode: number;
  messages: string[];
  data: {
    userId: number;
  };
};
