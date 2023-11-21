import { Transform } from "class-transformer";
import { IsOptional, IsInt, Min } from "class-validator"

export class PaginationDto {
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsInt()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsInt()
    @Min(1)
    limit?: number = 1;
}