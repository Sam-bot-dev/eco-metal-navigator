import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { FileText, ArrowLeft, Recycle, Zap, TreePine, Trash2 } from "lucide-react";

const Results = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("lcaFormData");
    if (data) {
      setFormData(JSON.parse(data));
    }
  }, []);

  // Mock data for visualization
  const emissionsData = [
    { category: "Production", new: 85, recycled: 25 },
    { category: "Transport", new: 15, recycled: 15 },
    { category: "Processing", new: 35, recycled: 20 },
    { category: "End-of-Life", new: 10, recycled: 5 },
  ];

  // Calculate total recycled percentage from the new form structure
  const getTotalRecycledPercent = () => {
    if (!formData) return 50;
    const current = parseFloat(formData.currentRecycledContent) || 0;
    const additional = parseFloat(formData.additionalRecyclingPotential) || 0;
    return Math.min(current + additional, 100); // Cap at 100%
  };

  const totalRecycledPercent = getTotalRecycledPercent();

  const circularityData = [
    { name: "Virgin Material", value: 100 - totalRecycledPercent, color: "#dc2626" },
    { name: "Recycled Content", value: totalRecycledPercent, color: "hsl(var(--accent))" },
  ];

  const metrics = {
    co2Emissions: formData ? Math.round(145 * (1 - totalRecycledPercent / 100) * (parseFloat(formData.quantity) / 100 || 1)) : 87,
    energyUse: formData ? Math.round(780 * (1 - totalRecycledPercent / 100) * (parseFloat(formData.quantity) / 100 || 1)) : 468,
    wasteGenerated: formData ? Math.round(45 * (1 - totalRecycledPercent / 100) * (parseFloat(formData.quantity) / 100 || 1)) : 27,
    circularityScore: formData ? Math.round(20 + (totalRecycledPercent * 0.8)) : 60,
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={() => navigate("/input")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Input
          </Button>
          <div>
            <h1 className="text-4xl font-bold text-foreground">
              LCA Results
            </h1>
            <p className="text-xl text-muted-foreground mt-2">
              Environmental impact analysis for your {formData?.metalType || "metal"} assessment
            </p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <TreePine className="h-8 w-8 text-accent" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{metrics.co2Emissions} kg</p>
                  <p className="text-sm text-muted-foreground">CO₂ Emissions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Zap className="h-8 w-8 text-accent" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{metrics.energyUse} kWh</p>
                  <p className="text-sm text-muted-foreground">Energy Use</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Trash2 className="h-8 w-8 text-accent" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{metrics.wasteGenerated} kg</p>
                  <p className="text-sm text-muted-foreground">Waste Generated</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Recycle className="h-8 w-8 text-accent" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{metrics.circularityScore}%</p>
                  <p className="text-sm text-muted-foreground">Circularity Score</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Emissions Comparison */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-accent">Environmental Impact Comparison</CardTitle>
              <CardDescription>
                New vs Recycled material across lifecycle stages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={emissionsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="new" fill="#dc2626" name="Virgin Material" />
                    <Bar dataKey="recycled" fill="hsl(var(--accent))" name="Recycled Content" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Circularity Breakdown */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-accent">Material Composition</CardTitle>
              <CardDescription>
                Virgin vs recycled content breakdown
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={circularityData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {circularityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary and Recommendations */}
        <Card className="shadow-card mt-8">
          <CardHeader>
            <CardTitle className="text-accent">Assessment Summary</CardTitle>
            <CardDescription>
              Key insights and recommendations for your {formData?.metalType || "metal"} project
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">Environmental Benefits</h4>
              <p className="text-muted-foreground">
                Using {totalRecycledPercent}% recycled content reduces CO₂ emissions by approximately{" "}
                {Math.round(totalRecycledPercent * 0.6)}% compared to virgin material production.
              </p>
            </div>
            
            <div className="bg-accent/10 p-4 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">Recommendations</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Consider increasing recycled content to 75%+ for maximum environmental benefit</li>
                <li>• Optimize transport routes - rail transport can reduce emissions by 40%</li>
                <li>• Explore renewable energy sources for processing operations</li>
                <li>• Plan for end-of-life recycling to maintain circularity</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center mt-12">
          <Button
            onClick={() => navigate("/report")}
            size="lg"
            className="bg-gradient-accent hover:shadow-glow transition-all duration-300"
          >
            Generate Detailed Report
            <FileText className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;