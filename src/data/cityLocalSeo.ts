// Données éditoriales locales pour les pages qui nécessitent une révision prioritaire.
// Ne pas assimiler ces destinations aux établissements les plus proches : l'itinéraire dépend de l'adresse.
export type CitySeoOverride = { hospitals: string[]; nearby: string[]; context: string };
export const citySeoOverrides: Record<string, CitySeoOverride> = {
  "paris-1er": {
    "hospitals": [
      "Hôtel-Dieu (Paris 4e)",
      "Hôpital Cochin (Paris 14e)",
      "Hôpital Pitié-Salpêtrière (Paris 13e)"
    ],
    "nearby": [
      "paris-2eme",
      "paris-4eme",
      "paris-8eme",
      "paris-6eme"
    ],
    "context": "Dans le 1er arrondissement, précisez votre rue et l'accès exact de l'établissement. Les trajets vers l'Hôtel-Dieu ou les autres hôpitaux parisiens sont organisés en tenant compte des contraintes de circulation dans le centre de Paris."
  },
  "orsay": {
    "hospitals": [
      "Hôpital Paris-Saclay (site de Saclay)",
      "Hôpital Bicêtre (Le Kremlin-Bicêtre)",
      "Institut Gustave Roussy (Villejuif)"
    ],
    "nearby": [
      "bures-sur-yvette",
      "palaiseau",
      "gif-sur-yvette",
      "les-ulis"
    ],
    "context": "Au départ d'Orsay, indiquez si le rendez-vous se tient sur le plateau de Saclay ou dans un établissement de Paris ou de la petite couronne. Le point de dépose et le bâtiment de consultation sont à préciser pour préparer le trajet."
  },
  "etampes": {
    "hospitals": [
      "Centre hospitalier Sud Essonne – site d'Étampes",
      "Hôpital Cochin (Paris 14e)",
      "Institut Gustave Roussy (Villejuif)"
    ],
    "nearby": [
      "milly-la-foret",
      "dourdan",
      "arpajon"
    ],
    "context": "À Étampes, un rendez-vous au Centre hospitalier Sud Essonne n'impose pas la même organisation qu'une consultation à Paris. Pour les trajets plus longs, communiquez l'heure du rendez-vous et le service concerné afin de fixer une heure de départ réaliste."
  },
  "dourdan": {
    "hospitals": [
      "Centre hospitalier Sud Essonne – site de Dourdan",
      "Hôpital Bicêtre (Le Kremlin-Bicêtre)",
      "Hôpital Cochin (Paris 14e)"
    ],
    "nearby": [
      "limours",
      "arpajon",
      "etampes"
    ],
    "context": "Depuis Dourdan, les trajets vers le centre hospitalier local et ceux vers les hôpitaux parisiens ont des contraintes différentes. Il est utile de confirmer le service, l'entrée de l'établissement et la durée estimée avant de valider l'aller-retour."
  },
  "vigneux-sur-seine": {
    "hospitals": [
      "Centre hospitalier intercommunal de Villeneuve-Saint-Georges",
      "Hôpital Dupuytren (Draveil)",
      "Hôpital Bicêtre (Le Kremlin-Bicêtre)"
    ],
    "nearby": [
      "draveil",
      "montgeron",
      "juvisy-sur-orge"
    ],
    "context": "À Vigneux-sur-Seine, les destinations possibles comprennent notamment Villeneuve-Saint-Georges et Draveil. Pour un examen ou une sortie d'hospitalisation, renseignez l'entrée du service et les conditions du trajet retour."
  },
  "le-bourget": {
    "hospitals": [
      "Hôpital Avicenne (Bobigny)",
      "Centre hospitalier de Saint-Denis – site Delafontaine",
      "Hôpital Bichat (Paris 18e)"
    ],
    "nearby": [
      "dugny",
      "drancy",
      "le-blanc-mesnil",
      "la-courneuve"
    ],
    "context": "Au Bourget, les trajets peuvent notamment être organisés vers l'hôpital Avicenne à Bobigny ou Delafontaine à Saint-Denis. La destination précise et l'heure de convocation permettent de préparer le départ."
  },
  "pantin": {
    "hospitals": [
      "Hôpital Avicenne (Bobigny)",
      "Hôpital Robert-Debré (Paris 19e)",
      "Hôpital Lariboisière (Paris 10e)"
    ],
    "nearby": [
      "aubervilliers",
      "bobigny",
      "le-pre-saint-gervais",
      "bondy"
    ],
    "context": "À Pantin, la destination peut se situer en Seine-Saint-Denis ou à Paris, par exemple vers Avicenne à Bobigny ou Robert-Debré dans le 19e. Pensez à indiquer le pavillon ou le service de consultation."
  },
  "champigny-sur-marne": {
    "hospitals": [
      "Hôpital Saint-Camille (Bry-sur-Marne)",
      "Hôpital Henri-Mondor (Créteil)",
      "Hôpital Saint-Antoine (Paris 12e)"
    ],
    "nearby": [
      "bry-sur-marne",
      "joinville-le-pont",
      "saint-maur-des-fosses"
    ],
    "context": "Depuis Champigny-sur-Marne, les rendez-vous à Saint-Camille, à Bry-sur-Marne, ou à Henri-Mondor, à Créteil, ne suivent pas le même trajet. Le nom exact du bâtiment et l'horaire de convocation facilitent l'organisation."
  },
  "l-hay-les-roses": {
    "hospitals": [
      "Institut Gustave Roussy (Villejuif)",
      "Hôpital Paul-Brousse (Villejuif)",
      "Hôpital Bicêtre (Le Kremlin-Bicêtre)"
    ],
    "nearby": [
      "cachan",
      "villejuif",
      "fresnes",
      "chevilly-larue"
    ],
    "context": "À L'Haÿ-les-Roses, les patients peuvent avoir des rendez-vous vers Villejuif, notamment à Gustave Roussy ou Paul-Brousse. Pour les soins réguliers, communiquez les jours, le service et les heures de convocation lors de la réservation."
  },
  "limeil-brevannes": {
    "hospitals": [
      "Hôpital Émile-Roux (Limeil-Brévannes)",
      "Hôpital Henri-Mondor (Créteil)",
      "Centre hospitalier intercommunal de Villeneuve-Saint-Georges"
    ],
    "nearby": [
      "boissy-saint-leger",
      "valenton",
      "sucy-en-brie",
      "villeneuve-saint-georges"
    ],
    "context": "À Limeil-Brévannes, l'hôpital Émile-Roux constitue une destination située dans la commune. Pour un rendez-vous à Henri-Mondor à Créteil ou dans un autre établissement, la prise en charge se prépare selon le service et l'heure d'arrivée demandée."
  },
  "noiseau": {
    "hospitals": [
      "Hôpital Henri-Mondor (Créteil)",
      "Hôpital Saint-Camille (Bry-sur-Marne)",
      "Hôpital Paul-Brousse (Villejuif)"
    ],
    "nearby": [
      "sucy-en-brie",
      "ormesson-sur-marne",
      "la-queue-en-brie"
    ],
    "context": "Depuis Noiseau, un trajet médical peut notamment être prévu vers Henri-Mondor à Créteil ou Saint-Camille à Bry-sur-Marne. Lors de votre demande, indiquez la rue de départ, le service hospitalier et l'heure de convocation."
  },
  "saint-maurice": {
    "hospitals": [
      "Hôpitaux de Saint-Maurice",
      "Hôpital Saint-Antoine (Paris 12e)",
      "Hôpital Henri-Mondor (Créteil)"
    ],
    "nearby": [
      "charenton-le-pont",
      "maisons-alfort",
      "joinville-le-pont"
    ],
    "context": "À Saint-Maurice, les Hôpitaux de Saint-Maurice font partie des destinations à identifier précisément. Pour un autre établissement, notamment à Paris ou à Créteil, indiquez le service, l'accès et les contraintes d'horaire."
  }
};
