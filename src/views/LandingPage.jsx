import React, { useState } from 'react';
import { useData } from '../context/dataContext';
import { 
  ArrowRight, Globe, Palette, Smartphone, Cloud, Mail, Phone, 
  MapPin, Send, MessageSquare, Code 
} from 'lucide-react';

const GithubIcon = ({ size = 18, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const FacebookIcon = ({ size = 18, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const LinkedinIcon = ({ size = 18, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const LandingPage = () => {
  const { settings, members, projects } = useData();
  const [filter, setFilter] = useState('All');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Get unique categories for projects filter
  const categories = ['All', ...new Set(projects.map(p => p.category))];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    // Simulate API call
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 5000);
  };

  const services = [
    {
      icon: <Globe size={28} />,
      title: 'Web Development',
      desc: 'អភិវឌ្ឍគេហទំព័រដែលមានល្បឿនលឿន ឆ្លាតវៃ និងស្របតាមតម្រូវការអាជីវកម្មរបស់លោកអ្នក។'
    },
    {
      icon: <Palette size={28} />,
      title: 'UI/UX Design',
      desc: 'រចនា interface កម្មវិធីទូរស័ព្ទ និងគេហទំព័រឱ្យមានភាពទាក់ទាញ ទំនើប និងងាយស្រួលប្រើប្រាស់។'
    },
    {
      icon: <Smartphone size={28} />,
      title: 'Mobile Development',
      desc: 'បង្កើតកម្មវិធីទូរស័ព្ទដៃសម្រាប់ iOS និង Android ជាមួយនឹងបច្ចេកវិទ្យាចុងក្រោយបំផុត។'
    },
    {
      icon: <Cloud size={28} />,
      title: 'Cloud & SaaS Solutions',
      desc: 'រៀបចំប្រព័ន្ធគ្រប់គ្រងអាជីវកម្មលើ Cloud ដែលមានសុវត្ថិភាពខ្ពស់ និងអាចពង្រីកបាននាពេលអនាគត។'
    }
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="hero-background">
          <div className="hero-glow-1"></div>
          <div className="hero-glow-2"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <h1 className="animate-fade-in">{settings.heroTagline}</h1>
            <p className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              {settings.heroSubtagline}
            </p>
            <div className="hero-actions animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <button className="btn btn-primary" onClick={() => scrollToSection('projects')}>
                <span>មើលស្នាដៃយើង</span>
                <ArrowRight size={16} />
              </button>
              <button className="btn btn-secondary" onClick={() => scrollToSection('contact')}>
                <span>ទាក់ទងមកយើង</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section bg-secondary">
        <div className="container">
          <div className="section-header">
            <h2>សេវាកម្មរបស់យើង</h2>
            <p>យើងផ្តល់ជូនសេវាកម្មបច្ចេកវិទ្យាឌីជីថលដ៏សម្បូរបែប ប្រកបដោយគុណភាព និងទំនុកចិត្តខ្ពស់។</p>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="glass-panel service-card animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="service-icon-wrapper">
                  {service.icon}
                </div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="section">
        <div className="container">
          <div className="section-header">
            <h2>សមាជិកក្រុមរបស់យើង</h2>
            <p>ជួបជាមួយអ្នកជំនាញបច្ចេកវិទ្យាដែលមានចំណង់ចំណូលចិត្តខ្ពស់ និងបទពិសោធន៍ជាច្រើនឆ្នាំ។</p>
          </div>
          <div className="team-grid">
            {members.map((member, index) => (
              <div key={member.id} className="glass-panel team-card animate-fade-in" style={{ animationDelay: `${index * 0.15}s` }}>
                <div className="team-image-wrapper">
                  <img src={member.image} alt={member.name} className="team-image" />
                  <div className="team-socials-overlay">
                    {member.socials.telegram && (
                      <a href={`https://t.me/${member.socials.telegram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="social-icon-btn">
                        <MessageSquare size={18} />
                      </a>
                    )}
                    {member.socials.github && (
                      <a href={`https://${member.socials.github}`} target="_blank" rel="noopener noreferrer" className="social-icon-btn">
                        <GithubIcon size={18} />
                      </a>
                    )}
                    {member.socials.email && (
                      <a href={`mailto:${member.socials.email}`} className="social-icon-btn">
                        <Mail size={18} />
                      </a>
                    )}
                  </div>
                </div>
                <div className="team-info">
                  <h3 className="team-name-kh">{member.name}</h3>
                  <p className="team-name-en">{member.englishName}</p>
                  <span className="team-role">{member.role}</span>
                  <p className="team-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements / Projects Section */}
      <section id="projects" className="section bg-secondary">
        <div className="container">
          <div className="section-header">
            <h2>ស្នាដៃ និងគម្រោងរបស់យើង</h2>
            <p>បណ្តុំស្នាដៃ កម្មវិធី និងប្រព័ន្ធគ្រប់គ្រងដែលក្រុមរបស់យើងបានបង្កើតឡើងសម្រាប់ដៃគូសហការ។</p>
          </div>

          <div className="filter-tabs">
            {categories.map((cat) => (
              <button 
                key={cat} 
                className={`filter-tab ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat === 'All' ? 'ទាំងអស់' : cat}
              </button>
            ))}
          </div>

          <div className="projects-grid">
            {filteredProjects.map((project, index) => (
              <div key={project.id} className="glass-panel project-card animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="project-img-wrapper">
                  <img src={project.image} alt={project.title} className="project-img" />
                  <span className="project-badge">{project.category}</span>
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                  <div className="project-footer">
                    <span>កាលបរិច្ឆេទ: {project.date}</span>
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                        <span>ចូលមើល Demo</span>
                        <ArrowRight size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section">
        <div className="container">
          <div className="section-header">
            <h2>ទំនាក់ទំនងយើងខ្ញុំ</h2>
            <p>មានចម្ងល់ ឬចង់សហការលើគម្រោងណាមួយ? ផ្ញើសារមកកាន់យើងភ្លាមៗឥឡូវនេះ។</p>
          </div>
          <div className="contact-grid">
            {/* Info Panel */}
            <div className="contact-info-panel">
              <h3>ព័ត៌មានទំនាក់ទំនង</h3>
              <p>ក្រុមការងារយើងនឹងឆ្លើយតបរាល់សាររបស់អ្នកក្នុងរយៈពេលយ៉ាងយូរ ២៤ ម៉ោង។</p>
              
              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon-box">
                    <Mail size={20} />
                  </div>
                  <div className="contact-text-box">
                    <h4>អ៊ីមែល</h4>
                    <p>{settings.contactEmail}</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon-box">
                    <Phone size={20} />
                  </div>
                  <div className="contact-text-box">
                    <h4>ទូរស័ព្ទ</h4>
                    <p>{settings.contactPhone}</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon-box">
                    <MapPin size={20} />
                  </div>
                  <div className="contact-text-box">
                    <h4>អាសយដ្ឋាន</h4>
                    <p>{settings.contactAddress}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form className="glass-panel contact-form" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="name">ឈ្មោះរបស់អ្នក</label>
                <input 
                  type="text" 
                  id="name" 
                  className="form-control" 
                  placeholder="ឧ. សុខ មករា" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">អ៊ីមែលទំនាក់ទំនង</label>
                <input 
                  type="email" 
                  id="email" 
                  className="form-control" 
                  placeholder="ឧ. name@example.com" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">សាររបស់អ្នក</label>
                <textarea 
                  id="message" 
                  rows="4" 
                  className="form-control" 
                  placeholder="សរសេរសាររបស់អ្នកនៅទីនេះ..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                ></textarea>
              </div>

              {formSubmitted ? (
                <div 
                  className="glass-panel" 
                  style={{ 
                    padding: '1rem', 
                    color: 'var(--accent-secondary)', 
                    borderColor: 'var(--accent-secondary)', 
                    textAlign: 'center',
                    fontSize: '0.9rem',
                    fontWeight: 500
                  }}
                >
                  សាររបស់អ្នកត្រូវបានផ្ញើដោយជោគជ័យ! អរគុណសម្រាប់ការទាក់ទងមកយើង។
                </div>
              ) : (
                <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                  <span>ផ្ញើសារ</span>
                  <Send size={16} />
                </button>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="logo footer-logo">
            <Code size={24} className="accent-secondary" />
            <span>{settings.logoText}</span>
          </div>
          <div className="footer-socials">
            {settings.facebookUrl && (
              <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" className="social-icon-btn">
                <FacebookIcon size={18} />
              </a>
            )}
            {settings.telegramUrl && (
              <a href={settings.telegramUrl} target="_blank" rel="noopener noreferrer" className="social-icon-btn">
                <MessageSquare size={18} />
              </a>
            )}
            {settings.linkedinUrl && (
              <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer" className="social-icon-btn">
                <LinkedinIcon size={18} />
              </a>
            )}
          </div>
          <p className="footer-copyright">
            © {new Date().getFullYear()} {settings.teamName}. រក្សាសិទ្ធិគ្រប់យ៉ាង។
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
