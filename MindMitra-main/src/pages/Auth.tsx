import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Brain, 
  Eye, 
  EyeOff, 
  Shield, 
  Users, 
  ArrowLeft,
  CheckCircle2,
  UserCheck,
  Stethoscope,
  Settings
} from 'lucide-react';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'student',
  });

  const { login, signup, loginAsGuest } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRoleChange = (value: string) => {
    setFormData(prev => ({ ...prev, role: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password, formData.role);
        toast({
          title: "Welcome back!",
          description: "You've successfully logged in.",
        });
      } else {
        await signup(formData.email, formData.password, formData.name, formData.role);
        toast({
          title: "Account created!",
          description: "Welcome to MindMitra.",
        });
      }
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Authentication Error",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setIsLoading(true);
    try {
      await loginAsGuest();
      toast({
        title: "Guest Access Granted",
        description: "You can now access resources and support.",
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to access guest mode. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const roles = [
    { 
      value: 'student', 
      label: 'Student', 
      icon: Users, 
      description: 'Access support, resources, and peer community' 
    },
    { 
      value: 'counselor', 
      label: 'Counselor', 
      icon: Stethoscope, 
      description: 'Provide professional mental health support' 
    },
    { 
      value: 'admin', 
      label: 'Administrator', 
      icon: Settings, 
      description: 'Manage platform and monitor wellness metrics' 
    },
  ];

  const benefits = [
    'Confidential and stigma-free support',
    '24/7 AI-powered mental health assistance',
    'Professional counseling sessions',
    'Anonymous peer support community',
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="p-4">
        <Link to="/" className="inline-flex items-center space-x-2 text-primary hover:opacity-80 transition-opacity">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center p-4">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Side - Benefits */}
          <motion.div
            className="space-y-8 lg:pr-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start space-x-2 mb-4">
                <motion.div
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-trust"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Brain className="w-6 h-6 text-white" fill="currentColor" />
                </motion.div>
                <span className="text-2xl font-bold text-gradient-primary">MindMitra</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Your Mental Health Journey Starts Here
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Join thousands of students who have found support, community, and healing through our platform.
              </p>
            </div>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="bg-muted/50 rounded-xl p-6 border border-border/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center space-x-3 mb-3">
                <Shield className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Privacy & Security</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                All conversations are encrypted and confidential. We follow HIPAA guidelines to protect your privacy.
              </p>
            </motion.div>

            <div className="text-center lg:text-left text-sm text-muted-foreground">
              <p>🌱 <strong>1000+</strong> students supported</p>
              <p>⭐ <strong>4.9/5</strong> average rating</p>
              <p>🔒 <strong>HIPAA</strong> compliant platform</p>
            </div>
          </motion.div>

          {/* Right Side - Auth Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="w-full max-w-md mx-auto shadow-soft border-border/50">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </CardTitle>
                <CardDescription>
                  {isLogin 
                    ? 'Sign in to continue your mental wellness journey'
                    : 'Join our supportive community today'
                  }
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <Tabs value={isLogin ? 'login' : 'signup'} onValueChange={(value) => setIsLogin(value === 'login')}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  </TabsList>

                  <TabsContent value="login" className="space-y-4 mt-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email or College ID</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your.email@college.edu"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            className="pr-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={isLoading}
                        variant="default"
                      >
                        {isLoading ? 'Signing In...' : 'Sign In'}
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="signup" className="space-y-4 mt-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <Input
                          id="signup-email"
                          name="email"
                          type="email"
                          placeholder="your.email@college.edu"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <div className="relative">
                          <Input
                            id="signup-password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Create a strong password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            className="pr-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="role">I am a...</Label>
                        <Select value={formData.role} onValueChange={handleRoleChange}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {roles.map((role) => (
                              <SelectItem key={role.value} value={role.value}>
                                <div className="flex items-center space-x-2">
                                  <role.icon className="w-4 h-4" />
                                  <span>{role.label}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                          {roles.find(r => r.value === formData.role)?.description}
                        </p>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={isLoading}
                        variant="default"
                      >
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>

                {/* Guest Access */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or</span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleGuestLogin}
                  disabled={isLoading}
                >
                  <UserCheck className="w-4 h-4 mr-2" />
                  Continue as Guest
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Guest access provides limited features - resources only. 
                  {' '}
                  <span className="text-primary">Sign up for full access.</span>
                </p>
              </CardContent>
            </Card>

            <p className="text-center text-sm text-muted-foreground mt-6">
              <strong>Social Proof:</strong> Join thousands of students prioritizing their well-being.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Auth;