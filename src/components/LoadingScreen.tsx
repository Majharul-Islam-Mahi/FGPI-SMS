import { GraduationCap } from "lucide-react";

export function LoadingScreen({ message = "Loading" }: { message?: string }) {
  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-linear-to-br from-[#02140D] via-[#0A2419] to-[#02140D] text-white">
      {/* Animated Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary/20 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-gold/10 blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Logo */}
        <div className="relative mb-8">
          <div className="absolute inset-0 rounded-full bg-gold/20 blur-2xl animate-ping" />
          <div className="relative w-24 h-24 rounded-2xl bg-linear-to-br from-primary to-[#02140D] border-2 border-gold/40 flex items-center justify-center shadow-2xl">
            <GraduationCap className="w-14 h-14 text-gold" />
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="text-3xl font-bold tracking-widest text-gold mb-2 font-display">FGPI SMS</h1>
        <p className="text-sm text-gray-400 mb-8 tracking-wider uppercase">
          Student Management System
        </p>

        {/* Loading Bar */}
        <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden mb-4">
          <div className="h-full bg-linear-to-r from-primary via-gold to-primary rounded-full animate-loading-bar" />
        </div>

        {/* Loading Text */}
        <div className="flex items-center gap-1">
          <span className="text-sm text-gray-300">{message}</span>
          <span className="flex gap-1">
            <span
              className="w-1 h-1 rounded-full bg-gold animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <span
              className="w-1 h-1 rounded-full bg-gold animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <span
              className="w-1 h-1 rounded-full bg-gold animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-2">Please wait...</p>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 text-xs text-gray-600 tracking-widest">
        FENI GOVT POLYTECHNIC INSTITUTE
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-loading-bar {
          animation: loading-bar 1.5s ease-in-out infinite;
          width: 50%;
        }
      `}</style>
    </div>
  );
}
