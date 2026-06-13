export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-4">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 blur-[120px] rounded-full pointer-events-none animate-pulse delay-700" />
      <div className="absolute top-[20%] right-[20%] w-[20%] h-[20%] bg-secondary/20 blur-[80px] rounded-full pointer-events-none" />

      {/* Auth Card Container */}
      <div className="relative z-10 w-full max-w-md">
        <div className="backdrop-blur-xl bg-black/40 border border-white/10 p-8 rounded-2xl shadow-2xl">
          {children}
        </div>
      </div>
    </div>
  )
}
