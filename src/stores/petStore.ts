import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Pet, Appointment, InsuranceQuote } from '@/types/pet';
import { mockPets, mockAppointments, mockInsuranceQuotes } from '@/data/mockData';

interface PetStore {
  // State
  pets: Pet[];
  selectedPetId: string | null;
  appointments: Appointment[];
  insuranceQuotes: InsuranceQuote[];
  isLoading: boolean;

  // Pet Management
  addPet: (pet: Omit<Pet, 'id'>) => void;
  updatePet: (id: string, updates: Partial<Pet>) => void;
  deletePet: (id: string) => void;
  selectPet: (id: string) => void;
  getPetById: (id: string) => Pet | undefined;
  getSelectedPet: () => Pet | undefined;

  // Appointments
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  deleteAppointment: (id: string) => void;
  getUpcomingAppointments: (petId?: string) => Appointment[];

  // Insurance
  generateInsuranceQuotes: (petId: string) => void;
  selectInsurancePlan: (petId: string, quoteId: string) => void;

  // Utils
  initializeWithMockData: () => void;
}

export const usePetStore = create<PetStore>()(
  persist(
    (set, get) => ({
      // Initial State
      pets: [],
      selectedPetId: null,
      appointments: [],
      insuranceQuotes: [],
      isLoading: false,

      // Pet Management
      addPet: (petData) => {
        const newPet: Pet = {
          ...petData,
          id: crypto.randomUUID(),
        };
        set((state) => ({
          pets: [...state.pets, newPet],
        }));
      },

      updatePet: (id, updates) => {
        set((state) => ({
          pets: state.pets.map((pet) =>
            pet.id === id ? { ...pet, ...updates } : pet
          ),
        }));
      },

      deletePet: (id) => {
        set((state) => ({
          pets: state.pets.filter((pet) => pet.id !== id),
          selectedPetId: state.selectedPetId === id ? null : state.selectedPetId,
        }));
      },

      selectPet: (id) => {
        set({ selectedPetId: id });
      },

      getPetById: (id) => {
        return get().pets.find((pet) => pet.id === id);
      },

      getSelectedPet: () => {
        const { pets, selectedPetId } = get();
        return selectedPetId ? pets.find((pet) => pet.id === selectedPetId) : undefined;
      },

      // Appointments
      addAppointment: (appointmentData) => {
        const newAppointment: Appointment = {
          ...appointmentData,
          id: crypto.randomUUID(),
        };
        set((state) => ({
          appointments: [...state.appointments, newAppointment],
        }));
      },

      updateAppointment: (id, updates) => {
        set((state) => ({
          appointments: state.appointments.map((appointment) =>
            appointment.id === id ? { ...appointment, ...updates } : appointment
          ),
        }));
      },

      deleteAppointment: (id) => {
        set((state) => ({
          appointments: state.appointments.filter((appointment) => appointment.id !== id),
        }));
      },

      getUpcomingAppointments: (petId) => {
        const { appointments } = get();
        const now = new Date();
        return appointments
          .filter((appointment) => {
            if (petId && appointment.petId !== petId) return false;
            return new Date(appointment.date) >= now && appointment.status === 'scheduled';
          })
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      },

      // Insurance
      generateInsuranceQuotes: (petId) => {
        const pet = get().getPetById(petId);
        if (!pet) return;

        // Generate personalized quotes based on pet data
        const quotes = mockInsuranceQuotes.map((quote, index) => ({
          ...quote,
          id: crypto.randomUUID(),
          isBestMatch: index === 0, // First quote is "best match"
        }));

        set({ insuranceQuotes: quotes });
      },

      selectInsurancePlan: (petId, quoteId) => {
        const quote = get().insuranceQuotes.find((q) => q.id === quoteId);
        if (!quote) return;

        get().updatePet(petId, {
          insuranceInfo: {
            provider: quote.provider,
            policyNumber: `POL-${Date.now()}`,
            coverage: quote.planName,
            premium: quote.monthlyPremium,
          },
        });
      },

      // Utils
      initializeWithMockData: () => {
        set({
          pets: mockPets,
          appointments: mockAppointments,
          selectedPetId: mockPets[0]?.id || null,
        });
      },
    }),
    {
      name: 'petcare-storage',
      partialize: (state) => ({
        pets: state.pets,
        selectedPetId: state.selectedPetId,
        appointments: state.appointments,
      }),
    }
  )
);