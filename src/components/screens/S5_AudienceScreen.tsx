import React from 'react';
import { X, Tv, Shield } from 'lucide-react';
import { LanguageMode, LayoutMode, MapObject, SceneItem, ThemeMode } from '../../types';
import { MapCanvas } from '../MapCanvas';

interface S5AudienceScreenProps {
  theme: ThemeMode;
  language: LanguageMode;
  layoutMode: LayoutMode;
  scenes: SceneItem[];
  currentSceneIndex: number;
  onExit: () => void;
  objects: MapObject[];
}

export const S5_AudienceScreen: React.FC<S5AudienceScreenProps> = ({
  theme,
  language,
  layoutMode,
  scenes,
  currentSceneIndex,
  onExit,
  objects,
}) => {
  const isEmerald = theme === 'emerald';
  const scene = scenes[currentSceneIndex] || scenes[0];

  return (
    <div className="relative w-full h-full overflow-hidden select-none bg-black">
      {/* Pristine Audience Map Canvas (Clean feed) */}
      <MapCanvas
        theme={theme}
        layoutMode={layoutMode}
        activeTool="SELECT"
        drawingTool={null}
        objects={objects}
        selectedObjectId={null}
        onSelectObject={() => {}}
        isPresenter={false}
        isAudience={true}
        showLocationDot={true}
      />

      {/* Broadcast Graphics Overlays (Z1–Z5) */}
      <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-8">
        {/* Z1 Top Alert / Headline */}
        {scene.headline && (
          <div
            className={`${
              isEmerald
                ? 'bg-[#121E1C]/95 text-white border-l-4 border-[#10B981] shadow-[0_0_30px_rgba(16,185,129,0.25)]'
                : 'bg-[#0A1A3A]/90 text-white border-l-4 border-[#3B6FD6] shadow-2xl'
            } px-5 py-2.5 rounded-r-xl backdrop-blur-md max-w-xl`}
          >
            <div className={`flex items-center gap-2 text-[10px] ${isEmerald ? 'text-[#10B981]' : 'text-[#3B6FD6]'} font-mono tracking-widest font-bold uppercase`}>
              <span className="w-2 h-2 rounded-full bg-[#E3201B] animate-ping" />
              LIVE THEATER BRIEFING
            </div>
            <h2 className="text-lg font-black tracking-tight mt-0.5">{scene.headline}</h2>
          </div>
        )}

        {/* Bottom Section: Z2 Lower Third & Z5 Stat Card */}
        <div className="flex items-end justify-between gap-4">
          {scene.lowerThirdName && (
            <div
              className={`${
                isEmerald
                  ? 'bg-[#121E1C]/95 text-white border-b-4 border-[#10B981] shadow-[0_0_30px_rgba(16,185,129,0.25)]'
                  : 'bg-[#0A1A3A]/95 text-white border-b-4 border-[#3B6FD6] shadow-2xl'
              } px-6 py-3.5 rounded-t-2xl backdrop-blur-md max-w-md`}
            >
              <h3 className="text-base font-extrabold tracking-tight">{scene.lowerThirdName}</h3>
              <p className={`text-xs ${isEmerald ? 'text-[#9DBAB4]' : 'text-[#9DBBF8]'} font-medium`}>{scene.lowerThirdTitle}</p>
            </div>
          )}

          {scene.hasInfoCard && (
            <div
              className={`${
                isEmerald
                  ? 'bg-[#121E1C]/90 text-white border border-[#203833] shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                  : 'bg-[#0A1A3A]/90 text-white border border-[#2A4478] shadow-2xl'
              } p-4 rounded-2xl backdrop-blur-md text-right`}
            >
              <div className={`text-[10px] ${isEmerald ? 'text-[#7F9D96]' : 'text-[#7F93B8]'} font-mono font-semibold uppercase`}>
                {scene.infoCardLabel}
              </div>
              <div className="text-xl font-black text-[#FBBF24] font-mono">
                {scene.infoCardValue}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Subtle In-App Exit Indicator */}
      <div className="absolute top-3 right-3 z-30 flex items-center gap-2 opacity-30 hover:opacity-100 transition-opacity">
        <span className="text-[10px] font-mono bg-black/60 text-white px-2 py-1 rounded">
          AUDIENCE HDMI FEED (1080p60)
        </span>
        <button
          onClick={onExit}
          className="w-8 h-8 rounded-lg bg-black/80 text-white hover:bg-[#E3201B] flex items-center justify-center transition-colors shadow"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
