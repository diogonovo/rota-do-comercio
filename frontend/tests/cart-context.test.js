import { test, expect } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import CartContext, { CartProvider } from '../src/contexts/cart-context';
import { useContext } from 'react';

// Componente de teste para acessar o contexto
const TestComponent = () => {
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useContext(CartContext);
  
  return (
    <div>
      <div data-testid="cart-length">{cart.length}</div>
      <div data-testid="cart-total">{getCartTotal()}</div>
      <button onClick={() => addToCart({ id: 1, name: 'Produto Teste', price: 50, quantity: 1 })}>
        Adicionar Produto
      </button>
      <button onClick={() => updateQuantity(1, 3)}>
        Atualizar Quantidade
      </button>
      <button onClick={() => removeFromCart(1)}>
        Remover Produto
      </button>
      <button onClick={clearCart}>
        Limpar Carrinho
      </button>
    </div>
  );
};

describe('Contexto do Carrinho de Compras', () => {
  beforeEach(() => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
  });

  test('deve iniciar com o carrinho vazio', () => {
    expect(screen.getByTestId('cart-length').textContent).toBe('0');
    expect(screen.getByTestId('cart-total').textContent).toBe('0');
  });

  test('deve adicionar um produto ao carrinho', () => {
    const addButton = screen.getByText('Adicionar Produto');
    fireEvent.click(addButton);
    
    expect(screen.getByTestId('cart-length').textContent).toBe('1');
    expect(screen.getByTestId('cart-total').textContent).toBe('50');
  });

  test('deve atualizar a quantidade de um produto', () => {
    const addButton = screen.getByText('Adicionar Produto');
    fireEvent.click(addButton);
    
    const updateButton = screen.getByText('Atualizar Quantidade');
    fireEvent.click(updateButton);
    
    expect(screen.getByTestId('cart-length').textContent).toBe('1');
    expect(screen.getByTestId('cart-total').textContent).toBe('150');
  });

  test('deve remover um produto do carrinho', () => {
    const addButton = screen.getByText('Adicionar Produto');
    fireEvent.click(addButton);
    
    const removeButton = screen.getByText('Remover Produto');
    fireEvent.click(removeButton);
    
    expect(screen.getByTestId('cart-length').textContent).toBe('0');
    expect(screen.getByTestId('cart-total').textContent).toBe('0');
  });

  test('deve limpar o carrinho', () => {
    const addButton = screen.getByText('Adicionar Produto');
    fireEvent.click(addButton);
    fireEvent.click(addButton); // Adiciona um segundo produto
    
    const clearButton = screen.getByText('Limpar Carrinho');
    fireEvent.click(clearButton);
    
    expect(screen.getByTestId('cart-length').textContent).toBe('0');
    expect(screen.getByTestId('cart-total').textContent).toBe('0');
  });
});
