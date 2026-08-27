import React, { useState } from 'react';
import { weddingConfig } from '../../config/wedding';
import { saveRsvp } from '../../utils/storage';
import { SectionDivider } from '../SectionDivider/SectionDivider';
import confetti from 'canvas-confetti';
import { Heart, CheckCircle2, User, Phone, Users, Calendar, Send } from 'lucide-react';

import { submitToWeb3Forms } from '../../utils/web3forms';

export const RSVP: React.FC = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [guestsCount, setGuestsCount] = useState<number>(1);
  const [selectedEvents, setSelectedEvents] = useState<string[]>([
    'Reception — Hosur (12 Sep, 7:00 PM)',
    'Wedding Ceremony — Hosur (13 Sep, 4:20 AM)',
  ]);
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleEvent = (eventName: string) => {
    setSelectedEvents((prev) =>
      prev.includes(eventName) ? prev.filter((e) => e !== eventName) : [...prev, eventName]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) {
      alert('Please provide your name and contact details.');
      return;
    }

    setIsSubmitting(true);

    // 1. Submit to Web3Forms
    await submitToWeb3Forms(
      {
        form_type: 'Wedding RSVP',
        guest_name: name.trim(),
        guest_contact: contact.trim(),
        is_attending: attending === 'yes' ? 'Yes, attending with joy!' : 'Regrets / Unable to attend',
        guests_count: attending === 'yes' ? guestsCount : 0,
        selected_events: attending === 'yes' ? selectedEvents.join(', ') : 'None',
        special_message_or_dietary_note: message.trim() || 'None',
        submitted_at: new Date().toLocaleString(),
      },
      `RSVP: ${name.trim()} (${attending === 'yes' ? 'Attending - ' + guestsCount + ' Guests' : 'Declined'})`
    );

    // 2. Save locally for instant confirmation & offline backup
    saveRsvp({
      name: name.trim(),
      contact: contact.trim(),
      attending,
      guestsCount: attending === 'yes' ? guestsCount : 0,
      selectedEvents: attending === 'yes' ? selectedEvents : [],
      message: message.trim(),
    });

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Trigger subtle celebration petals confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#BD2B40', '#C9A45C', '#FAF6EE', '#3E7D5A'],
      });
    } catch (err) {
      console.log('Confetti triggered', err);
    }
  };

  return (
    <section
      id="rsvp"
      className="py-24 bg-personality-rsvp relative overflow-hidden"
      style={{
        padding: 'clamp(64px, 8vw, 110px) 0',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div className="section-container" style={{ maxWidth: '880px' }}>
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">JOIN OUR CELEBRATION</span>
          <h2 className="section-title">{weddingConfig.rsvp.heading}</h2>
          <p className="section-subtitle">{weddingConfig.rsvp.subheading}</p>
        </div>

        {/* RSVP Card / Confirmation Stage */}
        <div
          className="stationery-card gold-stationery-frame"
          style={{
            borderRadius: 'clamp(24px, 4vw, 36px)',
            border: '2px solid var(--color-gold)',
            boxShadow: '0 25px 60px rgba(26, 5, 10, 0.6)',
            padding: 'clamp(24px, 4.5vw, 48px) clamp(16px, 3.5vw, 40px)',
            backgroundColor: '#FAF6EE',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          {isSubmitted ? (
            <div
              style={{
                textAlign: 'center',
                padding: 'clamp(24px, 4vw, 40px) 10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                animation: 'fadeInScale 0.4s ease',
              }}
            >
              <div
                style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  backgroundColor: '#FAF0E6',
                  border: '2px solid var(--color-crimson)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-crimson)',
                  marginBottom: '6px',
                  boxShadow: '0 8px 24px rgba(140, 29, 47, 0.2)',
                }}
              >
                <CheckCircle2 size={38} />
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-serif-display)',
                  fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
                  color: '#3B0D18',
                  lineHeight: 1.15,
                  margin: 0,
                }}
              >
                Thank You, {name}!
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)',
                  color: 'var(--color-forest-rich)',
                  maxWidth: '500px',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {attending === 'yes'
                  ? 'We are delighted to celebrate our special day with you. Your presence means the world to us and our families!'
                  : 'Thank you for your warm wishes. We will miss you at the celebrations, but carry your blessings in our hearts.'}
              </p>

              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setName('');
                  setContact('');
                  setMessage('');
                }}
                className="btn-secondary"
                style={{
                  marginTop: '12px',
                  color: '#3B0D18',
                  borderColor: 'var(--color-gold)',
                  minHeight: '46px',
                }}
              >
                Submit another response
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px', width: '100%' }}>
              {/* Name & Contact Fields */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
                  gap: '16px',
                  width: '100%',
                }}
              >
                <div>
                  <label
                    style={{
                      fontFamily: 'var(--font-serif-royal)',
                      fontSize: '0.74rem',
                      letterSpacing: '0.14em',
                      fontWeight: 700,
                      color: '#3B0D18',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginBottom: '6px',
                    }}
                  >
                    <User size={14} color="var(--color-crimson)" />
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    style={{
                      width: '100%',
                      minHeight: '48px',
                      padding: '12px 16px',
                      borderRadius: '16px',
                      border: '1.5px solid rgba(201, 164, 92, 0.45)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.95rem',
                      outline: 'none',
                      backgroundColor: '#FFFFFF',
                      color: '#3B0D18',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      fontFamily: 'var(--font-serif-royal)',
                      fontSize: '0.74rem',
                      letterSpacing: '0.14em',
                      fontWeight: 700,
                      color: '#3B0D18',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginBottom: '6px',
                    }}
                  >
                    <Phone size={14} color="var(--color-crimson)" />
                    PHONE / EMAIL *
                  </label>
                  <input
                    type="text"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Phone number or email"
                    style={{
                      width: '100%',
                      minHeight: '48px',
                      padding: '12px 16px',
                      borderRadius: '16px',
                      border: '1.5px solid rgba(201, 164, 92, 0.45)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.95rem',
                      outline: 'none',
                      backgroundColor: '#FFFFFF',
                      color: '#3B0D18',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              {/* Will you attend? Toggle */}
              <div>
                <label
                  style={{
                    fontFamily: 'var(--font-serif-royal)',
                    fontSize: '0.74rem',
                    letterSpacing: '0.14em',
                    fontWeight: 700,
                    color: '#3B0D18',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  WILL YOU BE ATTENDING? *
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))', gap: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setAttending('yes')}
                    style={{
                      minHeight: '48px',
                      padding: '12px 14px',
                      borderRadius: '16px',
                      border: attending === 'yes' ? '2px solid var(--color-forest)' : '1.5px solid rgba(201, 164, 92, 0.35)',
                      backgroundColor: attending === 'yes' ? 'var(--color-sage-light)' : '#FFFFFF',
                      color: attending === 'yes' ? 'var(--color-forest-rich)' : 'var(--text-muted-on-light)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.92rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxSizing: 'border-box',
                    }}
                  >
                    <CheckCircle2 size={16} />
                    <span>Yes, I'll be there!</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttending('no')}
                    style={{
                      minHeight: '48px',
                      padding: '12px 14px',
                      borderRadius: '16px',
                      border: attending === 'no' ? '2px solid var(--color-crimson)' : '1.5px solid rgba(201, 164, 92, 0.35)',
                      backgroundColor: attending === 'no' ? '#FAF2EF' : '#FFFFFF',
                      color: attending === 'no' ? 'var(--color-crimson)' : 'var(--text-muted-on-light)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.92rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxSizing: 'border-box',
                    }}
                  >
                    <Heart size={16} />
                    <span>Sorry, can't make it</span>
                  </button>
                </div>
              </div>

              {/* Number of Guests (Only if attending) */}
              {attending === 'yes' && (
                <div>
                  <label
                    style={{
                      fontFamily: 'var(--font-serif-royal)',
                      fontSize: '0.74rem',
                      letterSpacing: '0.14em',
                      fontWeight: 700,
                      color: '#3B0D18',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginBottom: '8px',
                    }}
                  >
                    <Users size={14} color="var(--color-crimson)" />
                    NUMBER OF GUESTS (INCLUDING YOURSELF)
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    {[1, 2, 3, 4, 5, '6+'].map((num, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setGuestsCount(typeof num === 'number' ? num : 6)}
                        style={{
                          flex: '1 1 44px',
                          minHeight: '46px',
                          padding: '10px 0',
                          borderRadius: '14px',
                          border:
                            (typeof num === 'number' && guestsCount === num) || (num === '6+' && guestsCount >= 6)
                              ? '2px solid var(--color-gold)'
                              : '1px solid rgba(201, 164, 92, 0.35)',
                          backgroundColor:
                            (typeof num === 'number' && guestsCount === num) || (num === '6+' && guestsCount >= 6)
                              ? '#FFFDF9'
                              : '#FFFFFF',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.95rem',
                          fontWeight: 700,
                          color:
                            (typeof num === 'number' && guestsCount === num) || (num === '6+' && guestsCount >= 6)
                              ? 'var(--color-crimson)'
                              : '#3B0D18',
                          cursor: 'pointer',
                          boxSizing: 'border-box',
                        }}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Events attending checkboxes */}
              {attending === 'yes' && (
                <div>
                  <label
                    style={{
                      fontFamily: 'var(--font-serif-royal)',
                      fontSize: '0.74rem',
                      letterSpacing: '0.14em',
                      fontWeight: 700,
                      color: '#3B0D18',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginBottom: '8px',
                    }}
                  >
                    <Calendar size={14} color="var(--color-crimson)" />
                    WHICH EVENTS WILL YOU ATTEND?
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                    {weddingConfig.rsvp.eventsList.map((eventName) => {
                      const checked = selectedEvents.includes(eventName);
                      return (
                        <div
                          key={eventName}
                          onClick={() => toggleEvent(eventName)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '12px 14px',
                            borderRadius: '14px',
                            backgroundColor: checked ? '#FFFDF9' : '#FFFFFF',
                            border: checked ? '1.5px solid var(--color-gold)' : '1px solid rgba(201, 164, 92, 0.35)',
                            cursor: 'pointer',
                            width: '100%',
                            boxSizing: 'border-box',
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => {}}
                            style={{ accentColor: 'var(--color-crimson)', width: '18px', height: '18px', flexShrink: 0 }}
                          />
                          <span
                            style={{
                              fontFamily: 'var(--font-sans)',
                              fontSize: '0.88rem',
                              fontWeight: 600,
                              color: '#3B0D18',
                            }}
                          >
                            {eventName}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Message Note */}
              <div>
                <label
                  style={{
                    fontFamily: 'var(--font-serif-royal)',
                    fontSize: '0.74rem',
                    letterSpacing: '0.14em',
                    fontWeight: 700,
                    color: '#3B0D18',
                    display: 'block',
                    marginBottom: '6px',
                  }}
                >
                  SPECIAL MESSAGE OR NOTE (OPTIONAL)
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share a wish or note for the couple..."
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '16px',
                    border: '1.5px solid rgba(201, 164, 92, 0.45)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.92rem',
                    outline: 'none',
                    backgroundColor: '#FFFFFF',
                    color: '#3B0D18',
                    resize: 'vertical',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
                style={{
                  width: '100%',
                  minHeight: '50px',
                  fontSize: '0.92rem',
                  letterSpacing: '0.08em',
                  marginTop: '4px',
                }}
              >
                <Send size={15} />
                <span>{isSubmitting ? 'Confirming Invitation...' : 'Send RSVP Response'}</span>
              </button>
            </form>
          )}
        </div>

        <SectionDivider variant="gold" />
      </div>
    </section>
  );
};
