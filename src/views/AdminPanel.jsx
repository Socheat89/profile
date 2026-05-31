import React, { useState } from 'react';
import { useData } from '../context/dataContext';
import { 
  Users, Briefcase, Settings, LogOut, Plus, Edit, Trash2, 
  Save, X, Lock, Check, UserPlus, FilePlus 
} from 'lucide-react';

const AdminPanel = () => {
  const { 
    settings, updateSettings, 
    members, addMember, updateMember, deleteMember,
    projects, addProject, updateProject, deleteProject 
  } = useData();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Navigation State: 'members', 'projects', 'settings'
  const [activeTab, setActiveTab] = useState('members');

  // Modal States
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [memberForm, setMemberForm] = useState({
    name: '', englishName: '', role: '', bio: '', image: '',
    telegram: '', github: '', email: ''
  });

  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '', category: '', description: '', image: '', date: '', link: ''
  });

  // Settings State
  const [settingsForm, setSettingsForm] = useState({ ...settings });
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Authentication Handler
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('ឈ្មោះអ្នកប្រើប្រាស់ ឬ លេខសម្ងាត់ មិនត្រឹមត្រូវទេ!');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  // Member CRUD actions
  const openMemberModal = (member = null) => {
    if (member) {
      setEditingMember(member);
      setMemberForm({
        id: member.id,
        name: member.name,
        englishName: member.englishName,
        role: member.role,
        bio: member.bio,
        image: member.image,
        telegram: member.socials.telegram || '',
        github: member.socials.github || '',
        email: member.socials.email || ''
      });
    } else {
      setEditingMember(null);
      setMemberForm({
        name: '', englishName: '', role: '', bio: '',
        image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face',
        telegram: '', github: '', email: ''
      });
    }
    setShowMemberModal(true);
  };

  const handleMemberSubmit = (e) => {
    e.preventDefault();
    const payload = {
      id: editingMember?.id,
      name: memberForm.name,
      englishName: memberForm.englishName,
      role: memberForm.role,
      bio: memberForm.bio,
      image: memberForm.image,
      socials: {
        telegram: memberForm.telegram,
        github: memberForm.github,
        email: memberForm.email
      }
    };

    if (editingMember) {
      updateMember(payload);
    } else {
      addMember(payload);
    }
    setShowMemberModal(false);
  };

  // Project CRUD actions
  const openProjectModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setProjectForm({
        id: project.id,
        title: project.title,
        category: project.category,
        description: project.description,
        image: project.image,
        date: project.date,
        link: project.link
      });
    } else {
      setEditingProject(null);
      setProjectForm({
        title: '',
        category: 'Web Application',
        description: '',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        date: new Date().toISOString().substring(0, 7),
        link: ''
      });
    }
    setShowProjectModal(true);
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    if (editingProject) {
      updateProject(projectForm);
    } else {
      addProject(projectForm);
    }
    setShowProjectModal(false);
  };

  // Settings Save
  const handleSettingsSubmit = (e) => {
    e.preventDefault();
    updateSettings(settingsForm);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="admin-login-container">
        <div className="glass-panel admin-login-card animate-fade-in">
          <div className="service-icon-wrapper" style={{ margin: '0 auto' }}>
            <Lock size={28} />
          </div>
          <h2>Admin Login</h2>
          <p>សូមបញ្ចូលព័ត៌មានដើម្បីគ្រប់គ្រងទិន្នន័យគេហទំព័រ</p>

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label>ឈ្មោះគណនី (Username)</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="ឈ្មោះគណនី (admin)" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>លេខសម្ងាត់ (Password)</label>
              <input 
                type="password" 
                className="form-control" 
                placeholder="លេខសម្ងាត់ (admin123)" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {loginError && (
              <div style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: 500, textAlign: 'left' }}>
                {loginError}
              </div>
            )}

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              <span>ចូលគណនី</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // MAIN ADMIN PANEL
  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-top">
          <div className="admin-brand">
            <Settings size={22} className="accent-secondary" />
            <h2>Dashboard</h2>
          </div>

          <nav className="admin-nav">
            <div 
              className={`admin-nav-item ${activeTab === 'members' ? 'active' : ''}`}
              onClick={() => setActiveTab('members')}
            >
              <Users size={18} />
              <span>សមាជិកក្រុម ({members.length})</span>
            </div>
            <div 
              className={`admin-nav-item ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => setActiveTab('projects')}
            >
              <Briefcase size={18} />
              <span>ស្នាដៃ/គម្រោង ({projects.length})</span>
            </div>
            <div 
              className={`admin-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings size={18} />
              <span>កំណត់គេហទំព័រ</span>
            </div>
          </nav>
        </div>

        <div className="admin-sidebar-bottom">
          <div className="admin-user-info">
            <div className="admin-avatar">AD</div>
            <div className="admin-user-text">
              <h4>Administrator</h4>
              <p>Online</p>
            </div>
          </div>
          <button className="btn btn-danger" onClick={handleLogout} style={{ width: '100%', gap: '0.5rem' }}>
            <LogOut size={16} />
            <span>ចាកចេញ</span>
          </button>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="admin-main">
        {/* Header */}
        <header className="admin-header">
          <div className="admin-title-area">
            {activeTab === 'members' && (
              <>
                <h1>គ្រប់គ្រងសមាជិកក្រុម</h1>
                <p>លោកអ្នកអាច បន្ថែម កែសម្រួល ឬលុបព័ត៌មានសមាជិកក្រុមនៅទីនេះ</p>
              </>
            )}
            {activeTab === 'projects' && (
              <>
                <h1>គ្រប់គ្រងស្នាដៃ និងគម្រោង</h1>
                <p>លោកអ្នកអាច បន្ថែម កែសម្រួល ឬលុបគម្រោងការងារដែលសម្រេចបាននៅទីនេះ</p>
              </>
            )}
            {activeTab === 'settings' && (
              <>
                <h1>កំណត់គេហទំព័រទូទៅ</h1>
                <p>លោកអ្នកអាច កែសម្រួលខ្លឹមសារចម្បង ឡូហ្គោ និងព័ត៌មានទំនាក់ទំនងរបស់ក្រុម</p>
              </>
            )}
          </div>

          {activeTab === 'members' && (
            <button className="btn btn-primary" onClick={() => openMemberModal()}>
              <Plus size={16} />
              <span>បន្ថែមសមាជិក</span>
            </button>
          )}

          {activeTab === 'projects' && (
            <button className="btn btn-primary" onClick={() => openProjectModal()}>
              <Plus size={16} />
              <span>បន្ថែមគម្រោង</span>
            </button>
          )}
        </header>

        {/* Tab Contents */}
        <div className="admin-content animate-fade-in" key={activeTab}>
          {/* MEMBERS TAB */}
          {activeTab === 'members' && (
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>រូបថត</th>
                    <th>ឈ្មោះ</th>
                    <th>តួនាទី</th>
                    <th>សង្ខេប</th>
                    <th>សកម្មភាព</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member) => (
                    <tr key={member.id}>
                      <td>
                        <img src={member.image} alt={member.name} className="table-img" />
                      </td>
                      <td>
                        <div className="cell-profile-info">
                          <h4>{member.name}</h4>
                          <p>{member.englishName}</p>
                        </div>
                      </td>
                      <td>
                        <span className="category-tag" style={{ background: 'rgba(139, 92, 246, 0.15)', color: 'var(--accent-primary)', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
                          {member.role}
                        </span>
                      </td>
                      <td style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {member.bio}
                      </td>
                      <td>
                        <div className="actions-cell">
                          <button className="btn-icon-only btn-edit" onClick={() => openMemberModal(member)}>
                            <Edit size={16} />
                          </button>
                          <button className="btn-icon-only btn-delete" onClick={() => deleteMember(member.id)}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {members.length === 0 && (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '3rem' }}>
                        មិនមានទិន្នន័យសមាជិកទេ។ សូមបន្ថែមសមាជិកថ្មី!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* PROJECTS TAB */}
          {activeTab === 'projects' && (
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>រូបភាព</th>
                    <th>ឈ្មោះគម្រោង</th>
                    <th>ប្រភេទ</th>
                    <th>កាលបរិច្ឆេទ</th>
                    <th>សកម្មភាព</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id}>
                      <td>
                        <img src={project.image} alt={project.title} className="table-img" />
                      </td>
                      <td>
                        <strong>{project.title}</strong>
                      </td>
                      <td>
                        <span className="category-tag">{project.category}</span>
                      </td>
                      <td>{project.date}</td>
                      <td>
                        <div className="actions-cell">
                          <button className="btn-icon-only btn-edit" onClick={() => openProjectModal(project)}>
                            <Edit size={16} />
                          </button>
                          <button className="btn-icon-only btn-delete" onClick={() => deleteProject(project.id)}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {projects.length === 0 && (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '3rem' }}>
                        មិនមានទិន្នន័យគម្រោងទេ។ សូមបន្ថែមគម្រោងថ្មី!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSettingsSubmit} className="glass-panel" style={{ padding: '2.5rem' }}>
              <div className="settings-form-grid">
                <div className="form-group">
                  <label>ឈ្មោះក្រុម (Team Name)</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={settingsForm.teamName}
                    onChange={(e) => setSettingsForm({ ...settingsForm, teamName: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>អក្សរឡូហ្គោ (Logo Text)</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={settingsForm.logoText}
                    onChange={(e) => setSettingsForm({ ...settingsForm, logoText: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group form-full-width">
                  <label>ចំណងជើងធំផ្នែកខាងលើ (Hero Tagline)</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={settingsForm.heroTagline}
                    onChange={(e) => setSettingsForm({ ...settingsForm, heroTagline: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group form-full-width">
                  <label>ខ្លឹមសារសង្ខេបផ្នែកខាងលើ (Hero Sub-Tagline)</label>
                  <textarea 
                    rows="3" 
                    className="form-control" 
                    value={settingsForm.heroSubtagline}
                    onChange={(e) => setSettingsForm({ ...settingsForm, heroSubtagline: e.target.value })}
                    required
                  ></textarea>
                </div>

                <div className="form-group">
                  <label>អ៊ីមែលទំនាក់ទំនង (Contact Email)</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    value={settingsForm.contactEmail}
                    onChange={(e) => setSettingsForm({ ...settingsForm, contactEmail: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>លេខទូរស័ព្ទ (Contact Phone)</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={settingsForm.contactPhone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, contactPhone: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group form-full-width">
                  <label>អាសយដ្ឋាន (Address)</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={settingsForm.contactAddress}
                    onChange={(e) => setSettingsForm({ ...settingsForm, contactAddress: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>តំណភ្ជាប់ Facebook (Facebook Link)</label>
                  <input 
                    type="url" 
                    className="form-control" 
                    value={settingsForm.facebookUrl}
                    onChange={(e) => setSettingsForm({ ...settingsForm, facebookUrl: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>តំណភ្ជាប់ Telegram (Telegram Link)</label>
                  <input 
                    type="url" 
                    className="form-control" 
                    value={settingsForm.telegramUrl}
                    onChange={(e) => setSettingsForm({ ...settingsForm, telegramUrl: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '2.5rem' }}>
                <button type="submit" className="btn btn-primary">
                  <Save size={16} />
                  <span>រក្សាទុកការកំណត់</span>
                </button>
                
                {settingsSaved && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--accent-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>
                    <Check size={16} />
                    <span>រក្សាទុកដោយជោគជ័យ!</span>
                  </div>
                )}
              </div>
            </form>
          )}
        </div>
      </main>

      {/* MEMBER MODAL (Add/Edit) */}
      {showMemberModal && (
        <div className="modal-overlay">
          <div className="glass-panel modal-content animate-fade-in">
            <div className="modal-header">
              <h3>{editingMember ? 'កែសម្រួលព័ត៌មានសមាជិក' : 'បន្ថែមសមាជិកថ្មី'}</h3>
              <button className="modal-close-btn" onClick={() => setShowMemberModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleMemberSubmit} className="modal-form">
              <div className="form-group">
                <label>ឈ្មោះខ្មែរ</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={memberForm.name}
                  onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                  required 
                />
              </div>
              <div className="form-group">
                <label>ឈ្មោះឡាតាំង (English Name)</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={memberForm.englishName}
                  onChange={(e) => setMemberForm({ ...memberForm, englishName: e.target.value })}
                  required 
                />
              </div>
              <div className="form-group">
                <label>តួនាទី (Role)</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="ឧ. Mobile Developer, Full Stack Developer"
                  value={memberForm.role}
                  onChange={(e) => setMemberForm({ ...memberForm, role: e.target.value })}
                  required 
                />
              </div>
              <div className="form-group">
                <label>តំណភ្ជាប់រូបភាព (Image URL)</label>
                <input 
                  type="url" 
                  className="form-control" 
                  value={memberForm.image}
                  onChange={(e) => setMemberForm({ ...memberForm, image: e.target.value })}
                  required 
                />
              </div>

              <div className="settings-form-grid" style={{ gap: '1rem' }}>
                <div className="form-group">
                  <label>Telegram Username</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="ឧ. @username"
                    value={memberForm.telegram}
                    onChange={(e) => setMemberForm({ ...memberForm, telegram: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>GitHub Profile</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="ឧ. github.com/username"
                    value={memberForm.github}
                    onChange={(e) => setMemberForm({ ...memberForm, github: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>អ៊ីមែលផ្ទាល់ខ្លួន</label>
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="ឧ. name@example.com"
                  value={memberForm.email}
                  onChange={(e) => setMemberForm({ ...memberForm, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>ជីវប្រវត្តិសង្ខេប (Bio)</label>
                <textarea 
                  rows="3" 
                  className="form-control" 
                  value={memberForm.bio}
                  onChange={(e) => setMemberForm({ ...memberForm, bio: e.target.value })}
                  required
                ></textarea>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowMemberModal(false)}>បោះបង់</button>
                <button type="submit" className="btn btn-primary">
                  {editingMember ? <Save size={16} /> : <UserPlus size={16} />}
                  <span>{editingMember ? 'រក្សាទុក' : 'បន្ថែម'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PROJECT MODAL (Add/Edit) */}
      {showProjectModal && (
        <div className="modal-overlay">
          <div className="glass-panel modal-content animate-fade-in">
            <div className="modal-header">
              <h3>{editingProject ? 'កែសម្រួលគម្រោង/ស្នាដៃ' : 'បន្ថែមគម្រោងថ្មី'}</h3>
              <button className="modal-close-btn" onClick={() => setShowProjectModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleProjectSubmit} className="modal-form">
              <div className="form-group">
                <label>ឈ្មោះគម្រោង (Project Title)</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  required 
                />
              </div>

              <div className="settings-form-grid" style={{ gap: '1rem' }}>
                <div className="form-group">
                  <label>ប្រភេទគម្រោង (Category)</label>
                  <select 
                    className="form-control"
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    required
                  >
                    <option value="Web Application">Web Application</option>
                    <option value="Mobile & Web">Mobile & Web</option>
                    <option value="SaaS Platform">SaaS Platform</option>
                    <option value="Design & SEO">Design & SEO</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>កាលបរិច្ឆេទ (Date/Month)</label>
                  <input 
                    type="month" 
                    className="form-control" 
                    value={projectForm.date}
                    onChange={(e) => setProjectForm({ ...projectForm, date: e.target.value })}
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label>តំណភ្ជាប់រូបភាព (Image URL)</label>
                <input 
                  type="url" 
                  className="form-control" 
                  value={projectForm.image}
                  onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                  required 
                />
              </div>

              <div className="form-group">
                <label>តំណភ្ជាប់គេហទំព័រ (Project Link / Demo)</label>
                <input 
                  type="url" 
                  className="form-control" 
                  placeholder="ឧ. https://example.com"
                  value={projectForm.link}
                  onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>ពណ៌នាអំពីគម្រោង (Description)</label>
                <textarea 
                  rows="3" 
                  className="form-control" 
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  required
                ></textarea>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowProjectModal(false)}>បោះបង់</button>
                <button type="submit" className="btn btn-primary">
                  {editingProject ? <Save size={16} /> : <FilePlus size={16} />}
                  <span>{editingProject ? 'រក្សាទុក' : 'បន្ថែម'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
