'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SERVICE_OPTIONS = [
  { id: 'probate-avoidance', label: 'Probate Avoidance', icon: '🛡️' },
  { id: 'probate-admin', label: 'Probate Administration', icon: '⚖️' },
  { id: 'contested-will', label: 'Contested Will', icon: '📜' },
  { id: 'intestacy', label: 'Intestacy Issues', icon: '👨‍👩‍👧' },
  { id: 'estate-planning', label: 'Estate Planning', icon: '🏛️' },
  { id: 'trust-admin', label: 'Trust Administrations', icon: '🔐' },
];

type FormState = 'button' | 'form' | 'success';

const easing = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

export const OPEN_TALK_TO_TROY = 'open-talk-to-troy';

export default function FixedCTA({ show }: { show: boolean }) {
  const [state, setState] = useState<FormState>('button');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [smsConsent, setSmsConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handler = () => setState('form');
    window.addEventListener(OPEN_TALK_TO_TROY, handler);
    return () => window.removeEventListener(OPEN_TALK_TO_TROY, handler);
  }, []);

  const toggleService = (id: string) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsSubmitting(false);
    setState('success');
    setTimeout(() => {
      setState('button');
      setName(''); setEmail(''); setPhone(''); setSelected([]); setSmsConsent(false);
    }, 4000);
  };

  return (
    <AnimatePresence mode="wait">
      {show && state === 'button' && (
        <motion.div
          key="cta-button"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, ease: easing }}
          style={{
            position: 'fixed', bottom: '2rem', left: 0, right: 0,
            zIndex: 100, display: 'flex', justifyContent: 'center', pointerEvents: 'none',
          }}
        >
          <div style={{
            padding: 10, borderRadius: 120,
            background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.4)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.5)',
            pointerEvents: 'auto',
          }}>
            <button
              onClick={() => setState('form')}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '1rem calc(2rem + 1.5vw)', background: 'var(--navy)', color: '#fff',
                border: 'none', cursor: 'pointer', borderRadius: 100,
                fontFamily: 'var(--font-eyebrow)', fontSize: '0.75rem',
                letterSpacing: '0.15em', textTransform: 'uppercase',
                boxShadow: '0 4px 20px rgba(11,55,93,0.3)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span>Talk To Troy</span>
            </button>
          </div>
        </motion.div>
      )}

      {show && state === 'form' && (
        <motion.div
          key="cta-form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(11,55,93,0.35)', backdropFilter: 'blur(8px)',
            padding: '1.5rem',
          }}
        >
          <motion.div
            initial={{ scale: 0.3, y: 100, opacity: 0, borderRadius: '100px' }}
            animate={{ scale: 1, y: 0, opacity: 1, borderRadius: '32px' }}
            exit={{ scale: 0.3, y: 100, opacity: 0, borderRadius: '100px' }}
            transition={{ duration: 0.6, ease: easing }}
            style={{
              width: '100%', maxWidth: 520, padding: 12,
              background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.4)', borderRadius: 32,
              boxShadow: '0 24px 80px rgba(0,0,0,0.2), 0 8px 32px rgba(0,0,0,0.1)',
            }}
          >
            <div style={{
              position: 'relative', maxHeight: 'calc(90vh - 24px)', overflowY: 'auto',
              padding: '2.5rem 2rem 2rem', background: '#fff', borderRadius: 22,
              scrollbarWidth: 'none',
            }}>
              {/* Close */}
              <button
                onClick={() => setState('button')}
                aria-label="Close"
                style={{
                  position: 'absolute', top: '1rem', right: '1rem',
                  width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: 'none', cursor: 'pointer', borderRadius: '50%',
                  background: 'rgba(11,55,93,0.06)', color: 'var(--navy)',
                  transition: 'background 0.3s ease, transform 0.3s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'rotate(90deg)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'rotate(0deg)')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              {/* Intro */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                style={{
                  fontFamily: 'var(--font-heading)', fontWeight: 300, fontStyle: 'italic',
                  fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', lineHeight: 1.5,
                  color: 'var(--navy)', marginBottom: '1.75rem', paddingRight: '2rem',
                }}
              >
                Tell us how we can help. Troy will be in touch personally.
              </motion.p>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Inputs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
                >
                  {[
                    { type: 'text', placeholder: 'Your Name', value: name, onChange: setName, required: true },
                    { type: 'email', placeholder: 'Email Address', value: email, onChange: setEmail, required: true },
                    { type: 'tel', placeholder: 'Phone (optional)', value: phone, onChange: setPhone, required: false },
                  ].map((field) => (
                    <input
                      key={field.placeholder}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      required={field.required}
                      style={{
                        width: '100%', padding: '0.875rem 1.125rem',
                        background: 'rgba(11,55,93,0.03)', border: '1px solid rgba(11,55,93,0.2)',
                        borderRadius: 12, fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                        color: 'var(--navy)', outline: 'none',
                      }}
                    />
                  ))}
                </motion.div>

                {/* Services */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <p style={{
                    fontFamily: 'var(--font-eyebrow)', fontSize: '0.65rem',
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: 'rgba(11,55,93,0.4)', marginBottom: '0.75rem',
                  }}>
                    How can we help?
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '0.5rem' }}>
                    {SERVICE_OPTIONS.map((svc, i) => (
                      <motion.button
                        key={svc.id}
                        type="button"
                        onClick={() => toggleService(svc.id)}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.55 + i * 0.04 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          display: 'flex', flexDirection: 'column', alignItems: 'center',
                          gap: '0.35rem', padding: '0.75rem 0.25rem',
                          background: selected.includes(svc.id) ? 'rgba(11,55,93,0.08)' : 'rgba(11,55,93,0.03)',
                          border: selected.includes(svc.id) ? '1px solid rgba(11,55,93,0.3)' : '1px solid rgba(11,55,93,0.1)',
                          borderRadius: 14, cursor: 'pointer',
                          transition: 'all 0.25s ease',
                          boxShadow: selected.includes(svc.id) ? '0 2px 12px rgba(11,55,93,0.08)' : 'none',
                        }}
                      >
                        <span style={{ fontSize: '1.25rem', lineHeight: 1 }}>{svc.icon}</span>
                        <span style={{
                          fontFamily: 'var(--font-eyebrow)', fontSize: '0.52rem',
                          letterSpacing: '0.05em', textTransform: 'uppercase',
                          color: selected.includes(svc.id) ? 'var(--navy)' : 'rgba(11,55,93,0.45)',
                          textAlign: 'center', lineHeight: 1.2,
                        }}>
                          {svc.label}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* SMS Consent — A2P 10DLC / CallRail compliance */}
                <motion.label
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.65 }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', cursor: 'pointer' }}
                >
                  <input
                    type="checkbox"
                    checked={smsConsent}
                    onChange={(e) => setSmsConsent(e.target.checked)}
                    required
                    style={{ marginTop: 3, flexShrink: 0, accentColor: 'var(--navy)', width: 15, height: 15 }}
                  />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'rgba(11,55,93,0.55)', lineHeight: 1.5 }}>
                    By checking this box, I consent to receive text messages from the Law Office of Troy M. Moore regarding my inquiry. Message frequency may vary. Message and data rates may apply.{' '}
                    <strong style={{ color: 'rgba(11,55,93,0.7)' }}>Reply STOP to opt out.</strong>{' '}
                    This consent is not required to obtain legal services.
                  </span>
                </motion.label>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || !smsConsent}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    width: '100%', padding: '1rem', background: 'var(--navy)', color: '#fff',
                    border: 'none', borderRadius: 14, fontFamily: 'var(--font-eyebrow)',
                    fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                    cursor: (isSubmitting || !smsConsent) ? 'not-allowed' : 'pointer', minHeight: 52,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 20px rgba(11,55,93,0.2)',
                    opacity: (isSubmitting || !smsConsent) ? 0.5 : 1,
                  }}
                >
                  {isSubmitting ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      style={{
                        display: 'block', width: 20, height: 20,
                        border: '2px solid rgba(255,255,255,0.2)',
                        borderTopColor: '#fff', borderRadius: '50%',
                      }}
                    />
                  ) : 'Send Message'}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}

      {show && state === 'success' && (
        <motion.div
          key="cta-success"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(11,55,93,0.35)', backdropFilter: 'blur(8px)',
            padding: '1.5rem',
          }}
        >
          <motion.div
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: easing }}
            style={{
              width: '100%', maxWidth: 420, padding: '3rem 2rem',
              background: '#fff', borderRadius: 22,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              textAlign: 'center', gap: '1rem',
            }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, ease: easing, delay: 0.2 }}
              style={{
                width: 64, height: 64, borderRadius: '50%',
                background: 'rgba(195,160,91,0.1)', border: '1px solid rgba(195,160,91,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--gold)', marginBottom: '0.5rem',
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{ fontFamily: 'var(--font-heading)', fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', color: 'var(--navy)' }}
            >
              Talk to you soon.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'rgba(11,55,93,0.5)' }}
            >
              Troy will be in touch personally within 24 hours.
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
