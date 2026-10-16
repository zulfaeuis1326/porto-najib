import { Experience } from '@/types';

export const experiencesData: Experience[] = [
  {
    id: '1',
    type: 'work',
    title: 'Freelance Full Stack Developer',
    organization: 'Self-Employed',
    startDate: '2023-01-01',
    endDate: undefined,
    description: 'Membangun aplikasi web custom untuk berbagai klien, dari e-commerce hingga dashboard analytics. Fokus pada Next.js, React, dan Supabase.',
    current: true
  },
  {
    id: '2',
    type: 'work',
    title: 'Frontend Developer',
    organization: 'PT Digital Startup Indonesia',
    startDate: '2021-06-01',
    endDate: '2022-12-31',
    description: 'Mengembangkan dan maintain aplikasi web dengan React dan TypeScript. Kolaborasi dengan tim designer dan backend developer untuk deliver fitur-fitur baru.',
    current: false
  },
  {
    id: '3',
    type: 'work',
    title: 'Junior Web Developer',
    organization: 'CV Tech Solutions',
    startDate: '2020-03-01',
    endDate: '2021-05-31',
    description: 'Membangun website company profile dan landing page untuk klien. Belajar best practices dalam web development dan version control dengan Git.',
    current: false
  },
  {
    id: '4',
    type: 'education',
    title: 'S1 Teknik Informatika',
    organization: 'Universitas Indonesia',
    startDate: '2016-08-01',
    endDate: '2020-07-31',
    description: 'Belajar fundamental computer science, algoritma, struktur data, dan web development. Tugas akhir tentang aplikasi mobile dengan React Native.',
    current: false
  }
];

// Helper untuk memisahkan work dan education
export const getExperiencesByType = () => {
  return {
    work: experiencesData.filter(exp => exp.type === 'work'),
    education: experiencesData.filter(exp => exp.type === 'education')
  };
};
