import React, { useState } from 'react';
import { ArrowLeft, Shield, User, Key, Trash2, Lock, Plus, Check } from 'lucide-react';
import { LanguageMode, ThemeMode } from '../../types';

interface S10AccountsScreenProps {
  theme: ThemeMode;
  language: LanguageMode;
  onBack: () => void;
}

export const S10_AccountsScreen: React.FC<S10AccountsScreenProps> = ({
  theme,
  language,
  onBack,
}) => {
  const isEmerald = theme === 'emerald';
  const isDark = theme === 'dark';
  const [users, setUsers] = useState([
    { id: 'u1', name: 'Commander (Admin)', role: 'Master Admin', lastLogin: 'Today, 14:10' },
    { id: 'u2', name: 'Duty Watchstander', role: 'Operator (Read/Write)', lastLogin: 'Yesterday' },
    { id: 'u3', name: 'VIP Guest', role: 'Presenter (Read-Only)', lastLogin: 'Oct 29' },
  ]);

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
          <h1 className="text-base font-bold">S10: Accounts & Security</h1>
        </div>
      </header>

      <div className="flex-1 p-6 max-w-2xl w-full mx-auto space-y-6 overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className={`text-sm font-bold ${isEmerald ? 'text-[#7F9D96]' : 'text-[#7F93B8]'} uppercase`}>Configured Operators</h2>
          <button
            onClick={() => alert('New operator dialog')}
            className={`px-3 py-1.5 rounded-lg ${
              isEmerald ? 'bg-[#10B981] hover:bg-[#059669] shadow-[0_0_12px_rgba(16,185,129,0.3)]' : 'bg-[#3B6FD6] hover:bg-[#2F5DB8]'
            } text-white text-xs font-semibold flex items-center gap-1 shadow transition-all`}
          >
            <Plus className="w-4 h-4" />
            <span>Add User</span>
          </button>
        </div>

        <div className="space-y-3">
          {users.map((u) => (
            <div
              key={u.id}
              className={`p-4 rounded-2xl border flex items-center justify-between ${
                isEmerald
                  ? 'bg-[#121E1C] border-[#203833]'
                  : isDark
                  ? 'bg-[#0F2147] border-[#2A4478]'
                  : 'bg-white border-[#C3CCDA]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${isEmerald ? 'bg-[#10B981]/20 text-[#10B981]' : 'bg-[#3B6FD6]/20 text-[#3B6FD6]'} flex items-center justify-center`}>
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold">{u.name}</div>
                  <div className={`text-[11px] ${isEmerald ? 'text-[#7F9D96]' : 'text-[#7F93B8]'}`}>{u.role}</div>
                </div>
              </div>

              <span className={`text-[10px] font-mono ${isEmerald ? 'text-[#7F9D96]' : 'text-[#7F93B8]'}`}>Last login: {u.lastLogin}</span>
            </div>
          ))}
        </div>

        {/* Panic Wipe Data Warning */}
        <div
          className={`p-5 rounded-2xl border border-[#E3201B]/40 space-y-3 ${
            isEmerald ? 'bg-[#E3201B]/10' : isDark ? 'bg-[#E3201B]/10' : 'bg-red-50'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-bold text-[#E3201B]">
            <Shield className="w-4 h-4" />
            <span>Emergency Secure Erasure (Zeroization)</span>
          </div>
          <p className="text-xs text-[#7F93B8]">
            Immediately overwrites and zeroizes all local SQLite databases, stored GeoPackages,
            and cryptographic keys stored in Android KeyStore.
          </p>
          <button
            onClick={() => {
              if (confirm('Execute zeroization wipe?')) alert('Data wiped');
            }}
            className="px-4 py-2 rounded-xl bg-[#E3201B] hover:bg-[#C91A16] text-white text-xs font-bold shadow"
          >
            Execute Emergency Zeroization
          </button>
        </div>
      </div>
    </div>
  );
};
