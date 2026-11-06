import React from 'react';
import {
  Check,
  X,
  Lock,
  Unlock,
  Copy,
  Trash2,
  Sliders,
  Ruler,
  Maximize,
  Layers,
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
import { I18N } from '../constants/theme';

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
  const isEmerald = theme === 'emerald';
  const isDark = theme === 'dark' || isEmerald;
  const t = I18N[language];
  const isPhone = layoutMode === 'PHONE_PORTRAIT' || layoutMode === 'PHONE_LANDSCAPE';
  const barHeight = isPhone ? 'h-[48px]' : 'h-[56px]';

  const getBarBg = () => {
    if (isEmerald) return 'bg-[#0F1A18] border-[#203833] text-white';
    if (isDark) return 'bg-[#0F2147] border-[#2A4478] text-[#FFFFFF]';
    return 'bg-[#E3E8F0] border-[#C3CCDA] text-[#0A1A3A]';
  };

  return (
    <div
      className={`${barHeight} w-full border-t px-4 flex items-center justify-between select-none z-20 shrink-0 transition-colors ${getBarBg()}`}
    >
      {/* State 1: Active Drawing */}
      {drawingTool ? (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isEmerald ? 'bg-[#10B981] shadow-[0_0_8px_#10B981]' : 'bg-[#3B6FD6]'
              } animate-pulse`}
            />
            <span className="text-xs sm:text-sm font-semibold truncate">
              {t.drawTools[
                (drawingTool.charAt(0).toLowerCase() +
                  drawingTool.slice(1).replace(/_([a-z])/g, (_, c) => c.toUpperCase())) as keyof typeof t.drawTools
              ] || drawingTool}
            </span>
            <span
              className={`text-xs ${
                isEmerald ? 'text-[#7F9D96]' : 'text-[#B8C4DC]'
              } hidden md:inline`}
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
              className={`h-8 px-3 rounded-lg text-white text-xs font-semibold flex items-center gap-1.5 shadow transition-all active:scale-95 ${
                isEmerald
                  ? 'bg-[#10B981] hover:bg-[#059669] shadow-[0_0_12px_rgba(16,185,129,0.35)]'
                  : 'bg-[#3DB57A] hover:bg-[#349e6a]'
              }`}
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
              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                isEmerald
                  ? 'bg-[#10B981]/25 text-[#34D399] border border-[#10B981]/40'
                  : isDark
                  ? 'bg-[#3B6FD6]/30 text-[#9DBBF8]'
                  : 'bg-[#3B6FD6]/20 text-[#2A55B0]'
              }`}
            >
              {selectedObject.type}
            </span>
            <span className="text-xs sm:text-sm font-bold truncate">
              {selectedObject.name}
            </span>
            {selectedObject.metrics?.area && (
              <span
                className={`text-xs font-mono ${
                  isEmerald ? 'text-[#7F9D96]' : 'text-[#7F93B8]'
                } hidden sm:inline`}
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
              className={`h-8 px-2.5 rounded-lg border text-xs font-medium flex items-center gap-1 transition-all ${
                isEmerald
                  ? 'bg-[#172825] border-[#203833] text-white hover:bg-[#1E332F]'
                  : isDark
                  ? 'bg-[#16305F] border-[#2A4478] text-[#FFFFFF] hover:bg-[#20407A]'
                  : 'bg-[#FFFFFF] border-[#C3CCDA] text-[#0A1A3A] hover:bg-[#F1F5F9]'
              }`}
            >
              <Sliders
                className={`w-3.5 h-3.5 ${isEmerald ? 'text-[#10B981]' : 'text-[#3B6FD6]'}`}
              />
              <span className="hidden sm:inline">{t.contextBar.style}</span>
            </button>

            {/* Lock / Unlock */}
            <button
              onClick={() => onToggleLock(selectedObject.id)}
              title={selectedObject.locked ? t.contextBar.unlock : t.contextBar.lock}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                isEmerald
                  ? 'hover:bg-[#172825] text-[#9DBAB4]'
                  : isDark
                  ? 'hover:bg-[#16305F] text-[#B8C4DC]'
                  : 'hover:bg-[#CBD5E1] text-[#46546F]'
              }`}
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
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                isEmerald
                  ? 'hover:bg-[#172825] text-[#9DBAB4]'
                  : isDark
                  ? 'hover:bg-[#16305F] text-[#B8C4DC]'
                  : 'hover:bg-[#CBD5E1] text-[#46546F]'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* State 3: Idle state */
        <div className="flex items-center justify-between w-full">
          <div
            className={`flex items-center gap-2 text-xs ${
              isEmerald ? 'text-[#7F9D96]' : 'text-[#7F93B8]'
            }`}
          >
            <Info
              className={`w-4 h-4 ${isEmerald ? 'text-[#10B981]' : 'text-[#3B6FD6]'} shrink-0`}
            />
            <span>Select an object to inspect metrics, or choose a Draw tool from the rail</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert('Measurement mode active')}
              className={`h-7 px-2.5 rounded text-xs font-medium flex items-center gap-1.5 transition-colors ${
                isEmerald
                  ? 'bg-[#172825] text-[#9DBAB4] hover:bg-[#1E332F] border border-[#203833]'
                  : isDark
                  ? 'bg-[#16305F] text-[#B8C4DC] hover:bg-[#20407A]'
                  : 'bg-[#FFFFFF] text-[#46546F] hover:bg-[#F1F5F9]'
              }`}
            >
              <Ruler className="w-3.5 h-3.5" />
              <span>{t.contextBar.measure}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
