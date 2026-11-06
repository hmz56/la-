import React, { useState } from 'react';
import { ArrowLeft, QrCode, Smartphone, Wifi, Check, ShieldCheck, RefreshCw } from 'lucide-react';
import { LanguageMode, ThemeMode } from '../../types';

interface S11PairingScreenProps {
  theme: ThemeMode;
  language: LanguageMode;
  onBack: () => void;
  onConnectRemote: () => void;
}

export const S11_PairingScreen: React.FC<S11PairingScreenProps> = ({
  theme,
  language,
  onBack,
  onConnectRemote,
}) => {
  const isEmerald = theme === 'emerald';
  const isDark = theme === 'dark';
  const [activeRole, setActiveRole] = useState<'tablet' | 'phone'>('tablet');
  const [pinInput, setPinInput] = useState('');

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
          <div>
            <h1 className="text-base font-bold">S11: Wireless Remote Pairing</h1>
            <span className={`text-[10px] ${isEmerald ? 'text-[#7F9D96]' : 'text-[#7F93B8]'} font-mono`}>
              Zero-Cloud Local Wi-Fi Direct / mDNS / TLS 1.3
            </span>
          </div>
        </div>

        <div className={`flex rounded-lg p-0.5 border ${isEmerald ? 'bg-[#121E1C] border-[#203833]' : 'bg-current/5 border-current/10'}`}>
          <button
            onClick={() => setActiveRole('tablet')}
            className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
              activeRole === 'tablet'
                ? isEmerald ? 'bg-[#10B981] text-white shadow-[0_0_10px_rgba(16,185,129,0.3)]' : 'bg-[#3B6FD6] text-white'
                : isEmerald ? 'text-[#7F9D96]' : 'text-[#7F93B8]'
            }`}
          >
            Tablet Host
          </button>
          <button
            onClick={() => setActiveRole('phone')}
            className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
              activeRole === 'phone'
                ? isEmerald ? 'bg-[#10B981] text-white shadow-[0_0_10px_rgba(16,185,129,0.3)]' : 'bg-[#3B6FD6] text-white'
                : isEmerald ? 'text-[#7F9D96]' : 'text-[#7F93B8]'
            }`}
          >
            Phone Remote
          </button>
        </div>
      </header>

      <div className="flex-1 p-6 flex flex-col items-center justify-center max-w-md w-full mx-auto space-y-6">
        {activeRole === 'tablet' ? (
          /* Tablet Host View: Shows QR & PIN */
          <div
            className={`w-full p-6 rounded-3xl border shadow-2xl flex flex-col items-center text-center space-y-4 ${
              isEmerald
                ? 'bg-[#121E1C] border-[#203833] shadow-[0_0_35px_rgba(16,185,129,0.2)]'
                : isDark
                ? 'bg-[#0F2147] border-[#2A4478]'
                : 'bg-white border-[#C3CCDA]'
            }`}
          >
            <div className={`flex items-center gap-2 text-xs font-bold ${isEmerald ? 'text-[#10B981]' : 'text-[#3B6FD6]'}`}>
              <Wifi className="w-4 h-4 animate-pulse" />
              <span>Broadcasting Host: MapX-Host-742</span>
            </div>

            {/* Simulated QR Code */}
            <div className={`w-52 h-52 rounded-2xl bg-white p-4 shadow-inner flex flex-col items-center justify-center relative border ${isEmerald ? 'ring-2 ring-[#10B981]/50' : ''}`}>
              <div className="grid grid-cols-6 gap-2 w-full h-full opacity-90">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-sm ${
                      (i % 2 === 0 && i % 3 === 0) || i === 0 || i === 5 || i === 30 || i === 35
                        ? 'bg-[#0A1312]'
                        : (i * 7) % 3 === 0
                        ? isEmerald ? 'bg-[#10B981]' : 'bg-[#3B6FD6]'
                        : 'bg-zinc-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <span className={`text-[11px] ${isEmerald ? 'text-[#7F9D96]' : 'text-[#7F93B8]'} uppercase tracking-wider`}>
                Or Enter Pairing PIN
              </span>
              <div className="text-2xl font-black font-mono tracking-widest text-[#FBBF24]">
                742 - 819
              </div>
            </div>

            <button
              onClick={onConnectRemote}
              className={`w-full py-2.5 rounded-xl ${
                isEmerald
                  ? 'bg-[#10B981] hover:bg-[#059669] shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                  : 'bg-[#3B6FD6] hover:bg-[#2F5DB8]'
              } text-white text-xs font-bold shadow transition-all`}
            >
              Test Open Controller (S6)
            </button>
          </div>
        ) : (
          /* Phone View: Scanner / Enter PIN */
          <div
            className={`w-full p-6 rounded-3xl border shadow-2xl space-y-4 ${
              isEmerald
                ? 'bg-[#121E1C] border-[#203833] shadow-[0_0_35px_rgba(16,185,129,0.2)]'
                : isDark
                ? 'bg-[#0F2147] border-[#2A4478]'
                : 'bg-white border-[#C3CCDA]'
            }`}
          >
            <div className="text-center">
              <h3 className="font-bold text-sm">Connect to Tablet Host</h3>
              <p className={`text-xs ${isEmerald ? 'text-[#7F9D96]' : 'text-[#7F93B8]'}`}>Scan Tablet QR or Enter PIN</p>
            </div>

            <div className={`w-full h-44 rounded-2xl bg-black relative flex items-center justify-center overflow-hidden border ${isEmerald ? 'border-[#203833]' : 'border-white/20'}`}>
              <div className={`w-32 h-32 rounded-xl border-2 ${isEmerald ? 'border-[#10B981]' : 'border-[#3B6FD6]'} relative animate-pulse flex items-center justify-center`}>
                <span className={`text-[10px] font-mono ${isEmerald ? 'text-[#10B981]' : 'text-[#3B6FD6]'}`}>ALIGN QR CODE</span>
              </div>
              <div className="w-full h-[2px] bg-red-500 absolute top-1/2 shadow-[0_0_8px_red] animate-bounce" />
            </div>

            <div className="space-y-2">
              <input
                type="text"
                placeholder="Enter 6-digit PIN (e.g. 742819)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className={`w-full p-3 rounded-xl border text-center text-sm font-mono tracking-widest outline-none ${
                  isEmerald
                    ? 'bg-[#172825] border-[#203833] text-white focus:border-[#10B981]'
                    : isDark
                    ? 'bg-[#16305F] border-[#2A4478] text-white'
                    : 'bg-[#F8FAFC] border-[#C3CCDA]'
                }`}
              />

              <button
                onClick={onConnectRemote}
                className={`w-full py-2.5 rounded-xl ${
                  isEmerald
                    ? 'bg-[#10B981] hover:bg-[#059669] shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                    : 'bg-[#3B6FD6] hover:bg-[#2F5DB8]'
                } text-white text-xs font-bold shadow transition-all`}
              >
                Connect to Briefing Host
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
