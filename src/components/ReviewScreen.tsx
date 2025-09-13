import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CheckCircle, Camera, MapPin, Calendar, Clock, User } from 'lucide-react';

interface ReviewData {
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
  };
}

interface ReviewScreenProps {
  data: ReviewData;
  onConfirm: () => void;
  onBack: () => void;
  onEdit: (section: 'project' | 'location' | 'timeslot') => void;
}

export function ReviewScreen({ data, onConfirm, onBack, onEdit }: ReviewScreenProps) {
  const fullAddress = data.aptSuite 
    ? `${data.street}, ${data.aptSuite}` 
    : data.street;
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          Review Your Appointment
        </CardTitle>
        <CardDescription>
          Please review all details before confirming your renovation estimation appointment
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Project Details */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Project Details
            </h4>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onEdit('project')}
              className="text-primary hover:text-primary/80"
            >
              Edit
            </Button>
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              {data.photos.slice(0, 3).map((photo, index) => (
                <ImageWithFallback
                  key={index}
                  src={photo}
                  alt={`Project photo ${index + 1}`}
                  className="w-full h-20 object-cover rounded"
                />
              ))}
            </div>
            {data.photos.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{data.photos.length - 3} more photos
              </Badge>
            )}
            <p className="text-sm bg-muted/30 p-3 rounded">
              {data.description}
            </p>
          </div>
        </div>

        <Separator />

        {/* Location */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location
            </h4>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onEdit('location')}
              className="text-primary hover:text-primary/80"
            >
              Edit
            </Button>
          </div>
          <div className="bg-muted/30 p-3 rounded">
            <p className="text-sm">{fullAddress}</p>
            <p className="text-sm text-muted-foreground">ZIP: {data.zipCode}</p>
          </div>
        </div>

        <Separator />

        {/* Appointment Details */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Appointment Details
            </h4>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onEdit('timeslot')}
              className="text-primary hover:text-primary/80"
            >
              Edit
            </Button>
          </div>
          <div className="bg-primary/5 p-4 rounded border border-primary/20">
            <div className="flex items-start justify-between">
              <div>
                <p className="flex items-center gap-2 mb-1">
                  <Clock className="h-4 w-4" />
                  <strong>{data.selectedSlot.date}</strong>
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  {data.selectedSlot.time}
                </p>
                <p className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4" />
                  Estimator: {data.selectedSlot.estimatorName}
                </p>
              </div>
              <Badge>Pending Confirmation</Badge>
            </div>
          </div>
        </div>

        {/* What happens next */}
        <div className="bg-muted/20 p-4 rounded">
          <h4 className="mb-2">What happens next?</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• You'll receive an email and SMS confirmation</li>
            <li>• Your estimator will confirm the appointment within 2 hours</li>
            <li>• You'll get a final confirmation once accepted</li>
            <li>• The estimator will arrive at your scheduled time</li>
          </ul>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onBack} className="flex-1">
            Back
          </Button>
          <Button onClick={onConfirm} className="flex-1">
            Submit Request
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}