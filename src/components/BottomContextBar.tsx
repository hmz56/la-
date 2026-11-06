import React from 'react';
import {
  Check,
  X,
  Lock,
  Unlock,
  Trash2,
  Sliders,
  Ruler,
  Info,
} from 'lucide-react';
import {
  ActiveTool,
  DrawingToolType,
  LanguageMode,
  LayoutMode,
  MapObject,
  ThemeMode,
} from '../types';
import { I18N, COLORS } from '../constants/theme';

interface BottomContextBarProps {
  theme: ThemeMode;
  language: LanguageMode;
  layoutMode: LayoutMode;
  activeTool: ActiveTool;
  drawingTool: DrawingToolType | null;
  selectedObject: MapObject | null;
  onFinishDrawing: () => void;
  onDiscardDrawing: () => void;
  onDeselect: () => void;
  onDeleteObject: (id: string) => void;
  onToggleLock: (id: string) => void;
  onOpenProperties: () => void;
}

export const BottomContextBar: React.FC<BottomContextBarProps> = ({
  theme,
  language,
  layoutMode,
  activeTool,
  drawingTool,
  selectedObject,
  onFinishDrawing,
  onDiscardDrawing,
  onDeselect,
  onDeleteObject,
  onToggleLock,
  onOpenProperties,
}) => {
  const tokens = COLORS[theme] || COLORS.emerald;
  const t = I18N[language];
  const isPhone = layoutMode === 'PHONE_PORTRAIT' || layoutMode === 'PHONE_LANDSCAPE';
  const barHeight = isPhone ? 'h-[48px]' : 'h-[56px]';

  return (
    <div
      className={`${barHeight} w-full border-t px-4 flex items-center justify-between select-none z-20 shrink-0 transition-colors`}
      style={{
        backgroundColor: tokens.railBg,
        borderColor: tokens.border,
        color: tokens.textPrimary,
      }}
    >
      {/* State 1: Active Drawing */}
      {drawingTool ? (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full animate-pulse"
              style={{
                backgroundColor: tokens.interactionBlue,
                boxShadow: `0 0 8px ${tokens.interactionBlue}`,
              }}
            />
            <span className="text-xs sm:text-sm font-semibold truncate">
              {t.drawTools[
                (drawingTool.charAt(0).toLowerCase() +
                  drawingTool.slice(1).replace(/_([a-z])/g, (_, c) => c.toUpperCase())) as keyof typeof t.drawTools
              ] || drawingTool}
            </span>
            <span
              className="text-xs hidden md:inline"
              style={{ color: tokens.textSecondary }}
            >
              ({t.contextBar.drawingActive})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onDiscardDrawing}
              className="h-8 px-3 rounded-lg border border-[#F43F5E] text-[#F43F5E] hover:bg-[#F43F5E]/10 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <X className="w-4 h-4" />
              <span>{t.contextBar.discardDraw}</span>
            </button>
            <button
              onClick={onFinishDrawing}
              style={{
                backgroundColor: tokens.interactionBlue,
                boxShadow: `0 0 12px ${tokens.interactionBlue}40`,
              }}
              className="h-8 px-3 rounded-lg text-white text-xs font-semibold flex items-center gap-1.5 shadow transition-all active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>{t.contextBar.finishDraw}</span>
            </button>
          </div>
        </div>
      ) : selectedObject ? (
        /* State 2: Object Selected */
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0"
              style={{
                backgroundColor: `${tokens.interactionBlue}25`,
                color: tokens.interactionBlue,
                border: `1px solid ${tokens.interactionBlue}40`,
              }}
            >
              {selectedObject.type}
            </span>
            <span className="text-xs sm:text-sm font-bold truncate">
              {selectedObject.name}
            </span>
            {selectedObject.metrics?.area && (
              <span
                className="text-xs font-mono hidden sm:inline"
                style={{ color: tokens.textSecondary }}
              >
                • {selectedObject.metrics.area}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Quick Properties button */}
            <button
              onClick={onOpenProperties}
              title={t.tools.properties}
              style={{
                backgroundColor: tokens.raisedCard,
                borderColor: tokens.border,
                color: tokens.textPrimary,
              }}
              className="h-8 px-2.5 rounded-lg border text-xs font-medium flex items-center gap-1 transition-all hover:opacity-90"
            >
              <Sliders
                className="w-3.5 h-3.5"
                style={{ color: tokens.interactionBlue }}
              />
              <span className="hidden sm:inline">{t.contextBar.style}</span>
            </button>

            {/* Lock / Unlock */}
            <button
              onClick={() => onToggleLock(selectedObject.id)}
              title={selectedObject.locked ? t.contextBar.unlock : t.contextBar.lock}
              style={{ color: tokens.textSecondary }}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/10"
            >
              {selectedObject.locked ? (
                <Lock className="w-4 h-4 text-[#F59E0B]" />
              ) : (
                <Unlock className="w-4 h-4" />
              )}
            </button>

            {/* Delete Object */}
            <button
              onClick={() => onDeleteObject(selectedObject.id)}
              title={t.contextBar.delete}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#F43F5E] hover:bg-[#F43F5E]/10 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            {/* Deselect X */}
            <button
              onClick={onDeselect}
              title={t.contextBar.deselect}
              style={{ color: tokens.textSecondary }}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* State 3: Idle state */
        <div className="flex items-center justify-between w-full">
          <div
            className="flex items-center gap-2 text-xs"
            style={{ color: tokens.textSecondary }}
          >
            <Info
              className="w-4 h-4 shrink-0"
              style={{ color: tokens.interactionBlue }}
            />
            <span className="truncate">Select an object to inspect metrics, or choose a Draw tool from the rail</span>
          </div>

          <div className="flex items-center gap-2">
            <div
              style={{
                backgroundColor: tokens.raisedCard,
                color: tokens.textSecondary,
                borderColor: tokens.border,
              }}
              className="h-7 px-2.5 rounded text-xs font-medium flex items-center gap-1.5 border"
            >
              <Ruler className="w-3.5 h-3.5" />
              <span>{t.contextBar.measure}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
