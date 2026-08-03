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
  logVisit,
  fetchStats,
  fetchDaily,
} from './api.js';

const CALENDLY_URL = 'https://calendly.com/unitedbymovement/30min';

/* ============================================================
   FUNCTIONALCOACH101.COM — Lakhan Ahuja · The Weight Loss Coach
   Visual system matched to the Dominic editorial reference:
   stone-grey monochrome, Anton condensed caps + Instrument
   Serif italic accents, black pill buttons.
   ============================================================ */

const images = {
  hero: 'https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?w=1200&q=85',
  hero_alt: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=1000&q=85',
  workout_home: 'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=900&q=85',
  workout_2: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=900&q=85',
  food_dal: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&q=80',
  food_paneer: 'https://images.unsplash.com/photo-1631452180539-96aca7d48617?w=800&q=80',
  food_street: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80',
  method_1: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80',
  method_2: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
  process_1: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=900&q=85',
  gallery_1: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=700&q=80',
  gallery_2: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=700&q=80',
  gallery_3: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=700&q=80',
  gallery_4: 'https://images.unsplash.com/photo-1607914123792-11e10d3c9e37?w=700&q=80',
  gallery_5: 'https://images.unsplash.com/photo-1610276198568-eb6d0ff53e48?w=700&q=80',
  quiz_bg: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1000&q=80',
  t1: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&q=80',
  t2: 'https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?w=120&q=80',
  t3: 'https://images.unsplash.com/photo-1618835962148-cf177563c6c0?w=120&q=80',
  t4: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=120&q=80',
  t5: 'https://images.unsplash.com/photo-1621784563330-caee0b138a00?w=120&q=80',
  t6: 'https://images.unsplash.com/photo-1611432579699-484f7990b127?w=120&q=80',
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
    { label: 'Learn', href: '#learn' },
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
            Diet plans end — and their results end with them. I coach habits
            instead: your food, your routine, rebuilt to last. Built around
            dal-chawal, not despite it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.75 }}
            style={{ marginTop: '36px' }}
          >
            <PillLink href="#learn">Start the 2-Minute Diagnostic</PillLink>
          </motion.div>

          {/* Service tags row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="service-tags"
            style={{ marginTop: '64px', paddingTop: '32px', borderTop: '1px solid var(--border)' }}
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
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '85% center' }}
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
            Every number here comes from habit tracking — clean days counted
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
      desc: 'No diet plan to follow — we rebuild how you already eat, one habit at a time. Dal-chawal stays; the results come anyway.',
    },
    {
      num: '02',
      title: 'Talk It Through, 1:1',
      desc: 'A personal 45-minute video call every 7–10 days: travel weeks, eating out, what to order, what to skip. Strategy for your life, not a PDF.',
    },
    {
      num: '03',
      title: 'Track What Sticks',
      desc: 'Habit tracking, week after week — clean days, movement, consistency. That’s how clients average 4–8 kg in three months, and keep it off.',
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
              your real life — the same one used with 100+ clients.
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
  { them: 'A diet-plan PDF on day one', us: 'No diet plan — habits built into how you already eat' },
  { them: '"Did you follow the plan?" texts', us: 'A 45-minute personal video call every 7–10 days' },
  { them: 'One workout chart, repeated for a month', us: 'A fresh 45-minute workout video, every single day' },
  { them: 'Generic "avoid junk food" advice', us: 'Recipes, supplements — even what to pick on Blinkit' },
  { them: 'Results that end when the plan ends', us: 'Habits that stay long after coaching does' },
];

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
  { myth: 'Cheat days ruin your progress', truth: 'One meal ≠ one week — the math survives it', tag: 'TRUTH', color: 'good' },
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
   7. INTERACTIVE DIAGNOSTIC QUIZ
   ============================================================ */

const quizQuestions = [
  {
    q: 'Which is most likely to ruin your fat-loss deficit?',
    options: [
      { text: 'Two rotis at dinner', correct: false },
      { text: 'Mindless evening snacking while scrolling', correct: true },
      { text: 'Having rice for lunch', correct: false },
      { text: 'Drinking chai with sugar', correct: false },
    ],
    explain: "It's rarely the meal you planned — it's the 300 unplanned calories from snacking you didn't log.",
  },
  {
    q: "What's the fastest way to hit 10,000 steps daily?",
    options: [
      { text: 'One long walk before work', correct: false },
      { text: 'Break it into 3 short walks across the day', correct: true },
      { text: 'Buy a treadmill', correct: false },
      { text: 'Take stairs only', correct: false },
    ],
    explain: "You don't need an hour to complete 10,000 steps — you need to stop waiting for the 'perfect' time to walk.",
  },
  {
    q: "A client with thyroid issues asks about fat loss. What's true?",
    options: [
      { text: 'Fat loss is impossible with thyroid conditions', correct: false },
      { text: "It's slower, but the same deficit principles apply, managed carefully", correct: true },
      { text: 'They need to eliminate carbs completely', correct: false },
      { text: 'Only medication can help', correct: false },
    ],
    explain: 'Thyroid conditions change the pace, not the fundamentals — this is exactly why systems matter more than willpower.',
  },
  {
    q: 'Best way to handle a wedding season / festival week?',
    options: [
      { text: 'Skip all events to stay on track', correct: false },
      { text: 'Plan around it — eat lighter before/after, enjoy the event itself', correct: true },
      { text: 'Fast the entire day of the event', correct: false },
      { text: 'Give up and restart after the season', correct: false },
    ],
    explain: "Ithaca isn't a straight line — the real reward is building a system flexible enough to survive real life.",
  },
];

function QuizSection() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const question = quizQuestions[current];
  const answered = selected !== null;

  const selectOption = (i) => {
    if (answered) return;
    setSelected(i);
    if (question.options[i].correct) setScore((s) => s + 1);
  };

  const next = () => {
    if (current + 1 >= quizQuestions.length) {
      setDone(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setDone(false);
  };

  const optionStyle = (opt, i) => {
    const base = {
      width: '100%',
      textAlign: 'left',
      fontFamily: 'Inter',
      fontWeight: 500,
      fontSize: '15px',
      color: 'var(--ink)',
      background: 'var(--paper)',
      border: '1.5px solid var(--border-strong)',
      padding: '16px 20px',
      borderRadius: '24px',
      cursor: answered ? 'default' : 'pointer',
      transition: 'border-color 200ms ease, background 200ms ease',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '12px',
    };
    if (!answered) return base;
    if (opt.correct) {
      return { ...base, border: '1.5px solid var(--good)', background: 'rgba(75,94,66,0.10)' };
    }
    if (i === selected && !opt.correct) {
      return { ...base, border: '1.5px solid var(--bad)', background: 'rgba(168,69,60,0.08)' };
    }
    return { ...base, opacity: 0.5 };
  };

  return (
    <section id="learn" className="section-pad" style={{ background: 'var(--paper-dim)' }}>
      <div className="container" style={{ maxWidth: '760px' }}>
        <motion.div {...revealProps} style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="text-caption" style={{ color: 'var(--ink-60)' }}>The 2-Minute Diagnostic</span>
          <h2 className="text-h2" style={{ color: 'var(--ink)', marginTop: '12px' }}>
            How well do you <span className="serif-accent">actually</span>
            <br />
            understand fat loss?
          </h2>
          <p className="text-body" style={{ marginTop: '16px', maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto' }}>
            Four questions. The same thinking every client learns in week one.
          </p>
        </motion.div>

        <motion.div
          {...revealProps}
          style={{
            background: 'var(--paper)',
            borderRadius: '24px',
            padding: 'clamp(24px, 4vw, 40px)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          {/* Progress bar */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span className="text-caption" style={{ fontSize: '11px', color: 'var(--ink-60)' }}>
                {done ? 'Complete' : `Q${current + 1} / ${quizQuestions.length}`}
              </span>
              <span className="text-caption" style={{ fontSize: '11px', color: 'var(--ink)' }}>
                {score} correct
              </span>
            </div>
            <div style={{ height: '4px', background: 'var(--paper-dim)', borderRadius: '2px', overflow: 'hidden' }}>
              <motion.div
                animate={{ width: `${(done ? quizQuestions.length : current + (answered ? 1 : 0)) / quizQuestions.length * 100}%` }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ height: '100%', background: 'var(--ink)' }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                <h3 style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 'clamp(1.15rem, 2.2vw, 1.4rem)', color: 'var(--ink)', marginBottom: '24px', lineHeight: 1.35 }}>
                  {question.q}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {question.options.map((opt, i) => (
                    <button key={i} onClick={() => selectOption(i)} style={optionStyle(opt, i)} disabled={answered}>
                      <span>{opt.text}</span>
                      {answered && opt.correct && <span style={{ color: 'var(--good)', fontWeight: 700 }}>✓</span>}
                      {answered && i === selected && !opt.correct && <span style={{ color: 'var(--bad)', fontWeight: 700 }}>✕</span>}
                    </button>
                  ))}
                </div>

                <AnimatePresence>
                  {answered && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p className="text-accent" style={{ fontSize: '17px', color: 'var(--ink)', margin: '24px 0 0', lineHeight: 1.6 }}>
                        {question.explain}
                      </p>
                      <button onClick={next} className="btn-pill" style={{ marginTop: '24px' }}>
                        {current + 1 >= quizQuestions.length ? 'See my result' : 'Next question'}
                        <span className="btn-arrow">→</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                style={{ textAlign: 'center', padding: '12px 0' }}
              >
                <p className="text-data" style={{ color: 'var(--ink)', fontSize: 'clamp(2.5rem, 6vw, 3.5rem)' }}>
                  {score}/{quizQuestions.length}
                </p>
                <h3 style={{ fontFamily: 'Anton', fontSize: '24px', color: 'var(--ink)', margin: '16px 0 12px', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                  {score === quizQuestions.length
                    ? 'You think in systems already.'
                    : score >= 2
                      ? 'Good instincts — the gaps are fixable.'
                      : 'The internet has been lying to you.'}
                </h3>
                <p className="text-body" style={{ maxWidth: '400px', margin: '0 auto 28px' }}>
                  {score === quizQuestions.length
                    ? 'Now imagine that thinking applied to your actual week — with real numbers and someone keeping the math honest.'
                    : 'None of this is about willpower. It’s about knowing which lever actually moves the outcome — that’s what coaching fixes.'}
                </p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <PillLink href="#book">Book a Call</PillLink>
                  <button onClick={restart} className="btn-pill btn-pill--ghost">
                    Retake
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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

function GallerySection() {
  const [slides, setSlides] = useState(fallbackSlides);
  useEffect(() => {
    fetchGallery()
      .then((rows) => rows.length && setSlides(rows))
      .catch(() => {});
  }, []);

  const trackRef = useRef(null);
  const drag = useRef({ down: false, startX: 0, startScroll: 0 });

  const scrollByDir = (dir) => {
    const el = trackRef.current;
    if (!el) return;
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
          <span className="text-caption" style={{ color: 'var(--ink-60)' }}>Off the Feed</span>
          <h2 className="text-h2" style={{ color: 'var(--ink)', marginTop: '12px' }}>
            The camera roll,
            <br />
            <span className="serif-accent">unfiltered.</span>
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
        onPointerLeave={endDrag}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="slide-cell" style={{ width: `min(${slide.width}px, 78vw)` }}>
            <img src={slide.url} alt={slide.caption || 'From the camera roll'} loading="lazy" />
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

const testimonialsSetA = [
  { name: 'Rohit K.', condition: 'Thyroid Managed', result: '14 kg lost in 7 months', quote: 'You always make sure to convey how weight loss can be achieved with simple discipline — not restriction.', img: images.t1 },
  { name: 'Ananya P.', condition: 'PCOS Improved', result: 'Cycle regularized, 9 kg lost', quote: "First coach who didn't ask me to give up rice. Turns out I didn't need to.", img: images.t2 },
  { name: 'Vikram S.', condition: 'Pre-Diabetes Reversed', result: 'HbA1c normalized', quote: 'The Odyssey post about the Lotus-Eaters is literally how I think about cheat meals now.', img: images.t3 },
];

const testimonialsSetB = [
  { name: 'Priya M.', condition: 'All-or-Nothing Mindset Fixed', result: '11 kg, sustained 8 months', quote: 'I stopped treating one bad meal like a failed week. That mindset shift did more than any meal plan.', img: images.t4 },
  { name: 'Karan D.', condition: 'Desk-Job Weight Loss', result: '16 kg in 9 months', quote: '3 walks of 3,300 steps instead of one long walk — sounds small, changed everything.', img: images.t5 },
  { name: 'Meera J.', condition: 'Post-Pregnancy Recomposition', result: '13 kg, energy restored', quote: 'Real dal-chawal, real portions, real math. No fads. It actually worked.', img: images.t6 },
];

function TestimonialCard({ name, condition, result, quote, img }) {
  return (
    <div
      style={{
        flexShrink: 0,
        width: 'clamp(280px, 80vw, 380px)',
        background: 'var(--paper)',
        borderRadius: '16px',
        padding: '28px',
        border: '1px solid var(--border)',
      }}
    >
      <span
        className="text-caption"
        style={{
          fontSize: '10px',
          color: 'var(--ink-60)',
          background: 'var(--paper-dim)',
          padding: '5px 12px',
          borderRadius: '999px',
        }}
      >
        {condition}
      </span>
      <p className="text-accent" style={{ fontSize: '17px', color: 'var(--ink)', margin: '20px 0', lineHeight: 1.6 }}>
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
        <img src={img} alt={name} loading="lazy" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
        <div>
          <p style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '13px', color: 'var(--ink)' }}>{name}</p>
          <p style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '11px', color: 'var(--ink-60)', marginTop: '2px' }}>{result}</p>
        </div>
      </div>
    </div>
  );
}

function TestimonialsAutoScroll() {
  const [setA, setSetA] = useState(testimonialsSetA);
  const [setB, setSetB] = useState(testimonialsSetB);

  useEffect(() => {
    fetchTestimonials()
      .then((rows) => {
        if (!rows.length) return;
        const a = rows.filter((r) => r.track !== 'b');
        const b = rows.filter((r) => r.track === 'b');
        if (a.length) setSetA(a);
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
    desc: 'Rebuild your everyday eating habits — and watch the first 4–8 kg go.',
    features: ['Habit-first coaching — zero diet plans', '45-min video consult every 7–10 days', 'Weekly habit tracking', 'A fresh 45-min workout video daily'],
    highlight: false,
  },
  {
    name: 'Transformation',
    duration: '6 Months',
    desc: "The full practice — the program behind every result you've read above.",
    features: ['Everything in Foundation', 'Travel & eating-out strategy calls', 'Home or gym workout plans', 'Recipes & supplement guidance', 'Direct WhatsApp access'],
    highlight: true,
  },
  {
    name: 'Sustained',
    duration: '12 Months',
    desc: 'For deeper lifestyle change that needs longer, careful pacing.',
    features: ['Everything in Transformation', 'Quarterly deep reviews', 'Product guidance — down to your Blinkit cart', 'Lifetime community access'],
    highlight: false,
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
              style={{
                background: 'var(--paper)',
                padding: 'clamp(28px, 3vw, 40px)',
                display: 'flex',
                flexDirection: 'column',
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

function BookSection() {
  const [booked, setBooked] = useState(() => {
    try {
      return localStorage.getItem('ubm_booked') === '1';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const onMsg = (e) => {
      if (
        typeof e.origin === 'string' &&
        e.origin.includes('calendly.com') &&
        e.data &&
        e.data.event === 'calendly.event_scheduled'
      ) {
        try {
          localStorage.setItem('ubm_booked', '1');
        } catch {}
        setBooked(true);
      }
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const bookAgain = () => {
    try {
      localStorage.removeItem('ubm_booked');
    } catch {}
    setBooked(false);
  };

  return (
    <section id="book" className="section-pad" style={{ background: 'var(--paper-dim)' }}>
      <div className="container" style={{ maxWidth: '760px', textAlign: 'center' }}>
        <motion.div {...revealProps}>
          <span className="text-caption" style={{ color: 'var(--ink-60)' }}>Let's Talk</span>
          <h2 className="text-h2" style={{ color: 'var(--ink)', margin: '16px 0 20px' }}>
            Book your <span className="serif-accent">30-minute call.</span>
          </h2>
          <p className="text-body" style={{ marginBottom: '40px', maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto' }}>
            Pick a slot that works for you. We'll talk about where you're stuck and
            whether this practice is the right fit — no pressure, no pitch.
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
            <p className="text-body" style={{ fontSize: '15px', maxWidth: '380px', margin: '0 auto 28px' }}>
              You're on Lakhan's calendar — the invite and call link are in your
              email. Talk soon.
            </p>
            <button onClick={bookAgain} className="btn-pill btn-pill--ghost">
              Book another call
            </button>
          </motion.div>
        ) : (
          <motion.div
            {...revealProps}
            style={{ borderRadius: '24px', overflow: 'hidden', background: 'var(--paper)', border: '1px solid var(--border)' }}
          >
            <iframe
              title="Book a call with Lakhan"
              src={`${CALENDLY_URL}?embed_domain=${window.location.host}&embed_type=Inline&hide_gdpr_banner=1`}
              style={{ width: '100%', height: '720px', border: 'none', display: 'block' }}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* ============================================================
   12. FAQ
   ============================================================ */

const faqs = [
  {
    q: "Why don't you give diet plans?",
    a: "Because a diet plan is something you start and stop — and when it stops, the results stop with it. We rebuild your everyday eating habits instead, so there's nothing to quit and nothing to expire.",
  },
  {
    q: 'Do I have to give up dal-chawal / rice / roti?',
    a: 'No. The habits are built around the food you already eat — real Indian food, portioned and timed sensibly, not replaced with a Western meal plan.',
  },
  {
    q: 'What results can I realistically expect?',
    a: 'Most clients lose 4–8 kg in the 3-month program — through habit changes that hold, not water-weight crashes. Slower than a fad, permanent unlike one.',
  },
  {
    q: 'What about workouts — I have no gym / no time?',
    a: "You get a fresh 45-minute on-demand workout video every day — strength, cardio, flexibility, and mobility, doable at home on your schedule. Prefer the gym? You get a gym plan instead.",
  },
  {
    q: 'What if I travel a lot or eat out often?',
    a: "That's exactly what the 45-minute video consults are for — travel-week strategy, what to order out, what to skip. The system flexes, it doesn't break.",
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

  return (
    <section style={{ background: 'var(--paper)', padding: 'clamp(64px, 10vw, 140px) 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <motion.div {...revealProps} style={{ marginBottom: '32px' }}>
          <span className="text-caption" style={{ color: 'var(--ink-60)' }}>Frequently Asked</span>
          <h2 className="text-h2" style={{ color: 'var(--ink)', marginTop: '12px' }}>
            Honest answers, <span className="serif-accent">upfront</span>
          </h2>
        </motion.div>
        <motion.div {...revealProps} style={{ borderTop: '1px solid var(--border)' }}>
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              {...faq}
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
            style={{ fontFamily: 'Inter', fontSize: '14px', color: 'var(--ink)', textDecoration: 'none', opacity: 0.7 }}
          >
            {l.label}
          </a>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer style={{ background: 'var(--paper)', padding: 'clamp(48px, 6vw, 80px) 0 0', borderTop: '1px solid var(--border)' }}>
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
              { label: 'Learn', href: '#learn' },
            ]}
          />
          <FooterColumn
            title="Navigation"
            links={[
              { label: 'About', href: '#top' },
              { label: 'Book a Call', href: '#book' },
              { label: 'FAQ', href: '#top' },
              { label: 'Privacy', href: '#top' },
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

const WIDTH_OPTIONS = [
  { label: 'Small', value: 300 },
  { label: 'Medium', value: 340 },
  { label: 'Wide', value: 420 },
];

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
        ⚠ This link doesn't load as an image — double-check the URL.
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
            Lakhan — Admin
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
            That password isn't right — try again.
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
  const [draft, setDraft] = useState({ url: '', caption: '', width: 340 });

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
        setTimeout(() => setSavedId(null), 2500);
      }
    } catch {
      setError("That didn't save. Check your internet and try again.");
    }
    setBusy(false);
  };

  const add = () => {
    if (!draft.url.trim()) return;
    run(() => addGalleryItem(draft.url.trim(), draft.caption.trim(), Number(draft.width)));
    setDraft({ url: '', caption: '', width: 340 });
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
        These photos appear in the sliding gallery on your website, in this order.
        Changes go live for everyone as soon as you press Save.
      </p>

      <div className="admin-card" style={{ marginBottom: '24px' }}>
        <p style={{ fontFamily: 'Anton', fontSize: '16px', textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: '16px' }}>
          Add a photo
        </p>
        <div style={{ display: 'grid', gap: '14px' }}>
          <AdminField
            label="Photo link"
            hint="Paste a link to any photo on the internet. Tip: right-click a photo in your browser and choose 'Copy image address'."
          >
            <input
              className="admin-input"
              value={draft.url}
              onChange={(e) => setDraft({ ...draft, url: e.target.value })}
              placeholder="https://…"
            />
          </AdminField>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 130px', gap: '12px' }}>
            <AdminField label="Caption (optional)" hint="A short personal note shown on the photo. Leave empty for no caption.">
              <input
                className="admin-input"
                value={draft.caption}
                onChange={(e) => setDraft({ ...draft, caption: e.target.value })}
                placeholder="e.g. Sunday long walk"
              />
            </AdminField>
            <AdminField label="Size">
              <select
                className="admin-input"
                value={draft.width}
                onChange={(e) => setDraft({ ...draft, width: e.target.value })}
              >
                {WIDTH_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </AdminField>
          </div>
          <ImgPreview url={draft.url.trim()} />
          <button className="btn-pill" style={{ justifySelf: 'start' }} disabled={busy || !draft.url.trim()} onClick={add}>
            {busy ? 'Adding…' : 'Add photo to website'}
          </button>
        </div>
      </div>

      {error && <p className="admin-error">{error}</p>}
      {!items && !error && <p className="text-body">Loading your photos…</p>}
      {items && items.length === 0 && (
        <p className="text-body" style={{ textAlign: 'center', padding: '32px 0' }}>
          No photos yet — add your first one above.
        </p>
      )}

      {items && items.map((it) => (
        <div key={it.id} className="admin-card admin-row">
          <img src={it.url} alt="" style={{ width: '88px', height: '88px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }} />
          <div style={{ flexGrow: 1, display: 'grid', gap: '10px', minWidth: 0 }}>
            <AdminField label="Photo link">
              <input className="admin-input" value={it.url} onChange={(e) => edit(it.id, 'url', e.target.value)} />
            </AdminField>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px', gap: '10px' }}>
              <AdminField label="Caption (optional)">
                <input
                  className="admin-input"
                  value={it.caption}
                  placeholder="No caption"
                  onChange={(e) => edit(it.id, 'caption', e.target.value)}
                />
              </AdminField>
              <AdminField label="Size">
                <select className="admin-input" value={it.width} onChange={(e) => edit(it.id, 'width', e.target.value)}>
                  {WIDTH_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </AdminField>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexShrink: 0 }}>
            <button
              className="btn-pill"
              style={{ padding: '10px 18px' }}
              disabled={busy}
              onClick={() => run(() => updateGalleryItem(it.id, it.url, it.caption, Number(it.width)), it.id)}
            >
              {savedId === it.id ? 'Saved ✓' : 'Save'}
            </button>
            <button
              className="btn-pill btn-pill--ghost"
              style={{ padding: '10px 18px' }}
              disabled={busy}
              onClick={() => remove(it)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
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
        setTimeout(() => setSavedId(null), 2500);
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
      <AdminField label="Photo URL (optional)">
        <input className="admin-input" value={t.img} onChange={(e) => onChange('img', e.target.value)} placeholder="https://…" />
      </AdminField>
    </div>
  );

  return (
    <div>
      <p className="text-body" style={{ fontSize: '14px', marginBottom: '20px' }}>
        These are the client reviews that scroll across your website. Changes go
        live for everyone as soon as you press Save.
      </p>

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
          No testimonials yet — add your first one above.
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
          Live from the database — every row is a real page visit.
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
            Visits — last 14 days
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
    { id: 'testimonials', label: 'Testimonials' },
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
              Lakhan — Admin
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
        {tab === 'testimonials' && <AdminTestimonials />}
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
        <StatsSection />
        <ProcessSection />
        <DifferenceSection />
        <MythTruthSection />
        <QuizSection />
        <GallerySection />
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
