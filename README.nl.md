[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)

# Restaurant-Menu-Configuration-Modifier-Pricing-Toolkit
## Excel Decision-Support Toolkit for Restaurant Menu Configuration, Modifier Pricing & POS Menu Governance

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-success)
![Tool](https://img.shields.io/badge/Tool-Menu%20Configuration%20%26%20Decision%20Support-orange)

**Bouw en onderhoud één enkele bron van waarheid voor restaurantmenu's, modifierprijzen en POS-configuratie — direct in een browser of Excel-werkmap, zonder installatie, zonder registratie en zonder handmatige prijsberekeningen.**

**Geen registratie. Geen installatie. Gratis in uw browser.**

Probeer de browserversie gratis. Als u de Excel-versie nodig hebt, kunt u deze kopen met een 30-daagse geld-terug-garantie zonder vragen.
>
> 🌐 **Openen in browser** → [Browserversie (HTML live demo)](https://hyvoid.github.io/Restaurant-Menu-Configuration-Modifier-Pricing-Toolkit/)
>
> 📥 **Excel downloaden**
>
> Excel-werkmap (Nieuwste release / [Website](https://www.theseusworkshop.com/))

---

## Wat dit u helpt bij te houden

- Een complete menuhiërarchie over categorieën, producten, maten en modifiergroepen vanuit één consistente bron.
- Basisprijzen, modifierprijzen, half-en-half-prijzen en extra-portiontoeslagen zonder tegenstrijdige prijstabellen.
- Standaardingrediënten versus door de klant toegevoegde modifiers om accidentele overbelasting te voorkomen.
- Menuconfiguraties die klaar zijn voor POS-import in plaats van handmatig herbouwde prijstabellen.
- Ontbrekende prijzen, gebroken relaties en configuratiefouten voordat menu-updates de klanten bereiken.
- End-to-end prijsvalidatie met realistische ordersimulaties in plaats van het controleren van honderden afzonderlijke menucombinaties.

---

## Snelle startworkflow

1. **Configureer de prijsparameters van het restaurant eenmaal**

   Open het werkblad **System Parameters** en definieer de operationele regels die zelden veranderen, zoals half-pizza-prijsfactoren, extra-topping-vermenigvuldigers, btw-tarief, standaardvaluta of ander prijsbeleid. Deze waarden vormen de basis voor elke daaropvolgende berekening en kunnen centraal worden aangepast zonder formules te bewerken.

2. **Importeer of onderhoud bestaande menugegevens**

   Vul de aangewezen hoofdbladen met bestaande menu-informatie. Categorieën, menu-items, maten, toppings, modifiergroepen en prijzen kunnen direct uit een bestaande spreadsheet worden gekopieerd of vanuit een POS-platform worden geëxporteerd. Geen herstructurering of handmatige herberekening nodig omdat elk werkblad een specifiek zakelijk doel volgt.

3. **Bekijk de resultaten onmiddellijk**

   Schakel naar het Dashboard- of Order Test-werkblad om automatisch gegenereerde prijzen, relatievalidatie, menu-integriteitscontroles en complete klantorderberekeningen te bekijken. Wijzigingen in de hoofdgegevens verspreiden zich door de hele werkmap zonder rapporten te herbouwen.

4. **Vernieuw wanneer het menu verandert**

   Nieuwe menu-items, seizoensacties, prijswijzigingen of modifierupdates vereisen alleen wijzigingen in de relevante invoertabellen. Bestaande berekeningen, validatielogica, dashboards en POS-exportstructuren blijven automatisch werken zonder herconfiguratie.

**Stel een paar belangrijkste parameters in. Voeg bestaande menugegevens toe. Bekijk de analyse. Vernieuw wanneer het menu verandert.**

---

## Waarom ik dit heb gebouwd

Restaurantmenubeheer lijkt eenvoudig totdat het menu verder groeit dan een handvol producten.

Een typisch pizzeria kan meerdere maten bieden, tientallen toppings, speciale pizza's met standaardingrediënten, half-en-half-aanpassing, premium modifiers, extra porties en verschillende prijsregels afhankelijk van waar een topping wordt toegepast. Afzonderlijk lijkt elke regel beheersbaar. Samen creëren ze honderden — of zelfs duizenden — mogelijke prijscombinaties.

Veel restaurants onderhouden deze relaties nog steeds handmatig in aparte spreadsheets, POS-backoffices en online bestelplatforms. Uiteindelijk drijven die kopieën uit elkaar. Prijzen komen niet meer overeen. Standaardingrediënten worden twee keer in rekening gebracht. Half-pizza-prijzen worden inconsistent. Personeel besteedt uren aan het verifiëren van afzonderlijke combinaties in plaats van het menu zelf te verbeteren.

Ik heb deze werkmap gebouwd als een herbruikbaar operationeel kader in plaats van nog een prijsspreadsheet.

In plaats van elke mogelijke menucombinatie handmatig te controleren, modelleert de werkmap de relaties achter het menu zelf. Modifieregels, standaardingrediënten, prijslogica en validatie worden gestructureerde gegevens in plaats van verborgen aannames.

Bijvoorbeeld: voordat ik dit kader gebruikte, vereiste het toevoegen van een premium topping aan slechts de helft van een speciale pizza vaak handmatige verificatie of de topping al standaard was inbegrepen en of alleen de incrementele toeslag van toepassing was. Nadat de prijsengine eenmaal is geconfigureerd, wordt hetzelfde scenario elke keer consistent berekend met de onderliggende bedrijfsregels in plaats van het menselijk geheugen.

Het resultaat is niet alleen sneller onderhoud — het is een herhaalbaar beslissingsondersteunend systeem dat prijsfouten vermindert voordat klanten überhaupt een bestelling plaatsen.

---

## Veelvoorkomende problemen met restaurantmenu's die dit oplost

| Probleem | Zonder deze tool | Met deze tool |
|----------|------------------|----------------|
| Modifierprijzen worden inconsistent tussen menumaten | Meerdere prijstabellen divergeren geleidelijk, wat klantgeschillen en handmatige correcties veroorzaakt. | Modifierprijzen worden gegenereerd uit gecentraliseerde prijsregels en gedeelde parameters. |
| Standaardingrediënten worden per ongeluk twee keer in rekening gebracht | Speciale pizza's vereisen dat personeel onthoudt welke toppings al zijn inbegrepen. | Standaardmodifiers worden automatisch herkend, zodat alleen geldige incrementele toeslagen worden toegepast. |
| Menu-updates vereisen het bewerken van veel werkbladen | Elke prijswijziging moet in meerdere losgekoppelde tabellen worden gekopieerd. | Kernprijzen worden eenmaal onderhouden en stromen automatisch door alle afhankelijke berekeningen. |
| POS-imports bevatten onvolledige prijsrelaties | Ontbrekende matchings van modifiers veroorzaken fouten na het uitrollen van het menu. | Relaties worden vóór export gevalideerd, wat configuratiefouten vermindert. |
| Handmatig testen mist prijsrandsituaties | Personeel controleert vanwege tijdsdruk slechts een kleine steekproef van menucombinaties. | Het ordersimulatiewerkblad reproduceert realistische klantbestellingen voor volledige prijsvalidatie. |
| Configuratiefouten blijven verborgen totdat klanten ze melden | Gebroken relaties worden vaak pas ontdekt nadat menu's live zijn gegaan. | Dashboardvalidatie licht ontbrekende prijzen, wees-modifiers en onvolledige menustructuren uit vóór het uitrollen. |

---

## Voor wie dit is

Deze werkmap is ontworpen voor restauranteigenaren, menubeheerders, franchise-exploitanten, POS-implementatieconsultants, horeca-analisten en operationele teams die verantwoordelijk zijn voor het onderhouden van complexe restaurantmenu's met configureerbare producten en modifierprijzen.

Het is bijzonder waardevol voor bedrijven die speciale pizza's, aanpasbare maaltijden, meerdere productmaten, premium add-ons en POS-integraties beheren waarbij prijsconsistentie kritiek is.

Het is **niet** bedoeld om een enterprise POS-platform of restaurant-ERP-systeem te vervangen. Het biedt in plaats daarvan een gestructureerde beslissingsondersteuningslaag voor het organiseren van menulogica, het valideren van prijsregels en het voorbereiden van betrouwbare menugegevens vóór uitrol.

Er is geen spreadsheetexpertise nodig. Open de browserversie voor snelle toegang of gebruik de Excel-werkmap voor volledig menuonderhoud en doorlopend beheer.

---

## Over

Ik bouw lichtgewicht Excel- en browsergebaseerde beslissingsondersteunende tools voor operationele problemen die moeilijk worden zodra te veel bewegende delen tegelijk moeten worden beheerd.

In plaats van bestaande bedrijfssystemen te vervangen, organiseren deze tools de informatie die nodig is om de volgende operationele beslissing met vertrouwen te nemen. **Restaurant Menu Master Workbook** is een voorbeeld van die aanpak: het transformeert complexe menurelaties in een herbruikbaar kader dat gemakkelijker te onderhouden, verifiëren en verbeteren is in de loop van de tijd.
## Technische details

<details>
<summary><strong>Voor technische beoordelaars, Excel-beoefenaars en medewerkers</strong></summary>

---

## Werkmaparchitectuur

De werkmap volgt een gelaagde architectuur die hoofdgegevens, prijslogica, relatiebeheer, validatie, simulatie en export scheidt. Elk werkblad heeft één enkele verantwoordelijkheid, waardoor menu-updates mogelijk zijn zonder downstream-berekeningen te herbouwen.

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

| Laag | Werkbladen | Doel |
|---------|------------|---------|
| Globale parameters | Sys_Params | Centrale prijvermenigvuldigers, belastingtarieven, valuta en berekeningsconstanten |
| Hoofdgegevens | Categorieën, Subcategorieën, Items, Maten, Modifiergroepen, Modifiers | Onderhoud herbruikbare menu-entiteiten |
| Relatielaag | Group Assignment, Default Modifiers, Selection Rules | Definieer hoe menu-items met modifiers interageren |
| Prijslaag | Modifier Pricing | Genereer modifierprijzen automatisch met gecentraliseerde regels |
| Validatielaag | Dashboard, Order Test | Detecteer configuratieproblemen en valideer prijsresultaten |
| Uitvoerlaag | POS Export | Produceer afgevlakte structuren geschikt voor POS-import |

### Gegevensstroom

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

Elke berekening is afhankelijk van gestructureerde hoofdgegevens in plaats van gedupliceerde prijstabellen, wat onderhoudsinspanning vermindert en consistentie verbetert.

---

## Drie valkuilen die zelfs ervaren restaurantexploitanten vangen

### Valkuil 1 — Klanten twee keer factureren voor standaardingrediënten

Er wordt een prijsbeslissing genomen voor een speciale pizza.

De exploitant veronderstelt dat het toevoegen van Pepperoni altijd een modifiertoeslag moet genereren.

De geselecteerde pizza bevat echter al Pepperoni als standaardingrediënt.

Het resultaat is een onnodige extra toeslag die klanten onmiddellijk opmerken.

| Incorrecte logica | Correcte logica |
|-----------------|---------------|
| Elke geselecteerde modifier genereert omzet. | Bepaal of de modifier al tot het standaardrecept van het product behoort voordat u in rekening brengt. |

Zonder identificatie van standaardingrediënten worden menuprijzen inconsistent tussen speciale pizza's en zelf-samenstellen-producten.

De werkmap controleert eerst de **Default_Modifiers**-relatie. Als de topping al is inbegrepen, genereren alleen incrementele upgrades zoals **Extra** of **Double** porties extra omzet.

De aanbeveling verandert van:

```text
Normal Pepperoni
Charge: $2.49
```

naar

```text
Normal Pepperoni
Already Included
Charge: $0.00
```

<details>
<summary>Formulelogica</summary>

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

### Valkuil 2 — De prijs van een halve pizza wordt inconsistent

Het restaurant introduceert linkerhelft- en rechterhelft-topplings.

Het personeel schat handmatig dat "half" ongeveer de halve prijs zou moeten zijn.

Maanden later gebruiken verschillende modifiers verschillende aannames.

Sommige brengen 50% in rekening.

Sommige brengen 60% in rekening.

Anderen waren volledig vergeten.

Prijzen worden inconsistent tussen identieke producten.

| Incorrecte logica | Correcte logica |
|-----------------|---------------|
| Sla halfprijzen apart op. | Bereken de halfprijs van één globale parameter. |

De werkmap slaat alleen de volledige modifierprijs op.

Halfprijzen worden automatisch gegenereerd met een gecentraliseerde vermenigvuldiger.

Het bijwerken van één parameter werkt onmiddellijk elke getroffen modifier bij.

Voorbeeld:

```text
Whole Pepperoni
$2.40
```

wordt

```text
Half Pricing Factor
0.50

Left Half
$1.20

Right Half
$1.20
```

in plaats van handmatig honderden dubbele waarden te onderhouden.

<details>
<summary>Formulelogica</summary>

```excel
Final Price =
Base Price *
Half Factor *
Portion Multiplier
```

</details>

---

### Valkuil 3 — Menu-updates breken POS-imports

Een restaurant lanceert verschillende seizoensmenu-items.

Er worden nieuwe modifiers toegevoegd.

Eén modifiergroep wordt tijdens het matchen vergeten.

Het menu lijkt compleet in Excel maar faalt na import in het POS-systeem.

Het onderliggende probleem is niet de prijzen.

Het is relatie-integriteit.

| Incorrecte logica | Correcte logica |
|-----------------|---------------|
| Controleer alleen prijzen. | Controleer zowel prijzen als relaties vóór export. |

De werkmap valideert:

- wees-modifiergroepen
- ontbrekende itemmaten
- onvolledige categoriematchings
- ontbrekende prijsregels
- ongeldige modifierverwijzingen

Het dashboard legt deze problemen bloot vóór export in plaats van na uitrol.

<details>
<summary>Formulelogica</summary>

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

## Voorbeeldscenario

Een pizzeria introduceert een nieuwe **BBQ Chicken Pizza** verkrijgbaar in de maten Small, Medium en Large.

Het product bevat:

- BBQ-saus
- Kip
- Mozzarella
- Rode ui

Een klant plaatst de volgende bestelling:

| Item | Selectie |
|------|-----------|
| Product | BBQ Chicken Pizza |
| Maat | Large |
| Standaard kip | Behouden |
| Pepperoni | Extra toevoegen |
| Champignons | Linkerhelft |
| BBQ-saus | Normaal |

De prijsengine voert de volgende reeks uit.

1. Haal de basisprijs van de Large-pizza op.
2. Identificeer kip en BBQ-saus als standaardingrediënten.
3. Breng geen toeslag aan voor ongewijzigde standaardwaarden.
4. Haal de modifierprijs voor Pepperoni op.
5. Pas de Extra-vermenigvuldiger toe.
6. Haal de prijs van champignons op.
7. Pas de half-pizza-vermenigvuldiger toe.
8. Tel elk onderdeel op tot de uiteindelijke orderprijs.

Voorbeeldberekening:

| Onderdeel | Bedrag |
|-----------|--------|
| Grote pizza | $18.99 |
| Pepperoni (Extra) | $5.24 |
| Champignons (Linkerhelft) | $0.88 |
| Standaardingrediënten | $0.00 |
| **Totaal** | **$25.11** |

Operationeel gezien is het restaurant niet langer afhankelijk van personeel dat prijsuitzonderingen onthoudt.

Elke klantbestelling volgt identieke prijslogica, ongeacht wie het menu onderhoudt.

---

## Formuliereferentie

<details>
<summary>Zoekopdrachten in hoofdgegevens</summary>

| Functie | Doel |
|----------|---------|
| XLOOKUP | Haal itemnamen, categorieën, namen van modifiers en basisprijzen op |
| MATCH | Valideer het bestaan van relaties |
| IFERROR | Geef veilige standaardwaarden terug wanneer verwijzingen ontbreken |

Voorbeeld:

```excel
=XLOOKUP(
 Item_ID,
 tbl_Items[Item_ID],
 tbl_Items[Item_Name]
)
```

</details>

<details>
<summary>Prijsengine</summary>

| Functie | Doel |
|----------|---------|
| SWITCH | Selecteer maatspecifieke prijzen |
| LET | Vereenvoudig complexe prijslogica |
| IF | Pas prijsvoorwaarden toe |
| XLOOKUP | Haal prijsrecords op |

Voorbeeld:

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
<summary>Validatie & dashboard</summary>

| Functie | Doel |
|----------|---------|
| FILTER | Toon onvolledige records |
| COUNTA | KPI-totalen |
| ROWS | Tel gegenereerde prijsregels |
| MATCH | Relatievalidatie |

Voorbeeld:

```excel
FILTER(
 tbl_Items[Item_Name],
 ISNA(MATCH(...))
)
```

</details>

---

## Validatieregels

| Veld | Validatieregel | Foutgedrag |
|-------|-----------------|----------------|
| Category_ID | Moet bestaan in de categorietabel | Categorie geweigerd |
| Subcategory_ID | Moet verwijzen naar een bestaande categorie | Relatiewaarschuwing |
| Item_ID | Unieke identificatie | Dubbelwaarschuwing |
| SKU_ID | Unieke item-maat-combinatie | Duplicaat voorkomen |
| Modifier_ID | Moet bestaan vóór prijsregels | Prijzen niet beschikbaar |
| Modifiergroep | Moet bestaan vóór toewijzing | Dashboardwaarschuwing |
| Portieniveau | Alleen Normal, Light, Extra, Xxtra | Ongeldige selectie |
| Positie | Alleen Whole, Left, Right | Ongeldige prijsregel |
| Halfprijfactor | Positieve decimaal | Globale prijsfout |
| Extra-vermenigvuldiger | Groter dan nul | Modifierprijsfout |
| Standaardmodifier | Moet verwijzen naar geldig Item en Modifier | Dubbele facturering voorkomen |
| POS-export | Alle verplichte matchings compleet | Exportvalidatiefout |

De werkmap valideert waar mogelijk opzettelijk relaties vóór berekeningen. Ontbrekende verwijzingen worden gemeld via dashboardwaarschuwingen in plaats van stille rekenfouten toe te staan.

</details>


---

## Andere tools in deze serie

Deze tools volgen dezelfde filosofie: lichtgewicht, herbruikbare beslissingsondersteunende kaders gebouwd voor terugkerende operationele problemen — geen vervangers van ERP- of enterprise-platforms.

- **Inventory Planning & Purchasing Toolkit** — Breng voorraadinvestering, serviceniveaus en aanvulbeslissingen in evenwicht bij veranderende vraag.
- **Manufacturing Labor Cost & Capacity Planning Toolkit** — Verbind arbeidsbenutting, productieoutput en unitaire productiekosten.
- **Construction Estimate & Cost Tracking Toolkit** — Standaardiseer projectraming, budgetbewaking en voortgangsmonitoring.
- **Retail & Maquila Inventory Ledger** — Volg voorraad van bulkaankoop via contractfabricage tot verkoop van eind-SKU's.
- **Residential Transitional Loan Sizer & Pricer** — Evalueer leningomvang, prijsstelling, hefboomwerking en risico voor overbruggingsleningen.
- **Marketing Budget Allocation Simulator** — Vergelijk campagnescenario's, budgetbenutting en verwachte prestaties over kanalen.

Er worden voortdurend meer operationele beslissingsondersteunende tools aan deze collectie toegevoegd.

---

## Licentie

Dit project is gelicentieerd onder de **Apache License 2.0**.

U bent vrij om:

- De werkmap te gebruiken voor persoonlijke of commerciële doeleinden.
- De werkmap te wijzigen en uit te breiden om aan uw eigen operationele vereisten te voldoen.
- Afgeleide versies te verspreiden in overeenstemming met de Apache License 2.0.

Behoud de originele licentienotitie en naamsvermelding waar de licentie dit vereist.

Voor de volledige licentietekst, zie het bijgevoegde **LICENSE**-bestand in deze repository.

---

## Bijdragen

Suggesties voor het verbeteren van prijslogica, menumodellering, validatieworkflows of POS-compatibiliteit zijn altijd welkom.

Bijdragen kunnen omvatten:

- Ondersteuning voor extra POS-platforms
- Verbeterde validatieregels
- Nieuwe prijsmodellen
- Formuleoptimalisatie
- Documentatieverbeteringen
- Restaurantspecifieke configuratievoorbeelden

Open een Issue of dien een Pull Request in met een duidelijke beschrijving van het operationele probleem dat wordt aangepakt.

---

## Versie

**Huidige release**

- Versie: **v1.0.0**
- Licentie: **Apache License 2.0**
- Platform: **Browser + Microsoft Excel 365 / Excel 2021+**
- Status: **Productieklaar**

---

> Lichtgewicht operationele beslissingsondersteunende tools voor bedrijven die betere beslissingen nodig hebben — niet grotere software.
