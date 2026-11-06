import React, { useState, useEffect } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Flame,
  Radio,
  Tv,
  Maximize2,
  Minimize2,
  MousePointer,
  Moon,
  Sun,
} from 'lucide-react';
import { LanguageMode, LayoutMode, MapObject, SceneItem, ThemeMode } from '../../types';
import { MapCanvas } from '../MapCanvas';
import { I18N } from '../../constants/theme';

interface S4PresenterScreenProps {
  theme: ThemeMode;
  language: LanguageMode;
  layoutMode: LayoutMode;
  scenes: SceneItem[];
  currentSceneIndex: number;
  onExit: () => void;
  objects: MapObject[];
}

export const S4_PresenterScreen: React.FC<S4PresenterScreenProps> = ({
  theme,
  language,
  layoutMode,
  scenes,
  currentSceneIndex,
  onExit,
  objects,
}) => {
  const isEmerald = theme === 'emerald';
  const isDark = theme === 'dark';
  const t = I18N[language];
  const [sceneIndex, setSceneIndex] = useState(currentSceneIndex);
  const [showControls, setShowControls] = useState(true);
  const [showOverlays, setShowOverlays] = useState(true);
  const [isBlackout, setIsBlackout] = useState(false);
  const [laserActive, setLaserActive] = useState(false);
  const [laserPos, setLaserPos] = useState({ x: 500, y: 300 });

  const scene = scenes[sceneIndex] || scenes[0];

  const handlePrev = () => {
    setSceneIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setSceneIndex((prev) => Math.min(scenes.length - 1, prev + 1));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (laserActive) {
      setLaserPos({ x: e.clientX, y: e.clientY });
    }
    setShowControls(true);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`relative w-full h-full overflow-hidden select-none cursor-${laserActive ? 'crosshair' : 'default'} ${
        isEmerald ? 'bg-[#0A1312]' : isDark ? 'bg-[#08152e]' : 'bg-[#d8e2ec]'
      }`}
    >
      {/* Blackout Overlay */}
      {isBlackout && (
        <div className="absolute inset-0 bg-black z-50 flex items-center justify-center text-zinc-600 font-mono text-sm">
          <span>BLACKOUT (B)</span>
        </div>
      )}

      {/* Real Fullscreen Map Canvas */}
      <MapCanvas
        theme={theme}
        layoutMode={layoutMode}
        activeTool="PAN"
        drawingTool={null}
        objects={objects}
        selectedObjectId={null}
        onSelectObject={() => {}}
        isPresenter={true}
        showLocationDot={true}
      />

      {/* Laser Pointer Dot */}
      {laserActive && (
        <div
          className="fixed pointer-events-none z-50 transition-transform duration-75"
          style={{
            left: laserPos.x,
            top: laserPos.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="w-5 h-5 rounded-full bg-[#E3201B] shadow-[0_0_15px_#E3201B] animate-ping" />
          <div className="w-3 h-3 rounded-full bg-white absolute top-1 left-1" />
        </div>
      )}

      {/* ================= Z1–Z5 BROADCAST GRAPHICS OVERLAYS ================= */}
      {showOverlays && (
        <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-6">
          {/* Top Section: Z1 Top Alert / Headline */}
          <div className="flex items-start justify-between">
            {scene.headline ? (
              <div
                className={`${
                  isEmerald
                    ? 'bg-[#121E1C]/95 text-white border-l-4 border-[#10B981] shadow-[0_0_25px_rgba(16,185,129,0.2)]'
                    : 'bg-[#0A1A3A]/90 text-white border-l-4 border-[#3B6FD6] shadow-2xl'
                } px-4 py-2 rounded-r-xl backdrop-blur-md max-w-xl`}
              >
                <div className={`flex items-center gap-2 text-[10px] ${isEmerald ? 'text-[#10B981]' : 'text-[#3B6FD6]'} font-mono tracking-widest font-bold uppercase`}>
                  <span className="w-2 h-2 rounded-full bg-[#E3201B] animate-ping" />
                  LIVE THEATER BRIEFING
                </div>
                <h2 className="text-base sm:text-lg font-black tracking-tight mt-0.5">
                  {scene.headline}
                </h2>
              </div>
            ) : <div />}

            {/* Z3: Location Callout */}
            {scene.locationLabel && (
              <div
                className={`${
                  isEmerald
                    ? 'bg-[#121E1C]/90 text-white border border-[#203833]'
                    : 'bg-[#0A1A3A]/90 text-white border border-[#2A4478]'
                } px-3 py-1.5 rounded-xl shadow-xl backdrop-blur-md text-xs font-mono font-bold flex items-center gap-2`}
              >
                <span className={`w-2 h-2 rounded-full ${isEmerald ? 'bg-[#10B981]' : 'bg-[#3DB57A]'}`} />
                <span>{scene.locationLabel}</span>
              </div>
            )}
          </div>

          {/* Bottom Section: Z2 Lower Third & Z4 Legend / Z5 Stat Card */}
          <div className="flex items-end justify-between gap-4">
            {/* Z2: Lower Third (Speaker Info) */}
            {scene.lowerThirdName ? (
              <div
                className={`${
                  isEmerald
                    ? 'bg-[#121E1C]/95 text-white border-b-4 border-[#10B981] shadow-[0_0_25px_rgba(16,185,129,0.2)]'
                    : 'bg-[#0A1A3A]/95 text-white border-b-4 border-[#3B6FD6] shadow-2xl'
                } px-5 py-3 rounded-t-2xl backdrop-blur-md max-w-md`}
              >
                <h3 className="text-sm sm:text-base font-extrabold tracking-tight">
                  {scene.lowerThirdName}
                </h3>
                <p className={`text-xs ${isEmerald ? 'text-[#9DBAB4]' : 'text-[#9DBBF8]'} font-medium`}>{scene.lowerThirdTitle}</p>
              </div>
            ) : <div />}

            {/* Z5: Key Metric Stat Card */}
            {scene.hasInfoCard && (
              <div
                className={`${
                  isEmerald
                    ? 'bg-[#121E1C]/90 text-white border border-[#203833]'
                    : 'bg-[#0A1A3A]/90 text-white border border-[#2A4478]'
                } p-3.5 rounded-2xl shadow-2xl backdrop-blur-md text-right`}
              >
                <div className={`text-[10px] ${isEmerald ? 'text-[#7F9D96]' : 'text-[#7F93B8]'} font-mono font-semibold uppercase`}>
                  {scene.infoCardLabel}
                </div>
                <div className="text-lg font-black text-[#FBBF24] font-mono">
                  {scene.infoCardValue}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= TRANSIENT 56dp PRESENTER CONTROLS BAR ================= */}
      <div
        className={`absolute bottom-3 left-1/2 -translate-x-1/2 h-[56px] px-4 rounded-2xl border shadow-2xl backdrop-blur-md z-40 flex items-center gap-3 transition-all duration-300 ${
          showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
        } ${
          isEmerald
            ? 'bg-[#0F1A18]/95 border-[#203833] text-white shadow-[0_0_30px_rgba(16,185,129,0.25)]'
            : isDark
            ? 'bg-[#0A1A3A]/95 border-[#2A4478] text-white'
            : 'bg-white/95 border-[#C3CCDA] text-[#0A1A3A]'
        }`}
      >
        {/* Previous Scene Button */}
        <button
          onClick={handlePrev}
          disabled={sceneIndex === 0}
          className={`w-9 h-9 rounded-xl flex items-center justify-center ${
            isEmerald ? 'bg-[#10B981] hover:bg-[#059669]' : 'bg-[#3B6FD6] hover:bg-[#2F5DB8]'
          } text-white disabled:opacity-30 disabled:pointer-events-none transition-all shadow`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Scene Indicator */}
        <div className="text-center px-2">
          <div className="text-xs font-bold whitespace-nowrap">
            Scene {scene.number} / {scenes.length}
          </div>
          <div className={`text-[10px] ${isEmerald ? 'text-[#7F9D96]' : 'text-[#7F93B8]'} max-w-[140px] truncate`}>
            {scene.name}
          </div>
        </div>

        {/* Next Scene Button */}
        <button
          onClick={handleNext}
          disabled={sceneIndex === scenes.length - 1}
          className={`w-9 h-9 rounded-xl flex items-center justify-center ${
            isEmerald ? 'bg-[#10B981] hover:bg-[#059669]' : 'bg-[#3B6FD6] hover:bg-[#2F5DB8]'
          } text-white disabled:opacity-30 disabled:pointer-events-none transition-all shadow`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="w-[1px] h-6 bg-current/20 mx-1" />

        {/* Laser Pointer Toggle */}
        <button
          onClick={() => setLaserActive(!laserActive)}
          title="Laser Pointer"
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
            laserActive
              ? 'bg-[#E3201B] text-white shadow-[0_0_8px_#E3201B]'
              : 'hover:bg-current/10'
          }`}
        >
          <Flame className="w-4 h-4" />
        </button>

        {/* Overlays Toggle */}
        <button
          onClick={() => setShowOverlays(!showOverlays)}
          title="Toggle TV Overlays (Z1–Z5)"
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
            showOverlays ? (isEmerald ? 'text-[#10B981]' : 'text-[#3B6FD6]') : 'opacity-40 hover:bg-current/10'
          }`}
        >
          <Tv className="w-4 h-4" />
        </button>

        {/* Blackout Toggle */}
        <button
          onClick={() => setIsBlackout(!isBlackout)}
          title="Blackout Screen (B)"
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
            isBlackout ? 'bg-zinc-800 text-white' : 'hover:bg-current/10'
          }`}
        >
          <Moon className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-6 bg-current/20 mx-1" />

        {/* Exit Presenter Button */}
        <button
          onClick={onExit}
          title={t.exitPresenter}
          className="h-9 px-3 rounded-xl bg-[#E3201B] hover:bg-[#C91A16] text-white text-xs font-semibold flex items-center gap-1.5 shadow"
        >
          <X className="w-4 h-4" />
          <span>Exit</span>
        </button>
      </div>
    </div>
  );
};
