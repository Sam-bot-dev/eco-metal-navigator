import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AnimatedButton } from "@/components/ui/animated-button";
import { AnimatedCard, AnimatedCardHeader, AnimatedCardContent } from "@/components/ui/animated-card";
import { FloatingMetal } from "@/components/3D/FloatingMetal";
import { ArrowRight, Leaf, BarChart3, Recycle, Globe, Sparkles, Atom, Zap } from "lucide-react";
import React from "react";

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
    <div className="min-h-screen bg-background particles">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero min-h-screen flex items-center border-b border-border/20">
        <div className="absolute inset-0 bg-gradient-premium/5"></div>
        
        {/* Minimalist Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              className="text-center lg:text-left max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div 
                className="flex justify-center lg:justify-start mb-8"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-primary shadow-premium hover-lift">
                  <Leaf className="h-12 w-12 text-primary-foreground" />
                </div>
              </motion.div>
              
              <motion.h1 
                className="text-6xl md:text-8xl font-light text-foreground mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                AI-Driven
                <motion.span 
                  className="block font-bold gradient-text"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  LCA Analytics
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-muted-foreground mb-10 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Premium Life Cycle Assessment platform for sustainable metals. 
                Make data-driven environmental decisions with cutting-edge analytics.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <AnimatedButton asChild size="lg" variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-premium px-8 py-4 text-lg font-medium">
                  <Link to="/input">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Start Assessment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </AnimatedButton>
                <AnimatedButton variant="outline" size="lg" className="border-2 border-primary/20 text-foreground hover:bg-secondary/50 hover:border-accent px-8 py-4 text-lg">
                  <Zap className="mr-2 h-5 w-5" />
                  Learn More
                </AnimatedButton>
              </motion.div>
            </motion.div>

            {/* Clean Geometric Element */}
            <motion.div 
              className="hidden lg:flex items-center justify-center h-96"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 bg-gradient-accent rounded-3xl rotate-6 shadow-card"></div>
                <div className="absolute inset-4 bg-card rounded-2xl shadow-premium border border-border/20 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-16 h-16 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                      <BarChart3 className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">Premium Analytics</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Metal Selection */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-light text-foreground mb-6">
              Choose Your <span className="gradient-text font-bold">Metal Assessment</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Select from our comprehensive range of metal analysis options
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
            {metalTypes.map((metal, index) => (
              <AnimatedCard 
                key={metal.name} 
                delay={index * 0.1}
                className="group cursor-pointer border-0 bg-card shadow-card hover:shadow-premium transition-all duration-500 hover-lift"
              >
                <AnimatedCardContent className="p-8 text-center">
                  <motion.div 
                    className="text-6xl mb-6 filter grayscale group-hover:grayscale-0 transition-all duration-500"
                    whileHover={{ 
                      scale: 1.1,
                      transition: { duration: 0.3 }
                    }}
                  >
                    {metal.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:gradient-text transition-all duration-300">
                    {metal.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{metal.description}</p>
                  <div className="mt-6 w-full h-px bg-gradient-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </AnimatedCardContent>
              </AnimatedCard>
            ))}
          </div>

          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <AnimatedButton asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-premium px-10 py-4 text-lg font-medium">
              <Link to="/input">
                <Atom className="mr-2 h-5 w-5" />
                Start Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </AnimatedButton>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-light text-foreground mb-6">
              Why Choose <span className="gradient-text font-bold">Our Platform?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Experience premium sustainability analysis with enterprise-grade precision
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
            {benefits.map((benefit, index) => (
              <AnimatedCard 
                key={index} 
                delay={index * 0.15}
                className="text-center group cursor-pointer border-0 bg-card/80 backdrop-blur-sm shadow-card hover:shadow-premium transition-all duration-500 hover-lift"
              >
                <AnimatedCardContent className="p-8">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="mb-6 inline-flex p-4 rounded-2xl bg-accent/10 group-hover:bg-accent/20 transition-colors duration-300"
                  >
                    {React.cloneElement(benefit.icon, { 
                      className: "h-8 w-8 text-accent group-hover:text-primary transition-colors duration-300" 
                    })}
                  </motion.div>
                  <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:gradient-text transition-all duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                </AnimatedCardContent>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-premium text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-accent/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-6xl font-light mb-8 leading-tight">
              Ready to Transform Your
              <span className="block font-bold">Metal Sustainability?</span>
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-16 max-w-4xl mx-auto leading-relaxed">
              Join industry leaders who trust our AI-powered Life Cycle Assessment platform. 
              Deliver comprehensive environmental impact analysis in minutes.
            </p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-8 justify-center items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <AnimatedButton asChild size="lg" className="bg-card text-foreground hover:bg-card/90 shadow-premium px-10 py-4 text-lg font-medium">
                <Link to="/input">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Begin Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </AnimatedButton>
              
              <motion.div
                className="flex items-center gap-3 text-primary-foreground/70"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-3 h-3 bg-accent rounded-full"
                />
                <span className="text-lg">Professional results in under 3 minutes</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
