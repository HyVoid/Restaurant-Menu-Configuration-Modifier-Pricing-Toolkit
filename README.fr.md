[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)

# Restaurant-Menu-Configuration-Modifier-Pricing-Toolkit
## Excel Decision-Support Toolkit for Restaurant Menu Configuration, Modifier Pricing & POS Menu Governance

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-success)
![Tool](https://img.shields.io/badge/Tool-Menu%20Configuration%20%26%20Decision%20Support-orange)

**Créez et maintenez une source unique de vérité pour les cartes de restaurant, les prix des modificateurs et la configuration POS — directement dans un navigateur ou un classeur Excel, sans installation, sans inscription et sans calcul de prix manuel.**

**Sans inscription. Sans installation. Gratuit dans votre navigateur.**

Essayez gratuitement la version navigateur. Si vous avez besoin de la version Excel, vous pouvez l'acheter avec une garantie de remboursement de 30 jours, sans questions.
>
> 🌐 **Ouvrir dans le navigateur** → [Version navigateur (démo HTML en direct)](https://hyvoid.github.io/Restaurant-Menu-Configuration-Modifier-Pricing-Toolkit/)
>
> 📥 **Télécharger Excel**
>
> Classeur Excel (Dernière version / [Site Web](https://www.theseusworkshop.com/))

---

## Ce que cela vous aide à suivre

- Une hiérarchie de menu complète à travers les catégories, produits, tailles et groupes de modificateurs depuis une seule source cohérente.
- Les prix de base, prix des modificateurs, tarifs moitié-moitié et suppléments de portion supplémentaire sans tableaux de prix conflictuels.
- Les ingrédients par défaut par rapport aux modificateurs ajoutés par le client pour éviter les surcharges accidentelles.
- Des configurations de menu prêtes pour l'import POS au lieu de reconstruire manuellement des tableaux de prix.
- Les prix manquants, relations cassées et erreurs de configuration avant que les mises à jour de menu n'atteignent les clients.
- Une validation de prix de bout en bout grâce à des simulations de commandes réalistes au lieu de vérifier des centaines de combinaisons de menu individuelles.

---

## Flux de travail de démarrage rapide

1. **Configurez une seule fois les paramètres de prix du restaurant**

   Ouvrez la feuille **System Parameters** et définissez les règles opérationnelles qui changent rarement, telles que les facteurs de prix demi-pizza, les multiplicateurs de supplément, le taux de taxe, la devise par défaut ou d'autres politiques de prix. Ces valeurs deviennent la base de chaque calcul ultérieur et peuvent être ajustées de manière centrale sans modifier les formules.

2. **Importez ou maintenez les données de menu existantes**

   Remplissez les feuilles maîtres désignées avec les informations de menu existantes. Les catégories, articles de menu, tailles, garnitures, groupes de modificateurs et prix peuvent être copiés directement depuis une feuille de calcul existante ou exportés depuis une plateforme POS. Aucune restructuration ni recalcul manuel n'est requis car chaque feuille suit un objectif métier dédié.

3. **Examinez les résultats immédiatement**

   Passez à la feuille Dashboard ou Order Test pour examiner les prix générés automatiquement, la validation des relations, les contrôles d'intégrité du menu et les calculs complets de commandes clients. Les modifications apportées aux données maîtres se propagent dans tout le classeur sans reconstruire les rapports.

4. **Actualisez chaque fois que le menu change**

   Les nouveaux articles de menu, promotions saisonnières, ajustements de prix ou mises à jour de modificateurs ne nécessitent que des modifications des tables d'entrée pertinentes. Les calculs existants, la logique de validation, les tableaux de bord et les structures d'export POS continuent de fonctionner automatiquement sans reconfiguration.

**Définissez quelques paramètres clés. Ajoutez les données de menu existantes. Examinez l'analyse. Actualisez chaque fois que le menu change.**

---

## Pourquoi j'ai construit cet outil

La gestion de la carte d'un restaurant semble simple jusqu'à ce que la carte dépasse une poignée de produits.

Un restaurant de pizzas typique peut proposer plusieurs tailles, des dizaines de garnitures, des pizzas spéciales avec ingrédients par défaut, une personnalisation moitié-moitié, des modificateurs premium, des portions supplémentaires et des règles de prix différentes selon l'endroit où une garniture est appliquée. Individuellement, chaque règle semble gérable. Ensemble, elles créent des centaines — voire des milliers — de combinaisons de prix possibles.

Beaucoup de restaurants maintiennent encore ces relations manuellement dans des feuilles de calcul séparées, des back-offices POS et des plateformes de commande en ligne. Finalement, ces copies divergent. Les prix ne correspondent plus. Les ingrédients par défaut sont facturés deux fois. Le prix des demi-pizzas devient incohérent. Le personnel passe des heures à vérifier des combinaisons individuelles au lieu d'améliorer la carte elle-même.

J'ai construit ce classeur comme un cadre opérationnel réutilisable plutôt que comme une feuille de calcul de prix de plus.

Au lieu de vérifier manuellement chaque combinaison de menu possible, le classeur modélise les relations derrière la carte elle-même. Les règles de modificateurs, les ingrédients par défaut, la logique de prix et la validation deviennent des données structurées plutôt que des hypothèses cachées.

Par exemple, avant d'utiliser ce cadre, ajouter une garniture premium à seulement la moitié d'une pizza spéciale exigeait souvent de vérifier manuellement si la garniture était déjà incluse par défaut et si seul le supplément incrémental devait s'appliquer. Une fois le moteur de prix configuré, le même scénario est calculé de manière cohérente à chaque fois en utilisant les règles métier sous-jacentes plutôt que la mémoire humaine.

Le résultat n'est pas simplement une maintenance plus rapide — c'est un système répétable d'aide à la décision qui réduit les erreurs de prix avant même que les clients ne passent commande.

---

## Problèmes courants de cartes de restaurant que cet outil résout

| Problème | Sans cet outil | Avec cet outil |
|----------|------------------|----------------|
| Les prix des modificateurs deviennent incohérents entre les tailles de menu | Plusieurs tableaux de prix divergent progressivement, créant des litiges clients et des corrections manuelles. | Les prix des modificateurs sont générés à partir de règles de prix centralisées et de paramètres partagés. |
| Les ingrédients par défaut sont accidentellement facturés deux fois | Les pizzas spéciales exigent que le personnel se souvienne quelles garnitures sont déjà incluses. | Les modificateurs par défaut sont reconnus automatiquement, seuls les suppléments incrémentaux valides sont appliqués. |
| Les mises à jour de menu exigent de modifier de nombreuses feuilles | Chaque changement de prix doit être copié dans plusieurs tables déconnectées. | Les prix fondamentaux sont maintenus une seule fois et se propagent automatiquement dans les calculs dépendants. |
| Les imports POS contiennent des relations de prix incomplètes | Les correspondances de modificateurs manquantes créent des erreurs après le déploiement du menu. | Les relations sont validées avant l'export, réduisant les échecs de configuration. |
| Les tests manuels manquent des cas limites de prix | Le personnel ne vérifie qu'un petit échantillon de combinaisons en raison du manque de temps. | La feuille de simulation de commandes reproduit des commandes clients réalistes pour une validation complète des prix. |
| Les erreurs de configuration restent cachées jusqu'à ce que les clients les signalent | Les relations cassées ne sont souvent découvertes qu'après la mise en ligne des cartes. | La validation du tableau de bord met en évidence les prix manquants, les modificateurs orphelins et les structures de menu incomplètes avant le déploiement. |

---

## Pour qui c'est

Ce classeur est conçu pour les propriétaires de restaurants, administrateurs de cartes, exploitants de franchises, consultants en implémentation POS, analystes en hôtellerie et équipes opérationnelles chargés de maintenir des cartes de restaurant complexes avec des produits configurables et des prix de modificateurs.

Il est particulièrement précieux pour les entreprises qui gèrent des pizzas spéciales, des repas personnalisables, plusieurs tailles de produits, des suppléments premium et des intégrations POS où la cohérence des prix est critique.

Il n'est **pas** destiné à remplacer une plateforme POS d'entreprise ou un système ERP de restauration. Il fournit plutôt une couche structurée d'aide à la décision pour organiser la logique du menu, valider les règles de prix et préparer des données de menu fiables avant le déploiement.

Aucune expertise en feuilles de calcul n'est requise. Ouvrez la version navigateur pour un accès rapide ou utilisez le classeur Excel pour une gestion complète du menu et une maintenance continue.

---

## À propos

Je construis des outils d'aide à la décision légers en Excel et dans le navigateur pour des problèmes opérationnels qui deviennent difficiles dès que trop de pièces mobiles doivent être gérées simultanément.

Plutôt que de remplacer les systèmes métier existants, ces outils organisent les informations nécessaires pour prendre la prochaine décision opérationnelle en toute confiance. **Restaurant Menu Master Workbook** est un exemple de cette approche, transformant des relations de menu complexes en un cadre réutilisable plus facile à maintenir, vérifier et améliorer au fil du temps.
## Détails techniques

<details>
<summary><strong>Pour les réviseurs techniques, les praticiens Excel et les collaborateurs</strong></summary>

---

## Architecture du classeur

Le classeur suit une architecture en couches qui sépare les données maîtres, la logique de prix, la gestion des relations, la validation, la simulation et l'export. Chaque feuille de calcul a une responsabilité unique, permettant des mises à jour de menu sans reconstruire les calculs en aval.

```text
                 SYSTEM PARAMETERS
                        │
                        ▼
             Sys_Params (Global Rules)
                        │
                        ▼
──────────────────────────────────────────────
        MASTER DATA (Single Source of Truth)
──────────────────────────────────────────────
Menu_Categories
Menu_Subcategories
Menu_Items
Item_Sizes
Modifier_Groups
Modifiers
                        │
                        ▼
──────────────────────────────────────────────
      RELATIONSHIP & PRICING LAYER
──────────────────────────────────────────────
Modifier_Pricing
Default_Modifiers
Group_Assignment
Selection_Rules
                        │
                        ▼
──────────────────────────────────────────────
      VALIDATION & CALCULATION
──────────────────────────────────────────────
Order_Test
Dashboard
                        │
                        ▼
──────────────────────────────────────────────
             OUTPUT
──────────────────────────────────────────────
POS_Export
```

| Couche | Feuilles de calcul | Objectif |
|---------|------------|---------|
| Paramètres globaux | Sys_Params | Multiplicateurs de prix centraux, taux de taxe, devise et constantes de calcul |
| Données maîtres | Catégories, Sous-catégories, Articles, Tailles, Groupes de modificateurs, Modificateurs | Maintenir des entités de menu réutilisables |
| Couche de relations | Group Assignment, Default Modifiers, Selection Rules | Définir comment les articles de menu interagissent avec les modificateurs |
| Couche de prix | Modifier Pricing | Générer automatiquement les prix des modificateurs à partir de règles centralisées |
| Couche de validation | Dashboard, Order Test | Détecter les problèmes de configuration et valider les résultats de prix |
| Couche de sortie | POS Export | Produire des structures à plat adaptées à l'import POS |

### Flux de données

```
Restaurant Menu
        │
        ▼
Master Data Tables
        │
        ▼
Relationship Validation
        │
        ▼
Pricing Engine
        │
        ▼
Order Simulation
        │
        ▼
Integrity Validation
        │
        ▼
POS Export
```

Chaque calcul dépend de données maîtres structurées plutôt que de tableaux de prix dupliqués, réduisant l'effort de maintenance et améliorant la cohérence.

---

## Trois pièges qui attrapent même les exploitants de restaurant expérimentés

### Piège 1 — Facturer deux fois les clients pour des ingrédients par défaut

Une décision de prix est prise pour une pizza spéciale.

L'exploitant suppose que l'ajout de Pepperoni doit toujours générer un supplément de modificateur.

Cependant, la pizza sélectionnée inclut déjà le Pepperoni comme ingrédient par défaut.

Le résultat est un supplément inutile que les clients remarquent immédiatement.

| Logique incorrecte | Logique correcte |
|-----------------|---------------|
| Chaque modificateur sélectionné génère du revenu. | Déterminer si le modificateur appartient déjà à la recette par défaut du produit avant de facturer. |

Sans identification des ingrédients par défaut, les prix du menu deviennent incohérents entre les pizzas spéciales et les produits à composer soi-même.

Le classeur vérifie d'abord la relation **Default_Modifiers**. Si la garniture est déjà incluse, seules les mises à niveau incrémentales telles que les portions **Extra** ou **Double** génèrent un revenu supplémentaire.

La recommandation passe de :

```text
Normal Pepperoni
Charge: $2.49
```

à

```text
Normal Pepperoni
Already Included
Charge: $0.00
```

<details>
<summary>Logique des formules</summary>

```excel
IF(
 Is_Default="Y",
 IF(
   Portion="Normal",
   0,
   ExtraPrice-NormalPrice
 ),
 FullModifierPrice
)
```

</details>

---

### Piège 2 — Le prix de la demi-pizza devient incohérent

Le restaurant introduit des garnitures moitié gauche et moitié droite.

Le personnel estime manuellement que « la moitié » devrait représenter environ la moitié du prix.

Des mois plus tard, différents modificateurs utilisent différentes hypothèses.

Certains facturent 50 %.

Certains facturent 60 %.

D'autres ont été complètement oubliés.

Les prix deviennent incohérents entre produits identiques.

| Logique incorrecte | Logique correcte |
|-----------------|---------------|
| Stocker les prix moitié séparément. | Calculer le prix moitié à partir d'un paramètre global unique. |

Le classeur ne stocke que le prix complet du modificateur.

Le prix moitié est généré automatiquement à l'aide d'un multiplicateur centralisé.

La mise à jour d'un paramètre met immédiatement à jour chaque modificateur concerné.

Exemple :

```text
Whole Pepperoni
$2.40
```

devient

```text
Half Pricing Factor
0.50

Left Half
$1.20

Right Half
$1.20
```

au lieu de maintenir manuellement des centaines de valeurs dupliquées.

<details>
<summary>Logique des formules</summary>

```excel
Final Price =
Base Price *
Half Factor *
Portion Multiplier
```

</details>

---

### Piège 3 — Les mises à jour de menu cassent les imports POS

Un restaurant lance plusieurs articles de menu saisonniers.

De nouveaux modificateurs sont ajoutés.

Un groupe de modificateurs est oublié lors du mappage.

Le menu semble complet dans Excel mais échoue après l'import dans le système POS.

Le problème sous-jacent n'est pas le prix.

C'est l'intégrité des relations.

| Logique incorrecte | Logique correcte |
|-----------------|---------------|
| Vérifier uniquement les prix. | Vérifier à la fois les prix et les relations avant l'export. |

Le classeur valide :

- les groupes de modificateurs orphelins
- les tailles d'articles manquantes
- les mappages de catégories incomplets
- les règles de prix manquantes
- les références de modificateurs invalides

Le tableau de bord expose ces problèmes avant l'export plutôt qu'après le déploiement.

<details>
<summary>Logique des formules</summary>

```excel
FILTER(
 MissingItems,
 ISNA(
   MATCH(...)
 )
)
```

</details>

---

## Exemple de scénario

Un restaurant de pizzas introduit une nouvelle **BBQ Chicken Pizza** disponible en tailles Small, Medium et Large.

Le produit comprend :

- Sauce BBQ
- Poulet
- Mozzarella
- Oignon rouge

Un client passe la commande suivante :

| Article | Sélection |
|------|-----------|
| Produit | BBQ Chicken Pizza |
| Taille | Large |
| Poulet par défaut | Conserver |
| Pepperoni | Ajouter en supplément |
| Champignons | Moitié gauche |
| Sauce BBQ | Normal |

Le moteur de prix effectue la séquence suivante.

1. Récupérer le prix de base de la pizza Large.
2. Identifier le poulet et la sauce BBQ comme ingrédients par défaut.
3. N'appliquer aucun supplément pour les valeurs par défaut inchangées.
4. Récupérer le prix du modificateur Pepperoni.
5. Appliquer le multiplicateur Extra.
6. Récupérer le prix des champignons.
7. Appliquer le multiplicateur demi-pizza.
8. Additionner chaque composant dans le prix final de la commande.

Exemple de calcul :

| Composant | Montant |
|-----------|--------|
| Pizza Large | $18.99 |
| Pepperoni (Supplément) | $5.24 |
| Champignons (Moitié gauche) | $0.88 |
| Ingrédients par défaut | $0.00 |
| **Total** | **$25.11** |

Sur le plan opérationnel, le restaurant ne dépend plus de la mémoire du personnel pour les exceptions de prix.

Chaque commande client suit une logique de prix identique, quel que soit celui qui maintient la carte.

---

## Référence des formules

<details>
<summary>Recherches dans les données maîtres</summary>

| Fonction | Objectif |
|----------|---------|
| XLOOKUP | Récupérer les noms d'articles, catégories, noms de modificateurs et prix de base |
| MATCH | Valider l'existence des relations |
| IFERROR | Renvoyer des valeurs par défaut sûres lorsque des références sont manquantes |

Exemple :

```excel
=XLOOKUP(
 Item_ID,
 tbl_Items[Item_ID],
 tbl_Items[Item_Name]
)
```

</details>

<details>
<summary>Moteur de prix</summary>

| Fonction | Objectif |
|----------|---------|
| SWITCH | Sélectionner les prix spécifiques à la taille |
| LET | Simplifier la logique de prix complexe |
| IF | Appliquer les conditions de prix |
| XLOOKUP | Récupérer les enregistrements de prix |

Exemple :

```excel
LET(
 BasePrice,
 PositionFactor,
 PortionFactor,
 FinalPrice
)
```

</details>

<details>
<summary>Validation & tableau de bord</summary>

| Fonction | Objectif |
|----------|---------|
| FILTER | Afficher les enregistrements incomplets |
| COUNTA | Totaux des KPI |
| ROWS | Compter les règles de prix générées |
| MATCH | Validation des relations |

Exemple :

```excel
FILTER(
 tbl_Items[Item_Name],
 ISNA(MATCH(...))
)
```

</details>

---

## Règles de validation

| Champ | Règle de validation | Comportement en cas d'erreur |
|-------|-----------------|----------------|
| Category_ID | Doit exister dans la table des catégories | Catégorie rejetée |
| Subcategory_ID | Doit référencer une catégorie existante | Avertissement de relation |
| Item_ID | Identifiant unique | Avertissement de doublon |
| SKU_ID | Combinaison article-taille unique | Doublon empêché |
| Modifier_ID | Doit exister avant les règles de prix | Prix indisponible |
| Groupe de modificateurs | Doit exister avant l'affectation | Alerte du tableau de bord |
| Niveau de portion | Normal, Light, Extra, Xxtra uniquement | Sélection invalide |
| Position | Whole, Left, Right uniquement | Règle de prix invalide |
| Facteur de prix moitié | Décimal positif | Erreur de prix globale |
| Multiplicateur Extra | Supérieur à zéro | Erreur de prix du modificateur |
| Modificateur par défaut | Doit référencer un article et un modificateur valides | Double facturation empêchée |
| Export POS | Tous les mappages obligatoires complets | Échec de validation de l'export |

Le classeur valide intentionnellement les relations avant les calculs dans la mesure du possible. Les références manquantes sont signalées par des alertes du tableau de bord au lieu de laisser des échecs de calcul silencieux.

</details>


---

## Autres outils de cette série

Ces outils suivent la même philosophie : des cadres d'aide à la décision légers et réutilisables, construits pour des problèmes opérationnels récurrents — pas des remplaçants d'ERP ou de plateformes d'entreprise.

- **Inventory Planning & Purchasing Toolkit** — Équilibrer l'investissement en stock, les niveaux de service et les décisions de réapprovisionnement face à une demande changeante.
- **Manufacturing Labor Cost & Capacity Planning Toolkit** — Relier l'utilisation de la main-d'œuvre, la production et les coûts de fabrication unitaires.
- **Construction Estimate & Cost Tracking Toolkit** — Standardiser l'estimation de projets, le suivi du budget et le suivi de l'avancement.
- **Retail & Maquila Inventory Ledger** — Suivre le stock de l'achat en vrac à la fabrication sous contrat jusqu'à la vente de SKU finis.
- **Residential Transitional Loan Sizer & Pricer** — Évaluer le dimensionnement, le prix, l'effet de levier et le risque des prêts relais résidentiels.
- **Marketing Budget Allocation Simulator** — Comparer les scénarios de campagne, l'utilisation du budget et les performances attendues entre les canaux.

D'autres outils opérationnels d'aide à la décision sont continuellement ajoutés à cette collection.

---

## Licence

Ce projet est sous licence **Apache License 2.0**.

Vous êtes libre de :

- Utiliser le classeur à des fins personnelles ou commerciales.
- Modifier et étendre le classeur pour répondre à vos propres besoins opérationnels.
- Distribuer des versions dérivées conformément à l'Apache License 2.0.

Veuillez conserver la mention de licence originale et l'attribution lorsque la licence l'exige.

Pour le texte complet de la licence, voir le fichier **LICENSE** accompagnant ce dépôt.

---

## Contribuer

Les suggestions d'amélioration de la logique de prix, de la modélisation du menu, des flux de validation ou de la compatibilité POS sont toujours les bienvenues.

Les contributions peuvent inclure :

- La prise en charge de plateformes POS supplémentaires
- Des règles de validation améliorées
- De nouveaux modèles de prix
- L'optimisation des formules
- Des améliorations de la documentation
- Des exemples de configuration spécifiques aux restaurants

Veuillez ouvrir une Issue ou soumettre une Pull Request avec une description claire du problème opérationnel traité.

---

## Version

**Version actuelle**

- Version : **v1.0.0**
- Licence : **Apache License 2.0**
- Plateforme : **Navigateur + Microsoft Excel 365 / Excel 2021+**
- Statut : **Prêt pour la production**

---

> Des outils opérationnels légers d'aide à la décision pour les entreprises qui ont besoin de meilleures décisions — pas de logiciels plus gros.
