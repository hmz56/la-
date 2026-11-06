import React from 'react';
import { MousePointer2, Hand, PenTool, Layers, MoreHorizontal } from 'lucide-react';
import { ActivePanel, ActiveTool, LanguageMode, ThemeMode } from '../types';
import { I18N, COLORS } from '../constants/theme';

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
  const tokens = COLORS[theme] || COLORS.emerald;
  const t = I18N[language];

  const getBtnStyle = (isActive: boolean) => {
    if (isActive) {
      return {
        backgroundColor: tokens.interactionBlue,
        color: '#FFFFFF',
        boxShadow: `0 0 10px ${tokens.interactionBlue}50`,
      };
    }
    return {
      color: tokens.textSecondary,
    };
  };

  return (
    <nav
      className="h-[56px] w-full border-t flex items-center justify-around px-2 z-30 shrink-0 transition-colors"
      style={{
        backgroundColor: tokens.railBg,
        borderColor: tokens.border,
      }}
    >
      {/* 1: Select */}
      <button
        onClick={() => onSelectTool('SELECT')}
        style={getBtnStyle(activeTool === 'SELECT')}
        className="flex-1 h-[44px] rounded-lg flex flex-col items-center justify-center gap-0.5 transition-all active:scale-95"
      >
        <MousePointer2 className="w-5 h-5" />
        <span className="text-[10px] font-medium leading-none">{t.tools.select}</span>
      </button>

      {/* 2: Pan */}
      <button
        onClick={() => onSelectTool('PAN')}
        style={getBtnStyle(activeTool === 'PAN')}
        className="flex-1 h-[44px] rounded-lg flex flex-col items-center justify-center gap-0.5 transition-all active:scale-95"
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
        style={getBtnStyle(activeTool === 'DRAW')}
        className="flex-1 h-[44px] rounded-lg flex flex-col items-center justify-center gap-0.5 transition-all active:scale-95"
      >
        <PenTool className="w-5 h-5" />
        <span className="text-[10px] font-medium leading-none">{t.tools.draw}</span>
      </button>

      {/* 4: Layers */}
      <button
        onClick={() => onTogglePanel(activePanel === 'LAYERS' ? 'NONE' : 'LAYERS')}
        style={getBtnStyle(activePanel === 'LAYERS')}
        className="flex-1 h-[44px] rounded-lg flex flex-col items-center justify-center gap-0.5 transition-all active:scale-95"
      >
        <Layers className="w-5 h-5" />
        <span className="text-[10px] font-medium leading-none">{t.tools.layers}</span>
      </button>

      {/* 5: More */}
      <button
        onClick={onOpenMoreMenu}
        style={getBtnStyle(activePanel !== 'NONE' && activePanel !== 'LAYERS')}
        className="flex-1 h-[44px] rounded-lg flex flex-col items-center justify-center gap-0.5 transition-all active:scale-95"
      >
        <MoreHorizontal className="w-5 h-5" />
        <span className="text-[10px] font-medium leading-none">{t.tools.more}</span>
      </button>
    </nav>
  );
};
