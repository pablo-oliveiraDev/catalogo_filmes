import { ApiProperty } from '@nestjs/swagger';

export class FilmsDTO {
    id?: number;
    @ApiProperty()
    title: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    releaseDate: Date;
    @ApiProperty()
    director: string;
    createdBy: number;
    createdAt: Date;
}
export class updateFilmsDTO {
    id?: number;
    @ApiProperty()
    title?: string;
    @ApiProperty()
    description?: string;
    @ApiProperty()
    releaseDate?: Date;
    @ApiProperty()
    director?: string;
    
}
