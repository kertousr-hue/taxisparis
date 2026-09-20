# Cartes locales

`localMaps.json` contient les contours SVG des secteurs correspondant aux pages du site. Aucun service cartographique n’est appelé à l’affichage.

Sources consultées le 20 septembre 2026, données ouvertes Etalab :

- Paris : https://geo.api.gouv.fr/communes?codeDepartement=75&type=arrondissement-municipal&format=geojson&geometry=contour
- Essonne : https://geo.api.gouv.fr/departements/91/communes?format=geojson&geometry=contour
- Hauts-de-Seine : https://geo.api.gouv.fr/departements/92/communes?format=geojson&geometry=contour
- Val-de-Marne : https://geo.api.gouv.fr/departements/94/communes?format=geojson&geometry=contour
- Seine-Saint-Denis : https://etalab-datasets.geo.data.gouv.fr/contours-administratifs/2024/geojson/communes-100m.geojson.gz

Le millésime 2024 pour le 93 conserve les deux secteurs Saint-Denis et Pierrefitte-sur-Seine, qui possèdent chacun une page sur le site. La carte représente les secteurs de prise en charge existants.

Projection équirectangulaire locale : longitude × cos(48,85°), latitude inversée. Chaque département est ajusté, sans déformation du rapport d’échelle, dans un cadre SVG de 480 × 340. Son contour est l’union des communes sources ; seuls les secteurs ayant une page sont colorés et cliquables. Les contours sont simplifiés avec une tolérance de 0,45 unité SVG. Les numéros parisiens sont placés sur un point intérieur éloigné des bordures (polylabel). Ailleurs, les points de repère utilisent le centroïde du secteur, ou un point intérieur lorsque le centroïde est hors du contour. Les coordonnées sont arrondies au dixième.
