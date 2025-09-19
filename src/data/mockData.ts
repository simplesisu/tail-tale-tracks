import { Pet, Appointment, InsuranceQuote } from '@/types/pet';
import goldenRetrieverImg from '@/assets/pet-golden-retriever.jpg';
import tabbyCatImg from '@/assets/pet-tabby-cat.jpg';
import borderCollieImg from '@/assets/pet-border-collie.jpg';
import petVetVisitImg from '@/assets/pet-vet-visit.jpg';
import petForestPlayImg from '@/assets/pet-forest-play.jpg';
import petBeachRunImg from '@/assets/pet-beach-run.jpg';

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
      {
        id: 'd2',
        name: 'Hip Dysplasia X-Ray Report',
        type: 'medical',
        url: '/documents/buddy-hip-xray-2024.pdf',
        uploadDate: '2024-06-20',
        size: 1024000,
      },
      {
        id: 'd3',
        name: 'Agria Insurance Policy',
        type: 'insurance',
        url: '/documents/buddy-agria-policy.pdf',
        uploadDate: '2024-01-15',
        size: 456789,
      },
      {
        id: 'd4',
        name: 'Microchip Registration',
        type: 'other',
        url: '/documents/buddy-microchip-cert.pdf',
        uploadDate: '2019-03-20',
        size: 123456,
      },
      {
        id: 'd5',
        name: 'Blood Test Results - Senior Panel',
        type: 'medical',
        url: '/documents/buddy-blood-test-2024.pdf',
        uploadDate: '2024-08-15',
        size: 345678,
      },
    ],
    photos: [
      {
        id: 'p1',
        url: goldenRetrieverImg,
        caption: 'Buddy at the Swedish dog park',
        uploadDate: '2024-08-01',
      },
      {
        id: 'p1b',
        url: petVetVisitImg,
        caption: 'Annual vet checkup at Stockholm Veterinary Clinic',
        uploadDate: '2024-08-15',
      },
      {
        id: 'p1c',
        url: petBeachRunImg,
        caption: 'Running on Gotland beaches during summer vacation',
        uploadDate: '2024-07-20',
      },
    ],
    insuranceInfo: {
      provider: 'Agria Djurförsäkring',
      policyNumber: 'AG-2024-001',
      coverage: 'Komplett Plus',
      premium: 895,
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
    documents: [
      {
        id: 'd6',
        name: 'FVRCP Vaccination Certificate',
        type: 'vaccination',
        url: '/documents/whiskers-fvrcp-2024.pdf',
        uploadDate: '2024-06-10',
        size: 198432,
      },
      {
        id: 'd7',
        name: 'Spay Surgery Report',
        type: 'medical',
        url: '/documents/whiskers-spay-surgery.pdf',
        uploadDate: '2021-08-15',
        size: 567890,
      },
      {
        id: 'd8',
        name: 'Hedvig Cat Insurance Policy',
        type: 'insurance',
        url: '/documents/whiskers-hedvig-policy.pdf',
        uploadDate: '2021-07-01',
        size: 423156,
      },
    ],
    photos: [
      {
        id: 'p2',
        url: tabbyCatImg,
        caption: 'Whiskers lounging in Swedish apartment',
        uploadDate: '2024-09-01',
      },
      {
        id: 'p2b',
        url: petForestPlayImg,
        caption: 'Exploring the Swedish forest on supervised outdoor time',
        uploadDate: '2024-08-20',
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
    documents: [
      {
        id: 'd9',
        name: 'Puppy Vaccination Series Complete',
        type: 'vaccination',
        url: '/documents/luna-puppy-vaccines.pdf',
        uploadDate: '2023-01-20',
        size: 312456,
      },
      {
        id: 'd10',
        name: 'Hip & Elbow Screening Results',
        type: 'medical',
        url: '/documents/luna-hip-elbow-screen.pdf',
        uploadDate: '2024-05-15',
        size: 789123,
      },
      {
        id: 'd11',
        name: 'Sveland Working Dog Insurance',
        type: 'insurance',
        url: '/documents/luna-sveland-policy.pdf',
        uploadDate: '2023-01-01',
        size: 523789,
      },
      {
        id: 'd12',
        name: 'Agility Training Certificate',
        type: 'other',
        url: '/documents/luna-agility-cert.pdf',
        uploadDate: '2024-06-30',
        size: 234567,
      },
    ],
    photos: [
      {
        id: 'p3',
        url: borderCollieImg,
        caption: 'Luna playing fetch in Swedish countryside',
        uploadDate: '2024-07-15',
      },
      {
        id: 'p3b',
        url: petVetVisitImg,
        caption: 'Luna at the veterinary clinic for health screening',
        uploadDate: '2024-05-15',
      },
      {
        id: 'p3c',
        url: petBeachRunImg,
        caption: 'Agility training session in Malmö',
        uploadDate: '2024-06-25',
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
    provider: 'Agria Djurförsäkring',
    planName: 'Komplett Plus',
    monthlyPremium: 895,  // SEK
    annualDeductible: 1500,  // SEK
    coverage: {
      accidents: 100,
      illness: 100,
      wellness: true,
    },
    features: [
      'Unlimited annual coverage for illness & accidents',
      'Breed-specific coverage (Golden Retriever hip issues covered)',
      'No upper age limits for renewals',
      'Direct payment to veterinarians',
      'Digital vet consultations included',
      '⚠️ Hidden: 25% co-pay after age 8',
      '⚠️ Hidden: Waiting period 20 days for illness',
      '⚠️ Hidden: Pre-existing conditions permanently excluded',
    ],
    rating: 4.8,
    isBestMatch: true,
  },
  {
    provider: 'Hedvig',
    planName: 'Premium Hundförsäkring',
    monthlyPremium: 726,  // SEK
    annualDeductible: 2000,  // SEK
    coverage: {
      accidents: 90,
      illness: 90,
      wellness: true,
    },
    features: [
      'Modern digital-first approach',
      'Fast claim processing via app',
      'Free annual health check',
      'Covers hereditary conditions (hip dysplasia)',
      'No binding period',
      '⚠️ Age Limit: New policies only up to age 7',
      '⚠️ Breed Risk: Golden Retrievers +15% premium',
      '⚠️ Hidden: Wellness coverage capped at 3,000 SEK/year',
    ],
    rating: 4.6,
  },
  {
    provider: 'Trygg-Hansa',
    planName: 'Djur Försäkring Hög',
    monthlyPremium: 1150,  // SEK
    annualDeductible: 1200,  // SEK
    coverage: {
      accidents: 85,
      illness: 85,
      wellness: false,
    },
    features: [
      'Established insurer with 100+ years experience',
      'Covers alternative treatments (acupuncture, physiotherapy)',
      'Travel insurance included for EU trips',
      'Liability coverage up to 1M SEK',
      '⚠️ Age Restriction: Premium doubles after age 9',
      '⚠️ Breed Exclusion: Hip dysplasia coverage reduced to 50%',
      '⚠️ Hidden: Administrative fee 195 SEK per claim',
      '⚠️ Hidden: 6-month waiting period for joint conditions',
    ],
    rating: 4.2,
  },
  {
    provider: 'Folksam',
    planName: 'Djurförsäkring Bas Plus',
    monthlyPremium: 654,  // SEK
    annualDeductible: 2500,  // SEK
    coverage: {
      accidents: 75,
      illness: 75,
      wellness: false,
    },
    features: [
      'Mutual insurance company - member-owned',
      'Competitive pricing for basic coverage',
      'Covers dental treatment',
      'Member dividends possible',
      '⚠️ Coverage Limit: Max 30,000 SEK per incident',
      '⚠️ Age Penalty: No new policies after age 6',
      '⚠️ Breed Warning: Large breeds excluded from joint coverage',
      '⚠️ Hidden: Claim processing fee 150 SEK',
    ],
    rating: 3.9,
  },
  {
    provider: 'Sveland Djurförsäkringar',
    planName: 'Hund Försäkring Optimal',
    monthlyPremium: 823,  // SEK
    annualDeductible: 1800,  // SEK
    coverage: {
      accidents: 95,
      illness: 95,
      wellness: true,
    },
    features: [
      'Specialized in animals only - 40+ years experience',
      '80% of premiums returned as claims (customer-owned)',
      'Covers behavioral therapy and training',
      'Excellent reputation among Swedish veterinarians',
      'No breed discrimination policy',
      '⚠️ Age Factor: Premium increases 10% yearly after age 6',
      '⚠️ Condition Limit: Cancer treatment max 75,000 SEK lifetime',
      '⚠️ Hidden: Wellness requires 12-month policy minimum',
    ],
    rating: 4.7,
  },
  {
    provider: 'Länsförsäkringar',
    planName: 'Djur & Ägare Skydd',
    monthlyPremium: 692,  // SEK
    annualDeductible: 2200,  // SEK
    coverage: {
      accidents: 80,
      illness: 80,
      wellness: false,
    },
    features: [
      'Regional cooperative insurance',
      'Personal service at local offices',
      'Covers third-party liability',
      'Multi-pet discounts available',
      '⚠️ Regional Limit: Coverage only within Sweden',
      '⚠️ Age Cutoff: No illness coverage after age 10',
      '⚠️ Breed Risk: Golden Retrievers require health certificate',
      '⚠️ Hidden: Deductible doubles for chronic conditions',
    ],
    rating: 4.1,
  },
];