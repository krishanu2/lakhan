import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

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
              <a href="#apply" className="btn-pill" style={{ padding: '12px 22px' }}>
                Apply for Coaching
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
              href="#apply"
              onClick={() => setDrawerOpen(false)}
              className="btn-pill"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              style={{ justifyContent: 'center', width: '100%' }}
            >
              Apply for Coaching
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
              <span key="2" className="serif-accent">isn't a willpower</span>,
              <span key="3">Problem.</span>,
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
            It's a system. For busy Indian professionals who've tried enough crash
            diets — real coaching built around dal-chawal, not despite it.
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
              { title: 'Sustainable Systems', desc: 'No crash diets. Ever.' },
              { title: 'Real Health Markers', desc: 'Thyroid, PCOS, pre-diabetes.' },
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
          Real health markers, not vanity metrics
        </p>
        <div style={{ display: 'flex', gap: 'clamp(20px, 4vw, 48px)', flexWrap: 'wrap' }}>
          {['Thyroid Managed', 'PCOS Improved', 'Pre-Diabetes Reversed', 'All-or-Nothing Mindset Fixed'].map((tag, i) => (
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
    { num: 14, suffix: 'kg', label: 'Avg. Sustainable Loss' },
    { num: 0, suffix: '', label: 'Crash Diets Prescribed' },
    { num: 6, suffix: 'mo', label: 'Avg. Program Length' },
    { num: 92, suffix: '%', label: 'Client Retention' },
    { num: 3, suffix: 'yrs', label: 'Coaching Experience' },
  ];

  return (
    <section style={{ background: 'var(--paper)', padding: 'clamp(64px, 10vw, 120px) 0' }}>
      <div className="container grid-2" style={{ gap: 'clamp(32px, 6vw, 80px)' }}>
        <motion.div {...revealProps}>
          <h2 className="text-h2" style={{ color: 'var(--ink)' }}>
            Coaching that reads
            <br />
            your <span className="serif-accent">biology,</span>
            <br />
            not just your plate.
          </h2>
          <p className="text-body" style={{ marginTop: '24px', maxWidth: '440px' }}>
            Every number below is a real outcome, tracked the same disciplined way we
            track a calorie deficit — plainly, honestly, no spin.
          </p>
          <PillLink href="#apply" ghost style={{ marginTop: '32px' }}>
            Apply for Coaching
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
      title: 'Discover the Pattern',
      desc: 'We map your actual eating behavior — not what you think you eat, what you actually eat. Deficit math, meal timing, trigger foods.',
    },
    {
      num: '02',
      title: 'Design the System',
      desc: 'Sustainable swaps within your real life — dal-chawal stays, the deficit still works. No imported Western meal plans.',
    },
    {
      num: '03',
      title: 'Refine Through Data',
      desc: "Weekly check-ins, real numbers, honest adjustments. Discipline through systems, not motivation you'll lose in week three.",
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
              Not a meal plan you'll abandon in three weeks. A system built around
              behavior, culture, and biology — the same one used with 100+ clients.
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
   6. MYTH / TRUTH
   ============================================================ */

const mythTruths = [
  { myth: 'Skipping dinner speeds up fat loss', truth: 'It just moves the binge to breakfast', tag: 'MYTH', color: 'bad' },
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
                  <PillLink href="#apply">Apply for Coaching</PillLink>
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

function GallerySection() {
  const rowA = [images.food_dal, images.workout_home, images.food_street, images.method_1, images.workout_2];
  const rowB = [
    { src: images.gallery_1, span: 2 },
    { src: images.gallery_2, span: 1 },
    { src: images.gallery_3, span: 2 },
  ];

  return (
    <section style={{ background: 'var(--paper)', padding: 'clamp(64px, 10vw, 120px) 0' }}>
      <div className="container">
        <motion.div {...revealProps} style={{ marginBottom: '48px' }}>
          <span className="text-caption" style={{ color: 'var(--ink-60)' }}>The Real Work</span>
          <h2 className="text-h2" style={{ color: 'var(--ink)', marginTop: '12px' }}>
            No gym flexing. Just
            <br />
            <span className="serif-accent">real food, real rooms.</span>
          </h2>
        </motion.div>

        <motion.div {...revealProps} className="gallery-row">
          {rowA.map((src, i) => (
            <div key={i} className="gallery-cell">
              <img src={src} alt="Real food and home workouts" loading="lazy" />
            </div>
          ))}
        </motion.div>
        <motion.div {...revealProps} className="gallery-row gallery-row-b">
          {rowB.map((cell, i) => (
            <div key={i} className={`gallery-cell ${cell.span === 2 ? 'gallery-span-2' : ''}`}>
              <img src={cell.src} alt="Everyday coaching lifestyle" loading="lazy" />
            </div>
          ))}
        </motion.div>
      </div>
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
          {[...testimonialsSetA, ...testimonialsSetA].map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>
      </div>

      <div style={{ overflow: 'hidden' }}>
        <div className="testimonial-track-rtl">
          {[...testimonialsSetB, ...testimonialsSetB].map((t, i) => (
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
    desc: 'For first-timers ready to understand the system, not just follow a plan.',
    features: ['Custom deficit calculation', 'Weekly check-ins', 'WhatsApp support', 'Food swap library access'],
    highlight: false,
  },
  {
    name: 'Transformation',
    duration: '6 Months',
    desc: "The full system — the program behind every testimonial you've read.",
    features: ['Everything in Foundation', 'Bi-weekly 1:1 calls', 'Health marker tracking', 'Festival/travel planning', 'Direct WhatsApp access'],
    highlight: true,
  },
  {
    name: 'Sustained',
    duration: '12 Months',
    desc: 'For medical-condition management requiring longer, careful pacing.',
    features: ['Everything in Transformation', 'Medical coordination support', 'Quarterly deep reviews', 'Lifetime community access'],
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
              <PillLink href="#apply" ghost={!plan.highlight} style={{ justifyContent: 'center' }}>
                Apply Now
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

/* 16px minimum — smaller input text triggers auto-zoom on iOS Safari */
const inputStyle = {
  fontFamily: 'Inter',
  fontSize: '16px',
  color: 'var(--ink)',
  background: 'var(--paper)',
  border: '1.5px solid var(--border-strong)',
  padding: '16px 22px',
  borderRadius: '999px',
  outline: 'none',
  width: '100%',
};

function ApplySection() {
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="apply" className="section-pad" style={{ background: 'var(--paper-dim)' }}>
      <div className="container" style={{ maxWidth: '640px', textAlign: 'center' }}>
        <motion.div {...revealProps}>
          <span className="text-caption" style={{ color: 'var(--ink-60)' }}>Let's Talk</span>
          <h2 className="text-h2" style={{ color: 'var(--ink)', margin: '16px 0 20px' }}>
            Tell me where <span className="serif-accent">you're stuck.</span>
          </h2>
          <p className="text-body" style={{ marginBottom: '40px' }}>
            No long forms. Just a real conversation — like DMing "Diet" on Instagram,
            but with a bit more context so I can actually help.
          </p>
        </motion.div>

        {sent ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: 'var(--paper)',
              border: '1.5px solid var(--ink)',
              borderRadius: '24px',
              padding: '40px 28px',
            }}
          >
            <p style={{ fontFamily: 'Anton', fontSize: '22px', color: 'var(--ink)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
              Got it. <span className="serif-accent">Talk soon.</span>
            </p>
            <p className="text-body" style={{ fontSize: '15px' }}>
              Lakhan replies personally on WhatsApp — usually within a day.
            </p>
          </motion.div>
        ) : (
          <motion.form
            {...revealProps}
            onSubmit={submit}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}
          >
            <input type="text" name="name" placeholder="Your name" required style={inputStyle} aria-label="Your name" />
            <input type="tel" name="whatsapp" placeholder="WhatsApp number" required style={inputStyle} aria-label="WhatsApp number" />
            <select name="challenge" defaultValue="" required style={inputStyle} aria-label="Your biggest challenge">
              <option value="" disabled>
                What's your biggest challenge right now?
              </option>
              <option>I don't know where to start</option>
              <option>I have a medical condition (thyroid/PCOS/pre-diabetes)</option>
              <option>I've tried everything and nothing sticks</option>
              <option>I need help with Indian food specifically</option>
            </select>
            <button type="submit" className="btn-pill" style={{ justifyContent: 'center', marginTop: '8px' }}>
              Start the Conversation
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

const faqs = [
  {
    q: 'Do I have to give up dal-chawal / rice / roti?',
    a: "No. The entire system is built around counting and portioning real Indian food, not replacing it with Western meal plans you'll abandon in two weeks.",
  },
  {
    q: 'I have thyroid/PCOS — does this still work for me?',
    a: 'Yes — the pace is slower and more carefully managed, but the same systems-based approach applies. Several current testimonials are specifically thyroid and PCOS cases.',
  },
  {
    q: 'How much time does this actually take per day?',
    a: 'Most clients spend 20–30 minutes daily on tracking and movement — this is a desk-job-compatible system, not a 2-hour gym commitment.',
  },
  {
    q: 'What if I travel a lot or have festival season coming up?',
    a: "Festival and travel planning is built into the Transformation and Sustained tiers specifically — the system flexes, it doesn't break.",
  },
  {
    q: 'Do you provide meal plans?',
    a: "No rigid meal plans — you get a swap framework and deficit math that works with whatever you're already eating, which is why it actually sticks.",
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
          Discipline through simple systems — not motivation.
        </p>
        <h2 className="text-display" style={{ color: 'var(--paper)', marginBottom: '40px' }}>
          Ready to stop <span className="serif-accent">guessing?</span>
        </h2>
        <PillLink href="#apply" light style={{ padding: '18px 36px' }}>
          Apply for Coaching
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
              { label: 'Apply', href: '#apply' },
              { label: 'FAQ', href: '#top' },
              { label: 'Privacy', href: '#top' },
            ]}
          />
          <FooterColumn
            title="Social"
            links={[
              { label: 'Instagram', href: 'https://instagram.com/functionalcoach101' },
              { label: 'WhatsApp', href: '#apply' },
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
          <a href="#apply" className="btn-pill" style={{ flex: 1, justifyContent: 'center', padding: '16px 24px' }}>
            Apply for Coaching
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ============================================================
   APP
   ============================================================ */

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <CredentialStrip />
        <StatsSection />
        <ProcessSection />
        <MythTruthSection />
        <QuizSection />
        <GallerySection />
        <TestimonialsAutoScroll />
        <ProgramsSection />
        <FAQSection />
        <ApplySection />
        <FinalCTASection />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
