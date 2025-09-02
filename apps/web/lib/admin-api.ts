const baseURL = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001';

interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(response.status, errorData.message || `HTTP ${response.status}`);
  }
  
  return response.json();
}

export const adminApi = {
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${baseURL}${endpoint}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return handleResponse<T>(response);
  },

  async post<T>(endpoint: string, data?: any): Promise<T> {
    const response = await fetch(`${baseURL}${endpoint}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    });
    
    return handleResponse<T>(response);
  },

  async patch<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${baseURL}${endpoint}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    return handleResponse<T>(response);
  },

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${baseURL}${endpoint}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return handleResponse<T>(response);
  },

  // Auth endpoints
  auth: {
    login: (credentials: { email: string; password: string }) =>
      adminApi.post('/auth/login', credentials),
    
    me: () => adminApi.get('/auth/me'),
    
    logout: () => adminApi.post('/auth/logout'),
  },

  // Admin endpoints
  admin: {
    getProperties: (params?: { search?: string; page?: number; take?: number }) => {
      const searchParams = new URLSearchParams();
      if (params?.search) searchParams.append('search', params.search);
      if (params?.page) searchParams.append('page', params.page.toString());
      if (params?.take) searchParams.append('take', params.take.toString());
      
      const query = searchParams.toString();
      return adminApi.get(`/admin/properties${query ? `?${query}` : ''}`);
    },

    getProperty: (id: string) => adminApi.get(`/admin/properties/${id}`),

    createProperty: (data: any) => adminApi.post('/admin/properties', data),

    updateProperty: (id: string, data: any) => adminApi.patch(`/admin/properties/${id}`, data),

    deleteProperty: (id: string) => adminApi.delete(`/admin/properties/${id}`),

    signUpload: (data: { fileName: string; contentType: string }) =>
      adminApi.post('/admin/uploads/sign', data),

    addPropertyImage: (propertyId: string, data: any) =>
      adminApi.post(`/admin/properties/${propertyId}/images`, data),
  },
};

export { ApiError };
