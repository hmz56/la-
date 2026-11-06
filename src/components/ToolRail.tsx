import React from 'react';
import {
  MousePointer2,
  Hand,
  Type,
  MapPin,
  PenTool,
  Image as ImageIcon,
  Layers,
  Shield,
  Film,
  Globe2,
  Tv,
} from 'lucide-react';
import { ActivePanel, ActiveTool, LanguageMode, LayoutMode, ThemeMode } from '../types';
import { I18N } from '../constants/theme';

interface ToolRailProps {
  theme: ThemeMode;
  language: LanguageMode;
  layoutMode: LayoutMode;
  activeTool: ActiveTool;
  activePanel: ActivePanel;
  onSelectTool: (tool: ActiveTool) => void;
  onTogglePanel: (panel: ActivePanel) => void;
  onOpenDrawMenu: (e: React.MouseEvent) => void;
}

export const ToolRail: React.FC<ToolRailProps> = ({
  theme,
  language,
  layoutMode,
  activeTool,
  activePanel,
  onSelectTool,
  onTogglePanel,
  onOpenDrawMenu,
}) => {
  const isEmerald = theme === 'emerald';
  const isDark = theme === 'dark' || isEmerald;
  const t = I18N[language];
  const isPhone = layoutMode === 'PHONE_LANDSCAPE';

  const railWidth = isPhone ? 'w-[56px]' : 'w-[72px]';
  const tileSize = isPhone ? 'w-[44px] h-[44px]' : 'w-[56px] h-[56px]';
  const iconSize = isPhone ? 'w-5 h-5' : 'w-6 h-6';

  const toolItems = [
    { id: 'SELECT', label: t.tools.select, icon: MousePointer2 },
    { id: 'PAN', label: t.tools.pan, icon: Hand },
    { id: 'LABEL', label: t.tools.label, icon: Type },
    { id: 'MARKER', label: t.tools.marker, icon: MapPin },
    { id: 'DRAW', label: t.tools.draw, icon: PenTool, isDraw: true },
    { id: 'IMAGE', label: t.tools.image, icon: ImageIcon },
  ];

  const panelItems = [
    { id: 'LAYERS', label: t.tools.layers, icon: Layers },
    { id: 'SYMBOLS', label: t.tools.symbols, icon: Shield },
    { id: 'SCENES', label: t.tools.scenes, icon: Film },
    { id: 'MAP_SOURCES', label: t.tools.mapsGis, icon: Globe2 },
    { id: 'SCENE_GRAPHICS', label: t.tools.graphics, icon: Tv },
  ];

  const getRailBg = () => {
    if (isEmerald) return 'bg-[#0F1A18] border-[#203833]';
    if (isDark) return 'bg-[#0F2147] border-[#2A4478]';
    return 'bg-[#E3E8F0] border-[#C3CCDA]';
  };

  const getToolTileStyle = (isActive: boolean) => {
    if (isActive) {
      if (isEmerald)
        return 'bg-[#10B981] text-white shadow-[0_0_15px_rgba(16,185,129,0.45)] ring-2 ring-[#34D399]/60';
      return 'bg-[#3B6FD6] text-[#FFFFFF] shadow-[0_2px_8px_rgba(59,111,214,0.4)] ring-2 ring-[#9DBBF8]/50';
    }
    if (isEmerald) return 'bg-[#182926] hover:bg-[#203833] text-[#9DBAB4]';
    if (isDark) return 'bg-[#4D4B49]/70 hover:bg-[#5E574D] text-[#FFFFFF]';
    return 'bg-[#D3DAE7] hover:bg-[#BFCADA] text-[#0A1A3A]';
  };

  const getPanelTileStyle = (isActive: boolean) => {
    if (isActive) {
      if (isEmerald)
        return 'bg-[#10B981] text-white shadow-[0_0_15px_rgba(16,185,129,0.45)] ring-2 ring-[#34D399]/60';
      return 'bg-[#3B6FD6] text-[#FFFFFF] shadow-md ring-2 ring-[#9DBBF8]/50';
    }
    if (isEmerald) return 'bg-[#142421] hover:bg-[#1C332E] text-[#9DBAB4]';
    if (isDark) return 'bg-[#16305F]/80 hover:bg-[#1C3B75] text-[#B8C4DC]';
    return 'bg-[#FFFFFF]/80 hover:bg-[#FFFFFF] text-[#46546F]';
  };

  return (
    <aside
      className={`${railWidth} h-full flex flex-col items-center py-2 gap-1 border-r select-none z-20 shrink-0 transition-colors ${getRailBg()}`}
    >
      {/* Top Map Creation Tools */}
      <div className="flex flex-col items-center gap-1 w-full px-1">
        {toolItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTool === item.id;

          return (
            <button
              key={item.id}
              onClick={(e) => {
                if (item.isDraw) {
                  onSelectTool('DRAW');
                  onOpenDrawMenu(e);
                } else {
                  onSelectTool(item.id as ActiveTool);
                }
              }}
              title={item.label}
              className={`${tileSize} rounded-xl flex flex-col items-center justify-center transition-all ${getToolTileStyle(
                isActive
              )}`}
            >
              <Icon className={iconSize} />
              {!isPhone && (
                <span className="text-[9px] font-medium tracking-tight mt-0.5 max-w-[50px] truncate text-center leading-none">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Decorative Divider */}
      <div
        className={`w-3/4 my-1 h-[1px] ${
          isEmerald ? 'bg-[#203833]' : isDark ? 'bg-[#2A4478]' : 'bg-[#CBD5E1]'
        }`}
      />

      {/* Bottom Panel Management Tools */}
      <div className="flex flex-col items-center gap-1 w-full px-1 overflow-y-auto">
        {panelItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePanel === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTogglePanel(item.id as ActivePanel)}
              title={item.label}
              className={`${tileSize} rounded-xl flex flex-col items-center justify-center transition-all ${getPanelTileStyle(
                isActive
              )}`}
            >
              <Icon className={iconSize} />
              {!isPhone && (
                <span className="text-[9px] font-medium tracking-tight mt-0.5 max-w-[50px] truncate text-center leading-none">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
};
