import Link from 'next/link';
import { Github, Linkedin, Twitter, Instagram, Mail } from 'lucide-react';
import { getProfile } from '@/lib/content';
import { profileData } from '@/data/profile';
import type { Profile } from '@/types';

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  let profile: Profile = profileData;
  try {
    profile = await getProfile();
  } catch {
    // fallback data lokal
  }

  const socialLinks = [
    { icon: Github, href: profile.links.github, label: 'GitHub' },
    { icon: Linkedin, href: profile.links.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: profile.links.twitter, label: 'Twitter' },
    { icon: Instagram, href: profile.links.instagram, label: 'Instagram' }
  ];

  return (
    <footer className="bg-stone-900 dark:bg-black text-stone-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">
              {profile.name}<span className="text-orange-500">.</span>
            </h3>
            <p className="text-sm text-stone-400 mb-4">
              {profile.headline}
            </p>
            <div className="flex items-center gap-2 text-sm text-stone-400">
              <Mail className="w-4 h-4 text-orange-500" />
              <a href={`mailto:${profile.email}`} className="hover:text-orange-400 transition-colors">
                {profile.email}
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Navigasi</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-stone-400 hover:text-orange-400 transition-colors">
                  Tentang Saya
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-stone-400 hover:text-orange-400 transition-colors">
                  Proyek
                </Link>
              </li>
              <li>
                <Link href="/skills" className="text-stone-400 hover:text-orange-400 transition-colors">
                  Skill
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-stone-400 hover:text-orange-400 transition-colors">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Connect</h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return social.href ? (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-stone-800 hover:bg-orange-600 hover:text-white text-stone-300 transition-all duration-300 hover:-translate-y-0.5"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ) : null;
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-stone-800 text-center text-sm text-stone-500">
          <p>
            © {currentYear} {profile.name}. All rights reserved. ·{' '}
            <Link href="/login" className="text-stone-600 hover:text-orange-400 transition-colors">
              Admin
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
