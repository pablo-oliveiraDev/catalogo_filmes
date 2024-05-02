import { Request } from 'express';
import { UserDTO } from 'user/user.dto';


export interface AuthRequest extends Request {
    user: UserDTO;
}
