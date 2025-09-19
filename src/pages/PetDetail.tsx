import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Heart, 
  Calendar, 
  FileText, 
  Camera, 
  Activity,
  Edit,
  Bell,
  Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePetStore } from '@/stores/petStore';
import { useUIStore } from '@/stores/uiStore';
import { format } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PetDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { pets, getPetById, getUpcomingAppointments, initializeWithMockData } = usePetStore();
  const { activeTab, setActiveTab } = useUIStore();
  const [pet, setPet] = useState(getPetById(id!));

  useEffect(() => {
    if (pets.length === 0) {
      initializeWithMockData();
    }
  }, [pets.length, initializeWithMockData]);

  useEffect(() => {
    if (id) {
      const foundPet = getPetById(id);
      setPet(foundPet);
    }
  }, [id, getPetById, pets]);

  if (!pet) {
    return <Navigate to="/pets" replace />;
  }

  const upcomingAppointments = getUpcomingAppointments(pet.id);

  return (
    <div className="space-y-8">
      {/* Back Navigation */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Link to="/pets">
          <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" />
            Back to My Pets
          </Button>
        </Link>
      </motion.div>

      {/* Pet Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <Card className="shadow-elevated bg-gradient-card">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Pet Image */}
              <div className="relative">
                <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-card">
                  <img 
                    src={pet.profileImage} 
                    alt={pet.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <Badge className="absolute -top-2 -right-2 status-healthy shadow-soft">
                  <Heart className="w-3 h-3 mr-1" />
                  Healthy
                </Badge>
              </div>

              {/* Pet Info */}
              <div className="flex-1 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="space-y-3">
                    <h1 className="text-4xl font-bold text-foreground">{pet.name}</h1>
                    <div className="flex gap-2 flex-wrap">
                      <Badge className="bg-primary/10 text-primary border-primary/20">
                        {pet.breed}
                      </Badge>
                      <Badge variant="outline">
                        {pet.age} years old
                      </Badge>
                      <Badge variant="outline">
                        {pet.weight} lbs
                      </Badge>
                      <Badge variant="outline" className="capitalize">
                        {pet.gender}
                      </Badge>
                    </div>
                  </div>
                  <Button className="bg-gradient-primary">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 rounded-lg bg-background/50 border">
                    <Calendar className="w-5 h-5 mx-auto mb-2 text-primary" />
                    <p className="text-xs text-muted-foreground">Last Visit</p>
                    <p className="font-medium">
                      {format(new Date(pet.healthMetrics.lastVetVisit), 'MMM d, yyyy')}
                    </p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-background/50 border">
                    <Bell className="w-5 h-5 mx-auto mb-2 text-warning" />
                    <p className="text-xs text-muted-foreground">Next Visit</p>
                    <p className="font-medium">
                      {format(new Date(pet.healthMetrics.nextVetVisit), 'MMM d, yyyy')}
                    </p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-background/50 border">
                    <Activity className="w-5 h-5 mx-auto mb-2 text-secondary" />
                    <p className="text-xs text-muted-foreground">Medications</p>
                    <p className="font-medium">{pet.healthMetrics.medications.length}</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-background/50 border">
                    <Shield className="w-5 h-5 mx-auto mb-2 text-success" />
                    <p className="text-xs text-muted-foreground">Insurance</p>
                    <p className="font-medium">
                      {pet.insuranceInfo ? 'Covered' : 'None'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tabbed Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-fit lg:grid-cols-4">
            <TabsTrigger value="overview" className="gap-2">
              <Activity className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="documents" className="gap-2">
              <FileText className="w-4 h-4" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="photos" className="gap-2">
              <Camera className="w-4 h-4" />
              Photos
            </TabsTrigger>
            <TabsTrigger value="insurance" className="gap-2">
              <Shield className="w-4 h-4" />
              Insurance
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Weight Chart */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" />
                    Weight History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={pet.healthMetrics.weightHistory}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis 
                          dataKey="date" 
                          tickFormatter={(date) => format(new Date(date), 'MMM')}
                          className="text-xs"
                        />
                        <YAxis className="text-xs" />
                        <Tooltip 
                          labelFormatter={(date) => format(new Date(date), 'MMM d, yyyy')}
                          formatter={(value) => [`${value} lbs`, 'Weight']}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="weight" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={3}
                          dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 5 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Health Information */}
              <div className="space-y-6">
                {/* Vaccinations */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-success" />
                      Vaccinations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {pet.healthMetrics.vaccinations.map((vaccination) => (
                      <div key={vaccination.id} className="flex justify-between items-center p-3 rounded-lg bg-accent/50 border">
                        <div>
                          <p className="font-medium">{vaccination.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Last: {format(new Date(vaccination.date), 'MMM d, yyyy')}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          Due: {format(new Date(vaccination.nextDue), 'MMM d, yyyy')}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Current Medications */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-secondary" />
                      Current Medications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {pet.healthMetrics.medications.length > 0 ? (
                      <div className="space-y-3">
                        {pet.healthMetrics.medications.map((medication) => (
                          <div key={medication.id} className="p-3 rounded-lg bg-accent/50 border">
                            <div className="flex justify-between items-start">
                              <div className="space-y-1">
                                <p className="font-medium">{medication.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {medication.dosage} • {medication.frequency}
                                </p>
                                {medication.notes && (
                                  <p className="text-xs text-muted-foreground">
                                    {medication.notes}
                                  </p>
                                )}
                              </div>
                              <Badge variant="secondary" className="text-xs">
                                Active
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No current medications</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Health Documents
                </CardTitle>
                <Button>
                  <FileText className="w-4 h-4 mr-2" />
                  Upload Document
                </Button>
              </CardHeader>
              <CardContent>
                {pet.documents.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {pet.documents.map((document) => (
                      <div key={document.id} className="p-4 rounded-lg border card-hover">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded bg-primary/10">
                            <FileText className="w-4 h-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{document.name}</p>
                            <p className="text-sm text-muted-foreground capitalize">
                              {document.type}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {format(new Date(document.uploadDate), 'MMM d, yyyy')}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg mb-2">No documents yet</p>
                    <p className="text-sm mb-6">Upload vaccination records, medical reports, and other important documents</p>
                    <Button>
                      <FileText className="w-4 h-4 mr-2" />
                      Upload First Document
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Photos Tab */}
          <TabsContent value="photos" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-primary" />
                  Photo Gallery
                </CardTitle>
                <Button>
                  <Camera className="w-4 h-4 mr-2" />
                  Add Photo
                </Button>
              </CardHeader>
              <CardContent>
                {pet.photos.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {pet.photos.map((photo) => (
                      <div key={photo.id} className="group relative aspect-square rounded-lg overflow-hidden shadow-card">
                        <img 
                          src={photo.url} 
                          alt={photo.caption || `${pet.name} photo`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {photo.caption && (
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                            <p className="text-white text-sm">{photo.caption}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg mb-2">No photos yet</p>
                    <p className="text-sm mb-6">Create beautiful memories by adding photos of {pet.name}</p>
                    <Button>
                      <Camera className="w-4 h-4 mr-2" />
                      Add First Photo
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Insurance Tab */}
          <TabsContent value="insurance" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Current Insurance */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Current Coverage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {pet.insuranceInfo ? (
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-success/20 rounded-full">
                            <Shield className="w-4 h-4 text-success" />
                          </div>
                          <div>
                            <p className="font-medium text-success">{pet.insuranceInfo.provider}</p>
                            <p className="text-sm text-muted-foreground">{pet.insuranceInfo.coverage}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Policy Number</p>
                            <p className="font-medium">{pet.insuranceInfo.policyNumber}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Monthly Premium</p>
                            <p className="font-medium">${pet.insuranceInfo.premium}/month</p>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        Manage Coverage
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Shield className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg mb-2">No Insurance Coverage</p>
                      <p className="text-sm mb-6">Protect {pet.name} with comprehensive pet insurance</p>
                      <Button className="bg-gradient-primary">
                        Compare Plans
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Insurance Recommendations */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-primary" />
                    Recommended for {pet.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg border card-hover">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">Complete Care Plan</h4>
                      <Badge className="bg-primary/10 text-primary border-primary/20">
                        Best Match
                      </Badge>
                    </div>
                    <p className="text-2xl font-bold mb-2">$89<span className="text-sm font-normal text-muted-foreground">/month</span></p>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• 90% coverage for accidents & illness</li>
                      <li>• Wellness coverage included</li>
                      <li>• $250 annual deductible</li>
                      <li>• Direct vet payment</li>
                    </ul>
                    <Button className="w-full mt-4" size="sm">
                      Get Quote
                    </Button>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Compare All Plans
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default PetDetail;