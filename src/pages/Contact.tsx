import { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle, Clock, Shield, ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import SEOHead from '../components/SEOHead';

export default function Contact() {
  const [formData, setFormData] = useState({ nom: '', email: '', telephone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      const { error: insertError } = await supabase.from('contacts').insert([formData]);
      if (insertError) throw insertError;

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      try {
        const emailResponse = await fetch(`${supabaseUrl}/functions/v1/send-contact-email`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${supabaseAnonKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (!emailResponse.ok) console.error('Email sending failed, but contact saved');
      } catch (emailError) {
        console.error('Error sending email:', emailError);
      }

      setSubmitSuccess(true);
      setFormData({ nom: '', email: '', telephone: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err: any) {
      console.error('Error submitting contact:', err);
      setError(err.message || 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const jsonLD = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact - Taxi VSL Conventionné",
    "description": "Contactez notre équipe de taxi conventionné disponible 24/7 pour toutes vos questions.",
    "url": "https://www.taxisparis-conventionnes.fr/contact"
  };

  const inputClass = 'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100';

  return (
    <>
      <SEOHead
        title="Contact - Taxi VSL Conventionné Paris | 06 50 36 64 91"
        description="Contactez notre service de taxi conventionné et VSL en Île-de-France. Disponible 24h/24, 7j/7. Téléphone: 06 50 36 64 91. Email: contact@taxisparis-conventionnes.fr"
        keywords={["contact taxi conventionné", "téléphone taxi VSL", "contact transport médical", "taxi conventionné Paris contact"]}
        canonical="https://www.taxisparis-conventionnes.fr/contact"
        jsonLD={jsonLD}
      />

      <section className="relative overflow-hidden border-b border-slate-100 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.12),_transparent_34%),linear-gradient(135deg,#f8fbff_0%,#ffffff_52%,#eef8ff_100%)]">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.04fr_.96fr] lg:px-8">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-cyan-700 shadow-sm">
              <MessageCircle size={16} />
              Contact & accompagnement
            </div>
            <h1 id="page-title" className="max-w-3xl text-4xl font-black leading-[1.03] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl">
              Une question sur votre trajet ?
              <span className="block bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500 bg-clip-text text-transparent">Notre équipe vous répond.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Besoin d'une information sur la prise en charge CPAM, une réservation ou un trajet médical ? Contactez-nous par téléphone, email ou formulaire.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="tel:+33650366491" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-blue-700 px-6 py-3.5 font-extrabold text-white shadow-[0_14px_35px_rgba(29,78,216,.25)] transition hover:-translate-y-0.5 hover:bg-blue-800">
                <Phone size={18} /> 06 50 36 64 91
              </a>
              <Link to="/reservation-taxi-vsl" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border-2 border-blue-100 bg-white px-6 py-3.5 font-extrabold text-blue-900 shadow-sm transition hover:bg-blue-50">
                Réserver un trajet <ArrowRight size={18} />
              </Link>
            </div>
            <div className="mt-7 grid max-w-2xl gap-3 sm:grid-cols-3">
              <MiniProof icon={<Clock size={18} />} title="24h/24 · 7j/7" text="Téléphone" />
              <MiniProof icon={<Shield size={18} />} title="Conventionné CPAM" text="Transport médical" />
              <MiniProof icon={<MapPin size={18} />} title="Paris & IDF" text="193 villes" />
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-cyan-200/40 via-blue-200/10 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white p-2 shadow-[0_28px_80px_rgba(15,23,42,.18)]">
              <img src="/image.png" alt="Taxi conventionné devant un établissement de santé" className="h-[360px] w-full rounded-[1.6rem] object-cover sm:h-[430px]" />
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-slate-950/80 px-5 py-4 text-white backdrop-blur">
                <p className="text-xs font-extrabold uppercase tracking-[.14em] text-cyan-200">Réponse rapide</p>
                <p className="mt-1 text-lg font-black">Une équipe à votre écoute pour organiser votre trajet.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[360px_1fr]">
          <aside className="space-y-4">
            <ContactCard icon={<Phone size={22} />} title="Téléphone" value="06 50 36 64 91" href="tel:+33650366491" text="Disponible 24h/24 selon disponibilité" />
            <ContactCard icon={<Mail size={22} />} title="Email" value="contact@taxisparis-conventionnes.fr" href="mailto:contact@taxisparis-conventionnes.fr" text="Pour vos demandes et questions" />
            <ContactCard icon={<MapPin size={22} />} title="Zone desservie" value="Paris & Île-de-France" text="75, 91, 92, 93 et 94" />
            <div className="rounded-[1.75rem] bg-gradient-to-br from-blue-800 to-cyan-700 p-6 text-white shadow-xl">
              <CheckCircle size={24} className="text-cyan-200" />
              <h2 className="mt-4 text-xl font-black">Besoin d'un trajet rapidement ?</h2>
              <p className="mt-2 text-sm leading-6 text-blue-100">Pour une demande urgente ou un horaire proche, appelez-nous directement.</p>
            </div>
          </aside>

          <div>
            {submitSuccess && (
              <div role="alert" aria-live="polite" className="mb-5 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                <CheckCircle className="mt-0.5 shrink-0 text-emerald-600" size={22} />
                <div><p className="font-black text-emerald-900">Votre message a été envoyé.</p><p className="mt-1 text-sm text-emerald-700">Nous vous répondrons dans les plus brefs délais.</p></div>
              </div>
            )}
            {error && <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-800">{error}</div>}

            <form onSubmit={handleSubmit} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
              <p className="text-xs font-black uppercase tracking-[.16em] text-cyan-700">Écrivez-nous</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Envoyez-nous un message</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">Décrivez votre besoin et nous vous répondrons rapidement.</p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <Field label="Nom *"><input type="text" name="nom" value={formData.nom} onChange={handleChange} required className={inputClass} /></Field>
                <Field label="Téléphone *"><input type="tel" name="telephone" value={formData.telephone} onChange={handleChange} required className={inputClass} /></Field>
                <div className="sm:col-span-2"><Field label="Email *"><input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} /></Field></div>
                <div className="sm:col-span-2"><Field label="Message *"><textarea name="message" value={formData.message} onChange={handleChange} required rows={6} className={inputClass + ' min-h-[150px] resize-y'} /></Field></div>
              </div>

              <button type="submit" disabled={isSubmitting} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-700 to-cyan-600 px-5 py-4 font-black text-white shadow-lg shadow-blue-200 transition hover:from-blue-800 hover:to-cyan-700 disabled:cursor-not-allowed disabled:opacity-50">
                <Send size={19} /> {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

function MiniProof({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-sm"><span className="text-teal-500">{icon}</span><div><p className="text-sm font-extrabold text-slate-900">{title}</p><p className="text-xs text-slate-500">{text}</p></div></div>;
}

function ContactCard({ icon, title, value, text, href }: { icon: React.ReactNode; title: string; value: string; text: string; href?: string }) {
  const body = <><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">{icon}</div><div><p className="text-xs font-black uppercase tracking-[.12em] text-slate-400">{title}</p><p className="mt-1 font-black text-slate-900">{value}</p><p className="mt-1 text-xs leading-5 text-slate-500">{text}</p></div></>;
  return href ? <a href={href} className="flex gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">{body}</a> : <div className="flex gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">{body}</div>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-2 block text-sm font-bold text-slate-700">{label}</span>{children}</label>;
}
