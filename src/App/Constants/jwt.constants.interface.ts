export type TLogin = {
  id: string;
  password: string;
};

export type TLoginResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type TRefreshTokenResponse = {
  accessToken?: string;
  refreshToken?: string;
};
