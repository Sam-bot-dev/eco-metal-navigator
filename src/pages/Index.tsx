import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AnimatedButton } from "@/components/ui/animated-button";
import { AnimatedCard, AnimatedCardHeader, AnimatedCardContent } from "@/components/ui/animated-card";
import { FloatingMetal } from "@/components/3D/FloatingMetal";
import { ArrowRight, Leaf, BarChart3, Recycle, Globe, Sparkles, Atom, Zap } from "lucide-react";

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
      <section className="relative overflow-hidden bg-gradient-hero min-h-screen flex items-center">
        <div className="absolute inset-0 bg-background/10"></div>
        
        {/* 3D Background */}
        <div className="absolute inset-0 opacity-30">
          <FloatingMetal />
        </div>

        <div className="relative container mx-auto px-4 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="text-center lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div 
                className="flex justify-center lg:justify-start mb-6"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-background/20 backdrop-blur glass hover-glow">
                  <Leaf className="h-10 w-10 text-primary-foreground" />
                </div>
              </motion.div>
              
              <motion.h1 
                className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                AI-Driven LCA Tool
                <motion.span 
                  className="block gradient-text text-primary-glow"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  for Sustainable Metals
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Assess environmental impact, optimize circularity, and make informed decisions 
                for your metal-based projects with our comprehensive Life Cycle Assessment platform.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <AnimatedButton asChild size="lg" variant="gradient" float>
                  <Link to="/input">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Start Assessment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </AnimatedButton>
                <AnimatedButton variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary glass">
                  <Zap className="mr-2 h-4 w-4" />
                  Learn More
                </AnimatedButton>
              </motion.div>
            </motion.div>

            {/* Interactive 3D Element */}
            <motion.div 
              className="hidden lg:block h-96"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <FloatingMetal className="w-full h-full" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Metal Selection */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold gradient-text mb-4">
              Choose Your Metal Assessment
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our interactive metal selection and start your sustainability journey
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {metalTypes.map((metal, index) => (
              <AnimatedCard 
                key={metal.name} 
                delay={index * 0.1}
                hover3d
                className="stagger-in"
              >
                <AnimatedCardContent className="p-6 text-center">
                  <motion.div 
                    className="text-5xl mb-4"
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: [0, -10, 10, 0],
                      transition: { duration: 0.5 }
                    }}
                  >
                    {metal.icon}
                  </motion.div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:gradient-text transition-all">
                    {metal.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{metal.description}</p>
                </AnimatedCardContent>
              </AnimatedCard>
            ))}
          </div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <AnimatedButton asChild size="lg" variant="gradient" pulse float>
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
      <section className="py-20 bg-muted/30 particles">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold gradient-text mb-4">
              Why Use This Tool?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of sustainability analysis with cutting-edge technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <AnimatedCard 
                key={index} 
                delay={index * 0.15}
                hover3d
                className="text-center hover-lift"
              >
                <AnimatedCardHeader
                  title={benefit.title}
                  description={benefit.description}
                  icon={
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="p-3 rounded-full bg-gradient-accent/20"
                    >
                      {benefit.icon}
                    </motion.div>
                  }
                />
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-card relative overflow-hidden">
        <div className="absolute inset-0 particles"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold gradient-text mb-6">
              Ready to Optimize Your Metal Sustainability?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              Join the future of sustainable manufacturing with our AI-powered Life Cycle Assessment platform. 
              Transform your environmental impact in minutes, not months.
            </p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <AnimatedButton asChild size="lg" variant="glow" className="text-lg px-8 py-4">
                <Link to="/input">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Begin Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </AnimatedButton>
              
              <motion.div
                className="text-sm text-muted-foreground flex items-center gap-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-2 h-2 bg-accent rounded-full"
                />
                <span>Get results in under 3 minutes</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
