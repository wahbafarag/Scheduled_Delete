import { TokenSourceEnum, TokenTypeEnum, UserRolesEnum } from '../enums/enums';

export interface TokenPayload {
  userId: string;
  email: string;
  source: TokenSourceEnum;
  token_type: TokenTypeEnum;
  role: UserRolesEnum;
  token: string;

  getTokenPayload(): {
    userId: string;
    email: string;
    source: TokenSourceEnum;
    role: UserRolesEnum;
    token_type: TokenTypeEnum;
    token: string;
  };
}
