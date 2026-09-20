import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, CheckCircle, Clock, Mail, MapPin, Phone, Send, ShieldCheck } from 'lucide-react';
import { supabase } from '../lib/supabase';
import SEOHead from '../components/SEOHead';

export default function Contact() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const { error: insertError } = await supabase
        .from('contacts')
        .insert([{
          nom: formData.nom,
          email: formData.email,
          telephone: formData.telephone,
          message: formData.message,
        }]);

      if (insertError) throw insertError;

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      try {
        const emailResponse = await fetch(`${supabaseUrl}/functions/v1/send-contact-email`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nom: formData.nom,
            email: formData.email,
            telephone: formData.telephone,
            message: formData.message,
          }),
        });

        if (!emailResponse.ok) {
          console.error('Email sending failed, but contact saved');
        }
      } catch (emailError) {
        console.error('Error sending email:', emailError);
      }

      setSubmitSuccess(true);
      setFormData({
        nom: '',
        email: '',
        telephone: '',
        message: ''
      });

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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const jsonLD = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact - Taxi VSL Conventionné",
    "description": "Contactez notre équipe de taxi conventionné disponible 24/7 pour toutes vos questions.",
    "url": "https://www.taxisparis-conventionnes.fr/contact"
  };

  return (
    <>
      <SEOHead
        title="Contact - Taxi VSL Conventionné Paris | 06 50 36 64 91"
        description="Contactez notre service de taxi conventionné et VSL en Île-de-France. Disponible 24h/24, 7j/7. Téléphone: 06 50 36 64 91. Email: contact@taxisparis-conventionnes.fr"
        keywords={["contact taxi conventionné", "téléphone taxi VSL", "contact transport médical", "taxi conventionné Paris contact"]}
        canonical="https://www.taxisparis-conventionnes.fr/contact"
        jsonLD={jsonLD}
      />

      <div className="exact-subpage exact-contact-page">
        <section className="exact-contact-hero">
          <div className="exact-home-container exact-contact-hero-inner">
            <div>
              <p className="exact-home-section-kicker">Une équipe à votre écoute</p>
              <h1>Contactez-nous</h1>
              <p>
                Une question sur votre transport médical, votre réservation ou votre prise en charge ?
                Notre équipe vous répond et vous accompagne 24h/24 et 7j/7.
              </p>
            </div>
            <div className="exact-contact-hero-actions">
              <a href="tel:+33650366491"><Phone size={17} /> 06 50 36 64 91</a>
              <Link to="/reservation-taxi-vsl"><CalendarDays size={17} /> Réserver un trajet</Link>
            </div>
          </div>
        </section>

        <section className="exact-contact-content">
          <div className="exact-home-container exact-contact-grid">
            <aside className="exact-contact-info">
              <div className="exact-contact-info-head">
                <span><ShieldCheck size={24} /></span>
                <div>
                  <p>Taxi conventionné</p>
                  <h2>Informations de contact</h2>
                </div>
              </div>

              <div className="exact-contact-details">
                <a href="tel:+33650366491">
                  <span><Phone size={20} /></span>
                  <div><small>Téléphone</small><strong>06 50 36 64 91</strong><em>Disponible 24h/24 · 7j/7</em></div>
                </a>
                <a href="mailto:contact@taxisparis-conventionnes.fr">
                  <span><Mail size={20} /></span>
                  <div><small>Email</small><strong>contact@taxisparis-conventionnes.fr</strong><em>Réponse sous 24h</em></div>
                </a>
                <div>
                  <span><MapPin size={20} /></span>
                  <div><small>Zone d’intervention</small><strong>Paris & Île-de-France</strong><em>75, 91, 92, 93 et 94</em></div>
                </div>
                <div>
                  <span><Clock size={20} /></span>
                  <div><small>Disponibilité</small><strong>24h/24 · 7j/7</strong><em>Week-ends et jours fériés</em></div>
                </div>
              </div>

              <div className="exact-contact-trust">
                <ShieldCheck size={18} />
                <div>
                  <strong>Transport conventionné CPAM</strong>
                  <span>Prise en charge possible sur prescription médicale selon votre situation.</span>
                </div>
              </div>
            </aside>

            <div className="exact-contact-form-card">
              <div className="exact-contact-form-heading">
                <p className="exact-home-section-kicker">Écrivez-nous</p>
                <h2>Envoyez-nous un message</h2>
                <p>Nous revenons vers vous dans les plus brefs délais.</p>
              </div>

              {submitSuccess && (
                <div role="alert" aria-live="polite" className="exact-contact-alert success">
                  <CheckCircle size={21} aria-hidden="true" />
                  <div>
                    <strong>Votre message a été envoyé avec succès.</strong>
                    <span>Nous vous répondrons dans les plus brefs délais.</span>
                  </div>
                </div>
              )}

              {error && (
                <div role="alert" className="exact-contact-alert error">
                  <strong>Une erreur est survenue.</strong>
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="exact-contact-fields">
                  <label>
                    <span>Nom *</span>
                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                    />
                  </label>

                  <label>
                    <span>Email *</span>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                    />
                  </label>

                  <label>
                    <span>Téléphone *</span>
                    <input
                      type="tel"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleChange}
                      required
                      autoComplete="tel"
                    />
                  </label>

                  <label>
                    <span>Message *</span>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                    />
                  </label>
                </div>

                <button type="submit" disabled={isSubmitting}>
                  <Send size={18} />
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                </button>
              </form>
            </div>
          </div>
        </section>

        <section className="exact-contact-bottom">
          <div className="exact-home-container exact-contact-bottom-inner">
            <div>
              <h2>Vous souhaitez directement réserver votre taxi conventionné ?</h2>
              <p>Utilisez le formulaire de réservation pour organiser votre trajet médical.</p>
            </div>
            <Link to="/reservation-taxi-vsl">Réserver maintenant <CalendarDays size={17} /></Link>
          </div>
        </section>
      </div>
    </>
  );
}
