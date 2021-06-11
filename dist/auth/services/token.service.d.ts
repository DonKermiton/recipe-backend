import { UserModel } from '../../user/models/User.model';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenEntity } from '../entities/refresh-token.entity';
import { Repository } from 'typeorm';
import { UserService } from '../../user/services/user.service';
export declare class TokenService {
    private readonly _jwtService;
    private readonly _refreshTokenRepository;
    private readonly _userService;
    constructor(_jwtService: JwtService, _refreshTokenRepository: Repository<RefreshTokenEntity>, _userService: UserService);
    generateAccessToken(user: UserModel): Promise<string>;
    generateRefreshToken(user: UserModel, expiresIn?: number): Promise<string>;
    createAccessTokenFromRefreshToken(refresh: string): Promise<{
        token: string;
        user: UserModel;
        refreshToken: string;
    }>;
    resolveRefreshToken(encoded: string): Promise<{
        user: UserModel;
        token: RefreshTokenEntity;
    }>;
    findRefreshTokenById(id: number): Promise<RefreshTokenEntity | null>;
    private getUserFromRefreshTokenPayload;
    private getStoredTokenFromRefreshTokenPayload;
    private decodeRefreshToken;
    private createRefreshToken;
}
