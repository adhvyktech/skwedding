import React, { useState, useEffect } from 'react';
import { weddingConfig } from '../../config/wedding';
import { getStoredWishes, addWish, toggleWishLike } from '../../utils/storage';
import type { WishData } from '../../utils/storage';
import { SectionDivider } from '../SectionDivider/SectionDivider';
import { Heart, Send, Sparkles } from 'lucide-react';

export const Wishes: React.FC = () => {
  const [wishes, setWishes] = useState<WishData[]>([]);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('Friend');
  const [message, setMessage] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  useEffect(() => {
    setWishes(getStoredWishes());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsPosting(true);
    setTimeout(() => {
      addWish(name, relation, message);
      setWishes(getStoredWishes());
      setName('');
      setMessage('');
      setIsPosting(false);
    }, 300);
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
        padding: '110px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="section-container" style={{ maxWidth: '1180px', margin: '0 auto' }}>
        {/* Section Header */}
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="section-eyebrow">GUESTBOOK & BLESSINGS</span>
          <h2 className="section-title">{weddingConfig.wishes.heading}</h2>
          <p className="section-subtitle">{weddingConfig.wishes.subheading}</p>
        </div>

        {/* Input Form & Wishes Wall Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '36px',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Form to Write a Blessing */}
          <div
            style={{
              borderRadius: '32px',
              padding: '36px 30px',
              backgroundColor: '#FAF6EE',
              border: '2px solid #C9A45C',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.4)',
              color: '#3B0D18',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '22px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: '#FAF2EF',
                  border: '1.5px solid #C9A45C',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#8C1D2F',
                  flexShrink: 0,
                }}
              >
                <Heart size={20} fill="#8C1D2F" />
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif-display)', fontSize: '1.75rem', color: '#3B0D18', margin: 0, lineHeight: 1.15 }}>
                  Send Your Blessing
                </h3>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: '#A8833B', fontWeight: 600 }}>
                  FOR SARVESH & KEERTHANA
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label
                  style={{
                    fontFamily: 'var(--font-serif-royal)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.14em',
                    fontWeight: 700,
                    color: '#3B0D18',
                    display: 'block',
                    marginBottom: '6px',
                  }}
                >
                  YOUR NAME *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Uncle / Sneha"
                  style={{
                    width: '100%',
                    padding: '13px 16px',
                    borderRadius: '14px',
                    border: '1.5px solid rgba(201, 164, 92, 0.5)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.92rem',
                    outline: 'none',
                    backgroundColor: '#FFFFFF',
                    color: '#3B0D18',
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    fontFamily: 'var(--font-serif-royal)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.14em',
                    fontWeight: 700,
                    color: '#3B0D18',
                    display: 'block',
                    marginBottom: '6px',
                  }}
                >
                  RELATION / TAG
                </label>
                <select
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '13px 16px',
                    borderRadius: '14px',
                    border: '1.5px solid rgba(201, 164, 92, 0.5)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.92rem',
                    outline: 'none',
                    backgroundColor: '#FFFFFF',
                    color: '#3B0D18',
                  }}
                >
                  <option value="Family">Family</option>
                  <option value="Friend">Friend</option>
                  <option value="Colleague">Colleague</option>
                  <option value="Well-wisher">Well-wisher</option>
                </select>
              </div>

              <div>
                <label
                  style={{
                    fontFamily: 'var(--font-serif-royal)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.14em',
                    fontWeight: 700,
                    color: '#3B0D18',
                    display: 'block',
                    marginBottom: '6px',
                  }}
                >
                  YOUR BLESSING / MESSAGE *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="May your journey together be blessed with..."
                  style={{
                    width: '100%',
                    padding: '13px 16px',
                    borderRadius: '14px',
                    border: '1.5px solid rgba(201, 164, 92, 0.5)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.92rem',
                    outline: 'none',
                    backgroundColor: '#FFFFFF',
                    color: '#3B0D18',
                    resize: 'vertical',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isPosting}
                className="btn-primary"
                style={{
                  width: '100%',
                  height: '48px',
                  fontSize: '0.9rem',
                  letterSpacing: '0.08em',
                  marginTop: '4px',
                }}
              >
                <Send size={15} />
                <span>{isPosting ? 'Publishing...' : 'Post Blessing'}</span>
              </button>
            </form>
          </div>

          {/* Right Column: Display List of Wishes — Crisp, Beautifully Styled & 100% Readable */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              maxHeight: '680px',
              overflowY: 'auto',
              paddingRight: '6px',
            }}
          >
            {wishes.map((wish) => (
              <div
                key={wish.id}
                style={{
                  borderRadius: '24px',
                  border: '1.5px solid #C9A45C',
                  padding: '24px 28px',
                  position: 'relative',
                  backgroundColor: '#FFFDF9',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                  color: '#3B0D18',
                  height: 'auto',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = '#E1C98A';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(201, 164, 92, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.borderColor = '#C9A45C';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.08)';
                }}
              >
                {/* Header of Wish Card */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px', gap: '12px' }}>
                  <div>
                    <h4
                      style={{
                        fontFamily: 'var(--font-serif-display)',
                        fontSize: '1.4rem',
                        color: '#3B0D18',
                        fontWeight: 600,
                        lineHeight: 1.25,
                        margin: 0,
                      }}
                    >
                      {wish.name}
                    </h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                      <Sparkles size={12} color="#A8833B" />
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.78rem',
                          color: '#A8833B',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                        }}
                      >
                        {wish.relation} • {wish.date}
                      </span>
                    </div>
                  </div>

                  {/* Heart / Like blessing button */}
                  <button
                    onClick={() => handleLike(wish.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: '#FAF2EF',
                      border: '1.5px solid rgba(217, 131, 121, 0.5)',
                      borderRadius: '20px',
                      padding: '6px 14px',
                      cursor: 'pointer',
                      color: '#8C1D2F',
                      fontSize: '0.85rem',
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 700,
                      transition: 'transform 0.2s ease',
                      flexShrink: 0,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    aria-label={`Like wish from ${wish.name}`}
                  >
                    <Heart size={14} fill="#8C1D2F" />
                    <span>{wish.likes}</span>
                  </button>
                </div>

                {/* Full Blessing Message — Explicit Crisp Dark Maroon Text */}
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.96rem',
                    color: '#2A0811',
                    lineHeight: 1.65,
                    fontStyle: 'italic',
                    margin: 0,
                    paddingTop: '10px',
                    borderTop: '1px dashed rgba(201, 164, 92, 0.35)',
                    wordBreak: 'break-word',
                  }}
                >
                  "{wish.message}"
                </p>
              </div>
            ))}
          </div>
        </div>

        <SectionDivider variant="gold" />
      </div>
    </section>
  );
};
