import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirecionar para login se token expirado ou inválido
      localStorage.removeItem('token');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

// API de autenticação
export const authAPI = {
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  
  register: (userData: any) => 
    api.post('/auth/register', userData),
  
  forgotPassword: (email: string) => 
    api.post('/auth/forgot-password', { email }),
  
  resetPassword: (token: string, password: string) => 
    api.post('/auth/reset-password', { token, password }),
  
  getProfile: () => 
    api.get('/auth/profile'),
};

// API de marcas
export const brandsAPI = {
  getAll: (params?: any) => 
    api.get('/brands', { params }),
  
  getById: (id: number) => 
    api.get(`/brands/${id}`),
  
  create: (brandData: any) => 
    api.post('/brands', brandData),
  
  update: (id: number, brandData: any) => 
    api.patch(`/brands/${id}`, brandData),
  
  customizeStore: (id: number, customizationData: any) => 
    api.post(`/brands/${id}/customize-store`, customizationData),
  
  getFeatured: () => 
    api.get('/brands/featured'),
  
  getAnalytics: (id: number, params?: any) => 
    api.post(`/brands/${id}/analytics`, params),
  
  createMarketingCampaign: (id: number, campaignData: any) => 
    api.post(`/brands/${id}/marketing-campaigns`, campaignData),
};

// API de produtos
export const productsAPI = {
  getAll: (params?: any) => 
    api.get('/products', { params }),
  
  getById: (id: number) => 
    api.get(`/products/${id}`),
  
  create: (productData: any) => 
    api.post('/products', productData),
  
  update: (id: number, productData: any) => 
    api.patch(`/products/${id}`, productData),
  
  addImage: (id: number, imageData: any) => 
    api.post(`/products/${id}/images`, imageData),
  
  addVariant: (id: number, variantData: any) => 
    api.post(`/products/${id}/variants`, variantData),
  
  highlightProduct: (id: number) => 
    api.post(`/products/${id}/highlight`),
  
  getByBrand: (brandId: number, params?: any) => 
    api.get(`/products/brand/${brandId}`, { params }),
  
  getFeatured: () => 
    api.get('/products/featured'),
  
  getByCategory: (category: string, params?: any) => 
    api.get(`/products/category/${category}`, { params }),
};

// API de encomendas
export const ordersAPI = {
  getAll: (params?: any) => 
    api.get('/orders', { params }),
  
  getById: (id: number) => 
    api.get(`/orders/${id}`),
  
  create: (orderData: any) => 
    api.post('/orders', orderData),
  
  update: (id: number, orderData: any) => 
    api.patch(`/orders/${id}`, orderData),
  
  updateStatus: (id: number, statusData: any) => 
    api.patch(`/orders/${id}/status`, statusData),
  
  addItem: (id: number, itemData: any) => 
    api.post(`/orders/${id}/items`, itemData),
  
  removeItem: (orderId: number, itemId: number) => 
    api.delete(`/orders/${orderId}/items/${itemId}`),
  
  getOrderAnalytics: (brandId: number, params?: any) => 
    api.get(`/orders/analytics/brand/${brandId}`, { params }),
  
  bulkUpdateOrders: (bulkUpdateData: any) => 
    api.post('/orders/bulk-update', bulkUpdateData),
  
  exportOrders: (brandId: number, params?: any) => 
    api.get(`/orders/export/brand/${brandId}`, { params }),
};

// API de envios
export const shippingAPI = {
  getAll: (params?: any) => 
    api.get('/shipping', { params }),
  
  getById: (id: number) => 
    api.get(`/shipping/${id}`),
  
  create: (shippingData: any) => 
    api.post('/shipping', shippingData),
  
  update: (id: number, shippingData: any) => 
    api.patch(`/shipping/${id}`, shippingData),
  
  getByOrderId: (orderId: number) => 
    api.get(`/shipping/order/${orderId}`),
  
  getAllCarriers: (params?: any) => 
    api.get('/shipping/carriers', { params }),
  
  getCarrierById: (id: number) => 
    api.get(`/shipping/carriers/${id}`),
  
  bulkCreateShippings: (bulkCreateData: any) => 
    api.post('/shipping/bulk-create', bulkCreateData),
  
  trackShipment: (code: string) => 
    api.get(`/shipping/tracking/${code}`),
  
  getShippingAnalytics: (brandId: number, params?: any) => 
    api.get(`/shipping/analytics/brand/${brandId}`, { params }),
  
  setCustomShippingRates: (customRatesData: any) => 
    api.post('/shipping/custom-rates', customRatesData),
};

// API de subscrições
export const subscriptionsAPI = {
  getAll: (params?: any) => 
    api.get('/subscriptions', { params }),
  
  getById: (id: number) => 
    api.get(`/subscriptions/${id}`),
  
  create: (subscriptionData: any) => 
    api.post('/subscriptions', subscriptionData),
  
  update: (id: number, subscriptionData: any) => 
    api.patch(`/subscriptions/${id}`, subscriptionData),
  
  getPlans: () => 
    api.get('/subscriptions/plans'),
  
  getBrandSubscription: (brandId: number) => 
    api.get(`/subscriptions/brand/${brandId}`),
  
  cancelSubscription: (id: number) => 
    api.post(`/subscriptions/${id}/cancel`),
  
  upgradeSubscription: (id: number, planData: any) => 
    api.post(`/subscriptions/${id}/upgrade`, planData),
};

export default api;
