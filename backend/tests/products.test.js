import { test, expect } from '@jest/globals';
import request from 'supertest';
import app from '../src/app';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

describe('API de Produtos', () => {
  let testBrand;
  let testProduct;
  let adminToken;
  let brandToken;
  
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
        },
        subscription: {
          create: {
            level: 'PRO',
            startDate: new Date(),
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 dias
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
        brandId: testBrand.id,
        images: {
          create: {
            url: 'https://example.com/product.jpg',
            isMain: true
          }
        },
        categories: {
          create: {
            name: 'Categoria Teste'
          }
        }
      }
    });
    
    // Criar tokens para testes
    adminToken = jwt.sign(
      { userId: 1, role: 'ADMIN' },
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
    await prisma.productImage.deleteMany({
      where: { productId: testProduct.id }
    });
    
    await prisma.product.delete({
      where: { id: testProduct.id }
    });
    
    await prisma.subscription.deleteMany({
      where: { brandId: testBrand.id }
    });
    
    await prisma.brand.delete({
      where: { id: testBrand.id }
    });
    
    await prisma.user.delete({
      where: { id: testBrand.user.id }
    });
    
    await prisma.$disconnect();
  });
  
  test('deve listar todos os produtos', async () => {
    const response = await request(app)
      .get('/api/products');
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.products)).toBe(true);
    expect(response.body.products.length).toBeGreaterThan(0);
  });
  
  test('deve obter um produto específico', async () => {
    const response = await request(app)
      .get(`/api/products/${testProduct.id}`);
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.product.id).toBe(testProduct.id);
    expect(response.body.product.name).toBe('Produto Teste');
    expect(response.body.product.price).toBe(29.99);
  });
  
  test('deve criar um novo produto quando autenticado como marca', async () => {
    const response = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${brandToken}`)
      .send({
        name: 'Novo Produto',
        description: 'Descrição do novo produto',
        price: 39.99,
        stock: 20,
        images: [
          { url: 'https://example.com/new-product.jpg', isMain: true }
        ]
      });
    
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.product.name).toBe('Novo Produto');
    expect(response.body.product.price).toBe(39.99);
    
    // Limpar dados de teste
    await prisma.productImage.deleteMany({
      where: { productId: response.body.product.id }
    });
    
    await prisma.product.delete({
      where: { id: response.body.product.id }
    });
  });
  
  test('deve atualizar um produto existente', async () => {
    const response = await request(app)
      .put(`/api/products/${testProduct.id}`)
      .set('Authorization', `Bearer ${brandToken}`)
      .send({
        name: 'Produto Atualizado',
        price: 34.99
      });
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.product.name).toBe('Produto Atualizado');
    expect(response.body.product.price).toBe(34.99);
  });
  
  test('deve impedir que uma marca atualize produtos de outra marca', async () => {
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
      .put(`/api/products/${testProduct.id}`)
      .set('Authorization', `Bearer ${otherBrandToken}`)
      .send({
        name: 'Tentativa de Alteração',
        price: 99.99
      });
    
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
  
  test('deve excluir um produto quando autenticado como marca proprietária', async () => {
    // Criar um produto para excluir
    const productToDelete = await prisma.product.create({
      data: {
        name: 'Produto para Excluir',
        description: 'Este produto será excluído',
        price: 19.99,
        stock: 5,
        brandId: testBrand.id
      }
    });
    
    const response = await request(app)
      .delete(`/api/products/${productToDelete.id}`)
      .set('Authorization', `Bearer ${brandToken}`);
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toContain('excluído com sucesso');
  });
  
  test('deve filtrar produtos por categoria', async () => {
    const response = await request(app)
      .get('/api/products')
      .query({ category: 'Categoria Teste' });
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.products)).toBe(true);
    expect(response.body.products.some(p => p.id === testProduct.id)).toBe(true);
  });
  
  test('deve filtrar produtos por marca', async () => {
    const response = await request(app)
      .get('/api/products')
      .query({ brandId: testBrand.id });
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.products)).toBe(true);
    expect(response.body.products.some(p => p.id === testProduct.id)).toBe(true);
  });
  
  test('deve filtrar produtos por faixa de preço', async () => {
    const response = await request(app)
      .get('/api/products')
      .query({ minPrice: 20, maxPrice: 40 });
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.products)).toBe(true);
    expect(response.body.products.some(p => p.id === testProduct.id)).toBe(true);
  });
});
