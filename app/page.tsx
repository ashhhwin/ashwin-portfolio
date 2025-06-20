"use client"

import { useState } from 'react';
import { Hero } from "@/components/sections/hero";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Education } from "@/components/sections/education";
import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  const [selectedExpertise, setSelectedExpertise] = useState<string | null>(null);
  const [showEducation, setShowEducation] = useState(false);

  return (
    <div>
      <section id="home">
        <Hero setSelectedExpertise={setSelectedExpertise} />
      </section>

      <section id="experience" className="py-16">
        <Experience selectedExpertise={selectedExpertise} />
      </section>

      <section id="projects" className="py-16">
        <Projects selectedExpertise={selectedExpertise} />
      </section>

      <section id="education" className="py-16">
        <Education show={showEducation} />
      </section>

      <section id="certifications" className="py-16">
        <Certifications />
      </section>

      <section id="contact" className="py-16">
        <Contact />
      </section>
    </div>
  );
} 