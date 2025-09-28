import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  MessageCircle, 
  Calendar, 
  BookOpen, 
  Users, 
  Heart, 
  ArrowRight,
  Bell,
  TrendingUp,
  Star,
  ChevronRight,
  Smile,
  Frown,
  Meh
} from 'lucide-react';
import { moodCheckOptions } from '@/data/mockData';
import wellnessBackground from '@/assets/wellness-bg.jpg';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [weeklyProgress, setWeeklyProgress] = useState(68);

  const handleMoodSubmit = (moodValue: number) => {
    setSelectedMood(moodValue);
    const moodOption = moodCheckOptions.find(m => m.value === moodValue);
    
    toast({
      title: "Mood logged successfully",
      description: `Thanks for sharing that you're feeling ${moodOption?.label.toLowerCase()}. Your well-being matters.`,
    });

    // Mock API call - replace with Supabase
    // await logMoodEntry(user.id, moodValue);
  };

  const quickAccessCards = [
    {
      title: 'Chat with AI Assistant',
      description: '24/7 mental health support and guidance',
      icon: MessageCircle,
      link: '/chat',
      color: 'trust',
      stats: 'Available now',
    },
    {
      title: 'Book Counselor Session',
      description: 'Schedule with qualified professionals',
      icon: Calendar,
      link: '/booking',
      color: 'calm',
      stats: '3 slots today',
      restricted: user?.role !== 'student',
    },
    {
      title: 'Explore Wellness Resources',
      description: 'Guided content and self-help materials',
      icon: BookOpen,
      link: '/resources',
      color: 'hope',
      stats: '50+ resources',
    },
    {
      title: 'Peer Support Forum',
      description: 'Connect with fellow students anonymously',
      icon: Users,
      link: '/forum',
      color: 'primary',
      stats: '12 new posts',
    },
  ];

  const recentActivities = [
    { action: 'Completed breathing exercise', time: '2 hours ago', type: 'wellness' },
    { action: 'Posted in anxiety support forum', time: '1 day ago', type: 'community' },
    { action: 'Watched mindfulness video', time: '2 days ago', type: 'learning' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-12 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${wellnessBackground})` }}
        />
        <div className="absolute inset-0 calm-gradient opacity-80" />
        
        <motion.div
          className="relative z-10 container mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-4xl">
            <div className="flex items-center space-x-3 mb-4">
              <motion.div
                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-6 h-6 text-primary" fill="currentColor" />
              </motion.div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  Welcome back, {user?.name}! 👋
                </h1>
                <p className="text-lg text-muted-foreground mt-1">
                  How are you feeling today? Your mental wellness journey continues here.
                </p>
              </div>
            </div>

            {user?.role && (
              <Badge variant="outline" className="mb-4">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Account
                {user.isAnonymous && ' • Anonymous'}
              </Badge>
            )}
          </div>
        </motion.div>
      </section>

      <motion.div
        className="container mx-auto px-4 pb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Quick Access Cards */}
            <motion.div variants={cardVariants}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Quick Access</h2>
                <Button variant="ghost" size="sm">
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickAccessCards.map((card) => (
                  <motion.div
                    key={card.title}
                    whileHover={{ y: -2, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className={`hover-lift border-border/50 hover:border-${card.color}/30 transition-all duration-300 ${card.restricted ? 'opacity-60' : ''}`}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className={`p-3 rounded-xl bg-${card.color}/10 text-${card.color}`}>
                            <card.icon className="w-6 h-6" />
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {card.stats}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <h3 className="font-semibold text-foreground">{card.title}</h3>
                          <p className="text-sm text-muted-foreground">{card.description}</p>
                        </div>
                        
                        {card.restricted ? (
                          <Button disabled variant="outline" className="w-full">
                            Not Available for {user?.role}s
                          </Button>
                        ) : (
                          <Link to={card.link}>
                            <Button variant={card.color as any} className="w-full group">
                              Access Now
                              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </Link>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div variants={cardVariants}>
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <span>Recent Activity</span>
                  </CardTitle>
                  <CardDescription>
                    Your mental wellness engagement over the past week
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Weekly Progress</span>
                      <span className="font-medium">{weeklyProgress}%</span>
                    </div>
                    <Progress value={weeklyProgress} className="h-2" />
                  </div>
                  
                  <div className="space-y-3">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {activity.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Mood Check */}
            <motion.div variants={cardVariants}>
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-calm" fill="currentColor" />
                    <span>Daily Mood Check</span>
                  </CardTitle>
                  <CardDescription>
                    How are you feeling right now?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-5 gap-2">
                    {moodCheckOptions.map((mood) => (
                      <motion.button
                        key={mood.value}
                        onClick={() => handleMoodSubmit(mood.value)}
                        className={`p-3 rounded-xl text-center transition-all duration-200 ${
                          selectedMood === mood.value
                            ? 'bg-primary/20 border-2 border-primary'
                            : 'bg-muted/30 hover:bg-muted/50 border-2 border-transparent'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="text-2xl mb-1">{mood.emoji}</div>
                        <div className="text-xs font-medium text-foreground">{mood.label}</div>
                      </motion.button>
                    ))}
                  </div>
                  
                  {selectedMood && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-primary/10 rounded-lg border border-primary/20"
                    >
                      <p className="text-sm text-primary font-medium">
                        Thanks for sharing! Your mood has been logged.
                      </p>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Notifications */}
            <motion.div variants={cardVariants}>
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="w-5 h-5 text-hope" />
                    <span>Notifications</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-success/10 rounded-lg border border-success/20">
                    <div className="flex items-start space-x-2">
                      <Star className="w-4 h-4 text-success mt-0.5" fill="currentColor" />
                      <div>
                        <p className="text-sm font-medium text-success">New Resource Available</p>
                        <p className="text-xs text-muted-foreground">Mindfulness guide for exam stress</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <div className="flex items-start space-x-2">
                      <MessageCircle className="w-4 h-4 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-primary">Forum Reply</p>
                        <p className="text-xs text-muted-foreground">Someone replied to your post</p>
                      </div>
                    </div>
                  </div>
                  
                  <Link to="/notifications">
                    <Button variant="outline" size="sm" className="w-full">
                      View All Notifications
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Crisis Support */}
            <motion.div variants={cardVariants}>
              <Card className="shadow-soft border-destructive/20 bg-destructive/5">
                <CardHeader>
                  <CardTitle className="text-destructive">Emergency Support</CardTitle>
                  <CardDescription>
                    If you need immediate help
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-center">
                    <p className="text-sm text-muted-foreground">
                      Crisis Text Line: Text HOME to 741741
                    </p>
                    <p className="text-sm text-muted-foreground">
                      National Suicide Prevention: 988
                    </p>
                    <Button variant="destructive" className="w-full">
                      Get Immediate Help
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;