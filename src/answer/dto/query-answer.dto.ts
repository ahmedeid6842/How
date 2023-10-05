import { IsOptional, IsString, IsDateString, IsUUID } from 'class-validator';

export class QueryAnswernDto {
  @IsOptional()
  @IsUUID()
  questionId?: string;

  @IsOptional()
  @IsUUID()
  respondentId?: string;

  @IsOptional()
  @IsUUID()
  answerId?: string;


  @IsOptional()
  @IsString()
  answer?: string;

}