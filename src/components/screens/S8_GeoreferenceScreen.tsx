import React, { useState } from 'react';
import { ArrowLeft, Crosshair, Check, RefreshCw, ZoomIn, ZoomOut, Image, Table } from 'lucide-react';
import { LanguageMode, ThemeMode } from '../../types';

interface S8GeoreferenceScreenProps {
  theme: ThemeMode;
  language: LanguageMode;
  onBack: () => void;
}

export const S8_GeoreferenceScreen: React.FC<S8GeoreferenceScreenProps> = ({
  theme,
  language,
  onBack,
}) => {
  const isEmerald = theme === 'emerald';
  const isDark = theme === 'dark';
  const [points, setPoints] = useState([
    { id: 1, imgX: '412', imgY: '185', mapLat: '26.5502', mapLng: '56.2625', residual: '0.84 px' },
    { id: 2, imgX: '890', imgY: '230', mapLat: '26.4811', mapLng: '56.3980', residual: '1.12 px' },
    { id: 3, imgX: '310', imgY: '640', mapLat: '26.3105', mapLng: '56.1200', residual: '0.65 px' },
  ]);

  return (
    <div
      className={`w-full h-full flex flex-col select-none transition-colors ${
        isEmerald ? 'bg-[#0A1312] text-white' : isDark ? 'bg-[#0A1A3A] text-white' : 'bg-[#EEF1F6] text-[#0A1A3A]'
      }`}
    >
      {/* Top Bar */}
      <header
        className={`h-14 px-4 border-b flex items-center justify-between shrink-0 ${
          isEmerald
            ? 'bg-[#0F1A18] border-[#203833]'
            : isDark
            ? 'bg-[#0F2147] border-[#2A4478]'
            : 'bg-[#E3E8F0] border-[#C3CCDA]'
        }`}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className={`w-9 h-9 rounded-xl flex items-center justify-center ${
              isEmerald ? 'hover:bg-[#172825]' : isDark ? 'hover:bg-[#16305F]' : 'hover:bg-[#CBD5E1]'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-sm font-bold">S8: Georeference Alignment Tool</h1>
            <span className={`text-[10px] ${isEmerald ? 'text-[#7F9D96]' : 'text-[#7F93B8]'} font-mono`}>
              Aerial Reconnaissance GeoTIFF ↔ Vector Reference
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-lg bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40 text-xs font-mono font-bold">
            RMSE: 0.87 px (Acceptable &lt; 2.0)
          </div>
          <button
            onClick={() => {
              alert('Georeferenced layer baked and added to active project!');
              onBack();
            }}
            className={`px-4 py-2 rounded-xl ${
              isEmerald
                ? 'bg-[#10B981] hover:bg-[#059669] shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                : 'bg-[#3B6FD6] hover:bg-[#2F5DB8]'
            } text-white text-xs font-semibold flex items-center gap-1.5 shadow`}
          >
            <Check className="w-4 h-4" />
            <span>Apply Transformation</span>
          </button>
        </div>
      </header>

      {/* Main Dual-View Workspace */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left View: Raw Raster Image View */}
        <div
          className={`flex-1 border-r relative flex flex-col ${
            isEmerald
              ? 'border-[#203833] bg-[#091211]'
              : isDark
              ? 'border-[#2A4478] bg-[#07132B]'
              : 'border-[#C3CCDA] bg-[#CBD5E1]'
          }`}
        >
          <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md bg-black/60 text-white text-[10px] font-mono">
            RAW RASTER (1920×1080) • GCP POINT MODE
          </div>
          <div className="flex-1 flex items-center justify-center p-8 relative overflow-hidden">
            <div className="w-4/5 h-4/5 rounded-xl border border-white/20 bg-gradient-to-br from-zinc-700 to-zinc-900 shadow-2xl relative flex items-center justify-center">
              <span className="text-xs font-mono text-zinc-400">UNREFERENCED AERIAL MOSAIC</span>
              {/* Plotted GCP Points */}
              <div className="absolute top-[20%] left-[25%] -translate-x-1/2 -translate-y-1/2 flex items-center gap-1">
                <Crosshair className="w-5 h-5 text-[#E3201B] animate-pulse" />
                <span className="text-[10px] bg-red-600 text-white px-1 rounded font-bold font-mono">
                  GCP-1
                </span>
              </div>
              <div className="absolute top-[30%] left-[75%] -translate-x-1/2 -translate-y-1/2 flex items-center gap-1">
                <Crosshair className="w-5 h-5 text-[#E3201B] animate-pulse" />
                <span className="text-[10px] bg-red-600 text-white px-1 rounded font-bold font-mono">
                  GCP-2
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right View: Vector Reference Map & Ground Control Points Table */}
        <div className="w-full md:w-[420px] flex flex-col shrink-0">
          <div
            className={`p-3 border-b flex items-center justify-between text-xs font-bold ${
              isEmerald
                ? 'bg-[#0F1A18] border-[#203833]'
                : isDark
                ? 'bg-[#0F2147] border-[#2A4478]'
                : 'bg-[#E3E8F0] border-[#C3CCDA]'
            }`}
          >
            <span>Ground Control Points (GCP)</span>
            <button
              onClick={() => {
                const nextId = points.length + 1;
                setPoints((prev) => [
                  ...prev,
                  {
                    id: nextId,
                    imgX: '550',
                    imgY: '420',
                    mapLat: '26.4120',
                    mapLng: '56.2800',
                    residual: '0.92 px',
                  },
                ]);
              }}
              className={`px-2.5 py-1 rounded ${
                isEmerald ? 'bg-[#10B981] hover:bg-[#059669]' : 'bg-[#3B6FD6] hover:bg-[#2F5DB8]'
              } text-white text-[11px] font-semibold transition-colors`}
            >
              + Add Point
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {points.map((pt) => (
              <div
                key={pt.id}
                className={`p-3 rounded-xl border text-xs space-y-1.5 ${
                  isEmerald
                    ? 'bg-[#121E1C] border-[#203833]'
                    : isDark
                    ? 'bg-[#16305F] border-[#2A4478]'
                    : 'bg-white border-[#C3CCDA]'
                }`}
              >
                <div className="flex items-center justify-between font-bold">
                  <span className={isEmerald ? 'text-[#10B981]' : 'text-[#3B6FD6]'}>GCP Point #{pt.id}</span>
                  <span className={`font-mono ${isEmerald ? 'text-[#34D399]' : 'text-[#3DB57A]'}`}>{pt.residual}</span>
                </div>
                <div className={`grid grid-cols-2 gap-2 text-[11px] font-mono ${isEmerald ? 'text-[#7F9D96]' : 'text-[#7F93B8]'}`}>
                  <div>Img: ({pt.imgX}, {pt.imgY}) px</div>
                  <div>Map: {pt.mapLat}°N, {pt.mapLng}°E</div>
                </div>
              </div>
            ))}
          </div>

          <div
            className={`p-3 border-t text-[11px] font-mono ${
              isEmerald
                ? 'border-[#203833] bg-[#0F1A18] text-[#7F9D96]'
                : isDark
                ? 'border-[#2A4478] bg-[#0F2147] text-[#7F93B8]'
                : 'border-[#C3CCDA] bg-[#E3E8F0] text-[#7F93B8]'
            }`}
          >
            Affine 1st Order Polynomial Transformation • Reproject to EPSG:3857
          </div>
        </div>
      </div>
    </div>
  );
};
