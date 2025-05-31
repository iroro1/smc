// src/utils/api/types.ts

// API Response Types
export type ApiResponse<T> = {
  data: {
    token: string;
    phoneNumber: string;
    email: string;
    fullName: string;
    id: number;
    imageUrl: string;
  };
  error: string | null;
  statusCode: number;
};

// User Type
export type User = {
  id: string;
  email: string;
  name: string;
  fullName: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  state: string;
  city: string;
  country: string;
};

// Menu Item Type
export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

// Order Type
export type Order = {
  id: string;
  userId: string;
  menuItemId: string;
  quantity: number;
  total: number;
  status: string;
};

// Payment Type
export type Payment = {
  id: string;
  orderId: string;
  paymentMethod: string;
  amount: number;
  status: string;
};

// Restaurant Type
export type Restaurant = {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
};

// Table Type
export type Table = {
  id: string;
  restaurantId: string;
  number: number;
  capacity: number;
};

// Path Modal Type
export type PathModalType = "call" | "self";

// File Upload Options Type
export type FileUploadOptions = {
  allowedTypes?: string[] | null;
  maxSize?: number | null;
  onSuccess?: (file: File) => void;
  onError?: (error: string) => void;
};

// Redux Store Types
export type RootState = {
  auth: {
    user: User | null;
    token: string | null;
  };
  menu: {
    menuItems: MenuItem[];
  };
  cart: {
    orders: Order[];
  };
};

// Navigation Types
export type NavigationProp = {
  navigate: (route: string) => void;
};
