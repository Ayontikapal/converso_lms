import { BrainCircuit, BookOpen, Clock, FolderHeart } from 'lucide-react';

const Features = () => {
  return (
    <main id="features" className="flex flex-col gap-8 h-screen justify-center items-center">
        <div className="flex flex-col gap-3">
          <h2 className="text-4xl font-black">
            Everything You Need to Learn In One Place
          </h2>
          <p className="text-neutral-600 font-semibold text-sm text-center">
            Create your own friendly AI Study Companion tailored for any subject.
          </p>
        </div>
        <div>
          <div className="companion-list flex-1 flex flex-col gap-6 feature-shadow bg-[#A3C2FE]">
            <h3 className="text-2xl font-black">How It Helps You</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="feature">
                <div className="p-2.5 bg-[#fccc41] feature-icon">
                  <BrainCircuit className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-extrabold text-black text-lg">Question your AI Companion</h5>
                  <p className="text-xs text-neutral-600 font-semibold mt-1">
                    Have natural, back-and-forth voice conversations with your tutor to quiz yourself, 
                    ask questions, and fix confusing topics on the spot.
                  </p>
                </div>
              </div>
              <div className="feature">
                <div className="bg-[#e9d5ff] feature-icon">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-extrabold text-black text-lg">Get your own Study guide</h5>
                  <p className="text-xs text-neutral-600 font-semibold mt-1">
                    Customize your personal AI companion so you can learn exactly what you need to study with customisable voice style.
                  </p>
                </div>
              </div>
              <div className="feature">
                <div className="bg-[#fbcfe8] feature-icon">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-extrabold text-black text-lg">Flexible learning time</h5>
                  <p className="text-xs text-neutral-600 font-semibold mt-1">
                    Study whenever you want. Start a quick 4-minute check-in while riding the bus or jump into a 
                    deep 30-minute full lesson at your desk.
                  </p>
                </div>
              </div>
              <div className="feature">
                <div className="bg-green-200 feature-icon">
                  <FolderHeart className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-extrabold text-black text-lg">Saved sessions</h5>
                  <p className="text-xs text-neutral-600 font-semibold mt-1">
                    Never lose your progress. All of your past audio sessions and audio transcripts are securely kept 
                    so you can review them later.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </main>
  );
};

export default Features;