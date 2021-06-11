import { UserModel } from '../user/models/User.model';


export interface RefreshRequest {
  user: UserModel;
  refresh_token: string;
}
