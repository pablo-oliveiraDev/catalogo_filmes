import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserFromJwt } from 'auth/models/UserFromJwt';
import { AuthPayloadDTO } from 'auth/models/authPayload';
import { ExtractJwt, Strategy } from 'passport-jwt';



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: AuthPayloadDTO): Promise<UserFromJwt> {
        return {
            id: payload.sub,
            username: payload.username,
        };
    }
}
