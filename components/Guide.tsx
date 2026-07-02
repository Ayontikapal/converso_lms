import { Plus,Mic, Award } from "lucide-react";

const Guide = () => {
  return (
    <section id="guide" className="bg-[#fbcfe8] h-fit border-t border-b border-black py-16">
        <div className="rounded-2xl">
          <div className="text-center max-w-xl mx-auto flex flex-col gap-2 mb-12 ">
            <span className="guide-badge">
              Simple Protocol
            </span>
            <h2 className="text-4xl font-black text-black">Three steps to mastery</h2>
            <p className="text-neutral-800 font-semibold">How to deploy an optimized instance for your dynamic stack.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="guide-border">
              <div className="bg-yellow-400 guide-step">
                1
              </div>
              <div className="bg-neutral-100 border border-black p-3 w-fit rounded-2xl mb-4 mt-2">
                <Plus className="w-6 h-6 text-black stroke-[2.5]" />
              </div>
              <h4 className="text-xl font-bold text-black mb-2">Configure & Personalize</h4>
              <p className="text-sm text-neutral-600 font-semibold">
                Pick a target subject, unique voice profile, and structural personality layout.
              </p>
            </div>
            <div className="guide-border">
              <div className="bg-purple-200 guide-step">
                2
              </div>
              <div className="bg-neutral-100 border border-black p-3 w-fit rounded-2xl mb-4 mt-2">
                <Mic className="w-6 h-6 text-black" />
              </div>
              <h4 className="text-xl font-bold text-black mb-2">Engage in Voice Micro-Lessons</h4>
              <p className="text-sm text-neutral-600 font-semibold leading-relaxed">
                Launch interactive continuous streams. Converse fluidly as the core agent adapts in real time to your inputs, pacing, and blind spots.
              </p>
            </div>
            <div className="guide-border">
              <div className="bg-blue-200 guide-step">
                3
              </div>
              <div className="bg-neutral-100 border border-black p-3 w-fit rounded-2xl mb-4 mt-2">
                <Award className="w-6 h-6 text-black" />
              </div>
              <h4 className="text-xl font-bold text-black mb-2">Analyze Session Logs</h4>
              <p className="text-sm text-neutral-600 font-semibold leading-relaxed">
                Review structured complete markdown text transcripts and recent sessions history to track older conversations.
              </p>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Guide