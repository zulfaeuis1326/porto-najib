import { Metadata } from 'next';
import { Mail, MapPin, Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import Card from '@/components/ui/Card';
import ContactForm from '@/components/sections/ContactForm';
import Reveal from '@/components/ui/Reveal';
import { getProfile } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Kontak - Najib',
  description: 'Hubungi saya untuk kolaborasi, proyek freelance, atau sekadar bertanya tentang web development.',
};

export const dynamic = 'force-dynamic';

export default async function ContactPage() {
  const profileData = await getProfile();
  const socialLinks = [
    { 
      icon: Github, 
      href: profileData.links.github, 
      label: 'GitHub',
      color: 'hover:text-slate-900 dark:hover:text-white'
    },
    { 
      icon: Linkedin, 
      href: profileData.links.linkedin, 
      label: 'LinkedIn',
      color: 'hover:text-orange-600'
    },
    { 
      icon: Twitter, 
      href: profileData.links.twitter, 
      label: 'Twitter',
      color: 'hover:text-sky-500'
    },
    { 
      icon: Instagram, 
      href: profileData.links.instagram, 
      label: 'Instagram',
      color: 'hover:text-pink-600'
    }
  ];

  return (
    <div className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal>
        <div className="text-center mb-16">
          <span className="eyebrow justify-center mb-3">Kontak</span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">Hubungi Saya</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Punya pertanyaan atau ingin bekerja sama? 
            Saya akan dengan senang hati mendengarnya!
          </p>
        </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <Reveal>
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Info Kontak</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium mb-1">Email</p>
                    <a 
                      href={`mailto:${profileData.email}`}
                      className="text-slate-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 text-sm"
                    >
                      {profileData.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium mb-1">Lokasi</p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      {profileData.location}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
            </Reveal>

            <Reveal delay={120}>
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Social Media</h2>
              <div className="space-y-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return social.href ? (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 text-slate-600 dark:text-slate-400 transition-colors ${social.color}`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{social.label}</span>
                    </a>
                  ) : null;
                })}
              </div>
            </Card>
            </Reveal>

            <Reveal delay={200}>
            <Card className="p-6 bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-900">
              <h3 className="font-semibold mb-2">Jam Kerja</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Senin - Jumat<br />
                09:00 - 17:00 WIB
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                * Biasanya merespon dalam 24 jam
              </p>
            </Card>
            </Reveal>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Reveal delay={120}>
            <Card className="p-8">
              <h2 className="text-2xl font-semibold mb-2">Kirim Pesan</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Isi form di bawah ini dan saya akan segera menghubungi Anda kembali.
              </p>
              <ContactForm />
            </Card>
            </Reveal>
          </div>
        </div>

        {/* FAQ or Additional Info */}
        <Reveal>
        <Card className="p-8 mt-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">Pertanyaan Umum</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Berapa lama response time?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Biasanya saya merespon dalam 24 jam di hari kerja. Untuk urgent, 
                bisa langsung email.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Apakah tersedia untuk freelance?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Ya! Saya terbuka untuk proyek freelance. Diskusikan kebutuhan Anda 
                dan kita bisa atur timeline yang sesuai.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Teknologi apa yang dikuasai?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Fokus saya adalah Next.js, React, TypeScript, dan Supabase. 
                Lihat halaman Skills untuk detail lengkap.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Konsultasi gratis?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Diskusi awal dan konsultasi singkat gratis. Untuk konsultasi 
                mendalam bisa kita bicarakan lebih lanjut.
              </p>
            </div>
          </div>
        </Card>
        </Reveal>
      </div>
    </div>
  );
}
