import React from 'react';
import { MousePointer2, Hand, PenTool, Layers, MoreHorizontal } from 'lucide-react';
import { ActivePanel, ActiveTool, LanguageMode, ThemeMode } from '../types';
import { I18N } from '../constants/theme';

interface BottomDockProps {
  theme: ThemeMode;
  language: LanguageMode;
  activeTool: ActiveTool;
  activePanel: ActivePanel;
  onSelectTool: (tool: ActiveTool) => void;
  onTogglePanel: (panel: ActivePanel) => void;
  onOpenDrawMenu: (e: React.MouseEvent) => void;
  onOpenMoreMenu: () => void;
}

export const BottomDock: React.FC<BottomDockProps> = ({
  theme,
  language,
  activeTool,
  activePanel,
  onSelectTool,
  onTogglePanel,
  onOpenDrawMenu,
  onOpenMoreMenu,
}) => {
  const isEmerald = theme === 'emerald';
  const isDark = theme === 'dark' || isEmerald;
  const t = I18N[language];

  const getDockBg = () => {
    if (isEmerald) return 'bg-[#0F1A18] border-[#203833] text-white';
    if (isDark) return 'bg-[#0F2147] border-[#2A4478] text-[#FFFFFF]';
    return 'bg-[#E3E8F0] border-[#C3CCDA] text-[#0A1A3A]';
  };

  const getBtnStyle = (isActive: boolean) => {
    if (isActive) {
      if (isEmerald) return 'bg-[#10B981] text-white shadow-[0_0_10px_rgba(16,185,129,0.4)]';
      return 'bg-[#3B6FD6] text-[#FFFFFF]';
    }
    if (isEmerald) return 'text-[#9DBAB4] hover:bg-[#172825]';
    if (isDark) return 'text-[#B8C4DC] hover:bg-[#16305F]';
    return 'text-[#46546F] hover:bg-[#CBD5E1]';
  };

  return (
    <nav
      className={`h-[56px] w-full border-t flex items-center justify-around px-2 z-30 shrink-0 transition-colors ${getDockBg()}`}
    >
      {/* 1: Select */}
      <button
        onClick={() => onSelectTool('SELECT')}
        className={`flex-1 h-[44px] rounded-lg flex flex-col items-center justify-center gap-0.5 transition-all ${getBtnStyle(
          activeTool === 'SELECT'
        )}`}
      >
        <MousePointer2 className="w-5 h-5" />
        <span className="text-[10px] font-medium leading-none">{t.tools.select}</span>
      </button>

      {/* 2: Pan */}
      <button
        onClick={() => onSelectTool('PAN')}
        className={`flex-1 h-[44px] rounded-lg flex flex-col items-center justify-center gap-0.5 transition-all ${getBtnStyle(
          activeTool === 'PAN'
        )}`}
      >
        <Hand className="w-5 h-5" />
        <span className="text-[10px] font-medium leading-none">{t.tools.pan}</span>
      </button>

      {/* 3: Draw */}
      <button
        onClick={(e) => {
          onSelectTool('DRAW');
          onOpenDrawMenu(e);
        }}
        className={`flex-1 h-[44px] rounded-lg flex flex-col items-center justify-center gap-0.5 transition-all ${getBtnStyle(
          activeTool === 'DRAW'
        )}`}
      >
        <PenTool className="w-5 h-5" />
        <span className="text-[10px] font-medium leading-none">{t.tools.draw}</span>
      </button>

      {/* 4: Layers */}
      <button
        onClick={() => onTogglePanel(activePanel === 'LAYERS' ? 'NONE' : 'LAYERS')}
        className={`flex-1 h-[44px] rounded-lg flex flex-col items-center justify-center gap-0.5 transition-all ${getBtnStyle(
          activePanel === 'LAYERS'
        )}`}
      >
        <Layers className="w-5 h-5" />
        <span className="text-[10px] font-medium leading-none">{t.tools.layers}</span>
      </button>

      {/* 5: More */}
      <button
        onClick={onOpenMoreMenu}
        className={`flex-1 h-[44px] rounded-lg flex flex-col items-center justify-center gap-0.5 transition-all ${getBtnStyle(
          activePanel !== 'NONE' && activePanel !== 'LAYERS'
        )}`}
      >
        <MoreHorizontal className="w-5 h-5" />
        <span className="text-[10px] font-medium leading-none">{t.tools.more}</span>
      </button>
    </nav>
  );
};
