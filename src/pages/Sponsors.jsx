import React, { useState } from 'react';
import { Search, Award, Star, Mail, ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// High-end sample local businesses categorized by tier
const sampleSponsors = [
  { id: 1, name: 'Truro Toyota', category: 'Automotive', tier: 'gold', phone: '(902) 895-9000', email: 'sales@trurotoyota.ca', url: 'https://www.trurotoyota.ca' },
  { id: 2, name: 'Rath Eastlink Community Centre', category: 'Recreation', tier: 'gold', phone: '(902) 897-3000', email: 'info@ratheastlinkcc.ca', url: 'https://www.ratheastlinkcc.ca' },
  { id: 3, name: 'Colchester Dental Group', category: 'Health & Wellness', tier: 'gold', phone: '(902) 895-1555', email: 'reception@colchesterdental.ca', url: 'https://www.colchesterdental.ca' },
  { id: 4, name: 'Caldwell Roach Insurance', category: 'Financial & Legal', tier: 'silver', phone: '(902) 893-4204', email: 'info@caldwellroach.com', url: 'https://www.caldwellroach.com' },
  { id: 5, name: 'MacQuarries Pharmasave', category: 'Health & Wellness', tier: 'silver', phone: '(902) 895-1681', email: 'contact@macquarries.ca', url: 'https://macquarries.ca' },
  { id: 6, name: 'Masstown Market', category: 'Retail & Dining', tier: 'silver', phone: '(902) 662-2816', email: 'info@masstownmarket.com', url: 'https://masstownmarket.com' },
  { id: 7, name: 'Stanfields Ltd.', category: 'Retail & Dining', tier: 'bronze', phone: '(902) 895-5406', email: 'service@stanfields.com', url: 'https://www.stanfields.com' },
  { id: 8, name: 'Patterson Law', category: 'Financial & Legal', tier: 'bronze', phone: '(902) 897-2000', email: 'truro@pattersonlaw.ca', url: 'https://www.pattersonlaw.ca' },
  { id: 9, name: 'Truro Sanitation Ltd.', category: 'Services', tier: 'bronze', phone: '(902) 895-2089', email: 'info@trurosanitation.ca', url: '#' }
];

const categories = ['All', 'Automotive', 'Recreation', 'Health & Wellness', 'Financial & Legal', 'Retail & Dining', 'Services'];

export default function Sponsors() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredSponsors = sampleSponsors.filter((sponsor) => {
    const matchesSearch = sponsor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          sponsor.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || sponsor.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getTierBadge = (tier) => {
    switch (tier) {
      case 'gold':
        return (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            backgroundColor: '#fef3c7',
            color: '#d97706',
            fontSize: '0.75rem',
            fontWeight: '700',
            padding: '3px 8px',
            borderRadius: '50px',
            border: '1px solid #fde68a'
          }}>
            <Award size={12} /> GOLD SPONSOR
          </span>
        );
      case 'silver':
        return (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            backgroundColor: '#f3f4f6',
            color: '#4b5563',
            fontSize: '0.75rem',
            fontWeight: '700',
            padding: '3px 8px',
            borderRadius: '50px',
            border: '1px solid #e5e7eb'
          }}>
            <Star size={12} /> SILVER SPONSOR
          </span>
        );
      default:
        return (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            backgroundColor: '#eff6ff',
            color: '#1d4ed8',
            fontSize: '0.75rem',
            fontWeight: '700',
            padding: '3px 8px',
            borderRadius: '50px',
            border: '1px solid #dbeafe'
          }}>
            BRONZE SPONSOR
          </span>
        );
    }
  };

  return (
    <div className="sponsors-page animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
      
      {/* Title */}
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ marginBottom: '16px' }}>Corporate <span className="text-gradient">Sponsors</span></h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
          We are deeply grateful to the local businesses whose advertising sponsorships make our community service possible.
        </p>
      </div>

      {/* Grid Controls (Search & Category filters) */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 24px',
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: '16px',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        {/* Search */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
          <Search size={16} style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-secondary)'
          }} />
          <input
            type="text"
            placeholder="Search businesses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 16px 10px 38px',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-primary)',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          />
        </div>

        {/* Categories */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="btn"
              style={{
                padding: '6px 14px',
                fontSize: '0.85rem',
                backgroundColor: selectedCategory === cat ? 'var(--color-primary)' : 'transparent',
                color: selectedCategory === cat ? 'var(--bg-secondary)' : 'var(--text-secondary)',
                border: selectedCategory === cat ? 'none' : '1px solid var(--border-color)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid-container" style={{ marginTop: 0 }}>
        {filteredSponsors.map((sponsor) => (
          <div key={sponsor.id} className="card" style={{ padding: '24px', gap: '16px', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>{getTierBadge(sponsor.tier)}</div>
              <h3 style={{ fontSize: '1.25rem', marginTop: '4px' }}>{sponsor.name}</h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
                {sponsor.category}
              </span>
            </div>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              borderTop: '1px solid var(--border-color)',
              paddingTop: '12px'
            }}>
              <div>Phone: <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{sponsor.phone}</span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                Email: <a href={`mailto:${sponsor.email}`} style={{ color: 'var(--color-accent)', fontWeight: '500' }}>{sponsor.email}</a>
              </div>
            </div>

            {sponsor.url !== '#' && (
              <a
                href={sponsor.url}
                target="_blank"
                rel="noreferrer noopener"
                className="btn btn-outline"
                style={{ padding: '8px', fontSize: '0.8rem', width: '100%', gap: '6px' }}
              >
                Visit Website <ExternalLink size={12} />
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Sponsor Banner CTA */}
      <section className="sponsor-cta-section card" style={{
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '16px',
        borderLeft: '4px solid var(--color-accent)'
      }}>
        <h2>Become a Sponsor</h2>
        <p style={{ maxWidth: '600px', color: 'var(--text-secondary)', fontSize: '1rem' }}>
          Connect your business with our community of readers. We offer multiple ad sizes, printed distribution, and online landing directory listings.
        </p>
        <Link to="/contact" className="btn btn-accent" style={{ marginTop: '8px' }}>
          Request Ad Kit <ArrowRight size={16} />
        </Link>
      </section>

    </div>
  );
}
