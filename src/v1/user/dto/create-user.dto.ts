import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';

import {IsNotEmpty, IsEmail, Length, Matches, isEmail, IsString, IsArray, IsEnum, IsDate} from 'class-validator'

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
    @IsDate({message: 'Please enter your DOB'})
    dateOfBirth: Date;
}
