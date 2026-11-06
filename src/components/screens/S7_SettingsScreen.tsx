import React, { useState } from 'react';
import {
  ArrowLeft,
  Globe,
  Navigation,
  Palette,
  Shield,
  HardDrive,
  Info,
  Check,
  ChevronRight,
  Trash2,
} from 'lucide-react';
import { CoordinateFormat, LanguageMode, ThemeMode } from '../../types';
import { I18N, THEMES_LIST } from '../../constants/theme';

interface S7SettingsScreenProps {
  theme: ThemeMode;
  onSetTheme: (t: ThemeMode) => void;
  language: LanguageMode;
  onSetLanguage: (l: LanguageMode) => void;
  coordFormat: CoordinateFormat;
  onSetCoordFormat: (f: CoordinateFormat) => void;
  onBack: () => void;
}

export const S7_SettingsScreen: React.FC<S7SettingsScreenProps> = ({
  theme,
  onSetTheme,
  language,
  onSetLanguage,
  coordFormat,
  onSetCoordFormat,
  onBack,
}) => {
  const isDark = theme === 'dark';
  const t = I18N[language];
  const [activeTab, setActiveTab] = useState<'lang' | 'coord' | 'theme' | 'security' | 'storage' | 'about'>('lang');
  const [digits, setDigits] = useState('4');

  const navItems = [
    { id: 'lang', label: 'Language & Locale', icon: Globe },
    { id: 'coord', label: 'Coordinates & CRS', icon: Navigation },
    { id: 'theme', label: 'Appearance & Theme', icon: Palette },
    { id: 'security', label: 'Security & Passcode', icon: Shield },
    { id: 'storage', label: 'Offline Storage & Cache', icon: HardDrive },
    { id: 'about', label: 'About MapX v1', icon: Info },
  ];

  return (
    <div
      className={`w-full h-full flex flex-col select-none transition-colors ${
        isDark ? 'bg-[#0A1A3A] text-white' : 'bg-[#EEF1F6] text-[#0A1A3A]'
      }`}
    >
      {/* Top Bar */}
      <header
        className={`h-14 px-4 border-b flex items-center justify-between shrink-0 ${
          isDark ? 'bg-[#0F2147] border-[#2A4478]' : 'bg-[#E3E8F0] border-[#C3CCDA]'
        }`}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className={`w-9 h-9 rounded-xl flex items-center justify-center ${
              isDark ? 'hover:bg-[#16305F]' : 'hover:bg-[#CBD5E1]'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-bold">{t.settings}</h1>
        </div>
      </header>

      {/* Two-Pane Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Nav Pane */}
        <div
          className={`w-64 border-r p-3 space-y-1 shrink-0 overflow-y-auto ${
            isDark ? 'border-[#2A4478] bg-[#0F2147]/60' : 'border-[#C3CCDA] bg-white/60'
          }`}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full px-3 py-2.5 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-all ${
                  isActive
                    ? 'bg-[#3B6FD6] text-white shadow'
                    : isDark
                    ? 'hover:bg-[#16305F] text-[#B8C4DC]'
                    : 'hover:bg-[#E2E8F0] text-[#46546F]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>
            );
          })}
        </div>

        {/* Right Detail Pane */}
        <div className="flex-1 p-6 overflow-y-auto max-w-2xl space-y-6">
          {/* TAB 1: Language */}
          {activeTab === 'lang' && (
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-[#7F93B8] uppercase">Application Language</h2>
              <div className="space-y-2">
                {[
                  { id: 'en', label: 'English (US / Tactical)', desc: 'Standard military terminology, LTR layout' },
                  { id: 'ar', label: 'العربية (Arabic)', desc: 'واجهة عربية كاملة، اتجاه RTL مع دعم الأرقام الثنائية' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onSetLanguage(item.id as LanguageMode)}
                    className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      language === item.id
                        ? 'border-[#3B6FD6] bg-[#3B6FD6]/15 font-bold text-[#3B6FD6]'
                        : isDark
                        ? 'border-[#2A4478] bg-[#16305F]/60 text-[#B8C4DC]'
                        : 'border-[#C3CCDA] bg-white text-[#46546F]'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-bold">{item.label}</div>
                      <div className="text-xs text-[#7F93B8] mt-0.5">{item.desc}</div>
                    </div>
                    {language === item.id && <Check className="w-5 h-5 text-[#3B6FD6]" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Coordinates */}
          {activeTab === 'coord' && (
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-[#7F93B8] uppercase">Primary Coordinate Format</h2>
              <div className="space-y-2">
                {[
                  { id: 'DD', label: 'DD (Decimal Degrees)', example: '26.550200° N, 56.262500° E' },
                  { id: 'DDM', label: 'DDM (Deg Dec Minutes)', example: "26° 33.0120' N, 56° 15.7500' E" },
                  { id: 'DMS', label: 'DMS (Deg Min Seconds)', example: '26° 33\' 00.72" N, 56° 15\' 45.00" E' },
                  { id: 'UTM', label: 'UTM (Universal Transverse Mercator)', example: 'Zone 40R 426500m E, 2936200m N' },
                  { id: 'MGRS', label: 'MGRS (Military Grid Reference System)', example: '40R DQ 26500 36200' },
                ].map((fmt) => (
                  <button
                    key={fmt.id}
                    onClick={() => onSetCoordFormat(fmt.id as CoordinateFormat)}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      coordFormat === fmt.id
                        ? 'border-[#3B6FD6] bg-[#3B6FD6]/15 font-bold text-[#3B6FD6]'
                        : isDark
                        ? 'border-[#2A4478] bg-[#16305F]/60 text-[#B8C4DC]'
                        : 'border-[#C3CCDA] bg-white text-[#46546F]'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">{fmt.label}</div>
                      <div className="text-[11px] font-mono text-[#7F93B8] mt-0.5">{fmt.example}</div>
                    </div>
                    {coordFormat === fmt.id && <Check className="w-4 h-4 text-[#3B6FD6]" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Theme */}
          {activeTab === 'theme' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-[#7F93B8] uppercase">
                  Appearance & Tactical Color Themes ({THEMES_LIST.length})
                </h2>
                <span className="text-xs text-[#3B6FD6] font-mono font-bold">
                  Active: {THEMES_LIST.find((t) => t.id === theme)?.name}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {THEMES_LIST.map((th) => {
                  const isActive = theme === th.id;
                  return (
                    <button
                      key={th.id}
                      onClick={() => onSetTheme(th.id)}
                      className={`p-4 rounded-2xl border text-left space-y-2.5 transition-all ${
                        isActive
                          ? 'border-[#3B6FD6] ring-2 ring-[#3B6FD6]/50 bg-[#16305F] shadow-lg'
                          : 'border-current/15 bg-black/10 hover:bg-black/20'
                      }`}
                    >
                      <div
                        className="w-full h-12 rounded-xl border border-white/15 flex items-center px-3 gap-2 overflow-hidden shadow-inner"
                        style={{ backgroundColor: th.previewBg }}
                      >
                        <span
                          className="w-4 h-4 rounded-full shadow-sm"
                          style={{ backgroundColor: th.accentColor }}
                        />
                        <span
                          className="w-12 h-2.5 rounded-full"
                          style={{ backgroundColor: th.previewPanel }}
                        />
                        <span
                          className="w-6 h-2 rounded-full opacity-60"
                          style={{ backgroundColor: th.accentSecondary }}
                        />
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">{th.name}</span>
                          {isActive && <Check className="w-4 h-4 text-[#10B981]" />}
                        </div>
                        <p className="text-[10px] text-[#7F93B8] line-clamp-1 mt-0.5">
                          {th.subtitle}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 5: Storage */}
          {activeTab === 'storage' && (
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-[#7F93B8] uppercase">Offline Storage</h2>
              <div
                className={`p-4 rounded-2xl border space-y-3 ${
                  isDark ? 'bg-[#0F2147] border-[#2A4478]' : 'bg-white border-[#C3CCDA]'
                }`}
              >
                <div className="flex justify-between items-center text-xs">
                  <span>Offline Map Tiles (MBTiles)</span>
                  <span className="font-mono font-bold">1.87 GB</span>
                </div>
                <div className="w-full h-2 rounded-full bg-black/20 overflow-hidden">
                  <div className="h-full bg-[#3B6FD6] w-2/5" />
                </div>
                <button
                  onClick={() => alert('Map cache purged')}
                  className="px-3 py-1.5 rounded-lg border border-[#E3201B] text-[#E3201B] text-xs font-semibold flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Purge Tile Cache</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 6: About */}
          {activeTab === 'about' && (
            <div className="space-y-3 text-xs leading-relaxed">
              <h2 className="text-sm font-bold text-[#7F93B8] uppercase">MapX Tactical Briefing Engine</h2>
              <p>
                Version 1.0.0 (Build 2026.11) • Master Specification v1.0 • Native Android Architecture
              </p>
              <p className="text-[#7F93B8]">
                MapX is engineered for 100% offline tactical visualization, geospatial mission planning,
                and broadcast television presentation. All data stays strictly on-device in encrypted SQLite/GeoPackage stores.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
