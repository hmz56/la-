import React, { useState } from 'react';
import { ArrowLeft, Download, Upload, FileText, CheckCircle2, AlertTriangle, FileCode } from 'lucide-react';
import { LanguageMode, ThemeMode } from '../../types';

interface S9ExchangeWizardProps {
  theme: ThemeMode;
  language: LanguageMode;
  onBack: () => void;
}

export const S9_ExchangeWizard: React.FC<S9ExchangeWizardProps> = ({
  theme,
  language,
  onBack,
}) => {
  const isEmerald = theme === 'emerald';
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState<'export' | 'import'>('export');
  const [exportFormat, setExportFormat] = useState('.mapx');

  return (
    <div
      className={`w-full h-full flex flex-col select-none transition-colors ${
        isEmerald ? 'bg-[#0A1312] text-white' : isDark ? 'bg-[#0A1A3A] text-white' : 'bg-[#EEF1F6] text-[#0A1A3A]'
      }`}
    >
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
          <h1 className="text-base font-bold">S9: Export & Import Center</h1>
        </div>
      </header>

      <div className="flex-1 p-6 max-w-3xl w-full mx-auto space-y-6 overflow-y-auto">
        {/* Tab Switcher */}
        <div className={`flex rounded-xl p-1 border ${isEmerald ? 'bg-[#0F1A18] border-[#203833]' : 'bg-current/5 border-current/10'} max-w-sm`}>
          <button
            onClick={() => setActiveTab('export')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'export'
                ? isEmerald ? 'bg-[#10B981] text-white shadow-[0_0_12px_rgba(16,185,129,0.3)]' : 'bg-[#3B6FD6] text-white shadow'
                : isEmerald ? 'text-[#7F9D96]' : 'text-[#7F93B8]'
            }`}
          >
            Export Briefing
          </button>
          <button
            onClick={() => setActiveTab('import')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'import'
                ? isEmerald ? 'bg-[#10B981] text-white shadow-[0_0_12px_rgba(16,185,129,0.3)]' : 'bg-[#3B6FD6] text-white shadow'
                : isEmerald ? 'text-[#7F9D96]' : 'text-[#7F93B8]'
            }`}
          >
            Import Briefing / GIS
          </button>
        </div>

        {activeTab === 'export' ? (
          <div className="space-y-4">
            <h2 className={`text-sm font-bold ${isEmerald ? 'text-[#7F9D96]' : 'text-[#7F93B8]'} uppercase`}>Select Export Format</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  id: '.mapx',
                  name: 'MapX Briefing Package (.mapx)',
                  desc: 'Complete standalone package: all layers, scenes, styles, offline raster tiles',
                },
                {
                  id: '.mapxlayer',
                  name: 'Tactical Layer (.mapxlayer)',
                  desc: 'Single shareable vector and styling layer file',
                },
                {
                  id: 'geojson',
                  name: 'GeoJSON Vector Dataset',
                  desc: 'Standard WGS 84 open vector interchange format',
                },
                {
                  id: 'kml',
                  name: 'Google Earth / KML (.kmz)',
                  desc: 'Compressed KML with point markers and polylines',
                },
                {
                  id: 'pdf',
                  name: 'Tactical Briefing PDF Report',
                  desc: 'High-res vector map pages, scene cards, coordinates glossary',
                },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setExportFormat(item.id)}
                  className={`p-4 rounded-2xl border text-left space-y-1 transition-all ${
                    exportFormat === item.id
                      ? isEmerald
                        ? 'border-[#10B981] bg-[#10B981]/15 ring-2 ring-[#10B981]/40'
                        : 'border-[#3B6FD6] bg-[#3B6FD6]/15 ring-2 ring-[#3B6FD6]/40'
                      : isEmerald
                      ? 'border-[#203833] bg-[#121E1C]'
                      : isDark
                      ? 'border-[#2A4478] bg-[#16305F]/60'
                      : 'border-[#C3CCDA] bg-white'
                  }`}
                >
                  <div className={`text-xs font-bold ${isEmerald ? 'text-[#34D399]' : 'text-[#3B6FD6]'}`}>{item.name}</div>
                  <div className={`text-[11px] ${isEmerald ? 'text-[#7F9D96]' : 'text-[#7F93B8]'}`}>{item.desc}</div>
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                alert(`Export generated successfully: Gulf_Strategic_Corridor${exportFormat}`);
              }}
              className={`w-full py-3 rounded-xl ${
                isEmerald
                  ? 'bg-[#10B981] hover:bg-[#059669] shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                  : 'bg-[#3B6FD6] hover:bg-[#2F5DB8]'
              } text-white text-xs font-bold flex items-center justify-center gap-2 shadow transition-all`}
            >
              <Download className="w-4 h-4" />
              <span>Generate & Download {exportFormat}</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div
              className={`p-8 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center text-center space-y-2 ${
                isEmerald
                  ? 'border-[#203833] bg-[#121E1C]'
                  : isDark
                  ? 'border-[#2A4478] bg-[#16305F]/30'
                  : 'border-[#C3CCDA] bg-white'
              }`}
            >
              <Upload className={`w-10 h-10 ${isEmerald ? 'text-[#10B981]' : 'text-[#3B6FD6]'}`} />
              <div className="text-sm font-bold">Select .mapx, .kml, or GeoJSON to Import</div>
              <div className={`text-xs ${isEmerald ? 'text-[#7F9D96]' : 'text-[#7F93B8]'}`}>
                FIPS 140-3 integrity checksum validation runs automatically
              </div>
            </div>

            {/* Fidelity Report Preview */}
            <div
              className={`p-4 rounded-2xl border space-y-2 ${
                isEmerald
                  ? 'bg-[#121E1C] border-[#203833]'
                  : isDark
                  ? 'bg-[#0F2147] border-[#2A4478]'
                  : 'bg-white border-[#C3CCDA]'
              }`}
            >
              <div className={`flex items-center gap-2 text-xs font-bold ${isEmerald ? 'text-[#34D399]' : 'text-[#3DB57A]'}`}>
                <CheckCircle2 className="w-4 h-4" />
                <span>Validation Passed: Ready for Import</span>
              </div>
              <div className={`text-xs font-mono ${isEmerald ? 'text-[#7F9D96]' : 'text-[#7F93B8]'} space-y-1`}>
                <div>Source: Hormuz_Patrol_Route_v2.geojson</div>
                <div>Extents: 26°10'N - 27°05'N, 55°40'E - 56°45'E</div>
                <div>Features: 14 Polylines, 6 Points (Reprojected from EPSG:4326 to WGS 84)</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
