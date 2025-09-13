import { useState } from 'react';
import { ProjectForm } from './components/ProjectForm';
import { LocationForm } from './components/LocationForm';
import { TimeslotSelection } from './components/TimeslotSelection';
import { ReviewScreen } from './components/ReviewScreen';
import { ConfirmationScreen } from './components/ConfirmationScreen';
import { MVPTimeline } from './components/MVPTimeline';
import { Progress } from './components/ui/progress';
import { Home, ArrowLeft, BarChart3 } from 'lucide-react';
import { Button } from './components/ui/button';

type Step = 'project' | 'location' | 'timeslot' | 'review' | 'confirmation' | 'timeline';

interface FormData {
  photos: string[];
  description: string;
  street: string;
  aptSuite: string;
  zipCode: string;
  selectedSlot: {
    id: string;
    date: string;
    time: string;
    estimatorName: string;
  } | null;
}

export default function App() {
  const [currentStep, setCurrentStep] = useState<Step>('timeline');
  const [formData, setFormData] = useState<FormData>({
    photos: [],
    description: '',
    street: '',
    aptSuite: '',
    zipCode: '',
    selectedSlot: null
  });

  const bookingSteps: Step[] = ['project', 'location', 'timeslot', 'review', 'confirmation'];
  const currentStepIndex = bookingSteps.indexOf(currentStep);
  const progress = currentStep === 'timeline' ? 0 : ((currentStepIndex + 1) / bookingSteps.length) * 100;

  const handleProjectNext = (data: { photos: string[]; description: string }) => {
    setFormData(prev => ({ ...prev, ...data }));
    setCurrentStep('location');
  };

  const handleLocationNext = (data: { street: string; aptSuite: string; zipCode: string }) => {
    setFormData(prev => ({ ...prev, ...data }));
    setCurrentStep('timeslot');
  };

  const handleTimeslotNext = (data: { selectedSlot: any }) => {
    setFormData(prev => ({ ...prev, ...data }));
    setCurrentStep('review');
  };

  const handleConfirmAppointment = () => {
    // Mock API call - in real app this would be POST /appointments
    setCurrentStep('confirmation');
  };

  const handleStartNew = () => {
    setFormData({
      photos: [],
      description: '',
      street: '',
      aptSuite: '',
      zipCode: '',
      selectedSlot: null
    });
    setCurrentStep('project');
  };

  const handleEditSection = (section: 'project' | 'location' | 'timeslot') => {
    setCurrentStep(section === 'project' ? 'project' : section === 'location' ? 'location' : 'timeslot');
  };

  const handleBackToProject = () => {
    setCurrentStep('project');
  };

  const goBack = () => {
    const currentIndex = bookingSteps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(bookingSteps[currentIndex - 1]);
    }
  };

  const handleShowTimeline = () => {
    setCurrentStep('timeline');
  };

  const handleStartBooking = () => {
    setCurrentStep('project');
  };

  const stepTitles = {
    project: 'Project Details',
    location: 'Location',
    timeslot: 'Schedule',
    review: 'Review',
    confirmation: 'Confirmed',
    timeline: 'Development Timeline'
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Home className="h-6 w-6 text-primary" />
              <h1>SmartReno</h1>
            </div>
            <div className="flex items-center gap-2">
              {currentStep === 'timeline' && (
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={handleStartBooking}
                  className="flex items-center gap-2"
                >
                  Book Appointment
                </Button>
              )}
              {currentStep !== 'timeline' && currentStep !== 'confirmation' && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleShowTimeline}
                  className="flex items-center gap-2"
                >
                  <BarChart3 className="h-4 w-4" />
                  View Timeline
                </Button>
              )}
              {currentStep !== 'confirmation' && currentStep !== 'project' && currentStep !== 'timeline' && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={currentStep === 'review' ? goBack : handleBackToProject}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {currentStep === 'review' ? 'Edit' : 'Start Over'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      {currentStep !== 'confirmation' && currentStep !== 'timeline' && (
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-sm">Step {currentStepIndex + 1} of {bookingSteps.length - 1}</span>
            <span className="text-sm text-muted-foreground">{stepTitles[currentStep]}</span>
          </div>
          <Progress value={currentStep === 'confirmation' ? 100 : progress} className="h-2" />
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {currentStep === 'timeline' && (
          <MVPTimeline />
        )}
        {currentStep === 'project' && (
          <ProjectForm
            onNext={handleProjectNext}
            initialData={{ photos: formData.photos, description: formData.description }}
          />
        )}

        {currentStep === 'location' && (
          <LocationForm
            onNext={handleLocationNext}
            onBack={goBack}
            initialData={{ street: formData.street, aptSuite: formData.aptSuite, zipCode: formData.zipCode }}
          />
        )}

        {currentStep === 'timeslot' && (
          <TimeslotSelection
            onNext={handleTimeslotNext}
            onBack={goBack}
            zipCode={formData.zipCode}
            initialData={formData.selectedSlot ? { selectedSlot: formData.selectedSlot } : undefined}
          />
        )}

        {currentStep === 'review' && formData.selectedSlot && (
          <ReviewScreen
            data={{
              photos: formData.photos,
              description: formData.description,
              street: formData.street,
              aptSuite: formData.aptSuite,
              zipCode: formData.zipCode,
              selectedSlot: formData.selectedSlot
            }}
            onConfirm={handleConfirmAppointment}
            onBack={goBack}
            onEdit={handleEditSection}
          />
        )}

        {currentStep === 'confirmation' && formData.selectedSlot && (
          <ConfirmationScreen
            data={{
              appointmentId: 'SR' + Date.now().toString().slice(-6),
              date: formData.selectedSlot.date,
              time: formData.selectedSlot.time,
              estimatorName: formData.selectedSlot.estimatorName,
              street: formData.street,
              aptSuite: formData.aptSuite
            }}
            onStartNew={handleStartNew}
          />
        )}
      </main>
    </div>
  );
}