export interface AdminUser {
  id: string;
  email: string;
  role: string;
  displayName?: string;
}

export interface SchoolAccount {
  schoolId: string;
  schoolName: string;
  totalLicenses: number;
  activeLicenses: number;
}

export interface CreateSchoolPayload {
  schoolName: string;
  totalLicenses: number;
}

export interface PanelUser {
  panelUserId: string;
  linkCode: string;
  assignedAgent: string;
  defaultGrade: string;
  isActive: boolean;
}

export interface AddPanelUserPayload {
  schoolId: string;
  assignedAgent: string;
  defaultGrade: string;
}

export interface UpdatePanelUserPayload {
  assignedAgent?: string;
  defaultGrade?: string;
  isActive?: boolean;
}

export interface AdminDashboardStats {
  totalSchools: number;
  totalLicenses: number;
  activeLicenses: number;
  panelUsers: number;
}

export interface AuditLog {
  id: string;
  action: string;
  actor: string;
  createdAt: string;
  target: string;
  detail?: string;
}
