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
import { I18N, COLORS } from '../constants/theme';

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
  const tokens = COLORS[theme] || COLORS.emerald;
  const isDark = theme !== 'light';
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

  return (
    <aside
      className={`${railWidth} h-full flex flex-col items-center py-2 gap-1 border-r select-none z-20 shrink-0 transition-colors`}
      style={{
        backgroundColor: tokens.railBg,
        borderColor: tokens.border,
      }}
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
              style={{
                backgroundColor: isActive ? tokens.interactionBlue : tokens.toolTile,
                color: isActive ? '#FFFFFF' : tokens.textSecondary,
                boxShadow: isActive ? `0 0 14px ${tokens.interactionBlue}60` : undefined,
                border: `1px solid ${isActive ? tokens.interactionBlue : tokens.border}`,
              }}
              className={`${tileSize} rounded-xl flex flex-col items-center justify-center transition-all hover:opacity-90 active:scale-95`}
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
        className="w-3/4 my-1 h-[1px] opacity-60"
        style={{ backgroundColor: tokens.border }}
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
              style={{
                backgroundColor: isActive ? tokens.interactionBlue : tokens.toolTile,
                color: isActive ? '#FFFFFF' : tokens.textSecondary,
                boxShadow: isActive ? `0 0 12px ${tokens.interactionBlue}50` : undefined,
                border: `1px solid ${isActive ? tokens.interactionBlue : tokens.border}`,
              }}
              className={`${tileSize} rounded-xl flex flex-col items-center justify-center transition-all hover:opacity-90 active:scale-95`}
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
