import { Module } from '@nestjs/common';
import { AcademicDataSerive, EmergencyDataSerive, ResidentialDataService, UserService } from './user.service';
import { AcademicController, EmergencyController, residentialController, UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController, residentialController, AcademicController, EmergencyController],
  providers: [UserService, ResidentialDataService,AcademicDataSerive, EmergencyDataSerive],
})
export class UserModule {}
