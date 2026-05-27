import React, { useState, useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { ChevronLeft, ChevronRight, Maximize2, FileText, Loader2, BookOpen, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

export default function YearbookViewer({ yearbook }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(yearbook.pages || 0);
  const [isSpread, setIsSpread] = useState(true);
  const [loading, setLoading] = useState(true);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [zoomScale, setZoomScale] = useState(1.0);
  
  const leftCanvasRef = useRef(null);
  const rightCanvasRef = useRef(null);
  const singleCanvasRef = useRef(null);
  const containerRef = useRef(null);
  const activeRenderTasksRef = useRef({ left: null, right: null, single: null });

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
    setZoomScale(1.0); // Reset zoom on book change
    
    if (yearbook.type === 'pdf') {
      setLoading(true);
      setCurrentPage(1);
      
      const loadingTask = pdfjsLib.getDocument({
        url: yearbook.path,
        wasmUrl: 'https://unpkg.com/pdfjs-dist@5.7.284/wasm/',
        cMapUrl: 'https://unpkg.com/pdfjs-dist@5.7.284/cmaps/',
        cMapPacked: true,
        standardFontDataUrl: 'https://unpkg.com/pdfjs-dist@5.7.284/standard_fonts/',
      });
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

  // Render PDF pages on canvas (re-fires when zoomScale changes)
  useEffect(() => {
    if (!pdfDoc || loading) return;

    const renderPage = (pageNum, canvasRef, key) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      // Cancel any active render task for this canvas key
      if (activeRenderTasksRef.current[key]) {
        activeRenderTasksRef.current[key].cancel();
        activeRenderTasksRef.current[key] = null;
      }

      pdfDoc.getPage(pageNum).then((page) => {
        const context = canvas.getContext('2d');
        // Base scale is 1.25, multiplied by current user zoomScale
        const viewport = page.getViewport({ scale: 1.25 * zoomScale });
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;
        
        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        
        const renderTask = page.render(renderContext);
        activeRenderTasksRef.current[key] = renderTask;

        renderTask.promise.then(
          () => {
            activeRenderTasksRef.current[key] = null;
          },
          (error) => {
            if (error && error.name !== 'RenderingCancelledException') {
              console.error(`Error rendering page ${pageNum}:`, error);
            }
          }
        );
      }).catch((error) => {
        console.error(`Error getting page ${pageNum}:`, error);
      });
    };

    if (isSpread) {
      if (currentPage === 1) {
        // Render Cover (Page 1) on the right side
        renderPage(1, rightCanvasRef, 'right');
      } else {
        // Render Left Page
        renderPage(currentPage, leftCanvasRef, 'left');
        
        // Render Right Page (if it exists)
        if (currentPage + 1 <= totalPages) {
          renderPage(currentPage + 1, rightCanvasRef, 'right');
        }
      }
    } else {
      renderPage(currentPage, singleCanvasRef, 'single');
    }

    // Cleanup active tasks when page/spread/zoom changes
    return () => {
      if (activeRenderTasksRef.current.left) activeRenderTasksRef.current.left.cancel();
      if (activeRenderTasksRef.current.right) activeRenderTasksRef.current.right.cancel();
      if (activeRenderTasksRef.current.single) activeRenderTasksRef.current.single.cancel();
      activeRenderTasksRef.current = { left: null, right: null, single: null };
    };
  }, [pdfDoc, currentPage, isSpread, loading, totalPages, zoomScale]);

  // Calculate fit-to-width zoom scale on load and when spread mode changes
  useEffect(() => {
    if (!pdfDoc || loading) return;
    
    const calculateFitScale = () => {
      const container = containerRef.current;
      if (!container) return;
      
      const containerWidth = container.clientWidth;
      const availableWidth = containerWidth - 80;
      const targetWidth = isSpread ? 1530 : 765;
      
      if (availableWidth < targetWidth) {
        const fitScale = Math.max(0.5, Math.floor((availableWidth / targetWidth) * 10) / 10);
        setZoomScale(fitScale);
      } else {
        setZoomScale(1.0);
      }
    };

    const timer = setTimeout(calculateFitScale, 100);
    return () => clearTimeout(timer);
  }, [pdfDoc, isSpread, loading]);

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

  const handleZoomIn = () => {
    setZoomScale(prev => Math.min(prev + 0.25, 2.5));
  };

  const handleZoomOut = () => {
    setZoomScale(prev => Math.max(prev - 0.25, 0.75));
  };

  const handleZoomReset = () => {
    setZoomScale(1.0);
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
        flexWrap: 'wrap',
        gap: '16px',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'var(--bg-primary)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <BookOpen size={18} style={{ color: 'var(--color-accent)' }} />
          <span style={{ fontWeight: '600' }}>{yearbook.title}</span>
        </div>

        {/* Zoom Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'var(--bg-secondary)', padding: '4px 8px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <button onClick={handleZoomOut} disabled={zoomScale <= 0.75} className="btn btn-outline" style={{ padding: '4px 8px', border: 'none' }} title="Zoom Out">
            <ZoomOut size={16} />
          </button>
          <span style={{ fontSize: '0.85rem', fontWeight: '600', minWidth: '45px', textAlign: 'center' }}>
            {Math.round(zoomScale * 100)}%
          </span>
          <button onClick={handleZoomIn} disabled={zoomScale >= 2.5} className="btn btn-outline" style={{ padding: '4px 8px', border: 'none' }} title="Zoom In">
            <ZoomIn size={16} />
          </button>
          <button onClick={handleZoomReset} disabled={zoomScale === 1.0} className="btn btn-outline" style={{ padding: '4px 8px', border: 'none' }} title="Reset Zoom">
            <RotateCcw size={14} />
          </button>
        </div>

        {/* Action Controls */}
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

      {/* Main Display Area (Scrollable when zoomed in) */}
      <div className="viewer-scroll-panel" style={{
        position: 'relative',
        height: '80vh',
        minHeight: '650px',
        backgroundColor: '#1a1d24',
        padding: '32px',
        overflow: 'auto',
        display: 'flex'
      }}>
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', color: 'white', margin: 'auto' }}>
            <Loader2 className="animate-spin" size={40} style={{ color: 'var(--color-accent)' }} />
            <span>Loading Yearbook...</span>
          </div>
        ) : (
          <div style={{
            display: 'flex',
            margin: 'auto',
            flexShrink: 0,
            alignSelf: 'flex-start'
          }}>
            <div className="book-spread" style={{
              display: 'flex',
              gap: '4px',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              padding: '20px'
            }}>
            {yearbook.type === 'pdf' ? (
              isSpread ? (
                <>
                  {/* Left Canvas */}
                  {currentPage > 1 ? (
                    <div style={{
                      backgroundColor: 'white',
                      boxShadow: '-10px 10px 20px rgba(0,0,0,0.3)',
                      borderRadius: '4px 0 0 4px',
                      overflow: 'hidden',
                      display: 'flex',
                      flexShrink: 0
                    }}>
                      <canvas ref={leftCanvasRef} style={{ display: 'block' }} />
                    </div>
                  ) : (
                    <div style={{
                      width: `${612 * 1.25 * zoomScale}px`,
                      height: `${792 * 1.25 * zoomScale}px`,
                      visibility: 'hidden',
                      flexShrink: 0
                    }} />
                  )}

                  {/* Divider line / shadow */}
                  <div style={{
                    width: '2px',
                    background: 'linear-gradient(90deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 100%)',
                    zIndex: 10,
                    alignSelf: 'stretch',
                    flexShrink: 0
                  }} />

                  {/* Right Canvas */}
                  <div style={{
                    backgroundColor: 'white',
                    boxShadow: '10px 10px 20px rgba(0,0,0,0.3)',
                    borderRadius: currentPage === 1 ? '4px 12px 12px 4px' : '0 4px 4px 0',
                    overflow: 'hidden',
                    display: 'flex',
                    flexShrink: 0
                  }}>
                    <canvas ref={rightCanvasRef} style={{ display: 'block' }} />
                  </div>
                </>
              ) : (
                // Mobile single page canvas
                <div style={{
                  backgroundColor: 'white',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexShrink: 0
                }}>
                  <canvas ref={singleCanvasRef} style={{ display: 'block' }} />
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
                      alignItems: 'center',
                      flexShrink: 0
                    }}>
                      <img
                        src={getImageUrl(currentPage)}
                        alt={`Page ${currentPage}`}
                        style={{
                          width: 'auto',
                          height: 'auto',
                          maxWidth: `${45 * zoomScale}vw`,
                          maxHeight: `${70 * zoomScale}vh`,
                          objectFit: 'contain',
                          transition: 'max-width 0.2s ease, max-height 0.2s ease'
                        }}
                      />
                    </div>
                  ) : (
                    <div style={{ width: '45vw', visibility: 'hidden', flexShrink: 0 }} />
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
                    alignItems: 'center',
                    flexShrink: 0
                  }}>
                    <img
                      src={getImageUrl(currentPage === 1 ? 1 : currentPage + 1)}
                      alt={`Page ${currentPage === 1 ? 1 : currentPage + 1}`}
                      style={{
                        width: 'auto',
                        height: 'auto',
                        maxWidth: `${45 * zoomScale}vw`,
                        maxHeight: `${70 * zoomScale}vh`,
                        objectFit: 'contain',
                        transition: 'max-width 0.2s ease, max-height 0.2s ease'
                      }}
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
                  alignItems: 'center',
                  flexShrink: 0
                }}>
                  <img
                    src={getImageUrl(currentPage)}
                    alt={`Page ${currentPage}`}
                    style={{
                      width: 'auto',
                      height: 'auto',
                      maxWidth: `${90 * zoomScale}vw`,
                      maxHeight: `${70 * zoomScale}vh`,
                      objectFit: 'contain',
                      transition: 'max-width 0.2s ease, max-height 0.2s ease'
                    }}
                  />
                </div>
              )
            )}
            </div>
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
