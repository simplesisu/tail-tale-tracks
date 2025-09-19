import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Heart, 
  Activity, 
  Bell,
  ChevronDown,
  Plus,
  TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePetStore } from '@/stores/petStore';
import { useUIStore } from '@/stores/uiStore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import heroImage from '@/assets/hero-pets.jpg';

const Dashboard = () => {
  const { pets, selectedPetId, selectPet, getSelectedPet, getUpcomingAppointments, initializeWithMockData } = usePetStore();
  const { openAddPetModal, openAppointmentModal } = useUIStore();
  const selectedPet = getSelectedPet();
  const upcomingAppointments = getUpcomingAppointments(selectedPetId || undefined);

  useEffect(() => {
    if (pets.length === 0) {
      initializeWithMockData();
    }
  }, [pets.length, initializeWithMockData]);

  const quickStats = [
    {
      title: 'Next Appointment',
      value: upcomingAppointments[0] ? format(new Date(upcomingAppointments[0].date), 'MMM d') : 'None',
      icon: Calendar,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      title: 'Health Status',
      value: 'Excellent',
      icon: Heart,
      color: 'text-success',
      bg: 'bg-success/10',
    },
    {
      title: 'Weight Trend',
      value: '+0.5 lbs',
      icon: TrendingUp,
      color: 'text-warning',
      bg: 'bg-warning/10',
    },
    {
      title: 'Medications',
      value: selectedPet?.healthMetrics.medications.length || 0,
      icon: Activity,
      color: 'text-secondary',
      bg: 'bg-secondary/10',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-hero p-8 text-white shadow-elevated"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold">
                Welcome to PetCare Dashboard
              </h1>
              <p className="text-xl text-white/90 max-w-2xl">
                Manage your pets' health, appointments, and wellness all in one place. 
                Keep track of vaccinations, medications, and create lasting memories.
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={openAddPetModal}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Pet
              </Button>
              <Button 
                onClick={openAppointmentModal}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Appointment
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Pet Selector & Quick Stats */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Pet Selector */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                Active Pet
              </CardTitle>
              <CardDescription>
                Select a pet to view their information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={selectedPetId || ''} onValueChange={selectPet}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a pet" />
                </SelectTrigger>
                <SelectContent>
                  {pets.map((pet) => (
                    <SelectItem key={pet.id} value={pet.id}>
                      <div className="flex items-center gap-3">
                        <img 
                          src={pet.profileImage} 
                          alt={pet.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-medium">{pet.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {pet.breed} • {pet.age}y
                          </div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {selectedPet && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg bg-gradient-card border"
                >
                  <div className="flex items-center gap-4">
                    <img 
                      src={selectedPet.profileImage} 
                      alt={selectedPet.name}
                      className="w-16 h-16 rounded-full object-cover shadow-soft"
                    />
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">{selectedPet.name}</h3>
                      <div className="flex gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {selectedPet.breed}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {selectedPet.age} years
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Weight: {selectedPet.weight} lbs
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Stats Grid */}
        <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <Card className="shadow-card card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-full ${stat.bg}`}>
                        <Icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Weight Chart & Upcoming Events */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Weight Trend Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Weight Trend
              </CardTitle>
              <CardDescription>
                {selectedPet?.name}'s weight history over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedPet?.healthMetrics.weightHistory ? (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={selectedPet.healthMetrics.weightHistory}>
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
              ) : (
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No weight data available</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Upcoming Appointments */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-warning" />
                  Upcoming Events
                </CardTitle>
                <CardDescription>
                  Appointments and reminders
                </CardDescription>
              </div>
              <Button size="sm" onClick={openAppointmentModal}>
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingAppointments.length > 0 ? (
                upcomingAppointments.slice(0, 4).map((appointment) => (
                  <motion.div
                    key={appointment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-4 p-3 rounded-lg bg-accent/50 border border-border"
                  >
                    <div className={`p-2 rounded-full ${{
                      checkup: 'bg-primary/10',
                      vaccination: 'bg-success/10',
                      surgery: 'bg-destructive/10',
                      grooming: 'bg-secondary/10',
                      emergency: 'bg-warning/10'
                    }[appointment.type]}`}>
                      <Calendar className={`w-4 h-4 ${{
                        checkup: 'text-primary',
                        vaccination: 'text-success',
                        surgery: 'text-destructive',
                        grooming: 'text-secondary',
                        emergency: 'text-warning'
                      }[appointment.type]}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium capitalize">{appointment.type}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(appointment.date), 'MMM d, yyyy')} at {appointment.time}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {appointment.veterinarian} • {appointment.clinic}
                      </p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No upcoming appointments</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-3"
                    onClick={openAppointmentModal}
                  >
                    Schedule First Appointment
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;