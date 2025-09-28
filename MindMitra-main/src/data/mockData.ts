// Mock data for the Mindful Campus platform

export const motivationalQuotes = [
  {
    id: 1,
    text: "You are stronger than you think, braver than you feel, and more loved than you know.",
    author: "Mental Health Awareness",
  },
  {
    id: 2,
    text: "It's okay to not be okay. It's not okay to stay that way.",
    author: "Recovery Wisdom",
  },
  {
    id: 3,
    text: "Healing is not about erasing your past, but learning to live with it.",
    author: "Therapy Insights",
  },
  {
    id: 4,
    text: "Your mental health is just as important as your physical health.",
    author: "Wellness Reminder",
  },
  {
    id: 5,
    text: "Progress, not perfection. Every small step counts.",
    author: "Self-Compassion",
  },
];

export const resourceCategories = [
  {
    id: 'anxiety',
    name: 'Anxiety Management',
    description: 'Learn techniques to manage anxiety and stress',
    icon: '🧘',
    color: 'calm',
    resources: [
      {
        id: 1,
        title: 'Breathing Exercises for Anxiety',
        type: 'video',
        duration: '10 mins',
        description: 'Simple breathing techniques to calm your mind',
        thumbnail: '/placeholder-video.jpg',
        url: '#',
      },
      {
        id: 2,
        title: 'Understanding Anxiety Triggers',
        type: 'guide',
        duration: 'Read: 5 mins',
        description: 'Identify and manage your anxiety triggers',
        thumbnail: '/placeholder-guide.jpg',
        url: '#',
      },
    ],
  },
  {
    id: 'depression',
    name: 'Depression Support',
    description: 'Resources for understanding and managing depression',
    icon: '🌱',
    color: 'trust',
    resources: [
      {
        id: 3,
        title: 'Building Daily Routines',
        type: 'guide',
        duration: 'Read: 8 mins',
        description: 'Create structure to support your mental health',
        thumbnail: '/placeholder-guide.jpg',
        url: '#',
      },
      {
        id: 4,
        title: 'Mindfulness for Depression',
        type: 'audio',
        duration: '15 mins',
        description: 'Guided meditation for depressive episodes',
        thumbnail: '/placeholder-audio.jpg',
        url: '#',
      },
    ],
  },
  {
    id: 'stress',
    name: 'Stress Management',
    description: 'Effective strategies for academic and life stress',
    icon: '⚡',
    color: 'hope',
    resources: [
      {
        id: 5,
        title: 'Time Management for Students',
        type: 'video',
        duration: '12 mins',
        description: 'Balance studies and self-care effectively',
        thumbnail: '/placeholder-video.jpg',
        url: '#',
      },
      {
        id: 6,
        title: 'Quick Stress Relief Techniques',
        type: 'guide',
        duration: 'Read: 3 mins',
        description: '5-minute techniques you can use anywhere',
        thumbnail: '/placeholder-guide.jpg',
        url: '#',
      },
    ],
  },
];

export const counselors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialization: 'Anxiety & Depression',
    experience: '8 years',
    avatar: '/placeholder-counselor.jpg',
    rating: 4.9,
    availability: {
      '2024-01-15': ['10:00', '14:00', '16:00'],
      '2024-01-16': ['09:00', '11:00', '15:00'],
      '2024-01-17': ['10:00', '13:00', '17:00'],
    },
    bio: 'Specialized in helping college students navigate anxiety and depression.',
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialization: 'Academic Stress',
    experience: '12 years',
    avatar: '/placeholder-counselor.jpg',
    rating: 4.8,
    availability: {
      '2024-01-15': ['11:00', '15:00'],
      '2024-01-16': ['10:00', '14:00', '16:00'],
      '2024-01-17': ['09:00', '12:00', '15:00'],
    },
    bio: 'Expert in academic pressure and performance anxiety management.',
  },
  {
    id: 3,
    name: 'Dr. Priya Sharma',
    specialization: 'Relationship & Social Issues',
    experience: '6 years',
    avatar: '/placeholder-counselor.jpg',
    rating: 4.9,
    availability: {
      '2024-01-15': ['09:00', '13:00', '17:00'],
      '2024-01-16': ['12:00', '15:00'],
      '2024-01-17': ['10:00', '14:00', '16:00'],
    },
    bio: 'Focuses on social anxiety and relationship challenges in college.',
  },
];

