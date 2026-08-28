import { Check } from 'lucide-react'

export default function StepIndicator({ steps, currentStep }) {
  return (
    <div className="flex items-center gap-0">
      {steps.map((step, i) => {
        const isComplete = i < currentStep
        const isActive = i === currentStep
        return (
          <div key={i} className="flex items-center">
            {/* Connector */}
            {i > 0 && (
              <div
                className={`h-px w-12 transition-all duration-500 ${
                  i <= currentStep ? 'bg-sage-500' : 'bg-charcoal-200'
                }`}
              />
            )}
            {/* Dot */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`step-dot ${
                  isComplete
                    ? 'bg-sage-500 text-white'
                    : isActive
                    ? 'bg-charcoal-800 text-white ring-4 ring-charcoal-100'
                    : 'bg-cream-300 text-charcoal-400'
                }`}
              >
                {isComplete ? <Check size={14} /> : <span>{i + 1}</span>}
              </div>
              <span
                className={`text-xs font-medium whitespace-nowrap ${
                  isActive ? 'text-charcoal-800' : isComplete ? 'text-sage-600' : 'text-charcoal-400'
                }`}
              >
                {step}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
