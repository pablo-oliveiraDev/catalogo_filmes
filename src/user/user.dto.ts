import { ApiProperty } from '@nestjs/swagger';

import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class UserDTO {
    
    id?: number;
    @ApiProperty()
    @IsString()
    @IsNotEmpty() // Verifica se não está vazio
    username: string;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;
}
