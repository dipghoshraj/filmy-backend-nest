import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';

import {IsEmail, Length, Matches, IsString, IsDateString, Min, IsNumber} from 'class-validator'

export class CreateUserDto {

    @ApiProperty()
    @Matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, { message: 'Invalid mobile number' })
    mobile: string;

    @ApiProperty()
    @Length(3, 20, {message: 'Please enter username from 3 to 20 character'})
    username: string;

    @ApiProperty()
    @IsEmail({}, {message: 'Please enter valid email address'})
    email: string;

    @ApiProperty()
    @Length(3, 20, {message: 'Please enter first Name'})
    firstName: string;

    
    @ApiProperty()
    @Length(3, 20, {message: 'Please enter last Name'})
    lastName: string;

    @ApiProperty()
    @IsDateString()
    dateOfBirth: Date;

    @ApiProperty()
    @IsString()
    city: string;

    @ApiProperty()
    @Length(10, 500)
    about_info: string;

    @ApiProperty()
    @IsNumber()
    @Min(10)
    age: number;
}

export class SendUserDto {

    @ApiProperty()
    @Matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, { message: 'Invalid mobile number' })
    mobile: string;
}


export class ValidateOtpDto {

    @ApiProperty()
    @Matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, { message: 'Invalid mobile number' })
    mobile: string;

    @ApiProperty()
    @Length(6, 6, {message: 'plese enter otp'})
    otp: string;
}