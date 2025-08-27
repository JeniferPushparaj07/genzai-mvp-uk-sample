import React, { useState } from 'react';
import { Leaf, User, Brain, GraduationCap, Briefcase, Sparkles, Sun, Moon } from 'lucide-react';

// The main application component
export default function App() {
  // State to manage the current screen being displayed
  const [screen, setScreen] = useState('home');
  // State to manage the user's progress through the psychometric test
  const [testAnswers, setTestAnswers] = useState({});
  // State to manage the user's current gamified lesson
  const [lessonStage, setLessonStage] = useState(0);
  // State for dark/light mode toggle
  const [isDarkMode, setIsDarkMode] = useState(false);
  // State for the mock answer from the AI model
  const [aiResponse, setAiResponse] = useState('');

  // Psychometric test questions
  const psychometricQuestions = [
    {
      id: 'q1',
      question: 'How do you prefer to learn new concepts?',
      options: ['By watching videos', 'By reading articles', 'By doing hands-on projects'],
    },
    {
      id: 'q2',
      question: 'Which of the following activities do you enjoy most?',
      options: ['Solving puzzles and brain games', 'Listening to stories or podcasts', 'Creating art or visual diagrams'],
    },
    {
      id: 'q3',
      question: 'What motivates you to learn?',
      options: ['Feeling a sense of accomplishment', 'The desire to solve a real-world problem', 'Exploring new ideas and creativity'],
    },
  ];

  // Logic for a mock AI explanation (simulates personalized response)
  const getMockAIExplanation = (subject, learningStyle) => {
    // A simple switch-case to simulate a personalized response based on learning style
    switch (learningStyle) {
      case 'By watching videos':
        return `Let's visualize this! Think of photosynthesis as a tiny plant factory. The leaves are the solar panels, absorbing light. The roots are the pipes, bringing in water. And the carbon dioxide from the air is the raw material. The factory takes all three and produces sugar (food) and oxygen!`;
      case 'By reading articles':
        return `Photosynthesis is the process used by plants, algae, and certain bacteria to convert light energy into chemical energy. This chemical energy is stored in carbohydrate molecules, such as sugars, which are synthesized from carbon dioxide and water. The process is a key component of the global ecosystem, as it produces the oxygen that most life on Earth depends on.`;
      case 'By doing hands-on projects':
        return `Let's make this hands-on! Imagine you are a plant. You need to gather three ingredients: water (from a bottle), sunlight (from a lamp), and carbon dioxide (from a balloon). Your goal is to mix them all together in a "leaf" (a bowl) to create sugar cubes (food) and let out oxygen (another balloon)!`;
      default:
        return `Let's explain the concept of ${subject} in a simple way.`;
    }
  };

  // Handles the psychometric test answer submission
  const handleTestAnswer = (questionId, option) => {
    const newAnswers = { ...testAnswers, [questionId]: option };
    setTestAnswers(newAnswers);
    // Move to the next screen after all questions are answered
    if (Object.keys(newAnswers).length === psychometricQuestions.length) {
      setScreen('result');
    }
  };

  // Handles starting the lesson based on the user's "profile"
  const handleStartLesson = (subject) => {
    // Get the learning style from the test answers
    const learningStyle = testAnswers['q1'] || 'By watching videos';
    const explanation = getMockAIExplanation(subject, learningStyle);
    setAiResponse(explanation);
    setScreen('lesson');
  };

  // Handles the gamified botany lesson progression
  const handleLessonProgression = () => {
    setLessonStage(lessonStage + 1);
  };

  // Toggles the dark mode on and off
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Reusable card component for the home screen
  const Card = ({ icon, title, description, onClick }) => (
    <div
      onClick={onClick}
      className="bg-gray-100 dark:bg-gray-800 p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer flex flex-col items-center text-center"
    >
      <div className="p-4 bg-purple-500 rounded-full text-white mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
    </div>
  );

  // Main application UI, rendered based on the current screen state
  return (
    <div className={`min-h-screen font-sans ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Header with logo and dark mode toggle */}
      <header className="py-6 px-4 md:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-8 w-8 text-purple-600" />
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">GenZ.AI</h1>
        </div>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:ring-2 ring-purple-500 transition-all duration-200"
        >
          {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
        </button>
      </header>

      {/* Content based on the current screen */}
      <main className="container mx-auto p-4 md:p-8">
        {screen === 'home' && (
          <div className="text-center py-12 md:py-24">
            <h2 className="text-4xl md:text-5xl font-extrabold text-purple-600 mb-4">
              Unlock Your Potential
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
              Personalized learning and career paths for students and professionals.
            </p>
            <button
              onClick={() => setScreen('test')}
              className="bg-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              Start Your Journey
            </button>

            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card
                icon={<GraduationCap className="h-10 w-10" />}
                title="Student Mode"
                description="Gamified lessons and adaptive learning tailored to your style."
              />
              <Card
                icon={<Briefcase className="h-10 w-10" />}
                title="Professional Mode"
                description="ATS-friendly CV tailoring and job recommendations."
              />
              <Card
                icon={<User className="h-10 w-10" />}
                title="Hobbyist Mode"
                description="Free-to-talk AI chat for curiosity and personal growth."
              />
            </div>
          </div>
        )}

        {screen === 'test' && (
          <div className="bg-gray-50 dark:bg-gray-800 p-8 md:p-12 rounded-3xl shadow-xl max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center text-purple-600">
              Psychometric Profile
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
              Help us understand you better to create a personalized experience.
            </p>
            {psychometricQuestions.map((q, index) => (
              <div key={q.id} className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{`Q${index + 1}. ${q.question}`}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {q.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleTestAnswer(q.id, option)}
                      className={`
                        p-4 rounded-xl border-2 transition-all duration-200 text-center
                        ${testAnswers[q.id] === option
                          ? 'bg-purple-600 text-white border-purple-600 shadow-lg'
                          : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600'
                        }
                      `}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {screen === 'result' && (
          <div className="text-center py-12 md:py-24">
            <h2 className="text-4xl md:text-5xl font-extrabold text-purple-600 mb-4">
              Your Profile is Complete!
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
              We've created a unique learning path just for you. Let's start with a sample lesson.
            </p>
            <button
              onClick={() => handleStartLesson('Botany')}
              className="bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
            >
              Start Botany Lesson
            </button>
          </div>
        )}

        {screen === 'lesson' && (
          <div className="bg-gray-50 dark:bg-gray-800 p-8 md:p-12 rounded-3xl shadow-xl max-w-4xl mx-auto">
            <div className="flex items-center space-x-4 mb-6 text-purple-600">
              <Leaf className="h-10 w-10" />
              <h2 className="text-3xl font-bold">Botany: Photosynthesis</h2>
            </div>
            
            {/* AI Explanation Section */}
            <div className="mb-8 bg-purple-100 dark:bg-purple-900 p-6 rounded-2xl shadow-inner">
              <p className="text-lg text-gray-800 dark:text-white">{aiResponse}</p>
            </div>

            {/* Gamified Section */}
            <div className="border-t-2 border-gray-200 dark:border-gray-700 pt-8">
              <h3 className="text-2xl font-bold mb-4">The Gamified Challenge</h3>
              {lessonStage === 0 && (
                <div className="text-center">
                  <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                    Ready to build your first plant factory? Let's begin!
                  </p>
                  <button
                    onClick={handleLessonProgression}
                    className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold shadow-md hover:bg-blue-700 transition-colors"
                  >
                    Start Game
                  </button>
                </div>
              )}
              {lessonStage === 1 && (
                <div className="text-center">
                  <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                    Find the 3 essential ingredients for your plant factory: Sunlight, Water, and Carbon Dioxide.
                  </p>
                  <div className="flex justify-center space-x-4 mb-6">
                    <span className="p-4 bg-yellow-400 rounded-full text-white text-3xl shadow-lg">☀️</span>
                    <span className="p-4 bg-blue-400 rounded-full text-white text-3xl shadow-lg">💧</span>
                    <span className="p-4 bg-gray-400 rounded-full text-white text-3xl shadow-lg">🌬️</span>
                  </div>
                  <button
                    onClick={handleLessonProgression}
                    className="bg-green-600 text-white px-6 py-3 rounded-full font-bold shadow-md hover:bg-green-700 transition-colors"
                  >
                    Found them!
                  </button>
                </div>
              )}
              {lessonStage === 2 && (
                <div className="text-center">
                  <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                    Great job! You've successfully completed the first stage of your plant factory.
                  </p>
                  <button
                    onClick={() => setScreen('home')}
                    className="bg-purple-600 text-white px-6 py-3 rounded-full font-bold shadow-md hover:bg-purple-700 transition-colors"
                  >
                    Back to Home
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
