-- Create pets table with RLS
CREATE TABLE IF NOT EXISTS public.pets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  species TEXT NOT NULL CHECK (species IN ('dog', 'cat', 'bird', 'rabbit', 'other')),
  breed TEXT,
  age INTEGER CHECK (age >= 0),
  weight NUMERIC CHECK (weight > 0),
  gender TEXT CHECK (gender IN ('male', 'female')),
  color TEXT,
  microchip_id TEXT,
  profile_image TEXT,
  date_of_birth DATE,
  owner_name TEXT,
  owner_email TEXT,
  owner_phone TEXT,
  last_vet_visit DATE,
  next_vet_visit DATE,
  allergies TEXT[],
  conditions TEXT[],
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.pets ENABLE ROW LEVEL SECURITY;

-- RLS policies for pets
CREATE POLICY "Users can view their own pets"
  ON public.pets FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own pets"
  ON public.pets FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pets"
  ON public.pets FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own pets"
  ON public.pets FOR DELETE
  USING (auth.uid() = user_id);

-- Create vaccinations table
CREATE TABLE IF NOT EXISTS public.vaccinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id UUID REFERENCES public.pets(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  date DATE NOT NULL,
  next_due DATE,
  veterinarian TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.vaccinations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view vaccinations for their pets"
  ON public.vaccinations FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.pets WHERE pets.id = vaccinations.pet_id AND pets.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert vaccinations for their pets"
  ON public.vaccinations FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.pets WHERE pets.id = vaccinations.pet_id AND pets.user_id = auth.uid()
  ));

CREATE POLICY "Users can update vaccinations for their pets"
  ON public.vaccinations FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.pets WHERE pets.id = vaccinations.pet_id AND pets.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete vaccinations for their pets"
  ON public.vaccinations FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.pets WHERE pets.id = vaccinations.pet_id AND pets.user_id = auth.uid()
  ));

-- Create medications table
CREATE TABLE IF NOT EXISTS public.medications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id UUID REFERENCES public.pets(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  dosage TEXT NOT NULL,
  frequency TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.medications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view medications for their pets"
  ON public.medications FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.pets WHERE pets.id = medications.pet_id AND pets.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert medications for their pets"
  ON public.medications FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.pets WHERE pets.id = medications.pet_id AND pets.user_id = auth.uid()
  ));

CREATE POLICY "Users can update medications for their pets"
  ON public.medications FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.pets WHERE pets.id = medications.pet_id AND pets.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete medications for their pets"
  ON public.medications FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.pets WHERE pets.id = medications.pet_id AND pets.user_id = auth.uid()
  ));

-- Create weight_history table
CREATE TABLE IF NOT EXISTS public.weight_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id UUID REFERENCES public.pets(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  weight NUMERIC NOT NULL CHECK (weight > 0),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.weight_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view weight history for their pets"
  ON public.weight_history FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.pets WHERE pets.id = weight_history.pet_id AND pets.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert weight history for their pets"
  ON public.weight_history FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.pets WHERE pets.id = weight_history.pet_id AND pets.user_id = auth.uid()
  ));

CREATE POLICY "Users can update weight history for their pets"
  ON public.weight_history FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.pets WHERE pets.id = weight_history.pet_id AND pets.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete weight history for their pets"
  ON public.weight_history FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.pets WHERE pets.id = weight_history.pet_id AND pets.user_id = auth.uid()
  ));

-- Create appointments table
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id UUID REFERENCES public.pets(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('checkup', 'vaccination', 'surgery', 'grooming', 'emergency')),
  veterinarian TEXT NOT NULL,
  clinic TEXT NOT NULL,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view appointments for their pets"
  ON public.appointments FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.pets WHERE pets.id = appointments.pet_id AND pets.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert appointments for their pets"
  ON public.appointments FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.pets WHERE pets.id = appointments.pet_id AND pets.user_id = auth.uid()
  ));

