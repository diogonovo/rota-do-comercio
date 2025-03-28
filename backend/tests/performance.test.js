import { test, expect } from '@jest/globals';
import { performance } from 'perf_hooks';
import request from 'supertest';
import app from '../src/app';

describe('Testes de Desempenho', () => {
  test('deve carregar a lista de produtos em menos de 500ms', async () => {
    const start = performance.now();
    
    const response = await request(app)
      .get('/api/products');
    
    const end = performance.now();
    const duration = end - start;
    
    expect(response.status).toBe(200);
    expect(duration).toBeLessThan(500);
  });
  
  test('deve carregar a lista de marcas em menos de 300ms', async () => {
    const start = performance.now();
    
    const response = await request(app)
      .get('/api/brands');
    
    const end = performance.now();
    const duration = end - start;
    
    expect(response.status).toBe(200);
    expect(duration).toBeLessThan(300);
  });
  
  test('deve pesquisar produtos em menos de 600ms', async () => {
    const start = performance.now();
    
    const response = await request(app)
      .get('/api/products/search?query=teste');
    
    const end = performance.now();
    const duration = end - start;
    
    expect(response.status).toBe(200);
    expect(duration).toBeLessThan(600);
  });
  
  test('deve filtrar produtos por categoria em menos de 400ms', async () => {
    const start = performance.now();
    
    const response = await request(app)
      .get('/api/products?category=Categoria%20Teste');
    
    const end = performance.now();
    const duration = end - start;
    
    expect(response.status).toBe(200);
    expect(duration).toBeLessThan(400);
  });
  
  test('deve carregar detalhes de um produto em menos de 200ms', async () => {
    // Assumindo que existe um produto com ID 1
    const start = performance.now();
    
    const response = await request(app)
      .get('/api/products/1');
    
    const end = performance.now();
    const duration = end - start;
    
    expect(response.status).toBe(200);
    expect(duration).toBeLessThan(200);
  });
  
  test('deve processar login em menos de 300ms', async () => {
    const start = performance.now();
    
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'teste@example.com',
        password: 'password123'
      });
    
    const end = performance.now();
    const duration = end - start;
    
    // Não importa se o login foi bem-sucedido, apenas medimos o tempo de resposta
    expect(duration).toBeLessThan(300);
  });
  
  test('deve carregar o painel da marca em menos de 700ms', async () => {
    // Criar token para teste
    const token = jwt.sign(
      { userId: 1, role: 'BRAND', brandId: 1 },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    const start = performance.now();
    
    const response = await request(app)
      .get('/api/brands/dashboard')
      .set('Authorization', `Bearer ${token}`);
    
    const end = performance.now();
    const duration = end - start;
    
    // Não importa se a autenticação foi bem-sucedida, apenas medimos o tempo de resposta
    expect(duration).toBeLessThan(700);
  });
  
  test('deve suportar múltiplas requisições simultâneas', async () => {
    const start = performance.now();
    
    // Fazer 10 requisições simultâneas
    const requests = Array(10).fill().map(() => 
      request(app).get('/api/products')
    );
    
    const responses = await Promise.all(requests);
    
    const end = performance.now();
    const duration = end - start;
    
    // Todas as requisições devem ser bem-sucedidas
    responses.forEach(response => {
      expect(response.status).toBe(200);
    });
    
    // O tempo total deve ser menor que 10 vezes o tempo de uma única requisição
    // o que indica que as requisições foram processadas em paralelo
    expect(duration).toBeLessThan(10 * 500);
  });
});
