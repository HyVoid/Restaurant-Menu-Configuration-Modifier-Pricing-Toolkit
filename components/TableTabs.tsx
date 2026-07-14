'use client';

import React, { useState, useMemo, useRef } from "react";
import { 
  Plus, 
  Trash2, 
  Search, 
  FileSpreadsheet, 
  Upload, 
  Download, 
  AlertTriangle, 
  Check,
  ArrowUpDown
} from "lucide-react";
import { WorkbookState, ModifierPricingRule, SysParams } from "../lib/types";

interface TableTabsProps {
  state: WorkbookState;
  pricingRules: ModifierPricingRule[];
  activeSubTab: string;
  setActiveSubTab: (subTab: string) => void;
  onUpdateRow: (tableName: keyof WorkbookState, rowIndex: number, field: string, value: any) => void;
  onAddRow: (tableName: keyof WorkbookState, newRow: any) => void;
  onDeleteRow: (tableName: keyof WorkbookState, rowIndex: number) => void;
  onBulkImport: (tableName: keyof WorkbookState, rows: any[], merge: boolean) => void;
  onUpdateParams: (params: SysParams) => void;
  activeTabGroup: "menu" | "toppings" | "relations" | "params";
}

export default function TableTabs({
  state,
  pricingRules,
  activeSubTab,
  setActiveSubTab,
  onUpdateRow,
  onAddRow,
  onDeleteRow,
  onBulkImport,
  onUpdateParams,
  activeTabGroup
}: TableTabsProps) {
  const { categories, subcategories, items, sizes, modifierGroups, modifiers, defaultModifiers, groupAssignment, selectionRules, sysParams } = state;

  const [searchTerm, setSearchTerm] = useState("");
  const [csvText, setCsvText] = useState("");
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importMergeMode, setImportMergeMode] = useState(true); // true = merge/update, false = replace
  const [importPreview, setImportPreview] = useState<any[]>([]);

  // CSV parsing helper
  const handleCsvParse = () => {
    if (!csvText.trim()) return;
    const lines = csvText.split("\n").map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length < 2) return;

    const headers = lines[0].split(",").map(h => h.trim().replace(/^["']|["']$/g, ""));
    const rows = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      // handle simple commas inside quotes
      const values: string[] = [];
      let insideQuote = false;
      let currentVal = "";

      for (let c = 0; c < line.length; c++) {
        const char = line[c];
        if (char === '"' || char === "'") {
          insideQuote = !insideQuote;
        } else if (char === ',' && !insideQuote) {
          values.push(currentVal.trim());
          currentVal = "";
        } else {
          currentVal += char;
        }
      }
      values.push(currentVal.trim());

      const obj: any = {};
      headers.forEach((h, idx) => {
        let val: any = values[idx] || "";
        val = val.replace(/^["']|["']$/g, "");
        // Convert to numbers if numeric
        if (!isNaN(val) && val.trim() !== "") {
          val = parseFloat(val);
        }
        obj[h] = val;
      });
      rows.push(obj);
    }
    setImportPreview(rows);
  };

  const handleApplyImport = () => {
    if (importPreview.length === 0) return;
    
    // Map active table key based on activeSubTab
    let tableKey: keyof WorkbookState | null = null;
    if (activeSubTab === "categories") tableKey = "categories";
    else if (activeSubTab === "subcategories") tableKey = "subcategories";
    else if (activeSubTab === "items") tableKey = "items";
    else if (activeSubTab === "sizes") tableKey = "sizes";
    else if (activeSubTab === "groups") tableKey = "modifierGroups";
    else if (activeSubTab === "modifiers") tableKey = "modifiers";
    else if (activeSubTab === "defaults") tableKey = "defaultModifiers";
    else if (activeSubTab === "assignments") tableKey = "groupAssignment";
    else if (activeSubTab === "rules") tableKey = "selectionRules";

    if (tableKey) {
      onBulkImport(tableKey, importPreview, importMergeMode);
      setIsImportModalOpen(false);
      setCsvText("");
      setImportPreview([]);
    }
  };

  // Helper to lookup calculated fields on items
  const lookupData = useMemo(() => {
    return {
      getCategoryName: (catId: string) => categories.find(c => c.Category_ID === catId)?.Category_Name || "",
      getSubcategoryName: (subId: string) => subcategories.find(s => s.Subcategory_ID === subId)?.Subcategory_Name || "",
      getItemName: (itemId: string) => items.find(i => i.Item_ID === itemId)?.Item_Name || "",
      getModifierName: (modId: string) => modifiers.find(m => m.Modifier_ID === modId)?.Modifier_Name || "",
      getModGroupName: (grpId: string) => modifierGroups.find(g => g.Mod_Group_ID === grpId)?.Mod_Group_Name || ""
    };
  }, [categories, subcategories, items, modifiers, modifierGroups]);

  // Determine active sub-sheet configuration
  const sheetConfig = useMemo(() => {
    switch (activeSubTab) {
      case "categories":
        return {
          title: "Menu Categories",
          description: "Define major menu categories, display order weights, and active states.",
          data: categories,
          tableName: "categories" as keyof WorkbookState,
          columns: [
            { id: "Category_ID", label: "Category ID", type: "text", editable: true, isKey: true },
            { id: "Category_Name", label: "Category Name", type: "text", editable: true },
            { id: "Display_Order", label: "Display Order", type: "number", editable: true },
            { id: "Active_Status", label: "Active Status (Y/N)", type: "select", options: ["Y", "N"], editable: true }
          ],
          defaultRow: { Category_ID: `CAT00${categories.length + 1}`, Category_Name: "New Category", Display_Order: categories.length + 1, Active_Status: "Y" }
        };

      case "subcategories":
        return {
          title: "Menu Subcategories",
          description: "Relate subcategories to primary food categories (e.g. Create Your Own under Pizza).",
          data: subcategories,
          tableName: "subcategories" as keyof WorkbookState,
          columns: [
            { id: "Subcategory_ID", label: "Subcategory ID", type: "text", editable: true, isKey: true },
            { id: "Category_ID", label: "Category ID", type: "select", options: categories.map(c => c.Category_ID), editable: true },
            { id: "Category_Name_Calc", label: "Category Name (Lookup)", type: "calc", valueFn: (row: any) => lookupData.getCategoryName(row.Category_ID) },
            { id: "Subcategory_Name", label: "Subcategory Name", type: "text", editable: true },
            { id: "Display_Order", label: "Display Order", type: "number", editable: true }
          ],
          defaultRow: { Subcategory_ID: `SUB00${subcategories.length + 1}`, Category_ID: categories[0]?.Category_ID || "", Subcategory_Name: "New Subcategory", Display_Order: subcategories.length + 1 }
        };

      case "items":
        return {
          title: "Menu Items Master",
          description: "Master list of products, descriptions, subcategory linking, and custom modifier allowance.",
          data: items,
          tableName: "items" as keyof WorkbookState,
          columns: [
            { id: "Item_ID", label: "Item ID", type: "text", editable: true, isKey: true },
            { id: "Item_Name", label: "Item Name", type: "text", editable: true },
            { id: "Subcategory_ID", label: "Subcategory ID", type: "select", options: subcategories.map(s => s.Subcategory_ID), editable: true },
            { id: "Subcategory_Name_Calc", label: "Subcategory Name (Lookup)", type: "calc", valueFn: (row: any) => lookupData.getSubcategoryName(row.Subcategory_ID) },
            { id: "Category_Name_Calc", label: "Category Name (Lookup)", type: "calc", valueFn: (row: any) => {
              const sub = subcategories.find(s => s.Subcategory_ID === row.Subcategory_ID);
              return sub ? lookupData.getCategoryName(sub.Category_ID) : "";
            }},
            { id: "Description", label: "Description", type: "text", editable: true },
            { id: "Has_Modifiers", label: "Has Modifiers (Y/N)", type: "select", options: ["Y", "N"], editable: true }
          ],
          defaultRow: { Item_ID: `ITEM00${items.length + 1}`, Item_Name: "New Pizza Item", Subcategory_ID: subcategories[0]?.Subcategory_ID || "", Description: "Delicious freshly made gourmet item", Has_Modifiers: "Y" }
        };

      case "sizes":
        return {
          title: "Item Sizes & Base Prices",
          description: "Establish product prices dynamically scaled across different sizes (Small, Medium, Large, X-Large).",
          data: sizes,
          tableName: "sizes" as keyof WorkbookState,
          columns: [
            { id: "SKU_ID", label: "SKU ID", type: "text", editable: true, isKey: true },
            { id: "Item_ID", label: "Item ID", type: "select", options: items.map(i => i.Item_ID), editable: true },
            { id: "Item_Name_Calc", label: "Item Name (Lookup)", type: "calc", valueFn: (row: any) => lookupData.getItemName(row.Item_ID) },
            { id: "Size_Name", label: "Size Name", type: "select", options: ["Small", "Medium", "Large", "X-Large"], editable: true },
            { id: "Base_Price", label: "Base Price", type: "price", editable: true, hasDataBar: true },
            { id: "Display_Order", label: "Display Order", type: "number", editable: true }
          ],
          defaultRow: { SKU_ID: `SKU_NEW`, Item_ID: items[0]?.Item_ID || "", Size_Name: "Large", Base_Price: 15.99, Display_Order: 1 }
        };

      case "groups":
        return {
          title: "Topping Modifier Groups",
          description: "Group modifiers (e.g. Meats, Cheeses) and enforce mandatory selection constraint rules.",
          data: modifierGroups,
          tableName: "modifierGroups" as keyof WorkbookState,
          columns: [
            { id: "Mod_Group_ID", label: "Mod Group ID", type: "text", editable: true, isKey: true },
            { id: "Mod_Group_Name", label: "Mod Group Name", type: "text", editable: true },
            { id: "Min_Selections", label: "Min Selections", type: "number", editable: true },
            { id: "Max_Selections", label: "Max Selections", type: "number", editable: true },
            { id: "Is_Required_Calc", label: "Is Required? (Formula)", type: "calc", valueFn: (row: any) => row.Min_Selections > 0 ? "Y" : "N" }
          ],
          defaultRow: { Mod_Group_ID: `GRP00${modifierGroups.length + 1}`, Mod_Group_Name: "New Group", Min_Selections: 0, Max_Selections: 5 }
        };

      case "modifiers":
        return {
          title: "Modifiers Master List",
          description: "Register standard/premium toppings and assign their whole base price across sizes.",
          data: modifiers,
          tableName: "modifiers" as keyof WorkbookState,
          columns: [
            { id: "Modifier_ID", label: "Modifier ID", type: "text", editable: true, isKey: true },
            { id: "Modifier_Name", label: "Modifier Name", type: "text", editable: true },
            { id: "Default_Group_ID", label: "Default Group ID", type: "select", options: modifierGroups.map(g => g.Mod_Group_ID), editable: true },
            { id: "Group_Name_Calc", label: "Group Name (Lookup)", type: "calc", valueFn: (row: any) => lookupData.getModGroupName(row.Default_Group_ID) },
            { id: "Tier_Type", label: "Tier Type (Std/Prem)", type: "select", options: ["Standard", "Premium"], editable: true },
            { id: "Price_Small", label: "Price Small", type: "price", editable: true, hasDataBar: true },
            { id: "Price_Medium", label: "Price Medium", type: "price", editable: true, hasDataBar: true },
            { id: "Price_Large", label: "Price Large", type: "price", editable: true, hasDataBar: true },
            { id: "Active_Status", label: "Active (Y/N)", type: "select", options: ["Y", "N"], editable: true }
          ],
          defaultRow: { Modifier_ID: `MOD00${modifiers.length + 1}`, Modifier_Name: "New Topping", Default_Group_ID: modifierGroups[0]?.Mod_Group_ID || "", Tier_Type: "Standard", Price_Small: 1.50, Price_Medium: 1.75, Price_Large: 2.00, Active_Status: "Y" }
        };

      case "pricing":
        return {
          title: "Modifiers Pricing Rules Matrix",
          description: "Auto-derived rules based on half-factor & portions multiplier. Instant-recalculation across all sizes.",
          data: pricingRules,
          tableName: null, // Read Only!
          columns: [
            { id: "Rule_ID", label: "Rule ID (Calculated)", type: "text", editable: false },
            { id: "Modifier_ID", label: "Modifier ID", type: "text", editable: false },
            { id: "Modifier_Name", label: "Modifier Name", type: "text", editable: false },
            { id: "Size_Name", label: "Size Name", type: "text", editable: false },
            { id: "Position", label: "Position", type: "text", editable: false },
            { id: "Portion_Level", label: "Portion Level", type: "text", editable: false },
            { id: "Base_Size_Price", label: "Base Size Price (Lookup)", type: "price", editable: false, hasDataBar: true },
            { id: "Final_Price", label: "Final Price (Formula)", type: "price", editable: false, hasDataBar: true }
          ],
          defaultRow: null
        };

      case "defaults":
        return {
          title: "Specialty Default Toppings & Exemptions",
          description: "Identify toppings pre-built on specialty items and exempt them from base pricing on normal levels.",
          data: defaultModifiers,
          tableName: "defaultModifiers" as keyof WorkbookState,
          columns: [
            { id: "Default_ID", label: "Default ID", type: "text", editable: true, isKey: true },
            { id: "Item_ID", label: "Item ID", type: "select", options: items.map(i => i.Item_ID), editable: true },
            { id: "Item_Name_Calc", label: "Item Name (Lookup)", type: "calc", valueFn: (row: any) => lookupData.getItemName(row.Item_ID) },
            { id: "Modifier_ID", label: "Modifier ID", type: "select", options: modifiers.map(m => m.Modifier_ID), editable: true },
            { id: "Modifier_Name_Calc", label: "Modifier Name (Lookup)", type: "calc", valueFn: (row: any) => lookupData.getModifierName(row.Modifier_ID) },
            { id: "Included_Portion", label: "Default Portion", type: "select", options: ["Normal", "Light", "Extra", "Xxtra"], editable: true },
            { id: "Exempt_Price", label: "Exempt Surcharge?", type: "select", options: ["Y", "N"], editable: true }
          ],
          defaultRow: { Default_ID: `ITEM_MOD_NEW`, Item_ID: items[0]?.Item_ID || "", Modifier_ID: modifiers[0]?.Modifier_ID || "", Included_Portion: "Normal", Exempt_Price: "Y" }
        };

      case "assignments":
        return {
          title: "Product-Topping Group Associations",
          description: "Link topping groups to specific categories or menu items, configuring available choices at checkout.",
          data: groupAssignment,
          tableName: "groupAssignment" as keyof WorkbookState,
          columns: [
            { id: "Assign_ID", label: "Assign ID", type: "text", editable: true, isKey: true },
            { id: "Apply_Level", label: "Apply Level (Category/Item)", type: "select", options: ["Category", "Item"], editable: true },
            { id: "Target_ID", label: "Target ID (ID Lookup)", type: "text", editable: true },
            { id: "Target_Name_Calc", label: "Target Name (Lookup)", type: "calc", valueFn: (row: any) => {
              if (row.Apply_Level === "Category") {
                const sub = subcategories.find(s => s.Subcategory_ID === row.Target_ID);
                if (sub) return sub.Subcategory_Name;
                const cat = categories.find(c => c.Category_ID === row.Target_ID);
                return cat ? cat.Category_Name : `Category: ${row.Target_ID}`;
              }
              return lookupData.getItemName(row.Target_ID);
            }},
            { id: "Mod_Group_ID", label: "Mod Group ID", type: "select", options: modifierGroups.map(g => g.Mod_Group_ID), editable: true },
            { id: "Mod_Group_Name_Calc", label: "Mod Group Name (Lookup)", type: "calc", valueFn: (row: any) => lookupData.getModGroupName(row.Mod_Group_ID) }
          ],
          defaultRow: { Assign_ID: `ASS00${groupAssignment.length + 1}`, Apply_Level: "Category", Target_ID: categories[0]?.Category_ID || "", Mod_Group_ID: modifierGroups[0]?.Mod_Group_ID || "" }
        };

      case "rules":
        return {
          title: "Simulation Selection Constraint Rules",
          description: "Configure mandatory requirements (minimums/maximums) on specific modifier groups.",
          data: selectionRules,
          tableName: "selectionRules" as keyof WorkbookState,
          columns: [
            { id: "Rule_ID", label: "Rule ID", type: "text", editable: true, isKey: true },
            { id: "Item_ID", label: "Item ID (Blank = All)", type: "text", editable: true },
            { id: "Item_Name_Calc", label: "Item Name (Lookup)", type: "calc", valueFn: (row: any) => row.Item_ID ? lookupData.getItemName(row.Item_ID) : "All Mapped Items" },
            { id: "Mod_Group_ID", label: "Mod Group ID", type: "select", options: modifierGroups.map(g => g.Mod_Group_ID), editable: true },
            { id: "Mod_Group_Name_Calc", label: "Mod Group Name (Lookup)", type: "calc", valueFn: (row: any) => lookupData.getModGroupName(row.Mod_Group_ID) },
            { id: "Min_Selections", label: "Min Selections", type: "number", editable: true },
            { id: "Max_Selections", label: "Max Selections", type: "number", editable: true }
          ],
          defaultRow: { Rule_ID: `SR00${selectionRules.length + 1}`, Item_ID: "", Mod_Group_ID: modifierGroups[0]?.Mod_Group_ID || "", Min_Selections: 1, Max_Selections: 1 }
        };

      default:
        return null;
    }
  }, [activeSubTab, categories, subcategories, items, sizes, modifierGroups, modifiers, pricingRules, defaultModifiers, groupAssignment, selectionRules, lookupData]);

  // Handle in-place spreadsheet edits
  const handleCellChange = (rowIndex: number, fieldId: string, val: any) => {
    if (!sheetConfig || !sheetConfig.tableName) return;
    onUpdateRow(sheetConfig.tableName, rowIndex, fieldId, val);
  };

  // Find max value in a numeric column to dynamically draw the proportional inline data-bar
  const getColMax = (colId: string, list: any[]) => {
    const vals = list.map(item => parseFloat(item[colId]) || 0);
    return Math.max(...vals, 1);
  };

  const filteredData = useMemo(() => {
    if (!sheetConfig) return [];
    if (!searchTerm.trim()) return sheetConfig.data;
    
    const query = searchTerm.toLowerCase();
    return sheetConfig.data.filter((row: any) => {
      return Object.keys(row).some(key => {
        let val = row[key];
        if (typeof val === "function") return false;
        return String(val).toLowerCase().includes(query);
      });
    });
  }, [sheetConfig, searchTerm]);

  // System parameters in-place editor block
  const handleParamChange = (key: keyof SysParams, value: string) => {
    onUpdateParams({
      ...sysParams,
      [key]: value
    });
  };

  const currencySymbol = sysParams.VAL_CURRENCY || "$";

  // If the active group is parameters, show its unique form setup instead of standard table
  if (activeTabGroup === "params" || activeSubTab === "params") {
    return (
      <div className="animate-fade-up bg-white p-8 rounded-[var(--radius-lg)] shadow-md space-y-6">
        <div>
          <h3 className="font-heading text-lg font-bold text-[var(--color-primary)]">
            System Pricing Formulas & Constants
          </h3>
          <p className="text-xs text-[var(--color-muted)] mt-1">
            Global variables that dictate pricing scales, tax computation multipliers, and base metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
          {/* Const 1 */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono font-bold text-[var(--color-muted)] uppercase tracking-wider">
              VAL_HALF_FACTOR (Half-Factor)
            </label>
            <p className="text-[11px] text-[var(--color-muted)]">Price scaling applied when toppings are placed on only left/right half.</p>
            <input
              type="number"
              step="0.05"
              value={sysParams.VAL_HALF_FACTOR}
              onChange={(e) => handleParamChange("VAL_HALF_FACTOR", e.target.value)}
              className="w-full px-3 py-2 bg-[var(--color-input-bg)] text-xs border rounded-md text-[var(--color-primary)] font-semibold font-mono"
            />
          </div>

          {/* Const 2 */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono font-bold text-[var(--color-muted)] uppercase tracking-wider">
              VAL_EXTRA_MULT (Extra Portion Multiplier)
            </label>
            <p className="text-[11px] text-[var(--color-muted)]">Multiplier surcharge factor applied on Extra toppings requests.</p>
            <input
              type="number"
              step="0.05"
              value={sysParams.VAL_EXTRA_MULT}
              onChange={(e) => handleParamChange("VAL_EXTRA_MULT", e.target.value)}
              className="w-full px-3 py-2 bg-[var(--color-input-bg)] text-xs border rounded-md text-[var(--color-primary)] font-semibold font-mono"
            />
          </div>

          {/* Const 3 */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono font-bold text-[var(--color-muted)] uppercase tracking-wider">
              VAL_XXTRA_MULT (Double Extra Portion Multiplier)
            </label>
            <p className="text-[11px] text-[var(--color-muted)]">Multiplier surcharge factor applied on Double/Xxtra toppings requests.</p>
            <input
              type="number"
              step="0.05"
              value={sysParams.VAL_XXTRA_MULT}
              onChange={(e) => handleParamChange("VAL_XXTRA_MULT", e.target.value)}
              className="w-full px-3 py-2 bg-[var(--color-input-bg)] text-xs border rounded-md text-[var(--color-primary)] font-semibold font-mono"
            />
          </div>

          {/* Const 4 */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono font-bold text-[var(--color-muted)] uppercase tracking-wider">
              VAL_TAX_RATE (Default Sales Tax Rate)
            </label>
            <p className="text-[11px] text-[var(--color-muted)]">Base tax rate percentage applied during simulator checkout.</p>
            <input
              type="number"
              step="0.005"
              value={sysParams.VAL_TAX_RATE}
              onChange={(e) => handleParamChange("VAL_TAX_RATE", e.target.value)}
              className="w-full px-3 py-2 bg-[var(--color-input-bg)] text-xs border rounded-md text-[var(--color-primary)] font-semibold font-mono"
            />
          </div>

          {/* Const 5 */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono font-bold text-[var(--color-muted)] uppercase tracking-wider">
              VAL_CURRENCY (System Currency Symbol)
            </label>
            <p className="text-[11px] text-[var(--color-muted)]">Standard character used for pricing prefix layout calculations.</p>
            <input
              type="text"
              value={sysParams.VAL_CURRENCY}
              onChange={(e) => handleParamChange("VAL_CURRENCY", e.target.value)}
              className="w-full px-3 py-2 bg-[var(--color-input-bg)] text-xs border rounded-md text-[var(--color-primary)] font-semibold font-mono"
            />
          </div>
        </div>
      </div>
    );
  }

  if (!sheetConfig) return null;

  return (
    <div className="animate-fade-up space-y-6">
      
      {/* Sub tabs pill selector */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-3 rounded-lg shadow-sm border border-[var(--color-border)]">
        <div className="flex flex-wrap gap-1">
          {activeTabGroup === "menu" && (
            <>
              {["categories", "subcategories", "items", "sizes"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveSubTab(tab)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition-all duration-150 ${
                    activeSubTab === tab 
                      ? "bg-[var(--color-accent)] text-white shadow-sm" 
                      : "text-[var(--color-primary)] hover:bg-[var(--color-bg)]"
                  }`}
                >
                  {tab === "sizes" ? "Sizes & Prices" : tab}
                </button>
              ))}
            </>
          )}

          {activeTabGroup === "toppings" && (
            <>
              {["groups", "modifiers", "pricing"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveSubTab(tab)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition-all duration-150 ${
                    activeSubTab === tab 
                      ? "bg-[var(--color-accent)] text-white shadow-sm" 
                      : "text-[var(--color-primary)] hover:bg-[var(--color-bg)]"
                  }`}
                >
                  {tab === "groups" ? "Topping Groups" : tab === "pricing" ? "Pricing Rules Matrix" : tab}
                </button>
              ))}
            </>
          )}

          {activeTabGroup === "relations" && (
            <>
              {["defaults", "assignments", "rules"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveSubTab(tab)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition-all duration-150 ${
                    activeSubTab === tab 
                      ? "bg-[var(--color-accent)] text-white shadow-sm" 
                      : "text-[var(--color-primary)] hover:bg-[var(--color-bg)]"
                  }`}
                >
                  {tab === "defaults" ? "Default Exemptions" : tab === "assignments" ? "Group Assignments" : "Selection Rules"}
                </button>
              ))}
            </>
          )}
        </div>

        {/* Search, Add, CSV Import Button toolbar */}
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          {/* Search bar */}
          <div className="relative w-full sm:w-48">
            <span className="absolute inset-y-0 left-2.5 flex items-center text-gray-400">
              <Search size={13} />
            </span>
            <input
              type="text"
              placeholder="Search spreadsheet..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-md text-xs focus:outline-none focus:border-[var(--color-accent)] text-[var(--color-primary)]"
            />
          </div>

          {/* Bulk Import */}
          {sheetConfig.tableName && (
            <button
              onClick={() => {
                setIsImportModalOpen(true);
                setImportPreview([]);
                setCsvText("");
              }}
              title="Bulk CSV Import into this sheet"
              className="px-2.5 py-1.5 rounded-md border border-[var(--color-border)] hover:border-[var(--color-accent)] text-[var(--color-primary)] hover:text-[var(--color-accent)] bg-white text-xs font-semibold flex items-center space-x-1 transition-colors"
            >
              <Upload size={13} />
              <span className="hidden md:inline">Bulk Import</span>
            </button>
          )}

          {/* Add Row Button */}
          {sheetConfig.defaultRow && (
            <button
              onClick={() => onAddRow(sheetConfig.tableName!, sheetConfig.defaultRow)}
              className="px-2.5 py-1.5 bg-[var(--color-accent)] text-white text-xs font-bold rounded-md hover:opacity-90 active:scale-95 transition-all flex items-center space-x-1"
            >
              <Plus size={13} />
              <span>Add Row</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Card with Spreadsheet Data Grid */}
      <div className="bg-white rounded-[var(--radius-lg)] shadow-md overflow-hidden">
        {/* Header summary of Sub-sheet */}
        <div className="px-6 py-4 border-b border-[var(--color-border)]">
          <h4 className="font-heading text-base font-bold text-[var(--color-primary)]">
            {sheetConfig.title}
          </h4>
          <p className="text-xs text-[var(--color-muted)] mt-0.5">
            {sheetConfig.description}
          </p>
        </div>

        {/* Live Grid Table View */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse select-none">
            <thead>
              <tr className="bg-[var(--table-header-bg)] border-b-2 border-[var(--table-header-sep)] h-10">
                <th className="w-12 text-center text-table-head text-[var(--color-muted)] text-[10px] uppercase font-mono tracking-wider pl-4">#</th>
                {sheetConfig.columns.map(col => (
                  <th 
                    key={col.id} 
                    className={`px-4 text-[11px] font-semibold text-[var(--color-primary)] uppercase tracking-wider font-body ${
                      col.type === "price" || col.type === "number" ? "text-right" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-1 justify-start">
                      {col.type === "price" || col.type === "number" ? <div className="w-full text-right">{col.label}</div> : <span>{col.label}</span>}
                    </div>
                  </th>
                ))}
                {sheetConfig.defaultRow && <th className="w-16 text-center text-table-head text-[var(--color-muted)]">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={sheetConfig.columns.length + 2} className="text-center py-10 text-xs text-[var(--color-muted)] italic">
                    No spreadsheet records found matching your query.
                  </td>
                </tr>
              ) : (
                filteredData.map((row: any, rIdx: number) => {
                  const actualRowIndex = sheetConfig.data.findIndex((item: any) => {
                    const isMatch = sheetConfig.columns.find(col => col.isKey);
                    if (isMatch) {
                      return item[isMatch.id] === row[isMatch.id];
                    }
                    return JSON.stringify(item) === JSON.stringify(row);
                  });

                  return (
                    <tr 
                      key={rIdx} 
                      className={`border-b border-[var(--color-border)] hover:bg-[rgba(5,28,44,0.01)] transition-colors h-11 ${
                        row.Active_Status === "N" ? "opacity-60 bg-gray-50" : ""
                      }`}
                    >
                      <td className="text-center font-mono text-[10px] text-[var(--color-muted)] pl-4">{rIdx + 1}</td>
                      
                      {sheetConfig.columns.map(col => {
                        const cellVal = col.type === "calc" && col.valueFn ? col.valueFn(row) : row[col.id];

                        return (
                          <td 
                            key={col.id} 
                            className={`px-4 text-[12px] relative ${
                              col.type === "price" || col.type === "number" ? "text-right font-mono" : ""
                            }`}
                          >
                            {/* Proportional data-bar in background for numerical magnitude columns */}
                            {col.hasDataBar && typeof cellVal === "number" && (
                              <div className="absolute inset-y-1.5 left-2 right-2 rounded pointer-events-none overflow-hidden opacity-10">
                                <div 
                                  className="h-full bg-[var(--color-accent)]" 
                                  style={{ width: `${(cellVal / getColMax(col.id, sheetConfig.data)) * 100}%` }}
                                />
                              </div>
                            )}

                            {/* Render different cell content based on column type */}
                            {col.editable && sheetConfig.tableName ? (
                              col.type === "select" ? (
                                <select
                                  value={cellVal}
                                  onChange={(e) => handleCellChange(actualRowIndex, col.id, e.target.value)}
                                  className="px-2 py-1 bg-[var(--color-input-bg)] border border-transparent rounded focus:border-[var(--color-accent)] focus:outline-none text-[var(--color-primary)] text-[12px] font-semibold font-body"
                                >
                                  {col.options?.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                  ))}
                                </select>
                              ) : (
                                <input
                                  type={col.type === "number" || col.type === "price" ? "number" : "text"}
                                  step={col.type === "price" ? "0.05" : "1"}
                                  value={cellVal !== undefined ? cellVal : ""}
                                  onChange={(e) => {
                                    let v: any = e.target.value;
                                    if (col.type === "number" || col.type === "price") {
                                      v = parseFloat(v);
                                      if (isNaN(v)) v = 0;
                                    }
                                    handleCellChange(actualRowIndex, col.id, v);
                                  }}
                                  className={`px-2 py-0.5 w-full bg-[var(--color-input-bg)] border border-transparent rounded focus:border-[var(--color-accent)] focus:outline-none text-[var(--color-primary)] text-[12px] font-semibold ${
                                    col.type === "price" || col.type === "number" ? "text-right font-mono" : ""
                                  }`}
                                />
                              )
                            ) : (
                              // Read only formula or calculated lookups cells
                              <span className={`font-semibold ${col.type === "calc" ? "text-[var(--color-accent)] italic" : "text-[var(--color-primary)]"}`}>
                                {col.type === "price" 
                                  ? `${currencySymbol}${typeof cellVal === "number" ? cellVal.toFixed(2) : parseFloat(cellVal || 0).toFixed(2)}` 
                                  : cellVal}
                              </span>
                            )}
                          </td>
                        );
                      })}

                      {/* Row actions */}
                      {sheetConfig.defaultRow && (
                        <td className="text-center">
                          <button
                            onClick={() => onDeleteRow(sheetConfig.tableName!, actualRowIndex)}
                            className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 size={13} />
                          </button>
                        </td>
                      )}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CSV Bulk Import Dialog Box Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 bg-[rgba(5,28,44,0.4)] backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[var(--radius-lg)] shadow-lg max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col">
            
            {/* Header */}
            <div className="px-6 py-4 bg-[var(--color-primary)] text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileSpreadsheet size={18} />
                <h3 className="font-heading text-sm font-bold uppercase tracking-wider">
                  Bulk CSV Spreadsheet Ingest
                </h3>
              </div>
              <button 
                onClick={() => setIsImportModalOpen(false)}
                className="text-gray-300 hover:text-white text-xs uppercase tracking-wider"
              >
                Close
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="bg-[var(--insight-bg)] border-l-3 border-[var(--color-accent)] p-3 rounded-r-md">
                <p className="text-[11px] text-[var(--color-body-text)] leading-relaxed">
                  Bulk load data for <strong>{sheetConfig.title}</strong>. Paste raw values separated by commas. Make sure headers exactly match table keys:
                  <code className="block mt-1 font-mono text-[10px] bg-white p-1 rounded border">
                    {sheetConfig.columns.filter(c => c.type !== "calc").map(c => c.id).join(", ")}
                  </code>
                </p>
              </div>

              {/* Mode Options */}
              <div className="flex items-center space-x-6 text-xs font-semibold">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="importMode"
                    checked={importMergeMode}
                    onChange={() => setImportMergeMode(true)}
                    className="accent-[var(--color-accent)]"
                  />
                  <span>Merge/Update existing (Matches SKU/ID)</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="importMode"
                    checked={!importMergeMode}
                    onChange={() => setImportMergeMode(false)}
                    className="accent-[var(--color-accent)]"
                  />
                  <span>Clear & Replace whole sheet</span>
                </label>
              </div>

              {/* Textarea */}
              <div className="space-y-1">
                <label className="block text-[10px] text-[var(--color-muted)] uppercase tracking-wider font-mono font-bold">
                  Comma-Separated Values (CSV)
                </label>
                <textarea
                  rows={6}
                  placeholder={`Category_ID,Category_Name,Display_Order,Active_Status\nCAT004,Desserts,4,Y\nCAT005,Beverages,5,Y`}
                  value={csvText}
                  onChange={(e) => setCsvText(e.target.value)}
                  className="w-full p-3 font-mono text-[11px] bg-[var(--color-input-bg)] border rounded-md focus:outline-none focus:border-[var(--color-accent)] text-[var(--color-primary)]"
                />
              </div>

              {/* Run Parse Button */}
              <button
                type="button"
                onClick={handleCsvParse}
                className="px-4 py-2 bg-[var(--color-primary)] text-white text-xs font-bold rounded hover:opacity-90 transition-all shadow-sm"
              >
                Dry Run Parse & Validate
              </button>

              {/* Preview parsed grid */}
              {importPreview.length > 0 && (
                <div className="space-y-2 pt-2">
                  <h4 className="text-[11px] font-bold text-[var(--color-primary)] uppercase tracking-wider font-mono">
                    Parsed Grid Preview ({importPreview.length} rows detected)
                  </h4>
                  <div className="overflow-x-auto border rounded-md max-h-40 overflow-y-auto bg-[var(--color-bg)]">
                    <table className="w-full text-left text-[11px] border-collapse font-mono">
                      <thead>
                        <tr className="bg-gray-200 border-b">
                          {Object.keys(importPreview[0]).map(k => (
                            <th key={k} className="px-2 py-1 text-[var(--color-primary)]">{k}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {importPreview.map((row, idx) => (
                          <tr key={idx} className="border-b bg-white hover:bg-slate-50">
                            {Object.values(row).map((v: any, vIdx) => (
                              <td key={vIdx} className="px-2 py-1">{v}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-[var(--color-border)] bg-[var(--color-bg)] flex justify-end space-x-2">
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="px-4 py-2 border border-[var(--color-border)] text-[var(--color-primary)] text-xs font-bold rounded-md bg-white hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={importPreview.length === 0}
                onClick={handleApplyImport}
                className="px-4 py-2 bg-[var(--color-accent)] text-white text-xs font-bold rounded-md hover:opacity-95 transition-all flex items-center space-x-1 disabled:opacity-50"
              >
                <Check size={12} />
                <span>Execute Bulk Ingest</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
