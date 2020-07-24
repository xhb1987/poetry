import { IsNotEmpty, IsString, Max, MaxLength, Min } from 'class-validator';

export class UserDto {
    @MaxLength(20)
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    // @Min(8)
    password: string;
}
