import React, { useState } from 'react';
import {
  X,
  Navigation,
  PenTool,
  Minus,
  Spline,
  ArrowRight,
  TrendingUp,
  Circle,
  Square,
  Pentagon,
  ShieldAlert,
  Highlighter,
  MapPin,
  Download,
  Upload,
  Copy,
  Info,
  LogOut,
  Trash2,
  Check,
} from 'lucide-react';
import { CoordinateFormat, DrawingToolType, LanguageMode, ThemeMode } from '../types';
import { I18N } from '../constants/theme';

interface ModalLayerProps {
  theme: ThemeMode;
  language: LanguageMode;
  isCoordSwitcherOpen: boolean;
  onCloseCoordSwitcher: () => void;
  currentCoordFormat: CoordinateFormat;
  onSelectCoordFormat: (fmt: CoordinateFormat) => void;
  isDrawMenuOpen: boolean;
  onCloseDrawMenu: () => void;
  onSelectDrawingTool: (tool: DrawingToolType) => void;
  isOverflowOpen: boolean;
  onCloseOverflow: () => void;
  onNavigateScreen: (screen: any) => void;
  onDeleteProject: () => void;
}

export const ModalLayer: React.FC<ModalLayerProps> = ({
  theme,
  language,
  isCoordSwitcherOpen,
  onCloseCoordSwitcher,
  currentCoordFormat,
  onSelectCoordFormat,
  isDrawMenuOpen,
  onCloseDrawMenu,
  onSelectDrawingTool,
  isOverflowOpen,
  onCloseOverflow,
  onNavigateScreen,
  onDeleteProject,
}) => {
  const isEmerald = theme === 'emerald';
  const isDark = theme === 'dark' || isEmerald;
  const t = I18N[language];
  const [targetLat, setTargetLat] = useState('26.5502');
  const [targetLng, setTargetLng] = useState('56.2625');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // 11 Drawing Tools per Master Spec
  const DRAWING_TOOLS_LIST: { id: DrawingToolType; label: string; icon: any; desc: string }[] = [
    { id: 'FREEHAND', label: t.drawTools.freehand, icon: PenTool, desc: 'Continuous tactical sketch' },
    { id: 'LINE', label: t.drawTools.line, icon: Minus, desc: 'Two-point straight line' },
    { id: 'POLYLINE', label: t.drawTools.polyline, icon: Spline, desc: 'Multi-segment line' },
    { id: 'ARROW_STRAIGHT', label: t.drawTools.arrowStraight, icon: ArrowRight, desc: 'Direct vector arrow' },
    { id: 'ARROW_CURVED', label: t.drawTools.arrowCurved, icon: TrendingUp, desc: 'Maneuver sweep curve' },
    { id: 'CIRCLE', label: t.drawTools.circle, icon: Circle, desc: 'Radius or standoff circle' },
    { id: 'RECTANGLE', label: t.drawTools.rectangle, icon: Square, desc: 'Axis-aligned bounding box' },
    { id: 'POLYGON', label: t.drawTools.polygon, icon: Pentagon, desc: 'Tactical area polygon' },
    { id: 'BOUNDARY', label: t.drawTools.boundary, icon: ShieldAlert, desc: 'Sovereign / exclusion border' },
    { id: 'HIGHLIGHT', label: t.drawTools.highlight, icon: Highlighter, desc: 'Semi-transparent glow ribbon' },
    { id: 'ROUTE_PINS', label: t.drawTools.routePins, icon: MapPin, desc: 'Connected numbered waypoints' },
  ];

  const modalBg = isEmerald
    ? 'bg-[#121E1C] border-[#10B981]/40 shadow-[0_0_35px_rgba(16,185,129,0.2)] text-white'
    : isDark
    ? 'bg-[#0F2147] border-[#2A4478] text-white'
    : 'bg-white border-[#C3CCDA] text-[#0A1A3A]';

  const modalBtn = isEmerald
    ? 'bg-[#10B981] hover:bg-[#059669] text-white shadow-[0_0_12px_rgba(16,185,129,0.35)]'
    : 'bg-[#3B6FD6] hover:bg-[#2F5DB8] text-white';

  return (
    <>
      {/* ================= 1. COORDINATE FORMAT SWITCHER POPUP ================= */}
      {isCoordSwitcherOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            className={`w-full max-w-md rounded-2xl border shadow-2xl p-5 space-y-4 select-none ${modalBg}`}
          >
            <div className="flex items-center justify-between border-b pb-3 border-current/10">
              <div className="flex items-center gap-2">
                <Navigation
                  className={`w-5 h-5 ${isEmerald ? 'text-[#10B981]' : 'text-[#3B6FD6]'}`}
                />
                <h3 className="font-bold text-sm sm:text-base">{t.coordSwitcher.title}</h3>
              </div>
              <button onClick={onCloseCoordSwitcher} className="p-1 rounded-lg hover:bg-current/10">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Coordinate Format Selection Radios */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-[#7F93B8] uppercase tracking-wider">
                {t.coordSwitcher.format}
              </span>
              {[
                { id: 'DD', label: t.coordSwitcher.dd },
                { id: 'DDM', label: t.coordSwitcher.ddm },
                { id: 'DMS', label: t.coordSwitcher.dms },
                { id: 'UTM', label: t.coordSwitcher.utm },
                { id: 'MGRS', label: t.coordSwitcher.mgrs },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelectCoordFormat(item.id as CoordinateFormat)}
                  className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between text-xs transition-all ${
                    currentCoordFormat === item.id
                      ? isEmerald
                        ? 'border-[#10B981] bg-[#10B981]/20 font-bold text-[#34D399] shadow-sm'
                        : 'border-[#3B6FD6] bg-[#3B6FD6]/15 font-bold text-[#3B6FD6]'
                      : isEmerald
                      ? 'border-[#203833] bg-[#172825]/70 hover:bg-[#1E332F] text-[#9DBAB4]'
                      : isDark
                      ? 'border-[#2A4478] bg-[#16305F]/60 hover:bg-[#16305F] text-[#B8C4DC]'
                      : 'border-[#C3CCDA] bg-[#F8FAFC] hover:bg-[#EEF2F6] text-[#46546F]'
                  }`}
                >
                  <span className="font-mono">{item.label}</span>
                  {currentCoordFormat === item.id && (
                    <Check
                      className={`w-4 h-4 ${isEmerald ? 'text-[#10B981]' : 'text-[#3B6FD6]'}`}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Go To Coordinate Form */}
            <div
              className={`p-3 rounded-xl border space-y-2 ${
                isEmerald
                  ? 'bg-[#172825]/60 border-[#203833]'
                  : isDark
                  ? 'bg-[#16305F]/40 border-[#2A4478]'
                  : 'bg-[#F1F5F9] border-[#C3CCDA]'
              }`}
            >
              <span className={`text-xs font-semibold ${isEmerald ? 'text-[#10B981]' : 'text-[#3B6FD6]'}`}>
                {t.coordSwitcher.goTo}
              </span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-[#7F93B8]">{t.coordSwitcher.latitude}</label>
                  <input
                    type="text"
                    value={targetLat}
                    onChange={(e) => setTargetLat(e.target.value)}
                    className={`w-full p-2 text-xs rounded-lg border font-mono ${
                      isEmerald
                        ? 'bg-[#172825] border-[#203833] text-white focus:border-[#10B981]'
                        : isDark
                        ? 'bg-[#16305F] border-[#2A4478]'
                        : 'bg-white border-[#C3CCDA]'
                    }`}
                  />
                </div>
                <div>
                  <label className="text-[10px] text-[#7F93B8]">{t.coordSwitcher.longitude}</label>
                  <input
                    type="text"
                    value={targetLng}
                    onChange={(e) => setTargetLng(e.target.value)}
                    className={`w-full p-2 text-xs rounded-lg border font-mono ${
                      isEmerald
                        ? 'bg-[#172825] border-[#203833] text-white focus:border-[#10B981]'
                        : isDark
                        ? 'bg-[#16305F] border-[#2A4478]'
                        : 'bg-white border-[#C3CCDA]'
                    }`}
                  />
                </div>
              </div>
              <button
                onClick={() => {
                  alert(`Panned to coordinates: ${targetLat}, ${targetLng}`);
                  onCloseCoordSwitcher();
                }}
                className={`w-full py-2 rounded-lg text-xs font-semibold shadow transition-all ${modalBtn}`}
              >
                Jump to Target Coordinates
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= 2. DRAWING TOOLS SELECTOR POPUP ================= */}
      {isDrawMenuOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div
            className={`w-full max-w-lg rounded-2xl border shadow-2xl p-5 space-y-4 select-none ${modalBg}`}
          >
            <div className="flex items-center justify-between border-b pb-3 border-current/10">
              <div className="flex items-center gap-2">
                <PenTool className={`w-5 h-5 ${isEmerald ? 'text-[#10B981]' : 'text-[#3B6FD6]'}`} />
                <h3 className="font-bold text-sm sm:text-base">Tactical Drawing Tool Palette (11 Tools)</h3>
              </div>
              <button onClick={onCloseDrawMenu} className="p-1 rounded-lg hover:bg-current/10">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[60vh] overflow-y-auto pr-1">
              {DRAWING_TOOLS_LIST.map((tool) => {
                const Icon = tool.icon;
                return (
                  <button
                    key={tool.id}
                    onClick={() => {
                      onSelectDrawingTool(tool.id);
                      onCloseDrawMenu();
                    }}
                    className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${
                      isEmerald
                        ? 'bg-[#172825] hover:bg-[#1E332F] border-[#203833] hover:border-[#10B981]/60'
                        : isDark
                        ? 'bg-[#16305F]/80 hover:bg-[#20407A] border-[#2A4478]'
                        : 'bg-[#F8FAFC] hover:bg-[#F1F5F9] border-[#C3CCDA]'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        isEmerald
                          ? 'bg-[#10B981]/20 text-[#10B981]'
                          : 'bg-[#3B6FD6]/20 text-[#3B6FD6]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold">{tool.label}</div>
                      <div className={`text-[10px] ${isEmerald ? 'text-[#7F9D96]' : 'text-[#7F93B8]'}`}>
                        {tool.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ================= 3. PROJECT OVERFLOW MENU (3-DOTS) ================= */}
      {isOverflowOpen && (
        <div className="fixed inset-0 z-50" onClick={onCloseOverflow}>
          <div
            onClick={(e) => e.stopPropagation()}
            className={`absolute top-12 right-3 w-64 rounded-xl border shadow-2xl p-2 space-y-1 select-none z-50 ${
              isEmerald
                ? 'bg-[#121E1C] border-[#203833] text-white shadow-[0_0_30px_rgba(16,185,129,0.25)]'
                : isDark
                ? 'bg-[#16305F] border-[#2A4478] text-white'
                : 'bg-white border-[#C3CCDA] text-[#0A1A3A]'
            }`}
          >
            <button
              onClick={() => {
                onCloseOverflow();
                onNavigateScreen('S9_EXCHANGE');
              }}
              className={`w-full px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-colors ${
                isEmerald ? 'hover:bg-[#10B981] hover:text-white' : 'hover:bg-[#3B6FD6] hover:text-white'
              }`}
            >
              <Download
                className={`w-4 h-4 ${isEmerald ? 'text-[#10B981]' : 'text-[#3B6FD6]'}`}
              />
              <span>{t.exportProject}</span>
            </button>

            <button
              onClick={() => {
                onCloseOverflow();
                onNavigateScreen('S9_EXCHANGE');
              }}
              className={`w-full px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-colors ${
                isEmerald ? 'hover:bg-[#10B981] hover:text-white' : 'hover:bg-[#3B6FD6] hover:text-white'
              }`}
            >
              <Upload
                className={`w-4 h-4 ${isEmerald ? 'text-[#10B981]' : 'text-[#3B6FD6]'}`}
              />
              <span>{t.importProject}</span>
            </button>

            <button
              onClick={() => {
                onCloseOverflow();
                alert('Project duplicated as "Copy of Strategic Corridor"');
              }}
              className={`w-full px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-colors ${
                isEmerald ? 'hover:bg-[#10B981] hover:text-white' : 'hover:bg-[#3B6FD6] hover:text-white'
              }`}
            >
              <Copy className={`w-4 h-4 ${isEmerald ? 'text-[#10B981]' : 'text-[#3B6FD6]'}`} />
              <span>{t.duplicateProject}</span>
            </button>

            <button
              onClick={() => {
                onCloseOverflow();
                onNavigateScreen('S11_PAIRING');
              }}
              className={`w-full px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-colors ${
                isEmerald ? 'hover:bg-[#10B981] hover:text-white' : 'hover:bg-[#3B6FD6] hover:text-white'
              }`}
            >
              <Navigation className={`w-4 h-4 ${isEmerald ? 'text-[#10B981]' : 'text-[#3B6FD6]'}`} />
              <span>Pair Phone Remote</span>
            </button>

            <div className={`h-[1px] my-1 ${isEmerald ? 'bg-[#203833]' : isDark ? 'bg-[#2A4478]' : 'bg-[#E2E8F0]'}`} />

            <button
              onClick={() => {
                onCloseOverflow();
                onNavigateScreen('S1_HOME');
              }}
              className={`w-full px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-colors ${
                isEmerald ? 'hover:bg-[#172825]' : 'hover:bg-current/10'
              }`}
            >
              <LogOut className="w-4 h-4" />
              <span>{t.closeProject}</span>
            </button>

            <button
              onClick={() => {
                onCloseOverflow();
                setShowDeleteConfirm(true);
              }}
              className="w-full px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 text-[#E3201B] hover:bg-[#E3201B]/15 transition-colors"
            >
              <Trash2 className="w-4 h-4 text-[#E3201B]" />
              <span>{t.deleteProject}</span>
            </button>
          </div>
        </div>
      )}

      {/* ================= 4. DELETE CONFIRMATION DIALOG ================= */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div
            className={`w-full max-w-sm rounded-2xl border shadow-2xl p-5 space-y-4 select-none ${
              isEmerald
                ? 'bg-[#121E1C] border-[#203833] text-white shadow-[0_0_30px_rgba(16,185,129,0.2)]'
                : isDark
                ? 'bg-[#0F2147] border-[#2A4478] text-white'
                : 'bg-white border-[#C3CCDA] text-[#0A1A3A]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E3201B]/20 flex items-center justify-center text-[#E3201B] shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm">{t.deleteProject}</h4>
                <p className={`text-xs ${isEmerald ? 'text-[#7F9D96]' : 'text-[#7F93B8]'}`}>{t.deleteConfirm}</p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold ${
                  isEmerald
                    ? 'bg-[#172825] text-[#9DBAB4] hover:bg-[#203833]'
                    : isDark
                    ? 'bg-[#16305F] text-[#B8C4DC]'
                    : 'bg-[#E2E8F0] text-[#46546F]'
                }`}
              >
                {t.cancel}
              </button>
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  onDeleteProject();
                }}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#E3201B] hover:bg-[#C91A16] text-white shadow"
              >
                {t.delete}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
