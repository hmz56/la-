import React, { useState, useRef, useId } from 'react';
import {
  Compass,
  ZoomIn,
  ZoomOut,
  Maximize2,
  MapPin,
  Radio,
  Shield,
  Anchor,
  Users,
  Star,
  Clock,
  MoreHorizontal,
  ChevronDown,
  X,
  Layers,
  Box,
  Eye,
  Crosshair,
  Target,
  Plane,
  Ship,
  Truck,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { ActiveTool, BasemapMode, DrawingToolType, LayoutMode, MapObject, ThemeMode } from '../types';

interface MapCanvasProps {
  theme: ThemeMode;
  layoutMode: LayoutMode;
  activeTool: ActiveTool;
  drawingTool: DrawingToolType | null;
  objects: MapObject[];
  selectedObjectId: string | null;
  onSelectObject: (id: string | null) => void;
  isPresenter?: boolean;
  isAudience?: boolean;
  onFinishDrawing?: () => void;
  showLocationDot?: boolean;
}

export const MapCanvas: React.FC<MapCanvasProps> = ({
  theme,
  layoutMode,
  activeTool,
  drawingTool,
  objects,
  selectedObjectId,
  onSelectObject,
  isPresenter = false,
  isAudience = false,
  showLocationDot = true,
}) => {
  // Navigation & Viewport State
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [bearing, setBearing] = useState(0);

  // 2.5D Sand-Table Perspective state (matching user's reference image)
  const [is3DMode, setIs3DMode] = useState(true);
  const [pitch, setPitch] = useState(30); // 30° tilt angle like the photo
  const [basemap, setBasemap] = useState<BasemapMode>('aerial');

  // Floating HUD Panels from reference image
  const [showSymbolPalette, setShowSymbolPalette] = useState(true);
  const [selectedPaletteSymbol, setSelectedPaletteSymbol] = useState<string | null>(null);
  const [showMembersCard, setShowMembersCard] = useState(false);
  const [showInsetCard, setShowInsetCard] = useState(false);

  // Layer Visibility Overlays
  const [layerArrows, setLayerArrows] = useState(true);
  const [layerUnits, setLayerUnits] = useState(true);
  const [layerZones, setLayerZones] = useState(true);
  const [layerGrid, setLayerGrid] = useState(true);

  // Active placed tactical markers state (for interactivity)
  const [placedSymbols, setPlacedSymbols] = useState<
    Array<{ id: string; x: number; y: number; category: string; label: string; color: string }>
  >([
    { id: 'u_1', x: 260, y: 390, category: 'Land', label: '1-68 AR', color: '#10B981' },
    { id: 'u_2', x: 380, y: 440, category: 'Land', label: '2-12 CAV', color: '#3B82F6' },
    { id: 'u_3', x: 620, y: 260, category: 'Land', label: 'OPFOR HQ', color: '#EF4444' },
  ]);

  const containerRef = useRef<HTMLDivElement>(null);
  const isEmerald = theme === 'emerald';
  const isDark = theme === 'dark' || isEmerald;

  // Drag / Pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    // If placing a symbol from the palette
    if (selectedPaletteSymbol && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      // Convert to map coordinates (accounting for zoom and pan)
      const mapX = (clickX - pan.x - rect.width / 2) / zoom + 500;
      const mapY = (clickY - pan.y - rect.height / 2) / zoom + 325;

      setPlacedSymbols((prev) => [
        ...prev,
        {
          id: `sym_${Date.now()}`,
          x: Math.round(mapX),
          y: Math.round(mapY),
          category: 'Tactical',
          label: selectedPaletteSymbol,
          color: isEmerald ? '#10B981' : '#3B82F6',
        },
      ]);
      setSelectedPaletteSymbol(null);
      return;
    }

    if (activeTool === 'PAN' || activeTool === 'SELECT' || e.button === 1 || isPresenter) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoom = (delta: number) => {
    setZoom((prev) => Math.min(Math.max(Number((prev + delta).toFixed(2)), 0.6), 3.0));
  };

  const resetView = () => {
    setBearing(0);
    setPan({ x: 0, y: 0 });
    setZoom(1);
    setPitch(30);
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className={`relative w-full h-full overflow-hidden select-none cursor-${
        selectedPaletteSymbol ? 'crosshair' : activeTool === 'PAN' ? 'grab' : 'default'
      } ${
        is3DMode
          ? isEmerald
            ? 'bg-gradient-to-b from-[#060D0C] via-[#0A1413] to-[#060D0C]'
            : isDark
            ? 'bg-gradient-to-b from-[#050E20] via-[#08152E] to-[#050E20]'
            : 'bg-gradient-to-b from-[#E2E8F0] via-[#CBD5E1] to-[#94A3B8]'
          : isEmerald
          ? 'bg-[#091211]'
          : isDark
          ? 'bg-[#08152e]'
          : 'bg-[#d8e2ec]'
      }`}
      style={{
        touchAction: 'none',
        perspective: is3DMode ? '1200px' : 'none',
      }}
    >
      {/* Background Graticule / Dynamic Tactical Grid */}
      {layerGrid && (
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: `radial-gradient(circle, ${
              isEmerald ? '#10B981' : isDark ? '#3B6FD6' : '#2A55B0'
            } 1.2px, transparent 1.2px)`,
            backgroundSize: '40px 40px',
            backgroundPosition: `${pan.x}px ${pan.y}px`,
          }}
        />
      )}

      {/* ============================================================== */}
      {/* 3D TACTICAL SAND-TABLE MAP BOARD (Matches uploaded user image)  */}
      {/* ============================================================== */}
      <div
        className="w-full h-full absolute inset-0 flex items-center justify-center transition-transform duration-100 ease-out"
        style={{
          transform: is3DMode
            ? `translate3d(${pan.x}px, ${pan.y}px, 0px) rotateX(${pitch}deg) rotateZ(${bearing}deg) scale(${zoom})`
            : `translate3d(${pan.x}px, ${pan.y}px, 0px) scale(${zoom}) rotate(${bearing}deg)`,
          transformOrigin: 'center center',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Physical 3D Tactical Sand-Table Board Plate */}
        <div
          className={`relative w-[1100px] h-[720px] rounded-2xl overflow-hidden transition-all duration-300 ${
            is3DMode
              ? isEmerald
                ? 'shadow-[0_40px_80px_rgba(0,0,0,0.85),0_0_40px_rgba(16,185,129,0.15)] ring-1 ring-[#203833] border-4 border-[#121E1C]'
                : isDark
                ? 'shadow-[0_40px_80px_rgba(0,0,0,0.85),0_0_40px_rgba(59,111,214,0.15)] ring-1 ring-[#1E335E] border-4 border-[#0F2147]'
                : 'shadow-[0_40px_70px_rgba(0,0,0,0.45)] ring-1 ring-[#94A3B8] border-4 border-[#FFFFFF]'
              : 'w-full h-full rounded-none border-none shadow-none'
          }`}
          style={{
            // Extruded side depth illusion when 3D tilted
            boxShadow: is3DMode
              ? isEmerald
                ? '0 30px 60px rgba(0,0,0,0.9), 0 10px 0 #0E1716, 0 12px 0 #070D0C, 0 0 35px rgba(16,185,129,0.12)'
                : '0 30px 60px rgba(0,0,0,0.9), 0 10px 0 #0A1428, 0 12px 0 #050B16'
              : undefined,
          }}
        >
          {/* BASEMAP LAYER 1: Realistic Satellite Reconnaissance Aerial Imagery (Reference) */}
          {basemap === 'aerial' && (
            <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#2D3A29]">
              {/* High-Resolution Aerial Terrain Map Plate matching user's image */}
              <img
                src="/assets/aistudio/map_screen_a2e2a86f.png"
                alt="Tactical Reconnaissance Aerial Map"
                className="w-full h-full object-cover select-none pointer-events-none transform scale-[1.12]"
                style={{
                  filter: isEmerald
                    ? 'contrast(1.06) saturate(1.05) brightness(0.98)'
                    : 'contrast(1.02) saturate(1.02)',
                }}
              />
              {/* Fine tactical vignette over the aerial map */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/25 via-transparent to-black/15" />
            </div>
          )}

          {/* BASEMAP LAYER 2: Tactical Emerald Vector Corridor */}
          {basemap === 'emerald' && (
            <div className="absolute inset-0 w-full h-full bg-[#0A1312]">
              <svg className="w-full h-full" viewBox="0 0 1000 650">
                <rect width="1000" height="650" fill="#0B1720" />
                <path
                  d="M 0,0 L 1000,0 L 1000,260 C 850,280 650,290 520,240 C 350,180 180,150 0,160 Z"
                  fill="#14221F"
                  stroke="#203833"
                  strokeWidth="2"
                />
                <path
                  d="M 0,650 L 1000,650 L 1000,480 C 800,420 680,310 570,390 C 440,430 240,460 0,520 Z"
                  fill="#14221F"
                  stroke="#203833"
                  strokeWidth="2"
                />
                <path
                  d="M 30,155 Q 350,170 570,265 T 980,255"
                  fill="none"
                  stroke="#C49E48"
                  strokeWidth="3"
                  opacity="0.8"
                />
              </svg>
            </div>
          )}

          {/* BASEMAP LAYER 3: Military Topographic Grid */}
          {basemap === 'topo' && (
            <div className="absolute inset-0 w-full h-full bg-[#1A261E]">
              <svg className="w-full h-full opacity-60" viewBox="0 0 1000 650">
                {Array.from({ length: 14 }).map((_, i) => (
                  <ellipse
                    key={i}
                    cx="480"
                    cy="330"
                    rx={70 + i * 40}
                    ry={45 + i * 25}
                    fill="none"
                    stroke="#84A98C"
                    strokeWidth="1"
                    strokeDasharray={i % 4 === 0 ? 'none' : '4 4'}
                  />
                ))}
              </svg>
            </div>
          )}

          {/* ============================================================== */}
          {/* INTERACTIVE SVG TACTICAL GRAPHICS OVERLAY                      */}
          {/* (Curved assault arrows, operational zones, NATO unit symbols)  */}
          {/* ============================================================== */}
          <svg
            className="w-full h-full absolute inset-0 z-10"
            viewBox="0 0 1000 650"
            style={{ pointerEvents: 'auto' }}
          >
            <defs>
              {/* Tactical Arrow Markers & Gradients */}
              <linearGradient id="blueArrowGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.95" />
              </linearGradient>

              <linearGradient id="greenArrowGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#059669" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#34D399" stopOpacity="0.95" />
              </linearGradient>

              <marker
                id="arrowheadBlue"
                markerWidth="8"
                markerHeight="8"
                refX="6"
                refY="4"
                orient="auto"
              >
                <path d="M 0 0 L 8 4 L 0 8 Z" fill="#60A5FA" />
              </marker>

              <marker
                id="arrowheadGreen"
                markerWidth="8"
                markerHeight="8"
                refX="6"
                refY="4"
                orient="auto"
              >
                <path d="M 0 0 L 8 4 L 0 8 Z" fill="#34D399" />
              </marker>

              <filter id="tacticalShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="1" dy="3" stdDeviation="3" floodColor="#000000" floodOpacity="0.65" />
              </filter>
            </defs>

            {/* 1. Tactical Operational Zones & Defense Perimeters */}
            {layerZones && (
              <g className="transition-opacity duration-200">
                {/* Zone R (Northern Blue Defensive Sector) */}
                <polygon
                  points="520,70 600,60 615,115 540,125 515,100"
                  fill="#2563EB"
                  fillOpacity="0.22"
                  stroke="#3B82F6"
                  strokeWidth="2.5"
                  filter="url(#tacticalShadow)"
                />
                <text
                  x="565"
                  y="96"
                  fill="#93C5FD"
                  fontSize="12"
                  fontFamily="monospace"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  R
                </text>

                {/* Zone B (Eastern Blue Assembly Area Polygon) */}
                <polygon
                  points="650,440 735,460 745,530 685,570 630,550 625,480"
                  fill="#2563EB"
                  fillOpacity="0.28"
                  stroke="#60A5FA"
                  strokeWidth="2.5"
                  filter="url(#tacticalShadow)"
                />
                <circle cx="685" cy="510" r="14" fill="#1E40AF" stroke="#60A5FA" strokeWidth="1.5" />
                <text
                  x="685"
                  y="515"
                  fill="#FFFFFF"
                  fontSize="11"
                  fontFamily="monospace"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  B
                </text>

                {/* Zone E / Objective Area (Green High-Ground Perimeter) */}
                <polygon
                  points="575,545 615,530 635,585 625,640 580,650 565,600"
                  fill="#059669"
                  fillOpacity="0.25"
                  stroke="#34D399"
                  strokeWidth="2.5"
                  strokeDasharray="6 3"
                  filter="url(#tacticalShadow)"
                />
                <text
                  x="605"
                  y="620"
                  fill="#A7F3D0"
                  fontSize="12"
                  fontFamily="monospace"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  E
                </text>
                <text
                  x="545"
                  y="635"
                  fill="#34D399"
                  fontSize="10"
                  fontFamily="sans-serif"
                  fontWeight="bold"
                  className="drop-shadow"
                >
                  Objective Area
                </text>

                {/* Southern Staging Polygon with Target Crosshair */}
                <polygon
                  points="425,720 525,700 540,780 440,810 415,760"
                  fill="#1D4ED8"
                  fillOpacity="0.28"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  filter="url(#tacticalShadow)"
                />

                {/* Dashed Phase Lines across Sector */}
                <path
                  d="M 440,40 Q 430,200 455,300 T 560,500 T 540,680"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2"
                  strokeDasharray="8 5"
                  opacity="0.8"
                />
                <path
                  d="M 340,240 Q 410,250 490,320 T 540,420 T 500,600"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                  opacity="0.8"
                />
                <path
                  d="M 500,60 Q 560,190 625,290 T 780,360"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="2"
                  strokeDasharray="7 5"
                  opacity="0.75"
                />
              </g>
            )}

            {/* 2. Curved Tactical Assault & Advance Maneuver Arrows */}
            {layerArrows && (
              <g className="transition-opacity duration-200">
                {/* Green Maneuver Arrow 1 (Sweep across central valley) */}
                <path
                  d="M 350,420 Q 400,380 425,340"
                  fill="none"
                  stroke="url(#greenArrowGrad)"
                  strokeWidth="9"
                  strokeLinecap="round"
                  markerEnd="url(#arrowheadGreen)"
                  filter="url(#tacticalShadow)"
                />

                {/* Green Maneuver Arrow 2 (Main effort toward objective) */}
                <path
                  d="M 400,470 Q 455,460 480,410"
                  fill="none"
                  stroke="url(#greenArrowGrad)"
                  strokeWidth="11"
                  strokeLinecap="round"
                  markerEnd="url(#arrowheadGreen)"
                  filter="url(#tacticalShadow)"
                />

                {/* Blue Assault Arrow 1 (Sweeping curve to river crossing) */}
                <path
                  d="M 505,320 Q 550,290 595,290"
                  fill="none"
                  stroke="url(#blueArrowGrad)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  markerEnd="url(#arrowheadBlue)"
                  filter="url(#tacticalShadow)"
                />

                {/* Blue Assault Arrow 2 (Supporting thrust along ridge) */}
                <path
                  d="M 545,390 Q 565,330 590,310"
                  fill="none"
                  stroke="url(#blueArrowGrad)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  markerEnd="url(#arrowheadBlue)"
                  filter="url(#tacticalShadow)"
                />

                {/* Blue Vertical Advance Arrow (Southern staging to town) */}
                <path
                  d="M 515,640 Q 515,550 515,480"
                  fill="none"
                  stroke="url(#blueArrowGrad)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  markerEnd="url(#arrowheadBlue)"
                  filter="url(#tacticalShadow)"
                />
              </g>
            )}

            {/* 3. Tactical Units (MIL-STD-2525 Symbology) */}
            {layerUnits && (
              <g className="transition-opacity duration-200">
                {/* RED ENEMY FORCES (Bridgehead & Defense Center) */}
                <g transform="translate(600, 280)" className="cursor-pointer">
                  <rect
                    x="-18"
                    y="-12"
                    width="36"
                    height="24"
                    rx="4"
                    fill="#DC2626"
                    stroke="#FFFFFF"
                    strokeWidth="1.8"
                    filter="url(#tacticalShadow)"
                  />
                  <line x1="-12" y1="-8" x2="12" y2="8" stroke="#FFFFFF" strokeWidth="1.5" />
                  <line x1="12" y1="-8" x2="-12" y2="8" stroke="#FFFFFF" strokeWidth="1.5" />
                  <text x="0" y="24" fill="#FCA5A5" fontSize="9" fontWeight="bold" textAnchor="middle">
                    OPFOR 1
                  </text>
                </g>

                <g transform="translate(670, 275)" className="cursor-pointer">
                  <rect
                    x="-18"
                    y="-12"
                    width="36"
                    height="24"
                    rx="4"
                    fill="#DC2626"
                    stroke="#FFFFFF"
                    strokeWidth="1.8"
                    filter="url(#tacticalShadow)"
                  />
                  <ellipse cx="0" cy="0" rx="9" ry="5" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
                  <text x="0" y="24" fill="#FCA5A5" fontSize="9" fontWeight="bold" textAnchor="middle">
                    OPFOR T-80
                  </text>
                </g>

                {/* Red Target Reticle on Ridge */}
                <g transform="translate(750, 170)">
                  <circle cx="0" cy="0" r="16" fill="#DC2626" fillOpacity="0.2" className="animate-ping" />
                  <circle cx="0" cy="0" r="10" fill="none" stroke="#EF4444" strokeWidth="2" />
                  <circle cx="0" cy="0" r="5" fill="#EF4444" />
                  <line x1="-14" y1="0" x2="14" y2="0" stroke="#EF4444" strokeWidth="1.5" />
                  <line x1="0" y1="-14" x2="0" y2="14" stroke="#EF4444" strokeWidth="1.5" />
                </g>

                {/* GREEN ALLIED FORCES */}
                <g transform="translate(425, 335)" className="cursor-pointer">
                  <rect
                    x="-18"
                    y="-12"
                    width="36"
                    height="24"
                    rx="4"
                    fill="#059669"
                    stroke="#FFFFFF"
                    strokeWidth="1.8"
                    filter="url(#tacticalShadow)"
                  />
                  <ellipse cx="0" cy="0" rx="10" ry="5" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
                  <text x="0" y="22" fill="#6EE7B7" fontSize="9" fontWeight="bold" textAnchor="middle">
                    TF-EAGLE
                  </text>
                </g>

                <g transform="translate(490, 360)" className="cursor-pointer">
                  <rect
                    x="-16"
                    y="-12"
                    width="32"
                    height="24"
                    rx="4"
                    fill="#059669"
                    stroke="#FFFFFF"
                    strokeWidth="1.8"
                    filter="url(#tacticalShadow)"
                  />
                  <line x1="-10" y1="-8" x2="10" y2="8" stroke="#FFFFFF" strokeWidth="1.5" />
                  <line x1="10" y1="-8" x2="-10" y2="8" stroke="#FFFFFF" strokeWidth="1.5" />
                </g>

                {/* BLUE FRIENDLY FORCES */}
                <g transform="translate(285, 275)" className="cursor-pointer">
                  <rect
                    x="-18"
                    y="-12"
                    width="36"
                    height="24"
                    rx="4"
                    fill="#2563EB"
                    stroke="#FFFFFF"
                    strokeWidth="1.8"
                    filter="url(#tacticalShadow)"
                  />
                  <line x1="-12" y1="-8" x2="12" y2="8" stroke="#FFFFFF" strokeWidth="1.5" />
                  <line x1="12" y1="-8" x2="-12" y2="8" stroke="#FFFFFF" strokeWidth="1.5" />
                  <text x="0" y="22" fill="#93C5FD" fontSize="9" fontWeight="bold" textAnchor="middle">
                    1-41 INF
                  </text>
                </g>

                {/* 3 Infantry Squad Silhouettes in formation */}
                <g transform="translate(280, 410)" className="cursor-pointer">
                  <rect
                    x="-32"
                    y="-14"
                    width="64"
                    height="28"
                    rx="6"
                    fill="#1D4ED8"
                    stroke="#60A5FA"
                    strokeWidth="1.8"
                    filter="url(#tacticalShadow)"
                  />
                  {[-18, 0, 18].map((offset, idx) => (
                    <g key={idx} transform={`translate(${offset}, 0)`}>
                      <circle cx="0" cy="-5" r="3" fill="#FFFFFF" />
                      <line x1="0" y1="-2" x2="0" y2="6" stroke="#FFFFFF" strokeWidth="2" />
                      <line x1="-4" y1="1" x2="4" y2="1" stroke="#FFFFFF" strokeWidth="1.5" />
                      <line x1="0" y1="6" x2="-3" y2="11" stroke="#FFFFFF" strokeWidth="1.5" />
                      <line x1="0" y1="6" x2="3" y2="11" stroke="#FFFFFF" strokeWidth="1.5" />
                    </g>
                  ))}
                </g>

                {/* Placed Interactive Symbols */}
                {placedSymbols.map((item) => (
                  <g
                    key={item.id}
                    transform={`translate(${item.x}, ${item.y})`}
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(`Selected Tactical Asset: ${item.label}`);
                    }}
                    className="cursor-pointer group"
                  >
                    <circle cx="0" cy="0" r="14" fill={item.color} fillOpacity="0.25" className="animate-ping" />
                    <rect
                      x="-16"
                      y="-12"
                      width="32"
                      height="24"
                      rx="5"
                      fill={item.color}
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      filter="url(#tacticalShadow)"
                    />
                    <text
                      x="0"
                      y="4"
                      fill="#FFFFFF"
                      fontSize="9"
                      fontWeight="bold"
                      textAnchor="middle"
                      fontFamily="monospace"
                    >
                      {item.label.slice(0, 3)}
                    </text>
                    <text
                      x="0"
                      y="24"
                      fill="#FFFFFF"
                      fontSize="9"
                      fontWeight="bold"
                      textAnchor="middle"
                      className="drop-shadow"
                    >
                      {item.label}
                    </text>
                  </g>
                ))}
              </g>
            )}

            {/* Live GPS location pulse */}
            {showLocationDot && (
              <g transform="translate(515, 490)" className="pointer-events-none">
                <circle
                  cx="0"
                  cy="0"
                  r="24"
                  fill={isEmerald ? '#10B981' : '#3B6FD6'}
                  fillOpacity="0.25"
                  className="animate-ping"
                />
                <circle
                  cx="0"
                  cy="0"
                  r="9"
                  fill={isEmerald ? '#10B981' : '#3B6FD6'}
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />
                <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
              </g>
            )}
          </svg>
        </div>
      </div>

      {/* ============================================================== */}
      {/* FLOATING "SYMBOL PALETTE" PANEL (Bottom-Right, from reference)  */}
      {/* ============================================================== */}
      {showSymbolPalette && !isAudience && (
        <div
          className={`absolute bottom-6 right-6 z-30 w-80 rounded-2xl border shadow-2xl backdrop-blur-md p-3.5 space-y-3 transition-all animate-in fade-in slide-in-from-bottom-3 duration-200 ${
            isEmerald
              ? 'bg-[#121E1C]/95 border-[#203833] text-white shadow-[0_15px_35px_rgba(0,0,0,0.6)] ring-1 ring-[#10B981]/30'
              : isDark
              ? 'bg-[#0F2147]/95 border-[#2A4478] text-white shadow-[0_15px_35px_rgba(0,0,0,0.6)]'
              : 'bg-white/95 border-[#C3CCDA] text-[#0A1A3A] shadow-xl'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b pb-2 border-current/10">
            <div className="flex items-center gap-2">
              <Crosshair className={`w-4 h-4 ${isEmerald ? 'text-[#10B981]' : 'text-[#3B6FD6]'}`} />
              <h4 className="text-xs font-bold tracking-wide">Symbol Palette</h4>
            </div>
            <button
              onClick={() => setShowSymbolPalette(false)}
              className="p-1 rounded-md text-current/60 hover:text-current hover:bg-current/10 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Categorized Rows matching the reference image */}
          <div className="space-y-2.5 text-xs">
            {/* 1. Land Category */}
            <div className="flex items-center gap-2">
              <span className="w-12 text-[10px] font-semibold text-current/60 shrink-0">Land</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {[
                  { id: 'inf_1', name: 'Infantry', icon: '⧄' },
                  { id: 'inf_2', name: 'Mech Inf', icon: '⧅' },
                  { id: 'arm_1', name: 'Armor', icon: '⬬' },
                  { id: 'apc_1', name: 'APC', icon: '◫' },
                  { id: 'hq_1', name: 'Command', icon: '⚑' },
                  { id: 'sol_1', name: 'Trooper', icon: '♟' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedPaletteSymbol(s.name);
                    }}
                    title={`Click to place ${s.name} on map`}
                    className={`w-7 h-7 rounded-lg border flex items-center justify-center text-xs font-bold transition-all ${
                      selectedPaletteSymbol === s.name
                        ? 'bg-[#10B981] text-white border-[#10B981] ring-2 ring-[#10B981]/50 scale-110'
                        : isEmerald
                        ? 'bg-[#172825] border-[#203833] text-[#34D399] hover:bg-[#10B981]/20 hover:border-[#10B981]'
                        : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400 hover:scale-105'
                    }`}
                  >
                    {s.icon}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Air Category */}
            <div className="flex items-center gap-2">
              <span className="w-12 text-[10px] font-semibold text-current/60 shrink-0">Air</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {[
                  { id: 'air_1', name: 'CAS Jet', icon: '✈' },
                  { id: 'air_2', name: 'Chopper', icon: '🚁' },
                  { id: 'air_3', name: 'UAV Recon', icon: '🛩' },
                  { id: 'air_4', name: 'Transport', icon: '◬' },
                  { id: 'air_5', name: 'Hovercraft', icon: '⬭' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedPaletteSymbol(s.name);
                    }}
                    title={`Click to place ${s.name} on map`}
                    className={`w-7 h-7 rounded-lg border flex items-center justify-center text-xs font-bold transition-all ${
                      selectedPaletteSymbol === s.name
                        ? 'bg-[#10B981] text-white border-[#10B981] ring-2 ring-[#10B981]/50 scale-110'
                        : isEmerald
                        ? 'bg-[#172825] border-[#203833] text-[#34D399] hover:bg-[#10B981]/20 hover:border-[#10B981]'
                        : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400 hover:scale-105'
                    }`}
                  >
                    {s.icon}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Sea Category */}
            <div className="flex items-center gap-2">
              <span className="w-12 text-[10px] font-semibold text-current/60 shrink-0">Sea</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {[
                  { id: 'sea_1', name: 'Destroyer', icon: '⚓' },
                  { id: 'sea_2', name: 'Submarine', icon: '⌓' },
                  { id: 'sea_3', name: 'Patrol Boat', icon: '⛵' },
                  { id: 'sea_4', name: 'Star Point', icon: '★' },
                  { id: 'sea_5', name: 'Task Force', icon: '⎈' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedPaletteSymbol(s.name);
                    }}
                    title={`Click to place ${s.name} on map`}
                    className={`w-7 h-7 rounded-lg border flex items-center justify-center text-xs font-bold transition-all ${
                      selectedPaletteSymbol === s.name
                        ? 'bg-[#3B82F6] text-white border-[#3B82F6] ring-2 ring-[#3B82F6]/50 scale-110'
                        : isEmerald
                        ? 'bg-[#172825] border-[#203833] text-[#60A5FA] hover:bg-[#3B82F6]/20 hover:border-[#3B82F6]'
                        : 'bg-blue-50 dark:bg-blue-950/40 border-blue-300 dark:border-blue-700 text-blue-600 dark:text-blue-400 hover:scale-105'
                    }`}
                  >
                    {s.icon}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Special Gps Category */}
            <div className="flex items-center gap-2">
              <span className="w-12 text-[10px] font-semibold text-current/60 shrink-0">Special</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {[
                  { id: 'sp_1', name: 'Special Ops', icon: '✠' },
                  { id: 'sp_2', name: 'Crosshair', icon: '⊕' },
                  { id: 'sp_3', name: 'Artillery', icon: '🎯' },
                  { id: 'sp_4', name: 'Chevron', icon: '▲' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedPaletteSymbol(s.name);
                    }}
                    title={`Click to place ${s.name} on map`}
                    className={`w-7 h-7 rounded-lg border flex items-center justify-center text-xs font-bold transition-all ${
                      selectedPaletteSymbol === s.name
                        ? 'bg-[#F59E0B] text-white border-[#F59E0B] ring-2 ring-[#F59E0B]/50 scale-110'
                        : isEmerald
                        ? 'bg-[#172825] border-[#203833] text-[#FBBF24] hover:bg-[#F59E0B]/20 hover:border-[#F59E0B]'
                        : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 text-amber-600 dark:text-amber-400 hover:scale-105'
                    }`}
                  >
                    {s.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {selectedPaletteSymbol && (
            <div className="p-2 rounded-xl bg-[#10B981]/15 border border-[#10B981]/40 flex items-center justify-between text-[11px] text-[#34D399]">
              <span>Placing: {selectedPaletteSymbol} — Click on map</span>
              <button
                onClick={() => setSelectedPaletteSymbol(null)}
                className="text-xs font-bold text-white/80 hover:text-white"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* FLOATING HUD CONTROLS: 3D Perspective, Basemap, Layers, Zoom   */}
      {/* ============================================================== */}
      {!isAudience && (
        <>
          {/* Top-Right Map Box Toolbar */}
          <div className="absolute top-4 right-4 z-30 flex items-center gap-2 flex-wrap max-w-lg justify-end">
            {/* 3D Sand-Table Mode Toggle */}
            <div
              className={`flex items-center rounded-xl p-1 border shadow-lg backdrop-blur-md ${
                isEmerald
                  ? 'bg-[#121E1C]/90 border-[#203833]'
                  : isDark
                  ? 'bg-[#0F2147]/90 border-[#2A4478]'
                  : 'bg-white/90 border-[#C3CCDA]'
              }`}
            >
              <button
                onClick={() => {
                  setIs3DMode(!is3DMode);
                  if (!is3DMode && pitch === 0) setPitch(30);
                }}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  is3DMode
                    ? isEmerald
                      ? 'bg-[#10B981] text-white shadow-[0_0_12px_rgba(16,185,129,0.35)]'
                      : 'bg-[#3B6FD6] text-white'
                    : 'text-current/60 hover:text-current'
                }`}
                title="Toggle 2.5D Sand-Table Perspective"
              >
                <Box className="w-3.5 h-3.5" />
                <span>3D Sand Table</span>
              </button>

              {is3DMode && (
                <div className="flex items-center gap-1 pl-1 ml-1 border-l border-current/15 text-[10px] font-mono">
                  {[20, 30, 42].map((p) => (
                    <button
                      key={p}
                      onClick={() => setPitch(p)}
                      className={`px-1.5 py-0.5 rounded ${
                        pitch === p ? 'bg-current/20 font-bold' : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      {p}°
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Basemap Switcher Pill */}
            <div
              className={`flex items-center rounded-xl p-1 border shadow-lg backdrop-blur-md text-xs font-bold ${
                isEmerald
                  ? 'bg-[#121E1C]/90 border-[#203833]'
                  : isDark
                  ? 'bg-[#0F2147]/90 border-[#2A4478]'
                  : 'bg-white/90 border-[#C3CCDA]'
              }`}
            >
              <button
                onClick={() => setBasemap('aerial')}
                className={`px-2 py-1 rounded-lg transition-all ${
                  basemap === 'aerial'
                    ? isEmerald
                      ? 'bg-[#10B981] text-white shadow'
                      : 'bg-[#3B6FD6] text-white shadow'
                    : 'text-current/60 hover:text-current'
                }`}
              >
                Aerial
              </button>
              <button
                onClick={() => setBasemap('emerald')}
                className={`px-2 py-1 rounded-lg transition-all ${
                  basemap === 'emerald'
                    ? isEmerald
                      ? 'bg-[#10B981] text-white shadow'
                      : 'bg-[#3B6FD6] text-white shadow'
                    : 'text-current/60 hover:text-current'
                }`}
              >
                Emerald
              </button>
              <button
                onClick={() => setBasemap('topo')}
                className={`px-2 py-1 rounded-lg transition-all ${
                  basemap === 'topo'
                    ? isEmerald
                      ? 'bg-[#10B981] text-white shadow'
                      : 'bg-[#3B6FD6] text-white shadow'
                    : 'text-current/60 hover:text-current'
                }`}
              >
                Topo
              </button>
            </div>

            {/* Quick Palette Toggle Button */}
            <button
              onClick={() => setShowSymbolPalette(!showSymbolPalette)}
              title="Toggle Symbol Palette"
              className={`p-2 rounded-xl border shadow-lg backdrop-blur-md transition-all ${
                showSymbolPalette
                  ? isEmerald
                    ? 'bg-[#10B981] text-white border-[#10B981] shadow-[0_0_12px_rgba(16,185,129,0.35)]'
                    : 'bg-[#3B6FD6] text-white border-[#3B6FD6]'
                  : isEmerald
                  ? 'bg-[#121E1C]/90 text-white border-[#203833] hover:bg-[#172825]'
                  : isDark
                  ? 'bg-[#0F2147]/90 text-white border-[#2A4478]'
                  : 'bg-white/90 text-[#0A1A3A] border-[#C3CCDA]'
              }`}
            >
              <Crosshair className="w-4 h-4" />
            </button>

            {/* North Reset Compass */}
            <button
              onClick={resetView}
              title="Reset View (North-Up & Flat)"
              className={`w-9 h-9 rounded-xl flex items-center justify-center border shadow-lg backdrop-blur-md transition-all ${
                isEmerald
                  ? 'bg-[#121E1C]/90 text-white border-[#203833] hover:bg-[#172825]'
                  : isDark
                  ? 'bg-[#0F2147]/90 text-white border-[#2A4478] hover:bg-[#16305F]'
                  : 'bg-white/90 text-[#0A1A3A] border-[#C3CCDA]'
              }`}
            >
              <Compass
                className="w-4 h-4 transition-transform"
                style={{
                  transform: `rotate(${-bearing}deg)`,
                  color: bearing === 0 ? (isEmerald ? '#10B981' : '#3B6FD6') : '#EF4444',
                }}
              />
            </button>

            {/* Zoom Stepper */}
            <div
              className={`flex flex-col rounded-xl border shadow-lg backdrop-blur-md overflow-hidden ${
                isEmerald
                  ? 'bg-[#121E1C]/90 border-[#203833]'
                  : isDark
                  ? 'bg-[#0F2147]/90 border-[#2A4478]'
                  : 'bg-white/90 border-[#C3CCDA]'
              }`}
            >
              <button
                onClick={() => handleZoom(0.2)}
                className="w-9 h-8 flex items-center justify-center hover:bg-current/10 transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <div className="h-[1px] bg-current/15" />
              <button
                onClick={() => handleZoom(-0.2)}
                className="w-9 h-8 flex items-center justify-center hover:bg-current/10 transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Top-Left Tactical Layer Visibility Filter */}
          <div
            className={`absolute top-4 left-4 z-30 flex items-center gap-1.5 p-1 rounded-xl border shadow-lg backdrop-blur-md text-[11px] font-semibold ${
              isEmerald
                ? 'bg-[#121E1C]/90 border-[#203833] text-white'
                : isDark
                ? 'bg-[#0F2147]/90 border-[#2A4478] text-white'
                : 'bg-white/90 border-[#C3CCDA] text-[#0A1A3A]'
            }`}
          >
            <button
              onClick={() => setLayerArrows(!layerArrows)}
              className={`px-2 py-1 rounded-lg transition-colors flex items-center gap-1 ${
                layerArrows ? 'bg-[#10B981]/20 text-[#34D399] font-bold' : 'opacity-40'
              }`}
            >
              <span>Arrows</span>
            </button>
            <button
              onClick={() => setLayerUnits(!layerUnits)}
              className={`px-2 py-1 rounded-lg transition-colors flex items-center gap-1 ${
                layerUnits ? 'bg-[#3B82F6]/20 text-[#60A5FA] font-bold' : 'opacity-40'
              }`}
            >
              <span>Units</span>
            </button>
            <button
              onClick={() => setLayerZones(!layerZones)}
              className={`px-2 py-1 rounded-lg transition-colors flex items-center gap-1 ${
                layerZones ? 'bg-[#F59E0B]/20 text-[#FBBF24] font-bold' : 'opacity-40'
              }`}
            >
              <span>Zones</span>
            </button>
          </div>

          {/* Bottom-Left Tactical Scale & Metrics */}
          <div className="absolute bottom-4 left-4 z-20 flex flex-col gap-1.5 pointer-events-none">
            <div
              className={`px-3 py-1.5 rounded-xl border backdrop-blur-md flex items-center gap-2.5 text-[11px] font-mono ${
                isEmerald
                  ? 'bg-[#121E1C]/85 border-[#203833] text-[#9DBAB4]'
                  : isDark
                  ? 'bg-[#0F2147]/85 border-[#2A4478] text-[#B8C4DC]'
                  : 'bg-white/90 border-[#C3CCDA] text-[#46546F]'
              }`}
            >
              <div className="w-[100px] h-[3px] bg-current rounded-full relative flex justify-between">
                <span className="w-[2px] h-[6px] bg-current -top-[1.5px] absolute left-0" />
                <span className="w-[2px] h-[4px] bg-current -top-[0.5px] absolute left-1/2" />
                <span className="w-[2px] h-[6px] bg-current -top-[1.5px] absolute right-0" />
              </div>
              <span className="font-bold">5 km / 2.7 NM</span>
              <span className="opacity-40">•</span>
              <span className="text-[10px] opacity-80">
                {is3DMode ? `3D Sand Table (${pitch}°)` : '2D Top-Down'}
              </span>
            </div>

            <div
              className={`text-[9px] px-2.5 py-0.5 rounded font-mono ${
                isEmerald ? 'text-[#60857E]' : isDark ? 'text-[#7F93B8]' : 'text-[#64748B]'
              }`}
            >
              Recon Sector Alfa-4 • MIL-STD-2525D Tactical Graphics
            </div>
          </div>
        </>
      )}

      {/* Active Drawing Mode Notification Banner */}
      {drawingTool && (
        <div
          className={`absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full shadow-2xl border flex items-center gap-2 text-xs font-semibold z-40 animate-pulse ${
            isEmerald
              ? 'bg-[#10B981] text-white border-[#34D399] shadow-[0_0_20px_rgba(16,185,129,0.5)]'
              : 'bg-[#3B6FD6] text-white border-[#9DBBF8]'
          }`}
        >
          <div className="w-2 h-2 rounded-full bg-white animate-ping" />
          <span>Active Drawing: {drawingTool.replace('_', ' ')} — Tap map to plot</span>
        </div>
      )}
    </div>
  );
};
