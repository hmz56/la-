import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, Check, Compass, Layers, Globe } from 'lucide-react';
import { CoordinateFormat, LanguageMode, ThemeMode } from '../../types';
import { I18N } from '../../constants/theme';

interface S2NewProjectDialogProps {
  theme: ThemeMode;
  language: LanguageMode;
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, mapSource: string) => void;
}

export const S2_NewProjectDialog: React.FC<S2NewProjectDialogProps> = ({
  theme,
  language,
  isOpen,
  onClose,
  onCreate,
}) => {
  const isEmerald = theme === 'emerald';
  const isDark = theme === 'dark';
  const t = I18N[language];
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [coordFormat, setCoordFormat] = useState<CoordinateFormat>('DMS');
  const [selectedMap, setSelectedMap] = useState('Mapbox Satellite + Contour (Offline)');
  const [extent, setExtent] = useState('Strait of Hormuz (26°N 56°E)');

  if (!isOpen) return null;

  const handleNext = () => {
    if (!name.trim()) {
      alert('Please enter a project title');
      return;
    }
    setStep(2);
  };

  const handleFinish = () => {
    onCreate(name || 'Untitled Briefing', selectedMap);
    setStep(1);
    setName('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
      <div
        className={`w-full max-w-lg rounded-2xl border shadow-2xl p-6 space-y-5 transition-all ${
          isEmerald
            ? 'bg-[#121E1C] border-[#203833] text-white shadow-[0_0_35px_rgba(16,185,129,0.25)]'
            : isDark
            ? 'bg-[#0F2147] border-[#2A4478] text-white'
            : 'bg-white border-[#C3CCDA] text-[#0A1A3A]'
        }`}
      >
        {/* Wizard Header */}
        <div className="flex items-center justify-between border-b pb-3 border-current/10">
          <div>
            <h3 className="font-bold text-base">
              {step === 1 ? t.step1Title : t.step2Title}
            </h3>
            <span className={`text-xs ${isEmerald ? 'text-[#7F9D96]' : 'text-[#7F93B8]'}`}>Step {step} of 2</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-current/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Step 1: Details & Coordinate System */}
        {step === 1 ? (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className={`text-xs font-semibold ${isEmerald ? 'text-[#7F9D96]' : 'text-[#7F93B8]'}`}>{t.projectName} *</label>
              <input
                type="text"
                placeholder={t.enterProjectName}
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium outline-none ${
                  isEmerald
                    ? 'bg-[#172825] border-[#203833] text-white focus:border-[#10B981]'
                    : isDark
                    ? 'bg-[#16305F] border-[#2A4478] text-white focus:border-[#3B6FD6]'
                    : 'bg-[#F8FAFC] border-[#C3CCDA] text-[#0A1A3A] focus:border-[#2A55B0]'
                }`}
              />
            </div>

            <div className="space-y-1.5">
              <label className={`text-xs font-semibold ${isEmerald ? 'text-[#7F9D96]' : 'text-[#7F93B8]'}`}>{t.author}</label>
              <input
                type="text"
                placeholder="Staff Officer / Presenter Name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium outline-none ${
                  isEmerald
                    ? 'bg-[#172825] border-[#203833] text-white focus:border-[#10B981]'
                    : isDark
                    ? 'bg-[#16305F] border-[#2A4478] text-white'
                    : 'bg-[#F8FAFC] border-[#C3CCDA] text-[#0A1A3A]'
                }`}
              />
            </div>

            <div className="space-y-1.5">
              <label className={`text-xs font-semibold ${isEmerald ? 'text-[#7F9D96]' : 'text-[#7F93B8]'}`}>Default Coordinate Format</label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {(['DD', 'DDM', 'DMS', 'UTM', 'MGRS'] as CoordinateFormat[]).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setCoordFormat(fmt)}
                    className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                      coordFormat === fmt
                        ? isEmerald
                          ? 'bg-[#10B981] text-white border-[#10B981] shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                          : 'bg-[#3B6FD6] text-white border-[#3B6FD6]'
                        : isEmerald
                        ? 'bg-[#172825] border-[#203833] text-[#9DBAB4]'
                        : isDark
                        ? 'bg-[#16305F] border-[#2A4478] text-[#B8C4DC]'
                        : 'bg-[#F1F5F9] border-[#C3CCDA] text-[#46546F]'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Wizard Step 2: Map Basemap & Extent */
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className={`text-xs font-semibold ${isEmerald ? 'text-[#7F9D96]' : 'text-[#7F93B8]'}`}>Initial Offline Basemap</label>
              <div className="space-y-2">
                {[
                  { id: 'sat', name: 'Mapbox Satellite + Contour (Offline)', desc: 'High-res satellite composite' },
                  { id: 'vector', name: 'Standard Topographic Vector (OSM)', desc: 'Roads, boundaries, terrain' },
                  { id: 'bathy', name: 'Bathymetric Admiralty Chart 1:50k', desc: 'Marine depth & navigation channels' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedMap(item.name)}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      selectedMap === item.name
                        ? isEmerald
                          ? 'border-[#10B981] bg-[#10B981]/15 font-bold text-[#34D399] ring-2 ring-[#10B981]/30'
                          : 'border-[#3B6FD6] bg-[#3B6FD6]/15 font-bold text-[#3B6FD6]'
                        : isEmerald
                        ? 'border-[#203833] bg-[#172825] text-[#9DBAB4]'
                        : isDark
                        ? 'border-[#2A4478] bg-[#16305F]/60 text-[#B8C4DC]'
                        : 'border-[#C3CCDA] bg-[#F8FAFC] text-[#46546F]'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">{item.name}</div>
                      <div className={`text-[10px] ${isEmerald ? 'text-[#7F9D96]' : 'text-[#7F93B8]'}`}>{item.desc}</div>
                    </div>
                    {selectedMap === item.name && <Check className={`w-4 h-4 ${isEmerald ? 'text-[#10B981]' : 'text-[#3B6FD6]'}`} />}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#7F93B8]">Initial Geographical Extent</label>
              <select
                value={extent}
                onChange={(e) => setExtent(e.target.value)}
                className={`w-full p-2.5 rounded-xl border text-xs font-medium outline-none ${
                  isDark
                    ? 'bg-[#16305F] border-[#2A4478] text-white'
                    : 'bg-[#F8FAFC] border-[#C3CCDA] text-[#0A1A3A]'
                }`}
              >
                <option>Strait of Hormuz (26°N 56°E)</option>
                <option>Persian Gulf Entire Theater</option>
                <option>Northern Sector / Basra & Shatt Al-Arab</option>
                <option>Musandam Peninsula & Sea of Oman</option>
              </select>
            </div>
          </div>
        )}

        {/* Wizard Footer Navigation */}
        <div className="flex items-center justify-between pt-2 border-t border-current/10">
          {step === 2 ? (
            <button
              onClick={() => setStep(1)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 ${
                isEmerald ? 'bg-[#172825] text-[#9DBAB4] hover:bg-[#203833]' : isDark ? 'bg-[#16305F] text-[#B8C4DC]' : 'bg-[#E2E8F0] text-[#46546F]'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step === 1 ? (
            <button
              onClick={handleNext}
              className={`px-5 py-2.5 rounded-xl ${
                isEmerald
                  ? 'bg-[#10B981] hover:bg-[#059669] shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  : 'bg-[#3B6FD6] hover:bg-[#2F5DB8]'
              } text-white text-xs font-semibold flex items-center gap-1.5 shadow transition-all`}
            >
              <span>{t.next}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className={`px-5 py-2.5 rounded-xl ${
                isEmerald
                  ? 'bg-[#10B981] hover:bg-[#059669] shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  : 'bg-[#3DB57A] hover:bg-[#349e6a]'
              } text-white text-xs font-semibold flex items-center gap-1.5 shadow transition-all`}
            >
              <Check className="w-4 h-4" />
              <span>{t.finish} & Open</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
