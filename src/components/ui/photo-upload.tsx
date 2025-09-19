import { useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, X, Image, FileImage } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhotoUploadProps {
  onFilesChange?: (files: File[]) => void;
  maxFiles?: number;
  acceptedTypes?: string[];
  className?: string;
}

export function PhotoUpload({ 
  onFilesChange, 
  maxFiles = 5,
  acceptedTypes = ["image/jpeg", "image/png", "image/webp"],
  className 
}: PhotoUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);

  const createPreview = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviews(prev => [...prev, e.target?.result as string]);
    };
    reader.readAsDataURL(file);
  };

  const handleFiles = useCallback((newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles);
    const validFiles = fileArray.filter(file => 
      acceptedTypes.includes(file.type) && file.size <= 10 * 1024 * 1024 // 10MB limit
    );

    if (files.length + validFiles.length > maxFiles) {
      validFiles.splice(maxFiles - files.length);
    }

    const updatedFiles = [...files, ...validFiles];
    setFiles(updatedFiles);
    onFilesChange?.(updatedFiles);

    // Create previews for new files
    validFiles.forEach(createPreview);
  }, [files, maxFiles, acceptedTypes, onFilesChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    setPreviews(updatedPreviews);
    onFilesChange?.(updatedFiles);
  };

  return (
    <Card className={cn("animate-scaleIn", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Image className="w-5 h-5" />
          Photo Documentation
        </CardTitle>
        <CardDescription>
          Upload photos of your materials, processes, or facilities (optional)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload Area */}
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
            dragActive 
              ? "border-primary bg-primary/5" 
              : "border-muted-foreground/25 hover:border-primary/50"
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <FileImage className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <div className="space-y-2">
            <p className="text-lg font-medium">
              {dragActive ? "Drop your images here" : "Upload images"}
            </p>
            <p className="text-sm text-muted-foreground">
              Drag & drop or click to select • Max {maxFiles} files • Up to 10MB each
            </p>
            <input
              type="file"
              multiple
              accept={acceptedTypes.join(",")}
              onChange={handleFileInput}
              className="hidden"
              id="photo-upload"
            />
            <Button variant="outline" asChild className="mt-4">
              <label htmlFor="photo-upload" className="cursor-pointer">
                <Upload className="w-4 h-4 mr-2" />
                Select Images
              </label>
            </Button>
          </div>
        </div>

        {/* Preview Grid */}
        {files.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium">Uploaded Images ({files.length}/{maxFiles})</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {files.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="relative group bg-muted rounded-lg overflow-hidden aspect-square"
                >
                  {previews[index] ? (
                    <img
                      src={previews[index]}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FileImage className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all" />
                  
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeFile(index)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/50 text-white text-xs truncate opacity-0 group-hover:opacity-100 transition-opacity">
                    {file.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {files.length === 0 && (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">
              No images uploaded yet. Photos help provide context for your assessment.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}