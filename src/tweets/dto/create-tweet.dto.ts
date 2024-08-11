import { IsString, Length } from 'class-validator';

export class CreateTweetDto {
  @IsString()
  @Length(1, 200) 
  content: string;
}