import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  MapPin,
  ArrowUpRight,
  Github,
  Linkedin,
  Twitter,
  CheckCircle,
  Send,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { portfolioConfig } from '../../config/portfolio';
import { fadeInUp } from '../../motion/variants';
import { Button } from '../ui/Button';

export const Contact: React.FC = () => {
  const { t, language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const { profile, contactForm } = portfolioConfig;
  const { contact } = t;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    if (contactForm.provider === 'web3forms') {
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: contactForm.accessKey,
            ...form,
            subject: `Nuevo contacto de ${form.name} desde el Portfolio`,
          }),
        });
        const data = await response.json();
        if (data.success) {
          setStatus('success');
          setForm({ name: '', email: '', message: '' });
        } else {
          setStatus('error');
        }
      } catch {
        setStatus('error');
      }
    } else {
      const subject = encodeURIComponent(`Nuevos requisitos de ${form.name}`);
      const body = encodeURIComponent(
        `Nombre: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
      );
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus('success');
    }
  };

  const socialLinks = [
    { platform: 'GitHub', url: portfolioConfig.socials.github, icon: Github },
    { platform: 'LinkedIn', url: portfolioConfig.socials.linkedin, icon: Linkedin },
    { platform: 'Twitter', url: portfolioConfig.socials.twitter, icon: Twitter },
  ];

  return (
    <section id="contact" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto max-w-5xl relative z-10">
        <motion.div className="mb-10 md:mb-12" {...fadeInUp()}>
          <div className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            {language === 'en' ? 'Contact' : 'Contacto'}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold leading-tight mb-4 text-foreground">
            {contact.title.split(' próximo ')[0]}{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-purple-400">
              {language === 'en' ? 'Next Project' : 'Próximo Proyecto'}
            </span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-md">
            {contact.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14">
          <motion.div className="space-y-6" {...fadeInUp(0.15)}>
            <div className="group flex items-center gap-4 p-5 rounded-2xl border border-border bg-muted/20 hover:bg-muted/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors shrink-0">
                <Mail size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-0.5">
                  {language === 'en' ? 'Professional Email' : 'Email Profesional'}
                </p>
                <p className="text-sm md:text-base font-medium truncate text-foreground">
                  {profile.email}
                </p>
              </div>
              <button
                className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors shrink-0"
                onClick={handleCopyEmail}
              >
                {copied ? (
                  <CheckCircle size={18} className="text-emerald-500" />
                ) : (
                  <ArrowUpRight size={18} />
                )}
              </button>
            </div>

            <div className="flex items-center gap-4 p-5 rounded-2xl border border-border bg-muted/20 text-foreground">
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-0.5">
                  {language === 'en' ? 'Based in' : 'Basado en'}
                </p>
                <p className="text-sm md:text-base font-medium">{profile.location}</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-border bg-card/60 backdrop-blur-sm shadow-sm space-y-4">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                {language === 'en' ? 'Digital Presence' : 'Presencia Digital'}
              </p>
              <div className="flex gap-4">
                {socialLinks.map(s => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.platform}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 flex items-center justify-center rounded-full bg-muted border border-border hover:bg-foreground hover:text-background transition-all duration-300 text-muted-foreground"
                    >
                      <Icon size={20} />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <motion.form
            className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-xl shadow-primary/5 space-y-6"
            onSubmit={handleSubmit}
            {...fadeInUp(0.25)}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField
                label={contact.name}
                placeholder={language === 'en' ? 'Your Name' : 'Tu Nombre'}
                id="name"
                disabled={status === 'loading' || status === 'success'}
                value={form.name}
                onChange={v => setForm(f => ({ ...f, name: v }))}
              />
              <FormField
                label={contact.email}
                placeholder={language === 'en' ? 'your@email.com' : 'tu@email.com'}
                id="email"
                type="email"
                disabled={status === 'loading' || status === 'success'}
                value={form.email}
                onChange={v => setForm(f => ({ ...f, email: v }))}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="message"
                className="text-xs font-bold text-muted-foreground ml-1 uppercase tracking-tighter"
              >
                {contact.message}
              </label>
              <textarea
                id="message"
                rows={4}
                required
                disabled={status === 'loading' || status === 'success'}
                className="w-full px-4 py-4 rounded-2xl bg-background/50 border border-border focus:bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none placeholder:text-muted-foreground/40 text-sm md:text-base text-foreground"
                placeholder={
                  language === 'en'
                    ? 'Tell me about your project...'
                    : 'Cuéntame sobre tu proyecto...'
                }
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              />
            </div>

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-500/10 border border-green-500/20 text-green-500 p-4 rounded-2xl flex items-center gap-3 text-sm font-medium"
                >
                  <CheckCircle size={20} /> {contact.success}
                </motion.div>
              ) : status === 'error' ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-2xl text-sm font-medium"
                >
                  {language === 'en'
                    ? 'There was an error. Please try again.'
                    : 'Hubo un error. Por favor, reintenta.'}
                </motion.div>
              ) : (
                <Button
                  key="submit"
                  type="submit"
                  size="lg"
                  disabled={status === 'loading'}
                  className="w-full"
                >
                  {status === 'loading' ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      {contact.send}{' '}
                      <Send className="ml-3 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </Button>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

const FormField: React.FC<{
  label: string;
  placeholder: string;
  id: string;
  type?: string;
  disabled?: boolean;
  value: string;
  onChange: (v: string) => void;
}> = ({ label, placeholder, id, type = 'text', disabled = false, value, onChange }) => (
  <div className="space-y-2">
    <label
      htmlFor={id}
      className="text-xs font-bold text-muted-foreground ml-1 uppercase tracking-tighter"
    >
      {label}
    </label>
    <input
      id={id}
      type={type}
      required
      disabled={disabled}
      className="w-full px-4 py-4 rounded-2xl bg-background/50 border border-border focus:bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/40 text-sm md:text-base disabled:opacity-60 text-foreground"
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  </div>
);
