import {Plus, Mic, BookOpenCheck, BrainCircuit, BookOpen, Clock, FolderHeart} from "lucide-react"
export const subjects = [
  "maths",
  "language",
  "science",
  "history",
  "coding",
  "economics",
];

export const subjectsColors = {
  science: "#E5D0FF",
  maths: "#FFDA6E",
  language: "#BDE7FF",
  coding: "#FFC8E4",
  history: "#FFECC8",
  economics: "#C8FFDF",
};

export const voices = {
  male: { casual: "2BJW5coyhAzSr8STdHbE", formal: "c6SfcYrb2t09NHXiT80T" },
  female: { casual: "ZIlrSGI4jZqobxRKprJz", formal: "sarah" },
};

export const plans = [
  {
    name: "Basic Plan",
    desc: "Perfect for testing the waters",
    monthlyPrice: 0,
    annualPrice: 0,
    tag: "Active",
    features: ["10 Conversations/month", "3 Active companions", "Basic Session Recaps"],
  },
  {
    name: "Core Learner",
    desc: "Our most popular study configuration",
    monthlyPrice: 25,
    annualPrice: 19,
    tag: "Best Plan",
    features: [
      "Everything in Basic",
      "Unlimited Conversations",
      "10 Active companions",
      "Monthly progress reports",
      "Save conversation history",
      "Inline Quizzes and Recaps",
    ],
  },
  {
    name: "Pro Companion",
    desc: "Your personal AI powered academy",
    monthlyPrice: 45,
    annualPrice: 39,
    features: [
      "Everything in Core",
      "Unlimited Companions",
      "Full Performance Dashboard",
      "Early Access to new Features",
      "Daily Learning Reminders",
      "Priority Support",
    ],
  },
];

export const steps = [
  {
    title: "Configure & Personalize",
    description: "Pick a target subject, unique voice profile, and structural personality layout.",
    icon: Plus,
    bg: "bg-yellow-300",
    src: "/images/companion.png",
    alt: "Companion"
  },
  {
    title: "Engage in Voice Micro-Lessons",
    description: "Launch interactive continuous streams. Converse fluidly as the core agent adapts in real time to your pacing.",
    icon: Mic,
    bg: "bg-purple-200",
    src: "/images/session1.png",
    alt: "Session"
  },
  {
    title: "Analyze Session Logs",
    description: "Review structured complete markdown text transcripts and recent sessions history to track older conversations.",
    icon: BookOpenCheck,
    bg: "bg-blue-200",
    src: "/images/companions.png",
    alt: "Companions"
  }
];

export const featuresData = [
    {
      id: 'question-ai',
      icon: BrainCircuit,
      iconBg: 'bg-[#fccc41]', 
      title: 'Question your AI Companion',
      description: 'Have natural, back-and-forth voice conversations with your tutor to quiz yourself, ask questions, and fix confusing topics on the spot.'
    },
    {
      id: 'study-guide',
      icon: BookOpen,
      iconBg: 'bg-[#e9d5ff]',
      title: 'Get your own Study guide',
      description: 'Customize your personal AI companion so you can learn exactly what you need to study with customisable voice style.'
    },
    {
      id: 'flexible-learning',
      icon: Clock,
      iconBg: 'bg-[#fbcfe8]',
      title: 'Flexible learning time',
      description: 'Study whenever you want. Start a quick 4-minute check-in while riding the bus or jump into a deep 30-minute full lesson at your desk.'
    },
    {
      id: 'saved-sessions',
      icon: FolderHeart,
      iconBg: 'bg-green-200',
      title: 'Saved sessions',
      description: 'Never lose your progress. All of your past audio sessions and audio transcripts are securely kept so you can review them later.'
    }
  ];