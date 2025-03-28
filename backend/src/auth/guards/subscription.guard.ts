import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../../prisma/prisma.service';
import { UserType } from '../dto/register.dto';

@Injectable()
export class SubscriptionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredLevel = this.reflector.get<string>(
      'subscription_level',
      context.getHandler(),
    );

    if (!requiredLevel) {
      return true; // Se não há nível requerido, permite o acesso
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Se o usuário é admin, sempre permite acesso
    if (user.tipo === UserType.ADMIN) {
      return true;
    }

    // Se o usuário não é uma marca, não permite acesso a recursos restritos por nível
    if (user.tipo !== UserType.MARCA) {
      return false;
    }

    // Buscar a marca associada ao usuário
    const brand = await this.prisma.marca.findUnique({
      where: { utilizadorId: user.id },
    });

    if (!brand) {
      return false;
    }

    // Verificar se o nível de subscrição da marca é suficiente
    const subscriptionLevels = ['BASICO', 'PRO', 'PREMIUM'];
    const requiredLevelIndex = subscriptionLevels.indexOf(requiredLevel);
    const brandLevelIndex = subscriptionLevels.indexOf(brand.nivelSubscricao);

    return brandLevelIndex >= requiredLevelIndex;
  }
}
