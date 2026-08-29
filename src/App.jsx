import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  fetchGallery,
  addGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  fetchTestimonials,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
  fetchFaqs,
  addFaq,
  updateFaq,
  deleteFaq,
  addLead,
  fetchLeads,
  deleteLead,
  logVisit,
  fetchStats,
  fetchDaily,
} from './api.js';

import heroPortrait from './assets/hero.jpg';

/* ============================================================
   FUNCTIONALCOACH101.COM — Lakhan Ahuja · The Weight Loss Coach
   Visual system matched to the Dominic editorial reference:
   stone-grey monochrome, Anton condensed caps + Instrument
   Serif italic accents, black pill buttons.
   ============================================================ */

/* Only the entries actually rendered somewhere on the site - dead stock
   URLs left over from earlier drafts were trimmed out. */
const images = {
  hero: heroPortrait,
  workout_home: 'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=900&q=85',
  workout_2: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=900&q=85',
  food_dal: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&q=80',
  food_street: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80',
  method_1: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80',
  method_2: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
  process_1: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=900&q=85',
  gallery_3: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=700&q=80',
};

const revealProps = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '0px 0px -80px 0px' },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
};

function useIsMobile(breakpoint = 900) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', onChange);
    setIsMobile(mq.matches);
    return () => mq.removeEventListener('change', onChange);
  }, [breakpoint]);
  return isMobile;
}

function PillLink({ href, children, light, ghost, style }) {
  return (
    <a
      href={href}
      className={`btn-pill${light ? ' btn-pill--light' : ''}${ghost ? ' btn-pill--ghost' : ''}`}
      style={style}
    >
      {children}
      <span className="btn-arrow">→</span>
    </a>
  );
}

