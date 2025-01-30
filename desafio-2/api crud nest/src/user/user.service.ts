import { Injectable } from '@nestjs/common';
import { CreateUserDto, ResidentialData, AcademicData, Emergency } from './dto/create-user.dto';
import { UpdateUserDto, UpdateResidentialDto, UpdateAcademicDto, UpdateEmergencyDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';


// class para dados pessoais
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService){}


  create(createUserDto: CreateUserDto) {
    const user = this.prisma.personalData.create ({
      data: createUserDto,
    });
    return user;
  }

  findAll() {
    return this.prisma.personalData.findMany({});
  }

  findOne(id: number) {
    return this.prisma.personalData.findUnique({
      where: {id},
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.prisma.personalData.update ({
      where: {id},
      data: updateUserDto,
    })
    return user;
  }

  remove(id: number) {
    // console.log('ID recebido para deleção:', id); // Log para verificar o valor
    return this.prisma.personalData.delete({
      where: {id},
    });
  }
}


// dados para dados residenciais
@Injectable()
export class ResidentialDataService {
  constructor(private prisma: PrismaService){}


  create(ResidentialData: ResidentialData) {
    const user = this.prisma.residentialData.create ({
      data: ResidentialData,
      
    });
    return user;
  }

  findAll() {
    return this.prisma.residentialData.findMany({});
  }

  findOne(id: number) {
    return this.prisma.residentialData.findUnique({
      where: {id},
    });
  }

  update(id: number, UpdateResidentialDto: UpdateResidentialDto) {
    const user = this.prisma.residentialData.update ({
      where: {id},
      data: UpdateResidentialDto,
    })
    return user;
  }

  remove(id: number) {
    return this.prisma.residentialData.delete({
      where: {id},
    });
  }
}


// dados para dados residenciais
@Injectable()
export class AcademicDataSerive {
  constructor(private prisma: PrismaService){}


  create(academicData: AcademicData) {
    const user = this.prisma.academicData.create ({
      data: academicData,
      
    });
    return user;
  }

  findAll() {
    return this.prisma.academicData.findMany({});
  }

  findOne(id: number) {
    return this.prisma.academicData.findUnique({
      where: {id},
    });
  }

  update(id: number, updateAcademicDto: UpdateAcademicDto) {
    const user = this.prisma.academicData.update ({
      where: {id},
      data: updateAcademicDto,
    })
    return user;
  }

  remove(id: number) {
    return this.prisma.academicData.delete({
      where: {id},
    });
  }
}


// dados para dados de emergencia
@Injectable()
export class EmergencyDataSerive {
  constructor(private prisma: PrismaService){}


  create(emergencyData: Emergency) {
    const user = this.prisma.emergency.create ({
      data: emergencyData,
      
    });
    return user;
  }

  findAll() {
    return this.prisma.emergency.findMany({});
  }

  findOne(id: number) {
    return this.prisma.emergency.findUnique({
      where: {id},
    });
  }

  update(id: number, updateEmergencyDto: UpdateEmergencyDto) {
    const user = this.prisma.academicData.update ({
      where: {id},
      data: updateEmergencyDto,
    })
    return user;
  }

  remove(id: number) {
    return this.prisma.emergency.delete({
      where: {id},
    });
  }
}