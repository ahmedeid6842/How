import { ArrayMaxSize, ArrayMinSize, ArrayUnique, IsArray, IsBoolean, IsOptional, IsString, Length } from "class-validator";
import { UserDto } from "src/auth/dto/user.dto";
import { BasePartialProfileDto } from "./base-partial-profile.dto";

export class CreateProfileDto extends BasePartialProfileDto {
    @IsString({ message: 'name must be a string' })
    @Length(5, 100, { message: 'name must be between 5 and 100 characters' })
    name: string;
}