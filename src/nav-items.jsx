import { Home, BookOpen, Clock, BarChart, GitFork, CheckSquare, Smile, Settings, Focus, Trophy, Award } from "lucide-react";
import Index from "./pages/Index.jsx";
import AssignmentTracker from "./pages/AssignmentTracker.jsx";
import TimeManagement from "./pages/TimeManagement.jsx";
import ProgressMonitoring from "./pages/ProgressMonitoring.jsx";
import VisualTaskBreakdown from "./pages/VisualTaskBreakdown.jsx";
import HabitTracker from "./pages/HabitTracker.jsx";
import EmotionalCheckins from "./pages/EmotionalCheckins.jsx";
import SensoryPreferences from "./components/SensoryPreferences.jsx";
import FocusModePage from "./pages/FocusModePage.jsx";
import LeaderboardPage from "./pages/LeaderboardPage.jsx";
import ChallengesPage from "./pages/ChallengesPage.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Assignment Tracker",
    to: "/assignments",
    icon: <BookOpen className="h-4 w-4" />,
    page: <AssignmentTracker />,
  },
  {
    title: "Time Management",
    to: "/time-management",
    icon: <Clock className="h-4 w-4" />,
    page: <TimeManagement />,
  },
  {
    title: "Progress Monitoring",
    to: "/progress",
    icon: <BarChart className="h-4 w-4" />,
    page: <ProgressMonitoring />,
  },
  {
    title: "Visual Task Breakdown",
    to: "/task-breakdown",
    icon: <GitFork className="h-4 w-4" />,
    page: <VisualTaskBreakdown />,
  },
  {
    title: "Habit Tracker",
    to: "/habits",
    icon: <CheckSquare className="h-4 w-4" />,
    page: <HabitTracker />,
  },
  {
    title: "Emotional Check-ins",
    to: "/emotional-checkins",
    icon: <Smile className="h-4 w-4" />,
    page: <EmotionalCheckins />,
  },
  {
    title: "Sensory Preferences",
    to: "/sensory-preferences",
    icon: <Settings className="h-4 w-4" />,
    page: <SensoryPreferences />,
  },
  {
    title: "Focus Mode",
    to: "/focus-mode",
    icon: <Focus className="h-4 w-4" />,
    page: <FocusModePage />,
  },
  {
    title: "Leaderboard",
    to: "/leaderboard",
    icon: <Trophy className="h-4 w-4" />,
    page: <LeaderboardPage />,
  },
  {
    title: "Challenges",
    to: "/challenges",
    icon: <Award className="h-4 w-4" />,
    page: <ChallengesPage />,
  },
];