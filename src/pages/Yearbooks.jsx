import React from 'react';
import { Link } from 'react-router-dom';
import { yearbooksData } from '../data/yearbooks';
import { BookOpen, Calendar, Layers } from 'lucide-react';

export default function Yearbooks() {
  const getCoverUrl = (book) => {
    if (book.type === 'pdf') {
      // Return a nice placeholder or style it locally
      return null;
    }
    return `https://rotaryyearbook.ca/wp-content/uploads/flipbook/${book.id}/files/mobile/1.jpg`;
  };

  return (
    <div className="yearbooks-page animate-fade-in" style={{ paddingBottom: '40px' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{ marginBottom: '16px' }}>Yearbook <span className="text-gradient">Archives</span></h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
          Browse through our digital archive collection from 2014 to the current year. Relive community highlights and support Truro's history.
        </p>
      </div>

      <div className="grid-container">
        {yearbooksData.map((book) => {
          const cover = getCoverUrl(book);
          
          return (
            <div key={book.id} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              
              {/* Cover Preview Area */}
              <div style={{
                height: '240px',
                backgroundColor: '#1e222b',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottom: '1px solid var(--border-color)'
              }}>
                {cover ? (
                  <img 
                    src={cover} 
                    alt={`${book.title} Cover`}
                    style={{
                      height: '90%',
                      width: 'auto',
                      objectFit: 'contain',
                      borderRadius: '4px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                      transition: 'transform 0.3s ease'
                    }}
                    className="cover-img"
                  />
                ) : (
                  /* Custom 2026 Cover fallback */
                  <div style={{
                    width: '150px',
                    height: '210px',
                    backgroundColor: 'var(--color-primary)',
                    borderRadius: '4px 12px 12px 4px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '16px',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}>
                    <div style={{ borderBottom: '1px solid var(--color-accent)', paddingBottom: '6px' }}>
                      <div style={{ fontSize: '0.65rem', opacity: 0.8 }}>ROTARY CLUB</div>
                      <div style={{ fontSize: '1rem', fontWeight: '800' }}>YEARBOOK</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <BookOpen size={28} style={{ color: 'var(--color-accent)' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: '0.7rem' }}>
                      <span style={{ opacity: 0.7 }}>PROOF</span>
                      <span style={{ fontWeight: '800', color: 'var(--color-accent)', fontSize: '1rem' }}>{book.year}</span>
                    </div>
                  </div>
                )}
                
                {book.isLatest && (
                  <span style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    backgroundColor: 'var(--color-accent)',
                    color: 'black',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    padding: '4px 10px',
                    borderRadius: '50px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                  }}>
                    NEW EDITION
                  </span>
                )}
              </div>

              {/* Card Details */}
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', flexGrow: 1 }}>
                <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{book.title}</h3>
                
                <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={14} /> {book.year}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Layers size={14} /> {book.pages ? `${book.pages} Pages` : 'Dynamic PDF'}
                  </span>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '12px' }}>
                  <Link 
                    to={`/yearbooks/${book.id}`} 
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '8px 16px', fontSize: '0.9rem' }}
                  >
                    View Publication
                  </Link>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
