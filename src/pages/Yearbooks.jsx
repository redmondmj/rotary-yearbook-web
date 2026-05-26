import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { yearbooksData } from '../data/yearbooks';
import { BookOpen, Calendar, Layers, Loader2 } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';

// Helper component to render the first page of a PDF as the cover image
function PdfCoverPreview({ url }) {
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let isMounted = true;

    // Load PDF with explicit WASM decoding configuration
    pdfjsLib.getDocument({
      url: url,
      wasmUrl: 'https://unpkg.com/pdfjs-dist@5.7.284/wasm/',
      cMapUrl: 'https://unpkg.com/pdfjs-dist@5.7.284/cmaps/',
      cMapPacked: true,
      standardFontDataUrl: 'https://unpkg.com/pdfjs-dist@5.7.284/standard_fonts/',
    }).promise.then(
      (pdf) => {
        if (!isMounted) return;
        
        // Fetch first page
        pdf.getPage(1).then((page) => {
          if (!isMounted) return;
          
          const context = canvas.getContext('2d');
          // Scale 0.35 is perfect to fit the 240px container height
          const viewport = page.getViewport({ scale: 0.35 });
          
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          
          const renderContext = {
            canvasContext: context,
            viewport: viewport
          };
          
          page.render(renderContext).promise.then(() => {
            if (isMounted) setLoading(false);
          });
        });
      },
      (err) => {
        console.error('Error loading PDF page 1 for cover preview:', err);
        if (isMounted) setLoading(false);
      }
    );

    return () => {
      isMounted = false;
    };
  }, [url]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', position: 'relative' }}>
      {loading && (
        <div style={{ position: 'absolute', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
          <Loader2 className="animate-spin" size={18} style={{ color: 'var(--color-accent)' }} />
          <span style={{ fontSize: '0.8rem' }}>Loading Cover...</span>
        </div>
      )}
      <canvas
        ref={canvasRef}
        style={{
          height: '90%',
          width: 'auto',
          maxHeight: '216px', // 90% of the 240px container height
          borderRadius: '4px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          transition: 'transform 0.3s ease',
          opacity: loading ? 0 : 1,
          display: loading ? 'none' : 'block'
        }}
        className="cover-img"
      />
    </div>
  );
}

export default function Yearbooks() {
  const getCoverUrl = (book) => {
    if (book.type === 'pdf') {
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
                {book.type === 'pdf' ? (
                  <PdfCoverPreview url={book.path} />
                ) : (
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
                    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                    zIndex: 10
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
