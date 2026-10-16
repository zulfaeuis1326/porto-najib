import { Skill } from '@/types';

export const skillsData: Skill[] = [
  // Frontend
  {
    id: '1',
    name: 'React',
    category: 'frontend',
    level: 'advanced',
    icon: '⚛️'
  },
  {
    id: '2',
    name: 'Next.js',
    category: 'frontend',
    level: 'advanced',
    icon: '▲'
  },
  {
    id: '3',
    name: 'TypeScript',
    category: 'frontend',
    level: 'intermediate',
    icon: '📘'
  },
  {
    id: '4',
    name: 'TailwindCSS',
    category: 'frontend',
    level: 'advanced',
    icon: '🎨'
  },
  {
    id: '5',
    name: 'JavaScript',
    category: 'frontend',
    level: 'advanced',
    icon: '📜'
  },
  {
    id: '6',
    name: 'HTML & CSS',
    category: 'frontend',
    level: 'expert',
    icon: '🌐'
  },
  
  // Backend
  {
    id: '7',
    name: 'Node.js',
    category: 'backend',
    level: 'intermediate',
    icon: '🟢'
  },
  {
    id: '8',
    name: 'PostgreSQL',
    category: 'backend',
    level: 'intermediate',
    icon: '🐘'
  },
  {
    id: '9',
    name: 'Supabase',
    category: 'backend',
    level: 'advanced',
    icon: '⚡'
  },
  {
    id: '10',
    name: 'Prisma',
    category: 'backend',
    level: 'intermediate',
    icon: '🔷'
  },
  {
    id: '11',
    name: 'REST API',
    category: 'backend',
    level: 'advanced',
    icon: '🔌'
  },
  {
    id: '12',
    name: 'MongoDB',
    category: 'backend',
    level: 'intermediate',
    icon: '🍃'
  },
  
  // Tools & Others
  {
    id: '13',
    name: 'Git & GitHub',
    category: 'tools',
    level: 'advanced',
    icon: '🔧'
  },
  {
    id: '14',
    name: 'Vercel',
    category: 'tools',
    level: 'advanced',
    icon: '▲'
  },
  {
    id: '15',
    name: 'VS Code',
    category: 'tools',
    level: 'expert',
    icon: '💻'
  },
  {
    id: '16',
    name: 'Figma',
    category: 'tools',
    level: 'intermediate',
    icon: '🎨'
  },
  {
    id: '17',
    name: 'Responsive Design',
    category: 'other',
    level: 'advanced',
    icon: '📱'
  },
  {
    id: '18',
    name: 'SEO',
    category: 'other',
    level: 'intermediate',
    icon: '🔍'
  }
];

// Helper untuk group skills by category
export const getSkillsByCategory = () => {
  return {
    frontend: skillsData.filter(skill => skill.category === 'frontend'),
    backend: skillsData.filter(skill => skill.category === 'backend'),
    tools: skillsData.filter(skill => skill.category === 'tools'),
    other: skillsData.filter(skill => skill.category === 'other')
  };
};
