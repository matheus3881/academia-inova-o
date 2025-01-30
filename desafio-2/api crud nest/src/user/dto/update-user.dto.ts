import { PartialType } from '@nestjs/mapped-types';
import { AcademicData, CreateUserDto, Emergency, ResidentialData } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UpdateResidentialDto extends PartialType(ResidentialData){}


export class UpdateAcademicDto extends PartialType(AcademicData){}


export class UpdateEmergencyDto extends PartialType(Emergency){}