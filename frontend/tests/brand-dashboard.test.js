import { test, expect } from '@jest/globals';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BrandDashboard from '../src/pages/dashboard/marca';
import { AuthProvider } from '../src/contexts/auth-context';

// Mock dos componentes que dependem de contexto externo
jest.mock('../src/components/layout/main-layout', () => {
  return {
    MainLayout: ({ children }) => <div data-testid="main-layout">{children}</div>,
  };
});

// Mock de funções de API
jest.mock('../src/lib/api', () => ({
  getBrandData: jest.fn(() => {
    return Promise.resolve({
      id: 1,
      name: 'Lã Portuguesa',
      logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9',
      banner: 'https://images.unsplash.com/photo-1544441893-675973e31985',
      description: 'Produtos de lã merino de alta qualidade, produzidos artesanalmente em Portugal.',
      subscriptionLevel: 'PREMIUM',
      subscriptionExpiry: '15 de abril de 2026',
      productCount: 24,
      orderCount: 156,
      revenue: 12450.75,
      balance: 9876.50,
      stats: {
        views: 2345,
        sales: 156,
        conversion: 6.65,
        averageOrder: 79.81
      }
    });
  }),
  getBrandProducts: jest.fn(() => {
    return Promise.resolve([
      {
        id: 1,
        name: 'Camisola de Lã Merino',
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27',
        stock: 15,
        sales: 42,
        status: 'active',
        isNew: true,
        isFeatured: true,
        rating: 4.8
      },
      {
        id: 2,
        name: 'Manta de Linho Natural',
        price: 59.99,
        image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2',
        stock: 8,
        sales: 27,
        status: 'active',
        rating: 4.4
      }
    ]);
  }),
  getBrandOrders: jest.fn(() => {
    return Promise.resolve([
      {
        id: 'ORD-12345',
        date: '28 de março de 2025',
        customer: 'João Silva',
        total: 79.99,
        status: 'pending',
        items: 1
      },
      {
        id: 'ORD-12344',
        date: '27 de março de 2025',
        customer: 'Maria Santos',
        total: 119.98,
        status: 'processing',
        items: 2
      }
    ]);
  })
}));

// Mock do contexto de autenticação
jest.mock('../src/contexts/auth-context', () => {
  const originalModule = jest.requireActual('../src/contexts/auth-context');
  
  return {
    ...originalModule,
    useAuth: () => ({
      user: { 
        id: 1, 
        name: 'Lã Portuguesa', 
        email: 'info@laportuguesa.pt', 
        role: 'BRAND',
        brandId: 1
      },
      isAuthenticated: true
    })
  };
});

describe('Painel da Marca', () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <BrandDashboard />
      </AuthProvider>
    );
  });

  test('deve renderizar o cabeçalho da marca', async () => {
    await waitFor(() => {
      expect(screen.getByText('Lã Portuguesa')).toBeInTheDocument();
      expect(screen.getByText('Produtos de lã merino de alta qualidade, produzidos artesanalmente em Portugal.')).toBeInTheDocument();
      expect(screen.getByText('Subscrição Premium')).toBeInTheDocument();
    });
  });

  test('deve renderizar as tabs de navegação', () => {
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Produtos')).toBeInTheDocument();
    expect(screen.getByText('Encomendas')).toBeInTheDocument();
    expect(screen.getByText('Análises')).toBeInTheDocument();
    expect(screen.getByText('Definições')).toBeInTheDocument();
  });

  test('deve mostrar estatísticas no dashboard', async () => {
    await waitFor(() => {
      expect(screen.getByText('24')).toBeInTheDocument(); // Número de produtos
      expect(screen.getByText('156')).toBeInTheDocument(); // Número de encomendas
      expect(screen.getByText('12 450,75 €')).toBeInTheDocument(); // Receita
      expect(screen.getByText('9 876,50 €')).toBeInTheDocument(); // Saldo
    });
  });

  test('deve mudar para a tab de produtos quando clicada', async () => {
    const productsTab = screen.getByText('Produtos');
    fireEvent.click(productsTab);
    
    await waitFor(() => {
      expect(screen.getByText('Camisola de Lã Merino')).toBeInTheDocument();
      expect(screen.getByText('Manta de Linho Natural')).toBeInTheDocument();
      expect(screen.getByText('Adicionar Produto')).toBeInTheDocument();
    });
  });

  test('deve mudar para a tab de encomendas quando clicada', async () => {
    const ordersTab = screen.getByText('Encomendas');
    fireEvent.click(ordersTab);
    
    await waitFor(() => {
      expect(screen.getByText('ORD-12345')).toBeInTheDocument();
      expect(screen.getByText('ORD-12344')).toBeInTheDocument();
      expect(screen.getByText('João Silva')).toBeInTheDocument();
      expect(screen.getByText('Maria Santos')).toBeInTheDocument();
    });
  });

  test('deve mudar para a tab de definições quando clicada', () => {
    const settingsTab = screen.getByText('Definições');
    fireEvent.click(settingsTab);
    
    expect(screen.getByText('Informações da Marca')).toBeInTheDocument();
    expect(screen.getByText('Personalização da Loja')).toBeInTheDocument();
    expect(screen.getByLabelText('Nome da Marca')).toBeInTheDocument();
    expect(screen.getByLabelText('Descrição')).toBeInTheDocument();
  });
});
