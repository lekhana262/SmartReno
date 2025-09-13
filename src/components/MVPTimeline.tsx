import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Calendar, 
  Code, 
  Rocket, 
  Users, 
  Zap, 
  Cloud, 
  Smartphone, 
  Database,
  Shield,
  Clock,
  CheckCircle,
  Circle,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Globe,
  Cpu
} from 'lucide-react';

interface TimelinePhase {
  id: string;
  title: string;
  duration: string;
  description: string;
  tasks: string[];
  techStack: string[];
  status: 'completed' | 'in-progress' | 'upcoming';
  week: number;
}

interface TechStackItem {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'cloud' | 'tools';
  icon: string;
  description: string;
  trending?: boolean;
}

export function MVPTimeline() {
  const [selectedPhase, setSelectedPhase] = useState<string>('foundations');

  const phases: TimelinePhase[] = [
    {
      id: 'foundations',
      title: 'Project Foundations',
      duration: '3 days',
      description: 'Setting up the development environment and finalizing technical specifications',
      tasks: [
        'Finalize UX wireframes & API contracts',
        'Setup React + TypeScript project scaffolding',
        'Configure Tailwind CSS v4 + shadcn/ui',
        'Setup development environment & CI/CD'
      ],
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      status: 'completed',
      week: 1
    },
    {
      id: 'homeowner-flow',
      title: 'Homeowner Experience',
      duration: '8 days',
      description: 'Building the core user journey from photo upload to appointment booking',
      tasks: [
        'Photo upload & project details form',
        'Address validation & location capture',
        'Dynamic scheduling with business rules',
        'Review & confirmation flow'
      ],
      techStack: ['React Hook Form', 'Zod Validation', 'Framer Motion', 'React Query'],
      status: 'in-progress',
      week: 2
    },
    {
      id: 'backend-api',
      title: 'Backend Infrastructure',
      duration: '10 days',
      description: 'Scalable API with intelligent appointment matching and notifications',
      tasks: [
        'FastAPI backend with async operations',
        'PostgreSQL + PostGIS for geospatial queries',
        'Intelligent estimator assignment logic',
        'Multi-channel notification system'
      ],
      techStack: ['FastAPI', 'PostgreSQL', 'PostGIS', 'Redis', 'Celery'],
      status: 'in-progress',
      week: 2
    },
    {
      id: 'estimator-portal',
      title: 'Estimator Dashboard',
      duration: '5 days',
      description: 'Mobile-optimized portal for estimators to manage appointments',
      tasks: [
        'Job notification & acceptance interface',
        'Interactive map view with property details',
        'Real-time job status updates',
        'Mobile-first responsive design'
      ],
      techStack: ['PWA', 'Web Push API', 'Mapbox GL JS', 'Socket.io'],
      status: 'upcoming',
      week: 4
    },
    {
      id: 'testing-launch',
      title: 'Testing & Launch',
      duration: '5 days',
      description: 'Comprehensive testing and production deployment',
      tasks: [
        'End-to-end testing with Playwright',
        'Performance optimization & monitoring',
        'Security audit & penetration testing',
        'Production deployment & launch prep'
      ],
      techStack: ['Playwright', 'Sentry', 'Docker', 'AWS ECS'],
      status: 'upcoming',
      week: 5
    }
  ];

  const techStack: TechStackItem[] = [
    {
      name: 'React 18',
      category: 'frontend',
      icon: '⚛️',
      description: 'Modern React with Hooks, Suspense, and Concurrent Features',
      trending: true
    },
    {
      name: 'TypeScript',
      category: 'frontend',
      icon: '🔷',
      description: 'Type-safe development with enhanced developer experience'
    },
    {
      name: 'Tailwind CSS v4',
      category: 'frontend',
      icon: '🎨',
      description: 'Next-gen utility-first CSS framework with CSS variables',
      trending: true
    },
    {
      name: 'shadcn/ui',
      category: 'frontend',
      icon: '🧩',
      description: 'Beautiful, accessible component library built on Radix UI'
    },
    {
      name: 'FastAPI',
      category: 'backend',
      icon: '⚡',
      description: 'High-performance Python API with automatic documentation',
      trending: true
    },
    {
      name: 'PostgreSQL',
      category: 'database',
      icon: '🐘',
      description: 'Powerful relational database with ACID compliance'
    },
    {
      name: 'PostGIS',
      category: 'database',
      icon: '🗺️',
      description: 'Spatial database extension for location-based queries'
    },
    {
      name: 'Redis',
      category: 'database',
      icon: '🔴',
      description: 'In-memory data store for caching and session management'
    },
    {
      name: 'AWS ECS',
      category: 'cloud',
      icon: '☁️',
      description: 'Containerized deployment with auto-scaling capabilities'
    },
    {
      name: 'AWS S3',
      category: 'cloud',
      icon: '🪣',
      description: 'Scalable object storage for user-uploaded images'
    },
    {
      name: 'Twilio',
      category: 'cloud',
      icon: '📱',
      description: 'Reliable SMS notifications and communication APIs'
    },
    {
      name: 'Docker',
      category: 'tools',
      icon: '🐳',
      description: 'Containerization for consistent deployments'
    }
  ];

  const totalWeeks = 5;
  const completedWeeks = 1.5;
  const progressPercentage = (completedWeeks / totalWeeks) * 100;

  const categoryColors = {
    frontend: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
    backend: 'bg-green-500/10 text-green-700 border-green-500/20',
    database: 'bg-purple-500/10 text-purple-700 border-purple-500/20',
    cloud: 'bg-orange-500/10 text-orange-700 border-orange-500/20',
    tools: 'bg-gray-500/10 text-gray-700 border-gray-500/20'
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <div className="inline-flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-full border border-primary/20">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm text-primary">MVP Development Timeline</span>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent">
          SmartReno: 0 to Production in 5 Weeks
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Modern tech stack meets rapid development. See how we're building the future of home renovation booking.
        </p>
      </div>

      {/* Overall Progress */}
      <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-purple-500/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Development Progress
              </CardTitle>
              <CardDescription>
                {completedWeeks} of {totalWeeks} weeks completed
              </CardDescription>
            </div>
            <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-500/30">
              {Math.round(progressPercentage)}% Complete
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={progressPercentage} className="h-3 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-green-600">2</div>
              <div className="text-sm text-muted-foreground">Components Built</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-blue-600">12</div>
              <div className="text-sm text-muted-foreground">Technologies Used</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-purple-600">5</div>
              <div className="text-sm text-muted-foreground">Weeks to MVP</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={selectedPhase} onValueChange={setSelectedPhase} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto p-1">
          {phases.map((phase) => (
            <TabsTrigger
              key={phase.id}
              value={phase.id}
              className="flex flex-col items-center gap-1 p-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <div className="flex items-center gap-2">
                {phase.status === 'completed' && <CheckCircle className="h-4 w-4 text-green-500" />}
                {phase.status === 'in-progress' && <Clock className="h-4 w-4 text-blue-500" />}
                {phase.status === 'upcoming' && <Circle className="h-4 w-4 text-muted-foreground" />}
                <span className="text-xs font-medium hidden md:inline">Week {phase.week}</span>
              </div>
              <span className="text-xs text-center">{phase.title}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {phases.map((phase) => (
          <TabsContent key={phase.id} value={phase.id} className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {phase.status === 'completed' && <CheckCircle className="h-5 w-5 text-green-500" />}
                      {phase.status === 'in-progress' && <Clock className="h-5 w-5 text-blue-500" />}
                      {phase.status === 'upcoming' && <Circle className="h-5 w-5 text-muted-foreground" />}
                      {phase.title}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {phase.description}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-primary/5 text-primary border-primary/30">
                    {phase.duration}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    Key Deliverables
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {phase.tasks.map((task, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-muted/30 rounded">
                        <ArrowRight className="h-3 w-3 text-primary flex-shrink-0" />
                        <span className="text-sm">{task}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {phase.techStack.map((tech, index) => (
                      <Badge key={index} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Tech Stack Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cpu className="h-5 w-5" />
            Modern Tech Stack
          </CardTitle>
          <CardDescription>
            Cutting-edge technologies powering SmartReno's rapid development
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(
              techStack.reduce((acc, tech) => {
                if (!acc[tech.category]) acc[tech.category] = [];
                acc[tech.category].push(tech);
                return acc;
              }, {} as Record<string, TechStackItem[]>)
            ).map(([category, techs]) => (
              <div key={category} className="space-y-3">
                <h4 className="font-medium capitalize flex items-center gap-2">
                  {category === 'frontend' && <Globe className="h-4 w-4" />}
                  {category === 'backend' && <Zap className="h-4 w-4" />}
                  {category === 'database' && <Database className="h-4 w-4" />}
                  {category === 'cloud' && <Cloud className="h-4 w-4" />}
                  {category === 'tools' && <Rocket className="h-4 w-4" />}
                  {category}
                </h4>
                <div className="space-y-2">
                  {techs.map((tech, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border ${categoryColors[tech.category]}`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-lg">{tech.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{tech.name}</span>
                            {tech.trending && (
                              <Badge variant="outline" className="text-xs bg-orange-500/10 text-orange-700 border-orange-500/30">
                                🔥 Trending
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {tech.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-blue-500/5">
        <CardContent className="p-8 text-center space-y-4">
          <Rocket className="h-12 w-12 text-primary mx-auto" />
          <h3 className="text-2xl font-bold">Ready to Transform Home Renovation?</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of homeowners and contractors already using SmartReno to streamline their renovation projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90">
              <Users className="h-4 w-4 mr-2" />
              Book Your First Appointment
            </Button>
            <Button variant="outline" size="lg">
              <Shield className="h-4 w-4 mr-2" />
              Join as Contractor
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}