type ToastTone = 'red' | 'green'

const toneClasses: Record<ToastTone, { border: string; text: string }> = {
  red: { border: 'border-red/20', text: 'text-red' },
  green: { border: 'border-green/20', text: 'text-green' },
}

export function Toast({
  message,
  visible,
  tone = 'red',
}: {
  message: string
  visible: boolean
  tone?: ToastTone
}) {
  const { border, text } = toneClasses[tone]

  return (
    <div
      aria-hidden={!visible}
      className={`fixed right-6 top-6 z-50 max-w-sm rounded-xl border ${border} bg-white px-4 py-3.5 shadow-lg transition-all duration-300 ease-out ${
        visible ? 'translate-x-0 opacity-100' : 'pointer-events-none translate-x-8 opacity-0'
      }`}
    >
      <p className={`text-sm font-medium ${text}`}>{message}</p>
    </div>
  )
}
