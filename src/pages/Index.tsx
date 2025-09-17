import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Leaf, BarChart3, Recycle, Globe } from "lucide-react";

const Index = () => {
  const metalTypes = [
    { name: "Aluminium", icon: "🔧", description: "Lightweight, corrosion-resistant" },
    { name: "Copper", icon: "⚡", description: "Excellent conductivity" },
    { name: "Steel", icon: "🏗️", description: "High strength, versatile" },
    { name: "Lithium", icon: "🔋", description: "Energy storage solutions" },
    { name: "Rare Earths", icon: "🌟", description: "Advanced technologies" },
  ];

  const benefits = [
    {
      icon: <Leaf className="h-8 w-8 text-accent" />,
      title: "Sustainability Focus",
      description: "Make data-driven decisions for environmental impact reduction"
    },
    {
      icon: <Recycle className="h-8 w-8 text-accent" />,
      title: "Circularity Analysis",
      description: "Optimize recycled content and end-of-life planning"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-accent" />,
      title: "Data-Driven Insights",
      description: "Comprehensive LCA metrics and actionable recommendations"
    },
    {
      icon: <Globe className="h-8 w-8 text-accent" />,
      title: "Global Standards",
      description: "ISO 14040/14044 compliant assessment methodology"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-background/10"></div>
        <div className="relative container mx-auto px-4 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-background/20 backdrop-blur">
                <Leaf className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6">
              AI-Driven LCA Tool
              <span className="block text-primary-glow">for Sustainable Metals</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Assess environmental impact, optimize circularity, and make informed decisions 
              for your metal-based projects with our comprehensive Life Cycle Assessment platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-background text-primary hover:bg-background/90">
                <Link to="/input">
                  Start Assessment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Metal Selection */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Choose Your Metal Assessment
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start your LCA journey by selecting the metal type you want to analyze
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {metalTypes.map((metal) => (
              <Card key={metal.name} className="shadow-card hover:shadow-glow transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{metal.icon}</div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                    {metal.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{metal.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild size="lg" className="bg-gradient-accent hover:shadow-glow transition-all duration-300">
              <Link to="/input">
                Start Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Use This Tool?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive sustainability analysis for informed decision-making
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card key={index} className="shadow-card text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Optimize Your Metal Sustainability?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get started with your comprehensive LCA assessment in just a few minutes
          </p>
          <Button asChild size="lg" className="bg-gradient-accent hover:shadow-glow transition-all duration-300">
            <Link to="/input">
              Begin Assessment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
