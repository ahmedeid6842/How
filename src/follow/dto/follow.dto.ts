import { Exclude, Expose, Type } from 'class-transformer';
import { UserDto } from 'src/auth/dto/user.dto';


export class FollowDto {
    @Expose()
    id: string;

    @Expose()
    createdAt: Date

    @Expose()
    @Type(() => UserDto)
    follower: UserDto;

    @Expose()
    @Type(() => UserDto)
    user: UserDto;
}