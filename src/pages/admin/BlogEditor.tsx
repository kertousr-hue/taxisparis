import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft, Eye, Image as ImageIcon, AlignLeft, Copy, Sparkles, Loader2, X } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import MediaPicker from '../../components/admin/MediaPicker';
import { supabase } from '../../lib/supabase';

const SUPABASE_URL = 'https://qwsgtmzpirrbnmcbdvue.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3c2d0bXpwaXJyYm5tY2JkdnVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNDUzMjQsImV4cCI6MjA5NTgyMTMyNH0.RFb45xZjY3pDV4QWgr9-ASta84bX09fIcbv7ZZlY_mk';

export default function BlogEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [mediaPickerTarget, setMediaPickerTarget] = useState<'featured' | 'content'>('content');
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiTypeArticle, setAiTypeArticle] = useState('hopital');
  const [aiNomEtablissement, setAiNomEtablissement] = useState('');
  const [aiVille, setAiVille] = useState('');
  const [aiDepartement, setAiDepartement] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  const [showAiPanel, setShowAiPanel] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image_url: '',
    meta_description: '',
    meta_keywords: '',
    published: false,
  });

  useEffect(() => {
    if (id && id !== 'new') {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    const { data } = await supabase.from('blog_posts').select('*').eq('id', id).single();
    if (data) setFormData(data);
  };

  const handleGenerateAI = async () => {
    if (!aiNomEtablissement.trim() && !aiPrompt.trim()) {
      setAiError('Veuillez saisir au minimum le nom de l\'établissement ou un sujet.');
      return;
    }
    setAiLoading(true);
    setAiError('');

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token || SUPABASE_ANON_KEY;

      const resp = await fetch(`${SUPABASE_URL}/functions/v1/generate-article`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          prompt: aiPrompt.trim() || aiNomEtablissement.trim(),
          typeArticle: aiTypeArticle,
          nomEtablissement: aiNomEtablissement.trim(),
          ville: aiVille.trim(),
          departement: aiDepartement.trim(),
        }),
      });

      const data = await resp.json();

      if (!resp.ok || !data.success) {
        throw new Error(data.error || `Erreur ${resp.status}`);
      }

      const { article } = data;
      setFormData(prev => ({
        ...prev,
        title: article.title || prev.title,
        slug: article.slug || prev.slug,
        excerpt: article.excerpt || prev.excerpt,
        content: article.content || prev.content,
        meta_description: article.meta_description || prev.meta_description,
        meta_keywords: article.meta_keywords || prev.meta_keywords,
      }));
      setShowAiPanel(false);
      setAiPrompt('');
    } catch (err: any) {
      setAiError(err.message || 'Une erreur est survenue lors de la génération.');
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = { ...formData };
      if (formData.published && !formData.published) {
        (payload as any).published_at = new Date().toISOString();
      }

      if (id === 'new') {
        await supabase.from('blog_posts').insert([payload]);
      } else {
        await supabase.from('blog_posts').update(payload).eq('id', id);
      }
      navigate('/admin/blog');
    } catch (error) {
      console.error('Error saving post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div>
        <button
          onClick={() => navigate('/admin/blog')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft size={20} />
          Retour au blog
        </button>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {id === 'new' ? 'Nouvel article' : 'Modifier l\'article'}
          </h1>
          <button
            type="button"
            onClick={() => { setShowAiPanel(true); setAiError(''); }}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-xl hover:from-violet-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg font-semibold text-sm"
          >
            <Sparkles size={16} />
            Générer avec l'IA
          </button>
        </div>

        {/* ── AI Generation Panel ── */}
        {showAiPanel && (
          <div className="bg-gradient-to-br from-violet-50 to-blue-50 border border-violet-200 rounded-2xl p-6 mb-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Sparkles size={16} className="text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-800 text-base">Génération automatique par IA</h2>
                  <p className="text-xs text-gray-500">Article SEO 1500-2500 mots — min. 8 H2, 10 H3, FAQ — tout sujet</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => { setShowAiPanel(false); setAiError(''); }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Type d'article */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Type d'article *
              </label>
              <select
                value={aiTypeArticle}
                onChange={(e) => setAiTypeArticle(e.target.value)}
                disabled={aiLoading}
                className="w-full px-4 py-3 border border-violet-200 rounded-xl focus:ring-2 focus:ring-violet-400 focus:border-transparent bg-white text-sm"
              >
                <optgroup label="— Général —">
                  <option value="general">Article général / Blog</option>
                  <option value="guide">Guide pratique</option>
                  <option value="comparatif">Comparatif</option>
                  <option value="actualite">Actualité / News</option>
                  <option value="conseils">Conseils &amp; astuces</option>
                </optgroup>
                <optgroup label="— Médical / Sanitaire —">
                  <option value="hopital">Hôpital public</option>
                  <option value="clinique">Clinique privée</option>
                  <option value="centre_medical">Centre médical / Cabinet</option>
                  <option value="centre_dialyse">Centre de dialyse</option>
                  <option value="centre_cancerologie">Centre de cancérologie / radiothérapie</option>
                  <option value="ehpad">EHPAD / Maison de retraite</option>
                  <option value="transport_medical">Transport médical (motif ou trajet)</option>
                </optgroup>
                <optgroup label="— Local / Services —">
                  <option value="ville">Guide de ville / quartier</option>
                  <option value="service_local">Service local</option>
                  <option value="commerce">Commerce / Entreprise</option>
                  <option value="tourisme">Tourisme / Loisirs</option>
                </optgroup>
              </select>
            </div>

            {/* Nom établissement + Ville + Département */}
            <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sujet principal *
                </label>
                <input
                  type="text"
                  value={aiNomEtablissement}
                  onChange={(e) => setAiNomEtablissement(e.target.value)}
                  placeholder="Ex: Hôpital Beaujon, Vélo électrique, Recette healthy..."
                  className="w-full px-4 py-3 border border-violet-200 rounded-xl focus:ring-2 focus:ring-violet-400 focus:border-transparent bg-white text-sm"
                  disabled={aiLoading}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ville *
                </label>
                <input
                  type="text"
                  value={aiVille}
                  onChange={(e) => setAiVille(e.target.value)}
                  placeholder="Ex: Clichy"
                  className="w-full px-4 py-3 border border-violet-200 rounded-xl focus:ring-2 focus:ring-violet-400 focus:border-transparent bg-white text-sm"
                  disabled={aiLoading}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Département
                </label>
                <input
                  type="text"
                  value={aiDepartement}
                  onChange={(e) => setAiDepartement(e.target.value)}
                  placeholder="Ex: Hauts-de-Seine (92)"
                  className="w-full px-4 py-3 border border-violet-200 rounded-xl focus:ring-2 focus:ring-violet-400 focus:border-transparent bg-white text-sm"
                  disabled={aiLoading}
                />
              </div>
            </div>

            {/* Informations complémentaires */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Informations complémentaires
                <span className="font-normal text-gray-400 ml-1">(spécialités, contexte, mots-clés...)</span>
              </label>
              <input
                type="text"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Ex: spécialités, contexte, angle éditorial, mots-clés à intégrer..."
                className="w-full px-4 py-3 border border-violet-200 rounded-xl focus:ring-2 focus:ring-violet-400 focus:border-transparent bg-white text-sm"
                disabled={aiLoading}
              />
              <p className="text-xs text-gray-400 mt-1.5">
                Optionnel — précisez les spécialités, le contexte médical ou les mots-clés à intégrer
              </p>
            </div>

            {/* Info box */}
            <div className="mb-4 p-3 bg-blue-50 border border-blue-100 rounded-xl">
              <p className="text-xs text-blue-700 font-medium">
                L'IA va générer un article centré sur <strong>{aiNomEtablissement || aiPrompt || '…'}</strong>
                {aiVille ? <> à <strong>{aiVille}</strong></> : null}
                {aiDepartement ? <> ({aiDepartement})</> : null}
                {' '}— min. 8 H2, 10 H3, FAQ SEO{['hopital','clinique','centre_medical','centre_dialyse','centre_cancerologie','ehpad','transport_medical'].includes(aiTypeArticle) ? ', section transport CPAM' : ''}.
              </p>
            </div>

            {aiError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 flex items-start gap-2">
                <X size={14} className="flex-shrink-0 mt-0.5 text-red-500" />
                {aiError}
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleGenerateAI}
                disabled={aiLoading || (!aiNomEtablissement.trim() && !aiPrompt.trim())}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-xl hover:from-violet-700 hover:to-blue-700 transition-all font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                {aiLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Génération en cours… (30-60 sec)
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Générer l'article
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => { setShowAiPanel(false); setAiError(''); }}
                className="px-5 py-2.5 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition text-sm"
                disabled={aiLoading}
              >
                Annuler
              </button>
            </div>

            {aiLoading && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-xl">
                <div className="flex items-center gap-2 text-sm text-blue-700">
                  <Loader2 size={14} className="animate-spin flex-shrink-0" />
                  <span>L'IA rédige votre article SEO optimisé… Tous les champs seront remplis automatiquement.</span>
                </div>
                <div className="mt-2 h-1.5 bg-blue-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-violet-500 to-blue-500 rounded-full animate-pulse w-3/4" />
                </div>
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Informations de base</h2>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre de l'article *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Les avantages du transport VSL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug (URL) *
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: avantages-transport-vsl"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <ImageIcon className="inline mr-2" size={16} />
                Image mise en avant
              </label>
              <input
                type="url"
                value={formData.featured_image_url}
                onChange={(e) => setFormData({ ...formData, featured_image_url: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setMediaPickerTarget('featured');
                    setShowMediaPicker(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                >
                  <ImageIcon size={16} />
                  Choisir depuis la médiathèque
                </button>
              </div>
              {formData.featured_image_url && (
                <div className="mt-3">
                  <img
                    src={formData.featured_image_url}
                    alt="Aperçu"
                    className="h-48 w-full object-cover rounded-lg border"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Extrait (résumé)
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                rows={2}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Court résumé de l'article..."
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Contenu de l'article</h2>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Contenu *
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const textarea = document.querySelector('textarea[rows="20"]') as HTMLTextAreaElement;
                      if (textarea) {
                        const start = textarea.selectionStart;
                        const end = textarea.selectionEnd;
                        const text = formData.content;
                        const before = text.substring(0, start);
                        const selected = text.substring(start, end);
                        const after = text.substring(end);
                        setFormData({ ...formData, content: before + '<strong>' + selected + '</strong>' + after });
                      }
                    }}
                    className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded"
                    title="Gras"
                  >
                    <strong>B</strong>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const textarea = document.querySelector('textarea[rows="20"]') as HTMLTextAreaElement;
                      if (textarea) {
                        const start = textarea.selectionStart;
                        const end = textarea.selectionEnd;
                        const text = formData.content;
                        const before = text.substring(0, start);
                        const selected = text.substring(start, end);
                        const after = text.substring(end);
                        setFormData({ ...formData, content: before + '<em>' + selected + '</em>' + after });
                      }
                    }}
                    className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded italic"
                    title="Italique"
                  >
                    I
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, content: formData.content + '\n<h2>Titre</h2>\n' });
                    }}
                    className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded"
                    title="Ajouter H2"
                  >
                    H2
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, content: formData.content + '\n<h3>Sous-titre</h3>\n' });
                    }}
                    className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded"
                    title="Ajouter H3"
                  >
                    H3
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, content: formData.content + '\n<p>Paragraphe</p>\n' });
                    }}
                    className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded flex items-center gap-1"
                    title="Ajouter paragraphe"
                  >
                    <AlignLeft size={12} /> P
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, content: formData.content + '\n<ul>\n  <li>Élément 1</li>\n  <li>Élément 2</li>\n</ul>\n' });
                    }}
                    className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded"
                    title="Ajouter liste"
                  >
                    UL
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMediaPickerTarget('content');
                      setShowMediaPicker(true);
                    }}
                    className="px-2 py-1 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 rounded flex items-center gap-1 font-medium"
                    title="Ajouter image depuis la médiathèque"
                  >
                    <ImageIcon size={12} /> MEDIA
                  </button>
                </div>
              </div>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
                rows={20}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                placeholder="Contenu de l'article en HTML..."
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-gray-500">
                  Vous pouvez utiliser du HTML pour formater le contenu (balises: &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;, &lt;em&gt;, etc.)
                </p>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(formData.content);
                    alert('Contenu copié dans le presse-papier');
                  }}
                  className="flex items-center gap-1 px-2 py-1 text-xs text-blue-600 hover:text-blue-700"
                >
                  <Copy size={12} /> Copier
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">SEO & Métadonnées</h2>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Description
                </label>
                <textarea
                  value={formData.meta_description}
                  onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Description pour les moteurs de recherche"
                />
                <p className="text-xs text-gray-500 mt-1">Recommandé: 150-160 caractères</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Keywords
                </label>
                <input
                  type="text"
                  value={formData.meta_keywords}
                  onChange={(e) => setFormData({ ...formData, meta_keywords: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="vsl, taxi, paris, transport"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="flex items-center gap-2 cursor-pointer p-4 bg-blue-50 rounded-lg border border-blue-200">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-5 h-5"
                />
                <div>
                  <span className="text-sm font-medium text-gray-700">Publier cet article</span>
                  <p className="text-xs text-gray-500">L'article sera visible sur le site</p>
                </div>
              </label>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
              >
                <Save size={20} />
                {loading ? 'Enregistrement...' : 'Enregistrer'}
              </button>
              {id !== 'new' && (
                <a
                  href={`/blog/${formData.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                >
                  <Eye size={20} />
                  Aperçu
                </a>
              )}
            </div>
          </div>
        </form>
      </div>
      {showMediaPicker && (
        <MediaPicker
          onSelect={(url) => {
            if (mediaPickerTarget === 'featured') {
              setFormData({ ...formData, featured_image_url: url });
            } else {
              setFormData({ ...formData, content: formData.content + `\n<img src="${url}" alt="Image" class="w-full rounded-lg my-4" />\n` });
            }
          }}
          onClose={() => setShowMediaPicker(false)}
        />
      )}
    </AdminLayout>
  );
}
