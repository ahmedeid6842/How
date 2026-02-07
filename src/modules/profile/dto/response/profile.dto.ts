import { Expose, Type } from 'class-transformer';
import { UserDto } from 'src/modules/auth/dto/response/user.dto';

export class ProfileDto {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    bio: string;

    @Expose()
    socialLinks: string[];

    @Expose()
    interests: string[];

    @Expose()
    numQuestionAsked: number;

    @Expose()
    numQuestionAnswered: number;

    @Expose()
    numFollowers: number;

    @Expose()
    numFollowing: number;

    @Expose()
    numLikes: number;

    @Expose()
    isPublic: boolean;

    @Expose()
    @Type(() => UserDto)
    user: UserDto;
}
