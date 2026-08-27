import React, { useState, useEffect } from 'react';
import { weddingConfig } from '../../config/wedding';
import { getStoredWishes, toggleWishLike } from '../../utils/storage';
import type { WishData } from '../../utils/storage';
import { SectionDivider } from '../SectionDivider/SectionDivider';
import confetti from 'canvas-confetti';
import { Heart, Send, Sparkles, MessageCircleHeart, User, Users, CheckCircle2 } from 'lucide-react';
import { submitToWeb3Forms } from '../../utils/web3forms';

export const Wishes: React.FC = () => {
  const [wishes, setWishes] = useState<WishData[]>([]);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('Friend');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setWishes(getStoredWishes());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);

    // 1. Submit to Web3Forms
    await submitToWeb3Forms(
      {
        form_type: 'Wedding Guestbook Blessing',
        well_wisher_name: name.trim(),
        relation_or_group: relation.trim(),
        blessing_message: message.trim(),
        submitted_at: new Date().toLocaleString(),
      },
      `Guestbook Blessing from ${name.trim()} (${relation.trim()})`
    );

    // 2. Clear inputs & show confirmation (list stays stable with prewritten data)
    setName('');
    setMessage('');
    setIsSubmitting(false);
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.8 },
        colors: ['#BD2B40', '#C9A45C', '#FAF6EE'],
      });
    } catch (err) {
      console.log('Confetti', err);
    }
  };

  const handleLike = (id: string) => {
    const updated = toggleWishLike(id);
    setWishes(updated);
  };

  return (
    <section
      id="wishes"
      className="py-24 bg-personality-wishes relative overflow-hidden"
      style={{
        padding: 'clamp(64px, 8vw, 110px) 0',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div className="section-container" style={{ maxWidth: '1160px' }}>
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">BLESSINGS & GUESTBOOK</span>
          <h2 className="section-title">{weddingConfig.wishes.heading}</h2>
          <p className="section-subtitle">{weddingConfig.wishes.subheading}</p>
        </div>

        {/* 2-Column Responsive Layout: Stacks 1-Col on Mobile, 2-Col on Desktop */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: 'clamp(24px, 4vw, 36px)',
            alignItems: 'start',
            marginBottom: 'clamp(32px, 5vw, 48px)',
            width: '100%',
          }}
        >
          {/* Left Column: Leave a Blessing Form */}
          <div
            className="stationery-card gold-stationery-frame"
            style={{
              borderRadius: 'clamp(24px, 4vw, 32px)',
              border: '2px solid rgba(201, 164, 92, 0.65)',
              padding: 'clamp(24px, 4vw, 36px)',
              backgroundColor: '#FAF6EE',
              boxShadow: '0 16px 45px rgba(26, 5, 10, 0.5)',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
              <MessageCircleHeart size={20} color="var(--color-crimson)" />
              <h3
                style={{
                  fontFamily: 'var(--font-serif-display)',
                  fontSize: 'clamp(1.5rem, 3vw, 1.9rem)',
                  color: '#3B0D18',
                  lineHeight: 1.2,
                  margin: 0,
                }}
              >
                Send Your Blessings
              </h3>
            </div>

            {isSubmitted ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '24px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                  backgroundColor: '#FAF2EF',
                  borderRadius: '20px',
                  border: '1.5px solid rgba(217, 131, 121, 0.45)',
                  animation: 'fadeInScale 0.35s ease',
                }}
              >
                <CheckCircle2 size={36} color="var(--color-crimson)" />
                <h4
                  style={{
                    fontFamily: 'var(--font-serif-display)',
                    fontSize: '1.4rem',
                    color: '#3B0D18',
                    margin: 0,
                  }}
                >
                  Blessing Received!
                </h4>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.86rem',
                    color: 'var(--color-forest-rich)',
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  Thank you for your heartfelt prayers and blessings. Your warm wishes have been sent to Sarvesh & Keerthana!
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="btn-secondary"
                  style={{
                    minHeight: '40px',
                    fontSize: '0.78rem',
                    padding: '6px 16px',
                    marginTop: '8px',
                    color: '#3B0D18',
                    borderColor: 'var(--color-gold)',
                  }}
                >
                  Send another blessing
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
                <div>
                  <label
                    style={{
                      fontFamily: 'var(--font-serif-royal)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.14em',
                      fontWeight: 700,
                      color: '#3B0D18',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginBottom: '6px',
                    }}
                  >
                    <User size={13} color="var(--color-crimson)" />
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramesh Uncle / Priya & Team"
                    style={{
                      width: '100%',
                      minHeight: '46px',
                      padding: '10px 14px',
                      borderRadius: '14px',
                      border: '1.5px solid rgba(201, 164, 92, 0.45)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.92rem',
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
                      fontSize: '0.72rem',
                      letterSpacing: '0.14em',
                      fontWeight: 700,
                      color: '#3B0D18',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginBottom: '6px',
                    }}
                  >
                    <Users size={13} color="var(--color-crimson)" />
                    RELATION / GROUP
                  </label>
                  <select
                    value={relation}
                    onChange={(e) => setRelation(e.target.value)}
                    style={{
                      width: '100%',
                      minHeight: '46px',
                      padding: '10px 14px',
                      borderRadius: '14px',
                      border: '1.5px solid rgba(201, 164, 92, 0.45)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.92rem',
                      outline: 'none',
                      backgroundColor: '#FFFFFF',
                      color: '#3B0D18',
                      cursor: 'pointer',
                      boxSizing: 'border-box',
                    }}
                  >
                    <option value="Family">Family / Relative</option>
                    <option value="Friend">Friend</option>
                    <option value="Colleague">Colleague / Work</option>
                    <option value="Well-wisher">Well-wisher</option>
                    <option value="Kutties">Kutties</option>
                  </select>
                </div>

                <div>
                  <label
                    style={{
                      fontFamily: 'var(--font-serif-royal)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.14em',
                      fontWeight: 700,
                      color: '#3B0D18',
                      display: 'block',
                      marginBottom: '6px',
                    }}
                  >
                    YOUR MESSAGE OR PRAYER *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share a heartfelt prayer, wish, or loving blessing for Sarvesh & Keerthana..."
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '14px',
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

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    minHeight: '48px',
                    fontSize: '0.88rem',
                    letterSpacing: '0.08em',
                    marginTop: '4px',
                  }}
                >
                  <Send size={15} />
                  <span>{isSubmitting ? 'Posting Blessing...' : 'Post Loving Blessing'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Stable Prewritten Curated Blessings Feed */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              maxHeight: '620px',
              overflowY: 'auto',
              paddingRight: '6px',
              width: '100%',
            }}
          >
            {wishes.map((wish) => (
              <div
                key={wish.id}
                className="hover-gold-glint"
                style={{
                  backgroundColor: '#FFFDF9',
                  borderRadius: '20px',
                  border: '1.5px solid rgba(201, 164, 92, 0.45)',
                  padding: '18px 20px',
                  boxShadow: '0 6px 18px rgba(0, 0, 0, 0.05)',
                  position: 'relative',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              >
                {/* Wish Top Meta Row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '8px',
                  }}
                >
                  <div>
                    <h4
                      style={{
                        fontFamily: 'var(--font-serif-display)',
                        fontSize: '1.25rem',
                        color: '#3B0D18',
                        margin: 0,
                        fontWeight: 600,
                      }}
                    >
                      {wish.name}
                    </h4>
                    <span
                      style={{
                        fontFamily: 'var(--font-serif-royal)',
                        fontSize: '0.68rem',
                        letterSpacing: '0.1em',
                        color: 'var(--color-crimson)',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                      }}
                    >
                      {wish.relation}
                    </span>
                  </div>

                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.74rem',
                      color: 'var(--color-gold-dark)',
                      fontWeight: 600,
                    }}
                  >
                    {wish.date}
                  </span>
                </div>

                {/* Message Body: Explicit Dark Contrast */}
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.88rem',
                    color: '#2A0811',
                    lineHeight: 1.55,
                    marginBottom: '12px',
                    overflowWrap: 'break-word',
                    wordBreak: 'normal',
                  }}
                >
                  {wish.message}
                </p>

                {/* Like Button & Gold Emblem */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '8px',
                    borderTop: '1px dashed rgba(201, 164, 92, 0.3)',
                  }}
                >
                  <button
                    onClick={() => handleLike(wish.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      color: 'var(--color-crimson)',
                      cursor: 'pointer',
                      fontSize: '0.78rem',
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 600,
                      padding: '4px 8px',
                      borderRadius: '12px',
                      transition: 'background 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FAF0E6')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <Heart size={13} fill="var(--color-crimson)" color="var(--color-crimson)" />
                    <span>{wish.likes} Blessings</span>
                  </button>

                  <Sparkles size={13} color="var(--color-gold-bright)" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <SectionDivider variant="gold" />
      </div>
    </section>
  );
};
