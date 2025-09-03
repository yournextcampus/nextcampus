export type StudentType = 'home' | 'international';

export interface Student {
  type: StudentType;
}

export interface ApplyFormData {
  applicantType: StudentType;
  fullName: string;
  email: string;
  phone: string;
  highestQualification: string;
  intendedLevel: string;
  intendedSubject: string;
  preferredIntake: string;
  englishTest?: string;
  budget?: string;
  ucasStatus?: string;
  message?: string;
  consent: boolean;
}

export interface ConsultationFormData {
  applicantType: StudentType;
  fullName: string;
  email: string;
  phone: string;
  topic: string;
  preferredDateTime: string;
  message?: string;
  consent: boolean;
}

export interface University {
  id: string;
  name: string;
  location: string;
  tuitionRange: string;
  ranking: number;
  imageUrl: string;
  specialties: string[];
}

export interface Scholarship {
  id: string;
  name: string;
  amount: string;
  eligibility: string;
  deadline: string;
  provider: string;
  applicantType: StudentType | 'both';
}