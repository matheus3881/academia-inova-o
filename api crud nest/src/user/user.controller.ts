import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AcademicDataSerive, EmergencyDataSerive, ResidentialDataService, UserService } from './user.service';
import { AcademicData, CreateUserDto, ResidentialData, Emergency } from './dto/create-user.dto';
import { UpdateAcademicDto, UpdateEmergencyDto, UpdateResidentialDto, UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const personalData = await this.userService.create(createUserDto);
    return {id: personalData.id};
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

 
}


// rota para dados residenciais
@Controller('residential') 
export class residentialController {

  constructor(private readonly residentialData: ResidentialDataService) {}

  @Post()
  create(@Body() createResidntialDto: ResidentialData) {
    return this.residentialData.create(createResidntialDto);
  }

  @Get()
  findAll() {
    return this.residentialData.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.residentialData.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateResidentialDto: UpdateResidentialDto) {
    return this.residentialData.update(+id, UpdateResidentialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.residentialData.remove(+id);
  }
  
}

// rota para dados academicos
@Controller('academic') 
export class AcademicController {

  constructor(private readonly academicData: AcademicDataSerive) {}

  @Post()
  create(@Body() createAcademicDto: AcademicData) {
    return this.academicData.create(createAcademicDto);
  }

  @Get()
  findAll() {
    return this.academicData.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.academicData.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateAcademicDto: UpdateAcademicDto) {
    return this.academicData.update(+id, UpdateAcademicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.academicData.remove(+id);
  }
  
}


// rota para dados de emergencia
@Controller('emergency') 
export class EmergencyController {

  constructor(private readonly emergency: EmergencyDataSerive) {}

  @Post()
  create(@Body() createEmergencyDto: Emergency) {
    return this.emergency.create(createEmergencyDto);
  }

  @Get()
  findAll() {
    return this.emergency.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emergency.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateEmergencyDto: UpdateEmergencyDto) {
    return this.emergency.update(+id, UpdateEmergencyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emergency.remove(+id);
  }
  
}
