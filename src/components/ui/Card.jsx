export default function Card({ children, className = '', hover = false, padding = true, ...props }) {
  return (
    <div
      className={`${hover ? 'card-hover' : 'card'} ${padding ? 'p-5' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ title, subtitle, action, eyebrow }) {
  return (
    <div className="flex items-start justify-between mb-4 p-3">
      <div>
        {eyebrow && <p className="section-eyebrow mb-1">{eyebrow}</p>}
        {title && <h3 className="text-base font-semibold text-charcoal-800">{title}</h3>}
        {subtitle && <p className="text-xs text-charcoal-400 mt-0.5">{subtitle}</p>}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  )
}
