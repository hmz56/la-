import React, { useState } from 'react';
import {
  Wifi,
  ChevronLeft,
  ChevronRight,
  Flame,
  Moon,
  Compass,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Plus,
  Minus,
  Layers,
  Eye,
  EyeOff,
  Radio,
  CheckCircle2,
} from 'lucide-react';
import { LanguageMode, LayerItem, SceneItem, ThemeMode } from '../../types';

interface S6RemoteScreenProps {
  theme: ThemeMode;
  language: LanguageMode;
  scenes: SceneItem[];
  layers: LayerItem[];
  onExit: () => void;
}

export const S6_RemoteScreen: React.FC<S6RemoteScreenProps> = ({
  theme,
  language,
  scenes,
  layers,
  onExit,
}) => {
  const isEmerald = theme === 'emerald';
  const isDark = theme === 'dark';
  const [sceneIndex, setSceneIndex] = useState(0);
  const [laserActive, setLaserActive] = useState(false);
  const [isBlackout, setIsBlackout] = useState(false);
  const [showLayers, setShowLayers] = useState(false);

  const scene = scenes[sceneIndex] || scenes[0];

  return (
    <div
      className={`w-full h-full flex flex-col max-w-md mx-auto select-none overflow-y-auto transition-colors ${
        isEmerald ? 'bg-[#0A1312] text-white' : isDark ? 'bg-[#0A1A3A] text-white' : 'bg-[#EEF1F6] text-[#0A1A3A]'
      }`}
    >
      {/* Wireless Status Header */}
      <header
        className={`h-14 px-4 border-b flex items-center justify-between shrink-0 ${
          isEmerald
            ? 'bg-[#0F1A18] border-[#203833]'
            : isDark
            ? 'bg-[#0F2147] border-[#2A4478]'
            : 'bg-[#E3E8F0] border-[#C3CCDA]'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${isEmerald ? 'bg-[#10B981] shadow-[0_0_8px_#10B981]' : 'bg-[#3DB57A] shadow-[0_0_6px_#3DB57A]'}`} />
          <div>
            <div className="text-xs font-bold leading-none">MapX Controller v1</div>
            <div className={`text-[10px] ${isEmerald ? 'text-[#7F9D96]' : 'text-[#7F93B8]'} font-mono`}>
              Connected to Tablet Host • 12ms
            </div>
          </div>
        </div>

        <button
          onClick={onExit}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
            isEmerald
              ? 'bg-[#172825] text-[#9DBAB4] hover:bg-[#203833]'
              : isDark
              ? 'bg-[#16305F] text-[#B8C4DC]'
              : 'bg-white text-[#46546F]'
          }`}
        >
          Close
        </button>
      </header>

      {/* Main Remote Body */}
      <main className="flex-1 p-4 space-y-4">
        {/* Current Scene Card */}
        <div
          className={`p-4 rounded-2xl border shadow-lg space-y-2 ${
            isEmerald
              ? 'bg-[#121E1C] border-[#203833]'
              : isDark
              ? 'bg-[#0F2147] border-[#2A4478]'
              : 'bg-white border-[#C3CCDA]'
          }`}
        >
          <div className={`flex items-center justify-between text-xs ${isEmerald ? 'text-[#7F9D96]' : 'text-[#7F93B8]'}`}>
            <span className="font-mono">CURRENT SCENE</span>
            <span className={`font-bold ${isEmerald ? 'text-[#10B981]' : 'text-[#3B6FD6]'}`}>
              {scene.number} of {scenes.length}
            </span>
          </div>

          <h2 className="text-base font-black tracking-tight">{scene.name}</h2>

          {scene.headline && (
            <p className={`text-xs ${isEmerald ? 'text-[#9DBAB4] bg-[#172825]' : 'text-[#7F93B8] bg-black/10'} font-medium p-2 rounded-lg`}>
              {scene.headline}
            </p>
          )}

          <div className={`text-[11px] ${isEmerald ? 'text-[#7F9D96]' : 'text-[#7F93B8]'} font-mono`}>
            Transition: {scene.transition}
          </div>
        </div>

        {/* Big 72dp Previous / Next Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setSceneIndex((prev) => Math.max(0, prev - 1))}
            disabled={sceneIndex === 0}
            className={`h-[72px] rounded-2xl ${
              isEmerald
                ? 'bg-[#172825] hover:bg-[#203833] border-[#203833]'
                : 'bg-[#16305F] hover:bg-[#20407A] border-[#2A4478]'
            } text-white disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center gap-2 shadow-lg border transition-all active:scale-95`}
          >
            <ChevronLeft className="w-6 h-6" />
            <span className="text-sm font-bold">PREVIOUS</span>
          </button>

          <button
            onClick={() => setSceneIndex((prev) => Math.min(scenes.length - 1, prev + 1))}
            disabled={sceneIndex === scenes.length - 1}
            className={`h-[72px] rounded-2xl ${
              isEmerald
                ? 'bg-[#10B981] hover:bg-[#059669] shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                : 'bg-[#3B6FD6] hover:bg-[#2F5DB8]'
            } text-white disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95`}
          >
            <span className="text-sm font-bold">NEXT</span>
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* 4-Way Pan Pad & Zoom Control */}
        <div
          className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 shadow-sm ${
            isEmerald
              ? 'bg-[#121E1C] border-[#203833]'
              : isDark
              ? 'bg-[#0F2147] border-[#2A4478]'
              : 'bg-white border-[#C3CCDA]'
          }`}
        >
          <span className={`text-[10px] font-mono ${isEmerald ? 'text-[#7F9D96]' : 'text-[#7F93B8]'} tracking-widest uppercase`}>
            Live Pan & Direction Pad
          </span>

          <div className="grid grid-cols-3 gap-2 w-48 h-48 items-center justify-items-center">
            <div />
            <button
              onClick={() => {}}
              className={`w-12 h-12 rounded-xl ${
                isEmerald
                  ? 'bg-[#172825] hover:bg-[#203833] border-[#203833]'
                  : 'bg-[#16305F] hover:bg-[#20407A] border-[#2A4478]'
              } flex items-center justify-center text-white border active:scale-90 transition-transform shadow`}
            >
              <ArrowUp className="w-5 h-5" />
            </button>
            <div />

            <button
              onClick={() => {}}
              className={`w-12 h-12 rounded-xl ${
                isEmerald
                  ? 'bg-[#172825] hover:bg-[#203833] border-[#203833]'
                  : 'bg-[#16305F] hover:bg-[#20407A] border-[#2A4478]'
              } flex items-center justify-center text-white border active:scale-90 transition-transform shadow`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => {}}
              title="Reset View"
              className={`w-12 h-12 rounded-xl ${
                isEmerald
                  ? 'bg-[#10B981] hover:bg-[#059669] shadow-[0_0_12px_rgba(16,185,129,0.35)]'
                  : 'bg-[#3B6FD6] hover:bg-[#2F5DB8]'
              } flex items-center justify-center text-white active:scale-90 transition-transform shadow font-bold text-xs`}
            >
              <Compass className="w-5 h-5" />
            </button>

            <button
              onClick={() => {}}
              className={`w-12 h-12 rounded-xl ${
                isEmerald
                  ? 'bg-[#172825] hover:bg-[#203833] border-[#203833]'
                  : 'bg-[#16305F] hover:bg-[#20407A] border-[#2A4478]'
              } flex items-center justify-center text-white border active:scale-90 transition-transform shadow`}
            >
              <ArrowRight className="w-5 h-5" />
            </button>

            <div />
            <button
              onClick={() => {}}
              className={`w-12 h-12 rounded-xl ${
                isEmerald
                  ? 'bg-[#172825] hover:bg-[#203833] border-[#203833]'
                  : 'bg-[#16305F] hover:bg-[#20407A] border-[#2A4478]'
              } flex items-center justify-center text-white border active:scale-90 transition-transform shadow`}
            >
              <ArrowDown className="w-5 h-5" />
            </button>
            <div />
          </div>

          {/* Quick Zoom Buttons */}
          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={() => {}}
              className={`px-4 py-2 rounded-xl ${
                isEmerald
                  ? 'bg-[#172825] border-[#203833] text-white'
                  : 'bg-[#16305F] border-[#2A4478] text-white'
              } flex items-center gap-1.5 text-xs font-bold border`}
            >
              <Minus className="w-4 h-4" />
              <span>Zoom Out</span>
            </button>
            <button
              onClick={() => {}}
              className={`px-4 py-2 rounded-xl ${
                isEmerald
                  ? 'bg-[#172825] border-[#203833] text-white'
                  : 'bg-[#16305F] border-[#2A4478] text-white'
              } flex items-center gap-1.5 text-xs font-bold border`}
            >
              <Plus className="w-4 h-4" />
              <span>Zoom In</span>
            </button>
          </div>
        </div>

        {/* Laser Pointer & Blackout Triggers */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onMouseDown={() => setLaserActive(true)}
            onMouseUp={() => setLaserActive(false)}
            onTouchStart={() => setLaserActive(true)}
            onTouchEnd={() => setLaserActive(false)}
            className={`h-14 rounded-2xl flex items-center justify-center gap-2 font-bold text-xs transition-all shadow ${
              laserActive
                ? 'bg-[#E3201B] text-white scale-95 shadow-[0_0_12px_#E3201B]'
                : isEmerald
                ? 'bg-[#172825] text-white border border-[#203833]'
                : 'bg-[#16305F] text-white border border-[#2A4478]'
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>HOLD FOR LASER</span>
          </button>

          <button
            onClick={() => setIsBlackout(!isBlackout)}
            className={`h-14 rounded-2xl flex items-center justify-center gap-2 font-bold text-xs transition-all shadow ${
              isBlackout
                ? 'bg-zinc-900 text-zinc-300 ring-2 ring-white'
                : isEmerald
                ? 'bg-[#172825] text-white border border-[#203833]'
                : 'bg-[#16305F] text-white border border-[#2A4478]'
            }`}
          >
            <Moon className="w-4 h-4" />
            <span>BLACKOUT SCREEN</span>
          </button>
        </div>

        {/* Live Presentation Layer Overrides */}
        <div
          className={`p-4 rounded-2xl border space-y-2 ${
            isEmerald
              ? 'bg-[#121E1C] border-[#203833]'
              : isDark
              ? 'bg-[#0F2147] border-[#2A4478]'
              : 'bg-white border-[#C3CCDA]'
          }`}
        >
          <div className={`flex items-center justify-between text-xs font-bold ${isEmerald ? 'text-[#7F9D96]' : 'text-[#7F93B8]'}`}>
            <span className="flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              <span>OVERRIDE LAYERS</span>
            </span>
          </div>

          <div className="space-y-1.5">
            {layers.slice(0, 3).map((layer) => (
              <div
                key={layer.id}
                className={`flex items-center justify-between p-2 rounded-lg ${isEmerald ? 'bg-[#172825]' : 'bg-black/10'} text-xs`}
              >
                <span className="font-medium truncate">{layer.name}</span>
                <button className={`${isEmerald ? 'text-[#10B981]' : 'text-[#3B6FD6]'} p-1`}>
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
