import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PawPrint, Heart, Calendar, FileText, Shield, Sparkles } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-accent/5">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <PawPrint className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">PetCare</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/auth?mode=signin')}>
              Sign In
            </Button>
            <Button onClick={() => navigate('/auth?mode=signup')}>
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border bg-accent/50 px-4 py-2">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Your Pet's Complete Care Platform</span>
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            Everything Your Pet Needs in{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              One Place
            </span>
          </h1>
          <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
            Track health records, schedule appointments, store documents, and manage insurance—all designed to keep your furry friends happy and healthy.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" onClick={() => navigate('/auth?mode=signup')}>
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/auth?mode=signin')}>
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-24">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Everything You Need for Pet Care
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive tools designed for modern pet owners
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Heart,
              title: "Health Tracking",
              description: "Monitor vaccinations, medications, and vet visits in one secure dashboard."
            },
            {
              icon: Calendar,
              title: "Smart Scheduling",
              description: "Never miss an appointment with automated reminders and calendar sync."
            },
            {
              icon: FileText,
              title: "Digital Records",
              description: "Store all medical records, certifications, and important documents securely."
            },
            {
              icon: Shield,
              title: "Insurance Management",
              description: "Compare plans, track claims, and manage policies effortlessly."
            },
            {
              icon: PawPrint,
              title: "Multi-Pet Support",
              description: "Manage multiple pets from a single, intuitive dashboard."
            },
            {
              icon: Sparkles,
              title: "Photo Memories",
              description: "Create a beautiful timeline of your pet's special moments."
            }
          ].map((feature, i) => (
            <div
              key={i}
              className="group rounded-lg border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-24">
        <div className="rounded-2xl border bg-gradient-to-r from-primary/10 via-primary/5 to-background p-12 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Join thousands of pet owners who trust PetCare for their furry friends
          </p>
          <Button size="lg" onClick={() => navigate('/auth?mode=signup')}>
            Create Your Free Account
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="container py-8 text-center text-sm text-muted-foreground">
          <p>© 2025 PetCare. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;