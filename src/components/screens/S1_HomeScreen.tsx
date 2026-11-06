import React, { useState } from 'react';
import {
  Plus,
  Search,
  Settings,
  MoreVertical,
  Layers,
  MapPin,
  Calendar,
  Download,
  FolderOpen,
  Shield,
  Smartphone,
  ExternalLink,
} from 'lucide-react';
import { LanguageMode, LayoutMode, ProjectItem, ThemeMode } from '../../types';
import { I18N, SAMPLE_PROJECTS } from '../../constants/theme';

interface S1HomeScreenProps {
  theme: ThemeMode;
  language: LanguageMode;
  layoutMode: LayoutMode;
  onOpenProject: (proj: ProjectItem) => void;
  onNewProject: () => void;
  onOpenSettings: () => void;
  onOpenExchange: () => void;
  onOpenPairing: () => void;
  onOpenAccounts: () => void;
}

export const S1_HomeScreen: React.FC<S1HomeScreenProps> = ({
  theme,
  language,
  layoutMode,
  onOpenProject,
  onNewProject,
  onOpenSettings,
  onOpenExchange,
  onOpenPairing,
  onOpenAccounts,
}) => {
  const isEmerald = theme === 'emerald';
  const isDark = theme === 'dark' || isEmerald;
  const t = I18N[language];
  const [search, setSearch] = useState('');
  const isPhone = layoutMode === 'PHONE_PORTRAIT';

  const filteredProjects = SAMPLE_PROJECTS.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className={`w-full h-full flex flex-col select-none overflow-y-auto transition-colors ${
        isEmerald
          ? 'bg-[#0A1312] text-white'
          : isDark
          ? 'bg-[#0A1A3A] text-white'
          : 'bg-[#EEF1F6] text-[#0A1A3A]'
      }`}
    >
      {/* Top App Header */}
      <header
        className={`h-16 px-6 border-b flex items-center justify-between shrink-0 ${
          isEmerald
            ? 'bg-[#0F1A18] border-[#203833]'
            : isDark
            ? 'bg-[#0F2147] border-[#2A4478]'
            : 'bg-[#E3E8F0] border-[#C3CCDA]'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow ${
              isEmerald
                ? 'bg-[#10B981] shadow-[0_0_12px_rgba(16,185,129,0.35)]'
                : 'bg-[#3B6FD6]'
            }`}
          >
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-base sm:text-lg tracking-tight">{t.appTitle}</h1>
            <p className={`text-[11px] ${isEmerald ? 'text-[#7F9D96]' : 'text-[#7F93B8]'}`}>
              {t.offlineReady}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Pairing shortcut */}
          <button
            onClick={onOpenPairing}
            title="Pair Phone Remote"
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
              isEmerald
                ? 'hover:bg-[#172825] text-[#9DBAB4]'
                : isDark
                ? 'hover:bg-[#16305F] text-[#B8C4DC]'
                : 'hover:bg-[#CBD5E1] text-[#46546F]'
            }`}
          >
            <Smartphone className="w-4 h-4" />
          </button>

          {/* Accounts shortcut */}
          <button
            onClick={onOpenAccounts}
            title="Accounts & Security"
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
              isEmerald
                ? 'hover:bg-[#172825] text-[#9DBAB4]'
                : isDark
                ? 'hover:bg-[#16305F] text-[#B8C4DC]'
                : 'hover:bg-[#CBD5E1] text-[#46546F]'
            }`}
          >
            <Shield className="w-4 h-4" />
          </button>

          {/* Settings shortcut */}
          <button
            onClick={onOpenSettings}
            title={t.settings}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
              isEmerald
                ? 'hover:bg-[#172825] text-[#9DBAB4]'
                : isDark
                ? 'hover:bg-[#16305F] text-[#B8C4DC]'
                : 'hover:bg-[#CBD5E1] text-[#46546F]'
            }`}
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-6 max-w-6xl w-full mx-auto space-y-6">
        {/* Actions Bar & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#7F93B8]" />
            <input
              type="text"
              placeholder={t.search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium outline-none transition-all ${
                isEmerald
                  ? 'bg-[#172825] border-[#203833] text-white focus:border-[#10B981]'
                  : isDark
                  ? 'bg-[#16305F] border-[#2A4478] text-white focus:border-[#3B6FD6]'
                  : 'bg-white border-[#C3CCDA] text-[#0A1A3A] focus:border-[#2A55B0]'
              }`}
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenExchange}
              className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${
                isEmerald
                  ? 'bg-[#172825] border-[#203833] hover:bg-[#1E332F] text-white'
                  : isDark
                  ? 'bg-[#16305F] border-[#2A4478] hover:bg-[#20407A]'
                  : 'bg-white border-[#C3CCDA] hover:bg-[#F8FAFC]'
              }`}
            >
              <Download
                className={`w-4 h-4 ${isEmerald ? 'text-[#10B981]' : 'text-[#3B6FD6]'}`}
              />
              <span>{t.importProject}</span>
            </button>

            <button
              onClick={onNewProject}
              className={`px-5 py-2.5 rounded-xl text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-md transition-all active:scale-95 ${
                isEmerald
                  ? 'bg-[#10B981] hover:bg-[#059669] shadow-[0_0_15px_rgba(16,185,129,0.35)]'
                  : 'bg-[#3B6FD6] hover:bg-[#2F5DB8]'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>{t.newProject}</span>
            </button>
          </div>
        </div>

        {/* Projects Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2
              className={`text-sm font-bold tracking-tight uppercase ${
                isEmerald ? 'text-[#7F9D96]' : 'text-[#7F93B8]'
              }`}
            >
              {t.recentProjects} ({filteredProjects.length})
            </h2>
          </div>

          {/* Grid Layout for Tablet / Desktop, List Layout for Phone */}
          <div
            className={
              isPhone
                ? 'space-y-3'
                : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
            }
          >
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => onOpenProject(project)}
                className={`rounded-2xl border p-4 cursor-pointer transition-all hover:scale-[1.01] hover:shadow-xl group ${
                  isEmerald
                    ? 'bg-[#121E1C] hover:bg-[#172825] border-[#203833] hover:border-[#10B981]/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                    : isDark
                    ? 'bg-[#0F2147] hover:bg-[#16305F] border-[#2A4478]'
                    : 'bg-white hover:bg-[#F8FAFC] border-[#C3CCDA]'
                }`}
              >
                {/* Visual Thumbnail */}
                <div
                  className="w-full h-32 rounded-xl mb-3 flex items-center justify-center relative overflow-hidden shadow-inner"
                  style={{
                    backgroundColor: project.thumbnailColor,
                    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '16px 16px',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <MapPin className="w-8 h-8 text-white/70 group-hover:scale-110 transition-transform" />
                  <div className="absolute bottom-2 left-3 text-[10px] font-mono text-white/90 bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
                    {project.objectCount} Objects
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-sm group-hover:text-[#3B6FD6] transition-colors leading-snug">
                      {project.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-[#7F93B8] font-mono">
                    <Calendar className="w-3 h-3" />
                    <span>{project.modifiedDate}</span>
                  </div>

                  <div className="text-[10px] text-[#7F93B8] truncate pt-1 border-t border-current/5">
                    {project.mapSource}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
