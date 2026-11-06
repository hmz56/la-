import React, { useState } from 'react';
import {
  X,
  Plus,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Trash2,
  MoveUp,
  MoveDown,
  Layers as LayersIcon,
  Search,
  Check,
  Play,
  Film,
  Globe,
  Upload,
  Tv,
  Sliders,
  Radio,
  Shield,
  Anchor,
  Plane,
  Crosshair,
  Flame,
  Package,
  AlertTriangle,
} from 'lucide-react';
import {
  ActivePanel,
  LanguageMode,
  LayerItem,
  LayoutMode,
  MapObject,
  SceneItem,
  ThemeMode,
} from '../types';
import { I18N, COLORS, SAMPLE_SYMBOLS, SYMBOL_CATEGORIES } from '../constants/theme';

interface SidePanelProps {
  theme: ThemeMode;
  language: LanguageMode;
  layoutMode: LayoutMode;
  activePanel: ActivePanel;
  onClose: () => void;
  layers: LayerItem[];
  setLayers: React.Dispatch<React.SetStateAction<LayerItem[]>>;
  scenes: SceneItem[];
  setScenes: React.Dispatch<React.SetStateAction<SceneItem[]>>;
  selectedObject: MapObject | null;
  onUpdateObject: (updated: Partial<MapObject>) => void;
  onStartPresenter: (sceneIndex?: number) => void;
}