/* ============================================================
   1. NAVBAR
   ============================================================ */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const links = [
    { label: 'Method', href: '#method' },
    { label: 'Results', href: '#results' },
    { label: 'Fit Check', href: '#fit-check' },
    { label: 'Programs', href: '#programs' },
  ];

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: isMobile ? '60px' : '72px',
          background: scrolled ? 'rgba(236,234,228,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          transition: 'background 300ms ease, border-color 300ms ease',
        }}
      >
        <div
          className="container"
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
          }}
        >
          {/* Wordmark — "● LAKHAN" like the reference's "● DOMINIC" */}
          <a href="#top" style={{ textDecoration: 'none', lineHeight: 1 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--ink)' }} />
              <span style={{ fontFamily: 'Anton', fontSize: '18px', letterSpacing: '0.06em', color: 'var(--ink)', textTransform: 'uppercase' }}>
                Lakhan
              </span>
            </span>
            {!isMobile && (
              <span style={{ display: 'block', fontFamily: 'Inter', fontSize: '11px', color: 'var(--ink-60)', marginTop: '3px', paddingLeft: '16px' }}>
                The Weight Loss Coach
              </span>
            )}
          </a>

          <nav className="desktop-only" style={{ gap: '32px', alignItems: 'center' }}>
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '14px', color: 'var(--ink)', textDecoration: 'none', opacity: 0.8 }}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {!isMobile && (
              <a href="#book" className="btn-pill" style={{ padding: '12px 22px' }}>
                Book a Call
              </a>
            )}
            {isMobile && (
              <button
                aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
                onClick={() => setDrawerOpen((v) => !v)}
                style={{
                  background: 'var(--ink)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '14px 12px',
                  borderRadius: '999px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px',
                  width: '48px',
                  alignItems: 'center',
                }}
              >
                <motion.span
                  animate={drawerOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
                  style={{ display: 'block', width: '20px', height: '2px', background: 'var(--paper)' }}
                />
                <motion.span
                  animate={drawerOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
                  style={{ display: 'block', width: '20px', height: '2px', background: 'var(--paper)' }}
                />
              </button>
            )}
          </div>
        </div>
      </header>

      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 90,
              background: 'var(--paper)',
              display: 'flex',
              flexDirection: 'column',
              padding: '96px clamp(20px, 5vw, 64px) 32px',
            }}
          >
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '20px', flexGrow: 1 }}>
              {links.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  onClick={() => setDrawerOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                  style={{ fontFamily: 'Anton', fontSize: '32px', color: 'var(--ink)', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.02em' }}
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <motion.a
              href="#book"
              onClick={() => setDrawerOpen(false)}
              className="btn-pill"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              style={{ justifyContent: 'center', width: '100%' }}
            >
              Book a Call
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ============================================================
   2. HERO — "FAT LOSS / isn't a willpower / PROBLEM." mixing
   Anton caps with Instrument Serif italic, like the reference's
   "A UI/UX / & Brand / DESIGNER"
   ============================================================ */

function HeroSection() {
  return (
    <section
      id="top"
      style={{ background: 'var(--paper)', minHeight: '100svh', display: 'flex', alignItems: 'center' }}
    >
      <div
        className="container grid-2"
        style={{ paddingTop: 'clamp(84px, 12vw, 120px)', paddingBottom: '64px', width: '100%' }}
      >
        {/* LEFT: text */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--ink)' }} />
            <span className="text-caption" style={{ color: 'var(--ink-60)' }}>
              Functional Coach · United By Movement
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-accent"
            style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.6rem)', color: 'var(--ink)', marginBottom: '8px' }}
          >
            Hey, I'm Lakhan.
          </motion.p>

          <div style={{ overflow: 'hidden' }}>
            {[
              <span key="1">Fat loss</span>,
              <span key="2" className="serif-accent">without a single</span>,
              <span key="3">Diet plan.</span>,
            ].map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="text-display"
                style={{ color: 'var(--ink)' }}
              >
                {line}
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-body"
            style={{ marginTop: '28px', maxWidth: '420px' }}
          >
            Diet plans end, and their results end with them. I coach habits
            instead: your food, your routine, rebuilt to last. Built around
            dal-chawal, not despite it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.75 }}
            style={{ marginTop: '36px' }}
          >
            <PillLink href="#book">Book a Call</PillLink>
          </motion.div>

          {/* Service tags row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="service-tags"
            style={{ marginTop: 'clamp(40px, 7vw, 64px)', paddingTop: '24px', borderTop: '1px solid var(--border)' }}
          >
            {[
              { title: 'Habit-First Coaching', desc: 'No diet plans. Nothing to start or quit.' },
              { title: '1:1 Video Consults', desc: '45 minutes, every 7–10 days.' },
            ].map((item, i) => (
              <div key={i}>
                <p className="text-caption" style={{ color: 'var(--ink)', marginBottom: '6px' }}>
                  {item.title}
                </p>
                <p style={{ fontFamily: 'Inter', fontSize: '13px', color: 'var(--ink-60)' }}>{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT: portrait */}
        <motion.div
          className="hero-portrait"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          style={{
            position: 'relative',
            borderRadius: '24px',
            overflow: 'hidden',
            height: 'clamp(420px, 55vw, 640px)',
            background: 'var(--paper-dim)',
          }}
        >
          <motion.img
            src={images.hero}
            alt="Lakhan Ahuja, The Weight Loss Coach"
            animate={{ scale: [1, 1.03] }}
            transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 25%' }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              background: 'var(--paper)',
              borderRadius: '12px',
              padding: 'clamp(12px, 1.5vw, 16px) clamp(16px, 2vw, 20px)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <p className="text-data" style={{ color: 'var(--ink)', fontSize: 'clamp(22px, 3vw, 28px)' }}>100+</p>
            <p className="text-caption" style={{ color: 'var(--ink-60)', fontSize: '10px', marginTop: '4px' }}>
              Transformations Coached
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   3. CREDENTIAL / PROOF STRIP
   ============================================================ */

function CredentialStrip() {
  return (
    <section
      style={{
        background: 'var(--paper)',
        padding: '48px 0',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '48px',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        <p className="text-caption" style={{ color: 'var(--ink-60)', whiteSpace: 'nowrap' }}>
          Built on habits, not diet plans
        </p>
        <div style={{ display: 'flex', gap: 'clamp(20px, 4vw, 48px)', flexWrap: 'wrap' }}>
          {['Habit Tracking', '45-Min Video Consults', 'Daily Workout Videos', 'Recipes & Supplement Guidance'].map((tag, i) => (
            <span
              key={i}
              style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '14px', color: 'var(--ink)', opacity: 0.7 }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   4. STATS — big Anton numbers in the reference's %-grid rhythm
   ============================================================ */

function StatCard({ num, suffix, label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1600;
    let raf;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - progress, 3)) * num));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, num]);

  return (
    <div ref={ref} style={{ borderLeft: '1px solid var(--border-strong)', paddingLeft: '16px' }}>
      <p className="text-data" style={{ color: 'var(--ink)' }}>
        {count}
        {suffix}
      </p>
      <p className="text-caption" style={{ color: 'var(--ink-60)', marginTop: '6px', fontSize: '10px' }}>{label}</p>
    </div>
  );
}

/* ============================================================
   3b. ABOUT COACH
   ============================================================ */

function AboutCoachSection() {
  return (
    <section style={{ background: 'var(--paper)', padding: 'clamp(64px, 10vw, 120px) 0' }}>
      <div className="container grid-2" style={{ gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center' }}>
        <motion.div {...revealProps}>
          <span className="text-caption" style={{ color: 'var(--ink-60)' }}>Your Coach</span>
          <h2 className="text-h2" style={{ color: 'var(--ink)', marginTop: '12px' }}>
            Who you're working <span className="serif-accent">with.</span>
          </h2>
          <p className="text-body" style={{ marginTop: '24px', maxWidth: '440px', lineHeight: 1.7 }}>
            Eight years as a software engineer, eating lunch at my desk, wondering why 5ams and meal plans weren't working. The answer wasn't more discipline. It was building a system around how I actually lived instead of fighting my life.
          </p>
          <p className="text-body" style={{ marginTop: '16px', maxWidth: '440px', lineHeight: 1.7, color: 'var(--ink-60)' }}>
            Now I coach busy professionals, dal-chawal eaters, people who travel, who work late. People with actual lives. The same system that worked for me works for them—because it's built for real people, not for spreadsheets.
          </p>
          <div style={{ marginTop: '32px' }}>
            <p className="text-caption" style={{ color: 'var(--ink-60)', marginBottom: '8px' }}>100+ clients. 4–8 kg average. 92% keep it off.</p>
          </div>
          <PillLink href="#book" ghost style={{ marginTop: '28px' }}>
            Book a Slot
          </PillLink>
        </motion.div>
        <motion.div {...revealProps} style={{ borderRadius: '16px', overflow: 'hidden', background: 'var(--border-strong)', aspectRatio: '3/4' }}>
          <img src={heroPortrait} alt="Lakhan" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </motion.div>
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { num: 100, suffix: '+', label: 'Clients Coached' },
    { num: 8, suffix: 'kg', label: 'Avg. Result in 3 Months' },
    { num: 0, suffix: '', label: 'Diet Plans Given' },
    { num: 45, suffix: 'min', label: 'Video Consult, Every 7–10 Days' },
    { num: 7, suffix: '', label: 'New Workouts Every Week' },
    { num: 92, suffix: '%', label: 'Client Retention' },
  ];

  return (
    <section style={{ background: 'var(--paper)', padding: 'clamp(64px, 10vw, 120px) 0' }}>
      <div className="container grid-2" style={{ gap: 'clamp(32px, 6vw, 80px)' }}>
        <motion.div {...revealProps}>
          <h2 className="text-h2" style={{ color: 'var(--ink)' }}>
            The numbers a
            <br />
            <span className="serif-accent">diet plan</span> can't
            <br />
            give you.
          </h2>
          <p className="text-body" style={{ marginTop: '24px', maxWidth: '440px' }}>
            Every number here comes from habit tracking: clean days counted
            honestly, week after week. Most clients lose 4–8 kg in three months,
            and keep it off, because nothing here expires.
          </p>
          <PillLink href="#book" ghost style={{ marginTop: '32px' }}>
            Book a Call
          </PillLink>
        </motion.div>

        <div className="stats-grid">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   5. PROCESS / METHOD
   ============================================================ */

function ProcessSection() {
  const steps = [
    {
      num: '01',
      title: 'Build the Habits',
      desc: 'No diet plan to follow. We rebuild how you already eat, one habit at a time. Dal-chawal stays; the results come anyway.',
    },
    {
      num: '02',
      title: 'Talk It Through, 1:1',
      desc: 'A personal 45-minute video call every 7–10 days: travel weeks, eating out, what to order, what to skip. Strategy for your life, not a PDF.',
    },
    {
      num: '03',
      title: 'Track What Sticks',
      desc: 'Habit tracking, week after week: clean days, movement, consistency. That’s how clients average 4–8 kg in three months, and keep it off.',
    },
  ];

  return (
    <section id="method" className="section-pad" style={{ background: 'var(--paper-dim)' }}>
      <div className="container grid-2">
        <div>
          <motion.div {...revealProps}>
            <span className="text-caption" style={{ color: 'var(--ink-60)', display: 'block', marginBottom: '16px' }}>
              The Method
            </span>
            <h2 className="text-h2" style={{ color: 'var(--ink)', marginBottom: '20px' }}>
              A calm system for
              <br />
              changing how you <span className="serif-accent">eat</span>
            </h2>
            <p className="text-body" style={{ marginBottom: '40px', maxWidth: '440px' }}>
              Not a diet plan you'll start and quit. A habit practice built into
              your real life, the same one used with 100+ clients.
            </p>
          </motion.div>

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -100px 0px' }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              style={{
                paddingBottom: '28px',
                marginBottom: '28px',
                borderBottom: i < steps.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              <div style={{ display: 'flex', gap: '16px', alignItems: 'baseline', marginBottom: '10px' }}>
                <span style={{ fontFamily: 'Anton', fontSize: '15px', color: 'var(--ink-40)' }}>{step.num}</span>
                <h3 className="text-h3" style={{ color: 'var(--ink)' }}>{step.title}</h3>
              </div>
              <p className="text-body" style={{ paddingLeft: '34px' }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ borderRadius: '24px', overflow: 'hidden', height: 'clamp(400px, 50vw, 560px)' }}
        >
          <img
            src={images.process_1}
            alt="Coaching consultation"
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   5b. THE DIFFERENCE — the client's core positioning: most
   coaches hand over a diet plan; this is a coached practice.
   The only dark section on the page, so it reads as the thesis.
   ============================================================ */

const differences = [
  { them: 'A diet-plan PDF on day one', us: 'No diet plan: habits built into how you already eat' },
  { them: '"Did you follow the plan?" texts', us: 'A 45-minute personal video call every 7–10 days' },
  { them: 'One workout chart, repeated for a month', us: 'A fresh 45-minute workout video, every single day' },
  { them: 'Generic "avoid junk food" advice', us: 'Recipes, supplements, even what to pick on Blinkit' },
  { them: 'Results that end when the plan ends', us: 'Habits that stay long after coaching does' },
];

/* ============================================================
   5b. ON-DEMAND WORKOUTS
   ============================================================ */

function WorkoutLibrarySection() {
  return (
    <section style={{ background: 'var(--paper)', padding: 'clamp(64px, 10vw, 120px) 0' }}>
      <div className="container grid-2" style={{ gap: 'clamp(40px, 6vw, 80px)' }}>
        <motion.div {...revealProps}>
          <span className="text-caption" style={{ color: 'var(--ink-60)' }}>Your Video Gym</span>
          <h2 className="text-h2" style={{ color: 'var(--ink)', marginTop: '12px' }}>
            New workout every <span className="serif-accent">morning.</span>
          </h2>
          <p className="text-body" style={{ marginTop: '24px', maxWidth: '440px', lineHeight: 1.7 }}>
            45-minute videos, every single day. Home, gym, or traveling—doesn't matter. Your workout is already filmed, already designed, already tested on clients.
          </p>
          <p className="text-body" style={{ marginTop: '16px', maxWidth: '440px', lineHeight: 1.7, color: 'var(--ink-60)' }}>
            Progressive difficulty. Beginner modifications shown for every exercise. Week 1 to Week 12, the programming gets slightly harder. That's how you avoid plateaus.
          </p>
          <div style={{ marginTop: '32px' }}>
            <p className="text-caption" style={{ color: 'var(--ink-60)', marginBottom: '12px' }}>Examples this week:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <p style={{ fontFamily: 'Inter', fontSize: '13px', color: 'var(--ink)' }}>• Home Full-Body Strength (no equipment)</p>
              <p style={{ fontFamily: 'Inter', fontSize: '13px', color: 'var(--ink)' }}>• Travel-Friendly Cardio (20 min hotel room)</p>
              <p style={{ fontFamily: 'Inter', fontSize: '13px', color: 'var(--ink)' }}>• Gym Hypertrophy (heavy compounds)</p>
            </div>
          </div>
          <PillLink href="#book" ghost style={{ marginTop: '32px' }}>
            See Full Schedule
          </PillLink>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ borderRadius: '24px', overflow: 'hidden', height: 'clamp(400px, 50vw, 560px)' }}
        >
          <img
            src={images.workout_home}
            alt="Workout in progress"
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </motion.div>
      </div>
    </section>
  );
}

function DifferenceSection() {
  return (
    <section id="difference" className="section-pad" style={{ background: 'var(--ink)' }}>
      <div className="container">
        <motion.div {...revealProps} style={{ marginBottom: '48px' }}>
          <span className="text-caption" style={{ color: 'rgba(236,234,228,0.5)' }}>The Difference</span>
          <h2 className="text-h2" style={{ color: 'var(--paper)', marginTop: '12px' }}>
            Most coaches hand you a plan.
            <br />
            <span className="serif-accent">This is a practice.</span>
          </h2>
        </motion.div>

        <motion.div {...revealProps}>
          <div className="diff-header">
            <span className="text-caption" style={{ fontSize: '11px', color: 'rgba(236,234,228,0.4)' }}>
              The usual coaching
            </span>
            <span className="text-caption" style={{ fontSize: '11px', color: 'var(--paper)' }}>
              United By Movement
            </span>
          </div>

          {differences.map((d, i) => (
            <motion.div
              key={i}
              className="diff-row"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -60px 0px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <span style={{ color: 'rgba(236,234,228,0.35)', fontSize: '14px', flexShrink: 0, lineHeight: 1.6 }}>✕</span>
                <p style={{ fontFamily: 'Inter', fontSize: '15px', color: 'rgba(236,234,228,0.45)', lineHeight: 1.6 }}>
                  {d.them}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--paper)', fontSize: '14px', flexShrink: 0, lineHeight: 1.6 }}>✓</span>
                <p style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '15px', color: 'var(--paper-90)', lineHeight: 1.6 }}>
                  {d.us}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div {...revealProps} style={{ marginTop: '40px' }}>
          <PillLink href="#programs" light>
            See the Programs
          </PillLink>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   6. MYTH / TRUTH
   ============================================================ */

const mythTruths = [
  { myth: 'You need a diet plan to lose fat', truth: "Plans end, and results end with them. Habits don't", tag: 'MYTH', color: 'bad' },
  { myth: 'Roti is worse than bread for fat loss', truth: 'Portion and count matter more than the carb source', tag: 'MYTH', color: 'bad' },
  { myth: 'You need 10,000 steps in one go', truth: '3 walks of 3,300 steps works identically', tag: 'TRUTH', color: 'good' },
  { myth: 'Paneer is off-limits on a cut', truth: "It's one of the best high-protein Indian foods available", tag: 'TRUTH', color: 'good' },
  { myth: 'Cheat days ruin your progress', truth: 'One meal ≠ one week. The math survives it', tag: 'TRUTH', color: 'good' },
  { myth: 'Fat loss requires giving up dal-chawal', truth: 'It requires counting it, not quitting it', tag: 'TRUTH', color: 'good' },
];

function MythTruthSection() {
  return (
    <section style={{ background: 'var(--paper)', padding: 'clamp(64px, 10vw, 140px) 0' }}>
      <motion.div {...revealProps} className="container" style={{ marginBottom: '48px' }}>
        <span className="text-caption" style={{ color: 'var(--ink-60)' }}>Myth vs. Truth</span>
        <h2 className="text-h2" style={{ color: 'var(--ink)', marginTop: '12px' }}>
          What the internet gets <span className="serif-accent">wrong</span>
          <br />
          about fat loss
        </h2>
      </motion.div>

      <div className="myth-scroll">
        {mythTruths.map((card, i) => (
          <motion.div
            key={i}
            className="myth-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
            style={{
              background: 'var(--paper-dim)',
              borderRadius: '12px',
              padding: '28px',
              borderTop: `3px solid var(--${card.color})`,
            }}
          >
            <span
              style={{
                fontFamily: 'Inter',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '2px',
                color: `var(--${card.color})`,
                background: card.color === 'bad' ? 'rgba(168,69,60,0.10)' : 'rgba(75,94,66,0.10)',
                padding: '4px 10px',
                borderRadius: '4px',
              }}
            >
              {card.tag}
            </span>
            <p
              style={{
                fontFamily: 'Inter',
                fontWeight: 600,
                fontSize: '16px',
                color: 'var(--ink)',
                marginTop: '16px',
                lineHeight: 1.4,
              }}
            >
              {card.myth}
            </p>
            <div style={{ width: '24px', height: '1px', background: 'var(--border-strong)', margin: '16px 0' }} />
            <p className="text-body" style={{ fontSize: '14px' }}>{card.truth}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   7. WHO THIS IS NOT FOR
   ============================================================ */

const notForCards = [
  {
    title: "Looking for quick-fix results",
    desc: "You want 15 kg gone in 30 days. Coaching doesn’t do that—fast fat loss means muscle loss + inevitable rebound. We optimize for sustainable, which takes longer. But it sticks."
  },
  {
    title: "Unwilling to track",
    desc: "You want results without measuring anything. This program requires honest habit tracking—weekly. That’s the only way to know what’s working. If tracking sounds annoying, this isn’t for you yet."
  },
  {
    title: "Looking for a meal plan",
    desc: "You want someone to tell you exactly what to eat every day. A PDF. Zero choices. That’s the opposite of what we do. We teach you to make decisions so you don’t need a PDF."
  },
  {
    title: "Exercise-only expecting",
    desc: "You think 1 hour at the gym means you can eat whatever you want. Fat loss is 80% food behavior + 20% movement. If you won’t change how you eat, don’t waste both our time."
  },
  {
    title: "Highly skeptical of coaching",
    desc: "You think coaching is hype. Coaching is a real modality. The accountability + strategy + habit building = the results. Without it, programs don’t work. That’s data, not opinion."
  },
  {
    title: "On a super tight budget",
    desc: "If you’re in the \"can’t spend more than ₹1500/month\" situation—I respect that. But coaching isn’t luxury. Wait until the budget is there. Save for it."
  },
];

function WhoThisIsNotForSection() {
  return (
    <section id="fit-check" className="section-pad" style={{ background: "var(--paper-dim)" }}>
      <div className="container" style={{ maxWidth: "900px" }}>
        <motion.div {...revealProps} style={{ marginBottom: "56px" }}>
          <span className="text-caption" style={{ color: "var(--ink-60)" }}>Before You Apply</span>
          <h2 className="text-h2" style={{ color: "var(--ink)", marginTop: "12px" }}>
            Who this program is <span className="serif-accent">NOT</span> for
          </h2>
          <p className="text-body" style={{ marginTop: "16px", maxWidth: "620px" }}>
            Real talk: if you recognize yourself below, a different coach will serve you better. No shame. Just honesty.
          </p>
        </motion.div>

        <motion.div {...revealProps} style={{ marginBottom: "56px" }}>
          {notForCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -40px 0px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              style={{
                paddingBottom: "28px",
                marginBottom: "28px",
                borderBottom: i < notForCards.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <span style={{ color: "var(--bad)", fontSize: "16px", fontWeight: "bold", flexShrink: 0, lineHeight: 1.6 }}>✕</span>
                <div>
                  <h3 style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "15px", color: "var(--ink)", marginBottom: "6px" }}>
                    {card.title}
                  </h3>
                  <p style={{ fontFamily: "Inter", fontSize: "14px", color: "var(--ink-60)", lineHeight: 1.6 }}>
                    {card.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div {...revealProps} style={{ background: "var(--paper)", padding: "36px 32px", borderRadius: "16px" }}>
          <h3 style={{ fontFamily: "Anton", fontSize: "18px", color: "var(--ink)", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.02em" }}>
            If you didn’t see yourself above, apply.
          </h3>
          <p className="text-body" style={{ marginBottom: "24px" }}>
            Coaching works for people tired of diet plans, willing to commit 90+ days, honest about tracking, realistic about timelines, and genuinely wanting accountability.
          </p>
          <PillLink href="#book">
            Apply for Coaching
          </PillLink>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   8. GALLERY
   ============================================================ */

const fallbackSlides = [
  { id: 'f1', url: images.hero, caption: '', width: 420 },
  { id: 'f2', url: images.food_dal, caption: '', width: 300 },
  { id: 'f3', url: images.workout_home, caption: '', width: 340 },
  { id: 'f4', url: images.food_street, caption: '', width: 420 },
  { id: 'f5', url: images.workout_2, caption: '', width: 300 },
  { id: 'f6', url: images.gallery_3, caption: '', width: 380 },
  { id: 'f7', url: images.method_2, caption: '', width: 340 },
  { id: 'f8', url: images.method_1, caption: '', width: 300 },
];

/* Below this many photos, the loop-scroll trick (rendering the list
   twice) never scrolls far enough to hide the repeat — every photo
   just visibly appears twice on screen, which looks like a bug. */
const GALLERY_LOOP_MIN = 6;

function GallerySection() {
  const [slides, setSlides] = useState(fallbackSlides);
  useEffect(() => {
    fetchGallery()
      .then((rows) => rows.length && setSlides(rows))
      .catch(() => {});
  }, []);

  const trackRef = useRef(null);
  const drag = useRef({ down: false, startX: 0, startScroll: 0 });
  const paused = useRef(false);
  const pauseTimer = useRef(null);

  const pauseFor = (ms) => {
    paused.current = true;
    clearTimeout(pauseTimer.current);
    pauseTimer.current = setTimeout(() => {
      paused.current = false;
    }, ms);
  };

  /* Slow continuous drift; slides are rendered twice, so wrapping
     scrollLeft at the halfway point loops seamlessly. Only worth doing
     once there are enough photos that the repeat scrolls off-screen —
     with only a handful, duplicating the list just makes every photo
     visibly appear twice at once, which reads as a bug, not a loop. */
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (slides.length < GALLERY_LOOP_MIN) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf;
    const step = () => {
      if (!paused.current && !drag.current.down) {
        const half = el.scrollWidth / 2;
        el.scrollLeft += 0.6;
        if (half > 0 && el.scrollLeft >= half) el.scrollLeft -= half;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(pauseTimer.current);
    };
  }, [slides]);

  const scrollByDir = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    pauseFor(1800);
    el.scrollBy({ left: dir * Math.min(600, el.clientWidth * 0.8), behavior: 'smooth' });
  };

  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse') return;
    drag.current = { down: true, startX: e.clientX, startScroll: trackRef.current.scrollLeft };
  };
  const onPointerMove = (e) => {
    if (!drag.current.down) return;
    trackRef.current.scrollLeft = drag.current.startScroll - (e.clientX - drag.current.startX);
  };
  const endDrag = () => {
    drag.current.down = false;
  };

  return (
    <section style={{ background: 'var(--paper)', padding: 'clamp(64px, 10vw, 120px) 0' }}>
      <div
        className="container"
        style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '24px', marginBottom: '40px' }}
      >
        <motion.div {...revealProps}>
          <span className="text-caption" style={{ color: 'var(--ink-60)' }}>Real Results</span>
          <h2 className="text-h2" style={{ color: 'var(--ink)', marginTop: '12px' }}>
            Transformations,
            <br />
            <span className="serif-accent">before & after.</span>
          </h2>
        </motion.div>
        <motion.div {...revealProps} className="desktop-only" style={{ gap: '10px' }}>
          <button className="gallery-arrow" aria-label="Scroll gallery left" onClick={() => scrollByDir(-1)}>
            ←
          </button>
          <button className="gallery-arrow" aria-label="Scroll gallery right" onClick={() => scrollByDir(1)}>
            →
          </button>
        </motion.div>
      </div>

      <motion.div
        {...revealProps}
        ref={trackRef}
        className="slide-gallery"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={() => {
          endDrag();
          paused.current = false;
        }}
        onMouseEnter={() => {
          paused.current = true;
        }}
        onTouchStart={() => pauseFor(4000)}
        onWheel={() => pauseFor(2500)}
      >
        {(slides.length >= GALLERY_LOOP_MIN ? [...slides, ...slides] : slides).map((slide, i) => (
          <div
            key={`${slide.id}-${i}`}
            className="slide-cell"
            aria-hidden={i >= slides.length ? 'true' : undefined}
          >
            <img src={slide.url} alt={slide.caption || 'Client transformation before & after'} loading="lazy" />
            {slide.caption ? (
              <div className="slide-caption">
                <span className="text-caption" style={{ fontSize: '10px', color: 'var(--ink)' }}>{slide.caption}</span>
              </div>
            ) : null}
          </div>
        ))}
      </motion.div>
    </section>
  );
}

/* ============================================================
   9. TESTIMONIALS — AUTO-SCROLL (two tracks, opposite directions)
   ============================================================ */

/* No stock photos here on purpose — real client photos come from the
   admin Testimonials tab. Until Lakhan uploads one, the card falls
   back to a plain initial avatar rather than a fake stock face. */
const testimonialsSetA = [
  { name: 'Rohit K.', condition: 'Thyroid Managed', result: '14 kg lost in 7 months', quote: 'You always make sure to convey how weight loss can be achieved with simple discipline, not restriction.', img: '' },
  { name: 'Ananya P.', condition: 'PCOS Improved', result: 'Cycle regularized, 9 kg lost', quote: "First coach who didn't ask me to give up rice. Turns out I didn't need to.", img: '' },
  { name: 'Vikram S.', condition: 'Pre-Diabetes Reversed', result: 'HbA1c normalized', quote: 'The Odyssey post about the Lotus-Eaters is literally how I think about cheat meals now.', img: '' },
];

const testimonialsSetB = [
  { name: 'Priya M.', condition: 'All-or-Nothing Mindset Fixed', result: '11 kg, sustained 8 months', quote: 'I stopped treating one bad meal like a failed week. That mindset shift did more than any meal plan.', img: '' },
  { name: 'Karan D.', condition: 'Desk-Job Weight Loss', result: '16 kg in 9 months', quote: '3 walks of 3,300 steps instead of one long walk. Sounds small, changed everything.', img: '' },
  { name: 'Meera J.', condition: 'Post-Pregnancy Recomposition', result: '13 kg, energy restored', quote: 'Real dal-chawal, real portions, real math. No fads. It actually worked.', img: '' },
];

function Avatar({ name, img, size = 44 }) {
  const [broken, setBroken] = useState(false);
  const initial = (name || '?').trim().charAt(0).toUpperCase();
  const showPhoto = img && !broken;
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        flexShrink: 0,
        overflow: 'hidden',
        background: 'var(--paper-dim)',
        border: '1px solid var(--border-strong)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {showPhoto ? (
        <img
          src={img}
          alt={name}
          loading="lazy"
          onError={() => setBroken(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <span style={{ fontFamily: 'Anton', fontSize: `${size * 0.4}px`, color: 'var(--ink-40)' }}>{initial}</span>
      )}
    </div>
  );
}

function TestimonialCard({ name, condition, result, quote, img }) {
  return (
    <div
      className="card-hover"
      style={{
        flexShrink: 0,
        width: 'clamp(280px, 80vw, 380px)',
        background: 'var(--paper)',
        borderRadius: '20px',
        padding: '32px',
        border: '1.5px solid var(--border-strong)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <span
        className="text-caption"
        style={{
          fontSize: '11px',
          color: 'var(--ink)',
          background: 'var(--paper-dim)',
          padding: '6px 14px',
          borderRadius: '8px',
          fontWeight: 600,
          display: 'inline-block',
        }}
      >
        {condition}
      </span>
      <p style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '15px', color: 'var(--ink)', margin: '20px 0', lineHeight: 1.6 }}>
        "{quote}"
      </p>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          borderTop: '1px solid var(--border)',
          paddingTop: '18px',
        }}
      >
        <Avatar name={name} img={img} />
        <div>
          <p style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '13px', color: 'var(--ink)' }}>{name}</p>
          <p style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '11px', color: 'var(--ink-60)', marginTop: '2px' }}>{result}</p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   8b. INSTAGRAM HIGHLIGHTS
   ============================================================ */

const instagramHighlights = [
  {
    id: 'ig1',
    caption: "You don't need to \"earn\" your food. Food = fuel. Exercise = building. They're not a zero-sum game.",
    likes: 432,
    url: images.food_dal,
  },
  {
    id: 'ig2',
    caption: "Priya stopped treating one bad meal like a failed week. That single mindset shift did more than any diet plan ever could. 11 kg later, that's still the reason it stuck.",
    likes: 518,
    url: images.workout_home,
  },
  {
    id: 'ig3',
    caption: "Your 10,000 steps doesn't need to be one 2-hour walk. Three walks of 3,300 steps? That's the same math, much easier life.",
    likes: 387,
    url: images.workout_2,
  },
  {
    id: 'ig4',
    caption: "Dal-chawal fuels fat loss too. You don't get permission when you hit your protein goal. You just eat dal. No drama. No guilt.",
    likes: 629,
    url: images.food_street,
  },
  {
    id: 'ig5',
    caption: "Week 7 check-in: clients averaging 2–3 kg loss so far. Not rushed. Not unsustainable. Just consistent.",
    likes: 445,
    url: images.process_1,
  },
];

function InstagramHighlightsSection() {
  return (
    <section style={{ background: 'var(--paper-dim)', padding: 'clamp(64px, 10vw, 120px) 0' }}>
      <div className="container grid-2" style={{ gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center' }}>
        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ borderRadius: '24px', overflow: 'hidden', height: 'clamp(400px, 50vw, 560px)' }}
        >
          <img
            src={images.food_dal}
            alt="Instagram post"
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </motion.div>

        <motion.div {...revealProps}>
          <span className="text-caption" style={{ color: 'var(--ink-60)' }}>The Daily Conversation</span>
          <h2 className="text-h2" style={{ color: 'var(--ink)', marginTop: '12px' }}>
            Where the real <span className="serif-accent">work happens.</span>
          </h2>
          <p className="text-body" style={{ marginTop: '24px', maxWidth: '440px', lineHeight: 1.7 }}>
            @functionalcoach101 is where clients post wins, ask questions, and stay accountable. 500+ people following. New posts every day.
          </p>
          <p className="text-body" style={{ marginTop: '16px', maxWidth: '440px', lineHeight: 1.7, color: 'var(--ink-60)' }}>
            You'll see real transformations, myth-busting threads, strategy posts about travel eating + office snacking, and weekly accountability check-ins. Not curated. Not perfect. Real.
          </p>
          <div style={{ marginTop: '32px' }}>
            <p className="text-caption" style={{ color: 'var(--ink-60)', marginBottom: '12px' }}>Recent topics:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <p style={{ fontFamily: 'Inter', fontSize: '13px', color: 'var(--ink)' }}>• Food isn't a debt you pay off at the gym</p>
              <p style={{ fontFamily: 'Inter', fontSize: '13px', color: 'var(--ink)' }}>• 10k steps can be three walks of 3,300</p>
              <p style={{ fontFamily: 'Inter', fontSize: '13px', color: 'var(--ink)' }}>• Why diet plans end and results end with them</p>
            </div>
          </div>
          <a
            href="https://instagram.com/functionalcoach101"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill"
            style={{ marginTop: '32px', display: 'inline-flex' }}
          >
            Follow @functionalcoach101
            <span className="btn-arrow">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialsAutoScroll() {
  const [setA, setSetA] = useState(testimonialsSetA);
  const [setB, setSetB] = useState(testimonialsSetB);

  /* Always applies whatever the database actually has, including empty —
     the hardcoded arrays are only ever the initial state, shown before
     this fetch resolves (or if it fails outright). Previously this only
     overwrote a track when it had rows, so deleting everything in the
     admin (or emptying just one track) left the old hardcoded
     testimonials stuck on screen forever. */
  useEffect(() => {
    fetchTestimonials()
      .then((rows) => {
        const a = rows.filter((r) => r.track !== 'b');
        const b = rows.filter((r) => r.track === 'b');
        setSetA(a);
        setSetB(b.length ? b : a);
      })
      .catch(() => {});
  }, []);

  return (
    <section id="results" style={{ background: 'var(--paper-dim)', padding: 'clamp(64px, 10vw, 120px) 0', overflow: 'hidden' }}>
      <motion.div {...revealProps} className="container" style={{ marginBottom: '48px' }}>
        <span className="text-caption" style={{ color: 'var(--ink-60)' }}>Real Results</span>
        <h2 className="text-h2" style={{ color: 'var(--ink)', marginTop: '12px' }}>
          Not before/afters.
          <br />
          <span className="serif-accent">Health markers.</span>
        </h2>
      </motion.div>

      <div style={{ overflow: 'hidden', marginBottom: '16px' }}>
        <div className="testimonial-track-ltr">
          {[...setA, ...setA].map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>
      </div>

      <div style={{ overflow: 'hidden' }}>
        <div className="testimonial-track-rtl">
          {[...setB, ...setB].map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   10. PROGRAMS — light cards + black pill CTAs, per reference
   ============================================================ */

const programs = [
  {
    name: 'Foundation',
    duration: '3 Months',
    desc: 'Rebuild your everyday eating habits, and watch the first 4–8 kg go.',
    features: ['Personal 45-minute video consulting call every 7–10 days', 'On-demand WhatsApp support (Mon-Fri)', 'Weekly habit tracking dashboard', 'A fresh 45-min workout video daily', '100+ workouts to browse anytime', 'Habit streak tracking & visualization', 'Weekly habit score & accountability', 'Average fat loss: 4–8 kg in 90 days'],
    highlight: false,
  },
  {
    name: 'Transformation',
    duration: '6 Months',
    desc: "The full practice: the program behind every result you've read above.",
    features: ['Everything in Foundation', 'Customized home or gym workout plans', '50+ Indian recipe database (dal & paneer hacks)', 'Supplement buying guide & product recs', 'Unlimited WhatsApp access', 'Travel & eating-out strategy calls', 'Restaurant ordering guide for chains + local spots', 'Monthly deep-dive strategy calls', 'Planned weekly live group session (Sundays 7pm IST)', 'Monthly posture correction & form review', 'Private community access with other clients', 'Average fat loss: 6–12 kg in 6 months'],
    highlight: true,
  },
  {
    name: 'Sustained',
    duration: '12 Months',
    desc: 'For deeper lifestyle change that needs longer, careful pacing.',
    features: ['Everything in Transformation', 'Quarterly 60-minute life review calls', 'Seasonal strategy adjustments (monsoon, holidays)', 'Sleep & stress optimization coaching', 'Blinkit/Dunzo cart audits & grocery lists', 'Bi-weekly posture correction sessions', 'Injury prevention & movement optimization', 'Performance tracking every 3 months', 'Priority WhatsApp access', 'Exclusive 1:1 cohort (10 people max)', 'Lifetime workout library access (future videos included)', 'Lifetime community access (stay connected forever)', 'Average fat loss: 12–20+ kg sustained'],
    highlight: false,
  },
  {
    name: 'One-Time Plan',
    duration: 'Pay Once',
    desc: 'Not looking for a coaching commitment? Pay once, keep it forever.',
    features: [
      'One-time consultation call',
      'Nutrition plan built around your lifestyle, not a generic diet',
      'Workout plan tailored to your goals',
      'No subscription, no lock-in, ever',
    ],
    highlight: false,
    price: '₹1,999',
  },
];

function ProgramsSection() {
  return (
    <section id="programs" style={{ background: 'var(--paper)', padding: 'clamp(64px, 10vw, 140px) 0' }}>
      <div className="container">
        <motion.div {...revealProps} style={{ marginBottom: '56px' }}>
          <span className="text-caption" style={{ color: 'var(--ink-60)' }}>Work With Lakhan</span>
          <h2 className="text-h2" style={{ color: 'var(--ink)', marginTop: '12px' }}>
            Choose your <span className="serif-accent">starting point</span>
          </h2>
        </motion.div>

        <motion.div {...revealProps} className="programs-grid">
          {programs.map((plan, i) => (
            <div
              key={i}
              className="card-hover"
              style={{
                background: 'var(--paper)',
                padding: 'clamp(32px, 4vw, 48px)',
                display: 'flex',
                flexDirection: 'column',
                border: '1.5px solid var(--border-strong)',
                borderRadius: '20px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p className="text-caption" style={{ color: 'var(--ink-60)' }}>{plan.duration}</p>
                {plan.highlight && (
                  <span
                    className="text-caption"
                    style={{ fontSize: '10px', color: 'var(--paper)', background: 'var(--ink)', padding: '5px 12px', borderRadius: '999px' }}
                  >
                    Most Chosen
                  </span>
                )}
              </div>
              <h3
                style={{
                  fontFamily: 'Anton',
                  fontSize: '26px',
                  color: 'var(--ink)',
                  margin: '14px 0 16px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.02em',
                }}
              >
                {plan.name}
              </h3>
              {plan.price && (
                <p style={{ marginBottom: '14px' }}>
                  <span style={{ fontFamily: 'Anton', fontSize: '24px', color: 'var(--ink)' }}>{plan.price}</span>
                  <span style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '12px', color: 'var(--ink-60)', marginLeft: '8px' }}>
                    starting price · only
                  </span>
                </p>
              )}
              <p style={{ fontFamily: 'Inter', fontSize: '14px', color: 'var(--ink-60)', lineHeight: 1.6, marginBottom: '24px' }}>
                {plan.desc}
              </p>
              <div style={{ flexGrow: 1, marginBottom: '28px' }}>
                {plan.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <span style={{ color: 'var(--ink)', fontSize: '14px' }}>✓</span>
                    <span style={{ fontFamily: 'Inter', fontSize: '13px', color: 'var(--ink-60)' }}>{f}</span>
                  </div>
                ))}
              </div>
              <PillLink href="#book" ghost={!plan.highlight} style={{ justifyContent: 'center' }}>
                Book a Call
              </PillLink>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

/* ============================================================
   11. APPLICATION / ACTION
   ============================================================ */

/* 16px minimum font — smaller input text triggers auto-zoom on iOS Safari */
const bookInputStyle = {
  fontFamily: 'Inter',
  fontSize: '16px',
  color: 'var(--ink)',
  background: 'var(--paper)',
  border: '1.5px solid var(--border-strong)',
  padding: '14px 18px',
  borderRadius: '12px',
  outline: 'none',
  width: '100%',
  transition: 'all 200ms cubic-bezier(0.22, 1, 0.36, 1)',
};

function BookSection() {
  /* Not persisted to localStorage on purpose: whether someone can submit
     again is decided by the backend (addLead silently no-ops while their
     last enquiry is still open, and quietly accepts a new one the moment
     Lakhan marks the old one done) — never by a permanent flag on their
     browser. The person never sees or needs to know which case applied. */
  const [booked, setBooked] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const name = form.name.trim();
    const phone = form.phone.trim();
    if (!name || phone.replace(/\D/g, '').length < 8) {
      setError('Please add your name and a valid phone number.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      await addLead(name, phone, form.email.trim());
      setBooked(true);
    } catch {
      setError("That didn't go through. Check your internet and try again.");
    }
    setBusy(false);
  };

  return (
    <section id="book" className="section-pad" style={{ background: 'var(--paper-dim)' }}>
      <div className="container" style={{ maxWidth: '640px', textAlign: 'center' }}>
        <motion.div {...revealProps}>
          <span className="text-caption" style={{ color: 'var(--ink-60)' }}>Let's Talk</span>
          <h2 className="text-h2" style={{ color: 'var(--ink)', margin: '16px 0 20px' }}>
            Book your <span className="serif-accent">30-minute call.</span>
          </h2>
          <p className="text-body" style={{ marginBottom: '40px', maxWidth: '460px', marginLeft: 'auto', marginRight: 'auto' }}>
            Leave your details. Lakhan will personally reach out to schedule your
            call. No spam, no salesy follow-ups.
          </p>
        </motion.div>

        {booked ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: 'var(--paper)',
              border: '1.5px solid var(--ink)',
              borderRadius: '24px',
              padding: '48px 28px',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'var(--ink)',
                color: 'var(--paper)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                margin: '0 auto 20px',
              }}
            >
              ✓
            </div>
            <p style={{ fontFamily: 'Anton', fontSize: '26px', color: 'var(--ink)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
              Booking done.
            </p>
            <p className="text-body" style={{ fontSize: '15px', maxWidth: '380px', margin: '0 auto' }}>
              Your details are with Lakhan. He'll personally call you to set up
              your session, usually within a day.
            </p>
          </motion.div>
        ) : (
          <motion.form
            {...revealProps}
            onSubmit={submit}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}
          >
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your name"
              required
              style={bookInputStyle}
              aria-label="Your name"
            />
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Phone / WhatsApp number"
              required
              style={bookInputStyle}
              aria-label="Phone number"
            />
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email (optional)"
              style={bookInputStyle}
              aria-label="Email"
            />
            {error && (
              <p style={{ fontFamily: 'Inter', fontSize: '13px', color: 'var(--bad)', textAlign: 'center' }}>{error}</p>
            )}
            <button type="submit" className="btn-pill" style={{ justifyContent: 'center', marginTop: '8px' }} disabled={busy}>
              {busy ? 'Sending…' : 'Book my call'}
              <span className="btn-arrow">→</span>
            </button>
          </motion.form>
        )}
      </div>
    </section>
  );
}

/* ============================================================
   12. FAQ
   ============================================================ */

const fallbackFaqs = [
  {
    q: "Why don't you give diet plans?",
    a: "Because a diet plan is something you start and stop, and when it stops, the results stop with it. We rebuild your everyday eating habits instead, so there's nothing to quit and nothing to expire.",
  },
  {
    q: 'Do I have to give up dal-chawal / rice / roti?',
    a: 'No. The habits are built around the food you already eat: real Indian food, portioned and timed sensibly, not replaced with a Western meal plan.',
  },
  {
    q: 'What results can I realistically expect?',
    a: 'Most clients lose 4–8 kg in the 3-month program: through habit changes that hold, not water-weight crashes. Slower than a fad, permanent unlike one.',
  },
  {
    q: 'What about workouts: no gym, no time?',
    a: "You get a fresh 45-minute on-demand workout video every day: strength, cardio, flexibility, and mobility, doable at home on your schedule. Prefer the gym? You get a gym plan instead.",
  },
  {
    q: 'What if I travel a lot or eat out often?',
    a: "That's exactly what the 45-minute video consults are for: travel-week strategy, what to order out, what to skip. The system flexes, it doesn't break.",
  },
  {
    q: 'How is this different from other coaches?',
    a: "Most coaching is a plan handed over and a 'did you follow it?' text. This is a personal video call every 7–10 days, weekly habit tracking, daily workout videos, and guidance down to recipes and supplements.",
  },
];

function FAQItem({ q, a, open, onToggle }) {
  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      <button
        onClick={onToggle}
        aria-expanded={open}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '24px 0',
          textAlign: 'left',
        }}
      >
        <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 'clamp(15px, 1.6vw, 17px)', color: 'var(--ink)' }}>
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ fontFamily: 'Instrument Serif', fontSize: '26px', color: 'var(--ink)', lineHeight: 1, flexShrink: 0 }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p className="text-body" style={{ paddingBottom: '24px', maxWidth: '620px' }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);
  const [items, setItems] = useState(fallbackFaqs);

  useEffect(() => {
    fetchFaqs()
      .then((rows) => rows.length && setItems(rows))
      .catch(() => {});
  }, []);

  return (
    <section id="faq" style={{ background: 'var(--paper)', padding: 'clamp(64px, 10vw, 140px) 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <motion.div {...revealProps} style={{ marginBottom: '32px' }}>
          <span className="text-caption" style={{ color: 'var(--ink-60)' }}>Frequently Asked</span>
          <h2 className="text-h2" style={{ color: 'var(--ink)', marginTop: '12px' }}>
            Honest answers, <span className="serif-accent">upfront</span>
          </h2>
        </motion.div>
        <motion.div {...revealProps} style={{ borderTop: '1px solid var(--border)' }}>
          {items.map((faq, i) => (
            <FAQItem
              key={faq.id || i}
              q={faq.q}
              a={faq.a}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   13. FINAL CTA
   ============================================================ */

function FinalCTASection() {
  return (
    <section
      style={{
        background: 'var(--ink)',
        padding: 'clamp(80px, 12vw, 180px) clamp(20px, 6vw, 64px)',
        textAlign: 'center',
      }}
    >
      <motion.div {...revealProps} style={{ maxWidth: '760px', margin: '0 auto' }}>
        <p className="text-accent" style={{ color: 'var(--paper-90)', fontSize: '19px', marginBottom: '20px' }}>
          No diet plan. No expiry date. Just habits that hold.
        </p>
        <h2 className="text-display" style={{ color: 'var(--paper)', marginBottom: '40px' }}>
          Ready to stop <span className="serif-accent">guessing?</span>
        </h2>
        <PillLink href="#book" light style={{ padding: '18px 36px' }}>
          Book a Call
        </PillLink>
      </motion.div>
    </section>
  );
}

/* ============================================================
   14. FOOTER — light, with the giant faded serif wordmark
   exactly like the reference's "Dominic" treatment
   ============================================================ */

function FooterColumn({ title, links }) {
  return (
    <div>
      <p className="text-caption" style={{ color: 'var(--ink-40)', marginBottom: '16px', fontSize: '11px' }}>
        {title}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            onClick={l.onClick}
            target={l.href?.startsWith('http') ? '_blank' : undefined}
            rel={l.href?.startsWith('http') ? 'noreferrer' : undefined}
            style={{ fontFamily: 'Inter', fontSize: '14px', color: 'var(--ink)', textDecoration: 'none', opacity: 0.7 }}
          >
            {l.label}
          </a>
        ))}
      </div>
    </div>
  );
}

function PrivacyModal({ onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        background: 'rgba(22,22,20,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--paper)',
          borderRadius: '20px',
          maxWidth: '520px',
          width: '100%',
          maxHeight: '85vh',
          overflowY: 'auto',
          padding: 'clamp(28px, 4vw, 40px)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <p style={{ fontFamily: 'Anton', fontSize: '22px', textTransform: 'uppercase', letterSpacing: '0.02em', color: 'var(--ink)' }}>
            Privacy, in plain language
          </p>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '22px', color: 'var(--ink-60)', lineHeight: 1, flexShrink: 0, marginLeft: '12px' }}
          >
            ✕
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <p className="text-body" style={{ fontSize: '14px' }}>
            When you book a call, we ask for your name, phone number, and
            (optionally) your email. That's it, that's the whole form. It's
            used for one thing: so Lakhan can personally reach out and set up
            your session.
          </p>
          <p className="text-body" style={{ fontSize: '14px' }}>
            We don't sell it, rent it, or share it with anyone else. It isn't
            used for ads. We also log anonymous visit counts (how many
            people viewed the site, roughly when) so Lakhan can see if the
            page is working, nothing tied to who you are.
          </p>
          <p className="text-body" style={{ fontSize: '14px' }}>
            Want your details removed? Message Lakhan directly and he'll
            delete them, no forms, no waiting.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  return (
    <footer style={{ background: 'var(--paper)', padding: 'clamp(48px, 6vw, 80px) 0 0', borderTop: '1px solid var(--border)' }}>
      <AnimatePresence>{privacyOpen && <PrivacyModal onClose={() => setPrivacyOpen(false)} />}</AnimatePresence>
      <div className="container">
        <div
          className="footer-grid"
          style={{ paddingBottom: '48px', borderBottom: '1px solid var(--border)' }}
        >
          <div>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--ink)' }} />
              <span style={{ fontFamily: 'Anton', fontSize: '18px', color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Lakhan
              </span>
            </span>
            <p style={{ fontFamily: 'Inter', fontSize: '13px', color: 'var(--ink-60)', marginTop: '10px' }}>
              The Weight Loss Coach · United By Movement
            </p>
            <div style={{ marginTop: '20px' }}>
              <PillLink href="#book">Book a Call</PillLink>
            </div>
          </div>
          <FooterColumn
            title="Menu"
            links={[
              { label: 'Method', href: '#method' },
              { label: 'Results', href: '#results' },
              { label: 'Programs', href: '#programs' },
              { label: 'Fit Check', href: '#fit-check' },
            ]}
          />
          <FooterColumn
            title="Navigation"
            links={[
              { label: 'About', href: '#top' },
              { label: 'Book a Call', href: '#book' },
              { label: 'FAQ', href: '#faq' },
              {
                label: 'Privacy',
                href: '#',
                onClick: (e) => {
                  e.preventDefault();
                  setPrivacyOpen(true);
                },
              },
            ]}
          />
          <FooterColumn
            title="Social"
            links={[
              { label: 'Instagram', href: 'https://instagram.com/functionalcoach101' },
              { label: 'WhatsApp', href: '#book' },
            ]}
          />
        </div>
        <p
          style={{
            textAlign: 'center',
            fontFamily: 'Inter',
            fontSize: '12px',
            color: 'var(--ink-40)',
            padding: '24px 0',
          }}
        >
          © 2026 Lakhan Ahuja · United By Movement
        </p>
      </div>

      {/* Giant faded wordmark — the reference's "Dominic" footer treatment */}
      <div style={{ overflow: 'hidden', textAlign: 'center' }}>
        <p
          aria-hidden="true"
          style={{
            fontFamily: 'Instrument Serif',
            fontWeight: 400,
            fontSize: 'clamp(4.5rem, 19vw, 13rem)',
            color: 'rgba(22, 22, 20, 0.07)',
            lineHeight: 0.8,
            marginBottom: '-2vw',
            whiteSpace: 'nowrap',
          }}
        >
          Lakhan
        </p>
      </div>
    </footer>
  );
}

/* ============================================================
   15. STICKY MOBILE CTA
   ============================================================ */

function StickyMobileCTA() {
  const isMobile = useIsMobile(768);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const scrollingUp = y < lastY;
      setVisible(y > 600 && scrollingUp);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {isMobile && visible && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 80,
            background: 'var(--paper)',
            borderTop: '1px solid var(--border)',
            padding: '12px 16px calc(12px + env(safe-area-inset-bottom))',
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
          }}
        >
          <a href="#book" className="btn-pill" style={{ flex: 1, justifyContent: 'center', padding: '16px 24px' }}>
            Book a Call
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ============================================================
   ADMIN — password-protected control panel at #/admin.
   Built for a non-technical owner: plain language, previews,
   confirmations before anything destructive, visible feedback
   after every action.
   ============================================================ */

/* SHA-256 of the admin password — the plaintext never ships in the bundle */
const ADMIN_PASS_HASH = 'eaa5385c07c06720a8d91368e981ab9bced89cbe1b776ccd87800ea6a546ea53';

/* Shrink an uploaded photo in the browser so every gallery image is a
   consistent, fast-loading size before it's stored. */
function compressImageFile(file, maxDim = 1200) {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      let dataUrl = '';
      for (const quality of [0.8, 0.65, 0.5]) {
        dataUrl = canvas.toDataURL('image/jpeg', quality);
        if (dataUrl.length < 700000) break;
      }
      dataUrl ? resolve(dataUrl) : reject(new Error('compress failed'));
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('not an image'));
    };
    img.src = objectUrl;
  });
}

function AdminField({ label, hint, children }) {
  return (
    <label style={{ display: 'block' }}>
      <span className="text-caption" style={{ fontSize: '10px', color: 'var(--ink-60)', display: 'block', marginBottom: '6px' }}>
        {label}
      </span>
      {children}
      {hint && (
        <span style={{ display: 'block', fontFamily: 'Inter', fontSize: '12px', color: 'var(--ink-40)', marginTop: '5px', lineHeight: 1.5 }}>
          {hint}
        </span>
      )}
    </label>
  );
}

function ImgPreview({ url, size = 120 }) {
  const [broken, setBroken] = useState(false);
  useEffect(() => setBroken(false), [url]);
  if (!url) return null;
  if (broken) {
    return (
      <p style={{ fontFamily: 'Inter', fontSize: '12px', color: 'var(--bad)', margin: 0 }}>
        ⚠ This link doesn't load as an image. Double-check the URL.
      </p>
    );
  }
  return (
    <img
      src={url}
      alt="Preview"
      onError={() => setBroken(true)}
      style={{ height: `${size}px`, width: 'auto', maxWidth: '100%', borderRadius: '12px', objectFit: 'cover' }}
    />
  );
}

async function sha256Hex(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function AdminLogin({ onSuccess }) {
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!pw) return;
    setBusy(true);
    setError(false);
    const hex = await sha256Hex(pw);
    if (hex === ADMIN_PASS_HASH) {
      try {
        localStorage.setItem('ubm_admin', '1');
      } catch {}
      onSuccess();
    } else {
      setError(true);
      setBusy(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <form onSubmit={submit} className="admin-card" style={{ width: '100%', maxWidth: '380px', padding: '32px 28px', textAlign: 'center' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--ink)' }} />
          <span style={{ fontFamily: 'Anton', fontSize: '20px', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink)' }}>
            Lakhan · Admin
          </span>
        </span>
        <p className="text-body" style={{ fontSize: '14px', marginBottom: '24px' }}>
          Enter the admin password to manage your website.
        </p>
        <div style={{ position: 'relative', marginBottom: '12px' }}>
          <input
            type={show ? 'text' : 'password'}
            className="admin-input"
            value={pw}
            autoFocus
            onChange={(e) => {
              setPw(e.target.value);
              setError(false);
            }}
            placeholder="Password"
            style={{ paddingRight: '64px', textAlign: 'center' }}
          />
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Inter',
              fontWeight: 600,
              fontSize: '12px',
              color: 'var(--ink-60)',
            }}
          >
            {show ? 'Hide' : 'Show'}
          </button>
        </div>
        {error && (
          <p style={{ fontFamily: 'Inter', fontSize: '13px', color: 'var(--bad)', marginBottom: '12px' }}>
            That password isn't right. Try again.
          </p>
        )}
        <button type="submit" className="btn-pill" style={{ width: '100%', justifyContent: 'center' }} disabled={busy || !pw}>
          {busy ? 'Checking…' : 'Open Admin'}
        </button>
      </form>
    </div>
  );
}

function AdminPhotos() {
  const [items, setItems] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [savedId, setSavedId] = useState(null);
  const [stage, setStage] = useState('');
  const [staged, setStaged] = useState(null);
  const [stagedCaption, setStagedCaption] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const addInputRef = useRef(null);
  const replaceInputRef = useRef(null);
  const replaceId = useRef(null);
  const savedTimer = useRef(null);
  const stageTimer = useRef(null);
  useEffect(
    () => () => {
      clearTimeout(savedTimer.current);
      clearTimeout(stageTimer.current);
    },
    []
  );

  const load = () => {
    fetchGallery()
      .then(setItems)
      .catch(() => setError("Couldn't load the photos. Check your internet and refresh the page."));
  };
  useEffect(load, []);

  const run = async (fn, id) => {
    setBusy(true);
    setError('');
    try {
      await fn();
      load();
      if (id) {
        setSavedId(id);
        clearTimeout(savedTimer.current);
        savedTimer.current = setTimeout(() => setSavedId(null), 2500);
      }
    } catch {
      setError("That didn't save. Check your internet and try again.");
    }
    setBusy(false);
  };

  const prepareFile = async (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError("That file isn't a photo. Try a JPG or PNG.");
      return;
    }
    setError('');
    setStage('reading');
    try {
      const dataUrl = await compressImageFile(file);
      setStaged(dataUrl);
      setStagedCaption('');
    } catch {
      setError("Couldn't read that photo. Try a different one.");
    }
    setStage('');
  };

  const publishStaged = async () => {
    if (!staged) return;
    await run(() => addGalleryItem(staged, stagedCaption.trim(), 320));
    setStaged(null);
    setStagedCaption('');
    setStage('done');
    clearTimeout(stageTimer.current);
    stageTimer.current = setTimeout(() => setStage(''), 3500);
  };

  const startReplace = (id) => {
    replaceId.current = id;
    replaceInputRef.current?.click();
  };

  const onReplaceFile = async (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = '';
    const id = replaceId.current;
    if (!file || !id) return;
    setStage('reading');
    try {
      const dataUrl = await compressImageFile(file);
      const it = items.find((x) => x.id === id);
      await run(() => updateGalleryItem(id, dataUrl, it ? it.caption : '', 320), id);
    } catch {
      setError("Couldn't read that photo. Try a different one.");
    }
    setStage('');
  };

  const remove = (it) => {
    if (window.confirm('Delete this photo from the website? This cannot be undone.')) {
      run(() => deleteGalleryItem(it.id));
    }
  };

  const edit = (id, field, value) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, [field]: value } : it)));
  };

  return (
    <div>
      <p className="text-body" style={{ fontSize: '14px', marginBottom: '20px' }}>
        These photos appear in the sliding gallery on your website. Every photo is
        automatically resized to the same size, so just upload and go. Changes are
        live for everyone instantly.
      </p>

      <input type="file" accept="image/*" hidden ref={addInputRef} onChange={(e) => { prepareFile(e.target.files && e.target.files[0]); e.target.value = ''; }} />
      <input type="file" accept="image/*" hidden ref={replaceInputRef} onChange={onReplaceFile} />

      {!staged && (
        <div
          className={`drop-zone${dragOver ? ' dragging' : ''}`}
          style={{ marginBottom: '16px' }}
          onClick={() => addInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            prepareFile(e.dataTransfer.files && e.dataTransfer.files[0]);
          }}
        >
          <p style={{ fontSize: '32px', marginBottom: '8px' }}>📸</p>
          <p style={{ fontFamily: 'Anton', fontSize: '16px', textTransform: 'uppercase', letterSpacing: '0.03em', color: 'var(--ink)' }}>
            {stage === 'reading' ? 'Getting your photo ready…' : 'Add a photo'}
          </p>
          <p className="text-body" style={{ fontSize: '13px', marginTop: '6px' }}>
            Tap here to choose one from your phone or computer, or drag it in.
          </p>
        </div>
      )}

      {staged && (
        <div className="admin-card" style={{ marginBottom: '16px', display: 'grid', gap: '14px' }}>
          <p style={{ fontFamily: 'Anton', fontSize: '16px', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
            Looking good. Ready to go live?
          </p>
          <img src={staged} alt="Your new photo" style={{ maxHeight: '260px', width: 'auto', maxWidth: '100%', borderRadius: '12px', objectFit: 'cover', justifySelf: 'start' }} />
          <AdminField label="Caption (optional)" hint="A short personal note shown on the photo. Leave empty for no caption.">
            <input
              className="admin-input"
              value={stagedCaption}
              onChange={(e) => setStagedCaption(e.target.value)}
              placeholder="e.g. Sunday long walk"
            />
          </AdminField>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button className="btn-pill" disabled={busy} onClick={publishStaged}>
              {busy ? 'Publishing…' : 'Put it on the website'}
            </button>
            <button className="btn-pill btn-pill--ghost" disabled={busy} onClick={() => setStaged(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {stage === 'done' && (
        <p style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px', color: 'var(--good)', background: 'rgba(75,94,66,0.10)', border: '1px solid rgba(75,94,66,0.3)', borderRadius: '10px', padding: '10px 14px', marginBottom: '16px' }}>
          🎉 It's live! Your photo is now on the website.
        </p>
      )}

      {error && <p className="admin-error">{error}</p>}
      {!items && !error && <p className="text-body">Loading your photos…</p>}
      {items && items.length === 0 && (
        <p className="text-body" style={{ textAlign: 'center', padding: '32px 0' }}>
          No photos yet. Add your first one above.
        </p>
      )}

      {items && items.length > 0 && (
        <div className="admin-photo-grid" style={{ marginTop: '8px' }}>
          {items.map((it) => (
            <div key={it.id} className="admin-card admin-photo-card" style={{ display: 'grid', gap: '10px', padding: '14px' }}>
              <img src={it.url} alt="" className="admin-thumb" />
              <input
                className="admin-input"
                value={it.caption}
                placeholder="No caption"
                onChange={(e) => edit(it.id, 'caption', e.target.value)}
              />
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  className="btn-pill"
                  style={{ padding: '9px 14px', fontSize: '11px' }}
                  disabled={busy}
                  onClick={() => run(() => updateGalleryItem(it.id, it.url, it.caption, 320), it.id)}
                >
                  {savedId === it.id ? 'Saved ✓' : 'Save'}
                </button>
                <button
                  className="btn-pill btn-pill--ghost"
                  style={{ padding: '9px 14px', fontSize: '11px' }}
                  disabled={busy}
                  onClick={() => startReplace(it.id)}
                >
                  Change photo
                </button>
                <button
                  className="btn-pill btn-pill--ghost"
                  style={{ padding: '9px 14px', fontSize: '11px' }}
                  disabled={busy}
                  onClick={() => remove(it)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AdminInstagram() {
  return (
    <div style={{ padding: '32px 0', maxWidth: '800px' }}>
      <h2 style={{ fontFamily: 'Anton', fontSize: '24px', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
        Instagram Highlights
      </h2>

      <div style={{ background: 'var(--paper-dim)', padding: '24px', borderRadius: '16px', marginBottom: '24px' }}>
        <p style={{ fontFamily: 'Inter', fontSize: '14px', color: 'var(--ink)', lineHeight: 1.6, marginBottom: '16px' }}>
          <strong>How this works:</strong> The 5 Instagram posts shown on the site are hardcoded. To update them:
        </p>
        <ol style={{ fontFamily: 'Inter', fontSize: '14px', color: 'var(--ink-60)', lineHeight: 1.8, paddingLeft: '20px' }}>
          <li>Find the `instagramHighlights` array in the code</li>
          <li>Update the caption, likes, and image URL for each post</li>
          <li>The section pulls from @functionalcoach101 Instagram account</li>
        </ol>
      </div>

      <div style={{ background: 'var(--paper)', border: '1px solid var(--border)', borderRadius: '16px', padding: '20px' }}>
        <h3 style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '15px', marginBottom: '16px' }}>
          Current Featured Posts
        </h3>
        {instagramHighlights.map((post, i) => (
          <div
            key={post.id}
            style={{
              paddingBottom: '16px',
              marginBottom: '16px',
              borderBottom: i < instagramHighlights.length - 1 ? '1px solid var(--border)' : 'none',
            }}
          >
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <img
                src={post.url}
                alt={post.caption}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '8px',
                  objectFit: 'cover',
                  flexShrink: 0,
                }}
              />
              <div>
                <p style={{ fontFamily: 'Inter', fontSize: '13px', color: 'var(--ink)', lineHeight: 1.5, marginBottom: '6px' }}>
                  {post.caption}
                </p>
                <p style={{ fontFamily: 'Inter', fontSize: '12px', color: 'var(--ink-60)' }}>
                  ❤️ {post.likes.toLocaleString()} likes
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '24px', padding: '20px', background: 'rgba(75, 94, 66, 0.08)', borderRadius: '12px', border: '1px solid rgba(75, 94, 66, 0.2)' }}>
        <p style={{ fontFamily: 'Inter', fontSize: '13px', color: 'var(--ink)', lineHeight: 1.6 }}>
          <strong>💡 Tip:</strong> To feature a new post, copy the Instagram post image URL and update the `instagramHighlights` array in App.jsx. The section automatically displays the 5 posts you configure.
        </p>
      </div>
    </div>
  );
}

const EMPTY_TESTIMONIAL = { name: '', condition: '', result: '', quote: '', img: '', track: 'a' };

function AdminTestimonials() {
  const [items, setItems] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [draft, setDraft] = useState(EMPTY_TESTIMONIAL);

  const [savedId, setSavedId] = useState(null);
  const avatarInput = useRef(null);
  const avatarTarget = useRef(null);
  const savedTimer = useRef(null);
  useEffect(() => () => clearTimeout(savedTimer.current), []);

  const pickAvatar = (onChange) => {
    avatarTarget.current = onChange;
    avatarInput.current?.click();
  };

  const onAvatarFile = async (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError("That file isn't a photo. Try a JPG or PNG.");
      return;
    }
    try {
      const dataUrl = await compressImageFile(file, 320);
      if (avatarTarget.current) avatarTarget.current('img', dataUrl);
    } catch {
      setError("Couldn't read that photo. Try a different one.");
    }
  };

  const load = () => {
    fetchTestimonials()
      .then(setItems)
      .catch(() => setError("Couldn't load the testimonials. Check your internet and refresh the page."));
  };
  useEffect(load, []);

  const run = async (fn, id) => {
    setBusy(true);
    setError('');
    try {
      await fn();
      load();
      if (id) {
        setSavedId(id);
        clearTimeout(savedTimer.current);
        savedTimer.current = setTimeout(() => setSavedId(null), 2500);
      }
    } catch {
      setError("That didn't save. Check your internet and try again.");
    }
    setBusy(false);
  };

  const remove = (t) => {
    if (window.confirm(`Delete ${t.name}'s testimonial from the website? This cannot be undone.`)) {
      run(() => deleteTestimonial(t.id));
    }
  };

  const edit = (id, field, value) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, [field]: value } : it)));
  };

  const fields = (t, onChange) => (
    <div style={{ display: 'grid', gap: '10px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <AdminField label="Name">
          <input className="admin-input" value={t.name} onChange={(e) => onChange('name', e.target.value)} placeholder="Rohit K." />
        </AdminField>
        <AdminField label="Tag (condition / context)">
          <input className="admin-input" value={t.condition} onChange={(e) => onChange('condition', e.target.value)} placeholder="Thyroid Managed" />
        </AdminField>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <AdminField label="Result line">
          <input className="admin-input" value={t.result} onChange={(e) => onChange('result', e.target.value)} placeholder="14 kg lost in 7 months" />
        </AdminField>
        <AdminField label="Row (scroll direction)">
          <select className="admin-input" value={t.track} onChange={(e) => onChange('track', e.target.value)}>
            <option value="a">Top row</option>
            <option value="b">Bottom row</option>
          </select>
        </AdminField>
      </div>
      <AdminField label="Quote">
        <textarea
          className="admin-input"
          rows={3}
          value={t.quote}
          onChange={(e) => onChange('quote', e.target.value)}
          placeholder="What the client said…"
          style={{ resize: 'vertical', borderRadius: '14px' }}
        />
      </AdminField>
      <AdminField label="Client photo (optional)" hint="A real photo makes the review land harder. Leave empty to show their initial instead.">
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Avatar name={t.name} img={t.img} size={44} />
          <button
            type="button"
            className="btn-pill btn-pill--ghost"
            style={{ padding: '9px 16px', fontSize: '11px' }}
            onClick={() => pickAvatar(onChange)}
          >
            {t.img ? 'Change photo' : 'Upload photo'}
          </button>
          {t.img && (
            <button
              type="button"
              className="btn-pill btn-pill--ghost"
              style={{ padding: '9px 16px', fontSize: '11px' }}
              onClick={() => onChange('img', '')}
            >
              Remove
            </button>
          )}
        </div>
      </AdminField>
    </div>
  );

  return (
    <div>
      <p className="text-body" style={{ fontSize: '14px', marginBottom: '20px' }}>
        These are the client reviews that scroll across your website. Changes go
        live for everyone as soon as you press Save.
      </p>

      <input type="file" accept="image/*" hidden ref={avatarInput} onChange={onAvatarFile} />

      <div className="admin-card" style={{ marginBottom: '24px' }}>
        <p style={{ fontFamily: 'Anton', fontSize: '16px', textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: '16px' }}>
          Add a testimonial
        </p>
        {fields(draft, (f, v) => setDraft({ ...draft, [f]: v }))}
        <button
          className="btn-pill"
          style={{ marginTop: '14px' }}
          disabled={busy || !draft.name.trim() || !draft.quote.trim()}
          onClick={() => {
            run(() => addTestimonial(draft));
            setDraft(EMPTY_TESTIMONIAL);
          }}
        >
          {busy ? 'Adding…' : 'Add to website'}
        </button>
      </div>

      {error && <p className="admin-error">{error}</p>}
      {!items && !error && <p className="text-body">Loading your testimonials…</p>}
      {items && items.length === 0 && (
        <p className="text-body" style={{ textAlign: 'center', padding: '32px 0' }}>
          No testimonials yet. Add your first one above.
        </p>
      )}

      {items && items.map((t) => (
        <div key={t.id} className="admin-card" style={{ marginBottom: '16px' }}>
          {fields(t, (f, v) => edit(t.id, f, v))}
          <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
            <button
              className="btn-pill"
              style={{ padding: '10px 18px' }}
              disabled={busy}
              onClick={() => run(() => updateTestimonial(t), t.id)}
            >
              {savedId === t.id ? 'Saved ✓' : 'Save'}
            </button>
            <button
              className="btn-pill btn-pill--ghost"
              style={{ padding: '10px 18px' }}
              disabled={busy}
              onClick={() => remove(t)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

const EMPTY_FAQ = { q: '', a: '' };

function AdminFaqs() {
  const [items, setItems] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [savedId, setSavedId] = useState(null);
  const [draft, setDraft] = useState(EMPTY_FAQ);
  const savedTimer = useRef(null);
  useEffect(() => () => clearTimeout(savedTimer.current), []);

  const load = () => {
    fetchFaqs()
      .then(setItems)
      .catch(() => setError("Couldn't load the FAQs. Check your internet and refresh the page."));
  };
  useEffect(load, []);

  const run = async (fn, id) => {
    setBusy(true);
    setError('');
    try {
      await fn();
      load();
      if (id) {
        setSavedId(id);
        clearTimeout(savedTimer.current);
        savedTimer.current = setTimeout(() => setSavedId(null), 2500);
      }
    } catch {
      setError("That didn't save. Check your internet and try again.");
    }
    setBusy(false);
  };

  const remove = (f) => {
    if (window.confirm('Delete this question from the website? This cannot be undone.')) {
      run(() => deleteFaq(f.id));
    }
  };

  const edit = (id, field, value) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, [field]: value } : it)));
  };

  return (
    <div>
      <p className="text-body" style={{ fontSize: '14px', marginBottom: '20px' }}>
        These are the questions and answers shown in the FAQ section of your
        website. Changes go live for everyone as soon as you press Save.
      </p>

      <div className="admin-card" style={{ marginBottom: '24px', display: 'grid', gap: '12px' }}>
        <p style={{ fontFamily: 'Anton', fontSize: '16px', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
          Add a question
        </p>
        <AdminField label="Question">
          <input
            className="admin-input"
            value={draft.q}
            onChange={(e) => setDraft({ ...draft, q: e.target.value })}
            placeholder="e.g. Do you offer plans for vegetarians?"
          />
        </AdminField>
        <AdminField label="Answer">
          <textarea
            className="admin-input"
            rows={3}
            value={draft.a}
            onChange={(e) => setDraft({ ...draft, a: e.target.value })}
            placeholder="Write the answer the way you'd say it on a call…"
            style={{ resize: 'vertical', borderRadius: '14px' }}
          />
        </AdminField>
        <button
          className="btn-pill"
          style={{ justifySelf: 'start' }}
          disabled={busy || !draft.q.trim() || !draft.a.trim()}
          onClick={() => {
            run(() => addFaq(draft.q.trim(), draft.a.trim()));
            setDraft(EMPTY_FAQ);
          }}
        >
          {busy ? 'Adding…' : 'Add to website'}
        </button>
      </div>

      {error && <p className="admin-error">{error}</p>}
      {!items && !error && <p className="text-body">Loading your FAQs…</p>}
      {items && items.length === 0 && (
        <p className="text-body" style={{ textAlign: 'center', padding: '32px 0' }}>
          No questions yet. Add your first one above.
        </p>
      )}

      {items && items.map((f) => (
        <div key={f.id} className="admin-card" style={{ marginBottom: '16px', display: 'grid', gap: '10px' }}>
          <AdminField label="Question">
            <input className="admin-input" value={f.q} onChange={(e) => edit(f.id, 'q', e.target.value)} />
          </AdminField>
          <AdminField label="Answer">
            <textarea
              className="admin-input"
              rows={3}
              value={f.a}
              onChange={(e) => edit(f.id, 'a', e.target.value)}
              style={{ resize: 'vertical', borderRadius: '14px' }}
            />
          </AdminField>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              className="btn-pill"
              style={{ padding: '10px 18px' }}
              disabled={busy}
              onClick={() => run(() => updateFaq(f.id, f.q, f.a), f.id)}
            >
              {savedId === f.id ? 'Saved ✓' : 'Save'}
            </button>
            <button className="btn-pill btn-pill--ghost" style={{ padding: '10px 18px' }} disabled={busy} onClick={() => remove(f)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function AdminLeads() {
  const [items, setItems] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const load = () => {
    setError('');
    fetchLeads()
      .then(setItems)
      .catch(() => setError("Couldn't load the enquiries. Check your internet and press Refresh."));
  };
  useEffect(load, []);

  const remove = async (lead) => {
    if (!window.confirm(`Remove ${lead.name}'s enquiry? Make sure you've already contacted them.`)) return;
    setBusy(true);
    try {
      await deleteLead(lead.id);
      load();
    } catch {
      setError("Couldn't remove that one. Check your internet and try again.");
    }
    setBusy(false);
  };

  /* wa.me needs a full international number to reliably open a chat.
     Most people type a plain 10-digit Indian mobile number with no
     country code, so assume +91 when the digits look like that case
     and leave anything already-prefixed (or a foreign number) alone. */
  const waLink = (phone) => {
    const digits = phone.replace(/\D/g, '');
    const withCountry = digits.length === 10 ? `91${digits}` : digits;
    return `https://wa.me/${withCountry}`;
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <p className="text-body" style={{ fontSize: '14px' }}>
          People who booked a call from your website land here, newest first.
          Call or WhatsApp them, then remove the card when you're done.
        </p>
        <button className="btn-pill btn-pill--ghost" style={{ padding: '10px 18px' }} onClick={load}>
          Refresh
        </button>
      </div>

      {error && <p className="admin-error">{error}</p>}
      {!items && !error && <p className="text-body">Loading enquiries…</p>}
      {items && items.length === 0 && (
        <p className="text-body" style={{ textAlign: 'center', padding: '32px 0' }}>
          No enquiries yet. They'll appear here the moment someone books a call
          on your website.
        </p>
      )}

      {items && items.map((lead) => (
        <div key={lead.id} className="admin-card" style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontFamily: 'Anton', fontSize: '18px', textTransform: 'uppercase', letterSpacing: '0.03em', color: 'var(--ink)' }}>
              {lead.name}
            </p>
            <p style={{ fontFamily: 'Inter', fontSize: '14px', color: 'var(--ink)', marginTop: '6px' }}>
              📞 <a href={`tel:${lead.phone}`} style={{ color: 'var(--ink)' }}>{lead.phone}</a>
              {lead.email && <span style={{ color: 'var(--ink-60)' }}> · ✉️ <a href={`mailto:${lead.email}`} style={{ color: 'var(--ink-60)' }}>{lead.email}</a></span>}
            </p>
            <p style={{ fontFamily: 'Inter', fontSize: '12px', color: 'var(--ink-40)', marginTop: '4px' }}>{lead.at}</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
            <a className="btn-pill" style={{ padding: '10px 16px', fontSize: '11px' }} href={waLink(lead.phone)} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            <button className="btn-pill btn-pill--ghost" style={{ padding: '10px 16px', fontSize: '11px' }} disabled={busy} onClick={() => remove(lead)}>
              Done, remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function AdminStats() {
  const [summary, setSummary] = useState(null);
  const [daily, setDaily] = useState(null);
  const [error, setError] = useState('');

  const load = () => {
    setError('');
    fetchStats()
      .then((rows) => setSummary(rows[0]))
      .catch(() => setError("Couldn't load the statistics. Check your internet and press Refresh."));
    fetchDaily()
      .then(setDaily)
      .catch(() => {});
  };
  useEffect(load, []);

  const n = (v) => Number(v || 0);
  const maxDaily = daily ? Math.max(1, ...daily.map((d) => n(d.visits))) : 1;

  const tiles = summary
    ? [
        { label: 'Total visits', value: n(summary.total_visits) },
        { label: 'Today', value: n(summary.visits_today) },
        { label: 'Last 7 days', value: n(summary.visits_7d) },
        { label: 'Last 30 days', value: n(summary.visits_30d) },
        { label: 'From mobile', value: n(summary.mobile_visits) },
        { label: 'From desktop', value: n(summary.desktop_visits) },
      ]
    : [];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <p className="text-body" style={{ fontSize: '14px' }}>
          Live from the database. Every row is a real page visit.
        </p>
        <button className="btn-pill btn-pill--ghost" style={{ padding: '10px 18px' }} onClick={load}>
          Refresh
        </button>
      </div>

      {error && <p className="admin-error">{error}</p>}
      {!summary && !error && <p className="text-body">Loading statistics…</p>}

      {summary && (
        <div className="stat-tiles">
          {tiles.map((t) => (
            <div key={t.label} className="admin-card" style={{ textAlign: 'center', padding: '20px 12px' }}>
              <p style={{ fontFamily: 'Anton', fontSize: 'clamp(26px, 4vw, 36px)', color: 'var(--ink)', lineHeight: 1 }}>
                {t.value.toLocaleString()}
              </p>
              <p className="text-caption" style={{ fontSize: '10px', color: 'var(--ink-60)', marginTop: '8px' }}>{t.label}</p>
            </div>
          ))}
        </div>
      )}

      {daily && (
        <div className="admin-card" style={{ marginTop: '20px' }}>
          <p style={{ fontFamily: 'Anton', fontSize: '16px', textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: '20px' }}>
            Visits: last 14 days
          </p>
          <div className="bars" role="img" aria-label={`Daily visits, last 14 days: ${daily.map((d) => `${d.day}: ${n(d.visits)}`).join(', ')}`}>
            {daily.map((d) => (
              <div key={d.day} className="bar-col" title={`${d.day} · ${n(d.visits)} visit${n(d.visits) === 1 ? '' : 's'}`}>
                {n(d.visits) === maxDaily && n(d.visits) > 0 && (
                  <span className="bar-label">{n(d.visits)}</span>
                )}
                <div className="bar" style={{ height: `${Math.max(3, (n(d.visits) / maxDaily) * 100)}%` }} />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
            <span className="text-caption" style={{ fontSize: '10px', color: 'var(--ink-40)' }}>{daily[0]?.day?.slice(5)}</span>
            <span className="text-caption" style={{ fontSize: '10px', color: 'var(--ink-40)' }}>{daily[daily.length - 1]?.day?.slice(5)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function AdminPage() {
  const [authed, setAuthed] = useState(() => {
    try {
      return localStorage.getItem('ubm_admin') === '1';
    } catch {
      return false;
    }
  });
  const [tab, setTab] = useState('photos');
  const tabs = [
    { id: 'photos', label: 'Photos' },
    { id: 'instagram', label: 'Instagram' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'faqs', label: 'FAQs' },
    { id: 'leads', label: 'Enquiries' },
    { id: 'stats', label: 'Statistics' },
  ];

  if (!authed) return <AdminLogin onSuccess={() => setAuthed(true)} />;

  const logout = () => {
    try {
      localStorage.removeItem('ubm_admin');
    } catch {}
    setAuthed(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', paddingBottom: '80px' }}>
      <header style={{ borderBottom: '1px solid var(--border)', padding: '20px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--ink)' }} />
            <span style={{ fontFamily: 'Anton', fontSize: '18px', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink)' }}>
              Lakhan · Admin
            </span>
          </span>
          <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
            <a
              href="#top"
              onClick={() => {
                window.location.hash = '';
              }}
              style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '13px', color: 'var(--ink)', textDecoration: 'none', opacity: 0.7 }}
            >
              ← View site
            </a>
            <button
              onClick={logout}
              style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '13px', color: 'var(--ink)', background: 'none', border: 'none', cursor: 'pointer', opacity: 0.7 }}
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <div className="container" style={{ maxWidth: '860px', paddingTop: '32px' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '28px', flexWrap: 'wrap' }}>
          {tabs.map((t) => (
            <button
              key={t.id}
              className={tab === t.id ? 'btn-pill' : 'btn-pill btn-pill--ghost'}
              style={{ padding: '10px 20px' }}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'photos' && <AdminPhotos />}
        {tab === 'instagram' && <AdminInstagram />}
        {tab === 'testimonials' && <AdminTestimonials />}
        {tab === 'faqs' && <AdminFaqs />}
        {tab === 'leads' && <AdminLeads />}
        {tab === 'stats' && <AdminStats />}
      </div>
    </div>
  );
}

/* ============================================================
   APP
   ============================================================ */

export default function App() {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const isAdmin = hash.replace(/^#\/?/, '').startsWith('admin');

  useEffect(() => {
    if (isAdmin) return;
    try {
      if (sessionStorage.getItem('ubm_visited')) return;
      sessionStorage.setItem('ubm_visited', '1');
    } catch {}
    logVisit();
  }, [isAdmin]);

  if (isAdmin) return <AdminPage />;

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <CredentialStrip />
        <AboutCoachSection />
        <StatsSection />
        <GallerySection />
        <ProcessSection />
        <WorkoutLibrarySection />
        <DifferenceSection />
        <MythTruthSection />
        <WhoThisIsNotForSection />
        <InstagramHighlightsSection />
        <TestimonialsAutoScroll />
        <ProgramsSection />
        <FAQSection />
        <BookSection />
        <FinalCTASection />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
