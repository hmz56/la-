import React, { useState } from 'react';
import {
  ActivePanel,
  ActiveTool,
  CoordinateFormat,
  DrawingToolType,
  LanguageMode,
  LayerItem,
  LayoutMode,
  LocateState,
  MapObject,
  ProjectItem,
  SaveState,
  SceneItem,
  ScreenId,
  ThemeMode,
} from './types';
import {
  COLORS,
  I18N,
  INITIAL_LAYERS,
  INITIAL_OBJECTS,
  INITIAL_SCENES,
} from './constants/theme';
import { InspectorBar } from './components/InspectorBar';
import { TopStatusBar } from './components/TopStatusBar';
import { ToolRail } from './components/ToolRail';
import { BottomDock } from './components/BottomDock';
import { BottomContextBar } from './components/BottomContextBar';
import { SidePanel } from './components/SidePanel';
import { MapCanvas } from './components/MapCanvas';
import { ModalLayer } from './components/ModalLayer';

// Screens
import { S0_LockScreen } from './components/screens/S0_LockScreen';
import { S1_HomeScreen } from './components/screens/S1_HomeScreen';
import { S2_NewProjectDialog } from './components/screens/S2_NewProjectDialog';
import { S4_PresenterScreen } from './components/screens/S4_PresenterScreen';
import { S5_AudienceScreen } from './components/screens/S5_AudienceScreen';
import { S6_RemoteScreen } from './components/screens/S6_RemoteScreen';
import { S7_SettingsScreen } from './components/screens/S7_SettingsScreen';
import { S8_GeoreferenceScreen } from './components/screens/S8_GeoreferenceScreen';
import { S9_ExchangeWizard } from './components/screens/S9_ExchangeWizard';
import { S10_AccountsScreen } from './components/screens/S10_AccountsScreen';
import { S11_PairingScreen } from './components/screens/S11_PairingScreen';

