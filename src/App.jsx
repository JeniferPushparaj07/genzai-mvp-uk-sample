import React, { useState, useEffect } from 'react';
import { Sparkles, GraduationCap, Briefcase, Smile, Check, ArrowRight, ArrowLeft, Settings, X, Search, FileText, BriefcaseMedical } from 'lucide-react';

// Main App component
const App = () => {
  // State to manage the current view of the application
  const [currentView, setCurrentView] = useState('home'); // 'home', 'test', 'student', 'professional', 'hobbyist'
  // State to store the selected mode from the home screen
  const [selectedMode, setSelectedMode] = useState('');
  // State to track the user's answers in the psychometric test
  const [testAnswers, setTestAnswers] = useState({});
  // State for managing the psychometric test questions and progression
  const [currentTestQuestion, setCurrentTestQuestion] = useState(0);

  // State for accessibility settings, initialized from localStorage if available
  const [accessibility, setAccessibility] = useState(() => {
    try {
      const storedSettings = localStorage.getItem('genzai_accessibility');
      return storedSettings ? JSON.parse(storedSettings) : {
        darkMode: false,
        highContrast: false,
        dyslexiaFriendly: false,
        reduceMotion: false,
      };
    } catch (e) {
      console.error("Could not load accessibility settings from localStorage", e);
      return {
        darkMode: false,
        highContrast: false,
        dyslexiaFriendly: false,
        reduceMotion: false,
      };
    }
  });

  // State to control the visibility of the accessibility settings menu
  const [showAccessibilityMenu, setShowAccessibilityMenu] = useState(false);

  // useEffect to apply accessibility settings and save them to localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (accessibility.darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    if (accessibility.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    if (accessibility.dyslexiaFriendly) {
      root.classList.add('dyslexia-friendly');
    } else {
      root.classList.remove('dyslexia-friendly');
    }

    if (accessibility.reduceMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }

    // Save settings to localStorage
    try {
      localStorage.setItem('genzai_accessibility', JSON.stringify(accessibility));
    } catch (e) {
      console.error("Could not save accessibility settings to localStorage", e);
    }
  }, [accessibility]);

  // Data for the psychometric test
  const psychometricQuestions = [
    {
      id: 1,
      text: 'Do you prefer learning through visual aids (diagrams, videos) or reading text?',
      options: ['Visual Aids', 'Text'],
      type: 'learning_style',
    },
    {
      id: 2,
      text: 'When faced with a complex problem, do you prefer a step-by-step guide or hands-on experimentation?',
      options: ['Step-by-step guide', 'Hands-on experimentation'],
      type: 'problem_solving',
    },
    {
      id: 3,
      text: 'Which best describes your motivation for learning?',
      options: ['To master a new skill', 'To solve a specific, real-world problem', 'To satisfy personal curiosity'],
      type: 'motivation',
    },
  ];

  // Data for Student section
  const studentData = {
    classes: ['KS3 (Years 7–9)', 'GCSE (Years 10–11)', 'A-Level (Years 12–13)'],
    subjects: ['Maths', 'Biology', 'Chemistry', 'Physics', 'Computer Science', 'Geography', 'History', 'English'],
  };

  // Data for professional section
  const professionalData = {
    demandCourses: [
      { id: 'sim_1', title: 'Simulation: Market Analysis', type: 'Simulation' },
      { id: 'hands_on_1', title: 'Hands-on Project: Project Management', type: 'Hands-on Project' },
      { id: 'sim_2', title: 'Simulation: Financial Forecasting', type: 'Simulation' },
      { id: 'hands_on_2', title: 'Hands-on Project: UI/UX Design', type: 'Hands-on Project' },
    ],
  };

  const hobbyistData = {
    microLessons: ['How to brew coffee', 'Basic guitar chords', 'The art of origami'],
    chatPrompts: ['Ask me anything about hobby projects!', 'What\'s a new skill you want to learn?'],
  };

  // Function to navigate between views
  const navigateTo = (view, mode = '') => {
    setSelectedMode(mode);
    setCurrentView(view);
  };

  // Function to handle psychometric test answers
  const handleAnswer = (questionId, option) => {
    setTestAnswers(prev => ({
      ...prev,
      [questionId]: option,
    }));
  };

  // Function to handle the end of the psychometric test
  const handleTestFinish = () => {
    // Process answers and navigate to the selected mode's main page
    // For this demo, we just navigate to the selected mode
    navigateTo(selectedMode);
  };

  // Component to render the Home view
  const HomeView = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="text-center w-full max-w-4xl">
        {/*
          * User Note: The company logo is loaded from the public directory.
          */}
        <img 
          src="/logo.png" 
          alt="GenZ.AI Logo" 
          className="h-16 w-16 mx-auto animate-pulse" 
        />
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-2 font-inter">GenZ.AI</h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 font-inter">Moving minds to an immersive world</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-16 w-full max-w-4xl">
        <ModeCard
          icon={<GraduationCap className="h-10 w-10 text-blue-600" />}
          title="Student"
          description="Get personalized learning with smart explanations and exercises."
          onClick={() => navigateTo('test', 'student')}
        />
        <ModeCard
          icon={<Briefcase className="h-10 w-10 text-green-600" />}
          title="Professional"
          description="Tailor your CV and find jobs tailored to your skills."
          onClick={() => navigateTo('test', 'professional')}
        />
        <ModeCard
          icon={<Smile className="h-10 w-10 text-yellow-600" />}
          title="Hobbyist"
          description="Explore your passions with free chat and micro-lessons."
          onClick={() => navigateTo('test', 'hobbyist')}
        />
      </div>
    </div>
  );

  // Reusable component for the mode cards on the home screen
  const ModeCard = ({ icon, title, description, onClick }) => (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-center mb-4">
        {icon}
      </div>
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white text-center mb-2">{title}</h2>
      <p className="text-gray-500 dark:text-gray-400 text-center text-sm">{description}</p>
    </div>
  );

  // Component for the psychometric test
  const PsychometricTestView = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-2xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">Quick Psychometric Test</h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-6 sm:mb-8 text-sm sm:text-base">This will help us personalize your experience.</p>

        {psychometricQuestions[currentTestQuestion] && (
          <div className="mb-6 sm:mb-8 animate-fade-in">
            <p className="text-base sm:text-lg text-gray-800 dark:text-gray-200 font-semibold mb-4">{psychometricQuestions[currentTestQuestion].text}</p>
            <div className="flex flex-col space-y-3 sm:space-y-4">
              {psychometricQuestions[currentTestQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(psychometricQuestions[currentTestQuestion].id, option)}
                  className={`flex items-center justify-between p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 font-medium text-sm sm:text-base
                    ${testAnswers[psychometricQuestions[currentTestQuestion].id] === option
                      ? 'bg-purple-100 text-purple-700 border-purple-500 dark:bg-purple-900 dark:text-purple-300'
                      : 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600'
                    }`}
                >
                  <span>{option}</span>
                  {testAnswers[psychometricQuestions[currentTestQuestion].id] === option && <Check className="h-5 w-5" />}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mt-6 sm:mt-8">
          <button
            onClick={() => setCurrentTestQuestion(prev => prev - 1)}
            disabled={currentTestQuestion === 0}
            className="flex items-center px-4 py-2 rounded-xl text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-sm"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Previous
          </button>
          {currentTestQuestion < psychometricQuestions.length - 1 ? (
            <button
              onClick={() => setCurrentTestQuestion(prev => prev + 1)}
              disabled={!testAnswers[psychometricQuestions[currentTestQuestion]?.id]}
              className="flex items-center px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shadow-md text-sm sm:text-base"
            >
              Next
              <ArrowRight className="h-5 w-5 ml-2" />
            </button>
          ) : (
            <button
              onClick={handleTestFinish}
              disabled={!testAnswers[psychometricQuestions[currentTestQuestion]?.id]}
              className="flex items-center px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shadow-md text-sm sm:text-base"
            >
              Finish Test
              <Check className="h-5 w-5 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  // Component to render the Student mode view
  const StudentView = () => {
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [specificTopic, setSpecificTopic] = useState('');
    const [explanation, setExplanation] = useState('');

    // Function to generate a placeholder explanation
    const getPlaceholderExplanation = (subject, learningStyle) => {
      const intro = `This is a demo explanation for **${subject}** based on your learning profile.`;
      const body = `We've identified that you are a **${learningStyle === 'Visual Aids' ? 'visual learner' : 'text-based learner'}**.
        Therefore, this explanation would be tailored to include relevant diagrams,
        analogies, or detailed text-based summaries to match your style.`;
      const closing = `For this MVP, this explanation shows how our personalization engine would work.
        In a full version, we would generate a comprehensive and interactive explanation here.`;
      return `${intro}\n\n${body}\n\n${closing}`;
    };

    // New function to generate a personalized explanation for a specific topic
    const getPersonalizedTopicExplanation = (subject, topic, learningStyle) => {
      const intro = `Here is a personalized explanation for **${topic}** in **${subject}**, designed for you.`;
      let body;
      if (learningStyle === 'Visual Aids') {
        body = `As a visual learner, we would use diagrams and step-by-step illustrations to explain this concept. Imagine a flow chart showing the process of photosynthesis, or an animated diagram of a chemical reaction. This text is a placeholder for that visual experience.`;
      } else {
        body = `As a text-based learner, we would provide a detailed, structured explanation with clear headings and a summary. We would break down **${topic}** into its core principles and provide a concise, easy-to-read summary to reinforce your understanding.`;
      }
      const closing = `This demo demonstrates how GenZ.AI personalizes content based on your profile. A real version would provide a rich, interactive explanation.`;
      return `${intro}\n\n${body}\n\n${closing}`;
    };

    // Function to handle topic selection and show placeholder explanation
    const handleSubjectSelection = (subject) => {
      setSelectedSubject(subject);
      setExplanation(''); // Clear previous explanation
      setSpecificTopic(''); // Clear specific topic input
    };
    
    // Function to handle the specific topic request
    const handleTopicRequest = () => {
        if (selectedSubject && specificTopic) {
            const userLearningStyle = testAnswers[1];
            const personalizedExplanation = getPersonalizedTopicExplanation(selectedSubject, specificTopic, userLearningStyle);
            setExplanation(personalizedExplanation);
        }
    };

    return (
      <div className="flex flex-col items-center min-h-screen p-4 sm:p-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-4xl">
          {/* Back button */}
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center mb-6 px-4 py-2 rounded-xl text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 text-sm"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Go Back
          </button>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">Student – Class & Subject</h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-6 sm:mb-8 text-sm sm:text-base">
            Select a class and a subject to see how our personalized learning works.
          </p>

          {/* Class Selection */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">Class</h3>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-4">
              The class levels are aligned with the UK academic system (England, Wales, and Northern Ireland). For example, **GCSE covers Years 10-11 for students aged 14-16**, marking the end of compulsory secondary education.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4">
              {studentData.classes.map((classLevel) => (
                <button
                  key={classLevel}
                  onClick={() => setSelectedClass(classLevel)}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-colors duration-200
                    ${selectedClass === classLevel
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-800 hover:bg-blue-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-blue-900'}`
                  }
                >
                  {classLevel}
                </button>
              ))}
            </div>
          </div>

          {/* Subject Selection */}
          {selectedClass && (
            <div className="mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4">Subject</h3>
              <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4">
                {studentData.subjects.map((subject) => (
                  <button
                    key={subject}
                    onClick={() => handleSubjectSelection(subject)}
                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-colors duration-200
                      ${selectedSubject === subject
                        ? 'bg-green-600 text-white shadow-lg'
                        : 'bg-gray-200 text-gray-800 hover:bg-green-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-green-900'}`
                    }
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Specific Topic Input */}
          {selectedSubject && (
            <div className="mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4">Specific Topic</h3>
                <div className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="text"
                        value={specificTopic}
                        onChange={(e) => setSpecificTopic(e.target.value)}
                        placeholder={`e.g., The Cell Cycle in ${selectedSubject}`}
                        className="flex-grow p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                    />
                    <button
                        onClick={handleTopicRequest}
                        disabled={!specificTopic}
                        className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Get Explanation
                    </button>
                </div>
            </div>
          )}

          {/* Explanation Section */}
          {explanation && (
            <div className="bg-gray-100 dark:bg-gray-700 p-4 sm:p-6 rounded-2xl mb-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4">Explanation</h3>
              <div
                className="prose dark:prose-invert text-gray-800 dark:text-gray-200 leading-relaxed text-sm sm:text-base"
                dangerouslySetInnerHTML={{ __html: explanation.replace(/\n/g, '<br />') }}
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  // Component to render the Professional mode view
  const ProfessionalView = () => {
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [courseExplanation, setCourseExplanation] = useState('');

    const getCourseExplanation = (course, problemSolvingStyle) => {
      const courseTitle = course.title;
      const intro = `This is a demo explanation for **${courseTitle}** tailored to your problem-solving style.`;
      const body = `We've identified that you prefer a **${problemSolvingStyle === 'Step-by-step guide' ? 'structured, step-by-step approach' : 'hands-on, experimental approach'}**.
        Therefore, this course would be designed with that in mind, providing clear steps or interactive projects to help you learn.`;
      const closing = `For this MVP, this explanation shows how our personalization would work.
        In a full version, we would provide the full interactive course material here.`;
      return `${intro}\n\n${body}\n\n${closing}`;
    };

    const handleCourseSelection = (course) => {
      setSelectedCourse(course);
      const userProblemSolvingStyle = testAnswers[2];
      setCourseExplanation(getCourseExplanation(course, userProblemSolvingStyle));
    };

    return (
      <div className="flex flex-col items-center min-h-screen p-4 sm:p-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-4xl">
          {/* Back button */}
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center mb-6 px-4 py-2 rounded-xl text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 text-sm"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Go Back
          </button>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">Professional Mode</h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-6 sm:mb-8 text-sm sm:text-base">
            Enhance your career with personalized tools and resources.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {/* CV Tailoring Section */}
            <div className="bg-gray-100 dark:bg-gray-700 p-4 sm:p-6 rounded-2xl">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center"><FileText className="mr-2 h-6 w-6" /> CV → ATS Tailoring</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Paste your CV and a Job Description to get started.</p>
              <textarea
                className="w-full h-32 p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none mb-4 text-sm"
                placeholder="Paste your CV here..."
              ></textarea>
              <textarea
                className="w-full h-32 p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none text-sm"
                placeholder="Paste the Job Description here..."
              ></textarea>
              <button className="mt-4 w-full px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors duration-200 text-sm">
                Tailor
              </button>
            </div>

            {/* Job Search Demo */}
            <div className="bg-gray-100 dark:bg-gray-700 p-4 sm:p-6 rounded-2xl">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center"><Search className="mr-2 h-6 w-6" /> Job Search (demo)</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Try a search to see demo results. In production, connect to an open API via your backend.</p>
              <input
                type="text"
                className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                placeholder="Search..."
              />
              <button className="mt-4 w-full px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors duration-200 text-sm">
                Search
              </button>
            </div>
          </div>

          {/* Demand Courses Section */}
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center"><BriefcaseMedical className="mr-2 h-6 w-6" /> Demand Courses for Learning</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Select a course to see a personalized explanation based on your learning style.</p>
            <div className="space-y-3 sm:space-y-4">
              {professionalData.demandCourses.map((course) => (
                <button
                  key={course.id}
                  onClick={() => handleCourseSelection(course)}
                  className={`flex items-center p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 font-medium w-full text-left text-sm sm:text-base
                    ${selectedCourse?.id === course.id
                      ? 'bg-purple-100 text-purple-700 border-purple-500 dark:bg-purple-900 dark:text-purple-300'
                      : 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600'
                    }`}
                >
                  {course.title}
                </button>
              ))}
            </div>
            {courseExplanation && (
              <div className="bg-gray-100 dark:bg-gray-700 p-4 sm:p-6 rounded-2xl mt-6 sm:mt-8">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4">Explanation</h3>
                <div
                  className="prose dark:prose-invert text-gray-800 dark:text-gray-200 leading-relaxed text-sm sm:text-base"
                  dangerouslySetInnerHTML={{ __html: courseExplanation.replace(/\n/g, '<br />') }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Component for the Hobbyist mode view
  const HobbyistView = () => (
    <div className="flex flex-col items-center min-h-screen p-4 sm:p-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-4xl">
        {/* Back button */}
        <button
          onClick={() => navigateTo('home')}
          className="flex items-center mb-6 px-4 py-2 rounded-xl text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 text-sm"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Go Back
        </button>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">Hobbyist Mode</h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-6 sm:mb-8 text-sm sm:text-base">
          Explore your interests with free chat and micro-lessons.
        </p>

        {/* Free Chat Section */}
        <div className="bg-gray-100 dark:bg-gray-700 p-4 sm:p-6 rounded-2xl mb-6 sm:mb-8">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4">Free Chat</h3>
          <div className="h-48 overflow-y-auto mb-4 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600">
            {/* Sample chat messages */}
            <div className="flex flex-col space-y-2">
              <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 p-3 rounded-xl self-start max-w-xs text-sm">
                Hi GenZ.AI, I want to learn a new skill!
              </div>
              <div className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 p-3 rounded-xl self-end max-w-xs text-sm">
                That's awesome! What are you thinking of?
              </div>
            </div>
          </div>
          <div className="flex">
            <input
              type="text"
              className="flex-grow p-3 rounded-l-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              placeholder="Start chatting..."
            />
            <button className="px-4 py-2 sm:px-6 sm:py-3 rounded-r-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors duration-200 text-sm">
              Send
            </button>
          </div>
        </div>

        {/* Micro-lessons Section */}
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4">Micro-lessons</h3>
          <div className="space-y-3 sm:space-y-4">
            {hobbyistData.microLessons.map((lesson, index) => (
              <div key={index} className="p-3 sm:p-4 rounded-xl bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 cursor-pointer hover:shadow-md transition-shadow duration-200 text-sm sm:text-base">
                <p className="font-semibold text-gray-900 dark:text-white">{lesson}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Modal component for accessibility settings
  const AccessibilityMenu = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl transform scale-100 transition-transform duration-300">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Accessibility Settings</h3>
          <button onClick={() => setShowAccessibilityMenu(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="space-y-6">
          <AccessibilityToggle
            label="Dark Mode"
            checked={accessibility.darkMode}
            onChange={() => setAccessibility(prev => ({ ...prev, darkMode: !prev.darkMode }))}
          />
          <AccessibilityToggle
            label="High Contrast"
            checked={accessibility.highContrast}
            onChange={() => setAccessibility(prev => ({ ...prev, highContrast: !prev.highContrast }))}
          />
          <AccessibilityToggle
            label="Dyslexia Friendly Font"
            checked={accessibility.dyslexiaFriendly}
            onChange={() => setAccessibility(prev => ({ ...prev, dyslexiaFriendly: !prev.dyslexiaFriendly }))}
          />
          <AccessibilityToggle
            label="Reduce Motion"
            checked={accessibility.reduceMotion}
            onChange={() => setAccessibility(prev => ({ ...prev, reduceMotion: !prev.reduceMotion }))}
          />
        </div>
      </div>
    </div>
  );

  // Reusable toggle switch component for accessibility settings
  const AccessibilityToggle = ({ label, checked, onChange }) => (
    <div className="flex items-center justify-between">
      <span className="text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base">{label}</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" checked={checked} onChange={onChange} className="sr-only peer" />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
      </label>
    </div>
  );

  // Main render logic based on the current view
  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView />;
      case 'test':
        return <PsychometricTestView />;
      case 'student':
        return <StudentView />;
      case 'professional':
        return <ProfessionalView />;
      case 'hobbyist':
        return <HobbyistView />;
      default:
        return <HomeView />;
    }
  };

  return (
    // The main container with conditional classes for accessibility
    <div className="font-sans antialiased min-h-screen relative overflow-hidden">
      <style>{`
        /* Custom CSS for accessibility and animations */
        .high-contrast {
          background-color: white !important;
          color: black !important;
        }
        .high-contrast .dark\\:text-white { color: black !important; }
        .high-contrast .dark\\:bg-gray-900 { background-color: white !important; }
        .high-contrast .dark\\:bg-gray-800 { background-color: white !important; }
        .high-contrast .dark\\:bg-gray-700 { background-color: #f1f1f1 !important; }
        .high-contrast .dark\\:bg-gray-600 { background-color: #e2e2e2 !important; }
        .high-contrast .dark\\:border-gray-700 { border-color: black !important; }
        .high-contrast .dark\\:border-gray-600 { border-color: black !important; }
        .high-contrast .dark\\:text-gray-400 { color: black !important; }
        .high-contrast .dark\\:hover\\:bg-gray-600 { background-color: #e2e2e2 !important; }
        .high-contrast .text-gray-900 { color: black !important; }
        .high-contrast .text-gray-800 { color: black !important; }
        .high-contrast .text-gray-700 { color: black !important; }
        .high-contrast .text-gray-600 { color: black !important; }
        .high-contrast .text-gray-500 { color: black !important; }
        .high-contrast .bg-white { background-color: white !important; }
        .high-contrast .bg-gray-50 { background-color: white !important; }
        .high-contrast .bg-gray-100 { background-color: #f1f1f1 !important; }
        .high-contrast button { border-color: black !important; }
        .high-contrast button.bg-purple-600 { background-color: #555 !important; }
        .high-contrast button.bg-green-600 { background-color: #555 !important; }
        .high-contrast button.bg-blue-600 { background-color: #555 !important; }
        .high-contrast svg { color: #333 !important; }

        .dyslexia-friendly * {
          font-family: 'Open Sans', 'Arial', sans-serif !important;
        }

        .reduce-motion * {
          transition: none !important;
          animation: none !important;
        }

        /* Fade-in animation for psychometric questions */
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fade-in 0.5s ease-out;
        }
      `}</style>

      {/* Accessibility settings button */}
      <div className="fixed top-4 right-4 z-40">
        <button
          onClick={() => setShowAccessibilityMenu(true)}
          className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 shadow-md"
          title="Accessibility Settings"
        >
          <Settings className="h-6 w-6" />
        </button>
      </div>

      {showAccessibilityMenu && <AccessibilityMenu />}

      {renderView()}
    </div>
  );
};

export default App;
