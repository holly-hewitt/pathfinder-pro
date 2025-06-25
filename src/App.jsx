import React, { useState } from 'react';
import { ChevronRight, TrendingUp, Users, BookOpen, Star, ArrowRight, BarChart3, Target, Lightbulb } from 'lucide-react';

const PathFinderPro = () => {
  const [currentStep, setCurrentStep] = useState('welcome');
  const [userProfile, setUserProfile] = useState({
    currentRole: '',
    experience: '',
    skills: [],
    interests: [],
    goals: ''
  });

  const careerPaths = [
    {
      title: "Senior Software Engineer",
      growth: "+23%",
      timeframe: "18-24 months",
      salary: "$120k-160k",
      confidence: 85,
      skillsNeeded: ["System Design", "Leadership", "Advanced React"],
      trending: true
    },
    {
      title: "Engineering Manager",
      growth: "+31%",
      timeframe: "2-3 years",
      salary: "$140k-180k",
      confidence: 72,
      skillsNeeded: ["Team Leadership", "Project Management", "Performance Management"],
      trending: true
    },
    {
      title: "Product Manager",
      growth: "+19%",
      timeframe: "1-2 years",
      salary: "$110k-150k",
      confidence: 68,
      skillsNeeded: ["Product Strategy", "Data Analysis", "User Research"],
      trending: false
    },
    {
      title: "Technical Lead",
      growth: "+27%",
      timeframe: "12-18 months",
      salary: "$130k-170k",
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
        <button 
          onClick={() => setCurrentStep('assessment')}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity flex items-center mx-auto"
        >
          Start Your Career Assessment
          <ChevronRight className="ml-2 w-5 h-5" />
        </button>
      </div>
    </div>
  );

  const renderAssessment = () => (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Career Assessment</h2>
        <p className="text-gray-600">Tell us about your current situation so we can create your personalized pathway</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="space-y-6">
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Top Skills (select up to 5)</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {['JavaScript', 'React', 'Python', 'Node.js', 'AWS', 'Git', 'SQL', 'Java', 'Docker'].map(skill => (
                <button 
                  key={skill}
                  onClick={() => {
                    const newSkills = userProfile.skills.includes(skill) 
                      ? userProfile.skills.filter(s => s !== skill)
                      : userProfile.skills.length < 5 ? [...userProfile.skills, skill] : userProfile.skills;
                    setUserProfile({...userProfile, skills: newSkills});
                  }}
                  className={`p-2 rounded-lg border text-sm font-medium transition-colors ${
                    userProfile.skills.includes(skill) 
                      ? 'bg-purple-100 border-purple-500 text-purple-700' 
                      : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Career Goals</label>
            <textarea 
              placeholder="What do you want to achieve in your tech career?"
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={userProfile.goals}
              onChange={(e) => setUserProfile({...userProfile, goals: e.target.value})}
            />
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <button 
            onClick={() => setCurrentStep('welcome')}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Back
          </button>
          <button 
            onClick={() => setCurrentStep('dashboard')}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:opacity-90 flex items-center"
            disabled={!userProfile.currentRole || !userProfile.experience}
          >
            Generate My Career Path
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Personalized Career Dashboard</h2>
        <p className="text-gray-600">Based on current market data and women's career progression patterns</p>
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
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
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
                  
                  <div className="flex flex-wrap gap-2">
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
              <button className="w-full text-purple-600 py-2 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors">
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
      {currentStep === 'welcome' && renderWelcome()}
      {currentStep === 'assessment' && renderAssessment()}
      {currentStep === 'dashboard' && renderDashboard()}
    </div>
  );
};

export default PathFinderPro;