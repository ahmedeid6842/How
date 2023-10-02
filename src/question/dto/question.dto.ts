import { Exclude, Expose, Type } from 'class-transformer';
import { UserDto } from 'src/auth/dto/user.dto';


export class QuestionDto {
    @Expose()
    id: string;

    @Expose()
    title: string;

    @Expose()
    description: string;

    @Expose()
    likes_count: number;

    @Expose()
    creation_date:Date;

    @Expose()
    @Type(() => UserDto)
    author: UserDto;
}