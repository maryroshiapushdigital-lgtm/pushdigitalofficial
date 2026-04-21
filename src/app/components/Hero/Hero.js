'use client';

import { motion } from 'framer-motion';
import './Hero.css';
import Image from "next/image";
import { useEffect, useState } from "react";

/* ─── Reusable Anti-Gravity Section Wrapper ───────────────── */
const AntiGravitySection = ({ children, className, id, sectionRef, delay = 0 }) => (
  <motion.section
    ref={sectionRef}
    id={id}
    className={className}
    initial={{ opacity: 0, y: 100, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, amount: 0.08 }}
    transition={{
      duration: 1.4,
      delay,
      ease: [0.16, 0.77, 0.47, 0.97],
      opacity: { duration: 1.0, delay },
      scale: { duration: 1.2, delay },
    }}
  >
    {children}
  </motion.section>
);

/* ─── Stagger Container for Inner Elements ────────────────── */
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const staggerChild = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

/* ─── Feature Tag Component ───────────────────────────────── */
const FeatureTag = ({ icon, label, delay }) => (
  <motion.div
    className="feature-tag"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    whileHover={{
      scale: 1.05,
      boxShadow: '0 0 15px rgba(34, 211, 238, 0.3)',
    }}
  >
    <span className="feature-icon">
      <Image src={icon} alt="icon" width={20} height={20} />
    </span>
    <span className="feature-label">{label}</span>
  </motion.div>
);

/* ─── Data ────────────────────────────────────────────────── */
const services = [
  {
    icon: "/printed.png",
    title: "Printed Electronics",
    description:
      "Specialized Surface Mount Device integration adapted for flexible materials. ",
  },
  {
    icon: "/smd.png",
    title: "SMD Assembly",
    description:
      "We push the edges of what's possible. Our research arm experiments relentlessly so your product stays years ahead of the curve.",
  },
  {
    icon: "/pro.png",
    title: "Prototyping & Testing",
    description:
      "Rapid validation, iteration, and proof-of-concept development.",
  },
  {
    icon: "/bat.png",
    title: "Batch Production",
    description:
      "Low-to-medium volume manufacturing for pilot runs and niche applications.",
  },
];

const services2 = [
  {
    icon: "/conduct.png",
    title: "Conductive Ink Printing Systems",
  },
  {
    icon: "/fel.png",
    title: "Flexible Substrate Handling Equipment  ",
  },
  {
    icon: "/ass.png",
    title: "SMD Assembly Lines",
  },
  {
    icon: "/test.png",
    title: "Testing & Validation Labs",
  },
];

/* ══════════════════════════════════════════════════════════════
   HERO COMPONENT
   ══════════════════════════════════════════════════════════════ */
