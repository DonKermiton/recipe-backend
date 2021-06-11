import { UserModel } from '../../user/models/User.model';

export interface AuthenticationPayload {
  payload: {
    type: string
    token: string
    refresh_token?: string
  }
}
