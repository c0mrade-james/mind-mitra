import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'react-calendar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Star, 
  Shield, 
  Video, 
  MapPin,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { counselors } from '@/data/mockData';
import 'react-calendar/dist/Calendar.css';

const Booking: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedCounselor, setSelectedCounselor] = useState<string>('');
  const [sessionType, setSessionType] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [additionalNotes, setAdditionalNotes] = useState<string>('');
  const [step, setStep] = useState<number>(1);
  
  const { toast } = useToast();

  const selectedCounselorData = counselors.find(c => c.id.toString() === selectedCounselor);
  const availableTimes = selectedDate && selectedCounselorData 
    ? selectedCounselorData.availability[selectedDate.toISOString().split('T')[0]] || []
    : [];

  const handleDateChange = (date: Date | Date[] | null) => {
    if (date && !Array.isArray(date)) {
      setSelectedDate(date);
      setSelectedTime(''); // Reset time when date changes
    }
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !selectedCounselor || !sessionType || !reason) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to proceed with booking.",
        variant: "destructive",
      });
      return;
    }

    // Mock booking submission - replace with Supabase
    toast({
      title: "Session Booked Successfully!",
      description: `Your session with ${selectedCounselorData?.name} is confirmed for ${selectedDate.toLocaleDateString()} at ${selectedTime}.`,
    });

    // Reset form
    setStep(1);
    setSelectedDate(null);
    setSelectedTime('');
    setSelectedCounselor('');
    setSessionType('');
    setReason('');
    setAdditionalNotes('');
  };

  const isDateAvailable = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return selectedCounselorData?.availability[dateString]?.length > 0;
  };

  const reasons = [
    'Anxiety and Stress Management',
    'Depression and Mood Issues',
    'Academic Pressure',
    'Relationship Issues',
    'Social Anxiety',
    'Sleep Problems',
    'General Mental Wellness',
    'Crisis Support',
    'Other'
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
      {/* Header */}
      <section className="py-12 calm-gradient">
        <motion.div
          className="container mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <motion.div
              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <CalendarIcon className="w-6 h-6 text-primary" />
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Book a Counseling Session
            </h1>
          </div>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Schedule a confidential session with one of our qualified mental health professionals. 
            All sessions are private and HIPAA compliant.
          </p>

          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>100% Confidential</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Licensed Professionals</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Flexible Scheduling</span>
            </div>
          </div>
        </motion.div>
      </section>

      <motion.div
        className="container mx-auto px-4 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Steps Progress */}
          <motion.div variants={cardVariants} className="lg:col-span-3">
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  {[1, 2, 3].map((stepNumber) => (
                    <div key={stepNumber} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step >= stepNumber 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {stepNumber}
                      </div>
                      <span className={`ml-2 text-sm ${
                        step >= stepNumber 
                          ? 'text-foreground font-medium' 
                          : 'text-muted-foreground'
                      }`}>
                        {stepNumber === 1 ? 'Choose Counselor' : stepNumber === 2 ? 'Select DateTime' : 'Session Details'}
                      </span>
                      {stepNumber < 3 && (
                        <div className={`w-16 h-0.5 mx-4 ${
                          step > stepNumber ? 'bg-primary' : 'bg-muted'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Step 1: Choose Counselor */}
            {step === 1 && (
              <motion.div variants={cardVariants}>
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle>Choose Your Counselor</CardTitle>
                    <CardDescription>
                      Select a mental health professional who specializes in your area of concern
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {counselors.map((counselor) => (
                      <motion.div
                        key={counselor.id}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedCounselor === counselor.id.toString()
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/30'
                        }`}
                        onClick={() => setSelectedCounselor(counselor.id.toString())}
                      >
                        <div className="flex items-start space-x-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-trust flex items-center justify-center">
                            <User className="w-8 h-8 text-white" />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-foreground">{counselor.name}</h3>
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                                <span className="text-sm font-medium">{counselor.rating}</span>
                              </div>
                            </div>
                            
                            <Badge variant="outline" className="mb-2">
                              {counselor.specialization}
                            </Badge>
                            
                            <p className="text-sm text-muted-foreground mb-2">
                              {counselor.experience} of experience
                            </p>
                            
                            <p className="text-sm text-foreground">
                              {counselor.bio}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    <Button 
                      onClick={() => setStep(2)} 
                      disabled={!selectedCounselor}
                      className="w-full"
                    >
                      Continue to Date & Time
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 2: Select Date and Time */}
            {step === 2 && (
              <motion.div variants={cardVariants}>
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle>Select Date & Time</CardTitle>
                    <CardDescription>
                      Choose an available slot with {selectedCounselorData?.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3">Select Date</h4>
                        <Calendar
                          onChange={handleDateChange}
                          value={selectedDate}
                          minDate={new Date()}
                          tileDisabled={({ date }) => !isDateAvailable(date)}
                          className="w-full rounded-lg border border-border p-3"
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                          Only dates with available slots are selectable
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-3">Available Times</h4>
                        {selectedDate ? (
                          availableTimes.length > 0 ? (
                            <div className="grid grid-cols-2 gap-2">
                              {availableTimes.map((time) => (
                                <Button
                                  key={time}
                                  variant={selectedTime === time ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => setSelectedTime(time)}
                                  className="justify-center"
                                >
                                  {time}
                                </Button>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-8 text-muted-foreground">
                              <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                              <p>No available slots for this date</p>
                            </div>
                          )
                        ) : (
                          <div className="text-center py-8 text-muted-foreground">
                            <CalendarIcon className="w-8 h-8 mx-auto mb-2" />
                            <p>Please select a date first</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex space-x-4">
                      <Button variant="outline" onClick={() => setStep(1)}>
                        Back
                      </Button>
                      <Button 
                        onClick={() => setStep(3)} 
                        disabled={!selectedDate || !selectedTime}
                        className="flex-1"
                      >
                        Continue to Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 3: Session Details */}
            {step === 3 && (
              <motion.div variants={cardVariants}>
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle>Session Details</CardTitle>
                    <CardDescription>
                      Provide information about your session preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Session Type</label>
                        <Select value={sessionType} onValueChange={setSessionType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose session type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="online">
                              <div className="flex items-center space-x-2">
                                <Video className="w-4 h-4" />
                                <span>Online Video Call</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="in-person">
                              <div className="flex items-center space-x-2">
                                <MapPin className="w-4 h-4" />
                                <span>In-Person (Campus)</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">Reason for Session</label>
                        <Select value={reason} onValueChange={setReason}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select reason" />
                          </SelectTrigger>
                          <SelectContent>
                            {reasons.map((r) => (
                              <SelectItem key={r} value={r}>{r}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Additional Notes (Optional)
                      </label>
                      <Textarea
                        placeholder="Share any additional information that might help your counselor prepare for the session..."
                        value={additionalNotes}
                        onChange={(e) => setAdditionalNotes(e.target.value)}
                        rows={4}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        This information is confidential and will only be shared with your counselor.
                      </p>
                    </div>
                    
                    <div className="flex space-x-4">
                      <Button variant="outline" onClick={() => setStep(2)}>
                        Back
                      </Button>
                      <Button 
                        onClick={handleBooking} 
                        disabled={!sessionType || !reason}
                        className="flex-1"
                      >
                        Confirm Booking
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Booking Summary */}
            <motion.div variants={cardVariants}>
              <Card className="shadow-soft sticky top-4">
                <CardHeader>
                  <CardTitle className="text-lg">Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Counselor:</span>
                      <span className="text-sm font-medium">
                        {selectedCounselorData?.name || 'Not selected'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Date:</span>
                      <span className="text-sm font-medium">
                        {selectedDate ? selectedDate.toLocaleDateString() : 'Not selected'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Time:</span>
                      <span className="text-sm font-medium">
                        {selectedTime || 'Not selected'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Type:</span>
                      <span className="text-sm font-medium">
                        {sessionType || 'Not selected'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Duration:</span>
                      <span className="text-sm font-medium">50 minutes</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between font-medium">
                      <span>Cost:</span>
                      <span className="text-success">Free for Students</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Privacy Notice */}
            <motion.div variants={cardVariants}>
              <Card className="shadow-soft border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-primary text-lg">Privacy & Confidentiality</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>
                    Your counseling sessions are completely confidential and protected by HIPAA laws.
                  </p>
                  <p>
                    Information is only shared in cases where there's imminent danger to yourself or others.
                  </p>
                  <p>
                    All communication and session data is encrypted and secure.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Booking;