
export interface Inquiry {
  id: number;
  name: string;
  phone: string;
  email: string;
  departmentIds: number[];
  description: string | null;
  createdAtUtc: string; 
}

export type CreateInquiryDto = {
  name: string;
  phone: string;
  email: string;
  departmentIds: number[];
  description: string | null;
};

export interface Department {
  id: number;
  name: string;
}

export interface MonthlyReportItem {
  departmentId: number;
  departmentName: string;
  currentMonthCount: number;
  prevMonthCount: number;
  sameMonthLastYearCount: number;
}
