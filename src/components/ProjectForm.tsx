import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Upload, X, Camera, AlertCircle } from 'lucide-react';

interface ProjectFormProps {
  onNext: (data: { photos: string[]; description: string }) => void;
  initialData?: { photos: string[]; description: string };
}

export function ProjectForm({ onNext, initialData }: ProjectFormProps) {
  const [photos, setPhotos] = useState<string[]>(initialData?.photos || []);
  const [description, setDescription] = useState(initialData?.description || '');
  const [errors, setErrors] = useState<{ photos?: string; description?: string }>({});

  // Mock photo upload - in a real app this would handle file uploads with validation
  const handleAddPhoto = () => {
    if (photos.length >= 10) {
      setErrors(prev => ({ ...prev, photos: 'You can upload a maximum of 10 photos.' }));
      return;
    }

    const mockPhotos = [
      'https://images.unsplash.com/photo-1578177154072-bbbd429d496f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwcmVub3ZhdGlvbiUyMGtpdGNoZW4lMjBiZWZvcmV8ZW58MXx8fHwxNzU3NjY0NDQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1664227430687-9299c593e3da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXRocm9vbSUyMHJlbm92YXRpb24lMjBiZWZvcmV8ZW58MXx8fHwxNzU3NjY5NjkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ];
    
    const randomPhoto = mockPhotos[Math.floor(Math.random() * mockPhotos.length)];
    setPhotos([...photos, randomPhoto]);
    setErrors(prev => ({ ...prev, photos: undefined }));
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
    if (value.trim().length >= 20) {
      setErrors(prev => ({ ...prev, description: undefined }));
    }
  };

  const handleSubmit = () => {
    const newErrors: { photos?: string; description?: string } = {};
    
    if (photos.length === 0) {
      newErrors.photos = 'Please upload at least one photo of your project.';
    }
    
    if (description.trim().length < 20) {
      newErrors.description = 'Please provide a brief description of your project (minimum 20 characters).';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onNext({ photos, description: description.trim() });
  };

  const isValid = photos.length > 0 && description.trim().length >= 20;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5" />
          Start Your Renovation Project
        </CardTitle>
        <CardDescription>
          Upload photos of the space you'd like to renovate and describe your vision
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label>Photos of Your Space *</Label>
          <p className="text-sm text-muted-foreground mt-1 mb-3">
            Upload up to 10 photos. Tap to add photos of the space you'd like to renovate.
          </p>
          <div className="mt-2">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {photos.map((photo, index) => (
                <div key={index} className="relative group">
                  <ImageWithFallback
                    src={photo}
                    alt={`Project photo ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border"
                  />
                  <button
                    onClick={() => removePhoto(index)}
                    className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            
            {photos.length < 10 && (
              <button
                onClick={handleAddPhoto}
                className="w-full h-32 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-muted/50 transition-colors"
              >
                <Upload className="h-6 w-6 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Tap to add photo ({photos.length}/10)
                </span>
                <span className="text-xs text-muted-foreground">
                  JPG, PNG • Max 20MB each
                </span>
              </button>
            )}
            
            {errors.photos && (
              <Alert className="mt-3">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.photos}</AlertDescription>
              </Alert>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="description">Project Description *</Label>
          <p className="text-sm text-muted-foreground mt-1 mb-2">
            Describe what you'd like to renovate (minimum 20 characters)
          </p>
          <Textarea
            id="description"
            placeholder="Describe what you'd like to renovate. Include details about your vision, style preferences, and any specific requirements..."
            value={description}
            onChange={(e) => handleDescriptionChange(e.target.value)}
            className={`mt-2 min-h-[120px] ${errors.description ? 'border-destructive' : ''}`}
          />
          <div className="flex justify-between items-center mt-1">
            <p className={`text-xs ${description.length < 20 ? 'text-destructive' : 'text-muted-foreground'}`}>
              {description.length}/500 characters {description.length < 20 && `(${20 - description.length} more needed)`}
            </p>
          </div>
          
          {errors.description && (
            <Alert className="mt-3">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errors.description}</AlertDescription>
            </Alert>
          )}
        </div>

        <Button 
          onClick={handleSubmit} 
          disabled={!isValid}
          className="w-full"
        >
          Continue to Location
        </Button>
      </CardContent>
    </Card>
  );
}