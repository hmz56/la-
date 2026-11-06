import React, { useState, useRef } from 'react';
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
} from 'lucide-react';
import { ActiveTool, DrawingToolType, LayoutMode, MapObject, ThemeMode } from '../types';

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
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [bearing, setBearing] = useState(0);

  // Toggle for floating cards from the uploaded UI image
  const [showMembersCard, setShowMembersCard] = useState(true);
  const [showInsetCard, setShowInsetCard] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);

  const isEmerald = theme === 'emerald';
  const isDark = theme === 'dark' || isEmerald;

  const handleMouseDown = (e: React.MouseEvent) => {
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
    setZoom((prev) => Math.min(Math.max(prev + delta, 0.6), 3.0));
  };

  const resetBearing = () => {
    setBearing(0);
    setPan({ x: 0, y: 0 });
    setZoom(1);
  };

  // Background color depending on theme
  const getCanvasBg = () => {
    if (isEmerald) return 'bg-[#091211]';
    if (isDark) return 'bg-[#08152e]';
    return 'bg-[#d8e2ec]';
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className={`relative w-full h-full overflow-hidden select-none cursor-${activeTool === 'PAN' ? 'grab' : 'default'} ${getCanvasBg()}`}
      style={{ touchAction: 'none' }}
    >
      {/* Dynamic Grid / Graticule overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle, ${
            isEmerald ? '#10B981' : isDark ? '#3B6FD6' : '#2A55B0'
          } 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          backgroundPosition: `${pan.x}px ${pan.y}px`,
        }}
      />

      {/* SVG Vector Map Rendering */}
      <svg
        className="w-full h-full absolute inset-0 transition-transform duration-75 ease-out"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom}) rotate(${bearing}deg)`,
          transformOrigin: 'center center',
        }}
        viewBox="0 0 1000 650"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="waterGradEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B1720" />
            <stop offset="100%" stopColor="#071017" />
          </linearGradient>
          <linearGradient id="landGradEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14221F" />
            <stop offset="100%" stopColor="#0E1917" />
          </linearGradient>

          <linearGradient id="waterGradDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B1C3E" />
            <stop offset="100%" stopColor="#07132B" />
          </linearGradient>
          <linearGradient id="waterGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C8D6E5" />
            <stop offset="100%" stopColor="#B2C5DA" />
          </linearGradient>
          <linearGradient id="landGradDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14264A" />
            <stop offset="100%" stopColor="#101F3C" />
          </linearGradient>
          <linearGradient id="landGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>

          {/* Glow filter for highlighted tactical elements */}
          <filter id="tacticalGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="emeraldNeonGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#10B981" floodOpacity="0.7" />
          </filter>
        </defs>

        {/* Base Water Body */}
        <rect
          width="1000"
          height="650"
          fill={
            isEmerald
              ? 'url(#waterGradEmerald)'
              : isDark
              ? 'url(#waterGradDark)'
              : 'url(#waterGradLight)'
          }
        />

        {/* Bathymetry depth contours (Strait of Hormuz deep trench) */}
        <path
          d="M 520,310 Q 580,300 640,320 T 730,350 T 820,430"
          fill="none"
          stroke={isEmerald ? '#152E2B' : isDark ? '#16356B' : '#94A3B8'}
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <path
          d="M 480,330 Q 560,330 630,350 T 700,400 T 800,480"
          fill="none"
          stroke={isEmerald ? '#112422' : isDark ? '#112A57' : '#A4B4CB'}
          strokeWidth="1"
          strokeDasharray="2 4"
        />

        {/* Northern Landmass (Iran Coastline: Bushehr, Bandar Abbas, Qeshm, Hormozgan) */}
        <path
          d="M 0,0 L 1000,0 L 1000,260 
             C 900,250 820,280 750,290 
             C 680,295 620,290 570,270 
             C 520,250 480,220 420,200 
             C 360,180 300,160 220,150 
             C 140,140 70,150 0,160 Z"
          fill={
            isEmerald
              ? 'url(#landGradEmerald)'
              : isDark
              ? 'url(#landGradDark)'
              : 'url(#landGradLight)'
          }
          stroke={isEmerald ? '#203A34' : isDark ? '#2A4478' : '#94A3B8'}
          strokeWidth="1.5"
        />

        {/* Southern Landmass (Arabian Peninsula: Kuwait, Saudi Arabia, Qatar, UAE, Oman Musandam) */}
        <path
          d="M 0,650 L 1000,650 L 1000,480 
             C 920,490 850,470 800,420 
             C 770,390 730,350 710,320 
             C 695,300 670,310 655,340 
             C 640,370 610,380 570,390 
             C 520,400 480,420 440,430 
             C 410,435 390,390 380,360 
             C 370,330 350,330 335,370 
             C 320,410 300,450 240,460 
             C 180,470 120,460 60,480 
             C 20,490 0,510 0,520 Z"
          fill={
            isEmerald
              ? 'url(#landGradEmerald)'
              : isDark
              ? 'url(#landGradDark)'
              : 'url(#landGradLight)'
          }
          stroke={isEmerald ? '#203A34' : isDark ? '#2A4478' : '#94A3B8'}
          strokeWidth="1.5"
        />

        {/* Cartographic Arterial Roads / Highway Network (Gold / Warm Glow like in the image) */}
        <g opacity={isEmerald ? '0.75' : '0.4'}>
          {/* Main Coast Highway (North) */}
          <path
            d="M 30,155 Q 220,145 420,195 T 570,265 T 750,285 T 980,255"
            fill="none"
            stroke={isEmerald ? '#C49E48' : '#D97706'}
            strokeWidth="2.2"
          />
          {/* Secondary links */}
          <path
            d="M 120,140 L 150,50 M 340,170 L 370,30 M 640,280 L 680,100"
            fill="none"
            stroke={isEmerald ? '#34554E' : '#2A4478'}
            strokeWidth="1.2"
          />
          {/* Southern Peninsula Highways */}
          <path
            d="M 50,490 Q 240,450 380,355 T 570,385 T 710,315 T 800,415 T 980,475"
            fill="none"
            stroke={isEmerald ? '#C49E48' : '#D97706'}
            strokeWidth="2.2"
          />
          {/* Inland Crosslinks */}
          <path
            d="M 240,460 L 260,600 M 440,430 L 480,620 M 610,380 L 650,580"
            fill="none"
            stroke={isEmerald ? '#34554E' : '#2A4478'}
            strokeWidth="1.2"
          />
        </g>

        {/* Islands in the Persian Gulf & Strait of Hormuz */}
        {/* Qeshm Island */}
        <polygon
          points="580,280 640,285 660,295 630,305 575,295"
          fill={isEmerald ? '#1A2F2B' : isDark ? '#193466' : '#CBD5E1'}
          stroke={isEmerald ? '#10B981' : isDark ? '#3B6FD6' : '#64748B'}
          strokeWidth="1"
        />
        {/* Hormuz Island */}
        <circle
          cx="675"
          cy="285"
          r="7"
          fill={isEmerald ? '#1A2F2B' : isDark ? '#1F3F7A' : '#CBD5E1'}
          stroke={isEmerald ? '#10B981' : isDark ? '#3B6FD6' : '#64748B'}
          strokeWidth="1"
        />
        {/* Larak Island */}
        <circle
          cx="670"
          cy="305"
          r="5"
          fill={isEmerald ? '#1A2F2B' : isDark ? '#1F3F7A' : '#CBD5E1'}
          stroke={isEmerald ? '#10B981' : isDark ? '#3B6FD6' : '#64748B'}
          strokeWidth="1"
        />
        {/* Greater Tunb & Lesser Tunb */}
        <circle
          cx="585"
          cy="325"
          r="4"
          fill={isEmerald ? '#1A2F2B' : isDark ? '#1F3F7A' : '#CBD5E1'}
          stroke={isEmerald ? '#F59E0B' : isDark ? '#F6B800' : '#D97706'}
          strokeWidth="1"
        />
        <circle
          cx="565"
          cy="330"
          r="3"
          fill={isEmerald ? '#1A2F2B' : isDark ? '#1F3F7A' : '#CBD5E1'}
          stroke={isEmerald ? '#F59E0B' : isDark ? '#F6B800' : '#D97706'}
          strokeWidth="1"
        />
        {/* Abu Musa */}
        <circle
          cx="550"
          cy="360"
          r="5"
          fill={isEmerald ? '#1A2F2B' : isDark ? '#1F3F7A' : '#CBD5E1'}
          stroke={isEmerald ? '#F59E0B' : isDark ? '#F6B800' : '#D97706'}
          strokeWidth="1"
        />
        {/* Bahrain */}
        <polygon
          points="260,375 270,370 273,390 263,395"
          fill={isEmerald ? '#1A2F2B' : isDark ? '#1F3F7A' : '#CBD5E1'}
          stroke={isEmerald ? '#10B981' : isDark ? '#3B6FD6' : '#64748B'}
          strokeWidth="1"
        />

        {/* Traffic Separation Scheme (TSS) Shipping Lanes */}
        <g opacity="0.85">
          {/* Inbound Lane (Northbound into Gulf) */}
          <path
            d="M 830,440 C 760,370 705,330 660,320 C 615,310 540,325 450,345"
            fill="none"
            stroke={isEmerald ? '#10B981' : '#F6B800'}
            strokeWidth="3.5"
            strokeDasharray="8 6"
          />
          {/* Separation Zone Median */}
          <path
            d="M 840,455 C 770,385 715,345 670,335 C 625,325 550,340 460,360"
            fill="none"
            stroke={isEmerald ? '#2E4A43' : isDark ? '#475569' : '#94A3B8'}
            strokeWidth="2"
            strokeDasharray="2 3"
          />
          {/* Outbound Lane (Southbound toward Indian Ocean) */}
          <path
            d="M 850,470 C 780,400 725,360 680,350 C 635,340 560,355 470,375"
            fill="none"
            stroke={isEmerald ? '#38BDF8' : '#3B6FD6'}
            strokeWidth="3.5"
            strokeDasharray="8 6"
          />
        </g>

        {/* Strategic Boundary Area (Object 1: Sector Alpha Security Perimeter) */}
        <g
          onClick={(e) => {
            e.stopPropagation();
            onSelectObject('obj1');
          }}
          className="cursor-pointer"
        >
          <polygon
            points="530,260 680,265 740,330 710,380 610,360 520,320"
            fill={isEmerald ? '#10B981' : '#3B6FD6'}
            fillOpacity={selectedObjectId === 'obj1' ? '0.35' : '0.18'}
            stroke={isEmerald ? '#10B981' : '#3B6FD6'}
            strokeWidth={selectedObjectId === 'obj1' ? '3.5' : '2'}
            filter={
              selectedObjectId === 'obj1'
                ? isEmerald
                  ? 'url(#emeraldNeonGlow)'
                  : 'url(#tacticalGlow)'
                : undefined
            }
          />

          {/* Polygon Vertices / Selection Handles */}
          {selectedObjectId === 'obj1' && (
            <g>
              {[
                [530, 260],
                [680, 265],
                [740, 330],
                [710, 380],
                [610, 360],
                [520, 320],
              ].map(([vx, vy], idx) => (
                <circle
                  key={idx}
                  cx={vx}
                  cy={vy}
                  r="5"
                  fill="#FFFFFF"
                  stroke={isEmerald ? '#10B981' : '#3B6FD6'}
                  strokeWidth="2.5"
                  className="hover:scale-125 transition-transform"
                />
              ))}
              {/* Centroid Tag */}
              <text
                x="620"
                y="315"
                fill="#FFFFFF"
                fontSize="12"
                fontWeight="700"
                textAnchor="middle"
                className="select-none pointer-events-none drop-shadow-md"
              >
                SECTOR ALPHA (4,120 km²)
              </text>
            </g>
          )}
        </g>

        {/* ================= EXACT PINS FROM UPLOADED SAAS UI IMAGE ================= */}
        {/* 1. William Scaperoth (Magenta Tag #E879F9 + Avatar pin with green ring) */}
        <g transform="translate(420, 220)" className="cursor-pointer group">
          <circle cx="0" cy="0" r="16" fill="#10B981" fillOpacity="0.25" className="animate-ping" />
          <circle cx="0" cy="0" r="13" fill="#132420" stroke="#10B981" strokeWidth="2.5" />
          <text x="0" y="4" textAnchor="middle" fontSize="10" fill="#FFFFFF" fontWeight="bold">
            WS
          </text>
          {/* Pointer needle */}
          <path d="M 0,13 L -4,22 L 4,22 Z" fill="#10B981" />
          {/* Vibrant Magenta Pill Callout */}
          <g transform="translate(8, 20)">
            <rect x="0" y="0" width="118" height="20" rx="4" fill="#E879F9" />
            <text x="6" y="14" fill="#1A1A1A" fontSize="10" fontWeight="800" letterSpacing="0.3">
              William Scaperoth
            </text>
          </g>
        </g>

        {/* 2. Cynthia Adams (Vibrant Mint Emerald Tag #10B981 + Avatar pin with green ring) */}
        <g transform="translate(380, 420)" className="cursor-pointer group">
          <circle cx="0" cy="0" r="16" fill="#10B981" fillOpacity="0.25" className="animate-ping" />
          <circle cx="0" cy="0" r="13" fill="#132420" stroke="#10B981" strokeWidth="2.5" />
          <text x="0" y="4" textAnchor="middle" fontSize="10" fill="#FFFFFF" fontWeight="bold">
            CA
          </text>
          {/* Pointer needle */}
          <path d="M 0,13 L -4,22 L 4,22 Z" fill="#10B981" />
          {/* Vibrant Emerald Pill Callout */}
          <g transform="translate(8, 20)">
            <rect x="0" y="0" width="92" height="20" rx="4" fill="#10B981" />
            <text x="6" y="14" fill="#FFFFFF" fontSize="10" fontWeight="800" letterSpacing="0.3">
              Cynthia Adams
            </text>
          </g>
        </g>

        {/* 3. Ralph Legros (Amber / Warm Yellow Tag #FBBF24 + Avatar pin with green ring) */}
        <g transform="translate(615, 335)" className="cursor-pointer group">
          <circle cx="0" cy="0" r="16" fill="#10B981" fillOpacity="0.25" className="animate-ping" />
          <circle cx="0" cy="0" r="13" fill="#132420" stroke="#10B981" strokeWidth="2.5" />
          <text x="0" y="4" textAnchor="middle" fontSize="10" fill="#FFFFFF" fontWeight="bold">
            RL
          </text>
          {/* Pointer needle */}
          <path d="M 0,13 L -4,22 L 4,22 Z" fill="#10B981" />
          {/* Vibrant Amber Pill Callout */}
          <g transform="translate(8, 20)">
            <rect x="0" y="0" width="86" height="20" rx="4" fill="#FBBF24" />
            <text x="6" y="14" fill="#1A1A1A" fontSize="10" fontWeight="800" letterSpacing="0.3">
              Ralph Legros
            </text>
          </g>
        </g>

        {/* 4. Tim Willfield (Cobalt Blue Tag #3B82F6 + Avatar pin with green ring) */}
        <g transform="translate(585, 460)" className="cursor-pointer group">
          <circle cx="0" cy="0" r="16" fill="#10B981" fillOpacity="0.25" className="animate-ping" />
          <circle cx="0" cy="0" r="13" fill="#132420" stroke="#10B981" strokeWidth="2.5" />
          <text x="0" y="4" textAnchor="middle" fontSize="10" fill="#FFFFFF" fontWeight="bold">
            TW
          </text>
          {/* Pointer needle */}
          <path d="M 0,13 L -4,22 L 4,22 Z" fill="#10B981" />
          {/* Vibrant Blue Pill Callout */}
          <g transform="translate(8, 20)">
            <rect x="0" y="0" width="82" height="20" rx="4" fill="#3B82F6" />
            <text x="6" y="14" fill="#FFFFFF" fontSize="10" fontWeight="800" letterSpacing="0.3">
              Tim Willfield
            </text>
          </g>
        </g>

        {/* EW-Radar Marker */}
        <g
          transform="translate(645, 290)"
          onClick={(e) => {
            e.stopPropagation();
            onSelectObject('obj3');
          }}
          className="cursor-pointer"
        >
          <circle cx="0" cy="0" r="16" fill="#F43F5E" fillOpacity="0.2" className="animate-ping" />
          <circle cx="0" cy="0" r="10" fill="#F43F5E" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="0" cy="0" r="4" fill="#FFFFFF" />
          <text
            x="14"
            y="4"
            fill={isEmerald ? '#FDA4AF' : isDark ? '#FF9A90' : '#B3170F'}
            fontSize="11"
            fontWeight="700"
            className="select-none drop-shadow"
          >
            EW-RADAR [01]
          </text>
        </g>

        {/* Geographical Labels */}
        <text
          x="320"
          y="260"
          fill={isEmerald ? '#34554E' : isDark ? '#5A75A3' : '#70839E'}
          fontSize="16"
          fontWeight="800"
          letterSpacing="4"
          className="select-none pointer-events-none"
        >
          PERSIAN GULF
        </text>
        <text
          x="660"
          y="370"
          fill={isEmerald ? '#34554E' : isDark ? '#5A75A3' : '#70839E'}
          fontSize="13"
          fontWeight="800"
          letterSpacing="2"
          className="select-none pointer-events-none"
        >
          STRAIT OF HORMUZ
        </text>
        <text
          x="870"
          y="420"
          fill={isEmerald ? '#34554E' : isDark ? '#5A75A3' : '#70839E'}
          fontSize="15"
          fontWeight="800"
          letterSpacing="3"
          className="select-none pointer-events-none"
        >
          GULF OF OMAN
        </text>

        {/* GPS Live Follow Location Pin */}
        {showLocationDot && (
          <g transform="translate(685, 335)" className="pointer-events-none">
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
            <path
              d="M 0,-12 L -6,-28 L 6,-28 Z"
              fill={isEmerald ? '#10B981' : '#3B6FD6'}
              opacity="0.75"
            />
          </g>
        )}
      </svg>

      {/* ================= FLOATING OVERLAY CARDS FROM THE UPLOADED UI IMAGE ================= */}
      {/* 1. "Members" Floating Card on Lower Left with Neon Green Border Ring */}
      {isEmerald && showMembersCard && !isAudience && layoutMode !== 'PHONE_PORTRAIT' && (
        <div className="absolute bottom-6 left-6 z-30 w-72 rounded-2xl bg-[#121E1C]/95 border border-[#10B981]/50 shadow-[0_0_25px_rgba(16,185,129,0.22)] backdrop-blur-md p-3.5 space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-white tracking-wide">Members</h4>
              <p className="text-[10px] text-[#7F9D96]">Mykola Bilanych team • 4 members</p>
            </div>
            <button
              onClick={() => setShowMembersCard(false)}
              className="p-1 rounded-md text-[#7F9D96] hover:text-white hover:bg-white/10"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1.5">
            {[
              { name: 'Tim Burton (You)', email: 'tim_b12@gmail.com', role: 'Owner', isOwner: true },
              { name: 'Sofa Adams', email: 'sofa@gmail.com', role: 'Can view' },
              { name: 'Ryan Walberg', email: 'ryan@gmail.com', role: 'Can view' },
              { name: 'Adam Rossen', email: 'adam@gmail.com', role: 'Can edit' },
            ].map((member, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-1.5 rounded-xl hover:bg-[#1A2C29] transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-[#1A2C29] border border-[#2B4741] flex items-center justify-center text-[10px] font-bold text-[#10B981]">
                    {member.name.charAt(0)}
                  </div>
                  <div className="truncate">
                    <div className="text-[11px] font-semibold text-white leading-tight truncate">
                      {member.name}
                    </div>
                    <div className="text-[9px] text-[#6E8F87] font-mono leading-tight truncate">
                      {member.email}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <span className="text-[10px] text-[#9DBAB4] font-medium">{member.role}</span>
                  {!member.isOwner && <ChevronDown className="w-3 h-3 text-[#6E8F87]" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. "Los Angeles, California" / "Tactical Inset" Floating Card on Lower Right */}
      {isEmerald && showInsetCard && !isAudience && layoutMode !== 'PHONE_PORTRAIT' && (
        <div className="absolute bottom-6 right-16 z-30 w-64 rounded-2xl bg-[#121E1C]/95 border border-[#10B981]/50 shadow-[0_0_25px_rgba(16,185,129,0.25)] backdrop-blur-md p-3 space-y-2.5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 min-w-0">
              <div className="w-4 h-4 rounded bg-[#3B82F6] flex items-center justify-center text-[9px] text-white">
                📁
              </div>
              <span className="text-xs font-bold text-white truncate">
                Los Angeles, California
              </span>
            </div>
            <div className="w-5 h-5 rounded-md bg-[#10B981]/20 border border-[#10B981] flex items-center justify-center text-[#FBBF24]">
              <Star className="w-3 h-3 fill-current" />
            </div>
          </div>

          {/* Mini Inset Map Graphic */}
          <div className="w-full h-24 rounded-xl bg-[#091211] border border-[#1C332F] overflow-hidden relative flex items-center justify-center">
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: 'radial-gradient(circle, #C49E48 1px, transparent 1px)',
                backgroundSize: '16px 16px',
              }}
            />
            {/* Roads in mini map */}
            <svg className="w-full h-full absolute inset-0" viewBox="0 0 200 96">
              <path d="M 10,80 Q 90,40 180,20" stroke="#C49E48" strokeWidth="1.5" fill="none" />
              <path d="M 40,20 Q 110,60 170,85" stroke="#34554E" strokeWidth="1" fill="none" />
              <circle cx="100" cy="48" r="4" fill="#10B981" />
              <text x="100" y="60" textAnchor="middle" fill="#9DBAB4" fontSize="8" fontWeight="bold">
                Seattle Array
              </text>
            </svg>
          </div>

          <div className="flex items-center justify-between text-[10px] text-[#6E8F87] font-mono pt-1 border-t border-[#1C332F]">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>Edited 12 days ago</span>
            </div>
            <MoreHorizontal className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
          </div>
        </div>
      )}

      {/* Map Overlay HUD (Scale bar, north indicator, attribution, zoom tools) */}
      {!isAudience && (
        <>
          {/* North Arrow / Compass (Top-right) */}
          <div className="absolute top-4 right-4 flex flex-col items-center gap-2 z-10">
            <button
              onClick={resetBearing}
              title="Reset Bearing (North-Up)"
              className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg border transition-all ${
                isEmerald
                  ? 'bg-[#152421] hover:bg-[#1E332F] text-white border-[#243E38] shadow-[0_0_12px_rgba(16,185,129,0.15)]'
                  : isDark
                  ? 'bg-[#16305F] hover:bg-[#1C3B75] text-[#FFFFFF] border-[#2A4478]'
                  : 'bg-[#FFFFFF] hover:bg-[#F1F5F9] text-[#0A1A3A] border-[#C3CCDA]'
              }`}
            >
              <Compass
                className="w-5 h-5 transition-transform"
                style={{
                  transform: `rotate(${-bearing}deg)`,
                  color:
                    bearing === 0
                      ? isEmerald
                        ? '#10B981'
                        : isDark
                        ? '#9DBBF8'
                        : '#2A55B0'
                      : '#F43F5E',
                }}
              />
            </button>

            {/* Quick Zoom Buttons */}
            <div
              className={`flex flex-col rounded-lg shadow-lg border overflow-hidden ${
                isEmerald
                  ? 'bg-[#152421] border-[#243E38]'
                  : isDark
                  ? 'bg-[#16305F] border-[#2A4478]'
                  : 'bg-[#FFFFFF] border-[#C3CCDA]'
              }`}
            >
              <button
                onClick={() => handleZoom(0.2)}
                className={`w-10 h-10 flex items-center justify-center transition-colors ${
                  isEmerald
                    ? 'hover:bg-[#1E332F] text-white'
                    : isDark
                    ? 'hover:bg-[#20407A] text-[#FFFFFF]'
                    : 'hover:bg-[#E2E8F0] text-[#0A1A3A]'
                }`}
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <div
                className={`h-[1px] ${
                  isEmerald ? 'bg-[#243E38]' : isDark ? 'bg-[#2A4478]' : 'bg-[#CBD5E1]'
                }`}
              />
              <button
                onClick={() => handleZoom(-0.2)}
                className={`w-10 h-10 flex items-center justify-center transition-colors ${
                  isEmerald
                    ? 'hover:bg-[#1E332F] text-white'
                    : isDark
                    ? 'hover:bg-[#20407A] text-[#FFFFFF]'
                    : 'hover:bg-[#E2E8F0] text-[#0A1A3A]'
                }`}
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scale Bar (Design Guide §14: 116×22dp scale bar) & Coordinate Badge */}
          <div className="absolute bottom-3 left-4 flex flex-col gap-1 z-10 pointer-events-none">
            {/* Scale Bar */}
            <div
              className={`px-2 py-1 rounded backdrop-blur-sm border flex items-center gap-2 text-[10px] font-mono font-medium ${
                isEmerald
                  ? 'bg-[#0B1514]/85 text-[#9DBAB4] border-[#243E38]'
                  : isDark
                  ? 'bg-[#0A1A3A]/80 text-[#B8C4DC] border-[#2A4478]'
                  : 'bg-[#FFFFFF]/90 text-[#46546F] border-[#C3CCDA]'
              }`}
            >
              <div className="w-[116px] h-[4px] bg-current rounded-full relative flex justify-between">
                <span className="w-[2px] h-[8px] bg-current -top-[2px] absolute left-0" />
                <span className="w-[2px] h-[6px] bg-current -top-[1px] absolute left-1/2" />
                <span className="w-[2px] h-[8px] bg-current -top-[2px] absolute right-0" />
              </div>
              <span>50 km / 27 NM</span>
            </div>

            {/* Attribution Badge */}
            <div
              className={`text-[9px] px-2 py-0.5 rounded font-mono ${
                isEmerald ? 'text-[#60857E]' : isDark ? 'text-[#7F93B8]' : 'text-[#64748B]'
              }`}
            >
              MapX Tactical Engine • WGS 84 / UTM 40R • Offline Tiles
            </div>
          </div>
        </>
      )}

      {/* Drawing Mode Prompt Overlay */}
      {drawingTool && (
        <div
          className={`absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full shadow-xl border flex items-center gap-2 text-xs font-semibold z-20 animate-pulse ${
            isEmerald
              ? 'bg-[#10B981] text-white border-[#34D399] shadow-[0_0_15px_rgba(16,185,129,0.4)]'
              : isDark
              ? 'bg-[#3B6FD6] text-[#FFFFFF] border-[#9DBBF8]'
              : 'bg-[#2A55B0] text-[#FFFFFF] border-[#B8C4DC]'
          }`}
        >
          <div className="w-2 h-2 rounded-full bg-white animate-ping" />
          <span>Active Drawing: {drawingTool.replace('_', ' ')} — Tap to plot points</span>
        </div>
      )}
    </div>
  );
};
