# English | 中文

# Restaurant Menu Master Workbook
### Excel Decision-Support Toolkit for Restaurant Menu Configuration, Modifier Pricing & POS Menu Governance

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-success)
![Tool](https://img.shields.io/badge/Tool-Menu%20Configuration%20%26%20Decision%20Support-orange)

**Build and maintain a single source of truth for restaurant menus, modifier pricing, and POS configuration—directly in a browser or Excel workbook, with no installation, no signup, and no manual pricing calculations.**

> ## **No signup. No installation. Free.**
>
> 🌐 **Open in Browser**
>
> Browser Version (HTML Live Demo)
>
> 📥 **Download Excel**
>
> Excel Workbook (Latest Release / Gumroad)

---

# Screenshots

### Browser Version

<!-- screenshot: browser version -->

*Interactive browser interface for maintaining menu structure, modifier relationships, pricing rules, and order validation.*

---

### Excel Version

<!-- screenshot: excel version -->

*Excel workbook containing the complete menu master database, pricing engine, validation logic, and POS export tables.*

---

# What It Helps You Track

- Complete menu hierarchy across categories, products, sizes, and modifier groups from one consistent source.
- Base prices, modifier prices, half-and-half pricing, and extra portion charges without conflicting pricing tables.
- Default ingredients versus customer-added modifiers to prevent accidental overcharging.
- Menu configurations that are ready for POS import instead of manually rebuilding pricing tables.
- Missing prices, broken relationships, and configuration errors before menu updates reach customers.
- End-to-end pricing validation using realistic order simulations instead of checking hundreds of individual menu combinations.

---

# Quick Start Workflow

1. **Configure restaurant pricing parameters once**

   Open the **System Parameters** sheet and define the operational rules that rarely change, such as half-pizza pricing factors, extra topping multipliers, tax rate, default currency, or other pricing policies. These values become the foundation for every subsequent calculation and can be adjusted centrally without editing formulas.

2. **Import or maintain existing menu data**

   Populate the designated master sheets with existing menu information. Categories, menu items, sizes, toppings, modifier groups, and pricing can be copied directly from an existing spreadsheet or exported from a POS platform. No restructuring or manual recalculation is required because each sheet follows a dedicated business purpose.

3. **Review results immediately**

   Switch to the Dashboard or Order Test worksheet to review automatically generated pricing, relationship validation, menu integrity checks, and complete customer order calculations. Changes made in the master data propagate throughout the workbook without rebuilding reports.

4. **Refresh whenever the menu changes**

   New menu items, seasonal promotions, pricing adjustments, or modifier updates only require changes to the relevant input tables. Existing calculations, validation logic, dashboards, and POS export structures continue working automatically without reconfiguration.

**Set a few key parameters. Drop in existing menu data. Review the analysis. Refresh whenever the menu changes.**

---

# Why I Built This

Restaurant menu management appears straightforward until the menu grows beyond a handful of products.

A typical pizza restaurant may offer multiple sizes, dozens of toppings, specialty pizzas with default ingredients, half-and-half customization, premium modifiers, extra portions, and different pricing rules depending on where a topping is applied. Individually, each rule seems manageable. Together, they create hundreds—or even thousands—of possible pricing combinations.

Many restaurants still maintain these relationships manually across separate spreadsheets, POS back offices, and online ordering platforms. Eventually those copies drift apart. Prices no longer match. Default ingredients are charged twice. Half-pizza pricing becomes inconsistent. Staff spend hours verifying individual combinations instead of improving the menu itself.

I built this workbook as a reusable operational framework rather than another pricing spreadsheet.

Instead of checking every possible menu combination manually, the workbook models the relationships behind the menu itself. Modifier rules, default ingredients, pricing logic, and validation become structured data rather than hidden assumptions.

For example, before using this framework, adding a premium topping to only half of a specialty pizza often required manually verifying whether the topping was already included by default and whether only the incremental charge should apply. After the pricing engine is configured once, the same scenario is calculated consistently every time using the underlying business rules rather than human memory.

The result is not simply faster maintenance—it is a repeatable decision-support system that reduces pricing mistakes before customers ever place an order.

---

# Common Restaurant Menu Problems This Solves

| Problem | Without This Tool | With This Tool |
|----------|------------------|----------------|
| Modifier prices become inconsistent across menu sizes | Multiple pricing tables gradually diverge, creating customer disputes and manual corrections. | Modifier pricing is generated from centralized pricing rules and shared parameters. |
| Default ingredients are accidentally charged twice | Specialty pizzas require staff to remember which toppings are already included. | Default modifiers are recognized automatically so only valid incremental charges are applied. |
| Menu updates require editing many worksheets | Every price change must be copied into multiple disconnected tables. | Core pricing is maintained once and flows automatically throughout dependent calculations. |
| POS imports contain incomplete pricing relationships | Missing modifier mappings create errors after menu deployment. | Relationships are validated before export, reducing configuration failures. |
| Manual testing misses pricing edge cases | Staff verify only a small sample of menu combinations due to time constraints. | The order simulation sheet reproduces realistic customer orders for comprehensive pricing validation. |
| Configuration errors remain hidden until customers report them | Broken relationships are often discovered only after menus go live. | Dashboard validation highlights missing prices, orphaned modifiers, and incomplete menu structures before deployment. |

---

# Who This Is For

This workbook is designed for restaurant owners, menu administrators, franchise operators, POS implementation consultants, hospitality analysts, and operations teams responsible for maintaining complex restaurant menus with configurable products and modifier pricing.

It is particularly valuable for businesses that manage specialty pizzas, customizable meals, multiple product sizes, premium add-ons, and POS integrations where pricing consistency is critical.

It is **not** intended to replace an enterprise POS platform or restaurant ERP system. Instead, it provides a structured decision-support layer for organizing menu logic, validating pricing rules, and preparing reliable menu data before deployment.

No spreadsheet expertise is required. Open the browser version for quick access or use the Excel workbook for full menu management and ongoing maintenance.

---

# About

I build lightweight Excel and browser-based decision-support tools for operational problems that become difficult once too many moving parts must be managed simultaneously.

Rather than replacing existing business systems, these tools organize the information needed to make the next operational decision with confidence. **Restaurant Menu Master Workbook** is one example of that approach, turning complex menu relationships into a reusable framework that is easier to maintain, verify, and improve over time.
## Technical Details

<details>
<summary><strong>For technical reviewers, Excel practitioners, and collaborators</strong></summary>

---

## Workbook Architecture

The workbook follows a layered architecture that separates master data, pricing logic, relationship management, validation, simulation, and export. Every worksheet has a single responsibility, allowing menu updates without rebuilding downstream calculations.

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

| Layer | Worksheets | Purpose |
|---------|------------|---------|
| Global Parameters | Sys_Params | Central pricing multipliers, tax rates, currency and calculation constants |
| Master Data | Categories, Subcategories, Items, Sizes, Modifier Groups, Modifiers | Maintain reusable menu entities |
| Relationship Layer | Group Assignment, Default Modifiers, Selection Rules | Define how menu items interact with modifiers |
| Pricing Layer | Modifier Pricing | Generate modifier prices automatically using centralized rules |
| Validation Layer | Dashboard, Order Test | Detect configuration problems and validate pricing outcomes |
| Output Layer | POS Export | Produce flattened structures suitable for POS import |

### Data Flow

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

Every calculation depends on structured master data rather than duplicated pricing tables, reducing maintenance effort and improving consistency.

---

## Three Traps That Catch Even Experienced Restaurant Operators

### Trap 1 — Charging Customers Twice for Default Ingredients

A pricing decision is made for a specialty pizza.

The operator assumes that adding Pepperoni should always generate a modifier charge.

However, the selected pizza already includes Pepperoni as a default ingredient.

The result is an unnecessary extra charge that customers immediately notice.

| Incorrect Logic | Correct Logic |
|-----------------|---------------|
| Every selected modifier generates revenue. | Determine whether the modifier already belongs to the product's default recipe before charging. |

Without identifying default ingredients, menu prices become inconsistent between specialty pizzas and build-your-own products.

The workbook first checks the **Default_Modifiers** relationship. If the topping is already included, only incremental upgrades such as **Extra** or **Double** portions generate additional revenue.

The recommendation changes from:

```text
Normal Pepperoni
Charge: $2.49
```

to

```text
Normal Pepperoni
Already Included
Charge: $0.00
```

<details>
<summary>Formula Logic</summary>

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

### Trap 2 — Half Pizza Pricing Becomes Inconsistent

The restaurant introduces left-half and right-half toppings.

Staff manually estimate that "half" should be approximately half price.

Months later different modifiers are using different assumptions.

Some charge 50%.

Some charge 60%.

Others were forgotten entirely.

Pricing becomes inconsistent across identical products.

| Incorrect Logic | Correct Logic |
|-----------------|---------------|
| Store half-prices separately. | Calculate half pricing from one global parameter. |

The workbook stores only the full modifier price.

Half pricing is generated automatically using a centralized multiplier.

Updating one parameter immediately updates every affected modifier.

Example:

```text
Whole Pepperoni
$2.40
```

becomes

```text
Half Pricing Factor
0.50

Left Half
$1.20

Right Half
$1.20
```

instead of manually maintaining hundreds of duplicate values.

<details>
<summary>Formula Logic</summary>

```excel
Final Price =
Base Price *
Half Factor *
Portion Multiplier
```

</details>

---

### Trap 3 — Menu Updates Break POS Imports

A restaurant launches several seasonal menu items.

New modifiers are added.

One modifier group is forgotten during mapping.

The menu appears complete inside Excel but fails after importing into the POS system.

The underlying problem is not pricing.

It is relationship integrity.

| Incorrect Logic | Correct Logic |
|-----------------|---------------|
| Verify prices only. | Verify both prices and relationships before export. |

The workbook validates:

- orphaned modifier groups
- missing item sizes
- incomplete category mappings
- missing pricing rules
- invalid modifier references

The dashboard exposes these issues before export instead of after deployment.

<details>
<summary>Formula Logic</summary>

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

## Example Scenario

A pizza restaurant introduces a new **BBQ Chicken Pizza** available in Small, Medium, and Large sizes.

The product includes:

- BBQ Sauce
- Chicken
- Mozzarella
- Red Onion

A customer places the following order:

| Item | Selection |
|------|-----------|
| Product | BBQ Chicken Pizza |
| Size | Large |
| Default Chicken | Keep |
| Pepperoni | Add Extra |
| Mushroom | Left Half |
| BBQ Sauce | Normal |

The pricing engine performs the following sequence.

1. Retrieve the Large pizza base price.
2. Identify Chicken and BBQ Sauce as default ingredients.
3. Apply no charge for unchanged defaults.
4. Retrieve the modifier price for Pepperoni.
5. Apply the Extra multiplier.
6. Retrieve Mushroom pricing.
7. Apply the half-pizza multiplier.
8. Sum every component into the final order price.

Example calculation:

| Component | Amount |
|-----------|--------|
| Large Pizza | $18.99 |
| Pepperoni (Extra) | $5.24 |
| Mushroom (Left Half) | $0.88 |
| Default Ingredients | $0.00 |
| **Total** | **$25.11** |

Operationally, the restaurant no longer depends on staff remembering pricing exceptions.

Every customer order follows identical pricing logic regardless of who maintains the menu.

---

## Formula Reference

<details>
<summary>Master Data Lookups</summary>

| Function | Purpose |
|----------|---------|
| XLOOKUP | Retrieve item names, categories, modifier names, and base prices |
| MATCH | Validate relationship existence |
| IFERROR | Return safe defaults when references are missing |

Example:

```excel
=XLOOKUP(
 Item_ID,
 tbl_Items[Item_ID],
 tbl_Items[Item_Name]
)
```

</details>

<details>
<summary>Pricing Engine</summary>

| Function | Purpose |
|----------|---------|
| SWITCH | Select size-specific prices |
| LET | Simplify complex pricing logic |
| IF | Apply pricing conditions |
| XLOOKUP | Retrieve pricing records |

Example:

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
<summary>Validation & Dashboard</summary>

| Function | Purpose |
|----------|---------|
| FILTER | Display incomplete records |
| COUNTA | KPI totals |
| ROWS | Count generated pricing rules |
| MATCH | Relationship validation |

Example:

```excel
FILTER(
 tbl_Items[Item_Name],
 ISNA(MATCH(...))
)
```

</details>

---

## Validation Rules

| Field | Validation Rule | Error Behavior |
|-------|-----------------|----------------|
| Category_ID | Must exist in Category table | Category rejected |
| Subcategory_ID | Must reference existing category | Relationship warning |
| Item_ID | Unique identifier | Duplicate warning |
| SKU_ID | Unique item-size combination | Duplicate prevented |
| Modifier_ID | Must exist before pricing rules | Pricing unavailable |
| Modifier Group | Must exist before assignment | Dashboard alert |
| Portion Level | Normal, Light, Extra, Xxtra only | Invalid selection |
| Position | Whole, Left, Right only | Invalid pricing rule |
| Half Pricing Factor | Positive decimal | Global pricing error |
| Extra Multiplier | Greater than zero | Modifier pricing error |
| Default Modifier | Must reference valid Item and Modifier | Duplicate charging prevented |
| POS Export | All mandatory mappings complete | Export validation failure |

The workbook intentionally validates relationships before calculations wherever possible. Missing references are surfaced through dashboard alerts instead of allowing silent calculation failures.

</details>

</details>

---

## Other Tools in This Series

These tools follow the same philosophy: lightweight, reusable decision-support frameworks built for recurring operational problems—not replacements for ERP or enterprise platforms.

- **Inventory Planning & Purchasing Toolkit** — Balance inventory investment, service levels, and replenishment decisions under changing demand.
- **Manufacturing Labor Cost & Capacity Planning Toolkit** — Connect labor utilization, production output, and unit manufacturing costs.
- **Construction Estimate & Cost Tracking Toolkit** — Standardize project estimating, budget tracking, and progress monitoring.
- **Retail & Maquila Inventory Ledger** — Track inventory from bulk purchasing through contract manufacturing to finished SKU sales.
- **Residential Transitional Loan Sizer & Pricer** — Evaluate loan sizing, pricing, leverage, and risk for bridge lending.
- **Marketing Budget Allocation Simulator** — Compare campaign scenarios, budget utilization, and expected performance across channels.

More operational decision-support tools are continually being added to this collection.

---

## License

This project is licensed under the **Apache License 2.0**.

You are free to:

- Use the workbook for personal or commercial purposes.
- Modify and extend the workbook to fit your own operational requirements.
- Distribute derivative versions in accordance with the Apache License 2.0.

Please retain the original license notice and attribution where required by the license.

For the complete license text, see the accompanying **LICENSE** file in this repository.

---

## Contributing

Suggestions for improving pricing logic, menu modeling, validation workflows, or POS compatibility are always welcome.

Contributions may include:

- Support for additional POS platforms
- Improved validation rules
- New pricing models
- Formula optimization
- Documentation improvements
- Restaurant-specific configuration examples

Please open an Issue or submit a Pull Request with a clear description of the operational problem being addressed.

---

## Version

**Current Release**

- Version: **v1.0.0**
- License: **Apache License 2.0**
- Platform: **Browser + Microsoft Excel 365 / Excel 2021+**
- Status: **Production Ready**

---

> Lightweight operational decision-support tools for businesses that need better decisions—not bigger software.
