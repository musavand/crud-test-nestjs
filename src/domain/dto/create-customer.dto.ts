/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail,  IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({ description: 'FirstName' })
  @IsNotEmpty({ message: 'Enter First Name' })
  @IsString()
  FirstName: string;

  @ApiProperty({ description: 'LastName' })
  @IsNotEmpty({ message: 'Enter Last Name' })
  @IsString()
  LastName: string;

  @ApiProperty({ description: 'DateOfBirth' })
  @IsNotEmpty({ message: 'Enter DateOfBirth' })
  @IsDate()
  DateOfBirth: Date;

  @ApiProperty({ description: 'PhoneNumber' })
  @IsNotEmpty({ message: 'Enter PhoneNumber' })
  @IsString()
  PhoneNumber: string;

  @ApiProperty({ description: 'Email' })
  @IsNotEmpty({ message: 'Enter Email' })
  @IsEmail()
  Email: string;


  @ApiProperty({ description: 'BankAccountNumber' })
  @IsNotEmpty({ message: 'Enter BankAccountNumber' })
  @IsString()
  BankAccountNumber: string;
}
