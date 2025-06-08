"use client";

import axios from "axios";

// Define types for API responses
interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

interface CartItem {
  id: number;
  product: number;
  quantity: number;
  user: number;
  total_price?: number;
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
}

// Base API configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Client-side storage functions
const getToken = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    console.log("Retrieved token from localStorage:", token);
    return token;
  }
  return null;
};

const setToken = (token: string) => {
  if (typeof window !== "undefined") {
    console.log("Storing token in localStorage:", token);
    localStorage.setItem("token", token);
  }
};

const removeToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
};

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Token ${token}`;
      console.log("Setting auth token:", token);
    } else {
      console.log("No token found or headers missing");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Authentication
export const authAPI = {
  login: async (username: string, password: string) => {
    const response = await api.post("/api/token-auth/", { username, password });
    return response.data;
  },
  register: async (userData: any) => {
    const response = await api.post("/api/users/", userData);
    return response.data;
  },
  logout: () => {
    removeToken();
  },
  getCurrentUser: async () => {
    const response = await api.get("/api/users/me/");
    return response.data;
  },
};

// Categories
export const categoryAPI = {
  getAll: async () => {
    const response = await api.get("/api/categories/");
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/api/categories/${id}/`);
    return response.data;
  },
};

// Products
export const productAPI = {
  getAll: async (params?: any) => {
    const response = await api.get("/api/products/", { params });
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/api/products/${id}/`);
    return response.data;
  },
  getByRetailer: async (retailerId: number) => {
    const response = await api.get(`/api/products/retailer/${retailerId}/`);
    return response.data;
  },
  create: async (productData: any) => {
    const response = await api.post("/api/products/", productData);
    return response.data;
  },
  update: async (id: number, productData: any) => {
    const response = await api.put(`/api/products/${id}/`, productData);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/api/products/${id}/`);
    return response.data;
  },
};

// Cart
export const cartAPI = {
  getItems: async (): Promise<PaginatedResponse<CartItem>> => {
    const response = await api.get("/api/cart-items/");
    return response.data as PaginatedResponse<CartItem>;
  },
  addItem: async (productId: number, quantity: number) => {
    const payload = {
      product_id: productId,
      quantity,
    };
    console.log("Cart Add Item Request:", payload);
    const response = await api.post("/api/cart-items/", payload);
    return response.data;
  },
  updateItem: async (id: number, quantity: number) => {
    const response = await api.put(`/api/cart-items/${id}/`, { quantity });
    return response.data;
  },
  removeItem: async (id: number) => {
    const response = await api.delete(`/api/cart-items/${id}/`);
    return response.data;
  },
  clear: async () => {
    const cartItems = await cartAPI.getItems();
    const results = await Promise.all(
      cartItems.results.map((item) => cartAPI.removeItem(item.id))
    );
    return results;
  },
};

// Wishlist
export const wishlistAPI = {
  getItems: async () => {
    const response = await api.get("/api/wishlists/");
    return response.data;
  },
  addItem: async (productId: number) => {
    const response = await api.post("/api/wishlists/", { product: productId });
    return response.data;
  },
  removeItem: async (id: number) => {
    const response = await api.delete(`/api/wishlists/${id}/`);
    return response.data;
  },
};

// Orders
export const orderAPI = {
  getAll: async () => {
    const response = await api.get("/api/orders/");
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/api/orders/${id}/`);
    return response.data;
  },
  create: async (orderData: any) => {
    const response = await api.post("/api/orders/", orderData);
    return response.data;
  },
};

// Reviews
export const reviewAPI = {
  getByProduct: async (productId: number) => {
    const response = await api.get(`/api/reviews/?product=${productId}`);
    return response.data;
  },
  create: async (reviewData: any) => {
    const response = await api.post("/api/reviews/", reviewData);
    return response.data;
  },
};

// Retailer
export const retailerAPI = {
  getProfile: async () => {
    const response = await api.get("/api/retailers/my-profile/");
    return response.data;
  },
  updateProfile: async (profileData: any) => {
    const response = await api.put("/api/retailers/my-profile/", profileData);
    return response.data;
  },
  register: async (retailerData: any) => {
    const response = await api.post("/api/retailers/", retailerData);
    return response.data;
  },
};

// PromoCode
export const promoCodeAPI = {
  validate: async (code: string) => {
    const response = await api.get(`/api/promo-codes/validate/?code=${code}`);
    return response.data;
  },
};

// Binary Files
export const fileAPI = {
  upload: async (file: File, filename: string) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("filename", filename);

    const response = await api.post("/api/binary-files/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/api/binary-files/${id}/`);
    return response.data;
  },
};

export default api;
