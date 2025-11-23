import {
  AddPanelUserPayload,
  AdminDashboardStats,
  AdminUser,
  AuditLog,
  CreateSchoolPayload,
  PanelUser,
  SchoolAccount,
  UpdatePanelUserPayload,
} from '../types';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RequestOptions {
  method?: HttpMethod;
  token?: string | null;
  body?: unknown;
}

const ADMIN_API_BASE = '/api/admin';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const message = await safeErrorMessage(response);
    throw new Error(message);
  }
  return response.json() as Promise<T>;
}

async function safeErrorMessage(response: Response): Promise<string> {
  try {
    const payload = await response.json();
    return payload?.message || response.statusText;
  } catch {
    return response.statusText;
  }
}

async function request<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', token, body } = options;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${ADMIN_API_BASE}${url}`, {
    method,
    headers,
    credentials: 'include',
    body: body ? JSON.stringify(body) : undefined,
  });

  return handleResponse<T>(response);
}

export async function login(
  email: string,
  password: string
): Promise<{ token: string; admin: AdminUser }> {
  return request<{ token: string; admin: AdminUser }>('/auth/login', {
    method: 'POST',
    body: { email, password },
  });
}

export async function fetchDashboard(token: string | null): Promise<AdminDashboardStats> {
  return request<AdminDashboardStats>('/overview', { token });
}

export async function fetchSchools(token: string | null): Promise<SchoolAccount[]> {
  return request<SchoolAccount[]>('/schools', { token });
}

export async function createSchool(
  payload: CreateSchoolPayload,
  token: string | null
): Promise<SchoolAccount> {
  return request<SchoolAccount>('/schools/create', { method: 'POST', body: payload, token });
}

export async function fetchPanelUsers(
  schoolId: string,
  token: string | null
): Promise<PanelUser[]> {
  return request<PanelUser[]>(`/schools/${schoolId}/users`, { token });
}

export async function addPanelUser(
  payload: AddPanelUserPayload,
  token: string | null
): Promise<PanelUser> {
  return request<PanelUser>('/schools/addUser', { method: 'POST', body: payload, token });
}

export async function updatePanelUser(
  panelUserId: string,
  payload: UpdatePanelUserPayload,
  token: string | null
): Promise<PanelUser> {
  return request<PanelUser>(`/schools/updateAgent/${panelUserId}`, {
    method: 'PUT',
    body: payload,
    token,
  });
}

export async function togglePanelUser(
  panelUserId: string,
  isActive: boolean,
  token: string | null
): Promise<PanelUser> {
  return request<PanelUser>(`/schools/${panelUserId}/${isActive ? 'activate' : 'deactivate'}`, {
    method: 'PUT',
    token,
  });
}

export async function fetchLogs(token: string | null): Promise<AuditLog[]> {
  return request<AuditLog[]>('/logs', { token });
}
