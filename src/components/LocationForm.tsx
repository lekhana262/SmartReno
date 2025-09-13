import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { MapPin, AlertCircle } from 'lucide-react';

interface LocationFormProps {
  onNext: (data: { street: string; aptSuite: string; zipCode: string }) => void;
  onBack: () => void;
  initialData?: { street: string; aptSuite: string; zipCode: string };
}

export function LocationForm({ onNext, onBack, initialData }: LocationFormProps) {
  const [street, setStreet] = useState(initialData?.street || '');
  const [aptSuite, setAptSuite] = useState(initialData?.aptSuite || '');
  const [zipCode, setZipCode] = useState(initialData?.zipCode || '');
  const [errors, setErrors] = useState<{ street?: string; zipCode?: string }>({});

  // Mock service areas for validation
  const mockServiceAreas = ['94102', '94103', '94104', '94105', '10001', '10002', '10003'];

  const validateZipCode = (zip: string) => {
    if (zip.length !== 5) {
      return 'Please enter a valid 5-digit ZIP code.';
    }
    if (!mockServiceAreas.includes(zip)) {
      return 'Please enter a valid 5-digit ZIP code in our service area.';
    }
    return null;
  };

  const handleZipCodeChange = (value: string) => {
    const numericValue = value.replace(/\D/g, '').slice(0, 5);
    setZipCode(numericValue);
    
    if (numericValue.length === 5) {
      const error = validateZipCode(numericValue);
      setErrors(prev => ({ ...prev, zipCode: error || undefined }));
    } else if (numericValue.length > 0) {
      setErrors(prev => ({ ...prev, zipCode: undefined }));
    }
  };

  const handleStreetChange = (value: string) => {
    setStreet(value);
    if (value.trim().length > 0) {
      setErrors(prev => ({ ...prev, street: undefined }));
    }
  };

  const handleSubmit = () => {
    const newErrors: { street?: string; zipCode?: string } = {};
    
    if (!street.trim()) {
      newErrors.street = 'Please enter your street address.';
    }
    
    if (!zipCode.trim()) {
      newErrors.zipCode = 'Please enter your ZIP code.';
    } else {
      const zipError = validateZipCode(zipCode);
      if (zipError) {
        newErrors.zipCode = zipError;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onNext({ street: street.trim(), aptSuite: aptSuite.trim(), zipCode: zipCode.trim() });
  };

  const isValid = street.trim().length > 0 && zipCode.length === 5 && !errors.zipCode;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Project Location
        </CardTitle>
        <CardDescription>
          Tell us where your renovation project is located so we can find the best estimator in your area
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="street">Street Address *</Label>
            <Input
              id="street"
              placeholder="123 Main Street"
              value={street}
              onChange={(e) => handleStreetChange(e.target.value)}
              className={`mt-2 ${errors.street ? 'border-destructive' : ''}`}
            />
            {errors.street && (
              <Alert className="mt-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.street}</AlertDescription>
              </Alert>
            )}
          </div>

          <div>
            <Label htmlFor="aptSuite">Apt/Suite (Optional)</Label>
            <Input
              id="aptSuite"
              placeholder="Apt 2B, Suite 100, etc."
              value={aptSuite}
              onChange={(e) => setAptSuite(e.target.value)}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="zipCode">ZIP Code *</Label>
            <Input
              id="zipCode"
              placeholder="12345"
              value={zipCode}
              onChange={(e) => handleZipCodeChange(e.target.value)}
              className={`mt-2 ${errors.zipCode ? 'border-destructive' : ''}`}
              maxLength={5}
            />
            {errors.zipCode && (
              <Alert className="mt-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.zipCode}</AlertDescription>
              </Alert>
            )}
          </div>
        </div>

        <div className="bg-muted/30 p-4 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Why we need your location:</strong> We use your ZIP code to find qualified estimators in your area and show you available appointment times that work with local schedules.
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onBack} className="flex-1">
            Back
          </Button>
          <Button onClick={handleSubmit} disabled={!isValid} className="flex-1">
            Continue to Scheduling
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}