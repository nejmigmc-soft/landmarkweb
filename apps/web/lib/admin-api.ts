const baseURL = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001';

// Property types
export type PropertyImage = {
  id: string;
  url: string;
  alt?: string | null;
  order?: number | null;
  isCover?: boolean | null;
};

export type Property = {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  type: 'APARTMENT' | 'VILLA' | 'OFFICE' | 'LAND' | 'DAIRE' | 'RESIDENCE' | 'ISYERI' | 'ARSA' | string; // backend enum'unu geniş bırak
  status?: 'SATILIK' | 'KIRALIK' | string;
  price?: number | null;
  currency?: 'TRY' | 'USD' | 'EUR' | string;
  rooms?: string | null;
  bath?: number | null;
  grossM2?: number | null;
  netM2?: number | null;
  floor?: number | null;
  totalFloor?: number | null;
  heating?: string | null;
  age?: number | null;
  furnished?: boolean | null;
  location?: {
    city: string;
    district: string;
    neighborhood?: string;
    address?: string;
  } | null;
  published?: boolean;
  agentId?: string;
  createdAt?: string;
  agent?: {
    id: string;
    name: string;
    email: string;
  };
  images?: PropertyImage[];
  // ihtiyacına göre ekleyebilirsin
};

export type PropertiesResponse = {
  items: Property[];
  total: number;
  page: number;
  take: number;
  totalPages: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
  phone?: string;
  createdAt: string;
};

export type SignUploadResponse = {
  uploadUrl: string;
  publicUrl: string;
  key: string;
};

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
    
    me: (): Promise<User> => adminApi.get<User>('/auth/me'),
    
    logout: () => adminApi.post('/auth/logout'),
  },

  // Admin endpoints
  admin: {
    getProperties: (params?: { search?: string; page?: number; take?: number }): Promise<PropertiesResponse> => {
      const searchParams = new URLSearchParams();
      if (params?.search) searchParams.append('search', params.search);
      if (params?.page) searchParams.append('page', params.page.toString());
      if (params?.take) searchParams.append('take', params.take.toString());
      
      const query = searchParams.toString();
      return adminApi.get<PropertiesResponse>(`/admin/properties${query ? `?${query}` : ''}`);
    },

    getProperty: (id: string): Promise<Property> => adminApi.get<Property>(`/admin/properties/${id}`),

    createProperty: (data: any): Promise<Property> => adminApi.post<Property>('/admin/properties', data),

    updateProperty: (id: string, data: any): Promise<Property> => adminApi.patch<Property>(`/admin/properties/${id}`, data),

    deleteProperty: (id: string) => adminApi.delete(`/admin/properties/${id}`),

    signUpload: (data: { fileName: string; contentType: string }): Promise<SignUploadResponse> =>
      adminApi.post<SignUploadResponse>('/admin/uploads/sign', data),

    addPropertyImage: (propertyId: string, data: any) =>
      adminApi.post(`/admin/properties/${propertyId}/images`, data),
  },
};

export { ApiError };
