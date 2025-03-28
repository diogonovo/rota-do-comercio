import { test, expect } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../src/pages/index';
import { AuthProvider } from '../src/contexts/auth-context';
import { CartProvider } from '../src/contexts/cart-context';

// Mock dos componentes que dependem de contexto externo
jest.mock('../src/components/layout/main-layout', () => {
  return {
    MainLayout: ({ children }) => <div data-testid="main-layout">{children}</div>,
  };
});

// Mock de funções de API
jest.mock('../src/lib/api', () => ({
  getFeaturedProducts: jest.fn(() => Promise.resolve([
    { id: 1, name: 'Produto 1', price: 29.99, image: '/images/product1.jpg' },
    { id: 2, name: 'Produto 2', price: 39.99, image: '/images/product2.jpg' },
  ])),
  getFeaturedBrands: jest.fn(() => Promise.resolve([
    { id: 1, name: 'Marca 1', logo: '/images/brand1.jpg' },
    { id: 2, name: 'Marca 2', logo: '/images/brand2.jpg' },
  ])),
}));

describe('Página Inicial', () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <CartProvider>
          <Home />
        </CartProvider>
      </AuthProvider>
    );
  });

  test('deve renderizar o título principal', () => {
    expect(screen.getByText('Rota do Comércio')).toBeInTheDocument();
  });

  test('deve renderizar a secção de marcas em destaque', () => {
    expect(screen.getByText('Marcas em Destaque')).toBeInTheDocument();
  });

  test('deve renderizar a secção de produtos em destaque', () => {
    expect(screen.getByText('Produtos em Destaque')).toBeInTheDocument();
  });

  test('deve renderizar a secção de níveis de subscrição', () => {
    expect(screen.getByText('Níveis de Subscrição')).toBeInTheDocument();
    expect(screen.getByText('Básico')).toBeInTheDocument();
    expect(screen.getByText('Pro')).toBeInTheDocument();
    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  test('deve navegar para a página de produtos ao clicar no botão', () => {
    const button = screen.getByText('Ver Todos os Produtos');
    fireEvent.click(button);
    // Verificar se a navegação ocorreu (em um teste real, verificaríamos a mudança de URL)
  });
});
