export interface Pet {
  id: string;
  name: string;
  species: 'dog' | 'cat' | 'bird' | 'rabbit' | 'other';
  breed: string;
  age: number;
  weight: number;
  gender: 'male' | 'female';
  color: string;
  microchipId?: string;
  profileImage: string;
  dateOfBirth: string;
  owner: {
    name: string;
    email: string;
    phone: string;
  };
  healthMetrics: {
    lastVetVisit: string;
    nextVetVisit: string;
    vaccinations: Vaccination[];
    medications: Medication[];
    allergies: string[];
    conditions: string[];
    weightHistory: WeightEntry[];
  };
  documents: Document[];
  photos: Photo[];
  insuranceInfo?: {
    provider: string;
    policyNumber: string;
    coverage: string;
    premium: number;
  };
}

export interface Vaccination {
  id: string;
  name: string;
  date: string;
  nextDue: string;
  veterinarian: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  notes?: string;
}

export interface WeightEntry {
  date: string;
  weight: number;
  notes?: string;
}

export interface Document {
  id: string;
  name: string;
  type: 'vaccination' | 'medical' | 'insurance' | 'other';
  url: string;
  uploadDate: string;
  size: number;
}

export interface Photo {
  id: string;
  url: string;
  caption?: string;
  uploadDate: string;
}

export interface Appointment {
  id: string;
  petId: string;
  date: string;
  time: string;
  type: 'checkup' | 'vaccination' | 'surgery' | 'grooming' | 'emergency';
  veterinarian: string;
  clinic: string;
  notes?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface InsuranceQuote {
  id: string;
  provider: string;
  planName: string;
  monthlyPremium: number;
  annualDeductible: number;
  coverage: {
    accidents: number;
    illness: number;
    wellness: boolean;
  };
  features: string[];
  rating: number;
  isBestMatch?: boolean;
}