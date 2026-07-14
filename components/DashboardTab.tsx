'use client';

import React from "react";
import { 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  Settings, 
  ChevronRight, 
  ShieldAlert,
  HelpCircle,
  FileSpreadsheet
} from "lucide-react";
import { WorkbookState, ModifierPricingRule } from "../lib/types";

interface DashboardTabProps {
  state: WorkbookState;
  pricingRules: ModifierPricingRule[];
  setActiveTab: (tab: string) => void;
  setActiveSubTab: (subTab: string) => void;
}

export default function DashboardTab({
  state,
  pricingRules,
  setActiveTab,
  setActiveSubTab
}: DashboardTabProps) {
  const { items, modifiers, modifierGroups, sizes, categories, subcategories, orderSessions } = state;

  // Real-time KPI Counts
  const activeItemsCount = items.length;
  const activeModifiersCount = modifiers.length;
  const totalPricingRulesCount = pricingRules.length;
  const orderSessionsCount = orderSessions.length;

  // Data Integrity Health diagnostics:
  // 1. Items missing size/price configuration
  const itemsWithMissingSizes = items.filter(item => {
    const itemSizes = sizes.filter(s => s.Item_ID === item.Item_ID);
    return itemSizes.length === 0;
  });

  // 2. Orphan modifiers (modifiers pointing to non-existent group IDs)
  const orphanModifiers = modifiers.filter(mod => {
    const groupExists = modifierGroups.some(g => g.Mod_Group_ID === mod.Default_Group_ID);
    return !groupExists;
  });

  // 3. Subcategories pointing to non-existent category IDs
  const orphanSubcategories = subcategories.filter(sub => {
    const catExists = categories.some(c => c.Category_ID === sub.Category_ID);
    return !catExists;
  });

  // 4. Items with empty base prices
  const emptyPriceSizes = sizes.filter(s => s.Base_Price === undefined || s.Base_Price === null || s.Base_Price <= 0);

  const totalAnomalies = itemsWithMissingSizes.length + orphanModifiers.length + orphanSubcategories.length + emptyPriceSizes.length;

  const navigateTo = (tab: string, subTab: string) => {
    setActiveTab(tab);
    setActiveSubTab(subTab);
  };

  return (
    <div className="animate-fade-up space-y-8">
      {/* Page Title Header */}
      <div>
        <h2 className="font-heading text-page-title font-bold text-[var(--color-primary)]">
          Operations & Integrity Dashboard
        </h2>
        <p className="text-xs text-[var(--color-muted)] font-mono uppercase tracking-wider mt-1">
          Menu Workbook Control Center • Real-Time Calculations Active
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* KPI 1 */}
        <div 
          onClick={() => navigateTo("menu", "items")}
          className="bg-white p-6 rounded-[var(--radius-lg)] shadow-md card-hover-effect cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[var(--color-muted)] font-semibold uppercase tracking-wider font-mono">
              Active Menu Items
            </span>
            <span className="p-1 rounded-md bg-[rgba(5,28,44,0.04)] text-[var(--color-primary)] group-hover:bg-[var(--color-accent)] group-hover:text-white transition-colors">
              <ChevronRight size={14} />
            </span>
          </div>
          <div className="mt-4 flex items-baseline">
            <span className="font-heading text-kpi-value font-bold text-[var(--color-primary)]">
              {activeItemsCount}
            </span>
            <span className="text-xs text-[var(--color-muted)] ml-2 font-mono">SKUs</span>
          </div>
          <p className="text-[11px] text-[var(--color-muted)] mt-2">
            Mapped across {categories.length} core categories
          </p>
        </div>

        {/* KPI 2 */}
        <div 
          onClick={() => navigateTo("toppings", "modifiers")}
          className="bg-white p-6 rounded-[var(--radius-lg)] shadow-md card-hover-effect cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[var(--color-muted)] font-semibold uppercase tracking-wider font-mono">
              Active Toppings
            </span>
            <span className="p-1 rounded-md bg-[rgba(5,28,44,0.04)] text-[var(--color-primary)] group-hover:bg-[var(--color-accent)] group-hover:text-white transition-colors">
              <ChevronRight size={14} />
            </span>
          </div>
          <div className="mt-4 flex items-baseline">
            <span className="font-heading text-kpi-value font-bold text-[var(--color-primary)]">
              {activeModifiersCount}
            </span>
            <span className="text-xs text-[var(--color-muted)] ml-2 font-mono">Options</span>
          </div>
          <p className="text-[11px] text-[var(--color-muted)] mt-2">
            Divided into {modifierGroups.length} topping groups
          </p>
        </div>

        {/* KPI 3 */}
        <div 
          onClick={() => navigateTo("toppings", "pricing")}
          className="bg-white p-6 rounded-[var(--radius-lg)] shadow-md card-hover-effect cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[var(--color-muted)] font-semibold uppercase tracking-wider font-mono">
              Generated Pricing Rules
            </span>
            <span className="p-1 rounded-md bg-[rgba(5,28,44,0.04)] text-[var(--color-primary)] group-hover:bg-[var(--color-accent)] group-hover:text-white transition-colors">
              <ChevronRight size={14} />
            </span>
          </div>
          <div className="mt-4 flex items-baseline">
            <span className="font-heading text-kpi-value font-bold text-[var(--color-accent)]">
              {totalPricingRulesCount}
            </span>
            <span className="text-xs text-[var(--color-muted)] ml-2 font-mono">Rows</span>
          </div>
          <p className="text-[11px] text-[var(--color-muted)] mt-2">
            Auto-derived from base modifier rules
          </p>
        </div>

        {/* KPI 4 */}
        <div 
          onClick={() => navigateTo("simulator", "orderList")}
          className="bg-white p-6 rounded-[var(--radius-lg)] shadow-md card-hover-effect cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[var(--color-muted)] font-semibold uppercase tracking-wider font-mono">
              Saved Order Tests
            </span>
            <span className="p-1 rounded-md bg-[rgba(5,28,44,0.04)] text-[var(--color-primary)] group-hover:bg-[var(--color-accent)] group-hover:text-white transition-colors">
              <ChevronRight size={14} />
            </span>
          </div>
          <div className="mt-4 flex items-baseline">
            <span className="font-heading text-kpi-value font-bold text-[var(--color-primary)]">
              {orderSessionsCount}
            </span>
            <span className="text-xs text-[var(--color-muted)] ml-2 font-mono">Sims</span>
          </div>
          <p className="text-[11px] text-[var(--color-muted)] mt-2">
            Validated receipt pricing trials
          </p>
        </div>
      </div>

      {/* Dynamic Recommendation Insight Block */}
      <div className="bg-[var(--insight-bg)] border-l-3 border-[var(--color-accent)] p-5 rounded-r-[var(--radius-md)]">
        <div className="flex items-start space-x-3">
          <TrendingUp className="text-[var(--color-accent)] mt-0.5 flex-shrink-0" size={18} />
          <div>
            <h4 className="font-heading text-sm font-bold text-[var(--color-primary)]">
              Boulevard Specialty Pricing Strategy
            </h4>
            <p className="text-xs text-[var(--color-body-text)] mt-1 leading-relaxed">
              Our point-of-sale pricing model optimizes topping profitability by automating position and portion factors. By leveraging dynamic <strong>Exempt Rules</strong>, specialty menu items (such as the <em>Hawaiian Pizza</em> containing default ham and pineapples) automatically waive normal toppings fees but safely upsell <strong>Extra</strong> or <strong>Xxtra</strong> portions as the difference (e.g., Calculated Price = <code>raw_mod_price - normal_mod_price</code>). No redundant calculations occur in the POS backend.
            </p>
          </div>
        </div>
      </div>

      {/* Two Columns: Data Integrity Alert System & System Parameters Quick-View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Diagnostics (Data Integrity Alert System) */}
        <div className="bg-white rounded-[var(--radius-lg)] shadow-md p-6 lg:col-span-2">
          <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border)] mb-4">
            <div className="flex items-center space-x-2">
              <ShieldAlert className="text-[var(--color-primary)]" size={18} />
              <h3 className="font-heading text-base font-bold text-[var(--color-primary)]">
                Data Integrity Health Diagnostics
              </h3>
            </div>
            {totalAnomalies > 0 ? (
              <span className="bg-[var(--anomaly-bg)] text-[var(--color-negative)] text-[10px] font-bold font-mono px-2 py-0.5 rounded-full uppercase flex items-center space-x-1 animate-pulse">
                <AlertTriangle size={10} />
                <span>{totalAnomalies} Anomalies Detected</span>
              </span>
            ) : (
              <span className="bg-[rgba(0,200,83,0.1)] text-[var(--color-positive)] text-[10px] font-bold font-mono px-2 py-0.5 rounded-full uppercase flex items-center space-x-1">
                <CheckCircle size={10} />
                <span>100% Validated</span>
              </span>
            )}
          </div>

          <div className="space-y-4">
            {/* Health Checklist Items */}
            
            {/* Checklist 1: Missing Base Prices */}
            <div className="flex items-start justify-between p-3 rounded-[var(--radius-md)] bg-[var(--color-bg)]">
              <div className="flex items-start space-x-3">
                <div className="mt-0.5">
                  {itemsWithMissingSizes.length > 0 ? (
                    <AlertTriangle className="text-[var(--color-negative)]" size={16} />
                  ) : (
                    <CheckCircle className="text-[var(--color-positive)]" size={16} />
                  )}
                </div>
                <div>
                  <h5 className="text-[12px] font-semibold text-[var(--color-primary)]">
                    Base Size Pricing Completeness
                  </h5>
                  <p className="text-[11px] text-[var(--color-muted)] mt-0.5">
                    Checks if every menu item has at least one price mapped in the Sizes table.
                  </p>
                  {itemsWithMissingSizes.length > 0 && (
                    <div className="mt-2 bg-white rounded p-2 text-[10px] font-mono text-[var(--color-negative)] border border-[var(--color-border)] max-h-24 overflow-y-auto">
                      <strong>Missing pricing sizes:</strong>
                      {itemsWithMissingSizes.map(item => (
                        <div key={item.Item_ID}>• {item.Item_Name} ({item.Item_ID})</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {itemsWithMissingSizes.length > 0 ? (
                <button 
                  onClick={() => navigateTo("menu", "sizes")}
                  className="text-[10px] font-bold text-[var(--color-accent)] hover:underline uppercase tracking-wider shrink-0 mt-0.5"
                >
                  Configure Base Prices
                </button>
              ) : (
                <span className="text-[10px] font-semibold text-[var(--color-positive)] uppercase tracking-wider shrink-0 mt-0.5 font-mono">
                  Healthy
                </span>
              )}
            </div>

            {/* Checklist 2: Orphan Modifiers */}
            <div className="flex items-start justify-between p-3 rounded-[var(--radius-md)] bg-[var(--color-bg)]">
              <div className="flex items-start space-x-3">
                <div className="mt-0.5">
                  {orphanModifiers.length > 0 ? (
                    <AlertTriangle className="text-[var(--color-negative)]" size={16} />
                  ) : (
                    <CheckCircle className="text-[var(--color-positive)]" size={16} />
                  )}
                </div>
                <div>
                  <h5 className="text-[12px] font-semibold text-[var(--color-primary)]">
                    Modifier Group Integrity
                  </h5>
                  <p className="text-[11px] text-[var(--color-muted)] mt-0.5">
                    Verifies that every modifier is correctly mapped to an existing modifier category group.
                  </p>
                  {orphanModifiers.length > 0 && (
                    <div className="mt-2 bg-white rounded p-2 text-[10px] font-mono text-[var(--color-negative)] border border-[var(--color-border)] max-h-24 overflow-y-auto">
                      <strong>Orphan Modifiers:</strong>
                      {orphanModifiers.map(mod => (
                        <div key={mod.Modifier_ID}>• {mod.Modifier_Name} (pointing to {mod.Default_Group_ID})</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {orphanModifiers.length > 0 ? (
                <button 
                  onClick={() => navigateTo("toppings", "modifiers")}
                  className="text-[10px] font-bold text-[var(--color-accent)] hover:underline uppercase tracking-wider shrink-0 mt-0.5"
                >
                  Fix Modifier Groups
                </button>
              ) : (
                <span className="text-[10px] font-semibold text-[var(--color-positive)] uppercase tracking-wider shrink-0 mt-0.5 font-mono">
                  Healthy
                </span>
              )}
            </div>

            {/* Checklist 3: Negative/Zero Base Prices */}
            <div className="flex items-start justify-between p-3 rounded-[var(--radius-md)] bg-[var(--color-bg)]">
              <div className="flex items-start space-x-3">
                <div className="mt-0.5">
                  {emptyPriceSizes.length > 0 ? (
                    <AlertTriangle className="text-[var(--color-negative)]" size={16} />
                  ) : (
                    <CheckCircle className="text-[var(--color-positive)]" size={16} />
                  )}
                </div>
                <div>
                  <h5 className="text-[12px] font-semibold text-[var(--color-primary)]">
                    Null or Negative Pricing Auditing
                  </h5>
                  <p className="text-[11px] text-[var(--color-muted)] mt-0.5">
                    Audits SKU prices to prevent items being sold with a zero or negative base price.
                  </p>
                  {emptyPriceSizes.length > 0 && (
                    <div className="mt-2 bg-white rounded p-2 text-[10px] font-mono text-[var(--color-negative)] border border-[var(--color-border)] max-h-24 overflow-y-auto">
                      <strong>Zero/Null SKUs:</strong>
                      {emptyPriceSizes.map(s => (
                        <div key={s.SKU_ID}>• SKU ID: {s.SKU_ID} (${s.Base_Price})</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {emptyPriceSizes.length > 0 ? (
                <button 
                  onClick={() => navigateTo("menu", "sizes")}
                  className="text-[10px] font-bold text-[var(--color-accent)] hover:underline uppercase tracking-wider shrink-0 mt-0.5"
                >
                  Edit Price Lists
                </button>
              ) : (
                <span className="text-[10px] font-semibold text-[var(--color-positive)] uppercase tracking-wider shrink-0 mt-0.5 font-mono">
                  Healthy
                </span>
              )}
            </div>

            {/* Checklist 4: Subcategory Orphan Link */}
            <div className="flex items-start justify-between p-3 rounded-[var(--radius-md)] bg-[var(--color-bg)]">
              <div className="flex items-start space-x-3">
                <div className="mt-0.5">
                  {orphanSubcategories.length > 0 ? (
                    <AlertTriangle className="text-[var(--color-negative)]" size={16} />
                  ) : (
                    <CheckCircle className="text-[var(--color-positive)]" size={16} />
                  )}
                </div>
                <div>
                  <h5 className="text-[12px] font-semibold text-[var(--color-primary)]">
                    Subcategory Integrity Mappings
                  </h5>
                  <p className="text-[11px] text-[var(--color-muted)] mt-0.5">
                    Validates that subcategories link cleanly to active parent categories.
                  </p>
                  {orphanSubcategories.length > 0 && (
                    <div className="mt-2 bg-white rounded p-2 text-[10px] font-mono text-[var(--color-negative)] border border-[var(--color-border)] max-h-24 overflow-y-auto">
                      <strong>Broken Subcategory Relations:</strong>
                      {orphanSubcategories.map(sub => (
                        <div key={sub.Subcategory_ID}>• Sub: {sub.Subcategory_Name} (linked to Category {sub.Category_ID})</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {orphanSubcategories.length > 0 ? (
                <button 
                  onClick={() => navigateTo("menu", "subcategories")}
                  className="text-[10px] font-bold text-[var(--color-accent)] hover:underline uppercase tracking-wider shrink-0 mt-0.5"
                >
                  Re-assign Categories
                </button>
              ) : (
                <span className="text-[10px] font-semibold text-[var(--color-positive)] uppercase tracking-wider shrink-0 mt-0.5 font-mono">
                  Healthy
                </span>
              )}
            </div>
          </div>
        </div>

        {/* System parameters Quick-view */}
        <div className="bg-white rounded-[var(--radius-lg)] shadow-md p-6">
          <div className="flex items-center space-x-2 pb-4 border-b border-[var(--color-border)] mb-4">
            <Settings className="text-[var(--color-primary)]" size={18} />
            <h3 className="font-heading text-base font-bold text-[var(--color-primary)]">
              Pricing Constants Quick-View
            </h3>
          </div>

          <p className="text-[11px] text-[var(--color-muted)] mb-4">
            Global operational variables stored in <code>Sys_Params</code>. These define scaling and tax.
          </p>

          <div className="space-y-3 font-mono">
            <div className="flex justify-between items-center text-xs p-2 rounded bg-[var(--color-bg)]">
              <span className="text-[var(--color-muted)]">VAL_HALF_FACTOR</span>
              <span className="text-[var(--color-accent)] font-semibold">{state.sysParams.VAL_HALF_FACTOR}</span>
            </div>
            <div className="flex justify-between items-center text-xs p-2 rounded bg-[var(--color-bg)]">
              <span className="text-[var(--color-muted)]">VAL_EXTRA_MULT</span>
              <span className="text-[var(--color-accent)] font-semibold">{state.sysParams.VAL_EXTRA_MULT}x</span>
            </div>
            <div className="flex justify-between items-center text-xs p-2 rounded bg-[var(--color-bg)]">
              <span className="text-[var(--color-muted)]">VAL_XXTRA_MULT</span>
              <span className="text-[var(--color-accent)] font-semibold">{state.sysParams.VAL_XXTRA_MULT}x</span>
            </div>
            <div className="flex justify-between items-center text-xs p-2 rounded bg-[var(--color-bg)]">
              <span className="text-[var(--color-muted)]">VAL_TAX_RATE</span>
              <span className="text-[var(--color-accent)] font-semibold">{(parseFloat(state.sysParams.VAL_TAX_RATE) * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center text-xs p-2 rounded bg-[var(--color-bg)]">
              <span className="text-[var(--color-muted)]">VAL_CURRENCY</span>
              <span className="text-[var(--color-primary)] font-semibold">{state.sysParams.VAL_CURRENCY}</span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => navigateTo("dashboard", "params")}
              className="w-full py-2.5 rounded-lg border border-[var(--color-border)] text-[var(--color-primary)] bg-[var(--color-bg)] text-xs font-semibold uppercase tracking-wider hover:bg-white hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-150 shadow-sm"
            >
              Modify System Params
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
