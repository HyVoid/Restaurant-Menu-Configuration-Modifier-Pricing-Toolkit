/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useState, useEffect, useMemo } from "react";
import Header from "../components/Header";
import DashboardTab from "../components/DashboardTab";
import OrderSimulatorTab from "../components/OrderSimulatorTab";
import TableTabs from "../components/TableTabs";
import { defaultWorkbookState } from "../lib/defaultData";
import { WorkbookState, ModifierPricingRule, OrderSession, SysParams } from "../lib/types";
import { Copy, Download, Share2, FileSpreadsheet, CheckCircle } from "lucide-react";

export default function Page() {
  const [state, setState] = useState<WorkbookState>(defaultWorkbookState);
  const [lastSaved, setLastSaved] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [activeSubTab, setActiveSubTab] = useState<string>("categories");
  const [isClient, setIsClient] = useState(false);
  const [posSearchText, setPosSearchText] = useState("");

  // Sync isClient flag on mount to avoid hydration warnings
  useEffect(() => {
    setIsClient(true);
    const local = localStorage.getItem("restaurant_menu_master_state");
    if (local) {
      try {
        setState(JSON.parse(local));
      } catch (e) {
        console.error("Failed to parse localized spreadsheet state, booting from seeds.");
      }
    }
    const savedTime = localStorage.getItem("restaurant_menu_master_last_saved");
    if (savedTime) {
      setLastSaved(savedTime);
    } else {
      const now = new Date().toLocaleTimeString();
      setLastSaved(now);
    }
  }, []);

  // Sync to localStorage on state changes
  useEffect(() => {
    if (!isClient) return;
    localStorage.setItem("restaurant_menu_master_state", JSON.stringify(state));
    const nowStr = new Date().toLocaleTimeString();
    localStorage.setItem("restaurant_menu_master_last_saved", nowStr);
    setLastSaved(nowStr);
  }, [state, isClient]);

  // Core Pricing Surcharge Rules Matrix Engine (Auto-derived Cartesian product, Section V.7)
  const pricingRules = useMemo<ModifierPricingRule[]>(() => {
    const list: ModifierPricingRule[] = [];
    const sizesList = ["Small", "Medium", "Large"];
    const positionsList = ["Whole", "Left", "Right"];
    const portionsList = ["Normal", "Light", "Extra", "Xxtra"];

    const halfFactor = parseFloat(state.sysParams.VAL_HALF_FACTOR) || 0.50;
    const extraMult = parseFloat(state.sysParams.VAL_EXTRA_MULT) || 1.50;
    const xxtraMult = parseFloat(state.sysParams.VAL_XXTRA_MULT) || 2.00;

    state.modifiers.forEach(mod => {
      sizesList.forEach(sz => {
        let baseSizePrice = 0;
        if (sz === "Small") baseSizePrice = mod.Price_Small || 0;
        else if (sz === "Medium") baseSizePrice = mod.Price_Medium || 0;
        else if (sz === "Large") baseSizePrice = mod.Price_Large || 0;

        positionsList.forEach(pos => {
          portionsList.forEach(port => {
            const ruleId = `${mod.Modifier_ID}_${sz.toUpperCase()}_${pos.toUpperCase()}_${port.toUpperCase()}`;
            
            // Formula Logic (Section V.7): Final_Price = Base_Size_Price * position_factor * portion_factor
            const posFactor = (pos === "Left" || pos === "Right") ? halfFactor : 1.0;
            const portFactor = (port === "Extra") ? extraMult : (port === "Xxtra" ? xxtraMult : 1.0);
            const finalPrice = baseSizePrice * posFactor * portFactor;

            list.push({
              Rule_ID: ruleId,
              Modifier_ID: mod.Modifier_ID,
              Modifier_Name: mod.Modifier_Name,
              Size_Name: sz,
              Position: pos,
              Portion_Level: port,
              Base_Size_Price: baseSizePrice,
              Final_Price: finalPrice
            });
          });
        });
      });
    });

    return list;
  }, [state.modifiers, state.sysParams]);

  // State manipulation handlers
  const handleUpdateRow = (tableName: keyof WorkbookState, rowIndex: number, field: string, value: any) => {
    setState(prev => {
      const updatedList = [...(prev[tableName] as any[])];
      if (updatedList[rowIndex]) {
        updatedList[rowIndex] = { ...updatedList[rowIndex], [field]: value };
      }
      return { ...prev, [tableName]: updatedList };
    });
  };

  const handleAddRow = (tableName: keyof WorkbookState, newRow: any) => {
    setState(prev => {
      const updatedList = [...(prev[tableName] as any[]), newRow];
      return { ...prev, [tableName]: updatedList };
    });
  };

  const handleDeleteRow = (tableName: keyof WorkbookState, rowIndex: number) => {
    setState(prev => {
      const updatedList = (prev[tableName] as any[]).filter((_, idx) => idx !== rowIndex);
      return { ...prev, [tableName]: updatedList };
    });
  };

  const handleBulkImport = (tableName: keyof WorkbookState, rows: any[], merge: boolean) => {
    setState(prev => {
      if (!merge) {
        return { ...prev, [tableName]: rows };
      }

      // Merge Mode (Key column comparison)
      const primaryKeys: { [key: string]: string } = {
        categories: "Category_ID",
        subcategories: "Subcategory_ID",
        items: "Item_ID",
        sizes: "SKU_ID",
        modifierGroups: "Mod_Group_ID",
        modifiers: "Modifier_ID",
        defaultModifiers: "Default_ID",
        groupAssignment: "Assign_ID",
        selectionRules: "Rule_ID"
      };

      const keyCol = primaryKeys[tableName] || "";
      if (!keyCol) {
        return { ...prev, [tableName]: [...(prev[tableName] as any[]), ...rows] };
      }

      const existingList = [...(prev[tableName] as any[])];
      rows.forEach(importedRow => {
        const matchIdx = existingList.findIndex(e => String(e[keyCol]) === String(importedRow[keyCol]));
        if (matchIdx > -1) {
          existingList[matchIdx] = { ...existingList[matchIdx], ...importedRow };
        } else {
          existingList.push(importedRow);
        }
      });

      return { ...prev, [tableName]: existingList };
    });
  };

  const handleUpdateParams = (newParams: SysParams) => {
    setState(prev => ({
      ...prev,
      sysParams: newParams
    }));
  };

  // Order Simulator Session CRUD
  const handleAddSession = (session: OrderSession) => {
    setState(prev => ({
      ...prev,
      orderSessions: [session, ...prev.orderSessions]
    }));
  };

  const handleDeleteSession = (sessionId: string) => {
    setState(prev => ({
      ...prev,
      orderSessions: prev.orderSessions.filter(s => s.Session_ID !== sessionId)
    }));
  };

  const handleUpdateSession = (session: OrderSession) => {
    setState(prev => ({
      ...prev,
      orderSessions: prev.orderSessions.map(s => s.Session_ID === session.Session_ID ? session : s)
    }));
  };

  // Backups and Resets
  const handleExportBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "boulevard_menu_master_backup.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportBackup = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string);
        if (parsed.sysParams && parsed.categories) {
          setState(parsed);
          alert("Backup successfully restored!");
        } else {
          alert("Invalid backup JSON schema structure!");
        }
      } catch (err) {
        alert("Failed to parse backup file.");
      }
    };
    reader.readAsText(file);
  };

  const handleResetData = () => {
    if (confirm("Are you sure you want to revert all changes to the original seed data? This deletes current configurations.")) {
      setState(defaultWorkbookState);
    }
  };

  // Navigate across Subtabs smoothly
  const handleTabGroupSelect = (tabGroupId: string) => {
    setActiveTab(tabGroupId);
    if (tabGroupId === "menu") setActiveSubTab("categories");
    else if (tabGroupId === "toppings") setActiveSubTab("groups");
    else if (tabGroupId === "relations") setActiveSubTab("defaults");
  };

  // Generate flat POS CSV output
  const posCsvContent = useMemo(() => {
    const header = "POS_Item_ID,POS_Item_Name,Base_Price,Modifier_Group,POS_Modifier_ID,POS_Mod_Name,Final_Mod_Price\n";
    
    const rows = pricingRules.map(rule => {
      // Map modifier pricing row to active pizzas
      const mod = state.modifiers.find(m => m.Modifier_ID === rule.Modifier_ID);
      const modGroupName = mod ? (state.modifierGroups.find(g => g.Mod_Group_ID === mod.Default_Group_ID)?.Mod_Group_Name || "Toppings") : "Toppings";
      
      const itemId = state.items[0]?.Item_ID || "ITEM001";
      const itemName = state.items[0]?.Item_Name || "Pizza";
      const itemBasePrice = state.sizes.find(s => s.Item_ID === itemId && s.Size_Name === rule.Size_Name)?.Base_Price || 12.99;

      return `${itemId}_${rule.Size_Name.toUpperCase()},${itemName} - ${rule.Size_Name},${itemBasePrice.toFixed(2)},${modGroupName},${rule.Rule_ID},${rule.Modifier_Name} (${rule.Position}/${rule.Portion_Level}),${rule.Final_Price.toFixed(2)}`;
    });

    return header + rows.join("\n");
  }, [pricingRules, state]);

  // Copy POS CSV to Clipboard
  const handleCopyPosCsv = () => {
    navigator.clipboard.writeText(posCsvContent);
    alert("POS Export CSV copied to clipboard!");
  };

  // Download POS CSV File
  const handleDownloadPosCsv = () => {
    const dataStr = "data:text/csv;charset=utf-8," + encodeURIComponent(posCsvContent);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "boulevard_pos_menu_export.csv");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Filtered flat export view rows
  const filteredExportRows = useMemo(() => {
    const query = posSearchText.toLowerCase();
    const allRows = pricingRules.map(rule => {
      const mod = state.modifiers.find(m => m.Modifier_ID === rule.Modifier_ID);
      const modGroupName = mod ? (state.modifierGroups.find(g => g.Mod_Group_ID === mod.Default_Group_ID)?.Mod_Group_Name || "Toppings") : "Toppings";
      const itemId = state.items[0]?.Item_ID || "ITEM001";
      const itemName = state.items[0]?.Item_Name || "Pizza";
      const itemBasePrice = state.sizes.find(s => s.Item_ID === itemId && s.Size_Name === rule.Size_Name)?.Base_Price || 12.99;

      return {
        POS_Item_ID: `${itemId}_${rule.Size_Name.toUpperCase()}`,
        POS_Item_Name: `${itemName} - ${rule.Size_Name}`,
        Base_Price: itemBasePrice,
        Modifier_Group: modGroupName,
        POS_Modifier_ID: rule.Rule_ID,
        POS_Mod_Name: `${rule.Modifier_Name} (${rule.Position}/${rule.Portion_Level})`,
        Final_Mod_Price: rule.Final_Price
      };
    });

    if (!query) return allRows.slice(0, 50); // limit preview lines for render speed

    return allRows.filter(row => {
      return (
        row.POS_Item_ID.toLowerCase().includes(query) ||
        row.POS_Item_Name.toLowerCase().includes(query) ||
        row.Modifier_Group.toLowerCase().includes(query) ||
        row.POS_Modifier_ID.toLowerCase().includes(query) ||
        row.POS_Mod_Name.toLowerCase().includes(query)
      );
    }).slice(0, 100);
  }, [pricingRules, state, posSearchText]);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-[#F5F5F2] flex items-center justify-center font-mono text-xs text-[var(--color-primary)]">
        Loading Restaurant Pricing Master Workbook...
      </div>
    );
  }

  const currencySymbol = state.sysParams.VAL_CURRENCY || "$";

  return (
    <div className="min-h-screen bg-[#F5F5F2] text-[var(--color-body-text)]">
      
      {/* Horizonal Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleTabGroupSelect}
        lastSaved={lastSaved}
        onExport={handleExportBackup}
        onImport={handleImportBackup}
        onReset={handleResetData}
      />

      {/* Main Content Area centered, max-width 1400px, 40px left/right padding */}
      <main className="max-w-[1400px] mx-auto px-10 py-10">
        
        {/* Render Active View Tab */}
        {activeTab === "dashboard" && (
          <DashboardTab
            state={state}
            pricingRules={pricingRules}
            setActiveTab={handleTabGroupSelect}
            setActiveSubTab={setActiveSubTab}
          />
        )}

        {/* Categories, Subcategories, Items, Sizes Setup */}
        {activeTab === "menu" && (
          <TableTabs
            state={state}
            pricingRules={pricingRules}
            activeSubTab={activeSubTab}
            setActiveSubTab={setActiveSubTab}
            onUpdateRow={handleUpdateRow}
            onAddRow={handleAddRow}
            onDeleteRow={handleDeleteRow}
            onBulkImport={handleBulkImport}
            onUpdateParams={handleUpdateParams}
            activeTabGroup="menu"
          />
        )}

        {/* Toppings, Topping Groups, Derived Pricing Matrix */}
        {activeTab === "toppings" && (
          <TableTabs
            state={state}
            pricingRules={pricingRules}
            activeSubTab={activeSubTab}
            setActiveSubTab={setActiveSubTab}
            onUpdateRow={handleUpdateRow}
            onAddRow={handleAddRow}
            onDeleteRow={handleDeleteRow}
            onBulkImport={handleBulkImport}
            onUpdateParams={handleUpdateParams}
            activeTabGroup="toppings"
          />
        )}

        {/* Default Exempt Toppings, Group Assignment, Selection Constraints */}
        {activeTab === "relations" && (
          <TableTabs
            state={state}
            pricingRules={pricingRules}
            activeSubTab={activeSubTab}
            setActiveSubTab={setActiveSubTab}
            onUpdateRow={handleUpdateRow}
            onAddRow={handleAddRow}
            onDeleteRow={handleDeleteRow}
            onBulkImport={handleBulkImport}
            onUpdateParams={handleUpdateParams}
            activeTabGroup="relations"
          />
        )}

        {/* Checkout Surcharges Simulator */}
        {activeTab === "simulator" && (
          <OrderSimulatorTab
            state={state}
            pricingRules={pricingRules}
            onAddSession={handleAddSession}
            onDeleteSession={handleDeleteSession}
            onUpdateSession={handleUpdateSession}
          />
        )}

        {/* flat POS Export CSV tab */}
        {activeTab === "pos" && (
          <div className="animate-fade-up space-y-6">
            
            {/* Title */}
            <div>
              <h2 className="font-heading text-page-title font-bold text-[var(--color-primary)]">
                Point-of-Sale Pricing Rules Export
              </h2>
              <p className="text-xs text-[var(--color-muted)] font-mono uppercase tracking-wider mt-1">
                Download or copy clean CSV data designed for Toast / FoodTec / NCR restaurant checkout backends
              </p>
            </div>

            {/* Quick Actions Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded-[var(--radius-lg)] shadow-md">
              <div className="space-y-2">
                <h4 className="font-heading text-sm font-bold text-[var(--color-primary)]">Export CSV Data</h4>
                <p className="text-xs text-[var(--color-muted)]">Download the fully calculated modifier pricing matrix containing item sizes, base pricing, and portion factors.</p>
                <div className="pt-2 flex gap-2">
                  <button
                    onClick={handleCopyPosCsv}
                    className="px-3 py-1.5 bg-[var(--color-primary)] text-white text-xs font-bold rounded hover:opacity-90 transition-all flex items-center space-x-1"
                  >
                    <Copy size={13} />
                    <span>Copy CSV</span>
                  </button>
                  <button
                    onClick={handleDownloadPosCsv}
                    className="px-3 py-1.5 bg-[var(--color-accent)] text-white text-xs font-bold rounded hover:opacity-90 transition-all flex items-center space-x-1"
                  >
                    <Download size={13} />
                    <span>Download CSV</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <h4 className="font-heading text-sm font-bold text-[var(--color-primary)]">Search Derived POS Combinations</h4>
                <p className="text-xs text-[var(--color-muted)]">Quickly inspect mapped outputs before uploading to your store front.</p>
                <input
                  type="text"
                  placeholder="Search item SKU, topping ID, or rules..."
                  value={posSearchText}
                  onChange={(e) => setPosSearchText(e.target.value)}
                  className="w-full px-3 py-2 bg-[var(--color-input-bg)] border rounded-md text-xs focus:outline-none focus:border-[var(--color-accent)] text-[var(--color-primary)] font-mono"
                />
              </div>
            </div>

            {/* Excel Preview Grid */}
            <div className="bg-white rounded-[var(--radius-lg)] shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-bg)] flex justify-between items-center">
                <span className="text-xs font-bold font-mono text-[var(--color-primary)]">PREVIEWING {filteredExportRows.length} RECORDS</span>
                <span className="text-[10px] font-mono text-[var(--color-muted)] uppercase">Limited to 100 entries for high speed</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs font-mono">
                  <thead>
                    <tr className="bg-gray-100 border-b">
                      <th className="px-4 py-2 font-semibold">POS_Item_ID</th>
                      <th className="px-4 py-2 font-semibold">POS_Item_Name</th>
                      <th className="px-4 py-2 font-semibold text-right">Base_Price</th>
                      <th className="px-4 py-2 font-semibold">Modifier_Group</th>
                      <th className="px-4 py-2 font-semibold">POS_Modifier_ID</th>
                      <th className="px-4 py-2 font-semibold">POS_Mod_Name</th>
                      <th className="px-4 py-2 font-semibold text-right font-bold">Final_Mod_Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredExportRows.map((row, idx) => (
                      <tr key={idx} className="border-b hover:bg-slate-50">
                        <td className="px-4 py-2 font-semibold text-[var(--color-accent)]">{row.POS_Item_ID}</td>
                        <td className="px-4 py-2">{row.POS_Item_Name}</td>
                        <td className="px-4 py-2 text-right">{currencySymbol}{row.Base_Price.toFixed(2)}</td>
                        <td className="px-4 py-2 font-semibold text-[var(--color-primary)]">{row.Modifier_Group}</td>
                        <td className="px-4 py-2 text-gray-500">{row.POS_Modifier_ID}</td>
                        <td className="px-4 py-2 text-[var(--color-body-text)]">{row.POS_Mod_Name}</td>
                        <td className="px-4 py-2 text-right font-bold text-[var(--color-primary)]">{currencySymbol}{row.Final_Mod_Price.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}
