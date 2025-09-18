import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ProfessionalButton } from "@/components/ui/professional-button";
import { ProfessionalCard, ProfessionalCardHeader, ProfessionalCardContent } from "@/components/ui/professional-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ArrowRight, Upload, MapPin, Zap, Cog, Truck, FlaskConical } from "lucide-react";

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

  const [loading, setLoading] = useState(false);

  const handleSliderChange = (field: string, value: number[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate processing time for professional feel
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Store form data in localStorage for results page
    localStorage.setItem("lcaFormData", JSON.stringify(formData));
    navigate("/results");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold gradient-text mb-4">
              Smart LCA Assessment
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Provide comprehensive details about your metal for precise environmental impact analysis. 
              Our AI-powered system will generate detailed sustainability insights.
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Metal Information */}
            <ProfessionalCard delay={0.1} className="stagger-fade">
              <ProfessionalCardHeader
                title="Metal Information"
                description="Essential details about the metal you're assessing"
                icon={<FlaskConical className="h-6 w-6" />}
              />
              <ProfessionalCardContent className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="metalType" className="text-sm font-medium">Metal Type *</Label>
                  <Select onValueChange={(value) => handleInputChange("metalType", value)}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Choose your metal type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aluminium">🔧 Aluminium</SelectItem>
                      <SelectItem value="copper">⚡ Copper</SelectItem>
                      <SelectItem value="steel">🏗️ Steel</SelectItem>
                      <SelectItem value="lithium">🔋 Lithium</SelectItem>
                      <SelectItem value="rare-earths">🌟 Rare Earths</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-medium">Recycled Content Target</Label>
                    <span className="text-sm font-semibold text-accent bg-accent/10 px-2 py-1 rounded-md">
                      {formData.recycledPercent[0]}%
                    </span>
                  </div>
                  <Slider
                    value={formData.recycledPercent}
                    onValueChange={(value) => handleSliderChange("recycledPercent", value)}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0% Virgin</span>
                    <span>100% Recycled</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="formType" className="text-sm font-medium">Form/Use Case *</Label>
                  <Select onValueChange={(value) => handleInputChange("formType", value)}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select application form" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sheet">📄 Sheet Metal</SelectItem>
                      <SelectItem value="box">📦 Box/Container</SelectItem>
                      <SelectItem value="rod">🔩 Rod/Bar</SelectItem>
                      <SelectItem value="component">⚙️ Component/Part</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </ProfessionalCardContent>
            </ProfessionalCard>

            {/* Quantity & Processing */}
            <ProfessionalCard delay={0.2} className="stagger-fade">
              <ProfessionalCardHeader
                title="Production Details"
                description="Quantity and processing specifications"
                icon={<Cog className="h-6 w-6" />}
              />
              <ProfessionalCardContent className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="quantity" className="text-sm font-medium">Quantity (kg) *</Label>
                  <Input
                    id="quantity"
                    placeholder="Enter total weight in kilograms"
                    value={formData.quantity}
                    onChange={(e) => handleInputChange("quantity", e.target.value)}
                    className="h-11"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="processingRoute" className="text-sm font-medium">Processing Route</Label>
                  <Select onValueChange={(value) => handleInputChange("processingRoute", value)}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Auto-detected if not specified" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="smelting">🔥 Smelting</SelectItem>
                      <SelectItem value="casting">🏭 Casting</SelectItem>
                      <SelectItem value="rolling">🎯 Rolling</SelectItem>
                      <SelectItem value="extrusion">📏 Extrusion</SelectItem>
                      <SelectItem value="refining">⚗️ Refining</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="energySource" className="text-sm font-medium">Energy Source</Label>
                  <Select onValueChange={(value) => handleInputChange("energySource", value)}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Regional grid mix assumed" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="renewable">🌱 Renewable Mix</SelectItem>
                      <SelectItem value="grid">⚡ Grid Electricity</SelectItem>
                      <SelectItem value="coal">⚫ Coal Power</SelectItem>
                      <SelectItem value="natural-gas">🔵 Natural Gas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </ProfessionalCardContent>
            </ProfessionalCard>

            {/* Transport & Location */}
            <ProfessionalCard delay={0.3} className="stagger-fade">
              <ProfessionalCardHeader
                title="Logistics & Transport"
                description="Transportation and location parameters"
                icon={<Truck className="h-6 w-6" />}
              />
              <ProfessionalCardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-medium">Transport Distance</Label>
                    <span className="text-sm font-semibold text-accent bg-accent/10 px-2 py-1 rounded-md">
                      {formData.distance[0].toLocaleString()} km
                    </span>
                  </div>
                  <Slider
                    value={formData.distance}
                    onValueChange={(value) => handleSliderChange("distance", value)}
                    max={5000}
                    step={50}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Local (0 km)</span>
                    <span>International (5000+ km)</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="transportMode" className="text-sm font-medium">Transport Mode</Label>
                  <Select onValueChange={(value) => handleInputChange("transportMode", value)}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select transportation method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="truck">🚛 Road Transport</SelectItem>
                      <SelectItem value="rail">🚂 Rail Transport</SelectItem>
                      <SelectItem value="ship">🚢 Maritime Transport</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="location" className="text-sm font-medium">Location</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="City, Country or Postal Code"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      className="h-11 flex-1"
                    />
                    <Button variant="outline" size="sm" className="h-11 px-3">
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </ProfessionalCardContent>
            </ProfessionalCard>

            {/* File Upload */}
            <ProfessionalCard delay={0.4} className="stagger-fade">
              <ProfessionalCardHeader
                title="Material Documentation"
                description="Upload supporting images or documents"
                icon={<Upload className="h-6 w-6" />}
              />
              <ProfessionalCardContent>
                <motion.div 
                  className="border-2 border-dashed border-border/50 rounded-xl p-8 text-center hover:border-accent/30 transition-all duration-300 cursor-pointer group"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-4 group-hover:text-accent transition-colors" />
                  <p className="text-sm font-medium text-foreground mb-2">
                    Drop files here or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG, PDF up to 10MB • Optional but helpful for analysis
                  </p>
                </motion.div>
              </ProfessionalCardContent>
            </ProfessionalCard>
          </div>

          {/* Submit Section */}
          <motion.div 
            className="flex flex-col items-center mt-16 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <ProfessionalButton
              onClick={handleSubmit}
              size="lg"
              loading={loading}
              glow
              className="text-lg px-8 py-4 bg-gradient-accent hover:shadow-lg"
            >
              {loading ? "Processing Assessment..." : (
                <>
                  <Zap className="mr-2 h-5 w-5" />
                  Generate LCA Report
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </ProfessionalButton>
            <p className="text-sm text-muted-foreground text-center">
              Our AI will analyze your inputs and generate a comprehensive sustainability report
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InputPage;