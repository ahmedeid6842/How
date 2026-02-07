import { Exclude, Expose, Type } from 'class-transformer';
import { UserDto } from 'src/modules/auth/dto/user.dto';


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
    created_at: Date;

    @Expose()
    @Type(() => UserDto)
    author: UserDto;
}