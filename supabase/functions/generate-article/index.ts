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

    const systemPrompt = `Tu es un expert en rédaction SEO pour le secteur médical et le transport sanitaire en France.
Tu rédiges des articles de blog professionnels, informatifs et rassurants pour un site de taxi conventionné CPAM en Île-de-France.

RÈGLES ABSOLUES :
- Ne jamais mentionner l'intelligence artificielle, ChatGPT, IA ou tout outil automatisé
- Rédiger exclusivement en français professionnel
- Le contenu doit paraître rédigé par un expert humain du domaine médical et du transport sanitaire
- Longueur : entre 1500 et 2500 mots
- Format HTML avec balises sémantiques : <h1>, <h2>, <h3>, <p>, <ul>, <li>, <strong>, <em>
- Structure SEO optimisée : H1 unique, plusieurs H2, des H3 pour les sous-sections
- Inclure des mots-clés naturellement intégrés (taxi conventionné, VSL, CPAM, remboursement, transport médical, Île-de-France)
- Ton : informatif, rassurant, professionnel, empathique
- Chaque paragraphe doit être détaillé et apporter une vraie valeur informative

STRUCTURE OBLIGATOIRE DE L'ARTICLE :
1. Introduction présentant le sujet (2-3 paragraphes)
2. Sections détaillées sur le sujet demandé (spécialités, services, informations pratiques)
3. Une section "Transport médical en taxi conventionné CPAM" expliquant :
   - Ce qu'est un taxi conventionné / VSL
   - Les conditions de remboursement CPAM
   - Comment réserver depuis le lieu traité
   - Les avantages du service Taxis Paris Conventionnés
4. Conclusion avec appel à l'action

RETOURNE UNIQUEMENT un objet JSON valide sans markdown, sans \`\`\`json, sans explication. Format exact :
{
  "title": "Titre SEO accrocheur (60-70 caractères max)",
  "slug": "slug-url-en-minuscules-avec-tirets",
  "excerpt": "Résumé accrocheur de 150-160 caractères pour les listes d'articles",
  "content": "Contenu HTML complet de l'article (1500-2500 mots)",
  "meta_description": "Description meta optimisée SEO de 150-160 caractères",
  "meta_keywords": "mot-clé1, mot-clé2, mot-clé3, mot-clé4, mot-clé5"
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
