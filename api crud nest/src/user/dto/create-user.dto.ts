import {IsDate, IsEmail, IsEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    
    @IsString()
    @IsEmpty()
    name: string;

    @IsDate()
    dateOfBirth: Date;

    @IsNumber()
    age: number

    @IsString()
    gender: string;

    @IsString()
    cpf: string;

    @IsString()
    phone: string;

    @IsEmail()
    email: string;

    @IsString()
    nationality: string;

    @IsString()
    maritalStatus: string;


}

export class ResidentialData {
    @IsString()
    @IsEmpty()
    address: string;


    @IsString()
    @IsEmpty()
    street:string;

    @IsString()
    @IsEmpty()
    complement: string;

    @IsString()
    @IsEmpty()
    neighborhood: string;

    @IsString()
    @IsEmpty()
    city: string;

    @IsString()
    @IsEmpty()
    state: string;

    @IsString()
    @IsEmpty()
    postalCode: string;

    @IsString()
    @IsEmpty()
    country: string;

    // @IsOptional()
    personalData: any;
}


export class AcademicData {
    @IsString()
    registrationNumber: string;

    @IsString()
    course: string;

    @IsNumber()
    yearOfEntry: number;

    @IsNumber()
    currentSemester:number;

    @IsString()
    academicStatus: string;

    @IsNumber()
    gpa: number;


    @IsString()
    educationMode: string;

    personalData: any;

}

export class Emergency {
    @IsString()
    name: string;

    @IsString()
    relationship:string;

    @IsString()
    phone:string;

    @IsString()
    email:string;

    personalData: any;

}
