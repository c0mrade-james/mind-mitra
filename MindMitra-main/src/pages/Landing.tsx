import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { QuoteCarousel } from '@/components/ui/quote-carousel';
import { 
  Heart, 
  Shield, 
  Users, 
  MessageCircle, 
  Calendar, 
  BookOpen,
  ArrowRight,
  Star,
  CheckCircle2
} from 'lucide-react';
import heroImage from '@/assets/hero-waves.jpg';

const Landing: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const features = [
    {
      icon: MessageCircle,
      title: 'AI-Guided Support',
      description: 'Get immediate mental health guidance from our AI assistant, available 24/7.',
      color: 'trust',
    },
    {
      icon: Calendar,
      title: 'Counselor Booking',
      description: 'Schedule confidential sessions with qualified mental health professionals.',
      color: 'calm',
    },
    {
      icon: BookOpen,
      title: 'Wellness Resources',
      description: 'Access curated mental health content, guides, and self-help materials.',
      color: 'hope',
    },
    {
      icon: Users,
      title: 'Peer Support',
      description: 'Connect anonymously with fellow students in a safe, moderated environment.',
      color: 'primary',
    },
  ];

  const benefits = [
    'Completely confidential and stigma-free',
    'Available 24/7 for immediate support',
    'Qualified mental health professionals',
    'Anonymous peer support community',
    'Evidence-based coping strategies',
    'Crisis intervention protocols',
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 hero-gradient opacity-90" />
        
        <motion.div
          className="relative z-10 container mx-auto px-4 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
            <motion.div
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20"
              whileHover={{ scale: 1.05 }}
            >
              <Heart className="w-4 h-4 text-white" fill="currentColor" />
              <span className="text-white text-sm font-medium">Your Mental Health Companion</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Supporting Student
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                Mental Wellness
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
              A stigma-free platform providing 24/7 mental health support, counseling, and peer connection 
              for college students. Your well-being matters.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/auth">
                <Button variant="hero" size="xl" className="w-full sm:w-auto group">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="floating" size="xl" className="w-full sm:w-auto">
                  <Users className="w-5 h-5 mr-2" />
                  Continue as Guest
                </Button>
              </Link>
            </div>

            <motion.div
              className="mt-8 flex items-center justify-center space-x-6 text-white/80"
              variants={itemVariants}
            >
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span className="text-sm">HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4" fill="currentColor" />
                <span className="text-sm">24/7 Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span className="text-sm">1000+ Students</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </section>

      {/* Quote Carousel Section */}
      <section className="py-20 calm-gradient">
        <motion.div
          className="container mx-auto px-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Words of Encouragement
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find inspiration and hope in these carefully selected messages from mental health experts and recovery stories.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <QuoteCarousel />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <motion.div
          className="container mx-auto px-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Comprehensive Mental Health Support
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our platform offers multiple ways to support your mental wellness journey, 
              from immediate AI assistance to professional counseling.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="text-center p-6 hover-lift h-full border-border/50 hover:border-primary/30 transition-all duration-300">
                  <CardContent className="space-y-4">
                    <motion.div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-${feature.color}/10 text-${feature.color} mb-4`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <feature.icon className="w-8 h-8" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <motion.div
          className="container mx-auto px-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants} className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Why Choose MindMitra?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We understand the unique challenges college students face. Our platform is designed 
                specifically for your needs, ensuring accessible, confidential, and effective mental health support.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              <Link to="/auth">
                <Button variant="trust" size="lg" className="mt-6">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-soft">
                <div className="aspect-square bg-gradient-to-br from-primary/20 via-calm/20 to-hope/20 p-8 flex items-center justify-center">
                  <div className="text-center space-y-6">
                    <motion.div
                      className="w-24 h-24 mx-auto rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Heart className="w-12 h-12 text-primary" fill="currentColor" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-foreground">
                      Mental Health First
                    </h3>
                    <p className="text-muted-foreground">
                      Prioritizing student well-being with compassionate, professional care.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient">
        <motion.div
          className="container mx-auto px-4 text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Prioritize Your Mental Health?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Join thousands of students who have found support, community, and healing through our platform. 
              Your journey to better mental health starts here.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button variant="floating" size="xl" className="w-full sm:w-auto">
                  Get Started Today
                  <Heart className="w-5 h-5 ml-2" fill="currentColor" />
                </Button>
              </Link>
              <Link to="/resources">
                <Button variant="ghost" size="xl" className="w-full sm:w-auto text-white border-white/30 hover:bg-white/10">
                  Explore Resources
                  <BookOpen className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Landing;