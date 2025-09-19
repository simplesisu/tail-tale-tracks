import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus, Heart, Calendar, Activity, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { usePetStore } from '@/stores/petStore';
import { useUIStore } from '@/stores/uiStore';
import { format } from 'date-fns';

const Pets = () => {
  const { pets, deletePet, initializeWithMockData } = usePetStore();
  const { openAddPetModal } = useUIStore();

  useEffect(() => {
    if (pets.length === 0) {
      initializeWithMockData();
    }
  }, [pets.length, initializeWithMockData]);

  const handleDeletePet = (petId: string, petName: string) => {
    if (window.confirm(`Are you sure you want to remove ${petName} from your pets?`)) {
      deletePet(petId);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Pets</h1>
          <p className="text-muted-foreground">
            Manage your beloved companions and their care
          </p>
        </div>
        <Button onClick={openAddPetModal} className="bg-gradient-primary">
          <Plus className="w-4 h-4 mr-2" />
          Add New Pet
        </Button>
      </motion.div>

      {/* Pet Grid */}
      {pets.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {pets.map((pet, index) => (
            <motion.div
              key={pet.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="shadow-card card-hover group">
                <CardContent className="p-0">
                  <Link to={`/pets/${pet.id}`}>
                    <div className="relative">
                      {/* Pet Image */}
                      <div className="aspect-square overflow-hidden rounded-t-lg">
                        <img 
                          src={pet.profileImage} 
                          alt={pet.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      
                      {/* Health Status Badge */}
                      <div className="absolute top-4 right-4">
                        <Badge className="status-healthy shadow-soft">
                          <Heart className="w-3 h-3 mr-1" />
                          Healthy
                        </Badge>
                      </div>
                    </div>
                  </Link>

                  <div className="p-6 space-y-4">
                    {/* Pet Info */}
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <Link to={`/pets/${pet.id}`}>
                          <h3 className="text-xl font-semibold text-foreground hover:text-primary transition-colors">
                            {pet.name}
                          </h3>
                        </Link>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                            onClick={() => handleDeletePet(pet.id, pet.name)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 flex-wrap">
                        <Badge variant="secondary">
                          {pet.breed}
                        </Badge>
                        <Badge variant="outline">
                          {pet.age} years
                        </Badge>
                        <Badge variant="outline">
                          {pet.weight} lbs
                        </Badge>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-primary mb-1">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <p className="text-xs text-muted-foreground">Next Visit</p>
                        <p className="text-sm font-medium">
                          {format(new Date(pet.healthMetrics.nextVetVisit), 'MMM d')}
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-secondary mb-1">
                          <Activity className="w-4 h-4" />
                        </div>
                        <p className="text-xs text-muted-foreground">Medications</p>
                        <p className="text-sm font-medium">
                          {pet.healthMetrics.medications.length}
                        </p>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Link to={`/pets/${pet.id}`} className="block">
                      <Button variant="outline" className="w-full">
                        View Profile
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16"
        >
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-primary rounded-full flex items-center justify-center">
            <Heart className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-semibold mb-4">No Pets Yet</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Start your pet care journey by adding your first companion. 
            Track their health, schedule appointments, and create lasting memories.
          </p>
          <Button onClick={openAddPetModal} size="lg" className="bg-gradient-primary">
            <Plus className="w-5 h-5 mr-2" />
            Add Your First Pet
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default Pets;