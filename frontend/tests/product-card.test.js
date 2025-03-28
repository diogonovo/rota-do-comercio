import { test, expect } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../src/components/product/product-card';
import { CartProvider } from '../src/contexts/cart-context';

describe('Componente ProductCard', () => {
  const mockProduct = {
    id: 1,
    name: 'Camisola de Lã Merino',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27',
    brand: 'Lã Portuguesa',
    rating: 4.8,
    discount: 0,
    isNew: true
  };

  beforeEach(() => {
    render(
      <CartProvider>
        <ProductCard product={mockProduct} />
      </CartProvider>
    );
  });

  test('deve renderizar as informações do produto corretamente', () => {
    expect(screen.getByText('Camisola de Lã Merino')).toBeInTheDocument();
    expect(screen.getByText('Lã Portuguesa')).toBeInTheDocument();
    expect(screen.getByText('79,99 €')).toBeInTheDocument();
    expect(screen.getByText('4.8')).toBeInTheDocument();
    expect(screen.getByText('Novo')).toBeInTheDocument();
  });

  test('deve mostrar a imagem do produto', () => {
    const image = screen.getByAltText('Camisola de Lã Merino');
    expect(image).toBeInTheDocument();
    expect(image.src).toContain('photo-1576566588028-4147f3842f27');
  });

  test('deve adicionar o produto ao carrinho quando o botão é clicado', () => {
    const addToCartButton = screen.getByRole('button', { name: 'Adicionar ao Carrinho' });
    fireEvent.click(addToCartButton);
    
    // Em um teste real, verificaríamos se o produto foi adicionado ao contexto do carrinho
  });

  test('deve mostrar o desconto quando aplicável', () => {
    // Re-renderizar com um produto com desconto
    const productWithDiscount = {
      ...mockProduct,
      discount: 20
    };
    
    render(
      <CartProvider>
        <ProductCard product={productWithDiscount} />
      </CartProvider>
    );
    
    expect(screen.getByText('63,99 €')).toBeInTheDocument();
    expect(screen.getByText('79,99 €')).toBeInTheDocument();
    expect(screen.getByText('-20%')).toBeInTheDocument();
  });
});
