import Link from "next/link"
import {Sparkles} from "lucide-react"
import Image from "next/image"

const Hero = () => {
  return (
    <header className="h-fit justify-center flex flex-col items-center text-center gap-6 max-md:p-10 mt-10">
        <span className="hero-badge">
          Learning Management System - Converso
        </span>
        <Sparkles/>
        <h1 className="text-5xl md:text-7xl font-extrabold max-w-4xl">
          Learn <span className="text-[#a3c2fe]">anything</span> via real-time <span className="text-[#fea3e7]">voice</span> conversations.
        </h1>
        <p className="text-xl text-neutral-700 max-w-2xl mt-2 font-medium">
          Ditch static modules. Build personalized, hyper-focused AI study companions tailored to your syllabus, voice preference, and pace.
        </p>
        <div className="flex items-center gap-4 mt-4 max-sm:flex-col max-sm:w-fit">
          <a href="/sign-in" className="hero-button">
            Create your Own Companion
          </a>
          <Link href="#guide" className="border-2 border-black rounded-4xl font-bold px-8 py-4 max-sm:w-full scroll-smooth">
            See How It Works
          </Link>
        </div>
        <div className="relative bg-linear-to-t from-background to-white z-30">
          <Image src="/images/home.png" alt="home" width={1000} height={250} className="w-full h-auto" />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/10 to-transparent" />
        </div>
      </header>
  )
}

export default Hero