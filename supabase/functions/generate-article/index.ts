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

    const etablissement = nomEtablissement?.trim() || prompt.trim();
    const villeVal = ville?.trim() || "Île-de-France";
    const deptVal = departement?.trim() || "";
    const typeVal = typeArticle?.trim() || "hopital";

    const localContext = deptVal
      ? `${etablissement}, situé à ${villeVal} (${deptVal})`
      : `${etablissement}, situé à ${villeVal}`;

    const systemPrompt = "Tu es un rédacteur SEO expert spécialisé dans le secteur médical et le transport sanitaire en France. " +
      "Tu rédiges des articles de blog longs, ultra-détaillés, professionnels et optimisés pour le référencement naturel Google. " +
      "Ton contenu cible les patients d'Île-de-France qui cherchent un taxi conventionné CPAM.\n\n" +

      "RÈGLES ABSOLUES — NE PAS ENFREINDRE :\n" +
      "1. JAMAIS de Markdown (pas de **, pas de ##, pas de *, pas de triple backtick)\n" +
      "2. JAMAIS de texte brut — uniquement du HTML structuré\n" +
      "3. JAMAIS mentionner l'IA, ChatGPT, intelligence artificielle ou tout outil automatisé\n" +
      "4. JAMAIS utiliser les balises : em, div, span, section, article, br, table\n" +
      "5. Balises HTML autorisées UNIQUEMENT : h1, h2, h3, p, ul, ol, li, strong\n" +
      "6. Longueur : MINIMUM 1500 mots — MAXIMUM 2500 mots réels dans le champ content\n" +
      "7. MINIMUM 8 titres H2 dans le corps de l'article\n" +
      "8. MINIMUM 10 titres H3 dans le corps de l'article\n" +
      "9. Chaque paragraphe p doit contenir au minimum 3 phrases complètes et détaillées\n" +
      "10. Citer NATURELLEMENT le nom de l'établissement, la ville, et le département dans le texte pour le référencement local\n" +
      "11. L'article doit être 100% centré sur l'établissement ou le sujet demandé — JAMAIS générique\n" +
      "12. Rédiger en français professionnel, informatif et rassurant\n\n" +

      "STRUCTURE HTML OBLIGATOIRE DU CHAMP content :\n\n" +
      "<h1>[Nom établissement] à [Ville] : Guide Complet pour les Patients</h1>\n\n" +
      "<p>[Introduction 1 : présentation de l'établissement, son importance dans le territoire, sa spécialisation principale. 4 phrases minimum. Citer le nom, la ville, le département.]</p>\n" +
      "<p>[Introduction 2 : ce que le lecteur va trouver dans l'article, l'intérêt pour les patients, le lien avec le transport médical CPAM. 3 phrases minimum.]</p>\n\n" +
      "<h2>Présentation de [Nom établissement] à [Ville]</h2>\n" +
      "<p>[Historique détaillé : fondation, évolution, statut juridique (CHU/CHR/privé/ESPIC), capacité d'accueil (nombre de lits), surface, personnel médical et soignant. 4-5 phrases.]</p>\n" +
      "<p>[Rayonnement et certifications : accréditations HAS, labels de qualité, distinctions nationales ou régionales, partenariats universitaires ou de recherche. 3-4 phrases.]</p>\n\n" +
      "<h2>Les spécialités médicales de [Nom établissement]</h2>\n" +
      "<p>[Présentation globale des pôles médicaux et chirurgicaux. 2-3 phrases d'introduction.]</p>\n\n" +
      "<h3>[Spécialité 1 — propre à l'établissement]</h3>\n" +
      "<p>[Description détaillée : pathologies prises en charge, niveau d'expertise, équipe médicale, techniques utilisées. 3-4 phrases.]</p>\n" +
      "<ul><li><strong>Pathologies traitées :</strong> [liste précise]</li><li><strong>Examens et diagnostics :</strong> [liste précise]</li><li><strong>Traitements et interventions :</strong> [liste précise]</li></ul>\n\n" +
      "<h3>[Spécialité 2]</h3>\n" +
      "<p>[Même structure. 3-4 phrases.]</p>\n" +
      "<ul><li>...</li></ul>\n\n" +
      "<h3>[Spécialité 3]</h3>\n" +
      "<p>[Même structure.]</p>\n" +
      "<ul><li>...</li></ul>\n\n" +
      "<h3>[Spécialité 4]</h3>\n" +
      "<p>[Même structure.]</p>\n" +
      "<ul><li>...</li></ul>\n\n" +
      "<h3>[Spécialité 5]</h3>\n" +
      "<p>[Même structure.]</p>\n" +
      "<ul><li>...</li></ul>\n\n" +
      "<h2>Les examens et actes médicaux réalisés</h2>\n" +
      "<p>[Détailler les examens d'imagerie, de biologie, d'endoscopie, de chirurgie disponibles. 3-4 phrases.]</p>\n" +
      "<ul><li><strong>Imagerie médicale :</strong> [IRM, scanner, échographie, radiologie...]</li><li><strong>Explorations fonctionnelles :</strong> [...]</li><li><strong>Actes chirurgicaux :</strong> [...]</li><li><strong>Examens biologiques :</strong> [...]</li></ul>\n\n" +
      "<h2>Hospitalisation et prise en charge des patients</h2>\n" +
      "<p>[Expliquer les différentes modalités d'hospitalisation disponibles dans l'établissement. 3 phrases.]</p>\n" +
      "<p>[Décrire les unités de soins, les chambres individuelles ou partagées, les services d'accompagnement (assistante sociale, psychologue, diététicien). 3 phrases.]</p>\n" +
      "<ul><li><strong>Hospitalisation conventionnelle :</strong> [détails et durées]</li><li><strong>Hospitalisation de jour (HDJ) :</strong> [détails]</li><li><strong>Chirurgie ambulatoire :</strong> [détails]</li><li><strong>Soins intensifs et réanimation :</strong> [si applicable]</li></ul>\n\n" +
      "<h2>Consultations spécialisées et urgences</h2>\n" +
      "<p>[Expliquer le fonctionnement des consultations : prise de rendez-vous, délais d'attente habituels, médecin traitant requis ou non, accès direct aux spécialistes. 3-4 phrases.]</p>\n" +
      "<p>[Préciser les urgences disponibles, les horaires, les conditions d'admission. 3 phrases.]</p>\n\n" +
      "<h2>Transport médical en taxi conventionné CPAM depuis [Ville]</h2>\n" +
      "<p>[Définir le taxi conventionné / VSL : véhicule agréé CPAM, différence avec taxi classique, rôle dans le parcours de soins. 3-4 phrases. Citer la ville et le département.]</p>\n" +
      "<p>[Détailler les conditions de remboursement : prescription médicale obligatoire, taux 100% pour ALD, 65% en standard avec complément mutuelle, bon de transport signé par le médecin. 3-4 phrases avec exemples concrets pour les patients de la zone.]</p>\n" +
      "<p>[Présenter le service Taxis Paris Conventionnés : couverture géographique complète en Île-de-France, disponibilité 24h/24 et 7j/7, réservation simple, véhicules adaptés PMR. 3 phrases.]</p>\n" +
      "<ul><li><strong>Prescription médicale :</strong> à demander au médecin traitant ou spécialiste avant le transport</li><li><strong>Prise en charge ALD (100 %) :</strong> maladies longue durée, chimiothérapie, dialyse, radiothérapie</li><li><strong>Prise en charge standard (65 %) :</strong> complément pris en charge par la mutuelle dans la plupart des cas</li><li><strong>Réservation :</strong> téléphone ou formulaire en ligne, disponible 24h/24 et 7j/7</li><li><strong>Zone couverte :</strong> Paris (75), Hauts-de-Seine (92), Seine-Saint-Denis (93), Val-de-Marne (94), Essonne (91)</li></ul>\n\n" +
      "<h2>Comment réserver un taxi conventionné pour [Nom établissement] ?</h2>\n" +
      "<p>[Expliquer étape par étape comment un patient obtient et utilise un bon de transport pour se rendre à l'établissement depuis [Ville] ou le département. 4-5 phrases très pratiques.]</p>\n" +
      "<ol><li><strong>Obtenir la prescription :</strong> demander à votre médecin un bon de transport avant le rendez-vous</li><li><strong>Contacter Taxis Paris Conventionnés :</strong> par téléphone ou via le formulaire en ligne</li><li><strong>Indiquer votre destination :</strong> [Nom établissement], [Ville]</li><li><strong>Présenter le bon au chauffeur :</strong> le jour du transport</li><li><strong>Envoyer le volet à la CPAM :</strong> pour obtenir le remboursement</li></ol>\n\n" +
      "<h2>Accès et informations pratiques</h2>\n" +
      "<p>[Indiquer adresse complète si connue, transports en commun (lignes de métro, RER, bus), parking, accès personnes à mobilité réduite. 3-4 phrases. Citer la ville et le département.]</p>\n" +
      "<p>[Horaires des consultations, des urgences, du standard téléphonique, site internet officiel. Conseils pratiques pour les patients (documents à apporter, anticipation des délais). 3 phrases.]</p>\n\n" +
      "<h2>Questions fréquentes sur [Nom établissement] et le transport médical</h2>\n\n" +
      "<h3>Quelle est la spécialité principale de [Nom établissement] ?</h3>\n" +
      "<p>[Réponse complète et précise sur les spécialités phares, 3-4 phrases détaillées.]</p>\n\n" +
      "<h3>Comment obtenir un bon de transport pour aller à [Nom établissement] ?</h3>\n" +
      "<p>[Réponse étape par étape, 3-4 phrases pratiques et actionnables.]</p>\n\n" +
      "<h3>Le taxi conventionné est-il remboursé pour toutes les consultations à [Nom établissement] ?</h3>\n" +
      "<p>[Réponse nuancée : conditions exactes de remboursement selon le type de soin, 3-4 phrases claires.]</p>\n\n" +
      "<h3>Peut-on accéder à [Nom établissement] depuis n'importe quelle ville d'Île-de-France ?</h3>\n" +
      "<p>[Réponse rassurante sur la couverture géographique et les possibilités de transport, 3 phrases.]</p>\n\n" +
      "<h3>Combien de temps à l'avance faut-il réserver un taxi conventionné ?</h3>\n" +
      "<p>[Conseils pratiques sur les délais de réservation recommandés, 3 phrases.]</p>\n\n" +
      "<h2>Conclusion</h2>\n" +
      "<p>[Résumé des points clés : importance de l'établissement dans la région, qualité des soins, richesse des spécialités. Rappel du rôle du transport médical adapté pour faciliter l'accès aux soins. 3-4 phrases. Citer le nom, la ville et le département.]</p>\n" +
      "<p>[Appel à l'action fort : inviter le lecteur à contacter Taxis Paris Conventionnés dès maintenant pour planifier son transport médical remboursé CPAM vers [Nom établissement]. Mentionner la disponibilité 24h/24, 7j/7, le confort, et la simplicité de la réservation. 3 phrases.]</p>\n\n" +
      "FORMAT DE RETOUR CRITIQUE :\n" +
      "Retourner UNIQUEMENT un objet JSON valide, sans aucun texte avant ou après, sans triple backtick, sans markdown.\n" +
      "Toutes les propriétés sont des chaînes de caractères. Les guillemets dans le HTML utilisent des apostrophes.\n" +
      '{"title":"...","slug":"...","excerpt":"...","content":"HTML COMPLET","meta_description":"...","meta_keywords":"..."}';

    const userMessage =
      "Rédige un article SEO ultra-complet et ultra-détaillé sur l'établissement suivant :\n\n" +
      "- Type d'article : " + typeVal + "\n" +
      "- Nom de l'établissement : " + etablissement + "\n" +
      "- Ville : " + villeVal + "\n" +
      (deptVal ? "- Département : " + deptVal + "\n" : "") +
      "- Sujet complémentaire : " + prompt.trim() + "\n\n" +
      "L'article doit :\n" +
      "1. Etre 100% centré sur " + localContext + "\n" +
      "2. Citer naturellement '" + etablissement + "', '" + villeVal + "'" + (deptVal ? " et '" + deptVal + "'" : "") + " dans tout l'article pour le SEO local\n" +
      "3. Respecter STRICTEMENT la structure HTML obligatoire définie dans le system prompt\n" +
      "4. Contenir MINIMUM 8 H2 et MINIMUM 10 H3\n" +
      "5. Atteindre MINIMUM 1500 mots dans le champ content\n" +
      "6. Inclure une FAQ SEO avec 5 questions-réponses détaillées\n" +
      "7. Inclure une section transport médical taxi conventionné CPAM complète\n" +
      "8. Détailler chaque spécialité médicale avec pathologies, examens et traitements";

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
      await supabase.from("ai_generations").insert({
        prompt: `[${typeVal}] ${etablissement} — ${villeVal}${deptVal ? " (" + deptVal + ")" : ""}`,
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
