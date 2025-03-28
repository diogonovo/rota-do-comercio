import { test, expect } from '@jest/globals';
import request from 'supertest';
import app from '../src/app';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

describe('API de Autenticação', () => {
  let testUser;
  
  beforeAll(async () => {
    // Criar um utilizador de teste
    testUser = await prisma.user.create({
      data: {
        name: 'Utilizador Teste',
        email: 'teste@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'CUSTOMER'
      }
    });
  });
  
  afterAll(async () => {
    // Limpar dados de teste
    await prisma.user.delete({
      where: { id: testUser.id }
    });
    
    await prisma.$disconnect();
  });
  
  test('deve registar um novo utilizador', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Novo Utilizador',
        email: 'novo@example.com',
        password: 'password456'
      });
    
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.user).toBeDefined();
    expect(response.body.token).toBeDefined();
    
    // Limpar dados de teste
    await prisma.user.delete({
      where: { email: 'novo@example.com' }
    });
  });
  
  test('deve autenticar um utilizador existente', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'teste@example.com',
        password: 'password123'
      });
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.user).toBeDefined();
    expect(response.body.token).toBeDefined();
  });
  
  test('deve rejeitar credenciais inválidas', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'teste@example.com',
        password: 'senha_errada'
      });
    
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Credenciais inválidas');
  });
  
  test('deve verificar token JWT válido', async () => {
    // Gerar token válido
    const token = jwt.sign(
      { userId: testUser.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    const response = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.user.id).toBe(testUser.id);
  });
  
  test('deve rejeitar token JWT inválido', async () => {
    const response = await request(app)
      .get('/api/auth/me')
      .set('Authorization', 'Bearer token_invalido');
    
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Token inválido');
  });
});
