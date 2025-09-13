import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Calendar, Clock, AlertCircle } from 'lucide-react';

interface TimeSlot {
  id: string;
  date: string;
  time: string;
  estimatorName: string;
  available: boolean;
  dayOfWeek: string;
}

interface TimeslotSelectionProps {
  onNext: (data: { selectedSlot: TimeSlot }) => void;
  onBack: () => void;
  zipCode: string;
  initialData?: { selectedSlot: TimeSlot };
}

export function TimeslotSelection({ onNext, onBack, zipCode, initialData }: TimeslotSelectionProps) {
  // Generate mock timeslots based on business rules
  // Mon-Fri: 8:00 AM - 4:00 PM (last slot 3-4 PM)
  // Sat: 10:00 AM - 2:00 PM (last slot 1-2 PM)
  // Sun: Closed
  const generateMockTimeslots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const estimators = ['Mike Rodriguez', 'Sarah Chen', 'David Kim', 'Lisa Thompson'];
    let idCounter = 1;

    // Generate next 7 days
    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
      
      if (dayOfWeek === 0) continue; // Skip Sunday
      
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      
      let hours: string[] = [];
      
      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        // Monday to Friday: 8 AM - 4 PM
        hours = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM'];
      } else if (dayOfWeek === 6) {
        // Saturday: 10 AM - 2 PM
        hours = ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM'];
      }
      
      hours.forEach(hour => {
        const endHour = (parseInt(hour) + 1).toString().padStart(2, '0') + ':00 ' + (hour.includes('AM') && parseInt(hour) !== 12 ? 'AM' : 'PM');
        if (hour === '12:00 PM') endHour.replace('13:00', '1:00');
        
        const randomEstimator = estimators[Math.floor(Math.random() * estimators.length)];
        const isAvailable = Math.random() > 0.2; // 80% availability
        
        slots.push({
          id: idCounter.toString(),
          date: dayName,
          time: `${hour} - ${hour.replace(/\d+/, (parseInt(hour) + 1).toString())}`,
          estimatorName: randomEstimator,
          available: isAvailable,
          dayOfWeek: date.toLocaleDateString('en-US', { weekday: 'long' })
        });
        
        idCounter++;
      });
    }
    
    return slots;
  };

  const mockTimeslots = generateMockTimeslots();

  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(initialData?.selectedSlot || null);

  const handleSlotSelect = (slot: TimeSlot) => {
    if (slot.available) {
      setSelectedSlot(slot);
    }
  };

  const handleSubmit = () => {
    if (selectedSlot) {
      onNext({ selectedSlot });
    }
  };

  const groupedSlots = mockTimeslots.reduce((groups, slot) => {
    if (!groups[slot.date]) {
      groups[slot.date] = [];
    }
    groups[slot.date].push(slot);
    return groups;
  }, {} as Record<string, TimeSlot[]>);

  const availableSlots = mockTimeslots.filter(slot => slot.available);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Select Appointment Time
        </CardTitle>
        <CardDescription>
          Available 1-hour estimation appointments in ZIP {zipCode}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Business Hours Info */}
        <div className="bg-muted/30 p-4 rounded-lg">
          <h4 className="mb-2">Our Hours</h4>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>Monday - Friday: 8:00 AM - 4:00 PM</p>
            <p>Saturday: 10:00 AM - 2:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>

        {availableSlots.length === 0 ? (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              We're sorry, there are no available times in your area. Please contact support to schedule manually.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-4">
            {Object.entries(groupedSlots).map(([date, slots]) => {
              const availableSlotsForDay = slots.filter(slot => slot.available);
              
              if (availableSlotsForDay.length === 0) return null;
              
              return (
                <div key={date}>
                  <h4 className="mb-3 flex items-center gap-2">
                    {date}
                    <Badge variant="outline" className="text-xs">
                      {availableSlotsForDay.length} available
                    </Badge>
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {slots.map((slot) => (
                      <button
                        key={slot.id}
                        onClick={() => handleSlotSelect(slot)}
                        disabled={!slot.available}
                        className={`p-4 rounded-lg border text-left transition-all ${
                          selectedSlot?.id === slot.id
                            ? 'border-primary bg-primary/5 ring-1 ring-primary'
                            : slot.available
                            ? 'border-border hover:border-primary/50 hover:bg-muted/30'
                            : 'border-border bg-muted/20 opacity-50 cursor-not-allowed hidden'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{slot.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                              with {slot.estimatorName}
                            </span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {selectedSlot && (
          <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
            <h4 className="mb-2">Selected Appointment</h4>
            <p className="text-sm">
              <strong>{selectedSlot.date}</strong> at <strong>{selectedSlot.time}</strong>
            </p>
            <p className="text-sm text-muted-foreground">
              Estimator: {selectedSlot.estimatorName}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              ⏰ This time slot is held for 5 minutes while you complete your booking
            </p>
          </div>
        )}

        <div className="flex gap-3">
          <Button variant="outline" onClick={onBack} className="flex-1">
            Back
          </Button>
          <Button onClick={handleSubmit} disabled={!selectedSlot} className="flex-1">
            Review & Confirm
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}