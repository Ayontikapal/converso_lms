import { featuresData } from "@/constants/index";
export default function Features() {

  return (
    <main id="features" className="max-md:h-fit h-screen flex flex-col gap-8 mb-10 mx-5 justify-center items-center">
      <div className="flex flex-col gap-3">
        <h2 className="text-4xl font-black max-md:text-2xl text-center">
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
            {featuresData.map(({iconBg, icon:Icon, title, description },id) => (
              <div key={id} className="feature">
                <div className={`${iconBg} feature-icon`}>
                  <Icon className="w-5 h-5"/>
                </div>
                <div>
                  <h5 className="font-extrabold text-black text-lg">
                    {title}
                  </h5>
                  <p className="text-xs text-neutral-600 font-semibold mt-1">
                    {description}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </main>
  );
}