"use client"

import { useState } from "react";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Education } from "@/components/sections/education";
import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";
import { Navigation } from "@/components/navigation";
import { NavigationWrapper } from "@/components/navigation-wrapper";

export default function Home() {
  const [selectedExpertise, setSelectedExpertise] = useState<string | null>(null);
  const [showEducation, setShowEducation] = useState(false);

  return (
    <main className="relative">
      <NavigationWrapper onShowEducation={() => setShowEducation(true)}>
        <Navigation />
      </NavigationWrapper>
      <Hero setSelectedExpertise={setSelectedExpertise} />
      <Experience selectedExpertise={selectedExpertise} />
      <Projects 
        selectedExpertise={selectedExpertise} 
        onClearFilter={() => setSelectedExpertise(null)} 
      />
      <Education show={showEducation} />
      <Certifications />
      <Contact />
    </main>
  );
} 