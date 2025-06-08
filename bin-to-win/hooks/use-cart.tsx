"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { cartAPI } from "@/lib/api";
import { useAuth } from "@/hooks/use-auth";

// Define the CartProduct type
export interface CartProduct {
  id: number;
  product: number;
  quantity: number;
  user: number;
  product_detail?: {
    id: number;
    name: string;
    description: string;
    price: number;
    original_price: number;
    expiry_date: string;
    image?: string;
    stock: number;
    discount_percentage: number;
  };
  total_price?: number;
}

// Define the CartContextType
interface CartContextType {
  cartItems: CartProduct[];
  cartCount: number;
  isLoading: boolean;
  isAuthenticated: boolean;
  addToCart: (productId: number, quantity: number) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

// Create the context with default values
const CartContext = createContext<CartContextType>({
  cartItems: [],
  cartCount: 0,
  isLoading: false,
  isAuthenticated: false,
  addToCart: async () => {},
  removeFromCart: async () => {},
  updateQuantity: async () => {},
  clearCart: async () => {},
  refreshCart: async () => {},
});

// Hook to use the cart context
export const useCart = () => useContext(CartContext);

// Provider component
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const isAuthenticated = !!user;

  // Calculate cart count from items
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  // Fetch cart items when authentication state changes
  useEffect(() => {
    if (isAuthenticated) {
      const fetchCartItems = async () => {
        try {
          await refreshCart();
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      };

      fetchCartItems();
    } else {
      // Clear cart if not authenticated
      setCartItems([]);
    }
  }, [isAuthenticated]);

  // Refresh cart items
  const refreshCart = async () => {
    if (!isAuthenticated) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await cartAPI.getItems();
      setCartItems(response.results);
    } catch (error) {
      console.error("Error refreshing cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Add item to cart
  const addToCart = async (productId: number, quantity: number) => {
    if (!isAuthenticated) {
      throw new Error("Please log in to add items to your cart");
    }

    // Validate input parameters
    if (!productId || productId <= 0) {
      throw new Error("Invalid product ID");
    }

    if (!quantity || quantity <= 0) {
      throw new Error("Quantity must be greater than zero");
    }

    try {
      setIsLoading(true);
      console.log("Adding to cart:", { productId, quantity });
      await cartAPI.addItem(productId, quantity);
      await refreshCart();
    } catch (error: any) {
      console.error("Error adding item to cart:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId: number) => {
    if (!isAuthenticated) return;

    try {
      setIsLoading(true);
      await cartAPI.removeItem(itemId);
      await refreshCart();
    } catch (error) {
      console.error("Error removing item from cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update item quantity
  const updateQuantity = async (itemId: number, quantity: number) => {
    if (!isAuthenticated) return;

    try {
      setIsLoading(true);
      await cartAPI.updateItem(itemId, quantity);
      await refreshCart();
    } catch (error) {
      console.error("Error updating item quantity:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear cart
  const clearCart = async () => {
    if (!isAuthenticated) return;

    try {
      setIsLoading(true);
      await cartAPI.clear();
      setCartItems([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        isLoading,
        isAuthenticated,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
