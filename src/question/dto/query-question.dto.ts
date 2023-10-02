import { IsOptional, IsString, IsDateString, IsUUID } from 'class-validator';

export class QueryQuestionDto {
  @IsOptional()
  @IsUUID()
  questionId?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUUID()
  authorId?: string;

  @IsOptional()
  creationDate?: string;
}