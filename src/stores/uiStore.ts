import { create } from 'zustand';

interface UIStore {
  // Modal States
  isAddPetModalOpen: boolean;
  isEditPetModalOpen: boolean;
  isAppointmentModalOpen: boolean;
  isDocumentModalOpen: boolean;
  isPhotoModalOpen: boolean;
  
  // Loading States
  isLoading: boolean;
  loadingMessage: string;
  
  // Navigation
  sidebarCollapsed: boolean;
  activeTab: string;
  
  // Actions
  openAddPetModal: () => void;
  closeAddPetModal: () => void;
  openEditPetModal: () => void;
  closeEditPetModal: () => void;
  openAppointmentModal: () => void;
  closeAppointmentModal: () => void;
  openDocumentModal: () => void;
  closeDocumentModal: () => void;
  openPhotoModal: () => void;
  closePhotoModal: () => void;
  
  setLoading: (loading: boolean, message?: string) => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setActiveTab: (tab: string) => void;
  
  closeAllModals: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  // Initial State
  isAddPetModalOpen: false,
  isEditPetModalOpen: false,
  isAppointmentModalOpen: false,
  isDocumentModalOpen: false,
  isPhotoModalOpen: false,
  
  isLoading: false,
  loadingMessage: '',
  
  sidebarCollapsed: false,
  activeTab: 'overview',
  
  // Modal Actions
  openAddPetModal: () => set({ isAddPetModalOpen: true }),
  closeAddPetModal: () => set({ isAddPetModalOpen: false }),
  openEditPetModal: () => set({ isEditPetModalOpen: true }),
  closeEditPetModal: () => set({ isEditPetModalOpen: false }),
  openAppointmentModal: () => set({ isAppointmentModalOpen: true }),
  closeAppointmentModal: () => set({ isAppointmentModalOpen: false }),
  openDocumentModal: () => set({ isDocumentModalOpen: true }),
  closeDocumentModal: () => set({ isDocumentModalOpen: false }),
  openPhotoModal: () => set({ isPhotoModalOpen: true }),
  closePhotoModal: () => set({ isPhotoModalOpen: false }),
  
  // Loading Actions
  setLoading: (loading, message = '') => set({ isLoading: loading, loadingMessage: message }),
  
  // Navigation Actions
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  
  // Utility
  closeAllModals: () => set({
    isAddPetModalOpen: false,
    isEditPetModalOpen: false,
    isAppointmentModalOpen: false,
    isDocumentModalOpen: false,
    isPhotoModalOpen: false,
  }),
}));