import { test, expect } from '@jest/globals';
import request from 'supertest';
import app from '../src/app';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

describe('API de Encomendas', () => {
  let testUser;
  let testBrand;
  let testProduct;
  let testOrder;
  let userToken;
  let brandToken;
  
  beforeAll(async () => {
    // Criar um utilizador de teste
    testUser = await prisma.user.create({
      data: {
        name: 'Cliente Teste',
        email: 'cliente@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'CUSTOMER'
      }
    });
    
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
    
    // Criar um produto de teste
    testProduct = await prisma.product.create({
      data: {
        name: 'Produto Teste',
        description: 'Descrição do produto teste',
        price: 29.99,
        stock: 10,
        brandId: testBrand.id
      }
    });
    
    // Criar uma encomenda de teste
    testOrder = await prisma.order.create({
      data: {
        userId: testUser.id,
        status: 'PENDING',
        total: 29.99,
        shippingAddress: {
          create: {
            name: 'Cliente Teste',
            address: 'Rua de Teste, 123',
            postalCode: '1000-001',
            city: 'Lisboa',
            phone: '912345678'
          }
        },
        items: {
          create: {
            productId: testProduct.id,
            quantity: 1,
            price: 29.99,
            brandId: testBrand.id
          }
        }
      }
    });
    
    // Criar tokens para testes
    userToken = jwt.sign(
      { userId: testUser.id, role: 'CUSTOMER' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    brandToken = jwt.sign(
      { userId: testBrand.user.id, role: 'BRAND', brandId: testBrand.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  });
  
  afterAll(async () => {
    // Limpar dados de teste
    await prisma.orderItem.deleteMany({
      where: { orderId: testOrder.id }
    });
    
    await prisma.shippingAddress.deleteMany({
      where: { orderId: testOrder.id }
    });
    
    await prisma.order.delete({
      where: { id: testOrder.id }
    });
    
    await prisma.product.delete({
      where: { id: testProduct.id }
    });
    
    await prisma.brand.delete({
      where: { id: testBrand.id }
    });
    
    await prisma.user.delete({
      where: { id: testBrand.user.id }
    });
    
    await prisma.user.delete({
      where: { id: testUser.id }
    });
    
    await prisma.$disconnect();
  });
  
  test('deve criar uma nova encomenda quando autenticado como cliente', async () => {
    const response = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        items: [
          { productId: testProduct.id, quantity: 2 }
        ],
        shippingAddress: {
          name: 'Cliente Teste',
          address: 'Rua de Teste, 123',
          postalCode: '1000-001',
          city: 'Lisboa',
          phone: '912345678'
        },
        shippingMethodId: 1,
        paymentMethodId: 1
      });
    
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.order).toBeDefined();
    expect(response.body.order.total).toBe(59.98); // 29.99 * 2
    
    // Limpar dados de teste
    await prisma.orderItem.deleteMany({
      where: { orderId: response.body.order.id }
    });
    
    await prisma.shippingAddress.deleteMany({
      where: { orderId: response.body.order.id }
    });
    
    await prisma.order.delete({
      where: { id: response.body.order.id }
    });
  });
  
  test('deve listar as encomendas do cliente autenticado', async () => {
    const response = await request(app)
      .get('/api/orders')
      .set('Authorization', `Bearer ${userToken}`);
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.orders)).toBe(true);
    expect(response.body.orders.some(o => o.id === testOrder.id)).toBe(true);
  });
  
  test('deve obter uma encomenda específica do cliente', async () => {
    const response = await request(app)
      .get(`/api/orders/${testOrder.id}`)
      .set('Authorization', `Bearer ${userToken}`);
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.order.id).toBe(testOrder.id);
    expect(response.body.order.total).toBe(29.99);
  });
  
  test('deve impedir que um cliente acesse encomendas de outro cliente', async () => {
    // Criar outro cliente
    const otherUser = await prisma.user.create({
      data: {
        name: 'Outro Cliente',
        email: 'outro@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'CUSTOMER'
      }
    });
    
    const otherUserToken = jwt.sign(
      { userId: otherUser.id, role: 'CUSTOMER' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    const response = await request(app)
      .get(`/api/orders/${testOrder.id}`)
      .set('Authorization', `Bearer ${otherUserToken}`);
    
    expect(response.status).toBe(403);
    expect(response.body.success).toBe(false);
    
    // Limpar dados de teste
    await prisma.user.delete({
      where: { id: otherUser.id }
    });
  });
  
  test('deve listar as encomendas da marca autenticada', async () => {
    const response = await request(app)
      .get('/api/brands/orders')
      .set('Authorization', `Bearer ${brandToken}`);
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.orders)).toBe(true);
    expect(response.body.orders.some(o => o.id === testOrder.id)).toBe(true);
  });
  
  test('deve atualizar o estado de uma encomenda quando autenticado como marca', async () => {
    const response = await request(app)
      .patch(`/api/orders/${testOrder.id}/status`)
      .set('Authorization', `Bearer ${brandToken}`)
      .send({
        status: 'PROCESSING'
      });
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.order.status).toBe('PROCESSING');
  });
  
  test('deve cancelar uma encomenda quando autenticado como cliente', async () => {
    // Criar uma nova encomenda para cancelar
    const orderToCancel = await prisma.order.create({
      data: {
        userId: testUser.id,
        status: 'PENDING',
        total: 29.99,
        shippingAddress: {
          create: {
            name: 'Cliente Teste',
            address: 'Rua de Teste, 123',
            postalCode: '1000-001',
            city: 'Lisboa',
            phone: '912345678'
          }
        },
        items: {
          create: {
            productId: testProduct.id,
            quantity: 1,
            price: 29.99,
            brandId: testBrand.id
          }
        }
      }
    });
    
    const response = await request(app)
      .patch(`/api/orders/${orderToCancel.id}/cancel`)
      .set('Authorization', `Bearer ${userToken}`);
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.order.status).toBe('CANCELLED');
    
    // Limpar dados de teste
    await prisma.orderItem.deleteMany({
      where: { orderId: orderToCancel.id }
    });
    
    await prisma.shippingAddress.deleteMany({
      where: { orderId: orderToCancel.id }
    });
    
    await prisma.order.delete({
      where: { id: orderToCancel.id }
    });
  });
});
