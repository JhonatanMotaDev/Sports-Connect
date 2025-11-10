import axios from 'axios';

const API_BASE_URL = 'http://localhost:3333';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  profileImage?: string;
  bio?: string;
  interests: string[];
  skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'professional';
  location?: {
    type: 'Point';
    coordinates: [number, number];
    address?: string;
    city?: string;
    state?: string;
    country?: string;
  };
  isActive: boolean;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  _id: string;
  title: string;
  description: string;
  sport: string;
  skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'all';
  date: string;
  duration: number;
  maxParticipants: number;
  currentParticipants: number;
  location: {
    type: 'Point';
    coordinates: [number, number];
    address: string;
    city: string;
    state: string;
    country: string;
    venue?: string;
  };
  organizer: User;
  participants: {
    user: User;
    joinedAt: string;
    status: 'confirmed' | 'pending' | 'cancelled';
  }[];
  requirements?: {
    equipment?: string[];
    experience?: string;
    ageRange?: {
      min: number;
      max: number;
    };
    specialInstructions?: string;
  };
  cost: {
    amount: number;
    currency: string;
    includes?: string[];
  };
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  tags?: string[];
  images?: string[];
  isRecurring?: boolean;
  recurringPattern?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    endDate: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
  meta?: {
    pagination?: {
      current: number;
      pages: number;
      total: number;
    };
  };
}

class ApiService {
  async healthCheck(): Promise<ApiResponse<any>> {
    const response = await api.get('/');
    return response.data;
  }

  async getUsers(params?: {
    page?: number;
    limit?: number;
    search?: string;
    interests?: string;
    skillLevel?: string;
    city?: string;
    lat?: number;
    lng?: number;
    radius?: number;
  }): Promise<ApiResponse<User[]>> {
    const response = await api.get('/api/users', { params });
    return response.data;
  }

  async getUserById(id: string): Promise<ApiResponse<User>> {
    const response = await api.get(`/api/users/${id}`);
    return response.data;
  }

  async createUser(userData: Partial<User>): Promise<ApiResponse<User>> {
    const response = await api.post('/api/users', userData);
    return response.data;
  }

  async updateUser(id: string, userData: Partial<User>): Promise<ApiResponse<User>> {
    const response = await api.put(`/api/users/${id}`, userData);
    return response.data;
  }

  async deleteUser(id: string): Promise<ApiResponse<any>> {
    const response = await api.delete(`/api/users/${id}`);
    return response.data;
  }

  async getUserEvents(userId: string, params?: {
    page?: number;
    limit?: number;
    type?: 'all' | 'organized' | 'participating';
  }): Promise<ApiResponse<Event[]>> {
    const response = await api.get(`/api/users/${userId}/events`, { params });
    return response.data;
  }

  async getUserStats(userId: string): Promise<ApiResponse<any>> {
    const response = await api.get(`/api/users/${userId}/stats`);
    return response.data;
  }

  async updateUserLocation(userId: string, locationData: {
    coordinates: [number, number];
    address?: string;
    city?: string;
    state?: string;
    country?: string;
  }): Promise<ApiResponse<any>> {
    const response = await api.post(`/api/users/${userId}/location`, locationData);
    return response.data;
  }

  async getEvents(params?: {
    page?: number;
    limit?: number;
    sport?: string;
    skillLevel?: string;
    city?: string;
    dateFrom?: string;
    dateTo?: string;
    search?: string;
    lat?: number;
    lng?: number;
    radius?: number;
  }): Promise<ApiResponse<Event[]>> {
    const response = await api.get('/api/events', { params });
    return response.data;
  }

  async getEventById(id: string): Promise<ApiResponse<Event>> {
    const response = await api.get(`/api/events/${id}`);
    return response.data;
  }

  async createEvent(eventData: Partial<Event>): Promise<ApiResponse<Event>> {
    const response = await api.post('/api/events', eventData);
    return response.data;
  }

  async updateEvent(id: string, eventData: Partial<Event>): Promise<ApiResponse<Event>> {
    const response = await api.put(`/api/events/${id}`, eventData);
    return response.data;
  }

  async deleteEvent(id: string): Promise<ApiResponse<any>> {
    const response = await api.delete(`/api/events/${id}`);
    return response.data;
  }

  async joinEvent(eventId: string, userId: string): Promise<ApiResponse<Event>> {
    const response = await api.post(`/api/events/${eventId}/join`, { userId });
    return response.data;
  }

  async leaveEvent(eventId: string, userId: string): Promise<ApiResponse<Event>> {
    const response = await api.delete(`/api/events/${eventId}/leave`, { data: { userId } });
    return response.data;
  }

  async getUserEventsByType(userId: string, params?: {
    page?: number;
    limit?: number;
    type?: 'all' | 'organized' | 'participating';
  }): Promise<ApiResponse<Event[]>> {
    const response = await api.get(`/api/events/user/${userId}`, { params });
    return response.data;
  }
}

export const apiService = new ApiService();
export default apiService;