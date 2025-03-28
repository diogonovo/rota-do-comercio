import { test, expect } from '@jest/globals';
import request from 'supertest';
import app from '../src/app';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

describe('API de Subscrições', () => {
  let testBrand;
  let testSubscription;
  let brandToken;
  let adminToken;
  
  beforeAll(async () => {
    // Criar uma marca de teste
    testBrand = await prisma.brand.create({
      data: {
        name: 'Marca Teste',
        description: 'Descrição da marca teste',
        logo: 'https://example.com/logo.jpg',
        user: {
          create: {
            name: 'Marca Teste',
            email: 'marca@example.com',
            password: await bcrypt.hash('password123', 10),
            role: 'BRAND'
          }
        }
      },
      include: {
        user: true
      }
    });
    
    // Criar uma subscrição de teste
    testSubscription = await prisma.subscription.create({
      data: {
        brandId: testBrand.id,
        level: 'BASIC',
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias
        active: true
      }
    });
    
    // Criar tokens para testes
    brandToken = jwt.sign(
      { userId: testBrand.user.id, role: 'BRAND', brandId: testBrand.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    adminToken = jwt.sign(
      { userId: 1, role: 'ADMIN' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  });
  
  afterAll(async () => {
    // Limpar dados de teste
    await prisma.subscription.delete({
      where: { id: testSubscription.id }
    });
    
    await prisma.brand.delete({
      where: { id: testBrand.id }
    });
    
    await prisma.user.delete({
      where: { id: testBrand.user.id }
    });
    
    await prisma.$disconnect();
  });
  
  test('deve obter a subscrição atual da marca autenticada', async () => {
    const response = await request(app)
      .get('/api/subscriptions/current')
      .set('Authorization', `Bearer ${brandToken}`);
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.subscription.id).toBe(testSubscription.id);
    expect(response.body.subscription.level).toBe('BASIC');
    expect(response.body.subscription.active).toBe(true);
  });
  
  test('deve atualizar o nível de subscrição da marca autenticada', async () => {
    const response = await request(app)
      .patch('/api/subscriptions/upgrade')
      .set('Authorization', `Bearer ${brandToken}`)
      .send({
        level: 'PRO'
      });
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.subscription.level).toBe('PRO');
  });
  
  test('deve renovar a subscrição da marca autenticada', async () => {
    const currentEndDate = new Date(testSubscription.endDate);
    
    const response = await request(app)
      .patch('/api/subscriptions/renew')
      .set('Authorization', `Bearer ${brandToken}`);
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    
    const newEndDate = new Date(response.body.subscription.endDate);
    expect(newEndDate.getTime()).toBeGreaterThan(currentEndDate.getTime());
  });
  
  test('deve cancelar a subscrição da marca autenticada', async () => {
    const response = await request(app)
      .patch('/api/subscriptions/cancel')
      .set('Authorization', `Bearer ${brandToken}`);
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.subscription.active).toBe(false);
  });
  
  test('deve reativar a subscrição da marca autenticada', async () => {
    const response = await request(app)
      .patch('/api/subscriptions/reactivate')
      .set('Authorization', `Bearer ${brandToken}`);
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.subscription.active).toBe(true);
  });
  
  test('deve listar todas as subscrições quando autenticado como administrador', async () => {
    const response = await request(app)
      .get('/api/admin/subscriptions')
      .set('Authorization', `Bearer ${adminToken}`);
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.subscriptions)).toBe(true);
    expect(response.body.subscriptions.some(s => s.id === testSubscription.id)).toBe(true);
  });
  
  test('deve atualizar uma subscrição específica quando autenticado como administrador', async () => {
    const response = await request(app)
      .patch(`/api/admin/subscriptions/${testSubscription.id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        level: 'PREMIUM',
        endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // 90 dias
      });
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.subscription.level).toBe('PREMIUM');
  });
  
  test('deve impedir que uma marca acesse subscrições de outras marcas', async () => {
    // Criar outra marca
    const otherBrand = await prisma.brand.create({
      data: {
        name: 'Outra Marca',
        description: 'Descrição da outra marca',
        user: {
          create: {
            name: 'Outra Marca',
            email: 'outra@example.com',
            password: await bcrypt.hash('password123', 10),
            role: 'BRAND'
          }
        }
      },
      include: {
        user: true
      }
    });
    
    const otherBrandToken = jwt.sign(
      { userId: otherBrand.user.id, role: 'BRAND', brandId: otherBrand.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    const response = await request(app)
      .get(`/api/admin/subscriptions/${testSubscription.id}`)
      .set('Authorization', `Bearer ${otherBrandToken}`);
    
    expect(response.status).toBe(403);
    expect(response.body.success).toBe(false);
    
    // Limpar dados de teste
    await prisma.brand.delete({
      where: { id: otherBrand.id }
    });
    
    await prisma.user.delete({
      where: { id: otherBrand.user.id }
    });
  });
});
