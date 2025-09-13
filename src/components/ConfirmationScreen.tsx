import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { CheckCircle2, Calendar, Clock, User, Mail, MessageSquare, Home } from 'lucide-react';

interface ConfirmationData {
  appointmentId: string;
  date: string;
  time: string;
  estimatorName: string;
  street: string;
  aptSuite: string;
}

interface ConfirmationScreenProps {
  data: ConfirmationData;
  onStartNew: () => void;
}

export function ConfirmationScreen({ data, onStartNew }: ConfirmationScreenProps) {
  const fullAddress = data.aptSuite 
    ? `${data.street}, ${data.aptSuite}` 
    : data.street;
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Success Message */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="text-center">
            <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="mb-2">Request Sent!</h2>
            <p className="text-green-700">
              Your renovation estimation appointment request has been submitted and is pending confirmation.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Appointment Details */}
      <Card>
        <CardHeader>
          <CardTitle>Appointment Details</CardTitle>
          <CardDescription>
            Reference ID: #{data.appointmentId}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div>
              <p className="flex items-center gap-2 mb-1">
                <Calendar className="h-4 w-4" />
                <strong>{data.date}</strong>
              </p>
              <p className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Clock className="h-4 w-4" />
                {data.time}
              </p>
              <p className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4" />
                {data.estimatorName}
              </p>
            </div>
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
              Pending Confirmation
            </Badge>
          </div>

          <div className="flex items-start gap-2 p-3 bg-muted/20 rounded">
            <Home className="h-4 w-4 mt-0.5 text-muted-foreground" />
            <div>
              <p className="text-sm">{fullAddress}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>What Happens Next?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0">
                1
              </div>
              <div>
                <p className="mb-1">Confirmation notifications sent</p>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email and SMS confirmation sent to your provided contact info
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-muted text-muted-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0">
                2
              </div>
              <div>
                <p className="mb-1">Estimator reviews and confirms</p>
                <p className="text-sm text-muted-foreground">
                  Your assigned estimator will accept the appointment within 2 hours
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-muted text-muted-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0">
                3
              </div>
              <div>
                <p className="mb-1">Final confirmation</p>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  You'll receive a "Visit Confirmed!" notification once accepted
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1">
          View My Appointments
        </Button>
        <Button onClick={onStartNew} className="flex-1">
          Schedule Another Project
        </Button>
      </div>
    </div>
  );
}