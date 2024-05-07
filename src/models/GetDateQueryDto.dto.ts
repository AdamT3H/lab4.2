import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDate, ValidateNested } from '@nestjs/class-validator';
import { Transform, Type, plainToClass } from 'class-transformer';
import { IsObject } from 'class-validator';

export class GetDateQueryExpiredAtDto {
  @ApiProperty({ type: Date })
  @IsDate()
  @Type(() => Date)
  gt: Date;

  @ApiProperty({ type: Date })
  @IsDate()
  @Type(() => Date)
  lt: Date;
};

export class GetDateQueryDto {
  @ApiProperty({ type: Date })
  @Transform(({ value }) => {
    return plainToClass(GetDateQueryExpiredAtDto, JSON.parse(value))
  })

  @IsObject()
  expiredAt: GetDateQueryExpiredAtDto;
};

