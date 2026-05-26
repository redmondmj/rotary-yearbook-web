import React, { useState, useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { ChevronLeft, ChevronRight, Maximize2, FileText, Loader2, BookOpen, Layers } from 'lucide-react';

// Set up the PDF.js worker using a standard CDN version that matches the installed package.
// We use a fallback version to ensure the worker loads reliably.
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js`;

export default function YearbookViewer({ yearbook }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(yearbook.pages || 0);
  const [isSpread, setIsSpread] = useState(true);
  const [loading, setLoading] = useState(true);
  const [pdfDoc, setPdfDoc] = useState(null);
  
  const leftCanvasRef = useRef(null);
  const rightCanvasRef = useRef(null);
  const singleCanvasRef = useRef(null);
  const containerRef = useRef(null);

  // Check window size to toggle spread mode on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSpread(false);
      } else {
        setIsSpread(true);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load PDF document if type is pdf
  useEffect(() => {
    if (yearbook.type === 'pdf') {
      setLoading(true);
      setCurrentPage(1);
      
      const loadingTask = pdfjsLib.getDocument(yearbook.path);
      loadingTask.promise.then(
        (pdf) => {
          setPdfDoc(pdf);
          setTotalPages(pdf.numPages);
          setLoading(false);
        },
        (error) => {
          console.error('Error loading PDF: ', error);
          setLoading(false);
        }
      );
    } else {
      setPdfDoc(null);
      setTotalPages(yearbook.pages);
      setCurrentPage(1);
      setLoading(false);
    }
  }, [yearbook]);

  // Render PDF pages on canvas
  useEffect(() => {
    if (!pdfDoc || loading) return;

    const renderPage = (pageNum, canvasRef) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      pdfDoc.getPage(pageNum).then((page) => {
        const context = canvas.getContext('2d');
        const viewport = page.getViewport({ scale: 1.5 });
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        
        page.render(renderContext);
      });
    };

    if (isSpread) {
      // Left Page (Even pages)
      if (currentPage > 1) {
        renderPage(currentPage, leftCanvasRef);
      }
      // Right Page (Odd pages)
      if (currentPage + 1 <= totalPages) {
        renderPage(currentPage + 1, rightCanvasRef);
      } else if (currentPage === 1) {
        // Cover is page 1, displayed on the right
        renderPage(1, rightCanvasRef);
      }
    } else {
      renderPage(currentPage, singleCanvasRef);
    }
  }, [pdfDoc, currentPage, isSpread, loading, totalPages]);

  const handleNext = () => {
    if (isSpread) {
      if (currentPage === 1) {
        setCurrentPage(2);
      } else if (currentPage + 2 <= totalPages) {
        setCurrentPage(currentPage + 2);
      }
    } else {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    }
  };

  const handlePrev = () => {
    if (isSpread) {
      if (currentPage === 2) {
        setCurrentPage(1);
      } else if (currentPage - 2 >= 2) {
        setCurrentPage(currentPage - 2);
      }
    } else {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen().catch((err) => {
          console.error(`Error enabling fullscreen: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  // Image helpers for archive books
  const getImageUrl = (pageNum) => {
    return `https://rotaryyearbook.ca/wp-content/uploads/flipbook/${yearbook.id}/files/mobile/${pageNum}.jpg`;
  };

  // Get current page labels
  const getPageLabel = () => {
    if (isSpread) {
      if (currentPage === 1) return 'Cover (Page 1)';
      const nextPage = currentPage + 1;
      return `Pages ${currentPage} - ${Math.min(nextPage, totalPages)} of ${totalPages}`;
    }
    return `Page ${currentPage} of ${totalPages}`;
  };

  return (
    <div ref={containerRef} className="yearbook-viewer-container" style={{
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'var(--bg-secondary)',
      border: '1px solid var(--border-color)',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-lg)',
      width: '100%',
      margin: '20px auto'
    }}>
      {/* Viewer Header */}
      <div style={{
        padding: '16px 24px',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'var(--bg-primary)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <BookOpen size={18} style={{ color: 'var(--color-accent)' }} />
          <span style={{ fontWeight: '600' }}>{yearbook.title}</span>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {yearbook.type === 'pdf' && (
            <a href={yearbook.path} download className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>
              <FileText size={14} /> Download PDF
            </a>
          )}
          <button onClick={handleFullscreen} className="btn btn-outline" style={{ padding: '6px 12px' }} title="Fullscreen">
            <Maximize2 size={14} />
          </button>
        </div>
      </div>

      {/* Main Display Area */}
      <div style={{
        position: 'relative',
        minHeight: '500px',
        maxHeight: '80vh',
        backgroundColor: '#1a1d24',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 16px',
        overflowY: 'auto'
      }}>
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', color: 'white' }}>
            <Loader2 className="animate-spin" size={40} style={{ color: 'var(--color-accent)' }} />
            <span>Loading Yearbook...</span>
          </div>
        ) : (
          <div className="book-spread" style={{
            display: 'flex',
            gap: '4px',
            alignItems: 'stretch',
            justifyContent: 'center',
            maxWidth: '100%',
            height: '100%'
          }}>
            {yearbook.type === 'pdf' ? (
              // PDF rendering mode
              isSpread ? (
                <>
                  {/* Left Page (shown if not on page 1) */}
                  {currentPage > 1 ? (
                    <div style={{
                      backgroundColor: 'white',
                      boxShadow: '-10px 10px 20px rgba(0,0,0,0.3)',
                      borderRadius: '4px 0 0 4px',
                      overflow: 'hidden',
                      display: 'flex'
                    }}>
                      <canvas ref={leftCanvasRef} style={{ maxWidth: '100%', height: 'auto', maxHeight: '70vh' }} />
                    </div>
                  ) : (
                    // Blank page dummy to align Cover to the right
                    <div style={{
                      width: '45%',
                      visibility: 'hidden'
                    }} />
                  )}

                  {/* Divider line / shadow */}
                  <div style={{
                    width: '2px',
                    background: 'linear-gradient(90deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 100%)',
                    zIndex: 10
                  }} />

                  {/* Right Page */}
                  <div style={{
                    backgroundColor: 'white',
                    boxShadow: '10px 10px 20px rgba(0,0,0,0.3)',
                    borderRadius: currentPage === 1 ? '4px 12px 12px 4px' : '0 4px 4px 0',
                    overflow: 'hidden',
                    display: 'flex'
                  }}>
                    <canvas ref={rightCanvasRef} style={{ maxWidth: '100%', height: 'auto', maxHeight: '70vh' }} />
                  </div>
                </>
              ) : (
                // Mobile single page canvas
                <div style={{
                  backgroundColor: 'white',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  display: 'flex'
                }}>
                  <canvas ref={singleCanvasRef} style={{ maxWidth: '100%', height: 'auto', maxHeight: '70vh' }} />
                </div>
              )
            ) : (
              // Image archive mode
              isSpread ? (
                <>
                  {/* Left Page */}
                  {currentPage > 1 ? (
                    <div style={{
                      backgroundColor: '#2e323d',
                      boxShadow: '-10px 10px 20px rgba(0,0,0,0.4)',
                      borderRadius: '4px 0 0 4px',
                      overflow: 'hidden',
                      display: 'flex',
                      maxHeight: '70vh'
                    }}>
                      <img
                        src={getImageUrl(currentPage)}
                        alt={`Page ${currentPage}`}
                        style={{ width: 'auto', height: '100%', maxWidth: '45vw', objectFit: 'contain' }}
                      />
                    </div>
                  ) : (
                    <div style={{ width: '45vw', visibility: 'hidden' }} />
                  )}

                  {/* Divider line */}
                  <div style={{
                    width: '2px',
                    background: 'linear-gradient(90deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 100%)',
                    zIndex: 10
                  }} />

                  {/* Right Page */}
                  <div style={{
                    backgroundColor: '#2e323d',
                    boxShadow: '10px 10px 20px rgba(0,0,0,0.4)',
                    borderRadius: currentPage === 1 ? '4px 12px 12px 4px' : '0 4px 4px 0',
                    overflow: 'hidden',
                    display: 'flex',
                    maxHeight: '70vh'
                  }}>
                    <img
                      src={getImageUrl(currentPage === 1 ? 1 : currentPage + 1)}
                      alt={`Page ${currentPage === 1 ? 1 : currentPage + 1}`}
                      style={{ width: 'auto', height: '100%', maxWidth: '45vw', objectFit: 'contain' }}
                    />
                  </div>
                </>
              ) : (
                // Mobile single page img
                <div style={{
                  backgroundColor: '#2e323d',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  display: 'flex',
                  maxHeight: '70vh'
                }}>
                  <img
                    src={getImageUrl(currentPage)}
                    alt={`Page ${currentPage}`}
                    style={{ width: '100%', height: 'auto', maxWidth: '90vw', objectFit: 'contain' }}
                  />
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* Navigation Toolbar */}
      <div style={{
        padding: '16px 24px',
        borderTop: '1px solid var(--border-color)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'var(--bg-primary)'
      }}>
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="btn btn-outline"
          style={{ padding: '8px 16px', opacity: currentPage === 1 ? 0.5 : 1 }}
        >
          <ChevronLeft size={16} /> Prev
        </button>

        <span style={{ fontWeight: '500', fontSize: '0.95rem' }}>{getPageLabel()}</span>

        <button
          onClick={handleNext}
          disabled={isSpread ? (currentPage === 1 ? totalPages <= 1 : currentPage + 2 > totalPages) : currentPage === totalPages}
          className="btn btn-outline"
          style={{
            padding: '8px 16px',
            opacity: (isSpread ? (currentPage === 1 ? totalPages <= 1 : currentPage + 2 > totalPages) : currentPage === totalPages) ? 0.5 : 1
          }}
        >
          Next <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
