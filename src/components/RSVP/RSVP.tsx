import React, { useState } from 'react';
import { weddingConfig } from '../../config/wedding';
import { saveRsvp } from '../../utils/storage';
import { SectionDivider } from '../SectionDivider/SectionDivider';
import confetti from 'canvas-confetti';
import { Heart, CheckCircle2, User, Phone, Users, Calendar, Send } from 'lucide-react';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) {
      alert('Please provide your name and contact details.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
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
    }, 400);
  };

  return (
    <section
      id="rsvp"
      className="py-24 bg-personality-rsvp relative overflow-hidden"
      style={{
        padding: '110px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="section-container" style={{ maxWidth: '880px', margin: '0 auto' }}>
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
            borderRadius: '36px',
            border: '2px solid var(--color-gold)',
            boxShadow: '0 25px 60px rgba(26, 5, 10, 0.6)',
            padding: 'clamp(32px, 5vw, 54px)',
            backgroundColor: '#FAF6EE',
          }}
        >
          {isSubmitted ? (
            <div
              style={{
                textAlign: 'center',
                padding: '40px 20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '18px',
                animation: 'fadeInScale 0.4s ease',
              }}
            >
              <div
                style={{
                  width: '76px',
                  height: '76px',
                  borderRadius: '50%',
                  backgroundColor: '#FAF0E6',
                  border: '2px solid var(--color-crimson)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-crimson)',
                  marginBottom: '8px',
                  boxShadow: '0 8px 24px rgba(140, 29, 47, 0.2)',
                }}
              >
                <CheckCircle2 size={44} />
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-serif-display)',
                  fontSize: '2.4rem',
                  color: 'var(--color-maroon-dark)',
                }}
              >
                Thank You, {name}!
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.05rem',
                  color: 'var(--color-forest-rich)',
                  maxWidth: '500px',
                  lineHeight: 1.6,
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
                  marginTop: '16px',
                  color: 'var(--color-maroon-dark)',
                  borderColor: 'var(--color-gold)',
                }}
              >
                Submit another response
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
              {/* Name & Contact Fields */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '20px',
                }}
              >
                <div>
                  <label
                    style={{
                      fontFamily: 'var(--font-serif-royal)',
                      fontSize: '0.78rem',
                      letterSpacing: '0.14em',
                      fontWeight: 700,
                      color: 'var(--color-maroon-dark)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginBottom: '8px',
                    }}
                  >
                    <User size={15} color="var(--color-crimson)" />
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
                      padding: '14px 18px',
                      borderRadius: '16px',
                      border: '1.5px solid rgba(201, 164, 92, 0.4)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.95rem',
                      outline: 'none',
                      backgroundColor: '#FFFFFF',
                      color: 'var(--color-maroon-dark)',
                      transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-gold)';
                      e.currentTarget.style.boxShadow = '0 0 12px rgba(201, 164, 92, 0.3)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(201, 164, 92, 0.4)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      fontFamily: 'var(--font-serif-royal)',
                      fontSize: '0.78rem',
                      letterSpacing: '0.14em',
                      fontWeight: 700,
                      color: 'var(--color-maroon-dark)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginBottom: '8px',
                    }}
                  >
                    <Phone size={15} color="var(--color-crimson)" />
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
                      padding: '14px 18px',
                      borderRadius: '16px',
                      border: '1.5px solid rgba(201, 164, 92, 0.4)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.95rem',
                      outline: 'none',
                      backgroundColor: '#FFFFFF',
                      color: 'var(--color-maroon-dark)',
                      transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-gold)';
                      e.currentTarget.style.boxShadow = '0 0 12px rgba(201, 164, 92, 0.3)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(201, 164, 92, 0.4)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Will you attend? Toggle */}
              <div>
                <label
                  style={{
                    fontFamily: 'var(--font-serif-royal)',
                    fontSize: '0.78rem',
                    letterSpacing: '0.14em',
                    fontWeight: 700,
                    color: 'var(--color-maroon-dark)',
                    display: 'block',
                    marginBottom: '10px',
                  }}
                >
                  WILL YOU BE ATTENDING? *
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <button
                    type="button"
                    onClick={() => setAttending('yes')}
                    style={{
                      padding: '16px',
                      borderRadius: '18px',
                      border: attending === 'yes' ? '2px solid var(--color-forest)' : '1.5px solid rgba(201, 164, 92, 0.3)',
                      backgroundColor: attending === 'yes' ? 'var(--color-sage-light)' : '#FFFFFF',
                      color: attending === 'yes' ? 'var(--color-forest-rich)' : 'var(--text-muted-on-light)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <CheckCircle2 size={18} />
                    <span>Yes, I'll be there!</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttending('no')}
                    style={{
                      padding: '16px',
                      borderRadius: '18px',
                      border: attending === 'no' ? '2px solid var(--color-crimson)' : '1.5px solid rgba(201, 164, 92, 0.3)',
                      backgroundColor: attending === 'no' ? '#FAF2EF' : '#FFFFFF',
                      color: attending === 'no' ? 'var(--color-crimson)' : 'var(--text-muted-on-light)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <Heart size={18} />
                    <span>Sorry, I can't make it</span>
                  </button>
                </div>
              </div>

              {/* Number of Guests (Only if attending) */}
              {attending === 'yes' && (
                <div>
                  <label
                    style={{
                      fontFamily: 'var(--font-serif-royal)',
                      fontSize: '0.78rem',
                      letterSpacing: '0.14em',
                      fontWeight: 700,
                      color: 'var(--color-maroon-dark)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginBottom: '8px',
                    }}
                  >
                    <Users size={15} color="var(--color-crimson)" />
                    NUMBER OF GUESTS (INCLUDING YOURSELF)
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {[1, 2, 3, 4, 5, '6+'].map((num, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setGuestsCount(typeof num === 'number' ? num : 6)}
                        style={{
                          flex: 1,
                          padding: '12px 0',
                          borderRadius: '14px',
                          border:
                            (typeof num === 'number' && guestsCount === num) || (num === '6+' && guestsCount >= 6)
                              ? '2px solid var(--color-gold)'
                              : '1px solid rgba(201, 164, 92, 0.3)',
                          backgroundColor:
                            (typeof num === 'number' && guestsCount === num) || (num === '6+' && guestsCount >= 6)
                              ? '#FFFDF9'
                              : '#FFFFFF',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '1rem',
                          fontWeight: 700,
                          color:
                            (typeof num === 'number' && guestsCount === num) || (num === '6+' && guestsCount >= 6)
                              ? 'var(--color-crimson)'
                              : 'var(--color-maroon-dark)',
                          cursor: 'pointer',
                          boxShadow:
                            (typeof num === 'number' && guestsCount === num) || (num === '6+' && guestsCount >= 6)
                              ? '0 4px 12px rgba(201, 164, 92, 0.25)'
                              : 'none',
                          transition: 'all 0.2s ease',
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
                      fontSize: '0.78rem',
                      letterSpacing: '0.14em',
                      fontWeight: 700,
                      color: 'var(--color-maroon-dark)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginBottom: '10px',
                    }}
                  >
                    <Calendar size={15} color="var(--color-crimson)" />
                    WHICH EVENTS WILL YOU ATTEND?
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {weddingConfig.rsvp.eventsList.map((eventName) => {
                      const checked = selectedEvents.includes(eventName);
                      return (
                        <div
                          key={eventName}
                          onClick={() => toggleEvent(eventName)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '14px 18px',
                            borderRadius: '16px',
                            backgroundColor: checked ? '#FFFDF9' : '#FFFFFF',
                            border: checked ? '1.5px solid var(--color-gold)' : '1px solid rgba(201, 164, 92, 0.3)',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => {}}
                            style={{ accentColor: 'var(--color-crimson)', width: '18px', height: '18px' }}
                          />
                          <span
                            style={{
                              fontFamily: 'var(--font-sans)',
                              fontSize: '0.92rem',
                              fontWeight: 600,
                              color: 'var(--color-maroon-dark)',
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
                    fontSize: '0.78rem',
                    letterSpacing: '0.14em',
                    fontWeight: 700,
                    color: 'var(--color-maroon-dark)',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  SPECIAL MESSAGE OR DIETARY NOTE (OPTIONAL)
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share a wish or note for the couple..."
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    borderRadius: '16px',
                    border: '1.5px solid rgba(201, 164, 92, 0.4)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.95rem',
                    outline: 'none',
                    backgroundColor: '#FFFFFF',
                    color: 'var(--color-maroon-dark)',
                    resize: 'vertical',
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
                  height: '52px',
                  fontSize: '0.95rem',
                  letterSpacing: '0.1em',
                  marginTop: '8px',
                }}
              >
                <Send size={16} />
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