export const forumPosts = [
  {
    id: 1,
    title: 'How do you deal with exam anxiety?',
    content: 'I get really stressed before exams and my mind goes blank. Any tips?',
    author: 'Anonymous Student',
    timestamp: '2 hours ago',
    replies: 8,
    upvotes: 12,
    tags: ['anxiety', 'exams', 'study-tips'],
    category: 'Academic Stress',
  },
  {
    id: 2,
    title: 'Feeling isolated in college',
    content: 'Its hard to make friends and I feel really lonely. How do others cope?',
    author: 'Anonymous Student',
    timestamp: '5 hours ago',
    replies: 15,
    upvotes: 23,
    tags: ['loneliness', 'social', 'friendship'],
    category: 'Social Issues',
  },
  {
    id: 3,
    title: 'Sleep schedule completely messed up',
    content: 'I cant seem to fix my sleep pattern. Staying up all night, tired all day.',
    author: 'Anonymous Student',
    timestamp: '1 day ago',
    replies: 6,
    upvotes: 18,
    tags: ['sleep', 'health', 'routine'],
    category: 'Wellness',
  },
];

export const aiResponses = {
  greeting: "Hello! I'm here to provide you with mental health support and guidance. How are you feeling today?",
  anxiety: {
    mild: "I understand you're feeling anxious. Let's try a simple breathing exercise: Breathe in for 4 counts, hold for 4, breathe out for 6. Would you like me to guide you through this?",
    moderate: "Your anxiety seems significant. Here are some immediate coping strategies: 1) Ground yourself using the 5-4-3-2-1 technique, 2) Practice deep breathing, 3) Challenge negative thoughts. Would you like to explore any of these?",
    severe: "I'm concerned about your current state. While I can offer some immediate support, I strongly recommend booking a session with one of our counselors. In the meantime, please remember that you're not alone. Would you like me to help you book an appointment?",
  },
  depression: {
    mild: "I hear that you're going through a difficult time. It's brave of you to reach out. Some gentle activities that might help: taking a short walk, listening to music, or calling a friend. What feels manageable for you right now?",
    moderate: "Your feelings are valid and you deserve support. Consider: 1) Maintaining a daily routine, 2) Engaging in one small pleasant activity, 3) Connecting with someone you trust. Would you like to talk about any of these?",
    severe: "I'm very concerned about how you're feeling. Please know that these feelings can improve with proper support. I strongly encourage you to speak with a counselor immediately. Would you like me to help you book an urgent appointment?",
  },
  stress: {
    academic: "Academic stress is common among students. Let's break this down: 1) What specific academic challenges are you facing? 2) Have you tried time management techniques? 3) Are you taking care of your basic needs (sleep, food, exercise)?",
    general: "Stress can feel overwhelming, but there are ways to manage it. Quick stress relief: 1) Take 5 deep breaths, 2) Do a quick body scan for tension, 3) List 3 things you're grateful for. Which resonates with you?",
  },
  crisis: "I'm very concerned about what you've shared. Please know that you matter and help is available. If you're having thoughts of self-harm, please contact emergency services immediately or reach out to a crisis helpline. Would you like me to provide crisis resources?",
};

export const analyticsData = {
  userStats: {
    totalUsers: 1247,
    activeUsers: 892,
    newSignups: 156,
    guestUsers: 234,
  },
  stressLevels: [
    { department: 'Engineering', level: 7.2, trend: 'up' },
    { department: 'Medicine', level: 8.1, trend: 'up' },
    { department: 'Arts', level: 5.8, trend: 'down' },
    { department: 'Commerce', level: 6.5, trend: 'stable' },
    { department: 'Science', level: 7.0, trend: 'up' },
  ],
  monthlyData: [
    { month: 'Jan', users: 450, sessions: 1200, resources: 890 },
    { month: 'Feb', users: 520, sessions: 1450, resources: 1020 },
    { month: 'Mar', users: 680, sessions: 1800, resources: 1350 },
    { month: 'Apr', users: 750, sessions: 2100, resources: 1580 },
    { month: 'May', users: 892, sessions: 2450, resources: 1820 },
  ],
  alerts: [
    {
      id: 1,
      type: 'high-stress',
      department: 'Engineering',
      severity: 'high',
      message: 'Stress levels in Engineering department are 25% above average',
      timestamp: '2 hours ago',
    },
    {
      id: 2,
      type: 'crisis',
      severity: 'critical',
      message: '3 crisis intervention cases reported today',
      timestamp: '4 hours ago',
    },
    {
      id: 3,
      type: 'engagement',
      severity: 'medium',
      message: 'Forum activity decreased by 15% this week',
      timestamp: '1 day ago',
    },
  ],
};

export const moodCheckOptions = [
  { value: 1, label: 'Very Low', emoji: '😢', color: 'destructive' },
  { value: 2, label: 'Low', emoji: '😔', color: 'warning' },
  { value: 3, label: 'Neutral', emoji: '😐', color: 'muted' },
  { value: 4, label: 'Good', emoji: '😊', color: 'calm' },
  { value: 5, label: 'Excellent', emoji: '😁', color: 'success' },
];