export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      appointments: {
        Row: {
          clinic: string
          created_at: string
          date: string
          id: string
          notes: string | null
          pet_id: string
          status: string
          time: string
          type: string
          updated_at: string
          veterinarian: string
        }
        Insert: {
          clinic: string
          created_at?: string
          date: string
          id?: string
          notes?: string | null
          pet_id: string
          status?: string
          time: string
          type: string
          updated_at?: string
          veterinarian: string
        }
        Update: {
          clinic?: string
          created_at?: string
          date?: string
          id?: string
          notes?: string | null
          pet_id?: string
          status?: string
          time?: string
          type?: string
          updated_at?: string
          veterinarian?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pets"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          id: string
          name: string
          pet_id: string
          size_bytes: number
          storage_path: string
          type: string
          upload_date: string
        }
        Insert: {
          id?: string
          name: string
          pet_id: string
          size_bytes: number
          storage_path: string
          type: string
          upload_date?: string
        }
        Update: {
          id?: string
          name?: string
          pet_id?: string
          size_bytes?: number
          storage_path?: string
          type?: string
          upload_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pets"
            referencedColumns: ["id"]
          },
        ]
      }
      insurance_info: {
        Row: {
          coverage: string
          created_at: string
          id: string
          pet_id: string
          policy_number: string
          premium: number
          provider: string
          updated_at: string
        }
        Insert: {
          coverage: string
          created_at?: string
          id?: string
          pet_id: string
          policy_number: string
          premium: number
          provider: string
          updated_at?: string
        }
        Update: {
          coverage?: string
          created_at?: string
          id?: string
          pet_id?: string
          policy_number?: string
          premium?: number
          provider?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "insurance_info_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: true
            referencedRelation: "pets"
            referencedColumns: ["id"]
          },
        ]
      }
      medications: {
        Row: {
          created_at: string
          dosage: string
          end_date: string | null
          frequency: string
          id: string
          name: string
          notes: string | null
          pet_id: string
          start_date: string
        }
        Insert: {
          created_at?: string
          dosage: string
          end_date?: string | null
          frequency: string
          id?: string
          name: string
          notes?: string | null
          pet_id: string
          start_date: string
        }
        Update: {
          created_at?: string
          dosage?: string
          end_date?: string | null
          frequency?: string
          id?: string
          name?: string
          notes?: string | null
          pet_id?: string
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "medications_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pets"
            referencedColumns: ["id"]
          },
        ]
      }
      pets: {
        Row: {
          age: number | null
          allergies: string[] | null
          breed: string | null
          color: string | null
          conditions: string[] | null
          created_at: string
          date_of_birth: string | null
          gender: string | null
          id: string
          last_vet_visit: string | null
          microchip_id: string | null
          name: string
          next_vet_visit: string | null
          owner_email: string | null
          owner_name: string | null
          owner_phone: string | null
          profile_image: string | null
          species: string
          updated_at: string
          user_id: string
          weight: number | null
        }
        Insert: {
          age?: number | null
          allergies?: string[] | null
          breed?: string | null
          color?: string | null
          conditions?: string[] | null
          created_at?: string
          date_of_birth?: string | null
          gender?: string | null
          id?: string
          last_vet_visit?: string | null
          microchip_id?: string | null
          name: string
          next_vet_visit?: string | null
          owner_email?: string | null
          owner_name?: string | null
          owner_phone?: string | null
          profile_image?: string | null
          species: string
          updated_at?: string
          user_id: string
          weight?: number | null
        }
        Update: {
          age?: number | null
          allergies?: string[] | null
          breed?: string | null
          color?: string | null
          conditions?: string[] | null
          created_at?: string
          date_of_birth?: string | null
          gender?: string | null
          id?: string
          last_vet_visit?: string | null
          microchip_id?: string | null
          name?: string
          next_vet_visit?: string | null
          owner_email?: string | null
          owner_name?: string | null
          owner_phone?: string | null
          profile_image?: string | null
          species?: string
          updated_at?: string
          user_id?: string
          weight?: number | null
        }
        Relationships: []
      }
      photos: {
        Row: {
          caption: string | null
          id: string
          pet_id: string
          storage_path: string
          upload_date: string
        }
        Insert: {
          caption?: string | null
          id?: string
          pet_id: string
          storage_path: string
          upload_date?: string
        }
        Update: {
          caption?: string | null
          id?: string
          pet_id?: string
          storage_path?: string
          upload_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "photos_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pets"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      vaccinations: {
        Row: {
          created_at: string
          date: string
          id: string
          name: string
          next_due: string | null
          pet_id: string
          veterinarian: string | null
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          name: string
          next_due?: string | null
          pet_id: string
          veterinarian?: string | null
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          name?: string
          next_due?: string | null
          pet_id?: string
          veterinarian?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vaccinations_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pets"
            referencedColumns: ["id"]
          },
        ]
      }
      weight_history: {
        Row: {
          created_at: string
          date: string
          id: string
          notes: string | null
          pet_id: string
          weight: number
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          notes?: string | null
          pet_id: string
          weight: number
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          notes?: string | null
          pet_id?: string
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "weight_history_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pets"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
