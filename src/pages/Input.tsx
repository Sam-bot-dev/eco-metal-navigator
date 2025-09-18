import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ArrowRight, Upload, MapPin } from "lucide-react";

const InputPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    metalType: "",
    recycledPercent: [50],
    formType: "",
    quantity: "",
    processingRoute: "",
    energySource: "",
    distance: [1000],
    transportMode: "",
    location: "",
  });

  const handleSliderChange = (field: string, value: number[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Store form data in localStorage for results page
    localStorage.setItem("lcaFormData", JSON.stringify(formData));
    navigate("/results");
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            LCA Assessment Input
          </h1>
          <p className="text-xl text-muted-foreground">
            Provide details about your metal for environmental impact analysis
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Metal Information */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-accent">Metal Information</CardTitle>
              <CardDescription>
                Basic details about the metal you're assessing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
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

              <div className="space-y-3">
                <Label>Recycled Content Desired: {formData.recycledPercent[0]}%</Label>
                <Slider
                  value={formData.recycledPercent}
                  onValueChange={(value) => handleSliderChange("recycledPercent", value)}
                  max={100}
                  step={5}
                  className="w-full"
                />
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
            </CardContent>
          </Card>

          {/* Quantity & Processing */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-accent">Quantity & Processing</CardTitle>
              <CardDescription>
                Production and processing details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity (kg)</Label>
                <Input
                  id="quantity"
                  placeholder="Enter weight in kg"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange("quantity", e.target.value)}
                />
              </div>

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
            </CardContent>
          </Card>

          {/* Transport & Location */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-accent">Transport Information</CardTitle>
              <CardDescription>
                Logistics and transportation details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
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
            </CardContent>
          </Card>

          {/* File Upload */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-accent">Material Image</CardTitle>
              <CardDescription>
                Upload an image of your material (optional)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-accent/50 transition-colors">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG up to 10MB
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center mt-12">
          <Button
            onClick={handleSubmit}
            size="lg"
            className="bg-gradient-accent hover:shadow-glow transition-all duration-300"
          >
            View Results
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InputPage;