"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Search } from "lucide-react";
import heroImage from "@/public/hero-freelance.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt="Freelance professionals collaborating"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-background/94 via-background/80 to-background/60"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Find the Perfect{" "}
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-primary to-accent pb-0.5">
              Freelance Projects
            </span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Connect with clients worldwide and bring their visions to life.{" "}
            Browse thousands of projects or post your own.
          </p>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search for projects..."
                className="pl-10 h-12 bg-background/80 backdrop-blur border-border"
              />
            </div>
            <Button
              size="lg"
              variant="hero"
              className="h-12 px-8 bg-purple-600 hover:bg-purple-700 text-white shadow-md cursor-pointer"
            >
              Search Projects
            </Button>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link href="/projects">
              <Button size="lg" variant="default" className="cursor-pointer">
                Browse All Projects
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="cursor-pointer">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
