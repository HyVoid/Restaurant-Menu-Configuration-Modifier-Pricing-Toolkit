[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)

# Restaurant-Menu-Configuration-Modifier-Pricing-Toolkit

## Excel Decision-Support Toolkit for Restaurant Menu Configuration, Modifier Pricing & POS Menu Governance

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-success)
![Tool](https://img.shields.io/badge/Tool-Menu%20Configuration%20%26%20Decision%20Support-orange)

**Build and maintain a single source of truth for restaurant menus, modifier pricing, and POS configuration—directly in a browser or Excel workbook, with no installation, no signup, and no manual pricing calculations.**

**No signup. No installation. Free in your browser.**

Testen Sie die Browser-Version kostenlos. Wenn Sie die Excel-Version benötigen, können Sie sie mit einer 30-tägigen, unkomplizierten Geld-zurück-Garantie erwerben.
>
> 🌐 **Im Browser öffnen** → [Browser-Version (Live-Demo als HTML)](https://hyvoid.github.io/Restaurant-Menu-Configuration-Modifier-Pricing-Toolkit/)
>
> 📥 **Excel herunterladen**
>
> [Excel-Arbeitsmappe](https://www.theseusworkshop.com/) (neueste Version)

---

## Was Sie damit nachverfolgen können

- Die vollständige Menühierarchie über Kategorien, Produkte, Größen und Modifier-Gruppen hinweg aus einer konsistenten Quelle.
- Grundpreise, Modifier-Preise, Halb-Halb-Preislogik und Aufpreise für Zusatzportionen – ohne widersprüchliche Preistabellen.
- Standardzutaten gegenüber kundenseitig hinzugefügten Modifiern, um versehentliche Überberechnungen zu verhindern.
- Speisekarten-Konfigurationen, die für den POS-Import bereit sind, statt Preistabellen manuell neu aufzubauen.
- Fehlende Preise, unterbrochene Beziehungen und Konfigurationsfehler, bevor Speisekarten-Updates Kunden erreichen.
- Durchgängige Preisvalidierung anhand realistischer Bestellsimulationen – statt Hunderte einzelner Speisekarten-Kombinationen zu prüfen.

---

## Schnellstart-Workflow

1. **Preisparameter des Restaurants einmalig festlegen**

   Öffnen Sie das Blatt **System Parameters** und definieren Sie die betrieblichen Regeln, die sich selten ändern – etwa Faktoren für halbe Pizzen, Multiplikatoren für Extras, den Steuersatz, die Standardwährung oder andere Preisrichtlinien. Diese Werte bilden die Grundlage für jede nachfolgende Berechnung und lassen sich zentral anpassen, ohne Formeln zu bearbeiten.

2. **Bestehende Speisekartendaten importieren oder pflegen**

   Füllen Sie die vorgesehenen Master-Blätter mit den vorhandenen Speisekartendaten. Kategorien, Menüpunkte, Größen, Beläge, Modifier-Gruppen und Preise lassen sich direkt aus einer bestehenden Tabelle kopieren oder aus einer POS-Plattform exportieren. Ein Umsstrukturieren oder manuelle Neuberechnen ist nicht erforderlich, da jedes Blatt einem eigenen geschäftlichen Zweck dient.

3. **Ergebnisse sofort prüfen**

   Wechseln Sie zum Dashboard oder zum Blatt für Bestelltests, um automatisch erzeugte Preise, Beziehungsprüfungen, Menü-Integritätschecks und vollständige Kundenbestellberechnungen zu prüfen. Änderungen in den Master-Daten wirken sich im gesamten Workbook aus, ohne Berichte neu erstellen zu müssen.

4. **Aktualisieren, sobald sich die Speisekarte ändert**

   Neue Menüpunkte, saisonale Aktionen, Preisanpassungen oder Modifier-Updates erfordern lediglich Änderungen an den betreffenden Eingabetabellen. Bestehende Berechnungen, Validierungslogik, Dashboards und POS-Exportstrukturen funktionieren automatisch weiter – ohne Neukonfiguration.

**Setzen Sie einige wenige Kernparameter ein. Übernehmen Sie vorhandene Speisekartendaten. Prüfen Sie die Analyse. Aktualisieren Sie bei jeder Änderung der Speisekarte.**

---

## Warum ich das gebaut habe

Das Management einer Restaurantspeisekarte wirkt einfach – bis die Speisekarte mehr als eine Handvoll Produkte umfasst.

Ein typisches Pizzarestaurant bietet mehrere Größen, dutzende Beläge, Spezialpizzen mit Standardzutaten, Halb-Halb-Konfigurationen, Premium-Modifier, Zusatzportionen und unterschiedliche Preisregeln je nach Position des Belags an. Für sich genommen wirkt jede Regel handhabbar. Zusammen erzeugen sie Hunderte – oder sogar Tausende – möglicher Preiskombinationen.

Viele Restaurants pflegen diese Beziehungen weiterhin manuell über getrennte Tabellen, POS-Backoffice-Systeme und Online-Bestellplattformen. Irgendwann driften diese Kopien auseinander. Preise passen nicht mehr. Standardzutaten werden doppelt berechnet. Die Halb-Pizza-Preislogik wird inkonsistent. Das Personal verbringt Stunden damit, einzelne Kombinationen zu prüfen, statt die Speisekarte selbst zu verbessern.

Ich habe diese Arbeitsmappe als wiederverwendbaren operativen Rahmen gebaut – nicht als eine weitere Preistabelle.

Statt jede mögliche Speisekartenkombination manuell zu prüfen, modelliert die Arbeitsmappe die Beziehungen hinter der Speisekarte selbst. Modifier-Regeln, Standardzutaten, Preislogik und Validierung werden zu strukturierten Daten statt zu verdeckten Annahmen.

Beispiel: Bevor dieser Rahmen genutzt wurde, erforderte das Hinzufügen eines Premium-Belags nur zur Hälfte einer Spezialpizza häufig eine manuelle Prüfung, ob der Belag bereits standardmäßig enthalten ist und ob nur der Aufpreis gelten sollte. Nach einmaliger Konfiguration des Preis-Engine wird dasselbe Szenario jedes Mal konsistent nach den zugrunde liegenden Geschäftsregeln berechnet – nicht nach menschlichem Gedächtnis.

Das Ergebnis ist nicht einfach schnellere Wartung – es ist ein wiederholbares Entscheidungsunterstützungssystem, das Preisfehler reduziert, bevor Kunden überhaupt bestellen.

---

## Häufige Probleme bei Restaurantspeisekarten, die dieses Tool löst

| Problem | Ohne dieses Tool | Mit diesem Tool |
|----------|------------------|----------------|
| Modifier-Preise werden über die Größen hinweg inkonsistent | Mehrere Preistabellen driften langsam auseinander und führen zu Kundenstreitigkeiten und manuellen Korrekturen. | Modifier-Preise werden aus zentralisierten Preisregeln und gemeinsamen Parametern erzeugt. |
| Standardzutaten werden versehentlich doppelt berechnet | Bei Spezialpizzen müssen Mitarbeitende im Gedächtnis behalten, welche Beläge bereits enthalten sind. | Standard-Modifier werden automatisch erkannt, sodass nur gültige Aufpreise berechnet werden. |
| Speisekarten-Updates erfordern das Bearbeiten vieler Tabellenblätter | Jede Preisänderung muss in mehrere voneinander unabhängige Tabellen kopiert werden. | Die Kernpreispflege erfolgt einmal und fließt automatisch durch alle abhängigen Berechnungen. |
| POS-Importe enthalten unvollständige Preisbeziehungen | Fehlende Modifier-Zuordnungen führen nach der Menü-Einführung zu Fehlern. | Beziehungen werden vor dem Export geprüft, was Konfigurationsfehler reduziert. |
| Manuelle Tests übersehen Preis-Sonderfälle | Personal prüft wegen Zeitmangels nur eine kleine Stichprobe von Kombinationen. | Das Blatt zur Bestellsimulation bildet realistische Kundenbestellungen für eine umfassende Preisvalidierung nach. |
| Konfigurationsfehler bleiben verborgen, bis Kunden sie melden | Unterbrochene Beziehungen werden oft erst erkannt, nachdem die Speisekarte live ist. | Dashboard-Prüfungen zeigen fehlende Preise, verwaiste Modifier und unvollständige Menüstrukturen vor dem Bereitstellen. |

---

## Für wen ist das gedacht

Diese Arbeitsmappe richtet sich an Restaurantinhaber, Speisekartenmanager, Franchisenehmer, POS-Implementierungsberater, Hospitality-Analysten und Betriebsteams, die komplexe Restaurantspeisekarten mit konfigurierbaren Produkten und Modifier-Preisen pflegen.

Besonders wertvoll ist sie für Unternehmen, die Spezialpizzen, anpassbare Menüs, mehrere Produktgrößen, Premium-Extras und POS-Integrationen verwalten – also überall dort, wo Preis Konsistenz entscheidend ist.

Sie ist **nicht** dazu gedacht, eine Unternehmens-POS-Plattform oder ein Restaurant-ERP-System zu ersetzen. Stattdessen bietet sie eine strukturierte Entscheidungsebene, um menübezogene Logik zu organisieren, Preisregeln zu prüfen und verlässliche Menüdaten vor dem Bereitstellen aufzubereiten.

Excel-Kenntnisse sind nicht erforderlich. Öffnen Sie die Browser-Version für schnellen Zugriff oder verwenden Sie die Excel-Arbeitsmappe für vollständiges Speisekartenmanagement und laufende Wartung.

---

## Über mich

Ich entwickle leichtgewichtige Excel- und browserbasierte Entscheidungsunterstützungstools für operative Probleme, die schwierig werden, wenn zu viele bewegliche Teile gleichzeitig verwaltet werden müssen.

Anstatt bestehende Geschäftssysteme zu ersetzen, ordnen diese Tools die Informationen, die für die nächste operative Entscheidung nötig sind. Die **Restaurant Menu Master Workbook** ist ein Beispiel für diesen Ansatz: Sie macht komplexe Speisekartenbeziehungen zu einem wiederverwendbaren Rahmen, der leichter zu pflegen, zu prüfen und mit der Zeit zu verbessern ist.
## Technische Details

<details>
<summary><strong>Für technische Prüfer, Excel-Praktiker und Mitwirkende</strong></summary>

---

## Architektur der Arbeitsmappe

Die Arbeitsmappe folgt einer geschichteten Architektur, die Master-Daten, Preislogik, Beziehungsverwaltung, Validierung, Simulation und Export trennt. Jedes Tabellenblatt hat eine einzige Aufgabe, sodass sich die Speisekarte aktualisieren lässt, ohne nachgelagerte Berechnungen neu aufzubauen.

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

| Ebene | Tabellenblätter | Zweck |
|---------|------------|---------|
| Globale Parameter | Sys_Params | Zentrale Preismultiplikatoren, Steuersätze, Währung und Rechenskonstanten |
| Master-Daten | Categories, Subcategories, Items, Sizes, Modifier Groups, Modifiers | Pflege wiederverwendbarer Speisekartenobjekte |
| Beziehungsebene | Group Assignment, Default Modifiers, Selection Rules | Legt fest, wie Menüpunkte mit Modifiern interagieren |
| Preisebene | Modifier Pricing | Erzeugt Modifier-Preise automatisch anhand zentraler Regeln |
| Validierungsebene | Dashboard, Order Test | Erkennt Konfigurationsprobleme und prüft Preisergebnisse |
| Ausgabeebene | POS Export | Erzeugt abgeflachte Strukturen für den POS-Import |

### Datenfluss

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

Jede Berechnung basiert auf strukturierten Master-Daten statt auf duplizierten Preistabellen. Das reduziert den Pflegeaufwand und verbessert die Konsistenz.

---

## Drei Fallstricke, die selbst erfahrene Restaurantbetreiber ereilen

### Fallstrick 1 — Kunden werden für Standardzutaten zweimal abgerechnet

Für eine Spezialpizza wird eine Preisentscheidung getroffen.

Der Betreiber nimmt an, das Hinzufügen von Pepperoni löse immer eine Modifier-Gebühr aus.

Die gewählte Pizza enthält Pepperoni jedoch bereits als Standardzutat.

Das Ergebnis ist eine unnötige Zusatzgebühr, die Kunden sofort bemerken.

| Falsche Logik | Korrekte Logik |
|-----------------|---------------|
| Jeder gewählte Modifier erzeugt Umsatz. | Prüfen Sie zuerst, ob der Modifier bereits zur Standardrezeptur des Produkts gehört, bevor Sie berechnen. |

Ohne Identifikation der Standardzutaten werden Speisekartenpreise zwischen Spezialpizzen und Selbst zusammenstellbaren Produkten inkonsistent.

Die Arbeitsmappe prüft zuerst die Beziehung **Default_Modifiers**. Ist der Beleg bereits enthalten, erzeugen nur Zusatzportionen wie **Extra** oder **Double** zusätzlichen Umsatz.

Die Empfehlung ändert sich von:

```text
Normal Pepperoni
→ Charge: $2.49
```

zu

```text
Normal Pepperoni
Already Included
→ Charge: $0.00
```

<details>
<summary>Formellogik</summary>

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

### Fallstrick 2 — Die Halb-Pizza-Preislogik wird inkonsistent

Das Restaurant führt Beläge für die linke und rechte Hälfte ein.

Das Personal schätzt manuell, eine „halbe" Portion solle etwa den halben Preis kosten.

Monate später verwenden verschiedene Modifier unterschiedliche Annahmen.

Manche berechnen 50 %.

Manche berechnen 60 %.

Andere werden vollständig vergessen.

Die Preisgestaltung wird bei identischen Produkten inkonsistent.

| Falsche Logik | Korrekte Logik |
|-----------------|---------------|
| Halbpreise separat speichern. | Halbpreise aus einem globalen Parameter berechnen. |

Die Arbeitsmappe speichert nur den vollen Modifier-Preis.

Die Halb-Preislogik wird automatisch über einen zentralen Multiplikator erzeugt.

Die Aktualisierung eines einzelnen Parameters aktualisiert sofort jeden betroffenen Modifier.

Beispiel:

```text
Whole Pepperoni
$2.40
```

wird zu

```text
Half Pricing Factor
0.50

Left Half
$1.20

Right Half
$1.20
```

anstatt Hunderte doppelter Werte manuell zu pflegen.

<details>
<summary>Formellogik</summary>

```excel
Final Price =
Base Price *
Half Factor *
Portion Multiplier
```

</details>

---

### Fallstrick 3 — Speisekarten-Updates zerstören POS-Importe

Ein Restaurant führt mehrere saisonale Menüpunkte ein.

Neue Modifier werden hinzugefügt.

Eine Modifier-Gruppe wird beim Mapping vergessen.

Innerhalb von Excel wirkt die Speisekarte vollständig, scheitert aber nach dem Import in das POS-System.

Das zugrunde liegende Problem ist nicht die Preislogik.

Es ist die Integrität der Beziehungen.

| Falsche Logik | Korrekte Logik |
|-----------------|---------------|
| Nur Preise prüfen. | Vor dem Export sowohl Preise als auch Beziehungen prüfen. |

Die Arbeitsmappe prüft:

- verwaiste Modifier-Gruppen
- fehlende Größenangaben
- unvollständige Kategoriezuordnungen
- fehlende Preisregeln
- ungültige Modifier-Referenzen

Das Dashboard macht diese Probleme vor dem Export sichtbar statt erst nach dem Bereitstellen.

<details>
<summary>Formellogik</summary>

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

## Beispielszenario

Ein Pizzarestaurant führt eine neue **BBQ Chicken Pizza** in den Größen Small, Medium und Large ein.

Das Produkt enthält:

- BBQ Sauce
- Chicken
- Mozzarella
- Red Onion

Ein Kunde gibt folgende Bestellung auf:

| Element | Auswahl |
|------|-----------|
| Produkt | BBQ Chicken Pizza |
| Größe | Large |
| Default Chicken | Keep |
| Pepperoni | Add Extra |
| Mushroom | Left Half |
| BBQ Sauce | Normal |

Die Preis-Engine führt folgende Schritte aus.

1. Abrufen des Grundpreises für die Pizza in Größe Large.
2. Erkennen von Chicken und BBQ Sauce als Standardzutaten.
3. Keine Berechnung für unveränderte Standardzutaten.
4. Abrufen des Modifier-Preises für Pepperoni.
5. Anwendung des Extra-Multiplikators.
6. Abrufen der Preise für Mushroom.
7. Anwendung des Halb-Pizza-Multiplikators.
8. Summierung aller Komponenten zum Endpreis der Bestellung.

Beispielrechnung:

| Komponente | Betrag |
|-----------|--------|
| Large Pizza | $18.99 |
| Pepperoni (Extra) | $5.24 |
| Mushroom (Left Half) | $0.88 |
| Default Ingredients | $0.00 |
| **Gesamt** | **$25.11** |

Im laufenden Betrieb ist das Restaurant nicht mehr darauf angewiesen, dass Personal sich Preisausnahmen merkt.

Jede Kundenbestellung folgt derselben Preislogik – unabhängig davon, wer die Speisekarte pflegt.

---

## Formelreferenz

<details>
<summary>Master-Daten-Lookups</summary>

| Funktion | Zweck |
|----------|---------|
| XLOOKUP | Artikelnamen, Kategorien, Modifier-Namen und Grundpreise abrufen |
| MATCH | Vorhandensein von Beziehungen prüfen |
| IFERROR | Sichere Standardwerte liefern, wenn Referenzen fehlen |

Beispiel:

```excel
=XLOOKUP(
 Item_ID,
 tbl_Items[Item_ID],
 tbl_Items[Item_Name]
)
```

</details>

<details>
<summary>Preis-Engine</summary>

| Funktion | Zweck |
|----------|---------|
| SWITCH | Größenspezifische Preise auswählen |
| LET | Komplexe Preislogik vereinfachen |
| IF | Preisbedingungen anwenden |
| XLOOKUP | Preisdatensätze abrufen |

Beispiel:

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
<summary>Validierung und Dashboard</summary>

| Funktion | Zweck |
|----------|---------|
| FILTER | Unvollständige Datensätze anzeigen |
| COUNTA | KPI-Summen |
| ROWS | Erzeugte Preisregeln zählen |
| MATCH | Beziehungsprüfung |

Beispiel:

```excel
FILTER(
 tbl_Items[Item_Name],
 ISNA(MATCH(...))
)
```

</details>

---

## Validierungsregeln

| Feld | Validierungsregel | Fehlerverhalten |
|-------|-----------------|----------------|
| Category_ID | Muss in der Category-Tabelle existieren | Kategorie wird abgelehnt |
| Subcategory_ID | Muss auf eine vorhandene Kategorie verweisen | Beziehungswarnung |
| Item_ID | Eindeutige Kennung | Duplikatwarnung |
| SKU_ID | Eindeutige Kombination aus Artikel und Größe | Duplikate werden verhindert |
| Modifier_ID | Muss vor den Preisregeln existieren | Preisberechnung nicht verfügbar |
| Modifier Group | Muss vor der Zuordnung existieren | Dashboard-Warnung |
| Portion Level | Nur Normal, Light, Extra oder Xxtra | Ungültige Auswahl |
| Position | Nur Whole, Left oder Right | Ungültige Preisregel |
| Half Pricing Factor | Positive Dezimalzahl | Globaler Preisfehler |
| Extra Multiplier | Größer als null | Fehler in der Modifier-Preisberechnung |
| Default Modifier | Muss auf gültigen Artikel und Modifier verweisen | Doppelberechnung wird verhindert |
| POS Export | Alle Pflichtzuordnungen vollständig | Fehler bei der Exportvalidierung |

Die Arbeitsmappe validiert Beziehungen nach Möglichkeit bewusst vor den Berechnungen. Fehlende Referenzen werden über Dashboard-Warnungen sichtbar gemacht, statt stillschweigend fehlschlagende Berechnungen zuzulassen.

</details>


---

## Weitere Tools in dieser Reihe

Diese Tools folgen derselben Philosophie: leichtgewichtige, wiederverwendbare Entscheidungsunterstützungsrahmen für wiederkehrende operative Probleme – kein Ersatz für ERP- oder Unternehmensplattformen.

- **Inventory Planning & Purchasing Toolkit** — Lagerbestandsinvestition, Servicegrade und Nachbestellentscheidungen unter schwankender Nachfrage ausbalancieren.
- **Manufacturing Labor Cost & Capacity Planning Toolkit** — Personaleinsatz, Produktionsausbringung und Stückkosten der Fertigung verknüpfen.
- **Construction Estimate & Cost Tracking Toolkit** — Projektkalkulation, Budgetverfolgung und Fortschrittskontrolle standardisieren.
- **Retail & Maquila Inventory Ledger** — Bestände vom Großeinkauf über Lohnfertigung bis zum Verkauf fertiger SKUs verfolgen.
- **Residential Transitional Loan Sizer & Pricer** — Kredithöhe, Preisgestaltung, Hebelwirkung und Risiko für Zwischenfinanzierungen bewerten.
- **Marketing Budget Allocation Simulator** — Kampagnenszenarien, Budgetnutzung und erwartete Leistung über Kanäle hinweg vergleichen.

Diese Sammlung wird laufend um weitere operative Entscheidungsunterstützungstools ergänzt.

---

## Lizenz

Dieses Projekt steht unter der **Apache License 2.0**.

Sie sind frei, um:

- die Arbeitsmappe für private oder kommerzielle Zwecke zu nutzen.
- die Arbeitsmappe zu bearbeiten und an Ihre eigenen betrieblichen Anforderungen anzupassen.
- abgeleitete Versionen gemäß der Apache License 2.0 zu verbreiten.

Bitte behalten Sie den ursprünglichen Lizenzhinweis und die Quellenangabe, wie es die Lizenz verlangt.

Den vollständigen Lizenztext finden Sie in der beiliegenden Datei **LICENSE** in diesem Repository.

---

## Mitwirken

Vorschläge zur Verbesserung der Preislogik, der Speisekartenmodellierung, der Validierungsworkflows oder der POS-Kompatibilität sind jederzeit willkommen.

Beiträge können umfassen:

- Unterstützung zusätzlicher POS-Plattformen
- Verbesserte Validierungsregeln
- Neue Preismodelle
- Formeloptimierung
- Verbesserte Dokumentation
- Restaurantspezifische Konfigurationsbeispiele

Bitte eröffnen Sie ein Issue oder reichen Sie einen Pull Request mit einer klaren Beschreibung des behandelten operativen Problems ein.

---

## Version

**Aktuelle Version**

- Version: **v1.0.0**
- Lizenz: **Apache License 2.0**
- Plattform: **Browser + Microsoft Excel 365 / Excel 2021+**
- Status: **Production Ready**

---

> Leichtgewichtige operative Entscheidungsunterstützung für Unternehmen, die bessere Entscheidungen brauchen – nicht größere Software.
