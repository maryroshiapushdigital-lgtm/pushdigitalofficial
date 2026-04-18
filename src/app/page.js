'use client';

import { useRef } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';

export default function Home() {
  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    capabilities: useRef(null),
    infrastructure: useRef(null),
    process: useRef(null),
    applications: useRef(null),
    benefits: useRef(null),
    contact: useRef(null),
  };

  const scrollToSection = (sectionKey) => {
    const ref = sectionRefs[sectionKey];
    if (ref?.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <main className="main-container">
      <Navbar />
      <Hero sectionRefs={sectionRefs} scrollToSection={scrollToSection} />
    </main>
  );
}