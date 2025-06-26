import React, { useState } from 'react';
import { 
  ChevronRight, TrendingUp, Users, BookOpen, Star, ArrowRight, BarChart3, Target, 
  Lightbulb, Upload, Linkedin, Heart, ThumbsUp, ThumbsDown, Clock, DollarSign, 
  Home, Trophy, Plus, Minus, MessageCircle, Calendar, MapPin, Coffee, Video, 
  Globe, UserCheck, Sparkles, Award, Network, Play, CheckCircle, Circle, Book, 
  Briefcase, UserPlus, GraduationCap, Send, Brain, Zap 
} from 'lucide-react';

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
  const [confidenceBuilderStep, setConfidenceBuilderStep] = useState('job-selection');
  const [selectedJob, setSelectedJob] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [confidenceScore, setConfidenceScore] = useState(65);
  const [interviewStep, setInterviewStep] = useState(0);
  const [salaryNegotiationStep, setSalaryNegotiationStep] = useState(0);

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

  // Mock job data for confidence builder
  const mockJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp",
      salary: "$130k-160k",
      location: "San Francisco, CA",
      requiredSkills: ["React", "TypeScript", "Node.js", "AWS"],
      niceToHave: ["GraphQL", "Docker", "Leadership"],
      experienceRequired: "3-5 years",
      description: "Join our dynamic team building next-generation web applications..."
    },
    {
      id: 2,
      title: "Full Stack Engineer",
      company: "InnovateLabs",
      salary: "$120k-150k",
      location: "Remote",
      requiredSkills: ["JavaScript", "React", "Python", "PostgreSQL"],
      niceToHave: ["AWS", "Docker", "Agile"],
      experienceRequired: "2-4 years",
      description: "Build scalable applications that impact millions of users..."
    }
  ];

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
    }
  ];

  // Confidence building functions
  const calculateJobMatch = (job) => {
    if (!job) return { score: 0, matchedSkills: [], transferableSkills: [] };
    
    const userSkills = Object.keys(userProfile.skills).filter(skill => 
      userProfile.skills[skill]?.level && userProfile.skills[skill]?.level !== 'want'
    );
    
    const matchedSkills = job.requiredSkills.filter(skill => 
      userSkills.some(userSkill => userSkill.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(userSkill.toLowerCase()))
    );
    
    const transferableSkills = job.niceToHave.filter(skill => 
      userSkills.some(userSkill => userSkill.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(userSkill.toLowerCase()))
    );
    
    const score = Math.round(((matchedSkills.length / job.requiredSkills.length) * 100));
    
    return { score, matchedSkills, transferableSkills };
  };

  const getConfidenceMessage = (score) => {
    if (score >= 80) return "You're an excellent match! You have most of the required skills.";
    if (score >= 60) return "You're a strong candidate! You meet the core requirements.";
    if (score >= 40) return "You're more qualified than you think! Many skills are transferable.";
    return "This role could be a growth opportunity. Focus on your transferable skills!";
  };

  const startConfidenceBuilder = (job) => {
    setSelectedJob(job);
    setCurrentStep('confidence-builder');
    setConfidenceBuilderStep('analysis');
    setChatMessages([]);
    setInterviewStep(0);
    setSalaryNegotiationStep(0);
  };

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

  const simulateLinkedInImport = () => {
    setUserProfile({
      ...userProfile,
      linkedinConnected: true,
      currentRole: 'Frontend Developer',
      experience: '2-4',
      careerHistory: [
        { role: 'Junior Developer', company: 'Tech Startup Ltd', duration: '2022-2024', achievements: 'Built responsive web applications, collaborated in agile team', liked: 'Great team collaboration and learning opportunities', disliked: 'Limited mentorship and unclear career progression', satisfaction: 7, learning: 8, worklife: 6, growth: 5 }
      ]
    });
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

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <Users className="w-5 h-5 text-purple-600 mr-2" />
            Community Groups
          </h3>
        </div>
        
        <div className="space-y-4">
          {communityGroups.map(group => (
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
                  </div>
                </div>
                <button className="ml-4 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium hover:bg-purple-200">
                  {group.isJoined ? 'View' : 'Join'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Calendar className="w-5 h-5 text-blue-600 mr-2" />
          Upcoming Events
        </h3>
        
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
    </div>
  );

  const renderConfidenceBuilder = () => {
    const match = calculateJobMatch(selectedJob);
    
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <button 
            onClick={() => setCurrentStep('dashboard')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
            Back to Dashboard
          </button>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Confidence Builder</h2>
          <p className="text-gray-600">Building confidence for: {selectedJob?.title} at {selectedJob?.company}</p>
          
          <div className="flex items-center mt-4">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300" 
                style={{width: `${confidenceScore}%`}}
              ></div>
            </div>
            <span className="ml-3 text-sm font-semibold text-purple-600">Confidence: {confidenceScore}%</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              Skill Match Analysis
            </h3>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Overall Match</span>
                <span className="text-2xl font-bold text-green-600">{match.score}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-green-500 h-3 rounded-full" 
                  style={{width: `${match.score}%`}}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">{getConfidenceMessage(match.score)}</p>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">✅ Skills You Have</h4>
                <div className="flex flex-wrap gap-2">
                  {match.matchedSkills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">⭐ Bonus Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {match.transferableSkills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-2">💪 Confidence Boosters</h4>
                <ul className="text-sm text-purple-800 space-y-1">
                  <li>• You meet {Math.round((match.matchedSkills.length / selectedJob.requiredSkills.length) * 100)}% of the required skills</li>
                  <li>• Your experience level ({userProfile.experience} years) aligns with their requirements</li>
                  <li>• You have {match.transferableSkills.length} bonus skills that add extra value</li>
                  <li>• Companies often hire for potential, not just current skills</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Job Details</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900">{selectedJob.title}</h4>
                <p className="text-gray-600">{selectedJob.company} • {selectedJob.location}</p>
                <p className="text-lg font-semibold text-purple-600">{selectedJob.salary}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.requiredSkills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Nice to Have</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.niceToHave.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-50 text-blue-800 text-sm rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Experience Required</h4>
                <p className="text-gray-600">{selectedJob.experienceRequired}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDashboard = () => (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {userProfile.name ? `Welcome back, ${userProfile.name}!` : 'Your Personalized Career Dashboard'}
            </h2>
            <p className="text-gray-600">Based on current market data and women's career progression patterns</p>

            <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-3 rounded-lg mt-4 text-center">
              <p className="text-sm font-medium">
                🌟 {getPersonalizedAffirmation('dashboard')} 🌟
              </p>
            </div>
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
              <Brain className="w-5 h-5 text-purple-500 mr-2" />
              🎯 Job Confidence Builder
            </h3>
            <p className="text-sm text-gray-700 mb-4">
              Found a job you love but feeling unsure? Let's build your confidence with skill analysis and interview practice!
            </p>
            
            <div className="space-y-3">
              {mockJobs.map(job => {
                const match = calculateJobMatch(job);
                return (
                  <div key={job.id} className="bg-white p-3 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-sm text-gray-900">{job.title}</h4>
                        <p className="text-xs text-gray-500">{job.company} • {job.salary}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center">
                          <div className="w-8 h-2 bg-gray-200 rounded-full mr-2">
                            <div 
                              className="h-2 bg-green-500 rounded-full" 
                              style={{width: `${Math.max(match.score, 20)}%`}}
                            ></div>
                          </div>
                          <span className="text-xs font-semibold text-green-600">{match.score}%</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => startConfidenceBuilder(job)}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      Build My Confidence
                    </button>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-xs text-yellow-800">
                💡 <strong>Remember:</strong> 73% of women in senior tech roles felt unprepared when they started. You're more ready than you think!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {currentStep === 'welcome' && renderWelcome()}
      {currentStep === 'assessment' && renderAssessment()}
      {currentStep === 'dashboard' && renderDashboard()}
      {currentStep === 'community' && renderCommunity()}
      {currentStep === 'confidence-builder' && renderConfidenceBuilder()}
    </div>
  );
};

export default PathFinderPro;