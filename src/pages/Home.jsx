import { Link } from 'react-router-dom';
import { BookOpen, Sparkles, Star, Users, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="home-page animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
      
      {/* Hero Section */}
      <section className="hero-section" style={{
        textAlign: 'center',
        padding: '60px 0 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px'
      }}>
        <div className="badge" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          borderRadius: '50px',
          backgroundColor: 'var(--color-accent-glow)',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          color: 'var(--color-accent)',
          fontWeight: '600',
          fontSize: '0.9rem'
        }}>
          <Sparkles size={14} /> Celebrating 100 Years of Community Impact
        </div>
        <h1 style={{ maxWidth: '800px', margin: '0 auto' }}>
          Supporting Our Community Through <span className="text-gradient">Rotary Yearbooks</span>
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: 'var(--text-secondary)',
          maxWidth: '640px',
          margin: '0 auto'
        }}>
          Every ad purchased and yearbook shared helps fund local community service projects, youth leadership initiatives, and critical community accessibility enhancements.
        </p>
        <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
          <Link to="/yearbooks/50" className="btn btn-accent glow-effect">
            Read 2026 Yearbook <BookOpen size={16} />
          </Link>
          <Link to="/yearbooks" className="btn btn-outline">
            Browse Archives <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '24px'
      }}>
        <div className="card" style={{ padding: '32px', textAlign: 'center', gap: '12px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: 'var(--color-accent-glow)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px',
            color: 'var(--color-accent)'
          }}>
            <Star size={24} />
          </div>
          <h3 style={{ fontSize: '2.5rem', fontWeight: '800' }}>1926</h3>
          <h4 style={{ fontWeight: '600', fontSize: '1rem', color: 'var(--text-primary)' }}>Year Established</h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Celebrating a century of community support and backing civic programs in Truro.
          </p>
        </div>

        <div className="card" style={{ padding: '32px', textAlign: 'center', gap: '12px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: 'var(--color-accent-glow)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px',
            color: 'var(--color-accent)'
          }}>
            <Users size={24} />
          </div>
          <h3 style={{ fontSize: '2.5rem', fontWeight: '800' }}>100%</h3>
          <h4 style={{ fontWeight: '600', fontSize: '1rem', color: 'var(--text-primary)' }}>Local Impact</h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            All yearbook advertisement revenue directly funds local Truro area community projects.
          </p>
        </div>

        <div className="card" style={{ padding: '32px', textAlign: 'center', gap: '12px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: 'var(--color-accent-glow)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px',
            color: 'var(--color-accent)'
          }}>
            <BookOpen size={24} />
          </div>
          <h3 style={{ fontSize: '2.5rem', fontWeight: '800' }}>23rd</h3>
          <h4 style={{ fontWeight: '600', fontSize: '1rem', color: 'var(--text-primary)' }}>Yearbook Edition</h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Proudly celebrating the 23rd publication edition of our community yearbook.
          </p>
        </div>
      </section>

      {/* Featured Yearbook (3D showcase) */}
      <section className="featured-section card" style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '48px',
        gap: '48px',
        flexWrap: 'wrap'
      }}>
        <div style={{ flex: '1 1 350px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ color: 'var(--color-accent)', fontWeight: '600', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
            Featured Publication
          </div>
          <h2>2026 Digital Yearbook</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            Explore our latest volume online. Our 2026 Yearbook highlights a banner year of community support, local directory listings, and memorable pictures from around our area.
          </p>
          <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
            <Link to="/yearbooks/50" className="btn btn-primary glow-effect">
              Open 2026 Book <BookOpen size={16} />
            </Link>
          </div>
        </div>

        {/* 3D Book Graphic */}
        <div style={{
          flex: '1 1 300px',
          display: 'flex',
          justifyContent: 'center',
          perspective: '1000px'
        }}>
          <div className="book-3d" style={{
            position: 'relative',
            width: '200px',
            height: '280px',
            transformStyle: 'preserve-3d',
            transform: 'rotateY(-20deg) rotateX(10deg)',
            boxShadow: '20px 20px 40px rgba(0, 0, 0, 0.3)',
            borderRadius: '4px 16px 16px 4px',
            transition: 'transform 0.5s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'rotateY(-5deg) rotateX(5deg) scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'rotateY(-20deg) rotateX(10deg)'}
          >
            {/* Spine */}
            <div style={{
              position: 'absolute',
              width: '28px',
              height: '100%',
              left: '-14px',
              top: 0,
              backgroundColor: 'var(--color-primary)',
              transform: 'rotateY(-90deg)',
              transformOrigin: 'right',
              borderRight: '1px solid rgba(255,255,255,0.1)'
            }} />
            
            {/* Front Cover */}
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              left: 0,
              top: 0,
              backgroundColor: 'var(--color-primary)',
              borderRadius: '4px 12px 12px 4px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '24px',
              color: 'var(--bg-secondary)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              boxSizing: 'border-box'
            }}>
              <div style={{ borderBottom: '2px solid var(--color-accent)', paddingBottom: '12px' }}>
                <div style={{ fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.8 }}>ROTARY CLUB</div>
                <div style={{ fontSize: '1.6rem', fontWeight: '800', lineHeight: 1.2, marginTop: '4px' }}>YEARBOOK</div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <BookOpen size={48} style={{ color: 'var(--color-accent)' }} />
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>TRURO CHAPTER</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--color-accent)' }}>2026</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsor CTA Section */}
      <section className="sponsor-cta-section" style={{
        background: 'linear-gradient(135deg, var(--color-primary) 0%, HSL(215, 60%, 10%) 100%)',
        color: 'var(--text-inverse)',
        padding: '56px',
        borderRadius: '24px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <h2 style={{ color: 'white' }}>Advertise in the 2026 Edition</h2>
        <p style={{ maxWidth: '600px', opacity: 0.9, fontSize: '1.05rem' }}>
          Showcase your business to thousands of local families and support civic development projects. Sign up to secure your ad space today.
        </p>
        <Link to="/contact" className="btn btn-accent glow-effect" style={{ marginTop: '8px' }}>
          Contact Advertising Team <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}
