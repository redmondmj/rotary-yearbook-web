import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { yearbooksData } from '../data/yearbooks';
import YearbookViewer from '../components/YearbookViewer';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export default function YearbookDetail() {
  const { id } = useParams();
  
  // Find the selected yearbook
  const yearbook = yearbooksData.find((b) => b.id === id);

  if (!yearbook) {
    return (
      <div className="animate-fade-in" style={{
        textAlign: 'center',
        padding: '80px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px'
      }}>
        <AlertCircle size={48} style={{ color: 'var(--color-primary)' }} />
        <h2>Yearbook Not Found</h2>
        <p style={{ color: 'var(--text-secondary)' }}>The requested yearbook volume does not exist or has been removed.</p>
        <Link to="/yearbooks" className="btn btn-primary" style={{ marginTop: '16px' }}>
          Back to Archives
        </Link>
      </div>
    );
  }

  return (
    <div className="yearbook-detail animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <Link to="/yearbooks" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          color: 'var(--text-secondary)',
          fontSize: '0.9rem',
          marginBottom: '16px'
        }} className="hover-link">
          <ArrowLeft size={16} /> Back to Archives
        </Link>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>{yearbook.title}</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
          {yearbook.type === 'pdf' 
            ? 'Rendering raw proof PDF. Zoom and scroll controls are handled inside the viewer.' 
            : `Digitized print edition of the ${yearbook.year} Rotary Yearbook.`}
        </p>
      </div>

      <YearbookViewer yearbook={yearbook} />
    </div>
  );
}
