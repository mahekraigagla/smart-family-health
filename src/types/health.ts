
export interface ChatMessage {
  id: string;
  message: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface HealthRecord {
  id: string;
  familyMemberId: string;
  type: 'medical' | 'vaccination' | 'growth' | 'lab' | 'prescription';
  title: string;
  description: string;
  date: Date;
  value?: number;
  unit?: string;
  document?: string;
}

export interface NotificationPreference {
  medicines: boolean;
  appointments: boolean;
  checkups: boolean;
  vaccinations: boolean;
}

export interface AnalyticsData {
  medicineAdherence: { date: string; adherence: number }[];
  expensesTrend: { month: string; amount: number }[];
  appointmentCompletion: { month: string; completed: number; total: number }[];
}

export interface GrowthData {
  id: string;
  familyMemberId: string;
  date: Date;
  height: number;
  weight: number;
  age: number;
}

export interface Vaccination {
  id: string;
  familyMemberId: string;
  vaccine: string;
  date: Date;
  nextDue?: Date;
  status: 'completed' | 'due' | 'overdue';
}
