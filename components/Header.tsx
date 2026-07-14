'use client';

import React, { useRef } from "react";
import { 
  FileText, 
  Download, 
  Upload, 
  RotateCcw, 
  Save, 
  Layers, 
  Sliders, 
  Pizza, 
  Share2,
  FileSpreadsheet
} from "lucide-react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  lastSaved: string;
  onExport: () => void;
  onImport: (file: File) => void;
  onReset: () => void;
}

export default function Header({
  activeTab,
  setActiveTab,
  lastSaved,
  onExport,
  onImport,
  onReset
}: HeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImport(e.target.files[0]);
    }
  };

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: Layers },
    { id: "menu", label: "Menu Master", icon: Pizza },
    { id: "toppings", label: "Toppings Master", icon: Sliders },
    { id: "relations", label: "Relations & Rules", icon: FileSpreadsheet },
    { id: "simulator", label: "Order Simulator", icon: FileText },
    { id: "pos", label: "POS Export", icon: Share2 }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[var(--color-border)] shadow-nav h-14 select-none">
      <div className="max-w-[1400px] mx-auto px-10 h-full flex items-center justify-between">
        {/* Left Side: Brand Logo & Label */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab("dashboard")}>
          <div className="w-8 h-8 rounded-lg bg-[var(--color-accent)] flex items-center justify-center text-white shadow-sm transition-transform hover:scale-105 active:scale-95 duration-200">
            <Pizza size={18} className="stroke-[2.5]" />
          </div>
          <div>
            <h1 className="font-heading text-lg font-bold text-[var(--color-primary)] tracking-tight leading-none">
              Boulevard Pizza
            </h1>
            <span className="text-[10px] text-[var(--color-muted)] font-mono tracking-wider uppercase">
              Pricing Master Workbook
            </span>
          </div>
        </div>

        {/* Middle: Horizontal Tabs switching views */}
        <nav className="hidden lg:flex items-center h-full space-x-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 h-14 text-xs font-semibold uppercase tracking-wider relative transition-colors duration-200 ${
                  isActive 
                    ? "text-[var(--color-accent)]" 
                    : "text-[var(--nav-text-inactive)] hover:text-[var(--color-primary)]"
                }`}
              >
                <Icon size={14} className="stroke-[2]" />
                <span>{tab.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-4 right-4 h-[3px] bg-[var(--color-accent)] rounded-t-sm" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Side: Backups, Actions, Last Saved */}
        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex flex-col items-end text-right mr-2 font-mono text-[11px]">
            <div className="flex items-center text-[var(--color-muted)] space-x-1">
              <Save size={11} className="stroke-[1.5]" />
              <span>Auto-saved to LocalStorage</span>
            </div>
            <span className="text-[var(--color-body-text)] font-semibold">
              {lastSaved ? `Last saved: ${lastSaved}` : "Saving..."}
            </span>
          </div>

          <div className="flex items-center bg-[var(--color-bg)] rounded-md p-1 border border-[var(--color-border)]">
            <button
              onClick={onExport}
              title="Export Full Backup (JSON)"
              className="p-1.5 rounded text-[var(--color-primary)] hover:bg-white hover:shadow-sm transition-all duration-150 btn-active-effect"
            >
              <Download size={14} className="stroke-[2]" />
            </button>
            <button
              onClick={handleImportClick}
              title="Import Backup (JSON)"
              className="p-1.5 rounded text-[var(--color-primary)] hover:bg-white hover:shadow-sm transition-all duration-150 btn-active-effect"
            >
              <Upload size={14} className="stroke-[2]" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json"
              className="hidden"
            />
            <div className="w-[1px] h-4 bg-[var(--color-border)] mx-1" />
            <button
              onClick={onReset}
              title="Reset to Seed Data"
              className="p-1.5 rounded text-[var(--color-negative)] hover:bg-white hover:shadow-sm transition-all duration-150 btn-active-effect"
            >
              <RotateCcw size={14} className="stroke-[2]" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
