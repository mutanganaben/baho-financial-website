const DEFAULT_LOCAL_URL = 'http://localhost:4000/api/v1';
const DEFAULT_PROD_URL = 'https://baho-backend-fmr7.onrender.com/api/v1';

export function getApiBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  if (
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ) {
    return DEFAULT_LOCAL_URL;
  }
  return DEFAULT_PROD_URL;
}

export interface ApiProduct {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  minAmount: number;
  maxAmount: number;
  interestRate: number;
  interestPeriod?: string;
  maxTenureMonths: number;
  features?: string[];
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
  retries = 1,
): Promise<T> {
  const primaryBaseUrl = getApiBaseUrl();
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  // Build candidate base URLs: try primary first, then secondary fallback if connection fails
  const candidateBaseUrls: string[] = [primaryBaseUrl];
  if (primaryBaseUrl.includes('localhost') || primaryBaseUrl.includes('127.0.0.1')) {
    candidateBaseUrls.push(DEFAULT_PROD_URL);
  }

  let lastError: Error = new Error('Failed to connect to server.');

  for (const baseUrl of candidateBaseUrls) {
    const url = `${baseUrl}${cleanEndpoint}`;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s timeout allowance for cold starts

        const response = await fetch(url, {
          ...options,
          signal: options.signal || controller.signal,
          headers: {
            ...defaultHeaders,
            ...(options.headers as Record<string, string>),
          },
        });

        clearTimeout(timeoutId);

        const data = await response.json();

        if (!response.ok) {
          const errorMessage = Array.isArray(data?.message)
            ? data.message.join(', ')
            : data?.message || 'An error occurred while communicating with the server.';
          throw new Error(errorMessage);
        }

        return data as T;
      } catch (err: any) {
        lastError = err;
        // If there are retries remaining, wait 1s before retrying
        if (attempt < retries) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    }
  }

  throw lastError;
}
