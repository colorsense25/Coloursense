'use client'

import { Loader2 } from 'lucide-react'

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 bg-gray-900/90 backdrop-blur-sm flex items-center justify-center">
      <div className="text-center">
        {/* Animated logo or icon */}
        <div className="relative mx-auto w-24 h-24 mb-6">
          <div className="absolute inset-0 rounded-full bg-blue-600 opacity-20 animate-ping"></div>
          <div className="absolute inset-2 rounded-full bg-blue-600 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
              />
            </svg>
          </div>
        </div>

        {/* Loading text and spinner */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Loading Admin Portal</h2>
          <p className="text-gray-400 max-w-md mx-auto">
            Securely authenticating your credentials...
          </p>
          <div className="flex justify-center">
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
          </div>
        </div>

        {/* Progress bar (optional) */}
        <div className="mt-8 w-full max-w-xs mx-auto">
          <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full animate-progress"
              style={{
                animation: 'progress 2.5s ease-in-out infinite',
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Add this to your global CSS */}
      <style jsx global>{`
        @keyframes progress {
          0% {
            width: 0%;
            transform: translateX(0);
          }
          50% {
            width: 100%;
            transform: translateX(0);
          }
          100% {
            width: 0%;
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  )
}