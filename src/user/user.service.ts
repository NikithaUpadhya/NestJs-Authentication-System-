import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hashPassword } from 'src/common/utils/password.util';


@Injectable()
export class UserService {

  constructor(private readonly prisma:PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const {password, ...user} = createUserDto;
    const hashedPassword = await hashPassword(password);
    return this.prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      }
    })
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findOne(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async delete(userId: number) {
    await this.prisma.user.delete({
      where: { id: userId },
    });
    return { message: `User with id ${userId} has been deleted` };
  }

  async update(userId: number, updateUserDto: CreateUserDto) {
    const { password, ...user } = updateUserDto;
    const hashedPassword = await hashPassword(password);
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        ...user,
        password: hashedPassword,
      },
    });
  }
}