CREATE POLICY "Users can update appointments for their pets"
  ON public.appointments FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.pets WHERE pets.id = appointments.pet_id AND pets.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete appointments for their pets"
  ON public.appointments FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.pets WHERE pets.id = appointments.pet_id AND pets.user_id = auth.uid()
  ));

-- Create documents table
CREATE TABLE IF NOT EXISTS public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id UUID REFERENCES public.pets(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('vaccination', 'medical', 'insurance', 'other')),
  storage_path TEXT NOT NULL,
  size_bytes INTEGER NOT NULL,
  upload_date TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view documents for their pets"
  ON public.documents FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.pets WHERE pets.id = documents.pet_id AND pets.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert documents for their pets"
  ON public.documents FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.pets WHERE pets.id = documents.pet_id AND pets.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete documents for their pets"
  ON public.documents FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.pets WHERE pets.id = documents.pet_id AND pets.user_id = auth.uid()
  ));

-- Create photos table
CREATE TABLE IF NOT EXISTS public.photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id UUID REFERENCES public.pets(id) ON DELETE CASCADE NOT NULL,
  storage_path TEXT NOT NULL,
  caption TEXT,
  upload_date TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view photos for their pets"
  ON public.photos FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.pets WHERE pets.id = photos.pet_id AND pets.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert photos for their pets"
  ON public.photos FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.pets WHERE pets.id = photos.pet_id AND pets.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete photos for their pets"
  ON public.photos FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.pets WHERE pets.id = photos.pet_id AND pets.user_id = auth.uid()
  ));

-- Create insurance_info table
CREATE TABLE IF NOT EXISTS public.insurance_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id UUID REFERENCES public.pets(id) ON DELETE CASCADE NOT NULL UNIQUE,
  provider TEXT NOT NULL,
  policy_number TEXT NOT NULL,
  coverage TEXT NOT NULL,
  premium NUMERIC NOT NULL CHECK (premium >= 0),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.insurance_info ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view insurance for their pets"
  ON public.insurance_info FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.pets WHERE pets.id = insurance_info.pet_id AND pets.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert insurance for their pets"
  ON public.insurance_info FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.pets WHERE pets.id = insurance_info.pet_id AND pets.user_id = auth.uid()
  ));

CREATE POLICY "Users can update insurance for their pets"
  ON public.insurance_info FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.pets WHERE pets.id = insurance_info.pet_id AND pets.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete insurance for their pets"
  ON public.insurance_info FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.pets WHERE pets.id = insurance_info.pet_id AND pets.user_id = auth.uid()
  ));

-- Create storage buckets for documents and photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('pet-documents', 'pet-documents', false)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('pet-photos', 'pet-photos', false)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS policies for documents
CREATE POLICY "Users can upload documents for their pets"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'pet-documents' AND
    (storage.foldername(name))[1] IN (
      SELECT id::text FROM public.pets WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view documents for their pets"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'pet-documents' AND
    (storage.foldername(name))[1] IN (
      SELECT id::text FROM public.pets WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete documents for their pets"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'pet-documents' AND
    (storage.foldername(name))[1] IN (
      SELECT id::text FROM public.pets WHERE user_id = auth.uid()
    )
  );

-- Storage RLS policies for photos
CREATE POLICY "Users can upload photos for their pets"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'pet-photos' AND
    (storage.foldername(name))[1] IN (
      SELECT id::text FROM public.pets WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view photos for their pets"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'pet-photos' AND
    (storage.foldername(name))[1] IN (
      SELECT id::text FROM public.pets WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete photos for their pets"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'pet-photos' AND
    (storage.foldername(name))[1] IN (
      SELECT id::text FROM public.pets WHERE user_id = auth.uid()
    )
  );

-- Add triggers for updated_at timestamps
CREATE TRIGGER update_pets_updated_at
  BEFORE UPDATE ON public.pets
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON public.appointments
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_insurance_info_updated_at
  BEFORE UPDATE ON public.insurance_info
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();