import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Undo2,
  Redo2,
  Navigation,
  Play,
  MoreVertical,
  Settings,
  Crosshair,
  SlidersHorizontal,
} from 'lucide-react';
import {
  CoordinateFormat,
  LanguageMode,
  LayoutMode,
  LocateState,
  SaveState,
  ThemeMode,
} from '../types';
import { I18N } from '../constants/theme';

interface TopStatusBarProps {
  theme: ThemeMode;
  language: LanguageMode;
  layoutMode: LayoutMode;
  projectName: string;
  saveState: SaveState;
  coordFormat: CoordinateFormat;
  locateState: LocateState;
  onBack: () => void;
  onOpenCoordSwitcher: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onLocate: () => void;
  onPresent: () => void;
  onOpenOverflow: (e: React.MouseEvent) => void;
  onOpenSettings: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
}

export const TopStatusBar: React.FC<TopStatusBarProps> = ({
  theme,
  language,
  layoutMode,
  projectName,
  saveState,
  coordFormat,
  locateState,
  onBack,
  onOpenCoordSwitcher,
  onUndo,
  onRedo,
  onLocate,
  onPresent,
  onOpenOverflow,
  onOpenSettings,
  canUndo = true,
  canRedo = false,
}) => {
  const isEmerald = theme === 'emerald';
  const isDark = theme === 'dark' || isEmerald;
  const t = I18N[language];
  const isRTL = language === 'ar';

  // Coordinate display based on format and responsive tier
  const getCoordinateString = () => {
    const isCompact = layoutMode === 'PHONE_PORTRAIT';
    const isMedium = layoutMode === 'PHONE_LANDSCAPE' || layoutMode === 'TABLET_PORTRAIT';

    switch (coordFormat) {
      case 'DD':
        return isCompact ? '26.550° N, 56.262° E' : '26.5502° N, 56.2625° E • z11.4';
      case 'DDM':
        return isCompact ? "26°33.0'N, 56°15.7'E" : "26° 33.012' N, 56° 15.750' E • z11.4";
      case 'DMS':
        return isCompact
          ? '26°33\'N 56°15\'E'
          : isMedium
          ? '26°33\'00"N 56°15\'45"E'
          : '26° 33\' 00" N, 56° 15\' 45" E • z11.4 • 1:50k';
      case 'UTM':
        return isCompact ? '40R 4265 29362' : 'UTM 40R 426500m E, 2936200m N';
      case 'MGRS':
        return isCompact ? '40R DQ 265 362' : '40R DQ 26500 36200 • z11.4';
    }
  };

  // Locate icon color & animation per 6 GPS states
  const getLocateIconStyle = () => {
    switch (locateState) {
      case 'searching':
        return 'text-[#F59E0B] animate-spin';
      case 'located':
        return isEmerald ? 'text-[#10B981]' : isDark ? 'text-[#3DB57A]' : 'text-[#1E8E5A]';
      case 'follow':
        return isEmerald
          ? 'text-[#10B981] fill-[#10B981] animate-pulse'
          : 'text-[#3B6FD6] fill-[#3B6FD6] animate-pulse';
      case 'denied':
        return 'text-[#F43F5E] opacity-70';
      case 'no_gnss':
        return 'text-gray-400 line-through';
      default:
        return isEmerald ? 'text-[#9DBAB4]' : isDark ? 'text-[#B8C4DC]' : 'text-[#46546F]';
    }
  };

  const getSaveBadge = () => {
    switch (saveState) {
      case 'SAVED':
        return (
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              isEmerald
                ? 'bg-[#10B981] shadow-[0_0_8px_#10B981]'
                : 'bg-[#3DB57A] shadow-[0_0_6px_#3DB57A]'
            }`}
            title={t.saved}
          />
        );
      case 'SAVING':
        return (
          <span
            className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] animate-ping"
            title={t.saving}
          />
        );
      case 'UNSAVED':
        return (
          <span
            className="w-2.5 h-2.5 rounded-full border-2 border-[#F43F5E] bg-transparent"
            title={t.unsaved}
          />
        );
      case 'ERROR':
        return (
          <span
            className="w-2.5 h-2.5 rounded-full bg-[#F43F5E] animate-bounce"
            title={t.saveError}
          />
        );
    }
  };

  const isPhone = layoutMode === 'PHONE_PORTRAIT' || layoutMode === 'PHONE_LANDSCAPE';

  const getHeaderBg = () => {
    if (isEmerald) return 'bg-[#0F1A18] border-[#203833] text-white';
    if (isDark) return 'bg-[#0A1A3A] border-[#2A4478] text-[#FFFFFF]';
    return 'bg-[#E3E8F0] border-[#C3CCDA] text-[#0A1A3A]';
  };

  const getBtnHover = () => {
    if (isEmerald) return 'hover:bg-[#172825] text-white';
    if (isDark) return 'hover:bg-[#16305F] text-[#FFFFFF]';
    return 'hover:bg-[#CBD5E1] text-[#0A1A3A]';
  };

  const getChipStyle = () => {
    if (isEmerald)
      return 'bg-[#172825]/90 hover:bg-[#1F3330] text-[#9DBAB4] hover:text-white border-[#203833]';
    if (isDark)
      return 'bg-[#16305F]/80 hover:bg-[#16305F] text-[#B8C4DC] hover:text-[#FFFFFF] border-[#2A4478]';
    return 'bg-[#FFFFFF]/90 hover:bg-[#FFFFFF] text-[#46546F] hover:text-[#0A1A3A] border-[#C3CCDA]';
  };

  return (
    <header
      className={`h-[48px] px-3 flex items-center justify-between border-b select-none z-30 shrink-0 transition-colors ${getHeaderBg()}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Start Section: Back navigation + Project Name + Save Status */}
      <div className="flex items-center gap-2 min-w-0">
        <button
          onClick={onBack}
          aria-label={t.back}
          className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${getBtnHover()}`}
        >
          {isRTL ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>

        <div className="flex items-center gap-2 truncate">
          <span className="font-bold text-sm truncate tracking-tight max-w-[140px] sm:max-w-[200px] md:max-w-[280px]">
            {projectName}
          </span>
          <div className="flex items-center shrink-0" title={t[saveState.toLowerCase() as keyof typeof t] as string}>
            {getSaveBadge()}
          </div>
        </div>
      </div>

      {/* Center Section: Coordinate Readout / Format Switcher Chip */}
      <button
        onClick={onOpenCoordSwitcher}
        title={t.coordSwitcher.title}
        className={`px-2.5 py-1 rounded-md text-xs font-mono font-medium flex items-center gap-1.5 transition-all border ${getChipStyle()}`}
      >
        <Navigation className={`w-3.5 h-3.5 ${isEmerald ? 'text-[#10B981]' : 'text-[#3B6FD6]'} shrink-0`} />
        <span className="truncate">{getCoordinateString()}</span>
      </button>

      {/* End Section: Undo, Redo, GPS Locate, Present, Overflow, Settings */}
      <div className="flex items-center gap-1 shrink-0">
        {!isPhone && (
          <>
            <button
              onClick={onUndo}
              disabled={!canUndo}
              title={t.undo}
              className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors ${
                canUndo
                  ? isDark
                    ? 'hover:bg-[#16305F] text-[#B8C4DC]'
                    : 'hover:bg-[#CBD5E1] text-[#46546F]'
                  : 'opacity-30 cursor-not-allowed'
              }`}
            >
              <Undo2 className="w-4 h-4" />
            </button>

            <button
              onClick={onRedo}
              disabled={!canRedo}
              title={t.redo}
              className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors ${
                canRedo
                  ? isDark
                    ? 'hover:bg-[#16305F] text-[#B8C4DC]'
                    : 'hover:bg-[#CBD5E1] text-[#46546F]'
                  : 'opacity-30 cursor-not-allowed'
              }`}
            >
              <Redo2 className="w-4 h-4" />
            </button>
          </>
        )}

        {/* GPS Locate Button */}
        <button
          onClick={onLocate}
          title={`GNSS Locate: ${locateState}`}
          className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors ${
            isDark ? 'hover:bg-[#16305F]' : 'hover:bg-[#CBD5E1]'
          }`}
        >
          <Crosshair className={`w-4 h-4 ${getLocateIconStyle()}`} />
        </button>

        {/* Present Button */}
        <button
          onClick={onPresent}
          title={t.present}
          className={`h-8 px-3 rounded-md text-[#FFFFFF] text-xs font-semibold flex items-center gap-1.5 shadow transition-all active:scale-95 ${
            isEmerald
              ? 'bg-[#10B981] hover:bg-[#059669] shadow-[0_0_12px_rgba(16,185,129,0.35)]'
              : 'bg-[#3B6FD6] hover:bg-[#2F5DB8]'
          }`}
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          {!isPhone && <span>{t.present}</span>}
        </button>

        {/* Settings Shortcut */}
        <button
          onClick={onOpenSettings}
          title={t.settings}
          className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors ${
            isDark ? 'hover:bg-[#16305F] text-[#B8C4DC]' : 'hover:bg-[#CBD5E1] text-[#46546F]'
          }`}
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* Project Overflow Menu (3-dots) */}
        <button
          onClick={onOpenOverflow}
          title={t.projectOptions}
          className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors ${
            isDark ? 'hover:bg-[#16305F] text-[#FFFFFF]' : 'hover:bg-[#CBD5E1] text-[#0A1A3A]'
          }`}
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
