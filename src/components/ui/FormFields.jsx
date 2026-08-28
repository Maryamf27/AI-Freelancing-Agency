export function Input({ label, error, className = '', ...props }) {
  return (
    <div className={className}>
      {label && <label className="field-label">{label}</label>}
      <input className={`field-input ${error ? 'border-red-400 focus:ring-red-300' : ''}`} {...props} />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}

export function Textarea({ label, error, className = '', rows = 4, ...props }) {
  return (
    <div className={className}>
      {label && <label className="field-label">{label}</label>}
      <textarea
        rows={rows}
        className={`field-input resize-none ${error ? 'border-red-400 focus:ring-red-300' : ''}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}

export function Select({ label, error, className = '', children, ...props }) {
  return (
    <div className={className}>
      {label && <label className="field-label">{label}</label>}
      <select
        className={`field-input bg-white appearance-none ${error ? 'border-red-400' : ''}`}
        {...props}
      >
        {children}
      </select>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}
