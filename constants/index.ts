import {Plus, Mic, BookOpenCheck} from "lucide-react"
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