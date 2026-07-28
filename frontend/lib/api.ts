const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export interface ApiProduct {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  minAmount: number;
  maxAmount: number;
  interestRate: number;
  maxTenureMonths: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiBranch {
  id: string;
  code: string;
  name: string;
  province: string;
  district: string;
  address: string;
  phone: string;
  email?: string;
  openingHours: string;
  latitude?: number;
  longitude?: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers as Record<string, string>),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMessage = Array.isArray(data?.message)
      ? data.message.join(', ')
      : data?.message || 'An error occurred while communicating with the server.';
    throw new Error(errorMessage);
  }

  return data as T;
}
