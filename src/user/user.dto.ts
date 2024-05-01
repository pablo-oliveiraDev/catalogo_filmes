import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
    id?: number;
    @ApiProperty()
    username: string;
    @ApiProperty()
    password: string;
}
