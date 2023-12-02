import { ArrayMaxSize, ArrayMinSize, ArrayUnique, IsArray, IsBoolean, IsOptional, IsString, Length } from "class-validator";
import { UserDto } from "src/auth/dto/user.dto";

export class CreateProfileDto {
    @IsString({ message: 'name must be a string' })
    @Length(5, 100, { message: 'name must be between 5 and 100 characters' })
    name: string;

    @IsOptional()
    @IsString({ message: 'Bio must be a string' })
    @Length(10, 500, { message: 'Bio must be between 10 and 500 characters' })
    bio?: string;

    @IsOptional()
    @IsArray({ message: 'Social links must be an array' })
    @ArrayMinSize(1, { message: 'At least one social link is required' })
    @ArrayMaxSize(5, { message: 'Maximum of 5 social links allowed' })
    @ArrayUnique((link: string) => link.toLowerCase(), {
        message: 'Social links must be unique (case insensitive)',
    })
    socialLinks?: string[];

    @IsOptional()
    @IsArray({ message: 'Interests must be an array' })
    @ArrayMinSize(3, { message: 'At least three interests are required' })
    @ArrayMaxSize(10, { message: 'Maximum of 10 interests allowed' })
    @ArrayUnique((interest: string) => interest.toLowerCase(), {
        message: 'Interests must be unique (case insensitive)',
    })
    interests?: string[];

    @IsOptional()
    @IsBoolean()
    isPublic?: boolean;

    user: UserDto;
}