export default function App() {
  // Studio & Layout state
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('TABLET_LANDSCAPE');
  const [theme, setTheme] = useState<ThemeMode>('emerald');
  const [language, setLanguage] = useState<LanguageMode>('en');
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('S3_EDITOR');
  const [debugMode, setDebugMode] = useState(false);
  const [fontScale, setFontScale] = useState(1);

  // Tactical Workstation State
  const [projectName, setProjectName] = useState('Gulf Strategic Corridor Briefing');
  const [saveState, setSaveState] = useState<SaveState>('SAVED');
  const [coordFormat, setCoordFormat] = useState<CoordinateFormat>('DMS');
  const [locateState, setLocateState] = useState<LocateState>('located');

  // Tools & Panels
  const [activeTool, setActiveTool] = useState<ActiveTool>('SELECT');
  const [drawingTool, setDrawingTool] = useState<DrawingToolType | null>(null);
  const [activePanel, setActivePanel] = useState<ActivePanel>('PROPERTIES');

  // Selection & Map Data
  const [objects, setObjects] = useState<MapObject[]>(INITIAL_OBJECTS);
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>('obj1');
  const [layers, setLayers] = useState<LayerItem[]>(INITIAL_LAYERS);
  const [scenes, setScenes] = useState<SceneItem[]>(INITIAL_SCENES);
  const [presenterSceneIndex, setPresenterSceneIndex] = useState(0);

  // Modals & Popovers
  const [isCoordSwitcherOpen, setIsCoordSwitcherOpen] = useState(false);
  const [isDrawMenuOpen, setIsDrawMenuOpen] = useState(false);
  const [isOverflowOpen, setIsOverflowOpen] = useState(false);
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);

  const selectedObject = objects.find((o) => o.id === selectedObjectId) || null;

  // Handlers
  const handleSelectTool = (tool: ActiveTool) => {
    setActiveTool(tool);
    if (tool !== 'DRAW') {
      setDrawingTool(null);
    }
  };

  const handleSelectDrawingTool = (dTool: DrawingToolType) => {
    setActiveTool('DRAW');
    setDrawingTool(dTool);
  };

  const handleTogglePanel = (panel: ActivePanel) => {
    setActivePanel((prev) => (prev === panel ? 'NONE' : panel));
  };

  const handleUpdateObject = (updated: Partial<MapObject>) => {
    if (!selectedObjectId) return;
    setObjects((prev) =>
      prev.map((o) => (o.id === selectedObjectId ? { ...o, ...updated } : o))
    );
    setSaveState('SAVING');
    setTimeout(() => setSaveState('SAVED'), 600);
  };

  const handleDeleteObject = (id: string) => {
    setObjects((prev) => prev.filter((o) => o.id !== id));
    if (selectedObjectId === id) setSelectedObjectId(null);
  };

  const handleToggleLock = (id: string) => {
    setObjects((prev) =>
      prev.map((o) => (o.id === id ? { ...o, locked: !o.locked } : o))
    );
  };

  const handleStartPresenter = (sceneIdx: number = 0) => {
    setPresenterSceneIndex(sceneIdx);
    setCurrentScreen('S4_PRESENTER');
  };

  const handleLocateToggle = () => {
    const states: LocateState[] = ['idle', 'searching', 'located', 'follow'];
    const nextIdx = (states.indexOf(locateState) + 1) % states.length;
    setLocateState(states[nextIdx]);
  };

  // Device Container Frame dimensions
  const getContainerStyles = () => {
    switch (layoutMode) {
      case 'TABLET_LANDSCAPE':
        return 'w-full max-w-[1280px] h-[800px] max-h-[calc(100vh-40px)] border shadow-2xl rounded-2xl overflow-hidden';
      case 'TABLET_PORTRAIT':
        return 'w-full max-w-[800px] h-[950px] max-h-[calc(100vh-40px)] border shadow-2xl rounded-2xl overflow-hidden';
      case 'PHONE_LANDSCAPE':
        return 'w-full max-w-[844px] h-[390px] border shadow-2xl rounded-2xl overflow-hidden';
      case 'PHONE_PORTRAIT':
        return 'w-full max-w-[390px] h-[844px] max-h-[calc(100vh-40px)] border shadow-2xl rounded-3xl overflow-hidden';
      case 'RESPONSIVE':
      default:
        return 'w-full h-[calc(100vh-40px)]';
    }
  };

  const isEmerald = theme === 'emerald';
  const isDark = theme === 'dark' || isEmerald;
  const isPhonePortrait = layoutMode === 'PHONE_PORTRAIT';

  const getContainerBg = () => {
    if (isEmerald) return 'border-[#203833] bg-[#0A1312] shadow-[0_0_50px_rgba(16,185,129,0.12)]';
    if (isDark) return 'border-[#2A4478] bg-[#0A1A3A]';
    return 'border-[#C3CCDA] bg-[#EEF1F6]';
  };

  return (
    <div
      className={`w-screen h-screen flex flex-col overflow-hidden font-sans ${
        isEmerald ? 'bg-[#050C0B]' : 'bg-[#050C1B]'
      } ${isDark ? 'dark' : ''}`}
      style={{ fontSize: `${fontScale * 14}px` }}
    >
      {/* 1. Studio Inspector Toolbar (Allows full design switching across all screens & viewports) */}
      <InspectorBar
        layoutMode={layoutMode}
        setLayoutMode={setLayoutMode}
        theme={theme}
        setTheme={setTheme}
        language={language}
        setLanguage={setLanguage}
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
        debugMode={debugMode}
        setDebugMode={setDebugMode}
        fontScale={fontScale}
        setFontScale={setFontScale}
      />

      {/* 2. Device Viewport Canvas Centered in Workspace */}
      <div className={`flex-1 w-full h-[calc(100vh-40px)] flex items-center justify-center p-0 md:p-3 overflow-hidden ${isEmerald ? 'bg-[#040908]' : 'bg-[#040814]'}`}>
        <div
          className={`${getContainerStyles()} relative flex flex-col transition-all duration-200 ${getContainerBg()}`}
          dir={language === 'ar' ? 'rtl' : 'ltr'}
        >
          {/* ================= S0: LOCK SCREEN ================= */}
          {currentScreen === 'S0_LOCK' && (
            <S0_LockScreen
              theme={theme}
              language={language}
              onUnlock={() => setCurrentScreen('S3_EDITOR')}
            />
          )}

          {/* ================= S1: HOME SCREEN ================= */}
          {currentScreen === 'S1_HOME' && (
            <S1_HomeScreen
              theme={theme}
              language={language}
              layoutMode={layoutMode}
              onOpenProject={(p) => {
                setProjectName(p.name);
                setCurrentScreen('S3_EDITOR');
              }}
              onNewProject={() => setIsNewProjectOpen(true)}
              onOpenSettings={() => setCurrentScreen('S7_SETTINGS')}
              onOpenExchange={() => setCurrentScreen('S9_EXCHANGE')}
              onOpenPairing={() => setCurrentScreen('S11_PAIRING')}
              onOpenAccounts={() => setCurrentScreen('S10_ACCOUNTS')}
            />
          )}

          {/* ================= S4: FULL PRESENTER DISPLAY ================= */}
          {currentScreen === 'S4_PRESENTER' && (
            <S4_PresenterScreen
              theme={theme}
              language={language}
              layoutMode={layoutMode}
              scenes={scenes}
              currentSceneIndex={presenterSceneIndex}
              onExit={() => setCurrentScreen('S3_EDITOR')}
              objects={objects}
            />
          )}

          {/* ================= S5: AUDIENCE DISPLAY IN-APP ================= */}
          {currentScreen === 'S5_AUDIENCE' && (
            <S5_AudienceScreen
              theme={theme}
              language={language}
              layoutMode={layoutMode}
              scenes={scenes}
              currentSceneIndex={presenterSceneIndex}
              onExit={() => setCurrentScreen('S3_EDITOR')}
              objects={objects}
            />
          )}

          {/* ================= S6: PHONE REMOTE CONTROLLER ================= */}
          {currentScreen === 'S6_REMOTE' && (
            <S6_RemoteScreen
              theme={theme}
              language={language}
              scenes={scenes}
              layers={layers}
              onExit={() => setCurrentScreen('S3_EDITOR')}
            />
          )}

          {/* ================= S7: SETTINGS ================= */}
          {currentScreen === 'S7_SETTINGS' && (
            <S7_SettingsScreen
              theme={theme}
              onSetTheme={setTheme}
              language={language}
              onSetLanguage={setLanguage}
              coordFormat={coordFormat}
              onSetCoordFormat={setCoordFormat}
              onBack={() => setCurrentScreen('S3_EDITOR')}
            />
          )}

          {/* ================= S8: GEOREFERENCE ALIGNMENT ================= */}
          {currentScreen === 'S8_GEOREFERENCE' && (
            <S8_GeoreferenceScreen
              theme={theme}
              language={language}
              onBack={() => setCurrentScreen('S3_EDITOR')}
            />
          )}

          {/* ================= S9: EXPORT & IMPORT ================= */}
          {currentScreen === 'S9_EXCHANGE' && (
            <S9_ExchangeWizard
              theme={theme}
              language={language}
              onBack={() => setCurrentScreen('S3_EDITOR')}
            />
          )}

          {/* ================= S10: ACCOUNTS ================= */}
          {currentScreen === 'S10_ACCOUNTS' && (
            <S10_AccountsScreen
              theme={theme}
              language={language}
              onBack={() => setCurrentScreen('S3_EDITOR')}
            />
          )}

          {/* ================= S11: PAIRING ================= */}
          {currentScreen === 'S11_PAIRING' && (
            <S11_PairingScreen
              theme={theme}
              language={language}
              onBack={() => setCurrentScreen('S3_EDITOR')}
              onConnectRemote={() => setCurrentScreen('S6_REMOTE')}
            />
          )}

          {/* ================= S3: TACTICAL WORKSTATION EDITOR ================= */}
          {currentScreen === 'S3_EDITOR' && (
            <div className="w-full h-full flex flex-col overflow-hidden relative">
              {/* Region 1: Top Status Bar (48dp) */}
              <div className={debugMode ? 'relative outline-2 outline-dashed outline-yellow-400' : ''}>
                {debugMode && (
                  <span className="absolute left-2 top-0 bg-yellow-400 text-black text-[9px] font-mono px-1 z-50">
                    TOP BAR (48dp)
                  </span>
                )}
                <TopStatusBar
                  theme={theme}
                  language={language}
                  layoutMode={layoutMode}
                  projectName={projectName}
                  saveState={saveState}
                  coordFormat={coordFormat}
                  locateState={locateState}
                  onBack={() => setCurrentScreen('S1_HOME')}
                  onOpenCoordSwitcher={() => setIsCoordSwitcherOpen(true)}
                  onUndo={() => alert('Undo action')}
                  onRedo={() => alert('Redo action')}
                  onLocate={handleLocateToggle}
                  onPresent={() => handleStartPresenter(0)}
                  onOpenOverflow={(e) => {
                    e.stopPropagation();
                    setIsOverflowOpen(true);
                  }}
                  onOpenSettings={() => setCurrentScreen('S7_SETTINGS')}
                />
              </div>

              {/* Region 2: Middle Content Area (Rail + Map + SidePanel) */}
              <div className="flex-1 flex overflow-hidden relative">
                {/* Tool Rail (Only on Tablets & Phone Landscape) */}
                {!isPhonePortrait && (
                  <div className={debugMode ? 'relative outline-2 outline-dashed outline-blue-400' : ''}>
                    {debugMode && (
                      <span className="absolute left-1 top-1 bg-blue-400 text-black text-[9px] font-mono px-1 z-50">
                        TOOL RAIL
                      </span>
                    )}
                    <ToolRail
                      theme={theme}
                      language={language}
                      layoutMode={layoutMode}
                      activeTool={activeTool}
                      activePanel={activePanel}
                      onSelectTool={handleSelectTool}
                      onTogglePanel={handleTogglePanel}
                      onOpenDrawMenu={() => setIsDrawMenuOpen(true)}
                    />
                  </div>
                )}

                {/* Map Viewport Area */}
                <div
                  className={`flex-1 h-full flex flex-col relative overflow-hidden ${
                    debugMode ? 'outline-2 outline-dashed outline-green-400' : ''
                  }`}
                >
                  {debugMode && (
                    <span className="absolute left-2 top-2 bg-green-400 text-black text-[9px] font-mono px-1 z-50">
                      MAP CANVAS VIEWPORT
                    </span>
                  )}

                  <div className="flex-1 relative overflow-hidden">
                    <MapCanvas
                      theme={theme}
                      layoutMode={layoutMode}
                      activeTool={activeTool}
                      drawingTool={drawingTool}
                      objects={objects}
                      selectedObjectId={selectedObjectId}
                      onSelectObject={(id) => {
                        setSelectedObjectId(id);
                        if (id) setActivePanel('PROPERTIES');
                      }}
                      onFinishDrawing={() => {
                        setDrawingTool(null);
                        setActiveTool('SELECT');
                      }}
                    />
                  </div>

                  {/* Context Bar: Under Map */}
                  <div className={debugMode ? 'relative outline-2 outline-dashed outline-purple-400' : ''}>
                    {debugMode && (
                      <span className="absolute left-2 top-0 bg-purple-400 text-black text-[9px] font-mono px-1 z-50">
                        CONTEXT BAR (56dp/48dp)
                      </span>
                    )}
                    <BottomContextBar
                      theme={theme}
                      language={language}
                      layoutMode={layoutMode}
                      activeTool={activeTool}
                      drawingTool={drawingTool}
                      selectedObject={selectedObject}
                      onFinishDrawing={() => {
                        setDrawingTool(null);
                        setActiveTool('SELECT');
                      }}
                      onDiscardDrawing={() => {
                        setDrawingTool(null);
                        setActiveTool('SELECT');
                      }}
                      onDeselect={() => setSelectedObjectId(null)}
                      onDeleteObject={handleDeleteObject}
                      onToggleLock={handleToggleLock}
                      onOpenProperties={() => setActivePanel('PROPERTIES')}
                    />
                  </div>
                </div>

                {/* Side Panel (Tablet Landscape / Portrait) */}
                <div className={debugMode && activePanel !== 'NONE' ? 'relative outline-2 outline-dashed outline-orange-400' : ''}>
                  {debugMode && activePanel !== 'NONE' && (
                    <span className="absolute left-2 top-2 bg-orange-400 text-black text-[9px] font-mono px-1 z-50">
                      SIDE PANEL (320dp)
                    </span>
                  )}
                  <SidePanel
                    theme={theme}
                    language={language}
                    layoutMode={layoutMode}
                    activePanel={activePanel}
                    onClose={() => setActivePanel('NONE')}
                    layers={layers}
                    setLayers={setLayers}
                    scenes={scenes}
                    setScenes={setScenes}
                    selectedObject={selectedObject}
                    onUpdateObject={handleUpdateObject}
                    onStartPresenter={handleStartPresenter}
                  />
                </div>
              </div>

              {/* Bottom Dock (Phone Portrait 5-slot navigation) */}
              {isPhonePortrait && (
                <div className={debugMode ? 'relative outline-2 outline-dashed outline-pink-400' : ''}>
                  {debugMode && (
                    <span className="absolute left-2 top-0 bg-pink-400 text-black text-[9px] font-mono px-1 z-50">
                      BOTTOM DOCK (56dp)
                    </span>
                  )}
                  <BottomDock
                    theme={theme}
                    language={language}
                    activeTool={activeTool}
                    activePanel={activePanel}
                    onSelectTool={handleSelectTool}
                    onTogglePanel={handleTogglePanel}
                    onOpenDrawMenu={() => setIsDrawMenuOpen(true)}
                    onOpenMoreMenu={() => setActivePanel('SYMBOLS')}
                  />
                </div>
              )}
            </div>
          )}

          {/* ================= MODALS & OVERLAYS ================= */}
          <ModalLayer
            theme={theme}
            language={language}
            isCoordSwitcherOpen={isCoordSwitcherOpen}
            onCloseCoordSwitcher={() => setIsCoordSwitcherOpen(false)}
            currentCoordFormat={coordFormat}
            onSelectCoordFormat={(fmt) => {
              setCoordFormat(fmt);
              setIsCoordSwitcherOpen(false);
            }}
            isDrawMenuOpen={isDrawMenuOpen}
            onCloseDrawMenu={() => setIsDrawMenuOpen(false)}
            onSelectDrawingTool={handleSelectDrawingTool}
            isOverflowOpen={isOverflowOpen}
            onCloseOverflow={() => setIsOverflowOpen(false)}
            onNavigateScreen={(scr) => setCurrentScreen(scr)}
            onDeleteProject={() => setCurrentScreen('S1_HOME')}
          />

          {/* S2 New Project Modal */}
          <S2_NewProjectDialog
            theme={theme}
            language={language}
            isOpen={isNewProjectOpen}
            onClose={() => setIsNewProjectOpen(false)}
            onCreate={(name, map) => {
              setProjectName(name);
              setIsNewProjectOpen(false);
              setCurrentScreen('S3_EDITOR');
            }}
          />
        </div>
      </div>
    </div>
  );
}
