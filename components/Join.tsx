"use client";
import { ArrowUpRight, Sparkles, Terminal, Users } from "lucide-react";
import Link from "next/link";

const Join = () => {
  return (
    <section className="w-full bg-white px-4 pt-16 pb-12 flex flex-col items-center">
      <div className="relative w-full max-w-6xl bg-blue-200 rounded-[40px] p-8 md:p-14 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/5 to-black/5" />
        <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center justify-between">
          <div className="flex flex-col gap-4 max-w-xl text-left shrink-0">
            <h2 className="text-4xl md:text-5xl font-black text-black tracking-tight leading-none mt-2">
              Ready to Accelerate <br />
              Your Brain Stack?
            </h2>
            <p className="text-neutral-800 font-bold text-sm md:text-base mt-2 leading-relaxed">
              Join Converso and create your first AI study companion for free
            </p>
          </div>
          <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-[32px] border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-[#e9d5ff] rounded-lg border-2 border-black">
                <Sparkles className="w-4 h-4 text-black fill-black/20" />
              </div>
              <h4 className="font-extrabold text-black text-lg">Claim your AI study guide</h4>
            </div>
            <Link href="/sign-in" className="hero-button">
                Sign Up 
                <ArrowUpRight className="w-4 h-4" />
            </Link>

            <p className="text-[11px] text-neutral-500 font-semibold text-center mt-1">
              Join us today.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-white/20 to-transparent z-20" />
      </div>
    </section>
  );
};

export default Join;