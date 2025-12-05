'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-red-500 font-mono p-4">
      <h2 className="text-2xl mb-4 border-b border-red-900 pb-2">SYSTEM CRITICAL FAILURE</h2>
      <p className="mb-8 text-sm opacity-70 font-sans max-w-md text-center">
        {error.message || "An unexpected anomaly occurred within the neural matrix."}
      </p>
      <div className="text-xs text-red-900 mb-8 font-mono">
        CODE: {error.digest || 'UNKNOWN_ENTITY'}
      </div>
      <button
        onClick={() => reset()}
        className="px-6 py-2 border border-red-800 hover:bg-red-900/20 rounded uppercase text-sm tracking-widest transition-colors font-bold text-red-400"
      >
        INITIATE REBOOT
      </button>
    </div>
  )
}
