import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { 
      email: user.email, 
      sub: user.id, 
      tipo: user.tipo 
    };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        nome: user.nome,
        tipo: user.tipo,
      },
    };
  }

  async register(userData: any) {
    // Verificar se o utilizador já existe
    const existingUser = await this.usersService.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('Utilizador já existe');
    }

    // Criar novo utilizador
    const newUser = await this.usersService.create(userData);
    
    // Retornar token de acesso
    const { password, ...result } = newUser;
    return this.login(result);
  }
}
