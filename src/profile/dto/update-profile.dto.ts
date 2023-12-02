import { IsOptional, IsString, Length } from "class-validator";
import { BasePartialProfileDto } from "./base-partial-profile.dto";

export class UpdateProfileDto extends BasePartialProfileDto {
    @IsString({ message: 'name must be a string' })
    @Length(5, 100, { message: 'name must be between 5 and 100 characters' })
    @IsOptional()
    name: string;
}