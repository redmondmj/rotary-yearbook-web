import React, { useState } from 'react';
import { Search, Award, Star, Mail, ExternalLink, ArrowRight, LayoutGrid, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { sponsorsData } from '../data/sponsors';

const adSizes = ['All', 'A Full Page', '1/3 of a Page', '1/6 of a Page'];

export default function Sponsors() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSize, setSelectedSize] = useState('All');

  const filteredSponsors = sponsorsData.filter((sponsor) => {
    const nameMatch = sponsor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      sponsor.printName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      (sponsor.address && sponsor.address.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const sizeMatch = selectedSize === 'All' || sponsor.adSize === selectedSize;
    
    return nameMatch && sizeMatch;
  });

  const getAdSizeBadge = (adSize) => {
    switch (adSize) {
      case 'A Full Page':
        return (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            backgroundColor: 'var(--color-accent-glow)',
            color: 'var(--color-accent)',
            fontSize: '0.75rem',
            fontWeight: '700',
            padding: '4px 10px',
            borderRadius: '50px',
            border: '1px solid rgba(212, 175, 55, 0.4)'
          }}>
            <Award size={12} /> FULL PAGE AD
          </span>
        );
      case '1/3 of a Page':
        return (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            backgroundColor: 'rgba(23, 69, 143, 0.1)',
            color: 'var(--color-primary)',
            fontSize: '0.75rem',
            fontWeight: '700',
            padding: '4px 10px',
            borderRadius: '50px',
            border: '1px solid rgba(23, 69, 143, 0.2)'
          }}>
            <Star size={12} /> 1/3 PAGE AD
          </span>
        );
      default:
        return (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            backgroundColor: 'var(--border-color)',
            color: 'var(--text-secondary)',
            fontSize: '0.75rem',
            fontWeight: '600',
            padding: '4px 10px',
            borderRadius: '50px',
            border: '1px solid var(--border-color)'
          }}>
            1/6 PAGE AD
          </span>
        );
    }
  };

  // Helper to format website links nicely
  const formatUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `https://${url}`;
  };

  return (
    <div className="sponsors-page animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
      
      {/* Page Header */}
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ marginBottom: '16px' }}>2026 Directory & <span className="text-gradient">Sponsors</span></h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
          Explore the business directory and support our local sponsors. Click to contact them directly or visit their websites.
        </p>
      </div>

      {/* Grid Controls (Search & Ad Size filters) */}
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
            placeholder="Search sponsors or locations..."
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

        {/* Ad Size Filter */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginRight: '8px', fontWeight: '500' }}>
            Filter by Size:
          </span>
          {adSizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className="btn"
              style={{
                padding: '6px 14px',
                fontSize: '0.85rem',
                backgroundColor: selectedSize === size ? 'var(--color-primary)' : 'transparent',
                color: selectedSize === size ? 'var(--bg-secondary)' : 'var(--text-secondary)',
                border: selectedSize === size ? 'none' : '1px solid var(--border-color)'
              }}
            >
              {size === 'All' ? 'Show All' : size.replace(' of a Page', '').replace('A ', '')}
            </button>
          ))}
        </div>
      </div>

      {/* Directory Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
          Showing {filteredSponsors.length} sponsors
        </div>
        
        <div className="grid-container" style={{ marginTop: 0 }}>
          {filteredSponsors.map((sponsor, index) => (
            <div 
              key={`${sponsor.name}-${index}`} 
              className="card glow-effect" 
              style={{ 
                padding: '24px', 
                gap: '16px', 
                justifyContent: 'space-between',
                border: sponsor.adSize === 'A Full Page' ? '2px solid var(--color-accent)' : '1px solid var(--border-color)'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div>{getAdSizeBadge(sponsor.adSize)}</div>
                <h3 style={{ fontSize: '1.2rem', marginTop: '4px', lineHeight: '1.3' }}>{sponsor.printName}</h3>
                {sponsor.name !== sponsor.printName && (
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Registered: {sponsor.name}
                  </span>
                )}
              </div>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                borderTop: '1px solid var(--border-color)',
                paddingTop: '12px'
              }}>
                {sponsor.address && (
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
                    <MapPin size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{sponsor.address}</span>
                  </div>
                )}
                
                {sponsor.phone && (
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <Phone size={14} style={{ flexShrink: 0 }} />
                    <a href={`tel:${sponsor.phone}`} style={{ color: 'var(--text-primary)' }}>
                      {sponsor.phone}
                    </a>
                  </div>
                )}

                {sponsor.email && (
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <Mail size={14} style={{ flexShrink: 0 }} />
                    <a href={`mailto:${sponsor.email}`} style={{ color: 'var(--color-primary)', wordBreak: 'break-all' }}>
                      {sponsor.email}
                    </a>
                  </div>
                )}
              </div>

              {sponsor.url && (
                <a
                  href={formatUrl(sponsor.url)}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn btn-outline"
                  style={{ padding: '8px', fontSize: '0.8rem', width: '100%', gap: '6px', marginTop: '4px' }}
                >
                  Visit Website <ExternalLink size={12} />
                </a>
              )}
            </div>
          ))}
        </div>
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
        <h2>Advertise in the 2026 Edition</h2>
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
