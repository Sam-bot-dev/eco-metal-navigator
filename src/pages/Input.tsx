import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { EnhancedCard } from "@/components/ui/enhanced-card";
import { ProgressTracker } from "@/components/ui/progress-tracker";
import { EnhancedInput } from "@/components/ui/enhanced-input";
import { PhotoUpload } from "@/components/ui/photo-upload";
import { ArrowRight, Upload, MapPin, Recycle, Factory, Truck, Save, Calculator, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const InputPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    metalType: "",
    currentlyRecycled: "",
    additionalRecycling: [0],
    formType: "",
    quantity: "",
    processingRoute: "",
    energySource: "",
    distance: [1000],
    transportMode: "",
    location: "",
  });

  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([]);

  const [currentStep, setCurrentStep] = useState(0);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [estimatedCarbon, setEstimatedCarbon] = useState<number | null>(null);

  // Metal-specific recycling data
  const metalRecyclingData = {
    aluminium: { maxRecycling: 95, avgCurrent: 35, unit: "%" },
    copper: { maxRecycling: 90, avgCurrent: 30, unit: "%" },
    steel: { maxRecycling: 85, avgCurrent: 25, unit: "%" },
    lithium: { maxRecycling: 70, avgCurrent: 5, unit: "%" },
    "rare-earths": { maxRecycling: 20, avgCurrent: 1, unit: "%" },
  };

  const getCurrentMetalData = () => {
    return metalRecyclingData[formData.metalType as keyof typeof metalRecyclingData] || { maxRecycling: 100, avgCurrent: 0, unit: "%" };
  };

  const getMaxAdditionalRecycling = () => {
    const currentRecycled = parseFloat(formData.currentlyRecycled) || 0;
    const metalData = getCurrentMetalData();
    return Math.max(0, metalData.maxRecycling - currentRecycled);
  };

  const handleSliderChange = (field: string, value: number[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  // Form validation
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.metalType) errors.metalType = "Metal type is required";
    if (!formData.currentlyRecycled) errors.currentlyRecycled = "Current recycled content is required";
    if (!formData.quantity) errors.quantity = "Quantity is required";
    if (!formData.transportMode) errors.transportMode = "Transport mode is required";
    if (!formData.location) errors.location = "Location is required";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Calculate estimated carbon footprint
  const calculateEstimatedCarbon = () => {
    if (!formData.metalType || !formData.quantity) return null;
    
    const baseCarbonPerKg = {
      aluminium: 8.2,
      copper: 3.9,
      steel: 2.5,
      lithium: 12.8,
      "rare-earths": 15.2
    };
    
    const base = baseCarbonPerKg[formData.metalType as keyof typeof baseCarbonPerKg] || 5;
    const quantity = parseFloat(formData.quantity) || 0;
    const recyclingReduction = (parseFloat(formData.currentlyRecycled) + formData.additionalRecycling[0]) / 100;
    const transportFactor = formData.distance[0] / 1000;
    
    return (base * quantity * (1 - recyclingReduction * 0.6) + transportFactor * 0.1).toFixed(2);
  };

  // Update estimated carbon when relevant fields change
  useEffect(() => {
    const estimated = calculateEstimatedCarbon();
    setEstimatedCarbon(estimated ? parseFloat(estimated) : null);
  }, [formData.metalType, formData.quantity, formData.currentlyRecycled, formData.additionalRecycling, formData.distance]);

  // Progress tracking
  const steps = [
    {
      id: "metal",
      title: "Metal Info",
      description: "Type & recycling",
      completed: !!(formData.metalType && formData.currentlyRecycled),
      current: currentStep === 0
    },
    {
      id: "processing",
      title: "Processing",
      description: "Quantity & method",
      completed: !!(formData.quantity && formData.formType),
      current: currentStep === 1
    },
    {
      id: "transport",
      title: "Transport",
      description: "Logistics",
      completed: !!(formData.transportMode && formData.location),
      current: currentStep === 2
    },
    {
      id: "review",
      title: "Review",
      description: "Final check",
      completed: false,
      current: currentStep === 3
    }
  ];

  // Save draft functionality
  const saveDraft = () => {
    localStorage.setItem("lcaFormDraft", JSON.stringify(formData));
    toast({
      title: "Draft Saved",
      description: "Your progress has been saved locally.",
    });
  };

  // Load draft functionality
  const loadDraft = () => {
    const draft = localStorage.getItem("lcaFormDraft");
    if (draft) {
      setFormData(JSON.parse(draft));
      toast({
        title: "Draft Loaded",
        description: "Your previous progress has been restored.",
      });
    }
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      toast({
        title: "Form Incomplete",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Store form data in localStorage for results page
    localStorage.setItem("lcaFormData", JSON.stringify({
      ...formData,
      estimatedCarbon,
      submittedAt: new Date().toISOString()
    }));
    
    toast({
      title: "Assessment Submitted",
      description: "Redirecting to results...",
    });
    
    navigate("/results");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8 animate-slideInFromBottom">
          <h1 className="text-4xl font-bold text-foreground mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            LCA Assessment Tool
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive environmental impact analysis for metal lifecycle assessment
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="mb-8">
          <ProgressTracker steps={steps} />
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={loadDraft}>
              <Upload className="w-4 h-4 mr-2" />
              Load Draft
            </Button>
            <Button variant="outline" size="sm" onClick={saveDraft}>
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
          </div>
          
          {estimatedCarbon && (
            <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-lg">
              <Calculator className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">
                Est. Carbon: <span className="text-primary font-bold">{estimatedCarbon} kg CO₂</span>
              </span>
            </div>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Metal Information */}
          <EnhancedCard 
            delay={0}
            title="Metal Information"
            description="Basic details about the metal you're assessing"
            icon={<Recycle className="w-5 h-5" />}
            progress={formData.metalType && formData.currentlyRecycled ? 100 : 0}
            className="animate-scaleIn [animation-delay:100ms]"
          >
              <div className="space-y-2">
                <Label htmlFor="metalType">Metal Type</Label>
                <Select onValueChange={(value) => handleInputChange("metalType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select metal type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aluminium">Aluminium</SelectItem>
                    <SelectItem value="copper">Copper</SelectItem>
                    <SelectItem value="steel">Steel</SelectItem>
                    <SelectItem value="lithium">Lithium</SelectItem>
                    <SelectItem value="rare-earths">Rare Earths</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <EnhancedInput
                label="Currently Recycled Content (%)"
                placeholder={`Average for ${formData.metalType || 'this metal'}: ${getCurrentMetalData().avgCurrent}%`}
                value={formData.currentlyRecycled}
                onChange={(value) => handleInputChange("currentlyRecycled", value)}
                type="number"
                min="0"
                max={getCurrentMetalData().maxRecycling.toString()}
                helpText="How much of this metal is already recycled content?"
                required
                validation={(value) => {
                  if (!value) return "This field is required";
                  const num = parseFloat(value);
                  if (isNaN(num) || num < 0) return "Must be a positive number";
                  if (num > getCurrentMetalData().maxRecycling) return `Cannot exceed ${getCurrentMetalData().maxRecycling}%`;
                  return null;
                }}
              />

              <div className="space-y-3">
                <Label>
                  Additional Recycling Potential: {formData.additionalRecycling[0]}%
                  {formData.currentlyRecycled && (
                    <span className="text-sm text-muted-foreground ml-2">
                      (Total: {parseFloat(formData.currentlyRecycled || "0") + formData.additionalRecycling[0]}%)
                    </span>
                  )}
                </Label>
                <Slider
                  value={formData.additionalRecycling}
                  onValueChange={(value) => handleSliderChange("additionalRecycling", value)}
                  max={getMaxAdditionalRecycling()}
                  step={1}
                  className="w-full"
                  disabled={!formData.metalType || !formData.currentlyRecycled}
                />
                <p className="text-xs text-muted-foreground">
                  {formData.metalType 
                    ? `Maximum additional recycling for ${formData.metalType}: ${getMaxAdditionalRecycling()}%`
                    : "Select a metal type to see recycling potential"
                  }
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="formType">Form/Use Case</Label>
                <Select onValueChange={(value) => handleInputChange("formType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select form type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sheet">Sheet</SelectItem>
                    <SelectItem value="box">Box</SelectItem>
                    <SelectItem value="rod">Rod</SelectItem>
                    <SelectItem value="component">Component</SelectItem>
                  </SelectContent>
                </Select>
              </div>
          </EnhancedCard>

          {/* Quantity & Processing */}
          <EnhancedCard 
            delay={100}
            title="Quantity & Processing"
            description="Production and processing details"
            icon={<Factory className="w-5 h-5" />}
            progress={formData.quantity && formData.formType ? 100 : 0}
            className="animate-scaleIn [animation-delay:200ms]"
          >
              <EnhancedInput
                label="Quantity (kg)"
                placeholder="Enter weight in kg"
                value={formData.quantity}
                onChange={(value) => handleInputChange("quantity", value)}
                type="number"
                min="0"
                helpText="Total weight of material for assessment"
                required
                validation={(value) => {
                  if (!value) return "Quantity is required";
                  const num = parseFloat(value);
                  if (isNaN(num) || num <= 0) return "Must be a positive number";
                  return null;
                }}
              />

              <div className="space-y-2">
                <Label htmlFor="processingRoute">Processing Route (Optional)</Label>
                <Select onValueChange={(value) => handleInputChange("processingRoute", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Auto-assumed if skipped" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="smelting">Smelting</SelectItem>
                    <SelectItem value="casting">Casting</SelectItem>
                    <SelectItem value="rolling">Rolling</SelectItem>
                    <SelectItem value="extrusion">Extrusion</SelectItem>
                    <SelectItem value="refining">Refining</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="energySource">Energy Source (Optional)</Label>
                <Select onValueChange={(value) => handleInputChange("energySource", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Auto-filled with defaults" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="renewable">Renewable Mix</SelectItem>
                    <SelectItem value="grid">Grid Electricity</SelectItem>
                    <SelectItem value="coal">Coal</SelectItem>
                    <SelectItem value="natural-gas">Natural Gas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
          </EnhancedCard>

          {/* Transport & Location */}
          <EnhancedCard 
            delay={200}
            title="Transport Information"
            description="Logistics and transportation details"
            icon={<Truck className="w-5 h-5" />}
            progress={formData.transportMode && formData.location ? 100 : 0}
            className="animate-scaleIn [animation-delay:300ms]"
          >
              <div className="space-y-3">
                <Label>Transport Distance: {formData.distance[0]} km</Label>
                <Slider
                  value={formData.distance}
                  onValueChange={(value) => handleSliderChange("distance", value)}
                  max={5000}
                  step={50}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="transportMode">Transport Mode</Label>
                <Select onValueChange={(value) => handleInputChange("transportMode", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select transport mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="truck">Truck</SelectItem>
                    <SelectItem value="rail">Rail</SelectItem>
                    <SelectItem value="ship">Ship</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="City, Country or Pincode"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                  />
                  <Button variant="outline" size="sm">
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
              </div>
          </EnhancedCard>

          {/* Photo Upload Section */}
          <PhotoUpload 
            onFilesChange={setUploadedPhotos}
            maxFiles={5}
            className="animate-scaleIn [animation-delay:400ms]"
          />

          {/* Assessment Summary */}
          <EnhancedCard 
            delay={300}
            title="Assessment Summary"
            description="Review your input and estimated impact"
            icon={<BarChart3 className="w-5 h-5" />}
            className="lg:col-span-2 animate-scaleIn [animation-delay:500ms]"
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                <div className="text-sm text-muted-foreground">Metal Type</div>
                <div className="font-semibold text-primary capitalize">
                  {formData.metalType || "Not selected"}
                </div>
              </div>
              <div className="p-4 bg-blue-500/5 rounded-lg border border-blue-500/10">
                <div className="text-sm text-muted-foreground">Total Recycling</div>
                <div className="font-semibold text-blue-600">
                  {formData.currentlyRecycled ? 
                    `${parseFloat(formData.currentlyRecycled) + formData.additionalRecycling[0]}%` : 
                    "Not set"
                  }
                </div>
              </div>
              <div className="p-4 bg-green-500/5 rounded-lg border border-green-500/10">
                <div className="text-sm text-muted-foreground">Quantity</div>
                <div className="font-semibold text-green-600">
                  {formData.quantity ? `${formData.quantity} kg` : "Not set"}
                </div>
              </div>
              <div className="p-4 bg-orange-500/5 rounded-lg border border-orange-500/10">
                <div className="text-sm text-muted-foreground">Est. Carbon Impact</div>
                <div className="font-semibold text-orange-600">
                  {estimatedCarbon ? `${estimatedCarbon} kg CO₂` : "Calculating..."}
                </div>
              </div>
            </div>
          </EnhancedCard>
        </div>

        <div className="flex justify-center mt-12">
          <div className="flex gap-4">
            <Button
              variant="outline"
              size="lg"
              onClick={saveDraft}
              className="hover:bg-secondary/50"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
            <Button
              onClick={handleSubmit}
              size="lg"
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 px-8"
            >
              Generate Assessment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputPage;