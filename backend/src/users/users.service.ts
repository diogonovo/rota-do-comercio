import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    // Verificar se o email já existe
    const existingUser = await this.prisma.utilizador.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email já está em uso');
    }

    // Hash da password
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Criar utilizador
    return this.prisma.utilizador.create({
      data: {
        email: createUserDto.email,
        password: hashedPassword,
        nome: createUserDto.nome,
        tipo: createUserDto.tipo,
      },
    });
  }

  async findAll() {
    return this.prisma.utilizador.findMany({
      select: {
        id: true,
        email: true,
        nome: true,
        tipo: true,
        ativo: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.utilizador.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        nome: true,
        tipo: true,
        ativo: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`Utilizador com ID ${id} não encontrado`);
    }

    return user;
  }

  async findByEmail(email: string) {
    return this.prisma.utilizador.findUnique({
      where: { email },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // Verificar se o utilizador existe
    await this.findOne(id);

    // Preparar dados para atualização
    const data: any = {};
    
    if (updateUserDto.nome) {
      data.nome = updateUserDto.nome;
    }
    
    if (updateUserDto.email) {
      // Verificar se o novo email já está em uso por outro utilizador
      const existingUser = await this.prisma.utilizador.findFirst({
        where: {
          email: updateUserDto.email,
          id: { not: id },
        },
      });

      if (existingUser) {
        throw new ConflictException('Email já está em uso');
      }

      data.email = updateUserDto.email;
    }
    
    if (updateUserDto.password) {
      data.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    
    if (updateUserDto.ativo !== undefined) {
      data.ativo = updateUserDto.ativo;
    }

    // Atualizar utilizador
    return this.prisma.utilizador.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        nome: true,
        tipo: true,
        ativo: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async remove(id: number) {
    // Verificar se o utilizador existe
    await this.findOne(id);

    // Remover utilizador
    return this.prisma.utilizador.delete({
      where: { id },
    });
  }
}
