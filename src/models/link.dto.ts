import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from '@nestjs/class-validator';

export class LinkDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  originalLink: string;
};