import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { Prisma, userType } from '@prisma/client';



export class UserResponse{
    id: number;
    email:string;
    mobile:string;
    username:string;

    age?: number;
    gender?: string;
    firstName?: string;
    lastName?: string;

    about_info?: string;
    tagline?: string;
    experience?: string;
    address?: string;
    occupation?: string;
    profile_pic?: string;
    city_name?: string;

    date_of_birth?: Date;
    datails?: any;
    usertype: userType[]


    static userPublic(): Prisma.userSelect{
        return {
            id: true,
            email: true,
            username: true,
            mobile: true,
        }
    }

    static userprofile(): Prisma.userSelect{

        return {
            id: true,
            email: true,
            username: true,
            mobile: true,

            age: true,
            about_info: true,
            gender: true,
            firstName: true,
            lastName: true,

            tagline: true,
            date_of_birth: true,
            datails: true
        }
    }
}