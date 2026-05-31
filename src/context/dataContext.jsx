import React, { createContext, useState, useEffect, useContext } from 'react';

const DataContext = createContext();

const initialSettings = {
  teamName: 'DevCambodia Tech',
  logoText: 'DevCambodia',
  heroTagline: 'បង្កើតដំណោះស្រាយឌីជីថលកម្រិតខ្ពស់សម្រាប់អាជីវកម្មរបស់អ្នក',
  heroSubtagline: 'យើងរចនា និងបង្កើតគេហទំព័រ កម្មវិធីទូរស័ព្ទ និងប្រព័ន្ធគ្រប់គ្រងដែលទំនើប ឆ្លាតវៃ និងមានប្រសិទ្ធភាពខ្ពស់។',
  contactEmail: 'info@devcambodia.com',
  contactPhone: '+855 12 345 678',
  contactAddress: 'ផ្ទះលេខ ១២៣, ផ្លូវ ៤៥៦, រាជធានីភ្នំពេញ, កម្ពុជា',
  facebookUrl: 'https://facebook.com',
  telegramUrl: 'https://t.me',
  linkedinUrl: 'https://linkedin.com'
};

const initialMembers = [
  {
    id: 'm1',
    name: 'សុខ ចាន់ដារ៉ា',
    englishName: 'Sok Chandara',
    role: 'Team Leader & Lead Developer',
    bio: 'មានបទពិសោធន៍ជាង ៧ ឆ្នាំក្នុងការអភិវឌ្ឍ Web applications និង Cloud architecture។ ចូលចិត្តដឹកនាំ និងដោះស្រាយបញ្ហាបច្ចេកវិទ្យាធំៗ។',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
    socials: { telegram: '@chandara_sok', github: 'github.com/chandara', email: 'chandara@example.com' }
  },
  {
    id: 'm2',
    name: 'លឹម ស្រីនាង',
    englishName: 'Lim Sreynang',
    role: 'Lead UI/UX Designer',
    bio: 'ស្រឡាញ់ការរចនាបែបទំនើប សាមញ្ញ និងមានភាពទាក់ទាញ ផ្តោតលើការផ្តល់ជូនបទពិសោធន៍ប្រើប្រាស់ដ៏ល្អបំផុត (User Experience)។',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
    socials: { telegram: '@sreynang_lim', github: 'behance.net/sreynang', email: 'sreynang@example.com' }
  },
  {
    id: 'm3',
    name: 'ចាន់ សុភ័ក្ត្រ',
    englishName: 'Chan Sopheak',
    role: 'Senior Full Stack Developer',
    bio: 'ជំនាញខាង React, Node.js និង databases។ ចូលចិត្តការសរសេរកូដដែលមានរបៀបរៀបរយ និងការបង្កើត API ដែលមានល្បឿនលឿន។',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
    socials: { telegram: '@sopheak_chan', github: 'github.com/sopheak', email: 'sopheak@example.com' }
  }
];

const initialProjects = [
  {
    id: 'p1',
    title: 'Smart POS System',
    description: 'ប្រព័ន្ធគ្រប់គ្រងការលក់ដ៏ឆ្លាតវៃ (POS) សម្រាប់អាជីវកម្មលក់រាយ ហាងកាហ្វេ និងភោជនីយដ្ឋាន ជាមួយនឹងរបាយការណ៍លម្អិត។',
    category: 'Web Application',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    date: '2025-12',
    link: 'https://pos-demo.example.com'
  },
  {
    id: 'p2',
    title: 'E-Commerce App',
    description: 'កម្មវិធីលក់ទំនិញអនឡាញពេញលេញ មានមុខងារកុម្ម៉ង់ទិញ ទូទាត់ប្រាក់រហ័សតាម ABA Pay និងប្រព័ន្ធដឹកជញ្ជូនរហ័ស។',
    category: 'Mobile & Web',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    date: '2026-03',
    link: 'https://shop.example.com'
  },
  {
    id: 'p3',
    title: 'School Management Portal',
    description: 'ប្រព័ន្ធគ្រប់គ្រងសាលារៀន សម្រាប់កត់ត្រាវត្តមាន គ្រប់គ្រងពិន្ទុ កាលវិភាគសិក្សា និងប្រព័ន្ធទំនាក់ទំនងអាណាព្យាបាល។',
    category: 'SaaS Platform',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=600&fit=crop',
    date: '2026-05',
    link: 'https://school.example.com'
  }
];

export const DataProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('dc_settings');
    return saved ? JSON.parse(saved) : initialSettings;
  });

  const [members, setMembers] = useState(() => {
    const saved = localStorage.getItem('dc_members');
    return saved ? JSON.parse(saved) : initialMembers;
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('dc_projects');
    return saved ? JSON.parse(saved) : initialProjects;
  });

  useEffect(() => {
    localStorage.setItem('dc_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('dc_members', JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem('dc_projects', JSON.stringify(projects));
  }, [projects]);

  // Settings
  const updateSettings = (newSettings) => {
    setSettings(newSettings);
  };

  // Members CRUD
  const addMember = (member) => {
    const newMember = {
      ...member,
      id: 'm_' + Date.now()
    };
    setMembers(prev => [...prev, newMember]);
  };

  const updateMember = (updatedMember) => {
    setMembers(prev => prev.map(m => m.id === updatedMember.id ? updatedMember : m));
  };

  const deleteMember = (id) => {
    setMembers(prev => prev.filter(m => m.id !== id));
  };

  // Projects CRUD
  const addProject = (project) => {
    const newProject = {
      ...project,
      id: 'p_' + Date.now()
    };
    setProjects(prev => [...prev, newProject]);
  };

  const updateProject = (updatedProject) => {
    setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
  };

  const deleteProject = (id) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  return (
    <DataContext.Provider value={{
      settings,
      updateSettings,
      members,
      addMember,
      updateMember,
      deleteMember,
      projects,
      addProject,
      updateProject,
      deleteProject
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
