import { User, CreateUserRequest, UpdateUserRequest, UserError, UserErrorCode } from '../types';
import { mockUsers } from '../data/mock';

const STORAGE_KEY = 'wdashboard-users';
const STORAGE_VERSION = '1.0.0';

interface UsersStorageData {
  users: User[];
  lastModified: string;
  version: string;
}

export class UsersStorage {
  private initialized = false;

  private async initializeStorage(): Promise<void> {
    if (this.initialized) return;

    try {
      const existing = localStorage.getItem(STORAGE_KEY);
      if (!existing) {
        // Initialize with mock data
        const initialData: UsersStorageData = {
          users: mockUsers,
          lastModified: new Date().toISOString(),
          version: STORAGE_VERSION,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
      }
      this.initialized = true;
    } catch (error) {
      throw this.createStorageError('Failed to initialize storage', error);
    }
  }

  private getStorageData(): UsersStorageData {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        throw new Error('No data found in storage');
      }
      const parsed = JSON.parse(data);
      
      // Validate data structure
      if (!parsed.users || !Array.isArray(parsed.users)) {
        throw new Error('Invalid data structure in storage');
      }
      
      return parsed;
    } catch (error) {
      throw this.createStorageError('Failed to read storage data', error);
    }
  }

  private setStorageData(data: UsersStorageData): void {
    try {
      const serialized = JSON.stringify(data);
      localStorage.setItem(STORAGE_KEY, serialized);
    } catch (error) {
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        throw this.createError('STORAGE_ERROR', 'Storage quota exceeded. Please clear some data.');
      }
      throw this.createStorageError('Failed to write storage data', error);
    }
  }

  private createStorageError(message: string, originalError: any): UserError {
    if (originalError instanceof Error && originalError.name === 'QuotaExceededError') {
      return this.createError('STORAGE_ERROR', 'Storage quota exceeded. Please clear some data.');
    }
    if (originalError instanceof Error && originalError.name === 'SecurityError') {
      return this.createError('STORAGE_ERROR', 'Storage access denied. Check browser settings.');
    }
    return this.createError('STORAGE_ERROR', message);
  }

  private createError(code: UserErrorCode, message: string, details?: any): UserError {
    return {
      code,
      message,
      details,
      operation: 'read',
    };
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private validateName(name: string): boolean {
    return name.trim().length >= 1 && name.trim().length <= 100;
  }

  async getUsers(): Promise<User[]> {
    await this.initializeStorage();
    try {
      const data = this.getStorageData();
      return data.users;
    } catch (error) {
      if (error && typeof error === 'object' && 'code' in error) {
        throw error as UserError;
      }
      throw this.createStorageError('Failed to get users', error);
    }
  }

  async getUserById(id: string): Promise<User | null> {
    await this.initializeStorage();
    try {
      const data = this.getStorageData();
      const user = data.users.find(u => u.id === id);
      return user || null;
    } catch (error) {
      if (error && typeof error === 'object' && 'code' in error) {
        throw error as UserError;
      }
      throw this.createStorageError('Failed to get user by ID', error);
    }
  }

  async createUser(userData: CreateUserRequest): Promise<User> {
    await this.initializeStorage();
    
    // Validate input
    if (!this.validateName(userData.name)) {
      throw this.createError('VALIDATION_ERROR', 'Name must be between 1 and 100 characters');
    }
    if (!this.validateEmail(userData.email)) {
      throw this.createError('VALIDATION_ERROR', 'Invalid email format');
    }

    try {
      const data = this.getStorageData();
      
      // Check for duplicate email
      const emailExists = data.users.some(u => u.email.toLowerCase() === userData.email.toLowerCase());
      if (emailExists) {
        throw this.createError('DUPLICATE_EMAIL', 'Email address already exists');
      }

      const newUser: User = {
        id: this.generateId(),
        name: userData.name.trim(),
        email: userData.email.toLowerCase().trim(),
        role: userData.role,
        status: userData.status || 'active',
        createdAt: new Date().toISOString(),
      };

      data.users.push(newUser);
      data.lastModified = new Date().toISOString();
      this.setStorageData(data);

      return newUser;
    } catch (error) {
      if (error && typeof error === 'object' && 'code' in error) {
        const userError = error as UserError;
        userError.operation = 'create';
        throw userError;
      }
      throw this.createStorageError('Failed to create user', error);
    }
  }

  async updateUser(id: string, updates: UpdateUserRequest): Promise<User> {
    await this.initializeStorage();
    
    // Validate input if provided
    if (updates.name !== undefined && !this.validateName(updates.name)) {
      throw this.createError('VALIDATION_ERROR', 'Name must be between 1 and 100 characters');
    }
    if (updates.email !== undefined && !this.validateEmail(updates.email)) {
      throw this.createError('VALIDATION_ERROR', 'Invalid email format');
    }

    try {
      const data = this.getStorageData();
      const userIndex = data.users.findIndex(u => u.id === id);
      
      if (userIndex === -1) {
        throw this.createError('USER_NOT_FOUND', 'User not found');
      }

      const user = data.users[userIndex];

      // Check for duplicate email if email is being updated
      if (updates.email && updates.email.toLowerCase() !== user.email.toLowerCase()) {
        const emailExists = data.users.some(u => u.email.toLowerCase() === updates.email!.toLowerCase() && u.id !== id);
        if (emailExists) {
          throw this.createError('DUPLICATE_EMAIL', 'Email address already exists');
        }
      }

      // Check if trying to demote last admin
      if (updates.role === 'user' && user.role === 'admin') {
        const adminCount = data.users.filter(u => u.role === 'admin' && u.id !== id).length;
        if (adminCount === 0) {
          throw this.createError('LAST_ADMIN_DEMOTION', 'Cannot demote the last administrator');
        }
      }

      // Check if trying to deactivate last admin
      if (updates.status === 'inactive' && user.status === 'active' && user.role === 'admin') {
        const activeAdminCount = data.users.filter(u => u.role === 'admin' && u.status === 'active' && u.id !== id).length;
        if (activeAdminCount === 0) {
          throw this.createError('LAST_ADMIN_DEMOTION', 'Cannot deactivate the last administrator');
        }
      }

      // Apply updates
      const updatedUser: User = {
        ...user,
        ...(updates.name && { name: updates.name.trim() }),
        ...(updates.email && { email: updates.email.toLowerCase().trim() }),
        ...(updates.role && { role: updates.role }),
        ...(updates.status !== undefined && { status: updates.status }),
      };

      data.users[userIndex] = updatedUser;
      data.lastModified = new Date().toISOString();
      this.setStorageData(data);

      return updatedUser;
    } catch (error) {
      if (error && typeof error === 'object' && 'code' in error) {
        const userError = error as UserError;
        userError.operation = 'update';
        throw userError;
      }
      throw this.createStorageError('Failed to update user', error);
    }
  }

  async deleteUser(id: string): Promise<void> {
    await this.initializeStorage();
    
    try {
      const data = this.getStorageData();
      const userIndex = data.users.findIndex(u => u.id === id);
      
      if (userIndex === -1) {
        throw this.createError('USER_NOT_FOUND', 'User not found');
      }

      const user = data.users[userIndex];

      // Check if trying to delete last admin
      if (user.role === 'admin') {
        const adminCount = data.users.filter(u => u.role === 'admin' && u.id !== id).length;
        if (adminCount === 0) {
          throw this.createError('LAST_ADMIN_DELETION', 'Cannot delete the last administrator');
        }
      }

      data.users.splice(userIndex, 1);
      data.lastModified = new Date().toISOString();
      this.setStorageData(data);
    } catch (error) {
      if (error && typeof error === 'object' && 'code' in error) {
        const userError = error as UserError;
        userError.operation = 'delete';
        throw userError;
      }
      throw this.createStorageError('Failed to delete user', error);
    }
  }

  async isEmailAvailable(email: string, excludeId?: string): Promise<boolean> {
    await this.initializeStorage();
    try {
      const data = this.getStorageData();
      const normalizedEmail = email.toLowerCase().trim();
      return !data.users.some(u => u.email === normalizedEmail && u.id !== excludeId);
    } catch (error) {
      if (error && typeof error === 'object' && 'code' in error) {
        throw error as UserError;
      }
      throw this.createStorageError('Failed to check email availability', error);
    }
  }

  async canDeleteUser(id: string): Promise<boolean> {
    await this.initializeStorage();
    try {
      const data = this.getStorageData();
      const user = data.users.find(u => u.id === id);
      
      if (!user) {
        return false;
      }

      // Can delete if not admin, or if admin but there are other admins
      if (user.role !== 'admin') {
        return true;
      }

      const adminCount = data.users.filter(u => u.role === 'admin' && u.id !== id).length;
      return adminCount > 0;
    } catch (error) {
      if (error && typeof error === 'object' && 'code' in error) {
        throw error as UserError;
      }
      throw this.createStorageError('Failed to check delete permission', error);
    }
  }
}
