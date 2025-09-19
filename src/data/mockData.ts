import { Pet, Appointment, InsuranceQuote } from '@/types/pet';
import goldenRetrieverImg from '@/assets/pet-golden-retriever.jpg';
import tabbyCatImg from '@/assets/pet-tabby-cat.jpg';
import borderCollieImg from '@/assets/pet-border-collie.jpg';

export const mockPets: Pet[] = [
  {
    id: '1',
    name: 'Buddy',
    species: 'dog',
    breed: 'Golden Retriever',
    age: 5,
    weight: 32,
    gender: 'male',
    color: 'Golden',
    microchipId: 'MC123456789',
    profileImage: goldenRetrieverImg,
    dateOfBirth: '2019-03-15',
    owner: {
      name: 'John Smith',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
    },
    healthMetrics: {
      lastVetVisit: '2024-08-15',
      nextVetVisit: '2025-02-15',
      vaccinations: [
        {
          id: 'v1',
          name: 'Rabies',
          date: '2024-03-15',
          nextDue: '2025-03-15',
          veterinarian: 'Dr. Sarah Johnson',
        },
        {
          id: 'v2',
          name: 'DHPP',
          date: '2024-03-15',
          nextDue: '2025-03-15',
          veterinarian: 'Dr. Sarah Johnson',
        },
      ],
      medications: [
        {
          id: 'm1',
          name: 'Heartworm Prevention',
          dosage: '1 tablet',
          frequency: 'Monthly',
          startDate: '2024-01-01',
          notes: 'Give with food',
        },
      ],
      allergies: ['Chicken'],
      conditions: ['Hip Dysplasia'],
      weightHistory: [
        { date: '2024-01-01', weight: 30 },
        { date: '2024-04-01', weight: 31 },
        { date: '2024-07-01', weight: 32 },
        { date: '2024-10-01', weight: 32 },
      ],
    },
    documents: [
      {
        id: 'd1',
        name: 'Vaccination Record 2024',
        type: 'vaccination',
        url: '/documents/buddy-vaccinations.pdf',
        uploadDate: '2024-08-15',
        size: 245760,
      },
    ],
    photos: [
      {
        id: 'p1',
        url: goldenRetrieverImg,
        caption: 'Buddy at the park',
        uploadDate: '2024-08-01',
      },
    ],
    insuranceInfo: {
      provider: 'PetFirst',
      policyNumber: 'PF-2024-001',
      coverage: 'Complete Care',
      premium: 89,
    },
  },
  {
    id: '2',
    name: 'Whiskers',
    species: 'cat',
    breed: 'Tabby',
    age: 3,
    weight: 4.5,
    gender: 'female',
    color: 'Brown Tabby',
    microchipId: 'MC987654321',
    profileImage: tabbyCatImg,
    dateOfBirth: '2021-06-10',
    owner: {
      name: 'John Smith',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
    },
    healthMetrics: {
      lastVetVisit: '2024-09-01',
      nextVetVisit: '2025-03-01',
      vaccinations: [
        {
          id: 'v3',
          name: 'FVRCP',
          date: '2024-06-10',
          nextDue: '2025-06-10',
          veterinarian: 'Dr. Mike Chen',
        },
      ],
      medications: [],
      allergies: [],
      conditions: [],
      weightHistory: [
        { date: '2024-01-01', weight: 4.2 },
        { date: '2024-04-01', weight: 4.4 },
        { date: '2024-07-01', weight: 4.5 },
        { date: '2024-10-01', weight: 4.5 },
      ],
    },
    documents: [],
    photos: [
      {
        id: 'p2',
        url: tabbyCatImg,
        caption: 'Whiskers lounging',
        uploadDate: '2024-09-01',
      },
    ],
  },
  {
    id: '3',
    name: 'Luna',
    species: 'dog',
    breed: 'Border Collie',
    age: 2,
    weight: 22,
    gender: 'female',
    color: 'Black & White',
    profileImage: borderCollieImg,
    dateOfBirth: '2022-11-20',
    owner: {
      name: 'John Smith',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
    },
    healthMetrics: {
      lastVetVisit: '2024-07-20',
      nextVetVisit: '2025-01-20',
      vaccinations: [
        {
          id: 'v4',
          name: 'Rabies',
          date: '2023-11-20',
          nextDue: '2024-11-20',
          veterinarian: 'Dr. Lisa Park',
        },
      ],
      medications: [],
      allergies: [],
      conditions: [],
      weightHistory: [
        { date: '2024-01-01', weight: 20 },
        { date: '2024-04-01', weight: 21 },
        { date: '2024-07-01', weight: 22 },
        { date: '2024-10-01', weight: 22 },
      ],
    },
    documents: [],
    photos: [
      {
        id: 'p3',
        url: borderCollieImg,
        caption: 'Luna playing fetch',
        uploadDate: '2024-07-15',
      },
    ],
  },
];

export const mockAppointments: Appointment[] = [
  {
    id: 'a1',
    petId: '1',
    date: '2024-12-15',
    time: '10:00 AM',
    type: 'checkup',
    veterinarian: 'Dr. Sarah Johnson',
    clinic: 'Happy Paws Veterinary',
    notes: 'Annual checkup and weight monitoring',
    status: 'scheduled',
  },
  {
    id: 'a2',
    petId: '2',
    date: '2024-12-20',
    time: '2:30 PM',
    type: 'vaccination',
    veterinarian: 'Dr. Mike Chen',
    clinic: 'City Pet Care',
    notes: 'Annual FVRCP booster',
    status: 'scheduled',
  },
  {
    id: 'a3',
    petId: '3',
    date: '2024-11-25',
    time: '11:15 AM',
    type: 'vaccination',
    veterinarian: 'Dr. Lisa Park',
    clinic: 'Westside Animal Hospital',
    notes: 'Rabies vaccination due',
    status: 'scheduled',
  },
];

export const mockInsuranceQuotes: Omit<InsuranceQuote, 'id'>[] = [
  {
    provider: 'PetFirst',
    planName: 'Complete Care',
    monthlyPremium: 89,
    annualDeductible: 250,
    coverage: {
      accidents: 90,
      illness: 90,
      wellness: true,
    },
    features: [
      'Unlimited annual coverage',
      'No upper age limits',
      'Direct vet payment',
      'Wellness coverage included',
    ],
    rating: 4.8,
    isBestMatch: true,
  },
  {
    provider: 'Healthy Paws',
    planName: 'Accident & Illness',
    monthlyPremium: 67,
    annualDeductible: 500,
    coverage: {
      accidents: 80,
      illness: 80,
      wellness: false,
    },
    features: [
      'No caps on payouts',
      'Fast claim processing',
      'Mobile app',
      'Covers hereditary conditions',
    ],
    rating: 4.5,
  },
  {
    provider: 'Embrace',
    planName: 'Superior Plus',
    monthlyPremium: 95,
    annualDeductible: 200,
    coverage: {
      accidents: 90,
      illness: 90,
      wellness: true,
    },
    features: [
      'Customizable coverage',
      'Wellness rewards program',
      'Personal pet assistant',
      'Coverage for alternative therapies',
    ],
    rating: 4.6,
  },
];