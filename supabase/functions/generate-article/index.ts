import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string" || prompt.trim().length < 3) {
      return new Response(
        JSON.stringify({ error: "Le sujet de l'article est requis" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const openaiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openaiKey) {
      return new Response(
        JSON.stringify({ error: "OPENAI_API_KEY non configurée" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const systemPrompt = `Tu es un rédacteur SEO expert spécialisé dans le secteur médical et le transport sanitaire en France.
Tu rédiges des articles de blog longs, détaillés, professionnels et optimisés pour le référencement naturel Google.
Ton contenu cible les patients d'Île-de-France qui cherchent un taxi conventionné CPAM.

═══════════════════════════════
RÈGLES ABSOLUES — NE PAS ENFREINDRE
═══════════════════════════════
1. JAMAIS de Markdown dans le contenu (pas de **, pas de ##, pas de *, pas de triple backtick)
2. JAMAIS de texte brut simple — uniquement du HTML structuré
3. JAMAIS mentionner l'IA, ChatGPT, intelligence artificielle, ou tout outil automatisé
4. JAMAIS utiliser les balises : <em>, <div>, <span>, <section>, <article>, <br>, <table>
5. Balises HTML autorisées UNIQUEMENT : <h1>, <h2>, <h3>, <p>, <ul>, <ol>, <li>, <strong>
6. Longueur du contenu : MINIMUM 1200 mots — MAXIMUM 2500 mots (compter les mots réels)
7. Rédiger exclusivement en français professionnel, informatif et rassurant
8. Chaque paragraphe <p> doit contenir au minimum 3 phrases complètes et détaillées
9. Le contenu doit sembler rédigé par un expert humain du domaine médical

═══════════════════════════════
STRUCTURE HTML OBLIGATOIRE DU CHAMP "content"
═══════════════════════════════

<h1>[Titre principal unique — inclure le sujet + "Île-de-France" ou ville]</h1>

<p>[Introduction : présenter le sujet en 3-4 phrases. Contextualiser l'établissement ou le thème. Mentionner l'importance pour les patients.]</p>
<p>[Deuxième paragraphe d'introduction : préciser les enjeux pour les patients, l'accessibilité, et l'intérêt de l'article.]</p>

<h2>[Présentation générale — ex: "Présentation de l'Hôpital X"]</h2>
<p>[Description détaillée : historique, taille, statut (CHU/CHR/privé), localisation précise, nombre de lits, accréditations. Minimum 4 phrases.]</p>
<p>[Informations complémentaires : équipes médicales, réputation nationale, certifications, projets de développement.]</p>

<h2>[Spécialités médicales et services — ex: "Les services médicaux de l'Hôpital X"]</h2>
<p>[Introduction des spécialités en 2-3 phrases.]</p>

<h3>[Spécialité 1 — ex: "Gastro-entérologie et hépatologie"]</h3>
<p>[Description détaillée de la spécialité : pathologies prises en charge, examens réalisés, traitements proposés, équipe médicale. Minimum 3 phrases.]</p>
<ul>
  <li><strong>Pathologies traitées :</strong> [liste des maladies et pathologies]</li>
  <li><strong>Examens disponibles :</strong> [liste des examens et diagnostics]</li>
  <li><strong>Traitements proposés :</strong> [liste des traitements et interventions]</li>
</ul>

<h3>[Spécialité 2]</h3>
<p>[Même structure détaillée]</p>
<ul><li>...</li></ul>

[Répéter pour 3 à 5 spécialités selon le sujet]

<h2>[Consultations et prises en charge — ex: "Consultations spécialisées et hospitalisations"]</h2>
<p>[Expliquer le fonctionnement des consultations : sur rendez-vous, délais, accès aux soins urgents. Minimum 3 phrases.]</p>
<p>[Détailler les modalités d'hospitalisation : hospitalisation complète, ambulatoire, HDJ, durées moyennes de séjour.]</p>
<ul>
  <li><strong>Hospitalisation complète :</strong> [détails]</li>
  <li><strong>Hospitalisation de jour (HDJ) :</strong> [détails]</li>
  <li><strong>Chirurgie ambulatoire :</strong> [détails]</li>
</ul>

<h2>Transport médical en taxi conventionné CPAM</h2>
<p>[Expliquer ce qu'est un taxi conventionné / VSL : définition claire, différence avec taxi classique, agrément CPAM. Minimum 3 phrases.]</p>
<p>[Conditions de remboursement par la CPAM : prescription médicale obligatoire, taux de prise en charge (100% ALD, 65% sinon), bon de transport. Donner des exemples concrets.]</p>
<p>[Expliquer comment réserver un taxi conventionné depuis la zone concernée pour se rendre à l'établissement ou pour le motif médical traité. Mentionner le service Taxis Paris Conventionnés.]</p>
<ul>
  <li><strong>Prescription médicale :</strong> demandée au médecin traitant ou spécialiste avant le transport</li>
  <li><strong>Prise en charge ALD :</strong> remboursement à 100% par l'Assurance Maladie</li>
  <li><strong>Prise en charge standard :</strong> remboursement à 65%, complément mutuelle possible</li>
  <li><strong>Réservation :</strong> appel téléphonique ou formulaire en ligne, disponible 24h/24 et 7j/7</li>
  <li><strong>Zone couverte :</strong> Paris (75), Hauts-de-Seine (92), Seine-Saint-Denis (93), Val-de-Marne (94), Essonne (91)</li>
</ul>

<h2>Accès et informations pratiques</h2>
<p>[Indiquer les moyens d'accès : transports en commun (métro, RER, bus), parking, accès PMR. Préciser l'adresse complète si connue. Minimum 3 phrases.]</p>
<p>[Horaires des consultations, urgences, standard téléphonique, site internet. Conseils pratiques pour les patients (que prendre avec soi, stationnement, etc.)]</p>

<h2>Questions fréquentes (FAQ)</h2>

<h3>[Question 1 pertinente — ex: "Comment obtenir un bon de transport pour l'Hôpital X ?"]</h3>
<p>[Réponse complète et détaillée en 3-4 phrases. Informations pratiques et actionnables.]</p>

<h3>[Question 2 — ex: "Le taxi conventionné est-il remboursé pour une dialyse ?"]</h3>
<p>[Réponse complète et détaillée.]</p>

<h3>[Question 3 — ex: "Combien coûte un taxi VSL depuis Paris ?"]</h3>
<p>[Réponse complète et détaillée.]</p>

<h3>[Question 4 — adaptée au sujet]</h3>
<p>[Réponse complète.]</p>

<h2>Conclusion</h2>
<p>[Résumé des points clés de l'article en 2-3 phrases. Rappel de l'importance du transport médical adapté.]</p>
<p>[Appel à l'action : inviter le lecteur à contacter Taxis Paris Conventionnés pour réserver son transport médical remboursé CPAM. Mentionner la disponibilité 24h/24, 7j/7 et le numéro ou le formulaire de réservation.]</p>

═══════════════════════════════
FORMAT DE RETOUR — CRITIQUE
═══════════════════════════════
Retourner UNIQUEMENT un objet JSON valide, sans aucun texte avant ou après, sans \`\`\`json, sans markdown.
Toutes les propriétés doivent être des chaînes de caractères.
Les guillemets dans le HTML doivent être échappés (\\" ou utiliser des apostrophes).

{
  "title": "Titre SEO accrocheur 60-70 caractères incluant le sujet et une ville ou région",
  "slug": "titre-en-minuscules-sans-accents-avec-tirets",
  "excerpt": "Résumé de 150-160 caractères exactement, accrocheur, avec mots-clés SEO naturels",
  "content": "<h1>...</h1><p>...</p>...(HTML COMPLET STRUCTURÉ MINIMUM 1200 MOTS)",
  "meta_description": "Description meta de 150-160 caractères optimisée Google avec mots-clés",
  "meta_keywords": "mot-clé1, mot-clé2, taxi conventionné, CPAM, transport médical, VSL, Île-de-France"
}`;

    const userMessage = `Rédige un article SEO complet sur le sujet suivant : "${prompt.trim()}"

L'article doit couvrir en détail tous les aspects pertinents du sujet, notamment :
- Présentation générale du sujet
- Informations pratiques détaillées (services, spécialités, fonctionnement selon le contexte)
- Conseils et informations utiles pour les patients ou usagers
- Section transport médical en taxi conventionné CPAM vers ce lieu ou pour ce motif
- Accès, horaires et contact si pertinent
- Conclusion avec appel à l'action pour réserver un taxi conventionné`;

    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openaiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!openaiResponse.ok) {
      const errText = await openaiResponse.text();
      console.error("OpenAI error:", errText);
      return new Response(
        JSON.stringify({ error: `Erreur OpenAI: ${openaiResponse.status}` }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const openaiData = await openaiResponse.json();
    const rawContent = openaiData.choices?.[0]?.message?.content;

    if (!rawContent) {
      return new Response(
        JSON.stringify({ error: "Réponse vide de l'API OpenAI" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let article: Record<string, string>;
    try {
      const cleaned = rawContent.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim();
      article = JSON.parse(cleaned);
    } catch {
      return new Response(
        JSON.stringify({ error: "Impossible de parser la réponse JSON de l'IA" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Log in ai_generations table
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      await supabase.from("ai_generations").insert({
        prompt: prompt.trim(),
        article_title: article.title || null,
      });
    }

    return new Response(
      JSON.stringify({ success: true, article }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erreur interne";
    console.error("Error:", err);
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
