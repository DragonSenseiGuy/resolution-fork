import { prisma } from '$lib/server/prisma';
import { hashPassword, comparePasswords, generateToken } from './utils';

interface RegisterParams {
  email: string;
  password: string;
}

interface LoginParams {
  email: string;
  password: string;
}

interface AuthResult {
  success: boolean;
  userId?: number;
  token?: string;
  error?: string;
}

export const authService = {
  async register({ email, password }: RegisterParams): Promise<AuthResult> {
    try {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        return {
          success: false,
          error: 'Email already in use'
        };
      }

      // Hash the password
      const hashedPassword = await hashPassword(password);

      // Create the user
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword
        }
      });

      // Generate a token
      const token = generateToken(user.id);

      return {
        success: true,
        userId: user.id,
        token
      };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: 'Failed to register user'
      };
    }
  },

  async login({ email, password }: LoginParams): Promise<AuthResult> {
    try {
      // Find the user
      const user = await prisma.user.findUnique({
        where: { email }
      });

      if (!user) {
        return {
          success: false,
          error: 'Invalid email or password'
        };
      }

      // Verify the password
      const isPasswordValid = await comparePasswords(password, user.password);

      if (!isPasswordValid) {
        return {
          success: false,
          error: 'Invalid email or password'
        };
      }

      // Generate a token
      const token = generateToken(user.id);

      return {
        success: true,
        userId: user.id,
        token
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: 'Failed to login'
      };
    }
  },

  async getUserById(userId: number) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          createdAt: true
        }
      });

      return user;
    } catch (error) {
      console.error('Get user error:', error);
      return null;
    }
  }
};