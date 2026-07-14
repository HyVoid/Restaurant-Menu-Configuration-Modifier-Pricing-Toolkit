/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useState, useMemo } from "react";
import { 
  Plus, 
  Trash2, 
  Receipt, 
  Info, 
  AlertTriangle, 
  CheckCircle, 
  ShoppingCart, 
  User, 
  FileText,
  DollarSign
} from "lucide-react";
import { WorkbookState, OrderSession, SimulatorModifier, ModifierPricingRule } from "../lib/types";

interface OrderSimulatorTabProps {
  state: WorkbookState;
  pricingRules: ModifierPricingRule[];
  onAddSession: (session: OrderSession) => void;
  onDeleteSession: (sessionId: string) => void;
  onUpdateSession: (session: OrderSession) => void;
}

export default function OrderSimulatorTab({
  state,
  pricingRules,
  onAddSession,
  onDeleteSession,
  onUpdateSession
}: OrderSimulatorTabProps) {
  const { items, modifiers, sizes, defaultModifiers, selectionRules, modifierGroups, groupAssignment } = state;

  // Active Session being simulated in the workspace
  const [activeSessionId, setActiveSessionId] = useState<string>(
    state.orderSessions.length > 0 ? state.orderSessions[0].Session_ID : ""
  );

  const activeSession = useMemo(() => {
    return state.orderSessions.find(s => s.Session_ID === activeSessionId) || null;
  }, [state.orderSessions, activeSessionId]);

  // Form states for adding a new simulated session
  const [newSessionName, setNewSessionName] = useState("");
  const [newItemId, setNewItemId] = useState(items[0]?.Item_ID || "");
  const [newSize, setNewSize] = useState<"Small" | "Medium" | "Large" | "X-Large">("Large");

  // State for building a new customization modifier line on the fly
  const [selectedModId, setSelectedModId] = useState("");
  const [selectedPosition, setSelectedPosition] = useState<"Whole" | "Left" | "Right">("Whole");
  const [selectedPortion, setSelectedPortion] = useState<"Normal" | "Light" | "Extra" | "Xxtra">("Normal");

  // Get active item details
  const activeItem = useMemo(() => {
    if (!activeSession) return null;
    return items.find(i => i.Item_ID === activeSession.Item_ID) || null;
  }, [activeSession, items]);

  // Available modifiers for the active item based on group assignment
  const availableModifiers = useMemo(() => {
    if (!activeItem) return modifiers;
    // Find groups assigned to this item's category or the item itself
    const assignedGroupIds = groupAssignment
      .filter(a => {
        if (a.Apply_Level === "Item" && a.Target_ID === activeItem.Item_ID) return true;
        if (a.Apply_Level === "Category" && a.Target_ID === activeItem.Subcategory_ID) return true;
        // Also check if matches item's primary Category_ID through subcategory lookup
        const sub = state.subcategories.find(s => s.Subcategory_ID === activeItem.Subcategory_ID);
        if (sub && a.Apply_Level === "Category" && a.Target_ID === sub.Category_ID) return true;
        return false;
      })
      .map(a => a.Mod_Group_ID);

    if (assignedGroupIds.length === 0) return modifiers; // Fallback to all if no assignment mapped
    return modifiers.filter(m => assignedGroupIds.includes(m.Default_Group_ID));
  }, [activeItem, modifiers, groupAssignment, state.subcategories]);

  // Set default selection when active item changes
  const availableModifiersKey = useMemo(() => {
    return availableModifiers.map(m => m.Modifier_ID).join(",");
  }, [availableModifiers]);

  React.useEffect(() => {
    if (availableModifiers.length > 0) {
      if (!availableModifiers.some(m => m.Modifier_ID === selectedModId)) {
        setSelectedModId(availableModifiers[0].Modifier_ID);
      }
    } else {
      setSelectedModId("");
    }
  }, [availableModifiersKey, availableModifiers, selectedModId]);

  // Sync activeSessionId when sessions list loads dynamically
  React.useEffect(() => {
    if (state.orderSessions.length > 0 && !activeSessionId) {
      setActiveSessionId(state.orderSessions[0].Session_ID);
    }
  }, [state.orderSessions, activeSessionId]);

  // Create a new session
  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = newSessionName.trim() || `Test-${Math.floor(100 + Math.random() * 900)}`;
    const newSession: OrderSession = {
      Session_ID: cleanName,
      Item_ID: newItemId,
      Size_Name: newSize,
      Cut_Style: "Pie Cut",
      Special_Instructions: "",
      SelectedModifiers: []
    };
    onAddSession(newSession);
    setActiveSessionId(cleanName);
    setNewSessionName("");
  };

  // Add customized topping line to active session
  const handleAddModifier = () => {
    if (!activeSession || !selectedModId) return;
    
    // Avoid duplicates of the same topping
    if (activeSession.SelectedModifiers.some(m => m.Modifier_ID === selectedModId)) {
      alert("This topping is already customized on this order. You can remove and re-add to modify.");
      return;
    }

    const updatedModifiers = [
      ...activeSession.SelectedModifiers,
      {
        Modifier_ID: selectedModId,
        Position: selectedPosition,
        Portion_Level: selectedPortion
      }
    ];

    onUpdateSession({
      ...activeSession,
      SelectedModifiers: updatedModifiers
    });
  };

  // Remove customized topping
  const handleRemoveModifier = (modId: string) => {
    if (!activeSession) return;
    const updatedModifiers = activeSession.SelectedModifiers.filter(m => m.Modifier_ID !== modId);
    onUpdateSession({
      ...activeSession,
      SelectedModifiers: updatedModifiers
    });
  };

  // Modify cut or cooking style
  const handleUpdateInstructions = (field: "Cut_Style" | "Special_Instructions", val: string) => {
    if (!activeSession) return;
    onUpdateSession({
      ...activeSession,
      [field]: val
    });
  };

  // Compute Receipts & Rules evaluations
  const receiptCalculations = useMemo(() => {
    if (!activeSession || !activeItem) return null;

    // 1. Base Price
    const sizeEntry = sizes.find(s => s.Item_ID === activeSession.Item_ID && s.Size_Name === activeSession.Size_Name);
    const basePrice = sizeEntry ? sizeEntry.Base_Price : 0;

    // 2. Customizations breakdowns
    const lines = activeSession.SelectedModifiers.map(sm => {
      const mod = modifiers.find(m => m.Modifier_ID === sm.Modifier_ID);
      const modName = mod ? mod.Modifier_Name : "Unknown Topping";

      // Is default topping on this specialty item?
      const isDefault = defaultModifiers.some(dm => dm.Item_ID === activeSession.Item_ID && dm.Modifier_ID === sm.Modifier_ID);

      // Surcharges calculations (formula according to section VI)
      const rawRuleId = `${sm.Modifier_ID}_${activeSession.Size_Name.toUpperCase()}_${sm.Position.toUpperCase()}_${sm.Portion_Level.toUpperCase()}`;
      const normalRuleId = `${sm.Modifier_ID}_${activeSession.Size_Name.toUpperCase()}_${sm.Position.toUpperCase()}_NORMAL`;

      const rawRule = pricingRules.find(r => r.Rule_ID === rawRuleId);
      const normalRule = pricingRules.find(r => r.Rule_ID === normalRuleId);

      const rawPrice = rawRule ? rawRule.Final_Price : 0;
      const normalPrice = normalRule ? normalRule.Final_Price : 0;

      let calculatedPrice = 0;
      let explanation = "";

      if (isDefault) {
        if (sm.Portion_Level === "Normal" || sm.Portion_Level === "Light") {
          calculatedPrice = 0;
          explanation = "Exempted (Default Topping)";
        } else {
          calculatedPrice = rawPrice - normalPrice;
          explanation = `Custom Upgraded Portion (${sm.Portion_Level}) - Charged Surcharge Differential`;
        }
      } else {
        calculatedPrice = rawPrice;
        explanation = `Standard self-selected customization (${sm.Portion_Level} on ${sm.Position})`;
      }

      return {
        Modifier_ID: sm.Modifier_ID,
        Modifier_Name: modName,
        Position: sm.Position,
        Portion_Level: sm.Portion_Level,
        Is_Default: isDefault ? "Y" : "N",
        Raw_Price: rawPrice,
        Normal_Price: normalPrice,
        Calculated_Price: calculatedPrice,
        Explanation: explanation
      };
    });

    const subtotal = basePrice + lines.reduce((sum, l) => sum + l.Calculated_Price, 0);
    const taxRate = parseFloat(state.sysParams.VAL_TAX_RATE) || 0.08;
    const salesTax = subtotal * taxRate;
    const total = subtotal + salesTax;

    // 3. Selection Rules checks
    const activeItemRules = selectionRules.filter(sr => !sr.Item_ID || sr.Item_ID === activeSession.Item_ID);
    const ruleWarnings: string[] = [];

    activeItemRules.forEach(rule => {
      // Find modifiers belonging to rule's Mod_Group_ID
      const groupMods = modifiers.filter(m => m.Default_Group_ID === rule.Mod_Group_ID).map(m => m.Modifier_ID);
      // Count how many of these are customized in our active session
      const selectedInGroup = activeSession.SelectedModifiers.filter(sm => groupMods.includes(sm.Modifier_ID)).length;

      const groupName = modifierGroups.find(g => g.Mod_Group_ID === rule.Mod_Group_ID)?.Mod_Group_Name || rule.Mod_Group_ID;

      if (selectedInGroup < rule.Min_Selections) {
        ruleWarnings.push(`Constraint Breach: Group [${groupName}] requires minimum ${rule.Min_Selections} selection(s), but you currently have selected only ${selectedInGroup}.`);
      }
      if (selectedInGroup > rule.Max_Selections) {
        ruleWarnings.push(`Constraint Breach: Group [${groupName}] permits maximum ${rule.Max_Selections} selection(s), but you currently have selected ${selectedInGroup}.`);
      }
    });

    return {
      basePrice,
      lines,
      subtotal,
      salesTax,
      total,
      ruleWarnings
    };
  }, [activeSession, activeItem, sizes, modifiers, defaultModifiers, selectionRules, pricingRules, modifierGroups, state.sysParams.VAL_TAX_RATE]);

  const currencySymbol = state.sysParams.VAL_CURRENCY || "$";

  return (
    <div className="animate-fade-up space-y-8">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="font-heading text-page-title font-bold text-[var(--color-primary)]">
            Order Test Simulator & Pricing Engine
          </h2>
          <p className="text-xs text-[var(--color-muted)] font-mono uppercase tracking-wider mt-1">
            Validate client receipts, exemption thresholds, and group constraints
          </p>
        </div>

        {/* Create Session Form inline */}
        <form onSubmit={handleCreateSession} className="flex items-center space-x-2 bg-white p-1.5 rounded-lg shadow-sm border border-[var(--color-border)]">
          <input
            type="text"
            required
            placeholder="Sim Name (e.g., Table 4)"
            value={newSessionName}
            onChange={(e) => setNewSessionName(e.target.value)}
            className="px-3 py-1 text-xs bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded focus:outline-none focus:border-[var(--color-accent)] text-[var(--color-primary)]"
          />
          <select
            value={newItemId}
            onChange={(e) => setNewItemId(e.target.value)}
            className="px-2 py-1 text-xs bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded text-[var(--color-primary)] font-semibold"
          >
            {items.map(i => (
              <option key={i.Item_ID} value={i.Item_ID}>{i.Item_Name}</option>
            ))}
          </select>
          <button
            type="submit"
            className="flex items-center space-x-1 px-3 py-1 bg-[var(--color-accent)] text-white text-xs font-bold rounded hover:opacity-90 active:scale-95 transition-all"
          >
            <Plus size={12} />
            <span>Simulate</span>
          </button>
        </form>
      </div>

      {/* Main Grid: Left Selector & Config, Right Live Receipt */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Sessions Directory & Customization Workspace (Col 7) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Active Sim Select Row */}
          <div className="bg-white p-5 rounded-[var(--radius-lg)] shadow-md">
            <h3 className="font-heading text-sm font-bold text-[var(--color-primary)] mb-3">
              Active Simulation Directories
            </h3>
            {state.orderSessions.length === 0 ? (
              <p className="text-xs text-[var(--color-muted)]">No active simulations. Create one above to begin testing pricing formulas.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {state.orderSessions.map(sess => {
                  const item = items.find(i => i.Item_ID === sess.Item_ID);
                  const isSelected = sess.Session_ID === activeSessionId;
                  return (
                    <div
                      key={sess.Session_ID}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-150 border clickable-cell-effect ${
                        isSelected 
                          ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-sm" 
                          : "bg-[var(--color-bg)] text-[var(--color-primary)] border-[var(--color-border)] hover:bg-white"
                      }`}
                      onClick={() => setActiveSessionId(sess.Session_ID)}
                    >
                      <ShoppingCart size={12} />
                      <span>{sess.Session_ID} ({item?.Item_Name || "Custom Item"})</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteSession(sess.Session_ID);
                          if (isSelected) {
                            const remaining = state.orderSessions.filter(s => s.Session_ID !== sess.Session_ID);
                            setActiveSessionId(remaining.length > 0 ? remaining[0].Session_ID : "");
                          }
                        }}
                        className={`hover:text-red-500 rounded p-0.5 ${isSelected ? "text-gray-300" : "text-gray-400"}`}
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {activeSession && activeItem ? (
            <div className="space-y-8">
              
              {/* Product Configuration Board */}
              <div className="bg-white p-6 rounded-[var(--radius-lg)] shadow-md space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
                  <div className="flex items-center space-x-2">
                    <User className="text-[var(--color-primary)]" size={16} />
                    <h3 className="font-heading text-sm font-bold text-[var(--color-primary)]">
                      Base Product Configuration
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-[var(--color-muted)] uppercase bg-[var(--color-bg)] px-2 py-0.5 rounded">
                    ID: {activeItem.Item_ID}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Select Size */}
                  <div>
                    <label className="block text-[11px] text-[var(--color-muted)] uppercase tracking-wider font-mono font-bold mb-1">
                      Menu Item Size
                    </label>
                    <select
                      value={activeSession.Size_Name}
                      onChange={(e) => onUpdateSession({
                        ...activeSession,
                        Size_Name: e.target.value as any
                      })}
                      className="w-full px-3 py-2 text-xs bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded-md text-[var(--color-primary)] font-semibold"
                    >
                      <option value="Small">Small</option>
                      <option value="Medium">Medium</option>
                      <option value="Large">Large</option>
                      <option value="X-Large">X-Large</option>
                    </select>
                  </div>

                  {/* Cut Style */}
                  <div>
                    <label className="block text-[11px] text-[var(--color-muted)] uppercase tracking-wider font-mono font-bold mb-1">
                      Cut Style
                    </label>
                    <select
                      value={activeSession.Cut_Style}
                      onChange={(e) => handleUpdateInstructions("Cut_Style", e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded-md text-[var(--color-primary)]"
                    >
                      <option value="Pie Cut">Pie Cut (Standard 8 Slices)</option>
                      <option value="Square Cut">Square Cut (Square Cut)</option>
                      <option value="Double Cut">Double Cut (Double Slices)</option>
                      <option value="No Cut">No Cut (Uncut)</option>
                    </select>
                  </div>

                  {/* Special Cooking Instructions */}
                  <div>
                    <label className="block text-[11px] text-[var(--color-muted)] uppercase tracking-wider font-mono font-bold mb-1">
                      Kitchen Instructions
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., well done, light sauce"
                      value={activeSession.Special_Instructions}
                      onChange={(e) => handleUpdateInstructions("Special_Instructions", e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded-md text-[var(--color-primary)]"
                    />
                  </div>
                </div>
              </div>

              {/* Topping Surcharge Customizer Matrix */}
              <div className="bg-white p-6 rounded-[var(--radius-lg)] shadow-md space-y-4">
                <div className="flex items-center space-x-2 pb-3 border-b border-[var(--color-border)]">
                  <Plus className="text-[var(--color-accent)]" size={16} />
                  <h3 className="font-heading text-sm font-bold text-[var(--color-primary)]">
                    Add Customized Modifier / Topping
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  {/* Toppings Dropdown */}
                  <div className="md:col-span-1.5">
                    <label className="block text-[11px] text-[var(--color-muted)] uppercase tracking-wider font-mono font-bold mb-1">
                      Topping
                    </label>
                    <select
                      value={selectedModId}
                      onChange={(e) => setSelectedModId(e.target.value)}
                      className="w-full px-2 py-2 text-xs bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded-md text-[var(--color-primary)] font-semibold"
                    >
                      {availableModifiers.length === 0 ? (
                        <option value="">No mapped modifiers</option>
                      ) : (
                        availableModifiers.map(m => (
                          <option key={m.Modifier_ID} value={m.Modifier_ID}>
                            {m.Modifier_Name} ({m.Tier_Type})
                          </option>
                        ))
                      )}
                    </select>
                  </div>

                  {/* Position */}
                  <div>
                    <label className="block text-[11px] text-[var(--color-muted)] uppercase tracking-wider font-mono font-bold mb-1">
                      Position
                    </label>
                    <select
                      value={selectedPosition}
                      onChange={(e) => setSelectedPosition(e.target.value as any)}
                      className="w-full px-2 py-2 text-xs bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded-md text-[var(--color-primary)]"
                    >
                      <option value="Whole">Whole Pizza</option>
                      <option value="Left">Left Half Only</option>
                      <option value="Right">Right Half Only</option>
                    </select>
                  </div>

                  {/* Portion Level */}
                  <div>
                    <label className="block text-[11px] text-[var(--color-muted)] uppercase tracking-wider font-mono font-bold mb-1">
                      Portion Level
                    </label>
                    <select
                      value={selectedPortion}
                      onChange={(e) => setSelectedPortion(e.target.value as any)}
                      className="w-full px-2 py-2 text-xs bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded-md text-[var(--color-primary)] font-semibold"
                    >
                      <option value="Normal">Normal Portion</option>
                      <option value="Light">Light Portion</option>
                      <option value="Extra">Extra (+50% Surcharge)</option>
                      <option value="Xxtra">Double Xxtra (+100% Surcharge)</option>
                    </select>
                  </div>

                  {/* Add Button */}
                  <div>
                    <button
                      type="button"
                      disabled={!selectedModId}
                      onClick={handleAddModifier}
                      className="w-full py-2 bg-[var(--color-primary)] text-white text-xs font-bold rounded-md hover:bg-opacity-95 transition-all flex items-center justify-center space-x-1"
                    >
                      <Plus size={14} />
                      <span>Apply</span>
                    </button>
                  </div>
                </div>

                {/* Assigned Modifiers List with Live Calculation breakdown */}
                <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                  <h4 className="text-[11px] text-[var(--color-primary)] uppercase tracking-wider font-mono font-bold mb-3">
                    Active Toppings Customized on {activeSession.Session_ID}
                  </h4>
                  {activeSession.SelectedModifiers.length === 0 ? (
                    <p className="text-xs text-[var(--color-muted)] italic">No customizations added yet. Base pizza has zero toppings customized.</p>
                  ) : (
                    <div className="space-y-2">
                      {receiptCalculations?.lines.map(line => (
                        <div 
                          key={line.Modifier_ID}
                          className="flex items-center justify-between p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-xs"
                        >
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold text-[var(--color-primary)]">{line.Modifier_Name}</span>
                              {line.Is_Default === "Y" && (
                                <span className="bg-[rgba(34,81,255,0.1)] text-[var(--color-accent)] font-mono text-[9px] px-1.5 py-0.5 rounded uppercase font-semibold">
                                  Default Included
                                </span>
                              )}
                              <span className="text-[10px] text-[var(--color-muted)] bg-white border px-1.5 py-0.5 rounded font-mono">
                                {line.Position} • {line.Portion_Level}
                              </span>
                            </div>
                            <p className="text-[10px] text-[var(--color-muted)] mt-1 font-mono">{line.Explanation}</p>
                          </div>

                          <div className="flex items-center space-x-4">
                            <span className="font-bold text-[var(--color-primary)] font-mono">
                              {line.Calculated_Price === 0 ? "FREE" : `${currencySymbol}${line.Calculated_Price.toFixed(2)}`}
                            </span>
                            <button
                              onClick={() => handleRemoveModifier(line.Modifier_ID)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded p-1 transition-colors"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-12 text-center rounded-[var(--radius-lg)] shadow-md text-gray-400">
              <Receipt size={40} className="mx-auto mb-3 opacity-30 stroke-[1.5]" />
              <p className="text-xs font-semibold">Select or create a point-of-sale simulation batch to activate calculations.</p>
            </div>
          )}
        </div>

        {/* Right Side: Receipt Breakdown, Warnings, Taxes (Col 5) */}
        <div className="lg:col-span-5">
          {activeSession && activeItem && receiptCalculations ? (
            <div className="bg-white rounded-[var(--radius-lg)] shadow-md overflow-hidden animate-fade-up">
              
              {/* Receipt Header */}
              <div className="bg-[var(--color-primary)] text-white p-5 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Receipt size={16} className="stroke-[2.5]" />
                  <h3 className="font-heading text-sm font-bold tracking-tight uppercase">
                    Checkout Receipt
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-gray-300">
                  {activeSession.Session_ID}
                </span>
              </div>

              {/* Receipt Content */}
              <div className="p-6 space-y-6">
                
                {/* Meta details */}
                <div className="border-b border-dashed border-[var(--color-border)] pb-4 space-y-1.5 font-mono text-[11px] text-[var(--color-muted)]">
                  <div className="flex justify-between">
                    <span>Server Station:</span>
                    <span className="font-semibold text-[var(--color-primary)]">Boulevard Simulator #1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Target Item:</span>
                    <span className="font-semibold text-[var(--color-primary)]">{activeItem.Item_Name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Selected SKU:</span>
                    <span className="font-semibold text-[var(--color-accent)]">{activeItem.Item_ID}_{activeSession.Size_Name.toUpperCase()}</span>
                  </div>
                  {activeSession.Cut_Style && (
                    <div className="flex justify-between">
                      <span>Cut Crafting:</span>
                      <span className="font-semibold text-[var(--color-primary)]">{activeSession.Cut_Style}</span>
                    </div>
                  )}
                  {activeSession.Special_Instructions && (
                    <div className="flex justify-between">
                      <span>Chef Notes:</span>
                      <span className="font-semibold text-[var(--color-negative)]">{activeSession.Special_Instructions}</span>
                    </div>
                  )}
                </div>

                {/* Sub-Items List */}
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between font-bold text-[var(--color-primary)] text-sm">
                    <span className="font-heading font-bold text-[13px]">{activeItem.Item_Name} ({activeSession.Size_Name})</span>
                    <span>{currencySymbol}{receiptCalculations.basePrice.toFixed(2)}</span>
                  </div>

                  {receiptCalculations.lines.map(line => (
                    <div key={line.Modifier_ID} className="flex justify-between text-[11px] pl-4 text-[var(--color-body-text)]">
                      <span className="text-[var(--color-muted)]">
                        + {line.Modifier_Name} ({line.Position} • {line.Portion_Level})
                        {line.Is_Default === "Y" && " [Default]"}
                      </span>
                      <span className="font-semibold">
                        {line.Calculated_Price === 0 ? "FREE" : `${currencySymbol}${line.Calculated_Price.toFixed(2)}`}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Rule Warning Alerts inside Receipt */}
                {receiptCalculations.ruleWarnings.length > 0 && (
                  <div className="bg-[var(--anomaly-bg)] text-[var(--color-negative)] p-3 rounded-md text-[10px] font-mono leading-relaxed space-y-1">
                    <div className="flex items-center space-x-1 font-bold mb-1">
                      <AlertTriangle size={11} />
                      <span>SELECTION COMPLIANCE ALERT</span>
                    </div>
                    {receiptCalculations.ruleWarnings.map((warn, index) => (
                      <div key={index}>• {warn}</div>
                    ))}
                  </div>
                )}

                {/* Receipt Totals */}
                <div className="border-t border-dashed border-[var(--color-border)] pt-4 space-y-2 font-mono text-xs">
                  <div className="flex justify-between text-[var(--color-muted)]">
                    <span>Subtotal</span>
                    <span>{currencySymbol}{receiptCalculations.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[var(--color-muted)]">
                    <span>Sales Tax ({(parseFloat(state.sysParams.VAL_TAX_RATE) * 100).toFixed(1)}%)</span>
                    <span>{currencySymbol}{receiptCalculations.salesTax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-[var(--color-primary)] text-base pt-2 border-t">
                    <span className="font-heading text-lg font-bold">Total Bill</span>
                    <span className="text-lg font-bold">{currencySymbol}{receiptCalculations.total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Check-mark success footer */}
                <div className="flex items-center justify-center space-x-2 text-[rgba(0,200,83,1)] bg-[rgba(0,200,83,0.05)] p-2.5 rounded-md font-mono text-[10px] uppercase font-bold text-center">
                  <CheckCircle size={12} />
                  <span>Calculated By Real-Time Formula Engine</span>
                </div>

              </div>
            </div>
          ) : null}
        </div>

      </div>
    </div>
  );
}