export default function Hero({ sectionRefs, scrollToSection }) {
  // useEffect(() => {
  //   const light = document.querySelector(".cursor-light");

  //   const moveLight = (e) => {
  //     if (light) {
  //       light.style.left = e.clientX + "px";
  //       light.style.top = e.clientY + "px";
  //     }
  //   };

  //   window.addEventListener("mousemove", moveLight);

  //   return () => {
  //     window.removeEventListener("mousemove", moveLight);
  //   };
  // }, []);

  const [activeFAQ, setActiveFAQ] = useState(null);

  const features = [
    { icon: '/print.png', label: 'Printed Electronics' },
    { icon: '/flex.png', label: 'Flexible Substrates' },
    { icon: '/rapid.png', label: 'Rapid Prototyping' },
    { icon: '/batch.png', label: 'Batch Production' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <>
      {/* ═══ HERO SECTION ═══════════════════════════════════════ */}
      <section className="hero-section" id="home" ref={sectionRefs?.home}>
        <div className="hero-background">
          <div className="cursor-light"></div>

          <video
            autoPlay
            loop
            muted
            playsInline
            className="background-video"
          >
            <source src="/headervideo.mp4" type="video/mp4" />
          </video>

          <div className="overlay"></div>
        </div>


        {/* Hero Content */}
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="hero-grid">
            {/* Left Content */}
            <motion.div className="hero-left" variants={containerVariants}>
              {/* Heading */}
              <motion.h1 className="hero-heading" variants={itemVariants}>
                <span className="heading-white">Enabling the Future of {" "}</span>
                <span className="white-text">Electronics </span>
                <span className="heading-cyan"> - Flexible,</span>
                <br />
                <span className="heading-cyan">Functional, Scalable</span>
              </motion.h1>

              {/* Subheading */}
              <motion.p className="hero-paragraph" variants={itemVariants}>
                From concept to small-scale manufacturing, we empower innovation with advanced flexible electronics production and rapid prototyping capabilities.
              </motion.p>

              {/* Feature Tags */}
              <motion.div className="features-row" variants={containerVariants}>
                {features.map((feature, index) => (
                  <FeatureTag
                    key={feature.label}
                    icon={feature.icon}
                    label={feature.label}
                    delay={0.4 + index * 0.1}
                  />
                ))}
              </motion.div>



              <motion.div className="buttons-group" variants={itemVariants}>
                <motion.button
                  className="btn btn-primary"
                  whileHover={{
                    scale: 1.08,
                    boxShadow: '0 0 30px rgba(34, 211, 238, 0.8)',
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Your Project
                </motion.button>

                <motion.button
                  className="btn btn-secondary"
                  whileHover={{
                    scale: 1.08,
                    boxShadow: '0 0 20px rgba(34, 211, 238, 0.3)',
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Technology
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Visual Area */}
            <motion.div
              className="hero-right"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >

            </motion.div>
          </div>
        </motion.div>


      </section >

      {/* ═══ ABOUT SECTION ═══════════════════════════════════════ */}
      <AntiGravitySection
        id="about"
        className="about-section"
        sectionRef={sectionRefs?.about}
      >
        {/* TOP VISUAL (VIDEO OR IMAGE) */}
        <div className="about-media">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="about-video"
          >
            <source src="/video2.mp4" type="video/mp4" />
          </video>
        </div>

        {/* TEXT CONTENT */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 className='about' variants={staggerChild}>
            About the <span className='fac'>Facility</span>
          </motion.h2>

          <motion.p className='para' variants={staggerChild}>
            This facility is dedicated to advancing functional and flexible
            electronics by providing an integrated ecosystem for design,
            prototyping, testing, and small-scale production.
          </motion.p>

          <motion.p className='para' variants={staggerChild}>
            As industries shift toward lightweight, adaptable, and cost-efficient
            solutions, we bridge the gap between innovation and manufacturability—
            enabling faster development cycles and real-world application readiness.
          </motion.p>
        </motion.div>

      </AntiGravitySection>


      {/* ═══ WHAT WE DO SECTION ══════════════════════════════════ */}
      <AntiGravitySection
        id="capabilities"
        className="whatwedo-section"
        sectionRef={sectionRefs?.capabilities}
      >
        <div className="whatwedo-noise" aria-hidden="true" />

        <div className="whatwedo-header">

          <motion.h2
            className="whatwedo-heading"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            What We <span className="whatwedo-highlight">Do</span>
          </motion.h2>

        </div>
        <div className="whatwedo-container">
          <motion.div
            className="whatwedo-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {services.map((service, index) => (
              <motion.div
                className="whatwedo-card"
                key={index}
                style={{ "--delay": `${index * 80}ms` }}
                variants={staggerChild}
              >
                <div className="whatwedo-card-inner">
                  <div className="whatwedo-icon-wrap">
                    <img
                      src={service.icon}
                      alt={service.title}
                      className="whatwedo-icon"
                    />
                  </div>
                  <h3 className="whatwedo-card-title">{service.title}</h3>
                  <p className="whatwedo-card-desc">{service.description}</p>
                  <div className="whatwedo-card-line" aria-hidden="true" />
                </div>
                <div className="whatwedo-glow" aria-hidden="true" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AntiGravitySection>



      <AntiGravitySection
        id="infrastructure"
        className="advance-section"
        sectionRef={sectionRefs?.infrastructure}
      >
        <div className="advance-noise" aria-hidden="true" />

        <div className="advance-header">
          <motion.h2
            className="advance-heading"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Advanced <span className="advance-highlight">Infrastructure</span>
          </motion.h2>

          <motion.p
            className='paracolor'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We provide advanced solutions tailored for flexible and functional electronics development.
          </motion.p>
        </div>

        <div className="advance-container">
          <motion.div
            className="advance-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {services2.map((service, index) => (
              <motion.div
                className="advance-card"
                key={index}
                style={{ "--delay": `${index * 80}ms` }}
                variants={staggerChild}
              >
                <div className="advance-card-inner">
                  <div className="advance-icon-wrap">
                    <img
                      src={service.icon}
                      alt={service.title}
                      className="advance-icon"
                    />
                  </div>

                  <h3 className="advance-card-title">{service.title}</h3>
                  <p className="advance-card-desc">{service.description}</p>
                  <div className="advance-card-line" aria-hidden="true" />
                </div>

                <div className="advance-glow" aria-hidden="true" />
              </motion.div>
            ))}
          </motion.div>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="research"
          >
            <source src="/research.mp4" type="video/mp4" />
          </video>
        </div>

      </AntiGravitySection>



      {/* ═══ TIMELINE SECTION ════════════════════════════════════ */}
      <AntiGravitySection
        id="process"
        className="timeline"
        sectionRef={sectionRefs?.process}
      >
        <motion.h2
          className="timeline-heading"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          From Idea to <span>Market</span>
        </motion.h2>

        <div className="timeline-line">

          {[
            "Concept Development",
            "Design & Simulation",
            "Prototype Fabrication",
            "Testing & Validation",
            "Iteration & Optimization",
            "Batch Production",
          ].map((text, index) => (
            <motion.div
              className="timeline-step"
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <div className="timeline-circle">{index + 1}</div>
              <p className="timeline-text">{text}</p>
            </motion.div>
          ))}
        </div>

      </AntiGravitySection>



      {/* ═══ INDUSTRIES SECTION ══════════════════════════════════ */}
      <AntiGravitySection
        id="applications"
        className="industries"
        sectionRef={sectionRefs?.applications}
      >
        <motion.h2
          className="industries-heading"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Industries We <span>Serve</span>
        </motion.h2>

        <motion.div
          className="industries-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {[
            { icon: "/wearable.png", title: "Wearable Technology" },
            { icon: "/smart.png", title: "Smart Packaging" },
            { icon: "/iot.png", title: "IoT Devices" },
            { icon: "/Advance.png", title: "Advanced Sensors" },
            { icon: "/health.png", title: "Healthcare Devices" },
            { icon: "/automotive.png", title: "Automotive Electronics" },
          ].map((item, index) => (
            <motion.div className="industry-card" key={index} variants={staggerChild}>
              <img src={item.icon} alt="" />
              <p className="industry-title">{item.title}</p>
            </motion.div>
          ))}
        </motion.div>
      </AntiGravitySection>



      {/* ═══ WHY CHOOSE US SECTION ═══════════════════════════════ */}
      <AntiGravitySection
        id="benefits"
        className="why"
        sectionRef={sectionRefs?.benefits}
      >
        <motion.h2
          className="why-heading"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Why Choose <span>Us</span>
        </motion.h2>

        <motion.div
          className="why-row"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {[
            { icon: "/time.png", text: "Faster Time-to-Market" },
            { icon: "/cost.png", text: "Cost-Efficient Development" },
            { icon: "/flexible.png", text: "Flexible & Scalable Production" },
            { icon: "/end.png", text: "End-to-End Support" },
            { icon: "/inno.png", text: "Innovation-Driven Ecosystem" },
          ].map((item, index) => (
            <motion.div className="why-item" key={index} variants={staggerChild}>

              <div className="why-icon">
                <img src={item.icon} alt="" />
              </div>

              <p className="why-text">{item.text}</p>

            </motion.div>
          ))}
        </motion.div>
      </AntiGravitySection>



      {/* ═══ VIDEO SECTION ═══════════════════════════════════════ */}
      <AntiGravitySection className='videoo'>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="video3"
        >
          <source src="/video3.mp4" type="video/mp4" />
        </video>
      </AntiGravitySection>



      {/* ═══ FAQ SECTION ═════════════════════════════════════════ */}
      <AntiGravitySection className="faq">
        <motion.p
          className="faq-tag"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          FAQ
        </motion.p>
        <motion.h2
          className="faq-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Common Questions
        </motion.h2>

        <div className="faq-container">
          {[
            {
              question: "What is Electroluminescent Ink?",
              answer:
                "Electroluminescent ink is a light-emitting material used in flexible electronics.",
            },
            {
              question: "What's the minimum order?",
              answer:
                "We support low-volume pilot runs suitable for startups and R&D.",
            },
            {
              question: "How fast is prototyping?",
              answer:
                "Prototyping typically takes a few days to a couple of weeks.",
            },
            {
              question: "What substrates do you support?",
              answer:
                "We support PET, PI, and other flexible substrates.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className={`faq-item ${activeFAQ === index ? "active" : ""}`}
              onClick={() =>
                setActiveFAQ(activeFAQ === index ? null : index)
              }
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="faq-question">
                {item.question}
                <span className="faq-icon">
                  {activeFAQ === index ? "-" : "+"}
                </span>
              </div>

              {activeFAQ === index && (
                <motion.div
                  className="faq-answer"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  {item.answer}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </AntiGravitySection>



      {/* ═══ CTA SECTION ═════════════════════════════════════════ */}
      <AntiGravitySection className="cta-section">
        <motion.div
          className="cta-container"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 className="cta-heading" variants={staggerChild}>
            Ready to Build the Future of <span>Electronics?</span>
          </motion.h2>

          <motion.div className="cta-buttons" variants={staggerChild}>
            <button className="cta-primary">Start Your Project</button>
            <button className="cta-secondary">Contact Our Team</button>
          </motion.div>
        </motion.div>
      </AntiGravitySection>



      {/* ═══ FOOTER ══════════════════════════════════════════════ */}
      <footer className="footer" id="contact" ref={sectionRefs?.contact}>
        <div className="footer-container">

          {/* LEFT */}
          <div className="footer-left">
            <img src="/logo-img.png" alt="Push Digital" className="footer-logo" />

            <p className="footer-desc">
              Electroluminescent printing enabling ultra-thin, flexible, energy-efficient
              lighting solutions for next-generation electronics, wearables, smart
              surfaces, and innovative product design.
            </p>
          </div>

          {/* CENTER - QUICK LINKS (FIXED) */}
          <div className="footer-links">
            <h4>Quick Links</h4>

            <div className="links-grid">
              <ul>
                <li onClick={() => scrollToSection?.('home')}>Home</li>
                <li onClick={() => scrollToSection?.('about')}>About</li>
                <li onClick={() => scrollToSection?.('capabilities')}>Capabilities</li>
                <li onClick={() => scrollToSection?.('applications')}>Applications</li>
              </ul>

              <ul>
                <li onClick={() => scrollToSection?.('infrastructure')}>Infrastructure</li>
                <li onClick={() => scrollToSection?.('process')}>Process</li>
                <li onClick={() => scrollToSection?.('benefits')}>Benefits</li>
                <li onClick={() => scrollToSection?.('contact')}>Contact</li>
              </ul>
            </div>
          </div>

          {/* RIGHT */}
          <div className="footer-contact">
            <h4>Contact</h4>
            <div className="contact-item">
              <Image src="/map.png" className='img' alt="map" width={12} height={16} />
              <span>
                339/97, Lakshmanaswamy Salai,<br />
                KK Nagar, Chennai - 600 078,<br />
                Tamil Nadu, India.
              </span>
            </div>
            <div className="contact-item">
              <Image src="/phone.png"className='img' alt="mobile" width={16} height={13} />
              <span>
                <span style={{ display: 'block' }}>Landline: (+91) 44 - 42633329</span>
                <span style={{ display: 'block' }}>Mobile: (+91) 98402 64453</span>
              </span>
            </div>
            <div className="contact-item">
              <Image src="/email.png" className='img' alt="email" width={16} height={13} />
              <span>enquiry@push.digital</span>
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          © 2026 Printing Electronics. All rights reserved.
        </div>
      </footer>


    </>



  );
}