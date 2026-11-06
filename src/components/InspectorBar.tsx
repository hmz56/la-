import React, { useState } from 'react';
import {
  Monitor,
  Tablet,
  Smartphone,
  Maximize2,
  Moon,
  Sun,
  Globe,
  Layers,
  Bug,
  Type,
  ChevronDown,
  Sparkles,
  Palette,
  Check,
} from 'lucide-react';
import { LanguageMode, LayoutMode, ScreenId, ThemeMode } from '../types';
import { I18N, THEMES_LIST } from '../constants/theme';

interface InspectorBarProps {
  layoutMode: LayoutMode;
  setLayoutMode: (mode: LayoutMode) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  language: LanguageMode;
  setLanguage: (lang: LanguageMode) => void;
  currentScreen: ScreenId;
  setCurrentScreen: (screen: ScreenId) => void;
  debugMode: boolean;
  setDebugMode: (debug: boolean) => void;
  fontScale: number;
  setFontScale: (scale: number) => void;
}

export const InspectorBar: React.FC<InspectorBarProps> = ({
  layoutMode,
  setLayoutMode,
  theme,
  setTheme,
  language,
  setLanguage,
  currentScreen,
  setCurrentScreen,
  debugMode,
  setDebugMode,
  fontScale,
  setFontScale,
}) => {
  const [screenMenuOpen, setScreenMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const t = I18N[language];

  const screens: { id: ScreenId; label: string }[] = [
    { id: 'S0_LOCK', label: t.screens.s0 },
    { id: 'S1_HOME', label: t.screens.s1 },
    { id: 'S2_NEW_PROJECT', label: t.screens.s2 },
    { id: 'S3_EDITOR', label: t.screens.s3 },
    { id: 'S4_PRESENTER', label: t.screens.s4 },
    { id: 'S5_AUDIENCE', label: t.screens.s5 },
    { id: 'S6_REMOTE', label: t.screens.s6 },
    { id: 'S7_SETTINGS', label: t.screens.s7 },
    { id: 'S8_GEOREFERENCE', label: t.screens.s8 },
    { id: 'S9_EXCHANGE', label: t.screens.s9 },
    { id: 'S10_ACCOUNTS', label: t.screens.s10 },
    { id: 'S11_PAIRING', label: t.screens.s11 },
  ];

  return (
    <div
      className="h-10 bg-[#060D1E] text-white border-b border-[#2A4478] px-3 flex items-center justify-between text-xs select-none z-50 shrink-0 font-sans shadow-md"
      dir="ltr"
    >
      {/* App Studio Badge & Screen Selector */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#3B6FD6]/30 border border-[#3B6FD6]/50 text-[#9DBBF8] font-bold text-[11px]">
          <Sparkles className="w-3.5 h-3.5 text-[#3B6FD6]" />
          <span>MapX Studio</span>
        </div>

        {/* Screen Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setScreenMenuOpen(!screenMenuOpen)}
            className="h-7 px-2.5 rounded-lg bg-[#16305F] hover:bg-[#20407A] border border-[#2A4478] flex items-center gap-1.5 text-xs font-semibold text-white transition-colors"
          >
            <span className="text-[#F6B800] font-mono">
              {currentScreen.split('_')[0]}
            </span>
            <span className="max-w-[150px] sm:max-w-[200px] truncate">
              {screens.find((s) => s.id === currentScreen)?.label.split(': ')[1] || currentScreen}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-[#7F93B8]" />
          </button>

          {screenMenuOpen && (
            <div
              className="fixed inset-0 z-50"
              onClick={() => setScreenMenuOpen(false)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute top-10 left-28 w-80 max-h-96 overflow-y-auto rounded-xl bg-[#0F2147] border border-[#2A4478] shadow-2xl p-1.5 space-y-0.5 text-xs text-white z-50"
              >
                <div className="px-2 py-1 text-[10px] font-mono text-[#7F93B8] uppercase">
                  Navigate to Screen (S0 to S11)
                </div>
                {screens.map((scr) => (
                  <button
                    key={scr.id}
                    onClick={() => {
                      setCurrentScreen(scr.id);
                      setScreenMenuOpen(false);
                    }}
                    className={`w-full px-2.5 py-1.5 rounded-lg text-left flex items-center justify-between font-medium transition-colors ${
                      currentScreen === scr.id
                        ? 'bg-[#3B6FD6] text-white font-bold'
                        : 'hover:bg-[#16305F] text-[#B8C4DC]'
                    }`}
                  >
                    <span>{scr.label}</span>
                    {currentScreen === scr.id && (
                      <span className="text-[10px] font-mono bg-black/20 px-1.5 py-0.5 rounded">
                        Active
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Middle: Viewport / Device Modes */}
      <div className="flex items-center gap-1 bg-[#0F2147] p-0.5 rounded-lg border border-[#2A4478]">
        <button
          onClick={() => setLayoutMode('TABLET_LANDSCAPE')}
          title="Tablet Landscape (1280×800)"
          className={`h-6 px-2 rounded flex items-center gap-1 text-[11px] font-medium transition-all ${
            layoutMode === 'TABLET_LANDSCAPE'
              ? 'bg-[#3B6FD6] text-white shadow'
              : 'text-[#B8C4DC] hover:text-white'
          }`}
        >
          <Tablet className="w-3.5 h-3.5 rotate-90" />
          <span className="hidden md:inline">Tablet L</span>
        </button>

        <button
          onClick={() => setLayoutMode('TABLET_PORTRAIT')}
          title="Tablet Portrait (800×1280)"
          className={`h-6 px-2 rounded flex items-center gap-1 text-[11px] font-medium transition-all ${
            layoutMode === 'TABLET_PORTRAIT'
              ? 'bg-[#3B6FD6] text-white shadow'
              : 'text-[#B8C4DC] hover:text-white'
          }`}
        >
          <Tablet className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Tablet P</span>
        </button>

        <button
          onClick={() => setLayoutMode('PHONE_LANDSCAPE')}
          title="Phone Landscape (844×390)"
          className={`h-6 px-2 rounded flex items-center gap-1 text-[11px] font-medium transition-all ${
            layoutMode === 'PHONE_LANDSCAPE'
              ? 'bg-[#3B6FD6] text-white shadow'
              : 'text-[#B8C4DC] hover:text-white'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5 rotate-90" />
          <span className="hidden md:inline">Phone L</span>
        </button>

        <button
          onClick={() => setLayoutMode('PHONE_PORTRAIT')}
          title="Phone Portrait (390×844)"
          className={`h-6 px-2 rounded flex items-center gap-1 text-[11px] font-medium transition-all ${
            layoutMode === 'PHONE_PORTRAIT'
              ? 'bg-[#3B6FD6] text-white shadow'
              : 'text-[#B8C4DC] hover:text-white'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Phone P</span>
        </button>

        <button
          onClick={() => setLayoutMode('RESPONSIVE')}
          title="Responsive Container"
          className={`h-6 px-2 rounded flex items-center gap-1 text-[11px] font-medium transition-all ${
            layoutMode === 'RESPONSIVE'
              ? 'bg-[#3B6FD6] text-white shadow'
              : 'text-[#B8C4DC] hover:text-white'
          }`}
        >
          <Maximize2 className="w-3 h-3" />
          <span className="hidden lg:inline">Fill</span>
        </button>
      </div>

      {/* Right Controls: Theme, Language, Debug, Font Scale */}
      <div className="flex items-center gap-2">
        {/* Single Compact Theme Switcher Button */}
        <div className="relative">
          <button
            onClick={() => setThemeMenuOpen(!themeMenuOpen)}
            title="Switch UI Color Theme"
            className="h-7 px-2 rounded-lg bg-[#16305F] hover:bg-[#20407A] border border-[#2A4478] flex items-center gap-1.5 text-xs font-semibold text-white transition-all shadow"
          >
            <Palette className="w-3.5 h-3.5 text-[#10B981]" />
            <span
              className="w-2.5 h-2.5 rounded-full border border-white/20 shrink-0"
              style={{
                backgroundColor:
                  THEMES_LIST.find((t) => t.id === theme)?.accentColor || '#10B981',
              }}
            />
            <span className="hidden sm:inline text-[11px] font-bold">
              {THEMES_LIST.find((t) => t.id === theme)?.name.split(' ')[0] || 'Theme'}
            </span>
            <ChevronDown className="w-3 h-3 text-[#7F93B8]" />
          </button>

          {themeMenuOpen && (
            <div
              className="fixed inset-0 z-50"
              onClick={() => setThemeMenuOpen(false)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute top-10 right-20 w-80 max-h-[480px] overflow-y-auto rounded-xl bg-[#0F2147] border border-[#2A4478] shadow-2xl p-2 space-y-1 text-xs text-white z-50"
              >
                <div className="flex items-center justify-between px-2 py-1 text-[10px] font-mono text-[#7F93B8] uppercase border-b border-[#2A4478]">
                  <span>UI Color Themes ({THEMES_LIST.length})</span>
                  <span className="text-[#3B6FD6] font-bold">
                    {THEMES_LIST.find((t) => t.id === theme)?.badge}
                  </span>
                </div>
                {THEMES_LIST.map((th) => {
                  const isActive = theme === th.id;
                  return (
                    <button
                      key={th.id}
                      onClick={() => {
                        setTheme(th.id);
                        setThemeMenuOpen(false);
                      }}
                      className={`w-full p-2 rounded-lg text-left flex items-start gap-2.5 transition-all ${
                        isActive
                          ? 'bg-[#16305F] border border-[#3B6FD6] shadow-sm'
                          : 'hover:bg-[#16305F]/60 border border-transparent'
                      }`}
                    >
                      <div
                        className="w-7 h-7 rounded-lg border border-white/20 shrink-0 relative flex items-center justify-center overflow-hidden shadow-sm mt-0.5"
                        style={{ backgroundColor: th.previewBg }}
                      >
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: th.accentColor }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span
                            className={`font-bold text-xs ${
                              isActive ? 'text-white' : 'text-[#B8C4DC]'
                            }`}
                          >
                            {th.name}
                          </span>
                          {isActive && <Check className="w-3.5 h-3.5 text-[#10B981]" />}
                        </div>
                        <p className="text-[10px] text-[#7F93B8] line-clamp-1 leading-tight mt-0.5">
                          {th.subtitle}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Language Toggle (EN / AR RTL) */}
        <button
          onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
          title="Toggle English (LTR) / Arabic (RTL)"
          className="h-7 px-2 rounded-lg bg-[#16305F] hover:bg-[#20407A] border border-[#2A4478] flex items-center gap-1 text-[11px] font-bold text-white transition-colors"
        >
          <Globe className="w-3.5 h-3.5 text-[#3B6FD6]" />
          <span>{language === 'en' ? 'AR (عربي)' : 'EN'}</span>
        </button>

        {/* Font Scale Cycle */}
        <button
          onClick={() => setFontScale(fontScale === 1 ? 1.5 : fontScale === 1.5 ? 2 : 1)}
          title={`Font Scale (${fontScale * 100}%)`}
          className="h-7 px-1.5 rounded-lg bg-[#16305F] hover:bg-[#20407A] border border-[#2A4478] flex items-center gap-1 text-[10px] font-mono text-[#B8C4DC]"
        >
          <Type className="w-3 h-3" />
          <span>{Math.round(fontScale * 100)}%</span>
        </button>

        {/* Layout Debug Toggle */}
        <button
          onClick={() => setDebugMode(!debugMode)}
          title="Toggle Layout Regions Debug Overlay"
          className={`h-7 px-2 rounded-lg border flex items-center gap-1 text-[11px] font-semibold transition-all ${
            debugMode
              ? 'bg-[#E3201B] border-[#E3201B] text-white'
              : 'bg-[#16305F] border-[#2A4478] text-[#B8C4DC] hover:text-white'
          }`}
        >
          <Bug className="w-3 h-3" />
          <span className="hidden sm:inline">Debug</span>
        </button>
      </div>
    </div>
  );
};
