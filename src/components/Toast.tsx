export function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <div
      aria-hidden={!visible}
      className={`fixed right-6 top-6 z-50 max-w-sm rounded-xl border border-red/20 bg-white px-4 py-3.5 shadow-lg transition-all duration-300 ease-out ${
        visible ? 'translate-x-0 opacity-100' : 'pointer-events-none translate-x-8 opacity-0'
      }`}
    >
      <p className="text-sm font-medium text-red">{message}</p>
    </div>
  )
}
