import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const MEDICAL_TYPES = new Set([
  "hopital", "clinique", "centre_medical", "centre_dialyse",
  "centre_cancerologie", "ehpad", "transport_medical",
]);

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { prompt, typeArticle, nomEtablissement, ville, departement } = body;

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

    const typeVal = typeArticle?.trim() || "general";
    const isMedical = MEDICAL_TYPES.has(typeVal);
    const sujetPrincipal = nomEtablissement?.trim() || prompt.trim();
    const villeVal = ville?.trim() || "";
    const deptVal = departement?.trim() || "";

    // Build local context string for the prompt
    const localParts = [sujetPrincipal];
    if (villeVal) localParts.push(villeVal);
    if (deptVal) localParts.push(deptVal);
    const localContext = localParts.join(", ");

    // ── SYSTEM PROMPT ──────────────────────────────────────────────────────
    const systemPrompt =
      "Tu es un rédacteur SEO expert. Tu rédiges des articles de blog longs, ultra-détaillés, professionnels et parfaitement optimisés pour le référencement naturel Google.\n\n" +

      "RÈGLES ABSOLUES — NE PAS ENFREINDRE :\n" +
      "1. JAMAIS de Markdown (pas de **, pas de ##, pas de *, pas de triple backtick)\n" +
      "2. JAMAIS de texte brut — uniquement du HTML structuré\n" +
      "3. JAMAIS mentionner l'IA, ChatGPT, intelligence artificielle ou tout outil automatisé\n" +
      "4. JAMAIS utiliser les balises : em, div, span, section, article, br, table\n" +
      "5. Balises HTML autorisées UNIQUEMENT : h1, h2, h3, p, ul, ol, li, strong\n" +
      "6. Longueur : MINIMUM 1500 mots — MAXIMUM 2500 mots réels dans le champ content\n" +
      "7. MINIMUM 8 titres H2 dans le corps de l'article\n" +
      "8. MINIMUM 10 titres H3 dans le corps de l'article\n" +
      "9. Chaque paragraphe p doit contenir au minimum 3 phrases complètes\n" +
      "10. L'article doit être 100% centré sur le sujet demandé — JAMAIS générique\n" +
      "11. Citer naturellement le sujet" + (villeVal ? ", la ville" : "") + (deptVal ? " et le département" : "") + " dans tout l'article pour le SEO local\n" +
      "12. Rédiger en français professionnel, informatif et adapté au sujet\n\n" +

      "STRUCTURE HTML OBLIGATOIRE DU CHAMP content :\n\n" +
      "<h1>[Titre principal accrocheur incluant le sujet" + (villeVal ? " et la ville" : "") + "]</h1>\n\n" +
      "<p>[Introduction 1 : présentation du sujet, son importance, son contexte. 4 phrases minimum.]</p>\n" +
      "<p>[Introduction 2 : ce que le lecteur va trouver dans l'article. 3 phrases minimum.]</p>\n\n" +

      "<h2>[Présentation générale — adaptée au sujet]</h2>\n" +
      "<p>[Description détaillée, historique ou contexte, chiffres clés si pertinents. 4-5 phrases.]</p>\n" +
      "<p>[Informations complémentaires : réputation, certifications, partenariats, distinctions. 3-4 phrases.]</p>\n\n" +

      "<h2>[Thématique principale 1 — propre au sujet]</h2>\n" +
      "<p>[Description détaillée. 3-4 phrases.]</p>\n" +
      "<h3>[Sous-thème 1.1]</h3>\n" +
      "<p>[Contenu détaillé. 3 phrases minimum.]</p>\n" +
      "<ul><li><strong>Point clé 1 :</strong> [détail]</li><li><strong>Point clé 2 :</strong> [détail]</li><li><strong>Point clé 3 :</strong> [détail]</li></ul>\n\n" +
      "<h3>[Sous-thème 1.2]</h3>\n" +
      "<p>[Contenu détaillé. 3 phrases minimum.]</p>\n\n" +

      "<h2>[Thématique principale 2]</h2>\n" +
      "<p>[Introduction. 2-3 phrases.]</p>\n" +
      "<h3>[Sous-thème 2.1]</h3>\n" +
      "<p>[Contenu. 3 phrases.]</p>\n" +
      "<h3>[Sous-thème 2.2]</h3>\n" +
      "<p>[Contenu. 3 phrases.]</p>\n" +
      "<h3>[Sous-thème 2.3]</h3>\n" +
      "<p>[Contenu. 3 phrases.]</p>\n\n" +

      "<h2>[Thématique principale 3]</h2>\n" +
      "<p>[Contenu. 3-4 phrases.]</p>\n" +
      "<ul><li>...</li></ul>\n\n" +

      "<h2>[Thématique principale 4]</h2>\n" +
      "<p>[Contenu. 3-4 phrases.]</p>\n" +
      "<h3>[Sous-thème 4.1]</h3><p>[3 phrases.]</p>\n" +
      "<h3>[Sous-thème 4.2]</h3><p>[3 phrases.]</p>\n\n" +

      (isMedical
        ? "<h2>Transport médical en taxi conventionné CPAM</h2>\n" +
          "<p>[Définir le taxi conventionné / VSL : véhicule agréé CPAM, différence avec taxi classique. 3-4 phrases" + (villeVal ? ". Citer la ville et le département." : ".") + "]</p>\n" +
          "<p>[Conditions de remboursement : prescription médicale, taux 100% ALD, 65% standard. 3-4 phrases.]</p>\n" +
          "<p>[Service Taxis Paris Conventionnés : couverture Île-de-France, 24h/24, 7j/7. 3 phrases.]</p>\n" +
          "<ul><li><strong>Prise en charge ALD (100 %) :</strong> dialyse, chimiothérapie, radiothérapie...</li>" +
          "<li><strong>Prise en charge standard (65 %) :</strong> complément mutuelle possible</li>" +
          "<li><strong>Zone couverte :</strong> Paris (75), Hauts-de-Seine (92), Seine-Saint-Denis (93), Val-de-Marne (94), Essonne (91)</li></ul>\n\n"
        : ""
      ) +

      "<h2>Informations pratiques" + (villeVal ? " à " + villeVal : "") + "</h2>\n" +
      "<p>[Accès, localisation, horaires, contact, conseils pratiques. 3-4 phrases.]</p>\n" +
      "<p>[Conseils complémentaires utiles pour le lecteur. 3 phrases.]</p>\n\n" +

      "<h2>Questions fréquentes</h2>\n\n" +
      "<h3>[Question 1 pertinente sur le sujet]</h3>\n" +
      "<p>[Réponse complète. 3-4 phrases.]</p>\n\n" +
      "<h3>[Question 2]</h3>\n" +
      "<p>[Réponse. 3-4 phrases.]</p>\n\n" +
      "<h3>[Question 3]</h3>\n" +
      "<p>[Réponse. 3-4 phrases.]</p>\n\n" +
      "<h3>[Question 4]</h3>\n" +
      "<p>[Réponse. 3-4 phrases.]</p>\n\n" +
      "<h3>[Question 5]</h3>\n" +
      "<p>[Réponse. 3 phrases.]</p>\n\n" +

      "<h2>Conclusion</h2>\n" +
      "<p>[Résumé des points clés. 3-4 phrases. Citer le sujet" + (villeVal ? " et la ville" : "") + ".]</p>\n" +
      "<p>[Appel à l'action adapté au sujet. 3 phrases.]</p>\n\n" +

      "FORMAT DE RETOUR CRITIQUE :\n" +
      "Retourner UNIQUEMENT un objet JSON valide, sans texte avant/après, sans triple backtick, sans markdown.\n" +
      '{"title":"...","slug":"...","excerpt":"...","content":"HTML COMPLET","meta_description":"...","meta_keywords":"..."}';

    // ── USER MESSAGE ───────────────────────────────────────────────────────
    const userLines = [
      "Rédige un article SEO ultra-complet sur le sujet suivant :\n",
      "- Sujet principal : " + sujetPrincipal,
    ];
    if (typeVal !== "general") userLines.push("- Type : " + typeVal);
    if (villeVal) userLines.push("- Ville : " + villeVal);
    if (deptVal) userLines.push("- Département : " + deptVal);
    if (prompt.trim() !== sujetPrincipal) userLines.push("- Détails supplémentaires : " + prompt.trim());

    userLines.push(
      "\nExigences :",
      "1. Article 100% centré sur \"" + localContext + "\" — jamais générique",
      "2. Adapter le contenu, les thématiques et le vocabulaire au type d'article demandé",
      "3. Minimum 8 H2 et minimum 10 H3",
      "4. Minimum 1500 mots dans le champ content",
      "5. FAQ avec 5 questions-réponses détaillées et pertinentes",
      isMedical ? "6. Inclure une section transport médical taxi conventionné CPAM complète" : "6. Adapter la conclusion avec un appel à l'action pertinent",
    );

    const userMessage = userLines.join("\n");

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
        temperature: 0.65,
        max_tokens: 6000,
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
      const cleaned = rawContent
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/```\s*$/i, "")
        .trim();
      article = JSON.parse(cleaned);
    } catch {
      return new Response(
        JSON.stringify({ error: "Impossible de parser la réponse JSON de l'IA", raw: rawContent.slice(0, 500) }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const logLabel = [typeVal, sujetPrincipal, villeVal, deptVal].filter(Boolean).join(" — ");
      await supabase.from("ai_generations").insert({
        prompt: logLabel,
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
