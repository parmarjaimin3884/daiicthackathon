import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'student' | 'mentor';
}

interface AuthResponse {
  token: string;
  role: 'student' | 'mentor';
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

class AuthService {
  private static instance: AuthService;
  private token: string | null = null;
  private role: 'student' | 'mentor' | null = null;

  private constructor() {
    // Initialize with stored token if available
    this.token = localStorage.getItem('token');
    this.role = localStorage.getItem('role') as 'student' | 'mentor' | null;
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      const { token, role, user } = response.data;
      
      this.setToken(token);
      this.setRole(role);
      
      return { token, role, user };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Login failed');
      }
      throw new Error('Login failed');
    }
  }

  public async register(data: RegistrationData): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, data);
      const { token, role, user } = response.data;
      
      this.setToken(token);
      this.setRole(role);
      
      return { token, role, user };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Registration failed');
      }
      throw new Error('Registration failed');
    }
  }

  public async forgotPassword(email: string): Promise<void> {
    try {
      await axios.post(`${API_URL}/auth/forgot-password`, { email });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to send reset link');
      }
      throw new Error('Failed to send reset link');
    }
  }

  public async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      await axios.post(`${API_URL}/auth/reset-password`, {
        token,
        newPassword,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to reset password');
      }
      throw new Error('Failed to reset password');
    }
  }

  public async socialLogin(provider: 'google' | 'linkedin', token: string): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_URL}/auth/social/${provider}`, { token });
      const { token: authToken, role, user } = response.data;
      
      this.setToken(authToken);
      this.setRole(role);
      
      return { token: authToken, role, user };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Social login failed');
      }
      throw new Error('Social login failed');
    }
  }

  public logout(): void {
    this.token = null;
    this.role = null;
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  public getRole(): 'student' | 'mentor' | null {
    return this.role;
  }

  public getToken(): string | null {
    return this.token;
  }

  private setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  private setRole(role: 'student' | 'mentor'): void {
    this.role = role;
    localStorage.setItem('role', role);
  }
}

export const authService = AuthService.getInstance(); 