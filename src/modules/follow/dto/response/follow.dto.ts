import { Exclude, Expose, Type } from 'class-transformer';
import { UserDto } from 'src/modules/auth/dto/response/user.dto';


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