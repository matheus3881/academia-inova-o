import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService){}


  create(createUserDto: CreateUserDto) {
    const user = this.prisma.user.create ({
      data: createUserDto
    });
    return user;
  }

  findAll() {
    return this.prisma.user.findMany({});
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: {id},
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.prisma.user.update ({
      where: {id},
      data: updateUserDto,
    })
    return user;
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: {id},
    });
  }
}
