import { IsBoolean, MaxLength } from 'class-validator';

export class CollectionDto {
    @MaxLength(15)
    name: string;

    @IsBoolean()
    isFinished: boolean;
}
