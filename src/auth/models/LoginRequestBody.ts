import { IsEmail, IsString } from 'class-validator';

export class LoginRequestBody {
    @IsString()
    username: string;

    @IsString()
    password: string;
}
