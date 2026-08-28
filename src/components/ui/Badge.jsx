export function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-charcoal-100 text-charcoal-600',
    draft: 'bg-charcoal-100 text-charcoal-500',
    sent: 'bg-blue-100 text-blue-500',
    viewed: 'bg-amber-50 text-amber-500',
    signed: 'bg-sage-100 text-sage-700',
    overdue: 'bg-red-100 text-red-500',
    paid: 'bg-sage-100 text-sage-700',
    unpaid: 'bg-charcoal-100 text-charcoal-500',
    scope: 'bg-amber-50 text-amber-500 border border-amber-200',
    new: 'bg-blue-100 text-blue-500',
  }
  return (
    <span className={`badge ${variants[variant] || variants.default} ${className}`}>
      {children}
    </span>
  )
}

export function StatusDot({ status }) {
  const colors = {
    draft: 'bg-charcoal-300',
    sent: 'bg-blue-500',
    viewed: 'bg-amber-400',
    signed: 'bg-sage-500',
    overdue: 'bg-red-500',
    paid: 'bg-sage-500',
    unpaid: 'bg-charcoal-300',
  }
  return (
    <span className={`inline-block w-2 h-2 rounded-full ${colors[status] || 'bg-charcoal-300'}`} />
  )
}
