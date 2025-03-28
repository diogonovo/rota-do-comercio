import { test, expect } from '@jest/globals';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Checkout from '../src/pages/checkout';
import { CartProvider } from '../src/contexts/cart-context';
import { AuthProvider } from '../src/contexts/auth-context';

// Mock dos componentes que dependem de contexto externo
jest.mock('../src/components/layout/main-layout', () => {
  return {
    MainLayout: ({ children }) => <div data-testid="main-layout">{children}</div>,
  };
});

// Mock de funções de API
jest.mock('../src/lib/api', () => ({
  createOrder: jest.fn((orderData) => {
    return Promise.resolve({ 
      success: true, 
      order: { 
        id: 'ORD-12345', 
        total: orderData.total,
        items: orderData.items,
        shippingAddress: orderData.shippingAddress,
        paymentMethod: orderData.paymentMethod
      }
    });
  }),
  getShippingMethods: jest.fn(() => {
    return Promise.resolve([
      { id: 1, name: 'CTT', price: 3.99, estimatedDelivery: '2-3 dias úteis' },
      { id: 2, name: 'DPD', price: 4.99, estimatedDelivery: '1-2 dias úteis' },
      { id: 3, name: 'GLS', price: 5.99, estimatedDelivery: '24 horas' }
    ]);
  }),
  getPaymentMethods: jest.fn(() => {
    return Promise.resolve([
      { id: 1, name: 'Multibanco', icon: 'multibanco.svg' },
      { id: 2, name: 'MB WAY', icon: 'mbway.svg' },
      { id: 3, name: 'Cartão de Crédito', icon: 'credit-card.svg' }
    ]);
  })
}));

// Mock do contexto do carrinho
jest.mock('../src/contexts/cart-context', () => {
  const originalModule = jest.requireActual('../src/contexts/cart-context');
  
  return {
    ...originalModule,
    useCart: () => ({
      cart: [
        { id: 1, name: 'Produto 1', price: 29.99, quantity: 2, brand: 'Marca 1' },
        { id: 2, name: 'Produto 2', price: 49.99, quantity: 1, brand: 'Marca 2' }
      ],
      getCartTotal: () => 109.97,
      clearCart: jest.fn()
    })
  };
});

describe('Página de Checkout', () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <CartProvider>
          <Checkout />
        </CartProvider>
      </AuthProvider>
    );
  });

  test('deve renderizar o resumo da encomenda', () => {
    expect(screen.getByText('Resumo da Encomenda')).toBeInTheDocument();
    expect(screen.getByText('Produto 1')).toBeInTheDocument();
    expect(screen.getByText('Produto 2')).toBeInTheDocument();
    expect(screen.getByText('109,97 €')).toBeInTheDocument();
  });

  test('deve renderizar o formulário de endereço de entrega', () => {
    expect(screen.getByText('Endereço de Entrega')).toBeInTheDocument();
    expect(screen.getByLabelText('Nome')).toBeInTheDocument();
    expect(screen.getByLabelText('Morada')).toBeInTheDocument();
    expect(screen.getByLabelText('Código Postal')).toBeInTheDocument();
    expect(screen.getByLabelText('Localidade')).toBeInTheDocument();
    expect(screen.getByLabelText('Telefone')).toBeInTheDocument();
  });

  test('deve renderizar as opções de envio', async () => {
    await waitFor(() => {
      expect(screen.getByText('Método de Envio')).toBeInTheDocument();
      expect(screen.getByText('CTT')).toBeInTheDocument();
      expect(screen.getByText('DPD')).toBeInTheDocument();
      expect(screen.getByText('GLS')).toBeInTheDocument();
    });
  });

  test('deve renderizar os métodos de pagamento', async () => {
    await waitFor(() => {
      expect(screen.getByText('Método de Pagamento')).toBeInTheDocument();
      expect(screen.getByText('Multibanco')).toBeInTheDocument();
      expect(screen.getByText('MB WAY')).toBeInTheDocument();
      expect(screen.getByText('Cartão de Crédito')).toBeInTheDocument();
    });
  });

  test('deve mostrar erro quando os campos obrigatórios estão vazios', () => {
    const submitButton = screen.getByRole('button', { name: 'Finalizar Compra' });
    fireEvent.click(submitButton);
    
    expect(screen.getByText('O nome é obrigatório')).toBeInTheDocument();
    expect(screen.getByText('A morada é obrigatória')).toBeInTheDocument();
    expect(screen.getByText('O código postal é obrigatório')).toBeInTheDocument();
    expect(screen.getByText('A localidade é obrigatória')).toBeInTheDocument();
    expect(screen.getByText('O telefone é obrigatório')).toBeInTheDocument();
  });

  test('deve submeter a encomenda com sucesso quando todos os campos estão preenchidos', async () => {
    // Preencher formulário de endereço
    fireEvent.change(screen.getByLabelText('Nome'), { target: { value: 'João Silva' } });
    fireEvent.change(screen.getByLabelText('Morada'), { target: { value: 'Rua das Flores, 123' } });
    fireEvent.change(screen.getByLabelText('Código Postal'), { target: { value: '1000-001' } });
    fireEvent.change(screen.getByLabelText('Localidade'), { target: { value: 'Lisboa' } });
    fireEvent.change(screen.getByLabelText('Telefone'), { target: { value: '912345678' } });
    
    // Aguardar carregamento dos métodos de envio e pagamento
    await waitFor(() => {
      expect(screen.getByText('CTT')).toBeInTheDocument();
      expect(screen.getByText('Multibanco')).toBeInTheDocument();
    });
    
    // Selecionar método de envio
    const cttOption = screen.getByLabelText('CTT');
    fireEvent.click(cttOption);
    
    // Selecionar método de pagamento
    const multibancoOption = screen.getByLabelText('Multibanco');
    fireEvent.click(multibancoOption);
    
    // Submeter formulário
    const submitButton = screen.getByRole('button', { name: 'Finalizar Compra' });
    fireEvent.click(submitButton);
    
    // Verificar se a encomenda foi criada com sucesso
    await waitFor(() => {
      expect(screen.getByText('Encomenda realizada com sucesso!')).toBeInTheDocument();
      expect(screen.getByText('ORD-12345')).toBeInTheDocument();
    });
  });
});
