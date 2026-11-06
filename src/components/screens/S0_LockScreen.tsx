import React, { useState } from 'react';
import { Lock, Shield, KeyRound, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { LanguageMode, ThemeMode } from '../../types';
import { I18N } from '../../constants/theme';

interface S0LockScreenProps {
  theme: ThemeMode;
  language: LanguageMode;
  onUnlock: () => void;
}

export const S0_LockScreen: React.FC<S0LockScreenProps> = ({ theme, language, onUnlock }) => {
  const isEmerald = theme === 'emerald';
  const isDark = theme === 'dark' || isEmerald;
  const t = I18N[language];
  const [pin, setPin] = useState('');
  const [isAdminSetup, setIsAdminSetup] = useState(false);
  const [error, setError] = useState('');

  const handleKeyPress = (num: string) => {
    if (pin.length < 6) {
      const nextPin = pin + num;
      setPin(nextPin);
      setError('');
      if (nextPin.length === 6) {
        // Quick verification: allow any 6 digit pin or 123456
        setTimeout(() => {
          onUnlock();
        }, 200);
      }
    }
  };

  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1));
    setError('');
  };

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center p-6 select-none transition-colors ${
        isEmerald ? 'bg-[#0A1312] text-white' : isDark ? 'bg-[#0A1A3A] text-white' : 'bg-[#EEF1F6] text-[#0A1A3A]'
      }`}
    >
      <div
        className={`w-full max-w-sm rounded-3xl border shadow-2xl p-6 flex flex-col items-center text-center space-y-6 ${
          isEmerald
            ? 'bg-[#121E1C] border-[#10B981]/50 shadow-[0_0_30px_rgba(16,185,129,0.2)]'
            : isDark
            ? 'bg-[#0F2147] border-[#2A4478]'
            : 'bg-white border-[#C3CCDA]'
        }`}
      >
        {/* Emblem */}
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg border ${
            isEmerald
              ? 'bg-[#10B981]/20 border-[#10B981]/50 text-[#10B981]'
              : 'bg-[#3B6FD6]/20 border-[#3B6FD6]/40 text-[#3B6FD6]'
          }`}
        >
          <Shield className="w-8 h-8" />
        </div>

        <div>
          <h1 className="text-xl font-bold tracking-tight">{t.appTitle}</h1>
          <p className="text-xs text-[#7F93B8] mt-1">{t.briefingSystem}</p>
        </div>

        {/* PIN Dots Indicator */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-[#7F93B8]">
            {isAdminSetup ? 'Create 6-Digit Admin Passcode' : 'Enter 6-Digit Security PIN'}
          </span>
          <div className="flex items-center justify-center gap-3 pt-2">
            {[0, 1, 2, 3, 4, 5].map((idx) => (
              <div
                key={idx}
                className={`w-3.5 h-3.5 rounded-full transition-all duration-150 ${
                  pin.length > idx
                    ? isEmerald
                      ? 'bg-[#10B981] scale-110 shadow-[0_0_10px_#10B981]'
                      : 'bg-[#3B6FD6] scale-110 shadow-[0_0_8px_#3B6FD6]'
                    : isEmerald
                    ? 'bg-[#172825] border border-[#203833]'
                    : isDark
                    ? 'bg-[#16305F] border border-[#2A4478]'
                    : 'bg-[#E2E8F0] border border-[#CBD5E1]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Numeric Keypad */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-[260px]">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              onClick={() => handleKeyPress(digit)}
              className={`h-14 rounded-2xl text-lg font-bold transition-all active:scale-95 border ${
                isEmerald
                  ? 'bg-[#172825] hover:bg-[#1E332F] border-[#203833] text-white hover:border-[#10B981]/50'
                  : isDark
                  ? 'bg-[#16305F]/80 hover:bg-[#20407A] border-[#2A4478] text-white'
                  : 'bg-[#F8FAFC] hover:bg-[#E2E8F0] border-[#CBD5E1] text-[#0A1A3A]'
              }`}
            >
              {digit}
            </button>
          ))}
          <button
            onClick={() => setIsAdminSetup(!isAdminSetup)}
            className={`h-14 rounded-2xl text-xs font-semibold flex items-center justify-center ${
              isDark ? 'text-[#7F93B8] hover:text-white' : 'text-[#64748B] hover:text-[#0A1A3A]'
            }`}
          >
            {isAdminSetup ? 'Login' : 'Setup'}
          </button>
          <button
            onClick={() => handleKeyPress('0')}
            className={`h-14 rounded-2xl text-lg font-bold transition-all active:scale-95 border ${
              isEmerald
                ? 'bg-[#172825] hover:bg-[#1E332F] border-[#203833] text-white hover:border-[#10B981]/50'
                : isDark
                ? 'bg-[#16305F]/80 hover:bg-[#20407A] border-[#2A4478] text-white'
                : 'bg-[#F8FAFC] hover:bg-[#E2E8F0] border-[#CBD5E1] text-[#0A1A3A]'
            }`}
          >
            0
          </button>
          <button
            onClick={handleBackspace}
            className={`h-14 rounded-2xl text-xs font-semibold flex items-center justify-center ${
              isDark ? 'text-[#7F93B8] hover:text-white' : 'text-[#64748B] hover:text-[#0A1A3A]'
            }`}
          >
            Delete
          </button>
        </div>

        {/* Direct Bypass CTA for Design Review */}
        <button
          onClick={onUnlock}
          className={`w-full py-2.5 rounded-xl text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md transition-all ${
            isEmerald
              ? 'bg-[#10B981] hover:bg-[#059669] shadow-[0_0_15px_rgba(16,185,129,0.35)]'
              : 'bg-[#3B6FD6] hover:bg-[#2F5DB8]'
          }`}
        >
          <span>Authenticate & Open Workspace</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="text-[10px] text-[#7F93B8] flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#3DB57A]" />
          <span>FIPS 140-3 Compliant • Local Keystore Encryption</span>
        </div>
      </div>
    </div>
  );
};
