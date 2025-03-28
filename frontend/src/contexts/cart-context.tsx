import React, { createContext, useContext, useState } from 'react';

type CartItem = {
  id: number;
  produtoId: number;
  nome: string;
  preco: number;
  quantidade: number;
  imagem: string;
  varianteId?: number;
  varianteNome?: string;
  marcaId: number;
  marcaNome: string;
};

type CartContextType = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantidade: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const totalItems = items.reduce((total, item) => total + item.quantidade, 0);
  const totalPrice = items.reduce((total, item) => total + (item.preco * item.quantidade), 0);

  const addItem = (newItem: Omit<CartItem, 'id'>) => {
    // Verificar se o produto já está no carrinho (mesma variante, se aplicável)
    const existingItemIndex = items.findIndex(item => 
      item.produtoId === newItem.produtoId && 
      item.varianteId === newItem.varianteId
    );

    if (existingItemIndex >= 0) {
      // Se o produto já existe, atualizar a quantidade
      const updatedItems = [...items];
      updatedItems[existingItemIndex].quantidade += newItem.quantidade;
      setItems(updatedItems);
    } else {
      // Se o produto não existe, adicionar ao carrinho
      setItems([...items, { ...newItem, id: Date.now() }]);
    }
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantidade: number) => {
    if (quantidade <= 0) {
      removeItem(id);
      return;
    }

    setItems(items.map(item => 
      item.id === id ? { ...item, quantidade } : item
    ));
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};
