export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'viewer';
  status: 'active' | 'inactive' | 'suspended';
  createdAt: Date;
  lastLoginAt: Date | null;
  avatar: string | null;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  role: 'admin' | 'user' | 'viewer';
  status?: 'active' | 'inactive' | 'suspended';
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: 'admin' | 'user' | 'viewer';
  status?: 'active' | 'inactive' | 'suspended';
}

export interface GetUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
