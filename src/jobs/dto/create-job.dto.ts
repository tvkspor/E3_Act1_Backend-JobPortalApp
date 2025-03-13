import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import mongoose from 'mongoose';

class Company {
  @IsNotEmpty()
  _id: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  name: string;
}

export class CreateJobDto {
  @IsNotEmpty({ message: 'Ten khong duoc de trong' })
  name: string;

  @IsArray({ message: 'Skills phai la array' })
  @IsNotEmpty({ message: 'Skills khong duoc de trong' })
  @IsString({ each: true, message: 'Thanh phan phai la string' })
  skills: string[];

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Company)
  company: Company;

  @IsNotEmpty({ message: 'Luong khong duoc de trong' })
  salary: number;

  @IsNotEmpty({ message: 'So luong khong duoc de trong' })
  quantity: number;

  @IsNotEmpty({ message: 'Trinh do khong duoc de trong' })
  level: string;

  @IsNotEmpty({ message: 'Mo ta khong duoc de trong' })
  description: string;

  @IsNotEmpty({ message: 'Ngay bat dau khong duoc de trong' })
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'Phai la dinh dang ngay' })
  startDate: Date;

  @IsNotEmpty({ message: 'ngay ket thuc duoc de trong' })
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'Phai la dinh dang ngay' })
  endDate: Date;

  @IsNotEmpty({ message: 'Trang thai khong duoc de trong' })
  @IsBoolean({ message: 'Phai la dang boolean' })
  isActive: Boolean;
}
