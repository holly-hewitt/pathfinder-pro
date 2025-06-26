import React, { useState } from 'react';
import { ChevronRight, TrendingUp, Users, BookOpen, Star, ArrowRight, BarChart3, Target, Lightbulb, Upload, Linkedin, Heart, ThumbsUp, ThumbsDown, Clock, DollarSign, Home, Trophy, Plus, Minus, MessageCircle, Calendar, MapPin, Coffee, Video, Globe, UserCheck, Sparkles, Award, Network, Play, CheckCircle, Circle, Book, Briefcase, UserPlus, GraduationCap } from 'lucide-react';

const PathFinderPro = () => {
  const [currentStep, setCurrentStep] = useState('welcome');
  const [selectedCareerPath, setSelectedCareerPath] = useState(null);
  const [journeyView, setJourneyView] = useState(false);
  const [timelineView, setTimelineView] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [journeyProgress, setJourneyProgress] = useState({});
  const [customTimeline, setCustomTimeline] = useState({});
  const [draggedNode, setDraggedNode] = useState(null);
  const [userProfile, setUserProfile] = useState({
    name: '',
    currentRole: '',
    experience: '',
    careerHistory: [],
    skills: {},
    currentGoals: [''],
    longTermGoals: [''],
    goalTypes: [],
    linkedinConnected: false
  });

  const [assessmentStep, setAssessmentStep] = useState(1);

  // Positive affirmations for different contexts
  const affirmations = {
    welcome: [
      "Your tech journey is unique and valuable",
      "Every expert was once a beginner",
      "You belong in tech",
      "Your perspective matters in this industry",
      "Growth happens outside your comfort zone"
    ],
    assessment: [
      "Self-awareness is the first step to growth",
      "You're investing in your future self",
      "Your experiences have prepared you for this next step",
      "Every skill you've learned is building towards something greater",
      "You're already more capable than you realize"
    ],
    dashboard: [
      "Your career path is uniquely yours",
      "Progress, not perfection",
      "You have what it takes to succeed",
      "Your goals are within reach",
      "Trust your journey"
    ],
    journey: [
      "Every step forward is progress",
      "You're building something amazing",
      "Consistency beats perfection",
      "Your future self will thank you",
      "You're exactly where you need to be"
    ],
    community: [
      "You're not alone in this journey",
      "Your voice adds value to the conversation",
      "Connection amplifies growth",
      "Together we rise",
      "Your story inspires others"
    ]
  };

  // Get personalized affirmation
  const getPersonalizedAffirmation = (context) => {
    const contextAffirmations = affirmations[context] || affirmations.welcome;
    const randomAffirmation = contextAffirmations[Math.floor(Math.random() * contextAffirmations.length)];
    
    if (userProfile.name) {
      return `${userProfile.name}, ${randomAffirmation.toLowerCase()}`;
    }
    return randomAffirmation;
  };

  const allSkills = [
    'JavaScript', 'React', 'Python', 'Node.js', 'AWS', 'Git', 'SQL', 'Java', 
    'Docker', 'Kubernetes', 'TypeScript', 'Vue.js', 'Angular', 'MongoDB', 
    'PostgreSQL', 'Redis', 'GraphQL', 'REST APIs', 'Microservices', 
    'Machine Learning', 'Data Analysis', 'Product Management', 'UI/UX Design',
    'DevOps', 'CI/CD', 'Terraform', 'Azure', 'GCP', 'Agile', 'Scrum',
    'Leadership', 'Project Management', 'Technical Writing', 'System Design'
  ];

  const goalTypes = [
    { id: 'salary', label: 'High Earning Potential', icon: DollarSign },
    { id: 'worklife', label: 'Work-Life Balance', icon: Home },
    { id: 'growth', label: 'Rapid Career Growth', icon: TrendingUp },
    { id: 'impact', label: 'Making a Difference', icon: Heart },
    { id: 'leadership', label: 'Leading Teams', icon: Users },
    { id: 'innovation', label: 'Cutting-Edge Technology', icon: Lightbulb },
    { id: 'stability', label: 'Job Security', icon: Target },
    { id: 'recognition', label: 'Industry Recognition', icon: Trophy }
  ];

  const addCareerEntry = () => {
    setUserProfile({
      ...userProfile, 
      careerHistory: [...userProfile.careerHistory, { 
        role: '', 
        company: '', 
        duration: '', 
        achievements: '', 
        liked: '', 
        disliked: '',
        satisfaction: 5,
        learning: 5,
        worklife: 5,
        growth: 5
      }]
    });
  };

  const updateCareerEntry = (index, field, value) => {
    const newHistory = [...userProfile.careerHistory];
    newHistory[index][field] = value;
    setUserProfile({...userProfile, careerHistory: newHistory});
  };

  const updateSkill = (skill, field, value) => {
    setUserProfile({
      ...userProfile,
      skills: {
        ...userProfile.skills,
        [skill]: {
          ...userProfile.skills[skill],
          [field]: value
        }
      }
    });
  };

  const toggleGoalType = (goalId) => {
    const newGoalTypes = userProfile.goalTypes.includes(goalId)
      ? userProfile.goalTypes.filter(id => id !== goalId)
      : [...userProfile.goalTypes, goalId];
    setUserProfile({...userProfile, goalTypes: newGoalTypes});
  };

  const addGoal = (type) => {
    setUserProfile({
      ...userProfile,
      [type]: [...userProfile[type], '']
    });
  };

  const updateGoal = (type, index, value) => {
    const newGoals = [...userProfile[type]];
    newGoals[index] = value;
    setUserProfile({...userProfile, [type]: newGoals});
  };

  const removeGoal = (type, index) => {
    const newGoals = userProfile[type].filter((_, i) => i !== index);
    setUserProfile({...userProfile, [type]: newGoals});
  };

  const simulateLinkedInImport = () => {
    setUserProfile({
      ...userProfile,
      linkedinConnected: true,
      currentRole: 'Frontend Developer',
      experience: '2-4',
      careerHistory: [
        { role: 'Junior Developer', company: 'Tech Startup Ltd', duration: '2022-2024', achievements: 'Built responsive web applications, collaborated in agile team', liked: 'Great team collaboration and learning opportunities', disliked: 'Limited mentorship and unclear career progression', satisfaction: 7, learning: 8, worklife: 6, growth: 5 },
        { role: 'Intern', company: 'Digital Agency', duration: '2021-2022', achievements: 'Assisted with website development, learned modern frameworks', liked: 'Exposure to different technologies and client work', disliked: 'Repetitive tasks and minimal responsibility', satisfaction: 6, learning: 7, worklife: 8, growth: 4 }
      ]
    });
  };

  // Phase 2: Progress tracking and assessment integration functions
  const updateNodeStatus = (nodeId, status) => {
    setJourneyProgress(prev => ({
      ...prev,
      [nodeId]: {
        ...prev[nodeId],
        status: status,
        updatedAt: new Date().toISOString(),
        progress: status === 'completed' ? 100 : status === 'in-progress' ? 50 : 0
      }
    }));
  };

  const personalizeJourneyBasedOnAssessment = (journey) => {
    if (!journey || !userProfile.skills) return journey;
    
    return {
      ...journey,
      nodes: journey.nodes.map(node => {
        let personalizedNode = { ...node };
        
        // Check if user has relevant skills
        const relevantSkills = Object.keys(userProfile.skills).filter(skill => 
          node.title.toLowerCase().includes(skill.toLowerCase()) ||
          node.resources.some(resource => resource.toLowerCase().includes(skill.toLowerCase()))
        );
        
        if (relevantSkills.length > 0) {
          const userSkill = userProfile.skills[relevantSkills[0]];
          
          // Adjust based on user's skill level
          if (userSkill?.level === 'expert') {
            personalizedNode.status = 'completed';
            personalizedNode.priority = 'low';
            personalizedNode.timeInvestment = Math.max(parseInt(personalizedNode.timeInvestment) * 0.5, 5) + 'h';
            personalizedNode.recommended = false;
          } else if (userSkill?.level === 'want') {
            personalizedNode.priority = 'high';
            personalizedNode.recommended = true;
          } else if (userSkill?.level === 'some' || userSkill?.level === 'rusty') {
            personalizedNode.timeInvestment = Math.max(parseInt(personalizedNode.timeInvestment) * 0.7, 5) + 'h';
            personalizedNode.recommended = true;
          }
        }
        
        // Adjust based on user's goals
        if (userProfile.goalTypes.includes('growth') && node.type === 'milestone') {
          personalizedNode.priority = 'high';
        }
        if (userProfile.goalTypes.includes('leadership') && node.title.toLowerCase().includes('lead')) {
          personalizedNode.priority = 'high';
          personalizedNode.recommended = true;
        }
        
        return personalizedNode;
      })
    };
  };

  const simulateExternalIntegration = (nodeId, action) => {
    // Mock external platform integration
    const integrations = {
      'course-completed': () => ({
        platform: 'Coursera',
        message: 'Course completion detected!',
        progress: 100
      }),
      'github-activity': () => ({
        platform: 'GitHub',
        message: 'New repository activity detected!',
        progress: 25
      }),
      'linkedin-connection': () => ({
        platform: 'LinkedIn',
        message: 'New professional connection made!',
        progress: 15
      }),
      'event-attended': () => ({
        platform: 'Eventbrite',
        message: 'Event attendance confirmed!',
        progress: 20
      })
    };
    
    const result = integrations[action] ? integrations[action]() : null;
    if (result) {
      // Update node progress
      setJourneyProgress(prev => ({
        ...prev,
        [nodeId]: {
          ...prev[nodeId],
          progress: Math.min((prev[nodeId]?.progress || 0) + result.progress, 100),
          lastUpdate: result,
          updatedAt: new Date().toISOString()
        }
      }));
    }
    return result;
  };

  const calculateJourneyProgress = (journey) => {
    if (!journey) return { completed: 0, inProgress: 0, total: journey?.nodes.length || 0 };
    
    const completed = journey.nodes.filter(node => 
      journeyProgress[node.id]?.status === 'completed' || node.status === 'completed'
    ).length;
    
    const inProgress = journey.nodes.filter(node => 
      journeyProgress[node.id]?.status === 'in-progress' || node.status === 'in-progress'
    ).length;
    
    return {
      completed,
      inProgress,
      total: journey.nodes.length,
      percentage: Math.round((completed / journey.nodes.length) * 100)
    };
  };

  // Phase 3: Timeline drag-and-drop functionality
  const handleDragStart = (e, node) => {
    setDraggedNode(node);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.outerHTML);
    e.currentTarget.style.opacity = '0.5';
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = '1';
    setDraggedNode(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetMonth) => {
    e.preventDefault();
    if (draggedNode) {
      const newCustomTimeline = { ...customTimeline };
      if (!newCustomTimeline[selectedCareerPath?.title]) {
        newCustomTimeline[selectedCareerPath?.title] = {};
      }
      
      // Update the node's month in custom timeline
      newCustomTimeline[selectedCareerPath?.title][draggedNode.id] = {
        ...draggedNode,
        month: targetMonth,
        customPlacement: true
      };
      
      setCustomTimeline(newCustomTimeline);
      setDraggedNode(null);
    }
  };

  const getEffectiveNodeMonth = (node) => {
    const customNode = customTimeline[selectedCareerPath?.title]?.[node.id];
    return customNode ? customNode.month : node.month;
  };

  const careerPaths = [
    {
      title: "Senior Software Engineer",
      growth: "+23%",
      timeframe: "18-24 months",
      salary: "£60k-90k",
      confidence: 85,
      skillsNeeded: ["System Design", "Leadership", "Advanced React"],
      trending: true
    },
    {
      title: "Engineering Manager",
      growth: "+31%",
      timeframe: "2-3 years",
      salary: "£80k-120k",
      confidence: 72,
      skillsNeeded: ["Team Leadership", "Project Management", "Performance Management"],
      trending: true
    },
    {
      title: "Product Manager",
      growth: "+19%",
      timeframe: "1-2 years",
      salary: "£65k-95k",
      confidence: 68,
      skillsNeeded: ["Product Strategy", "Data Analysis", "User Research"],
      trending: false
    },
    {
      title: "Technical Lead",
      growth: "+27%",
      timeframe: "12-18 months",
      salary: "£70k-110k",
      confidence: 78,
      skillsNeeded: ["Architecture", "Mentoring", "Technical Strategy"],
      trending: true
    }
  ];

  const marketInsights = [
    { skill: "AI/ML", demand: 94, growth: "+45%" },
    { skill: "Cloud Architecture", demand: 87, growth: "+38%" },
    { skill: "DevOps", demand: 82, growth: "+29%" },
    { skill: "React/Frontend", demand: 76, growth: "+22%" }
  ];

  // Journey Data for Each Career Path
  const journeyData = {
    "Senior Software Engineer": {
      title: "Senior Software Engineer",
      totalMonths: 20,
      description: "Evolve from a mid-level developer to a senior engineer with deep technical expertise and leadership skills",
      nodes: [
        { id: "advanced-react", type: "skill", title: "Master Advanced React Patterns", month: 2, timeInvestment: "40h", status: "not-started", priority: "high", resources: ["Advanced React Course", "Build Component Library"] },
        { id: "testing-mastery", type: "skill", title: "Testing Strategies & TDD", month: 2, timeInvestment: "30h", status: "not-started", priority: "medium", resources: ["Jest & Testing Library", "TDD Workshop"] },
        { id: "system-design", type: "skill", title: "System Design Fundamentals", month: 5, timeInvestment: "60h", status: "not-started", priority: "high", resources: ["System Design Course", "Practice System Design"] },
        { id: "microservices", type: "skill", title: "Microservices Architecture", month: 7, timeInvestment: "45h", status: "not-started", priority: "medium", resources: ["Microservices Patterns Book", "Docker & Kubernetes"] },
        { id: "code-reviews", type: "skill", title: "Effective Code Review Leadership", month: 9, timeInvestment: "20h", status: "not-started", priority: "medium", resources: ["Code Review Best Practices", "Mentoring Guidelines"] },
        { id: "mentoring", type: "experience", title: "Junior Developer Mentoring", month: 11, timeInvestment: "30h", status: "not-started", priority: "high", resources: ["Find Mentee", "Mentoring Program"] },
        { id: "tech-talks", type: "achievement", title: "Give Technical Presentations", month: 14, timeInvestment: "25h", status: "not-started", priority: "medium", resources: ["Speaking Workshop", "Tech Conference CFP"] },
        { id: "open-source", type: "project", title: "Lead Open Source Contribution", month: 15, timeInvestment: "50h", status: "not-started", priority: "medium", resources: ["GitHub Projects", "Open Source Guide"] },
        { id: "senior-network", type: "networking", title: "Connect with Senior Engineers", month: 17, timeInvestment: "15h", status: "not-started", priority: "high", resources: ["LinkedIn Outreach", "Tech Meetups"] },
        { id: "interview-prep", type: "milestone", title: "Senior Role Interview Preparation", month: 19, timeInvestment: "30h", status: "not-started", priority: "high", resources: ["System Design Practice", "Leadership Examples"] },
        { id: "role-applications", type: "milestone", title: "Apply for Senior Positions", month: 20, timeInvestment: "25h", status: "not-started", priority: "high", resources: ["Resume Update", "Portfolio Review"] }
      ]
    },
    "Engineering Manager": {
      title: "Engineering Manager",
      totalMonths: 30,
      description: "Transition from individual contributor to engineering leader managing teams and technical strategy",
      nodes: [
        { id: "leadership-basics", type: "course", title: "Engineering Leadership Fundamentals", month: 3, timeInvestment: "35h", status: "not-started", priority: "high", resources: ["Leadership Course", "Management Books"] },
        { id: "team-leading", type: "experience", title: "Lead Small Team/Project", month: 5, timeInvestment: "ongoing", status: "not-started", priority: "high", resources: ["Volunteer for Team Lead", "Project Management"] },
        { id: "1on1-skills", type: "skill", title: "Effective 1-on-1 Meetings", month: 8, timeInvestment: "20h", status: "not-started", priority: "high", resources: ["1-on-1 Framework", "Feedback Training"] },
        { id: "performance-mgmt", type: "course", title: "Performance Management Training", month: 10, timeInvestment: "40h", status: "not-started", priority: "high", resources: ["HR Training", "Performance Review System"] },
        { id: "project-mgmt", type: "certification", title: "Project Management Certification", month: 15, timeInvestment: "60h", status: "not-started", priority: "medium", resources: ["PMP Course", "Agile Certification"] },
        { id: "budget-planning", type: "skill", title: "Technical Budget & Planning", month: 17, timeInvestment: "30h", status: "not-started", priority: "medium", resources: ["Finance for Managers", "Budget Planning"] },
        { id: "hiring-skills", type: "skill", title: "Technical Interviewing & Hiring", month: 20, timeInvestment: "25h", status: "not-started", priority: "high", resources: ["Interviewer Training", "Hiring Best Practices"] },
        { id: "team-culture", type: "project", title: "Build High-Performing Team Culture", month: 22, timeInvestment: "ongoing", status: "not-started", priority: "high", resources: ["Team Building", "Culture Framework"] },
        { id: "mgmt-network", type: "networking", title: "Connect with Engineering Managers", month: 26, timeInvestment: "20h", status: "not-started", priority: "medium", resources: ["Manager Meetups", "Leadership Groups"] },
        { id: "mgmt-applications", type: "milestone", title: "Apply for Management Roles", month: 29, timeInvestment: "30h", status: "not-started", priority: "high", resources: ["Management Resume", "Leadership Portfolio"] }
      ]
    },
    "Product Manager": {
      title: "Product Manager", 
      totalMonths: 18,
      description: "Transition into product management with user research, data analysis, and strategic thinking skills",
      nodes: [
        { id: "product-strategy", type: "course", title: "Product Strategy & Vision", month: 2, timeInvestment: "45h", status: "not-started", priority: "high", resources: ["Product Management Course", "Strategy Frameworks"] },
        { id: "user-research", type: "skill", title: "User Research Methods", month: 3, timeInvestment: "35h", status: "not-started", priority: "high", resources: ["UX Research Course", "User Interview Practice"] },
        { id: "data-analysis", type: "skill", title: "Product Analytics & Data Analysis", month: 6, timeInvestment: "50h", status: "not-started", priority: "high", resources: ["Analytics Tools", "Data Science Basics"] },
        { id: "a-b-testing", type: "skill", title: "A/B Testing & Experimentation", month: 7, timeInvestment: "30h", status: "not-started", priority: "medium", resources: ["Experimentation Framework", "Statistical Analysis"] },
        { id: "roadmap-planning", type: "skill", title: "Product Roadmap Planning", month: 10, timeInvestment: "25h", status: "not-started", priority: "high", resources: ["Roadmap Tools", "Prioritization Methods"] },
        { id: "stakeholder-mgmt", type: "skill", title: "Stakeholder Management", month: 11, timeInvestment: "20h", status: "not-started", priority: "high", resources: ["Communication Training", "Influence Techniques"] },
        { id: "product-portfolio", type: "project", title: "Build Product Management Portfolio", month: 14, timeInvestment: "40h", status: "not-started", priority: "high", resources: ["Case Studies", "Product Launches"] },
        { id: "pm-network", type: "networking", title: "Connect with Product Managers", month: 16, timeInvestment: "15h", status: "not-started", priority: "medium", resources: ["PM Communities", "Product Events"] },
        { id: "pm-applications", type: "milestone", title: "Apply for PM Roles", month: 17, timeInvestment: "25h", status: "not-started", priority: "high", resources: ["PM Resume", "Interview Prep"] }
      ]
    },
    "Technical Lead": {
      title: "Technical Lead",
      totalMonths: 15,
      description: "Become a technical leader driving architecture decisions and mentoring other developers",
      nodes: [
        { id: "software-architecture", type: "skill", title: "Software Architecture Patterns", month: 2, timeInvestment: "50h", status: "not-started", priority: "high", resources: ["Architecture Course", "Design Patterns"] },
        { id: "cloud-architecture", type: "skill", title: "Cloud Architecture Design", month: 3, timeInvestment: "45h", status: "not-started", priority: "high", resources: ["AWS/Azure Training", "Cloud Patterns"] },
        { id: "technical-strategy", type: "skill", title: "Technical Strategy & Planning", month: 6, timeInvestment: "40h", status: "not-started", priority: "high", resources: ["Tech Strategy Course", "Architecture Decisions"] },
        { id: "mentoring-developers", type: "experience", title: "Mentor Junior/Mid Developers", month: 7, timeInvestment: "ongoing", status: "not-started", priority: "high", resources: ["Mentoring Program", "Teaching Skills"] },
        { id: "tech-documentation", type: "skill", title: "Technical Documentation & Communication", month: 10, timeInvestment: "25h", status: "not-started", priority: "medium", resources: ["Documentation Best Practices", "Technical Writing"] },
        { id: "cross-team-collab", type: "skill", title: "Cross-Team Collaboration", month: 11, timeInvestment: "30h", status: "not-started", priority: "high", resources: ["Collaboration Tools", "Stakeholder Management"] },
        { id: "lead-portfolio", type: "project", title: "Lead Major Technical Initiative", month: 13, timeInvestment: "ongoing", status: "not-started", priority: "high", resources: ["Architecture Proposal", "Technical Leadership"] },
        { id: "lead-applications", type: "milestone", title: "Apply for Tech Lead Roles", month: 14, timeInvestment: "20h", status: "not-started", priority: "high", resources: ["Technical Resume", "Leadership Examples"] }
      ]
    }
  };

  // Community data
  const communityGroups = [
    {
      id: 1,
      name: "Women in AI/ML",
      members: 1247,
      description: "Connect with women building the future of artificial intelligence",
      category: "Technology",
      isJoined: true,
      trending: true,
      lastActivity: "2 hours ago"
    },
    {
      id: 2,
      name: "Career Changers Support",
      members: 892,
      description: "Support group for women transitioning into tech careers",
      category: "Career Development",
      isJoined: false,
      trending: true,
      lastActivity: "4 hours ago"
    },
    {
      id: 3,
      name: "Working Mothers in Tech",
      members: 634,
      description: "Balancing family and tech careers with flexible networking",
      category: "Work-Life Balance",
      isJoined: true,
      trending: false,
      lastActivity: "1 day ago"
    },
    {
      id: 4,
      name: "Frontend to Fullstack Journey",
      members: 456,
      description: "Frontend developers expanding to backend technologies",
      category: "Skill Development",
      isJoined: false,
      trending: false,
      lastActivity: "6 hours ago"
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Women in Tech Leadership Panel",
      date: "2025-07-02",
      time: "18:00",
      type: "virtual",
      location: "Online",
      attendees: 234,
      category: "Leadership"
    },
    {
      id: 2,
      title: "AI/ML Study Group Meetup",
      date: "2025-06-28",
      time: "19:00",
      type: "local",
      location: "London Tech Hub",
      attendees: 45,
      category: "Learning"
    },
    {
      id: 3,
      title: "Career Transition Workshop",
      date: "2025-06-30",
      time: "17:30",
      type: "virtual",
      location: "Online",
      attendees: 156,
      category: "Career Development"
    }
  ];

  const mentorSpotlight = [
    {
      name: "Sarah Chen",
      role: "Engineering Manager",
      company: "Meta",
      specialty: "Frontend to Management",
      rating: 4.9,
      sessions: 127,
      available: true
    },
    {
      name: "Dr. Priya Patel",
      role: "Senior Data Scientist",
      company: "DeepMind",
      specialty: "Career Transitions",
      rating: 4.8,
      sessions: 89,
      available: true
    },
    {
      name: "Maria Rodriguez",
      role: "VP of Engineering",
      company: "Stripe",
      specialty: "Leadership Development",
      rating: 4.9,
      sessions: 203,
      available: false
    }
  ];

  const careerConnections = [
    {
      name: "Emma Thompson",
      currentRole: "Frontend Developer",
      targetRole: "Product Manager",
      progress: 65,
      sharedGoals: ["Product Strategy", "User Research"],
      lastActive: "1 hour ago"
    },
    {
      name: "Aisha Kumar",
      currentRole: "Software Engineer", 
      targetRole: "Data Scientist",
      progress: 40,
      sharedGoals: ["Python", "Machine Learning"],
      lastActive: "3 hours ago"
    },
    {
      name: "Lisa Wang",
      currentRole: "QA Engineer",
      targetRole: "DevOps Engineer",
      progress: 78,
      sharedGoals: ["AWS", "Kubernetes"],
      lastActive: "2 days ago"
    }
  ];

  const successStories = [
    {
      name: "Jennifer Adams",
      transition: "Frontend Dev → Engineering Manager",
      timeframe: "18 months",
      story: "Started leading small projects, took management courses, found an amazing mentor through this community.",
      company: "Spotify",
      likes: 34
    },
    {
      name: "Rachel Kim", 
      transition: "Bootcamp Grad → Senior Developer",
      timeframe: "3 years",
      story: "Consistent learning, contributing to open source, and the support from my study group made all the difference.",
      company: "GitHub",
      likes: 28
    }
  ];

  // Journey Visualization Component
  const renderJourneyVisualization = () => {
    const baseJourney = journeyData[selectedCareerPath?.title];
    if (!baseJourney) return null;

    // Apply personalization based on assessment data
    const journey = personalizeJourneyBasedOnAssessment(baseJourney);
    const progressStats = calculateJourneyProgress(journey);

    const getNodeIcon = (type) => {
      switch (type) {
        case 'skill': return Book;
        case 'course': return GraduationCap;
        case 'experience': return Briefcase;
        case 'networking': return UserPlus;
        case 'project': return Trophy;
        case 'achievement': return Star;
        case 'milestone': return Target;
        default: return Circle;
      }
    };

    const getNodeColor = (type, node) => {
      const baseColors = {
        'skill': 'bg-blue-100 border-blue-500 text-blue-700',
        'course': 'bg-green-100 border-green-500 text-green-700',
        'experience': 'bg-purple-100 border-purple-500 text-purple-700',
        'networking': 'bg-pink-100 border-pink-500 text-pink-700',
        'project': 'bg-yellow-100 border-yellow-500 text-yellow-700',
        'achievement': 'bg-orange-100 border-orange-500 text-orange-700',
        'milestone': 'bg-red-100 border-red-500 text-red-700'
      };
      
      const currentStatus = journeyProgress[node.id]?.status || node.status;
      
      if (currentStatus === 'completed') {
        return 'bg-emerald-100 border-emerald-500 text-emerald-700';
      } else if (currentStatus === 'in-progress') {
        return 'bg-amber-100 border-amber-500 text-amber-700';
      } else if (node.recommended) {
        return 'bg-violet-100 border-violet-500 text-violet-700 ring-2 ring-violet-300';
      }
      
      return baseColors[type] || 'bg-gray-100 border-gray-500 text-gray-700';
    };

    const getStatusIcon = (node) => {
      const currentStatus = journeyProgress[node.id]?.status || node.status;
      switch (currentStatus) {
        case 'completed': return CheckCircle;
        case 'in-progress': return Play;
        default: return Circle;
      }
    };

    const handleNodeClick = (node) => {
      setSelectedNode(node);
    };

    const handleStatusUpdate = (nodeId, newStatus) => {
      updateNodeStatus(nodeId, newStatus);
      // Simulate external integration
      if (newStatus === 'completed') {
        simulateExternalIntegration(nodeId, 'course-completed');
      } else if (newStatus === 'in-progress') {
        simulateExternalIntegration(nodeId, 'github-activity');
      }
    };

    const renderNodeDetailModal = () => {
      if (!selectedNode) return null;
      
      const nodeProgress = journeyProgress[selectedNode.id] || {};
      const currentStatus = nodeProgress.status || selectedNode.status;
      
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">{selectedNode.title}</h3>
                <button 
                  onClick={() => setSelectedNode(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-500">Status:</span>
                  <div className="flex gap-2">
                    {['not-started', 'in-progress', 'completed'].map(status => (
                      <button
                        key={status}
                        onClick={() => handleStatusUpdate(selectedNode.id, status)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          currentStatus === status 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {status.replace('-', ' ')}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Month:</span>
                    <p className="text-lg font-semibold">{selectedNode.month}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Time Investment:</span>
                    <p className="text-lg font-semibold">{selectedNode.timeInvestment}</p>
                  </div>
                </div>
                
                {selectedNode.recommended && (
                  <div className="bg-violet-50 border border-violet-200 rounded-lg p-3">
                    <p className="text-sm text-violet-800 font-medium">⭐ Recommended for you based on your assessment!</p>
                  </div>
                )}
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Resources & Next Steps:</h4>
                  <div className="space-y-2">
                    {selectedNode.resources.map((resource, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">{resource}</span>
                        <button 
                          onClick={() => simulateExternalIntegration(selectedNode.id, 'course-completed')}
                          className="text-xs bg-purple-600 text-white px-2 py-1 rounded hover:bg-purple-700"
                        >
                          Start
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                {nodeProgress.lastUpdate && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-sm text-green-800">
                      <strong>{nodeProgress.lastUpdate.platform}:</strong> {nodeProgress.lastUpdate.message}
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                      Progress: +{nodeProgress.lastUpdate.progress}%
                    </p>
                  </div>
                )}
                
                <div className="flex gap-2 pt-4 border-t">
                  <button 
                    onClick={() => simulateExternalIntegration(selectedNode.id, 'linkedin-connection')}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
                  >
                    Find Connections
                  </button>
                  <button 
                    onClick={() => simulateExternalIntegration(selectedNode.id, 'event-attended')}
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm"
                  >
                    Join Community
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <button 
                onClick={() => setJourneyView(false)}
                className="flex items-center text-purple-600 hover:text-purple-700 mb-4"
              >
                <ArrowRight className="w-4 h-4 mr-2 transform rotate-180" />
                Back to Dashboard
              </button>
              
              {/* Journey Affirmation */}
              <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-3 rounded-lg mb-4 text-center">
                <p className="text-sm font-medium">
                  🌟 {getPersonalizedAffirmation('journey')} 🌟
                </p>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{journey.title} Journey</h2>
              <p className="text-gray-600 mb-4">{journey.description}</p>
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <span>📅 {journey.totalMonths} months timeline</span>
                <span>📊 {journey.nodes.length} milestones</span>
                <span>⏱️ ~{journey.nodes.reduce((total, node) => total + parseInt(node.timeInvestment), 0)}h total investment</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setTimelineView(!timelineView)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  timelineView 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Calendar className="w-4 h-4 mr-2" />
                {timelineView ? 'Grid View' : 'Timeline View'}
              </button>
            </div>
          </div>
        </div>

        {/* Timeline Visualization */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Interactive Journey Map</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="flex items-center text-xs">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                <span>Skills</span>
              </div>
              <div className="flex items-center text-xs">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                <span>Courses</span>
              </div>
              <div className="flex items-center text-xs">
                <div className="w-3 h-3 rounded-full bg-purple-500 mr-1"></div>
                <span>Experience</span>
              </div>
              <div className="flex items-center text-xs">
                <div className="w-3 h-3 rounded-full bg-pink-500 mr-1"></div>
                <span>Networking</span>
              </div>
              <div className="flex items-center text-xs">
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
                <span>Projects</span>
              </div>
              <div className="flex items-center text-xs">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                <span>Milestones</span>
              </div>
            </div>
          </div>

          {/* Timeline or Grid View */}
          {timelineView ? (
            // Timeline View with Drag & Drop
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">✨ Timeline Planning Mode</h4>
                <p className="text-sm text-blue-800">
                  Drag and drop milestones to different months to create your personalized timeline. 
                  This helps you understand different combinations of activities to reach your goal.
                </p>
              </div>

              {/* Timeline Container */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border">
                <div className="grid grid-cols-6 md:grid-cols-12 gap-2 mb-6">
                  {Array.from({ length: journey.totalMonths }, (_, i) => i + 1).map(month => {
                    const monthNodes = journey.nodes.filter(node => getEffectiveNodeMonth(node) === month);
                    
                    return (
                      <div
                        key={month}
                        className="min-h-[200px] border-2 border-dashed border-gray-300 rounded-lg p-2 bg-white/50 hover:border-purple-400 transition-colors"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, month)}
                      >
                        <div className="text-center mb-2">
                          <span className="text-xs font-bold text-gray-700 bg-white px-2 py-1 rounded-full">
                            Month {month}
                          </span>
                        </div>
                        
                        <div className="space-y-2">
                          {monthNodes.map(node => {
                            const NodeIcon = getNodeIcon(node.type);
                            const nodeColors = getNodeColor(node.type, node);
                            const currentStatus = journeyProgress[node.id]?.status || node.status;
                            
                            return (
                              <div
                                key={node.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, node)}
                                onDragEnd={handleDragEnd}
                                className={`${nodeColors} border-2 rounded-lg p-2 cursor-move hover:shadow-lg transition-all text-xs`}
                                onClick={() => handleNodeClick(node)}
                              >
                                <div className="flex items-center mb-1">
                                  <NodeIcon className="w-3 h-3 mr-1" />
                                  {node.priority === 'high' && (
                                    <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
                                  )}
                                  {node.recommended && (
                                    <span className="text-violet-600">⭐</span>
                                  )}
                                </div>
                                <h5 className="font-semibold text-xs leading-tight mb-1">
                                  {node.title}
                                </h5>
                                <div className="text-xs opacity-75">
                                  {node.timeInvestment}
                                </div>
                                {customTimeline[selectedCareerPath?.title]?.[node.id] && (
                                  <div className="mt-1 text-xs text-purple-600 font-medium">
                                    📍 Custom
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        
                        {monthNodes.length === 0 && (
                          <div className="text-center text-gray-400 text-xs mt-8">
                            Drop items here
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Timeline Instructions */}
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h5 className="font-semibold text-gray-900 mb-2">How to use Timeline Planning:</h5>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                    <div>
                      <h6 className="font-medium mb-1">🎯 Strategic Planning</h6>
                      <p>Experiment with different combinations to find the optimal path for your schedule and goals.</p>
                    </div>
                    <div>
                      <h6 className="font-medium mb-1">📅 Timeline Flexibility</h6>
                      <p>See how moving activities affects your overall journey timeline and workload distribution.</p>
                    </div>
                    <div>
                      <h6 className="font-medium mb-1">⚡ Priority Focus</h6>
                      <p>Red dots indicate high-priority items. Stars (⭐) show personalized recommendations.</p>
                    </div>
                    <div>
                      <h6 className="font-medium mb-1">🔄 Easy Adjustment</h6>
                      <p>Click on any milestone to see details or drag to reschedule your learning path.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Grid View
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {journey.nodes.map((node, index) => {
                const NodeIcon = getNodeIcon(node.type);
                const StatusIcon = getStatusIcon(node);
                const nodeColors = getNodeColor(node.type, node);
                const currentStatus = journeyProgress[node.id]?.status || node.status;
                const nodeProgressData = journeyProgress[node.id] || {};
                
                return (
                  <div 
                    key={node.id} 
                    className={`border-2 rounded-lg p-4 cursor-pointer hover:shadow-md transition-all ${nodeColors}`}
                    onClick={() => handleNodeClick(node)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <NodeIcon className="w-5 h-5 mr-2" />
                        <span className="text-xs font-medium bg-white px-2 py-1 rounded">
                          Month {getEffectiveNodeMonth(node)}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <StatusIcon className="w-4 h-4 mr-1" />
                        {node.priority === 'high' && (
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">High Priority</span>
                        )}
                        {node.recommended && (
                          <span className="text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded ml-1">⭐ For You</span>
                        )}
                      </div>
                    </div>
                    
                    <h4 className="font-semibold text-sm mb-2">{node.title}</h4>
                    
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span>Time Investment:</span>
                        <span className="font-medium">{node.timeInvestment}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className="font-medium capitalize">{currentStatus.replace('-', ' ')}</span>
                      </div>
                      {nodeProgressData.progress && (
                        <div className="flex justify-between">
                          <span>Progress:</span>
                          <span className="font-medium">{nodeProgressData.progress}%</span>
                        </div>
                      )}
                    </div>
                    
                    {currentStatus !== 'not-started' && (
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-purple-500 h-1.5 rounded-full transition-all duration-300" 
                            style={{width: `${nodeProgressData.progress || 0}%`}}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-3 pt-3 border-t border-current border-opacity-20">
                      <p className="text-xs font-medium mb-1">Resources:</p>
                      <div className="flex flex-wrap gap-1">
                        {node.resources.slice(0, 2).map((resource, i) => (
                          <span key={i} className="text-xs bg-white bg-opacity-70 px-2 py-1 rounded">
                            {resource}
                          </span>
                        ))}
                        {node.resources.length > 2 && (
                          <span className="text-xs bg-white bg-opacity-70 px-2 py-1 rounded">
                            +{node.resources.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {nodeProgressData.lastUpdate && (
                      <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-xs">
                        <p className="text-green-800 font-medium">
                          {nodeProgressData.lastUpdate.platform}: {nodeProgressData.lastUpdate.message}
                        </p>
                      </div>
                    )}
                    
                    {customTimeline[selectedCareerPath?.title]?.[node.id] && (
                      <div className="mt-2 text-center">
                        <span className="text-xs text-purple-600 font-medium">📍 Custom Timeline</span>
                      </div>
                    )}
                    
                    <div className="mt-3 text-center">
                      <span className="text-xs text-gray-500">Click to manage this milestone</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Progress Summary */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-bold text-gray-900 mb-2">Journey Progress</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{progressStats.percentage}%</div>
                <div className="text-gray-600">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{journey.nodes.length}</div>
                <div className="text-gray-600">Total Nodes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{journey.totalMonths}</div>
                <div className="text-gray-600">Months</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {journey.nodes.reduce((total, node) => total + parseInt(node.timeInvestment), 0)}h
                </div>
                <div className="text-gray-600">Time Investment</div>
              </div>
            </div>
          </div>
        </div>

        {/* Node Detail Modal */}
        {renderNodeDetailModal()}
      </div>
    );
  };

  const renderWelcome = () => (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">PathFinder Pro</h1>
        <p className="text-xl text-gray-600 mb-8">Navigate your tech career with data-driven insights and personalized guidance</p>
        
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-xl mb-8">
          <h2 className="text-2xl font-bold mb-4">Empowering Women in Tech</h2>
          <p className="text-lg opacity-90">Get personalized career forecasting, skill gap analysis, and connect with mentors who've walked your path</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <BarChart3 className="w-8 h-8 text-purple-600 mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Career Forecasting</h3>
          <p className="text-gray-600 text-sm">Real-time market data and growth predictions for your career path</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-pink-500">
          <Target className="w-8 h-8 text-pink-600 mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Skill Gap Analysis</h3>
          <p className="text-gray-600 text-sm">Identify exactly what skills you need for your next career move</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <Users className="w-8 h-8 text-blue-600 mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Mentorship Network</h3>
          <p className="text-gray-600 text-sm">Connect with successful women who can guide your journey</p>
        </div>
      </div>

      <div className="text-center">
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => setCurrentStep('assessment')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity flex items-center"
          >
            Start Your Career Assessment
            <ChevronRight className="ml-2 w-5 h-5" />
          </button>
          <button 
            onClick={() => setCurrentStep('community')}
            className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-50 transition-colors flex items-center"
          >
            Explore Community
            <Users className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderAssessment = () => (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Enhanced Career Assessment</h2>
        <p className="text-gray-600">Step {assessmentStep} of 4 - Building your comprehensive career profile</p>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
          <div 
            className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300" 
            style={{width: `${(assessmentStep / 4) * 100}%`}}
          ></div>
        </div>
      </div>

      {/* Positive Affirmation Banner */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 rounded-xl mb-6 text-center">
        <p className="text-lg font-medium">
          ✨ {getPersonalizedAffirmation('assessment')} ✨
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        {assessmentStep === 1 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Profile Import & Basic Info</h3>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">Quick Import Options</h4>
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={simulateLinkedInImport}
                  className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  {userProfile.linkedinConnected ? 'LinkedIn Connected ✓' : 'Import from LinkedIn'}
                </button>
                <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload CV/Resume
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
              <input 
                type="text" 
                placeholder="e.g., Sarah, Maria, Jennifer"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={userProfile.name}
                onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
              />
              <p className="text-xs text-gray-500 mt-1">We'll use this to personalize your experience and provide encouraging affirmations</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Role</label>
              <input 
                type="text" 
                placeholder="e.g., Frontend Developer, Software Engineer"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={userProfile.currentRole}
                onChange={(e) => setUserProfile({...userProfile, currentRole: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
              <select 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={userProfile.experience}
                onChange={(e) => setUserProfile({...userProfile, experience: e.target.value})}
              >
                <option value="">Select experience level</option>
                <option value="0-1">0-1 years (Entry Level)</option>
                <option value="2-4">2-4 years (Junior)</option>
                <option value="5-7">5-7 years (Mid-Level)</option>
                <option value="8+">8+ years (Senior)</option>
              </select>
            </div>
          </div>
        )}

        {assessmentStep === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Career History</h3>
              <button 
                onClick={() => setCurrentStep('welcome')}
                className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Home className="w-4 h-4 mr-1" />
                Back to Home
              </button>
            </div>
            
            {userProfile.careerHistory.map((entry, index) => (
              <div key={index} className="border rounded-lg p-6 bg-gray-50">
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <input 
                    type="text" 
                    placeholder="Job Title"
                    className="p-3 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={entry.role}
                    onChange={(e) => updateCareerEntry(index, 'role', e.target.value)}
                  />
                  <input 
                    type="text" 
                    placeholder="Company Name"
                    className="p-3 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={entry.company}
                    onChange={(e) => updateCareerEntry(index, 'company', e.target.value)}
                  />
                </div>
                
                <div className="mb-4">
                  <input 
                    type="text" 
                    placeholder="Duration (e.g., 2022-2024)"
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={entry.duration}
                    onChange={(e) => updateCareerEntry(index, 'duration', e.target.value)}
                  />
                </div>
                
                <div className="mb-4">
                  <textarea 
                    placeholder="Key achievements and responsibilities"
                    rows={2}
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={entry.achievements}
                    onChange={(e) => updateCareerEntry(index, 'achievements', e.target.value)}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">What you enjoyed most</label>
                    <textarea 
                      placeholder="Aspects of this role that you found fulfilling or exciting"
                      rows={2}
                      className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={entry.liked}
                      onChange={(e) => updateCareerEntry(index, 'liked', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">What you found challenging</label>
                    <textarea 
                      placeholder="Aspects that were difficult or less enjoyable"
                      rows={2}
                      className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={entry.disliked}
                      onChange={(e) => updateCareerEntry(index, 'disliked', e.target.value)}
                    />
                  </div>
                </div>

                <div className="bg-white p-4 rounded border">
                  <h4 className="font-medium text-gray-900 mb-3">Rate your experience (1-10)</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { key: 'satisfaction', label: 'Overall Satisfaction' },
                      { key: 'learning', label: 'Learning Opportunities' },
                      { key: 'worklife', label: 'Work-Life Balance' },
                      { key: 'growth', label: 'Career Growth' }
                    ].map(factor => (
                      <div key={factor.key}>
                        <label className="block text-xs font-medium text-gray-600 mb-1">{factor.label}</label>
                        <select 
                          className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          value={entry[factor.key] || 5}
                          onChange={(e) => updateCareerEntry(index, factor.key, parseInt(e.target.value))}
                        >
                          {[1,2,3,4,5,6,7,8,9,10].map(num => (
                            <option key={num} value={num}>{num}</option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            
            <button 
              onClick={addCareerEntry}
              className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-purple-400 hover:text-purple-600 transition-colors flex items-center justify-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Another Role
            </button>
          </div>
        )}

        {assessmentStep === 3 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Skills Assessment</h3>
              <button 
                onClick={() => setCurrentStep('welcome')}
                className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Home className="w-4 h-4 mr-1" />
                Back to Home
              </button>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">How to use this assessment:</h4>
              <div className="text-sm text-blue-800 space-y-1">
                <p>• <strong>Leave skills blank</strong> if you have no experience with them</p>
                <p>• <strong>❤️ Heart:</strong> Skills you love working with</p>
                <p>• <strong>👍 Thumbs up:</strong> Skills you enjoy using</p>
                <p>• <strong>👎 Thumbs down:</strong> Skills you don't enjoy or want to avoid</p>
              </div>
            </div>
            
            <div className="grid gap-4 max-h-96 overflow-y-auto">
              {allSkills.map(skill => (
                <div key={skill} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-gray-900">{skill}</span>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => updateSkill(skill, 'enjoy', userProfile.skills[skill]?.enjoy === 'love' ? null : 'love')}
                        className={`p-1 rounded ${userProfile.skills[skill]?.enjoy === 'love' ? 'bg-red-100 text-red-600' : 'text-gray-400 hover:text-red-500'}`}
                        title="Love this skill"
                      >
                        <Heart className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => updateSkill(skill, 'enjoy', userProfile.skills[skill]?.enjoy === 'like' ? null : 'like')}
                        className={`p-1 rounded ${userProfile.skills[skill]?.enjoy === 'like' ? 'bg-green-100 text-green-600' : 'text-gray-400 hover:text-green-500'}`}
                        title="Enjoy this skill"
                      >
                        <ThumbsUp className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => updateSkill(skill, 'enjoy', userProfile.skills[skill]?.enjoy === 'dislike' ? null : 'dislike')}
                        className={`p-1 rounded ${userProfile.skills[skill]?.enjoy === 'dislike' ? 'bg-red-100 text-red-600' : 'text-gray-400 hover:text-red-500'}`}
                        title="Don't enjoy this skill"
                      >
                        <ThumbsDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <button 
                      onClick={() => updateSkill(skill, 'level', userProfile.skills[skill]?.level === 'expert' ? null : 'expert')}
                      className={`p-2 rounded text-sm font-medium transition-colors ${
                        userProfile.skills[skill]?.level === 'expert' 
                          ? 'bg-purple-100 border-purple-500 text-purple-700 border' 
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 border'
                      }`}
                    >
                      I use this regularly
                    </button>
                    <button 
                      onClick={() => updateSkill(skill, 'level', userProfile.skills[skill]?.level === 'some' ? null : 'some')}
                      className={`p-2 rounded text-sm font-medium transition-colors ${
                        userProfile.skills[skill]?.level === 'some' 
                          ? 'bg-blue-100 border-blue-500 text-blue-700 border' 
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 border'
                      }`}
                    >
                      I use this occasionally
                    </button>
                    <button 
                      onClick={() => updateSkill(skill, 'level', userProfile.skills[skill]?.level === 'rusty' ? null : 'rusty')}
                      className={`p-2 rounded text-sm font-medium transition-colors ${
                        userProfile.skills[skill]?.level === 'rusty' 
                          ? 'bg-orange-100 border-orange-500 text-orange-700 border' 
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 border'
                      }`}
                    >
                      Used before, but rusty
                    </button>
                    <button 
                      onClick={() => updateSkill(skill, 'level', userProfile.skills[skill]?.level === 'theoretical' ? null : 'theoretical')}
                      className={`p-2 rounded text-sm font-medium transition-colors ${
                        userProfile.skills[skill]?.level === 'theoretical' 
                          ? 'bg-yellow-100 border-yellow-500 text-yellow-700 border' 
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 border'
                      }`}
                    >
                      I've studied this but no hands-on experience
                    </button>
                    <button 
                      onClick={() => updateSkill(skill, 'level', userProfile.skills[skill]?.level === 'want' ? null : 'want')}
                      className={`p-2 rounded text-sm font-medium transition-colors md:col-span-2 ${
                        userProfile.skills[skill]?.level === 'want' 
                          ? 'bg-green-100 border-green-500 text-green-700 border' 
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 border'
                      }`}
                    >
                      I would like to develop this skill
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {assessmentStep === 4 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Goals & Aspirations</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Development Goals (6-12 months)</label>
              <textarea 
                placeholder="What skills do you want to develop or roles do you want to explore in the near term?"
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={userProfile.currentGoals}
                onChange={(e) => setUserProfile({...userProfile, currentGoals: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Long-term Career Vision (2-5 years)</label>
              <textarea 
                placeholder="Describe your dream role, company type, or career achievements you want to reach"
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={userProfile.longTermGoals}
                onChange={(e) => setUserProfile({...userProfile, longTermGoals: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">What matters most to you? (Select all that apply)</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {goalTypes.map(goal => {
                  const Icon = goal.icon;
                  return (
                    <button 
                      key={goal.id}
                      onClick={() => toggleGoalType(goal.id)}
                      className={`p-3 rounded-lg border text-sm font-medium transition-colors flex items-center ${
                        userProfile.goalTypes.includes(goal.id) 
                          ? 'bg-purple-100 border-purple-500 text-purple-700' 
                          : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {goal.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-between">
          <button 
            onClick={() => assessmentStep > 1 ? setAssessmentStep(assessmentStep - 1) : setCurrentStep('welcome')}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Back
          </button>
          
          {assessmentStep < 4 ? (
            <button 
              onClick={() => setAssessmentStep(assessmentStep + 1)}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:opacity-90 flex items-center"
            >
              Next Step
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          ) : (
            <button 
              onClick={() => setCurrentStep('dashboard')}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:opacity-90 flex items-center"
            >
              Generate My Personalized Path
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const renderCommunity = () => (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Community Hub</h2>
            <p className="text-gray-600">Connect, learn, and grow with women in tech worldwide</p>
            
            {/* Community Affirmation */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-lg mt-4 text-center">
              <p className="text-sm font-medium">
                💫 {getPersonalizedAffirmation('community')} 💫
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setCurrentStep('dashboard')}
              className="flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </button>
            <button 
              onClick={() => setCurrentStep('welcome')}
              className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-2xl font-bold text-gray-900">4.2k</p>
              <p className="text-sm text-gray-600">Community Members</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center">
            <Calendar className="w-8 h-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-2xl font-bold text-gray-900">127</p>
              <p className="text-sm text-gray-600">Events This Month</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center">
            <Coffee className="w-8 h-8 text-orange-600" />
            <div className="ml-3">
              <p className="text-2xl font-bold text-gray-900">89</p>
              <p className="text-sm text-gray-600">Mentorship Sessions</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center">
            <Trophy className="w-8 h-8 text-yellow-600" />
            <div className="ml-3">
              <p className="text-2xl font-bold text-gray-900">156</p>
              <p className="text-sm text-gray-600">Success Stories</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* My Groups */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <Users className="w-5 h-5 text-purple-600 mr-2" />
                My Groups
              </h3>
              <div className="flex gap-2">
                <button 
                  onClick={() => setCurrentStep('dashboard')}
                  className="flex items-center px-3 py-1 text-gray-600 hover:text-gray-900 transition-colors text-sm"
                >
                  <Home className="w-4 h-4 mr-1" />
                  Dashboard
                </button>
                <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                  Browse All Groups
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {communityGroups.filter(group => group.isJoined).map(group => (
                <div key={group.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h4 className="font-semibold text-gray-900">{group.name}</h4>
                        {group.trending && (
                          <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            Trending
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{group.description}</p>
                      <div className="flex items-center mt-2 text-xs text-gray-500">
                        <Users className="w-3 h-3 mr-1" />
                        {group.members} members
                        <span className="mx-2">•</span>
                        <Clock className="w-3 h-3 mr-1" />
                        Last activity {group.lastActivity}
                      </div>
                    </div>
                    <button className="ml-4 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium hover:bg-purple-200">
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                Upcoming Events
              </h3>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-xs border border-gray-300 rounded-full hover:bg-gray-50">
                  Local
                </button>
                <button className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                  Virtual
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {upcomingEvents.map(event => (
                <div key={event.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{event.title}</h4>
                      <div className="flex items-center mt-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-1" />
                        {event.date} at {event.time}
                        <span className="mx-2">•</span>
                        {event.type === 'virtual' ? (
                          <><Video className="w-4 h-4 mr-1" /> Virtual</>
                        ) : (
                          <><MapPin className="w-4 h-4 mr-1" /> {event.location}</>
                        )}
                      </div>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <Users className="w-3 h-3 mr-1" />
                        {event.attendees} attending
                      </div>
                    </div>
                    <button className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                      Join
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Career Connections */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Network className="w-5 h-5 text-green-600 mr-2" />
              Career Connections
              <span className="ml-2 text-sm font-normal text-gray-500">People on similar journeys</span>
            </h3>
            
            <div className="space-y-4">
              {careerConnections.map((connection, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {connection.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{connection.name}</h4>
                        <p className="text-sm text-gray-600">
                          {connection.currentRole} → {connection.targetRole}
                        </p>
                        <div className="flex items-center mt-1">
                          <div className="w-20 bg-gray-200 rounded-full h-1.5 mr-2">
                            <div 
                              className="bg-green-500 h-1.5 rounded-full" 
                              style={{width: `${connection.progress}%`}}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500">{connection.progress}% progress</span>
                        </div>
                      </div>
                    </div>
                    <button className="px-3 py-1 border border-purple-300 text-purple-600 rounded-full text-xs font-medium hover:bg-purple-50">
                      Connect
                    </button>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {connection.sharedGoals.map((goal, i) => (
                      <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {goal}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Mentor Spotlight */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Star className="w-5 h-5 text-yellow-500 mr-2" />
              Featured Mentors
            </h3>
            
            <div className="space-y-4">
              {mentorSpotlight.map((mentor, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">{mentor.name}</h4>
                      <p className="text-xs text-gray-600">{mentor.role} at {mentor.company}</p>
                      <p className="text-xs text-purple-600 font-medium">{mentor.specialty}</p>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${mentor.available ? 'bg-green-400' : 'bg-gray-300'}`}></div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center">
                      <Star className="w-3 h-3 text-yellow-400 mr-1" />
                      {mentor.rating} ({mentor.sessions} sessions)
                    </div>
                    {mentor.available && (
                      <button className="text-purple-600 hover:text-purple-700 font-medium">
                        Book
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 text-purple-600 py-2 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors text-sm font-medium">
              Browse All Mentors
            </button>
          </div>

          {/* Success Stories */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Sparkles className="w-5 h-5 text-green-600 mr-2" />
              Women Like Me
            </h3>
            
            <div className="space-y-4">
              {successStories.map((story, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-green-100">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Award className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm">{story.name}</h4>
                      <p className="text-xs text-green-700 font-medium">{story.transition}</p>
                      <p className="text-xs text-gray-600 mt-1">{story.story}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">{story.company} • {story.timeframe}</span>
                        <div className="flex items-center text-xs text-gray-500">
                          <Heart className="w-3 h-3 mr-1" />
                          {story.likes}
                        </div>
                      </div>
                    </div>
                    
                    {/* View Journey Button */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <button className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium">
                        <Play className="w-4 h-4 mr-2" />
                        View Interactive Journey
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                <Coffee className="w-4 h-4 mr-2" />
                Schedule Coffee Chat
              </button>
              <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <MessageCircle className="w-4 h-4 mr-2" />
                Join Discussion
              </button>
              <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Users className="w-4 h-4 mr-2" />
                Start Study Group
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {userProfile.name ? `Welcome back, ${userProfile.name}!` : 'Your Personalized Career Dashboard'}
            </h2>
            <p className="text-gray-600">Based on current market data and women's career progression patterns</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setCurrentStep('community')}
              className="flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
            >
              <Users className="w-4 h-4 mr-2" />
              Community
            </button>
            <button 
              onClick={() => setCurrentStep('welcome')}
              className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
              Recommended Career Paths
            </h3>
            
            <div className="space-y-4">
              {careerPaths.map((path, index) => (
                <div 
                  key={index} 
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => {
                    setSelectedCareerPath(path);
                    setJourneyView(true);
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900 flex items-center">
                        {path.title}
                        {path.trending && <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Trending</span>}
                      </h4>
                      <p className="text-sm text-gray-600">Market growth: {path.growth} | Timeline: {path.timeframe}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-purple-600">{path.salary}</p>
                      <p className="text-sm text-gray-500">Salary range</p>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Confidence Match</span>
                      <span>{path.confidence}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full" 
                        style={{width: `${path.confidence}%`}}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {path.skillsNeeded.map((skill, i) => (
                      <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Community Recommendations */}
                  <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                    <h5 className="font-medium text-purple-900 text-sm mb-2 flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      Community Connections
                    </h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-purple-700">
                          {path.title === "Senior Software Engineer" ? "12 women made this transition" : 
                           path.title === "Engineering Manager" ? "8 women in leadership roles" :
                           path.title === "Product Manager" ? "15 women transitioned from tech" :
                           "6 women in technical leadership"}
                        </span>
                        <button 
                          onClick={() => setCurrentStep('community')}
                          className="text-purple-600 hover:text-purple-700 font-medium text-xs"
                        >
                          Connect
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-purple-700">
                          {path.title === "Senior Software Engineer" ? "3 study groups learning system design" : 
                           path.title === "Engineering Manager" ? "Leadership mentorship program" :
                           path.title === "Product Manager" ? "PM transition support group" :
                           "Technical leadership circle"}
                        </span>
                        <button 
                          onClick={() => setCurrentStep('community')}
                          className="text-purple-600 hover:text-purple-700 font-medium text-xs"
                        >
                          Join
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-purple-700">Available mentors: 
                          {path.title === "Senior Software Engineer" ? " 5" : 
                           path.title === "Engineering Manager" ? " 3" :
                           path.title === "Product Manager" ? " 7" : " 4"}
                        </span>
                        <button 
                          onClick={() => setCurrentStep('community')}
                          className="text-purple-600 hover:text-purple-700 font-medium text-xs"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 text-blue-600 mr-2" />
              Market Insights
            </h3>
            
            <div className="space-y-4">
              {marketInsights.map((insight, index) => (
                <div key={index} className="border-b pb-3 last:border-b-0">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900">{insight.skill}</span>
                    <span className="text-green-600 font-semibold">{insight.growth}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{width: `${insight.demand}%`}}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Demand: {insight.demand}%</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border">
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
              <Lightbulb className="w-5 h-5 text-yellow-500 mr-2" />
              Confidence Builder
            </h3>
            <p className="text-sm text-gray-700 mb-4">
              "Remember: 73% of women in senior tech roles felt unprepared for their current position when they started. You're more ready than you think!"
            </p>
            <button className="w-full bg-white text-purple-600 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Take Confidence Assessment
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
              <Users className="w-5 h-5 text-green-600 mr-2" />
              Mentor Matches
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-semibold">SC</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Sarah Chen</p>
                  <p className="text-xs text-gray-500">Engineering Manager at Meta</p>
                </div>
                <Star className="w-4 h-4 text-yellow-500" />
              </div>
              <button 
                onClick={() => setCurrentStep('community')}
                className="w-full text-purple-600 py-2 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors"
              >
                View All Mentors
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {journeyView ? (
        renderJourneyVisualization()
      ) : (
        <>
          {currentStep === 'welcome' && renderWelcome()}
          {currentStep === 'assessment' && renderAssessment()}
          {currentStep === 'dashboard' && renderDashboard()}
          {currentStep === 'community' && renderCommunity()}
        </>
      )}
    </div>
  );
};

export default PathFinderPro;
