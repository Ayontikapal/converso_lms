"use client";
import { useState } from "react";
import { Check } from "lucide-react";

const PLANS = [
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

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="bg-[#e9d5ff] border-t border-b-2 border-black py-20">
      <div className="mx-auto px-4 md:px-14 max-w-[1400px]">
        
        {/* Header Block */}
        <div className="text-center max-w-xl mx-auto flex flex-col gap-3 mb-12">
          <span className="bg-black text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full w-fit mx-auto border border-black">
            Flexible Tiers
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-black tracking-tight">Simple, Clear Pricing</h2>
          
          {/* Interactive Billing Toggle */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <span className={`text-sm font-bold ${!isAnnual ? 'text-black' : 'text-neutral-600'}`}>Monthly</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-12 h-6 bg-black rounded-full p-1 transition-colors duration-200 relative flex items-center"
            >
              <div className={`bg-[#fccc41] border border-black size-4 rounded-full transition-transform duration-200 shadow-sm ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
            <span className={`text-sm font-bold flex items-center gap-1.5 ${isAnnual ? 'text-black' : 'text-neutral-600'}`}>
              Billed Annually <span className="bg-green-200 text-green-800 text-xs px-2 py-0.5 rounded-md border border-black font-extrabold">Save 20%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PLANS.map((plan) => {
            const isCore = plan.name === "Core Learner";
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;

            return (
              <div 
                key={plan.name}
                className={`bg-white border-2 border-black rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative transition-all duration-200 ${
                  isCore ? 'scale-105 md:scale-105 border-3 ring-4 ring-black/5 z-10' : ''
                }`}
              >
                {/* Plan Badges */}
                {plan.tag && (
                  <span className={`absolute top-6 right-6 text-xs font-black px-2.5 py-1 rounded-md uppercase border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ${
                    isCore ? 'bg-[#fccc41] text-black' : 'bg-orange-500 text-white'
                  }`}>
                    {plan.tag}
                  </span>
                )}

                <div>
                  <h3 className={`text-2xl font-black tracking-tight ${isCore ? 'text-orange-600' : 'text-black'}`}>
                    {plan.name}
                  </h3>
                  <p className="text-xs text-neutral-500 font-semibold mt-1">{plan.desc}</p>
                  
                  <div className="my-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-black text-black">${price}</span>
                      {plan.monthlyPrice > 0 && <span className="text-sm font-bold text-neutral-500">/month</span>}
                    </div>
                    <span className="block text-xs font-bold text-neutral-400 mt-1">
                      {plan.monthlyPrice === 0 ? "Always free" : isAnnual ? "Billed once a year" : "Billed month-to-month"}
                    </span>
                  </div>

                  <hr className="border-black/10 my-6" />

                  {/* Feature Checklist */}
                  <ul className="flex flex-col gap-3 text-sm font-semibold text-neutral-700">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2.5">
                        <Check className={`w-4 h-4 stroke-[3] shrink-0 ${isCore ? 'text-orange-500' : 'text-black'}`} />
                        <span className={isCore && i === 1 ? "font-black text-black underline decoration-orange-400" : ""}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Call To Action Buttons */}
                {plan.monthlyPrice === 0 ? (
                  <div className="mt-8 pt-4 h-[54px] flex items-center justify-center text-sm font-bold text-neutral-400 italic">
                    Current Active Free Workspace
                  </div>
                ) : (
                  <button className={`w-full border-2 border-black py-3.5 rounded-xl font-black transition-transform active:translate-y-0.5 mt-8 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ${
                    isCore 
                      ? 'bg-orange-500 text-white hover:bg-orange-600' 
                      : 'bg-neutral-100 text-black hover:bg-neutral-200'
                  }`}>
                    Subscribe
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;