export const SidePanel: React.FC<SidePanelProps> = ({
  theme,
  language,
  layoutMode,
  activePanel,
  onClose,
  layers,
  setLayers,
  scenes,
  setScenes,
  selectedObject,
  onUpdateObject,
  onStartPresenter,
}) => {
  const tokens = COLORS[theme] || COLORS.emerald;
  const isEmerald = theme === 'emerald';
  const isDark = theme !== 'light';
  const t = I18N[language];
  const [selectedCategory, setSelectedCategory] = useState('military');
  const [symbolSearch, setSymbolSearch] = useState('');
  const [activeGisTab, setActiveGisTab] = useState<'sources' | 'import'>('sources');

  if (activePanel === 'NONE') return null;

  const isPhone = layoutMode === 'PHONE_PORTRAIT';
  const isTabletPortrait = layoutMode === 'TABLET_PORTRAIT';

  // Toggle layer visibility
  const toggleLayerVisibility = (id: string) => {
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, visible: !l.visible } : l))
    );
  };

  // Toggle layer lock
  const toggleLayerLock = (id: string) => {
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, locked: !l.locked } : l))
    );
  };

  const getPanelTitle = () => {
    switch (activePanel) {
      case 'PROPERTIES':
        return t.panels.properties;
      case 'LAYERS':
        return t.panels.layers;
      case 'SYMBOLS':
        return t.panels.symbols;
      case 'SCENES':
        return t.panels.scenes;
      case 'MAP_SOURCES':
      case 'GIS_IMPORT':
        return t.panels.mapSources;
      case 'SCENE_GRAPHICS':
        return t.panels.sceneGraphics;
      default:
        return '';
    }
  };

  const cardBg = isDark
    ? 'bg-black/20 border-white/10 text-white'
    : 'bg-[#FFFFFF] border-[#C3CCDA] text-[#0A1A3A]';

  const cardHoverBg = isDark
    ? 'bg-black/20 hover:bg-black/35 border-white/10 hover:border-white/25 text-white'
    : 'bg-[#FFFFFF] hover:bg-[#F8FAFC] border-[#C3CCDA] text-[#0A1A3A]';

  const inputStyle = isDark
    ? 'bg-black/30 border-white/15 text-white focus:border-white/40'
    : 'bg-[#FFFFFF] border-[#C3CCDA] text-[#0A1A3A]';

  const primaryBtn = 'text-white shadow transition-all active:scale-95';

  return (
    <div
      style={{
        backgroundColor: tokens.panelBg,
        borderColor: tokens.border,
        color: tokens.textPrimary,
      }}
      className={`${
        isPhone
          ? 'fixed inset-x-0 bottom-0 top-1/4 rounded-t-2xl shadow-2xl z-40'
          : isTabletPortrait
          ? 'fixed inset-x-0 bottom-0 h-1/2 rounded-t-2xl shadow-2xl z-40'
          : 'w-[320px] h-full border-l z-20 shrink-0'
      } flex flex-col select-none transition-all`}
    >
      {/* Panel Header */}
      <div
        style={{ borderColor: tokens.border }}
        className="h-12 px-4 flex items-center justify-between border-b shrink-0"
      >
        <span className="font-bold text-sm truncate">{getPanelTitle()}</span>
        <button
          onClick={onClose}
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
            isEmerald
              ? 'hover:bg-[#182926] text-[#9DBAB4]'
              : isDark
              ? 'hover:bg-[#16305F] text-[#B8C4DC]'
              : 'hover:bg-[#CBD5E1] text-[#46546F]'
          }`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Panel Body Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* ================= PROPERTIES PANEL ================= */}
        {activePanel === 'PROPERTIES' && (
          <div className="space-y-4">
            {selectedObject ? (
              <>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#7F93B8]">Object Name</label>
                  <input
                    type="text"
                    value={selectedObject.name}
                    onChange={(e) => onUpdateObject({ name: e.target.value })}
                    className={`w-full px-3 py-2 text-xs rounded-lg border font-medium outline-none ${inputStyle}`}
                  />
                </div>

                {/* Stroke Color */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#7F93B8]">Stroke Color</label>
                  <div className="flex items-center gap-2">
                    {[
                      '#10B981',
                      '#3B6FD6',
                      '#E879F9',
                      '#FBBF24',
                      '#F43F5E',
                      '#FFFFFF',
                      '#172825',
                    ].map((color) => (
                      <button
                        key={color}
                        onClick={() => onUpdateObject({ strokeColor: color })}
                        style={{ backgroundColor: color }}
                        className={`w-7 h-7 rounded-full border-2 transition-transform ${
                          selectedObject.strokeColor === color
                            ? `scale-110 border-white ring-2 ${
                                isEmerald ? 'ring-[#10B981]' : 'ring-[#3B6FD6]'
                              }`
                            : 'border-black/20 hover:scale-105'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Fill Opacity */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-[#7F93B8]">Fill Opacity</span>
                    <span className="font-mono">
                      {Math.round((selectedObject.opacity || 0.25) * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={selectedObject.opacity || 0.25}
                    onChange={(e) => onUpdateObject({ opacity: parseFloat(e.target.value) })}
                    className={`w-full ${isEmerald ? 'accent-[#10B981]' : 'accent-[#3B6FD6]'}`}
                  />
                </div>

                {/* Stroke Width */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#7F93B8]">Stroke Width</label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[1, 2, 3, 5].map((w) => (
                      <button
                        key={w}
                        onClick={() => onUpdateObject({ strokeWidth: w })}
                        className={`py-1.5 rounded text-xs font-medium border ${
                          selectedObject.strokeWidth === w
                            ? isEmerald
                              ? 'bg-[#10B981] text-white border-[#10B981] shadow'
                              : 'bg-[#3B6FD6] text-[#FFFFFF] border-[#3B6FD6]'
                            : isEmerald
                            ? 'bg-[#172825] border-[#203833] text-[#9DBAB4]'
                            : isDark
                            ? 'bg-[#16305F] border-[#2A4478] text-[#B8C4DC]'
                            : 'bg-[#FFFFFF] border-[#C3CCDA] text-[#46546F]'
                        }`}
                      >
                        {w}px
                      </button>
                    ))}
                  </div>
                </div>

                {/* Real Metrics Card (Read-only) */}
                {selectedObject.metrics && (
                  <div
                    className={`p-3 rounded-xl border space-y-2 ${
                      isEmerald
                        ? 'bg-[#172825] border-[#10B981]/40 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                        : isDark
                        ? 'bg-[#16305F]/60 border-[#2A4478]'
                        : 'bg-[#FFFFFF] border-[#C3CCDA]'
                    }`}
                  >
                    <span
                      className={`text-[11px] font-bold tracking-wider ${
                        isEmerald ? 'text-[#34D399]' : 'text-[#3B6FD6]'
                      } uppercase`}
                    >
                      Computed Geodesic Metrics
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      {selectedObject.metrics.area && (
                        <div>
                          <div className="text-[10px] text-[#7F93B8]">AREA</div>
                          <div className="font-bold">{selectedObject.metrics.area}</div>
                        </div>
                      )}
                      {selectedObject.metrics.perimeter && (
                        <div>
                          <div className="text-[10px] text-[#7F93B8]">PERIMETER</div>
                          <div className="font-bold">{selectedObject.metrics.perimeter}</div>
                        </div>
                      )}
                      {selectedObject.metrics.centroid && (
                        <div className="col-span-2">
                          <div className="text-[10px] text-[#7F93B8]">CENTROID</div>
                          <div className="font-bold truncate">{selectedObject.metrics.centroid}</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-xs text-center py-8 text-[#7F93B8]">
                No object selected. Click an element on the map to modify its properties.
              </div>
            )}
          </div>
        )}

        {/* ================= LAYERS PANEL ================= */}
        {activePanel === 'LAYERS' && (
          <div className="space-y-3">
            <button
              onClick={() => {
                const newId = `l${Date.now()}`;
                setLayers((prev) => [
                  ...prev,
                  {
                    id: newId,
                    name: `Tactical Layer ${prev.length + 1}`,
                    opacity: 100,
                    objectCount: 0,
                    visible: true,
                    locked: false,
                  },
                ]);
              }}
              style={{ backgroundColor: tokens.interactionBlue }}
              className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow ${primaryBtn}`}
            >
              <Plus className="w-4 h-4" />
              <span>New Layer</span>
            </button>

            <div className="space-y-2">
              {layers.map((layer) => (
                <div
                  key={layer.id}
                  className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 transition-all ${cardHoverBg}`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <button
                      onClick={() => toggleLayerVisibility(layer.id)}
                      className={`p-1 rounded ${
                        layer.visible
                          ? isEmerald
                            ? 'text-[#10B981]'
                            : isDark
                            ? 'text-[#3DB57A]'
                            : 'text-[#1E8E5A]'
                          : 'text-[#7F93B8] opacity-50'
                      }`}
                    >
                      {layer.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>

                    <div className="truncate">
                      <div className="text-xs font-bold truncate">{layer.name}</div>
                      <div className="text-[10px] text-[#7F93B8] font-mono">
                        {layer.objectCount} objects • {layer.opacity}%
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleLayerLock(layer.id)}
                      className="p-1 rounded text-[#7F93B8] hover:text-[#FFFFFF]"
                    >
                      {layer.locked ? (
                        <Lock className="w-3.5 h-3.5 text-[#F59E0B]" />
                      ) : (
                        <Unlock className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= SYMBOLS PANEL ================= */}
        {activePanel === 'SYMBOLS' && (
          <div className="space-y-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#7F93B8]" />
              <input
                type="text"
                placeholder="Search symbols by name or code..."
                value={symbolSearch}
                onChange={(e) => setSymbolSearch(e.target.value)}
                className={`w-full pl-9 pr-3 py-2 text-xs rounded-lg border font-medium outline-none ${inputStyle}`}
              />
            </div>

            {/* Category horizontal pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] no-scrollbar">
              {SYMBOL_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition-all ${
                    selectedCategory === cat.id
                      ? isEmerald
                        ? 'bg-[#10B981] text-white shadow'
                        : 'bg-[#3B6FD6] text-[#FFFFFF]'
                      : isEmerald
                      ? 'bg-[#172825] text-[#9DBAB4] hover:bg-[#1E332F]'
                      : isDark
                      ? 'bg-[#16305F] text-[#B8C4DC]'
                      : 'bg-[#E2E8F0] text-[#46546F]'
                  }`}
                >
                  {cat.nameEn}
                </button>
              ))}
            </div>

            {/* Symbols Grid (64dp Tiles) */}
            <div className="grid grid-cols-2 gap-2">
              {SAMPLE_SYMBOLS.filter(
                (s) =>
                  s.cat === selectedCategory ||
                  (symbolSearch &&
                    (s.nameEn.toLowerCase().includes(symbolSearch.toLowerCase()) ||
                      s.code.toLowerCase().includes(symbolSearch.toLowerCase())))
              ).map((symbol) => (
                <button
                  key={symbol.id}
                  onClick={() => alert(`Added symbol: ${symbol.nameEn} to active layer`)}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all group ${cardHoverBg}`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform ${
                      isEmerald
                        ? 'bg-[#10B981]/20 text-[#10B981]'
                        : 'bg-[#3B6FD6]/20 text-[#3B6FD6]'
                    }`}
                  >
                    {symbol.icon === 'Shield' && <Shield className="w-6 h-6" />}
                    {symbol.icon === 'Radio' && <Radio className="w-6 h-6" />}
                    {symbol.icon === 'Anchor' && <Anchor className="w-6 h-6" />}
                    {symbol.icon === 'Plane' && <Plane className="w-6 h-6" />}
                    {symbol.icon === 'Crosshair' && <Crosshair className="w-6 h-6" />}
                    {symbol.icon === 'Flame' && <Flame className="w-6 h-6" />}
                    {symbol.icon === 'Package' && <Package className="w-6 h-6" />}
                    {symbol.icon === 'AlertTriangle' && <AlertTriangle className="w-6 h-6" />}
                  </div>
                  <span className="text-[10px] font-bold text-center leading-tight">
                    {symbol.nameEn}
                  </span>
                  <span
                    className={`text-[9px] font-mono ${
                      isEmerald ? 'text-[#7F9D96]' : 'text-[#7F93B8]'
                    }`}
                  >
                    {symbol.code}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ================= SCENES PANEL ================= */}
        {activePanel === 'SCENES' && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className={`text-xs ${isEmerald ? 'text-[#7F9D96]' : 'text-[#7F93B8]'}`}>
                Sequence (1 to {scenes.length})
              </span>
              <button
                onClick={() => onStartPresenter(0)}
                style={{ backgroundColor: tokens.interactionBlue }}
                className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 shadow ${primaryBtn}`}
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Play All</span>
              </button>
            </div>

            <div className="space-y-2">
              {scenes.map((scene, idx) => (
                <div
                  key={scene.id}
                  className={`p-3 rounded-xl border space-y-2 transition-all ${cardHoverBg}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold flex items-center gap-1.5">
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono text-white ${
                          isEmerald ? 'bg-[#10B981]' : 'bg-[#3B6FD6]'
                        }`}
                      >
                        {scene.number}
                      </span>
                      {scene.name}
                    </span>
                    <span
                      className={`text-[10px] font-mono ${
                        isEmerald ? 'text-[#7F9D96]' : 'text-[#7F93B8]'
                      }`}
                    >
                      {scene.transition}
                    </span>
                  </div>

                  {scene.headline && (
                    <div
                      className={`text-[11px] font-semibold px-2 py-1 rounded ${
                        isEmerald
                          ? 'text-[#34D399] bg-[#10B981]/15 border border-[#10B981]/30'
                          : 'text-[#3B6FD6] bg-[#3B6FD6]/10'
                      }`}
                    >
                      {scene.headline}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[10px] text-[#7F9D96] pt-1 border-t border-white/5">
                    <span>{scene.visibleLayersCount} Layers Visible</span>
                    <button
                      onClick={() => onStartPresenter(idx)}
                      className={`${
                        isEmerald ? 'text-[#10B981]' : 'text-[#3B6FD6]'
                      } hover:underline font-semibold flex items-center gap-1`}
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Present</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= MAPS & GIS PANEL ================= */}
        {(activePanel === 'MAP_SOURCES' || activePanel === 'GIS_IMPORT') && (
          <div className="space-y-3">
            <div
              className={`flex rounded-lg p-0.5 border ${
                isEmerald
                  ? 'border-[#203833] bg-[#172825]'
                  : 'border-[#2A4478] bg-[#16305F]/50'
              }`}
            >
              <button
                onClick={() => setActiveGisTab('sources')}
                className={`flex-1 py-1.5 rounded-md text-xs font-semibold ${
                  activeGisTab === 'sources'
                    ? isEmerald
                      ? 'bg-[#10B981] text-white'
                      : 'bg-[#3B6FD6] text-white'
                    : isEmerald
                    ? 'text-[#9DBAB4]'
                    : 'text-[#B8C4DC]'
                }`}
              >
                Offline Basemaps
              </button>
              <button
                onClick={() => setActiveGisTab('import')}
                className={`flex-1 py-1.5 rounded-md text-xs font-semibold ${
                  activeGisTab === 'import'
                    ? isEmerald
                      ? 'bg-[#10B981] text-white'
                      : 'bg-[#3B6FD6] text-white'
                    : isEmerald
                    ? 'text-[#9DBAB4]'
                    : 'text-[#B8C4DC]'
                }`}
              >
                Vector GIS Import
              </button>
            </div>

            {activeGisTab === 'sources' ? (
              <div className="space-y-2">
                {[
                  { name: 'Gulf Admiralty Bathymetry 1:50k', size: '420 MB', format: 'MBTiles' },
                  { name: 'Sentinel-2 Cloudless RGB', size: '1.2 GB', format: 'GeoTIFF' },
                  { name: 'OpenStreetMap Offline Vector', size: '250 MB', format: 'PMTiles' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`p-2.5 rounded-xl border flex items-center justify-between ${cardBg}`}
                  >
                    <div>
                      <div className="text-xs font-bold">{item.name}</div>
                      <div className="text-[10px] text-[#7F9D96] font-mono">
                        {item.format} • {item.size}
                      </div>
                    </div>
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        isEmerald ? 'bg-[#10B981]' : 'bg-[#3DB57A]'
                      }`}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                <div
                  className={`p-6 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 text-center ${
                    isEmerald
                      ? 'border-[#203833] bg-[#172825]/60'
                      : isDark
                      ? 'border-[#2A4478] bg-[#16305F]/40'
                      : 'border-[#C3CCDA] bg-white'
                  }`}
                >
                  <Upload
                    className={`w-8 h-8 ${isEmerald ? 'text-[#10B981]' : 'text-[#3B6FD6]'}`}
                  />
                  <span className="text-xs font-bold">Drop GIS Files Here</span>
                  <span className="text-[10px] text-[#7F9D96]">
                    Supports GeoJSON, ESRI Shapefile (.zip), KML/KMZ, GPX
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= SCENE GRAPHICS (Z1–Z5) PANEL ================= */}
        {activePanel === 'SCENE_GRAPHICS' && (
          <div className="space-y-3">
            <span className={`text-xs ${isEmerald ? 'text-[#7F9D96]' : 'text-[#7F93B8]'}`}>
              Television and Studio Broadcast Overlays (Z1–Z5)
            </span>

            {[
              {
                id: 'z1',
                tag: 'Z1: TOP TICKER / HEADLINE',
                desc: 'Breaking news and operational alert bar pinned to top edge',
                active: true,
              },
              {
                id: 'z2',
                tag: 'Z2: LOWER THIRD',
                desc: 'Speaker identification card with rank and agency',
                active: true,
              },
              {
                id: 'z3',
                tag: 'Z3: LOCATION TAG',
                desc: 'Geographic coordinate / sector callout',
                active: true,
              },
              {
                id: 'z4',
                tag: 'Z4: MAP LEGEND',
                desc: 'Tactical color coding and symbol glossary',
                active: true,
              },
              {
                id: 'z5',
                tag: 'Z5: STATISTIC STAT CARD',
                desc: 'Key numeric KPI or throughput counter card',
                active: true,
              },
            ].map((z) => (
              <div key={z.id} className={`p-3 rounded-xl border space-y-1 ${cardBg}`}>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold ${
                      isEmerald ? 'text-[#10B981]' : 'text-[#3B6FD6]'
                    }`}
                  >
                    {z.tag}
                  </span>
                  <input
                    type="checkbox"
                    defaultChecked={z.active}
                    className={isEmerald ? 'accent-[#10B981]' : 'accent-[#3B6FD6]'}
                  />
                </div>
                <p className={`text-[11px] ${isEmerald ? 'text-[#7F9D96]' : 'text-[#7F93B8]'}`}>
                  {z.desc}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
