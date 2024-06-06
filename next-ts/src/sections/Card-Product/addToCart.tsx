"use client"

import React, { useMemo, useState, useContext, createContext } from 'react';

interface Product {
  objectID: number;
  name: string;
  price: number;
  categories: { id: number; name: string }[];
  description: string;
  image: string;
}

interface CartContextType {
  cart: { [productId: number]: number };
  addToCart: (product: Product) => void;
}

const CartContext = createContext<CartContextType>({
  cart: {},
  addToCart: () => {},
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<{ [productId: number]: number }>({});

  const memoizedValue = useMemo(() => {
    const addToCart = (product: Product) => {
      setCart(prevCart => {
        const updatedCart = { ...prevCart };
        updatedCart[product.objectID] = updatedCart[product.objectID] ? updatedCart[product.objectID] + 1 : 1;
        return updatedCart;
      });
    };

    return { cart, addToCart };
  }, [cart]);

  return (
    <CartContext.Provider value={memoizedValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
