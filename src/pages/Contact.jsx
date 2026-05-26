import React, { useState } from 'react';
import { Mail, MessageSquare, Shield, HelpCircle, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Advertising', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: 'Advertising', message: '' });
    }, 500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="contact-page animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
      
      {/* Title */}
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ marginBottom: '16px' }}>Get in <span className="text-gradient">Touch</span></h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
          Have a question about the yearbook archives, or want to advertise in our next edition? Send us a message!
        </p>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '40px',
        flexWrap: 'wrap'
      }}>
        {/* Contact Info Details */}
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card" style={{ padding: '24px', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-accent)' }}>
              <Mail size={20} />
              <h3 style={{ fontSize: '1.1rem' }}>Direct Email</h3>
            </div>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
              Send your media kits, ad artwork, or listings queries directly to:
            </p>
            <a href="mailto:info@rotaryyearbook.ca" style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
              info@rotaryyearbook.ca
            </a>
          </div>

          <div className="card" style={{ padding: '24px', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-accent)' }}>
              <Shield size={20} />
              <h3 style={{ fontSize: '1.1rem' }}>Rotary Adventure Club</h3>
            </div>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
              Explore travel rewards and community programs through our partners:
            </p>
            <a 
              href="https://rotaryadventureclub.ca" 
              target="_blank" 
              rel="noreferrer noopener" 
              style={{ fontWeight: '600', color: 'var(--text-primary)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              rotaryadventureclub.ca
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="card" style={{ flex: '2 1 450px', padding: '40px' }}>
          {submitted ? (
            <div style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
              padding: '20px 0'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-accent-glow)',
                color: 'var(--color-accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Send size={24} />
              </div>
              <h2>Message Sent!</h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '400px' }}>
                Thank you for reaching out. A member of the Rotary Club Yearbook committee will get back to you shortly.
              </p>
              <button onClick={() => setSubmitted(false)} className="btn btn-outline" style={{ marginTop: '12px' }}>
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Send an Inquiry</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="name" style={{ fontSize: '0.85rem', fontWeight: '600' }}>Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '6px',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="email" style={{ fontSize: '0.85rem', fontWeight: '600' }}>Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '6px',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label htmlFor="subject" style={{ fontSize: '0.85rem', fontWeight: '600' }}>Topic</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                >
                  <option value="Advertising">Advertising in 2026 Yearbook</option>
                  <option value="Listing">Business Directory Listing</option>
                  <option value="Archives">Digital Archives Help</option>
                  <option value="General">General Inquiry</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label htmlFor="message" style={{ fontSize: '0.85rem', fontWeight: '600' }}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button type="submit" className="btn btn-accent glow-effect" style={{ marginTop: '8px', alignSelf: 'flex-start' }}>
                Submit Message <Send size={16} />
              </button>
            </form>
          )}
        </div>
      </div>

    </div>
  );
}
