import {
    TokenExpiredError
} from 'jsonwebtoken';
import {
    HttpException, HttpStatus, Injectable
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";


@Injectable()
export class JWTGuard extends AuthGuard('jwt') {
    handleRequest(err, user, info: Error) {
        if (err || info || !user) {
            if (info instanceof TokenExpiredError) {
                throw new HttpException(info.message, HttpStatus.UNAUTHORIZED);
            }

            if (!user) {
                throw new HttpException("User not exists", HttpStatus.UNAUTHORIZED);
            }

            throw new HttpException(info.message || err, HttpStatus.UNAUTHORIZED);
        }

        return user;
    }
}