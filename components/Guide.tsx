import Image from "next/image";
import {steps} from "@/constants/index"

const Guide = () => {
  return (
    <section id="guide" className="bg-[#fbcfe8] h-fit border-t-4 border-b-4 border-black py-20 px-4">
      <div className="max-w-6xl mx-auto">

        <div className="text-center max-w-xl mx-auto flex flex-col gap-3 mb-16">
          <span className="guide-badge">
            Simple Protocol
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-black tracking-tight">
            Three steps to mastery
          </h2>
          <p className="text-neutral-900 font-bold text-sm md:text-base">
            How to deploy an optimized instance for your dynamic stack.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {steps.map(({ title, description, icon:Icon, bg, src, alt}, index) => (
            <div 
              key={index} 
              className="guide-step"
            >
              <div className="relative z-10">
                <div className={`${bg} border-2 border-black p-2.5 w-fit rounded-xl mb-4 mt-4`}>
                  <Icon className="w-5 h-5 text-black" />
                </div>
                <h4 className="text-xl font-black text-black mb-2">{title}</h4>
                <p className="text-xs text-neutral-600 font-semibold leading-relaxed">
                  {description}
                </p>
              </div>
              <div className="guide-image">
                <Image 
                  src={src} 
                  alt={alt} 
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-linear-to-t from-white via-white/10 to-transparent" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Guide;