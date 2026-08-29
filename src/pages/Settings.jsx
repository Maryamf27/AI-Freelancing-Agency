import { useState } from 'react'
import {
  User,
  Building2,
  Bell,
  CreditCard,
  Check,
  Sparkles,
} from 'lucide-react'
import Card from '../components/ui/Card'
import { Input, Textarea, Select } from '../components/ui/FormFields'
import { useAppData } from '../context/AppDataContext'

const TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'business', label: 'Business & Invoicing', icon: Building2 },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'plan', label: 'Plan & Billing', icon: CreditCard },
]

function SavedPill({ show }) {
  if (!show) return null
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-sage-600 animate-fade-in">
      <Check size={13} /> Saved
    </span>
  )
}

function ProfileTab() {
  const { profile, setProfile } = useAppData()
  const [form, setForm] = useState(profile)
  const [saved, setSaved] = useState(false)

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const handleSave = (e) => {
    e.preventDefault()
    setProfile(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <form onSubmit={handleSave} className="space-y-5">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-sage-200 flex items-center justify-center flex-shrink-0">
          <span className="text-xl font-semibold text-sage-800">{form.avatarInitials}</span>
        </div>
        <div>
          <p className="text-sm font-medium text-charcoal-700">Profile photo</p>
          <p className="text-xs text-charcoal-400 mb-2">Shown on proposals and the client portal.</p>
          <div className="flex gap-2">
            <button type="button" className="btn btn-outline btn-sm">Upload photo</button>
            <button type="button" className="btn btn-ghost btn-sm">Remove</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Full name" value={form.name} onChange={update('name')} />
        <Input label="Studio / business name" value={form.studio} onChange={update('studio')} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Email" type="email" value={form.email} onChange={update('email')} />
        <Input label="Phone" value={form.phone} onChange={update('phone')} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Website" value={form.website} onChange={update('website')} />
        <Select label="Timezone" value={form.timezone} onChange={update('timezone')}>
          {['Pacific Time (US & Canada)', 'Mountain Time (US & Canada)', 'Central Time (US & Canada)', 'Eastern Time (US & Canada)', 'UTC', 'London', 'Karachi'].map((tz) => (
            <option key={tz} value={tz}>{tz}</option>
          ))}
        </Select>
      </div>

      <Textarea label="Business address" rows={2} value={form.address} onChange={update('address')} />

      <div className="flex items-center justify-end gap-3 pt-2">
        <SavedPill show={saved} />
        <button type="submit" className="btn btn-primary">Save profile</button>
      </div>
    </form>
  )
}

function BusinessTab() {
  const { business, setBusiness } = useAppData()
  const [form, setForm] = useState(business)
  const [saved, setSaved] = useState(false)

  const update = (key) => (e) => {
    const val = e.target.type === 'number' ? Number(e.target.value) : e.target.value
    setForm({ ...form, [key]: val })
  }

  const totalSplit = Number(form.depositSplit) + Number(form.milestoneSplit) + Number(form.finalSplit)

  const handleSave = (e) => {
    e.preventDefault()
    setBusiness(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <form onSubmit={handleSave} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Legal business name" value={form.legalName} onChange={update('legalName')} />
        <Input label="Tax ID / EIN" value={form.taxId} onChange={update('taxId')} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Select label="Default payment terms" value={form.defaultPaymentTerms} onChange={update('defaultPaymentTerms')}>
          {['Due on receipt', 'Net 7', 'Net 14', 'Net 30'].map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </Select>
        <Select label="Currency" value={form.currency} onChange={update('currency')}>
          {['USD', 'EUR', 'GBP', 'CAD', 'AUD'].map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </Select>
        <Input label="Late fee (%)" type="number" step="0.1" value={form.lateFeePercent} onChange={update('lateFeePercent')} />
      </div>

      <Input label="Invoice number prefix" value={form.invoicePrefix} onChange={update('invoicePrefix')} />

      <div>
        <p className="field-label mb-2">Default payment split</p>
        <div className="grid grid-cols-3 gap-4">
          <Input label="Deposit %" type="number" value={form.depositSplit} onChange={update('depositSplit')} />
          <Input label="Milestone %" type="number" value={form.milestoneSplit} onChange={update('milestoneSplit')} />
          <Input label="Final %" type="number" value={form.finalSplit} onChange={update('finalSplit')} />
        </div>
        <p className={`text-xs mt-2 ${totalSplit === 100 ? 'text-sage-600' : 'text-red-500'}`}>
          Total: {totalSplit}% {totalSplit !== 100 && '(should equal 100%)'}
        </p>
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <SavedPill show={saved} />
        <button type="submit" className="btn btn-primary">Save business settings</button>
      </div>
    </form>
  )
}

function NotificationsTab() {
  const { notificationPrefs, setNotificationPrefs } = useAppData()
  const [form, setForm] = useState(notificationPrefs)
  const [saved, setSaved] = useState(false)

  const toggle = (key) => setForm({ ...form, [key]: !form[key] })

  const handleSave = () => {
    setNotificationPrefs(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const rows = [
    { key: 'proposalViewed', label: 'Proposal viewed', desc: 'A client opens a proposal you sent.' },
    { key: 'proposalSigned', label: 'Proposal signed', desc: 'A client accepts and signs a proposal.' },
    { key: 'scopeAlerts', label: 'Scope creep alerts', desc: 'New requests or design changes are flagged in chat logs.' },
    { key: 'invoicePaid', label: 'Invoice paid', desc: 'A client pays an invoice.' },
    { key: 'invoiceOverdue', label: 'Invoice overdue', desc: 'An invoice passes its due date unpaid.' },
    { key: 'weeklyDigest', label: 'Weekly digest', desc: 'A Monday summary of proposals, invoices, and activity.' },
    { key: 'marketingEmails', label: 'Product updates & tips', desc: 'Occasional emails about new PropFlow features.' },
  ]

  return (
    <div className="space-y-5">
      <div className="divide-y divide-cream-200">
        {rows.map((row) => (
          <div key={row.key} className="flex items-center justify-between gap-4 py-3.5 first:pt-0">
            <div>
              <p className="text-sm font-medium text-charcoal-700">{row.label}</p>
              <p className="text-xs text-charcoal-400 mt-0.5">{row.desc}</p>
            </div>
            <button
              type="button"
              onClick={() => toggle(row.key)}
              aria-pressed={form[row.key]}
              className={`relative flex-shrink-0 w-10 h-6 rounded-full transition-colors ${
                form[row.key] ? 'bg-sage-500' : 'bg-cream-300'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                  form[row.key] ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <SavedPill show={saved} />
        <button type="button" onClick={handleSave} className="btn btn-primary">Save preferences</button>
      </div>
    </div>
  )
}

function PlanTab() {
  const { plan } = useAppData()

  const plans = [
    { name: 'Solo', price: 29, features: ['10 proposals / month', 'Scope creep alerts', 'Client portal', 'PDF export'] },
    { name: 'Studio', price: 79, features: ['Unlimited proposals', 'Everything in Solo', 'Team collaboration', 'White-label portal', 'Priority support'] },
    { name: 'Agency', price: 199, features: ['Everything in Studio', 'Custom domain', 'API access', 'Dedicated success manager'] },
  ]

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-sage-50 border border-sage-200 p-4 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-sage-600 flex items-center justify-center flex-shrink-0">
            <Sparkles size={16} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-sage-800">You're on the {plan.name} plan</p>
            <p className="text-xs text-sage-600">${plan.price}/mo · renews {new Date(plan.renews).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>
        </div>
        <button className="btn btn-outline btn-sm">Manage billing</button>
      </div>

      <div>
        <p className="text-sm font-semibold text-charcoal-700 mb-3">Available plans</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`rounded-xl border p-4 ${
                p.name === plan.name ? 'border-sage-400 bg-sage-50' : 'border-cream-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-charcoal-800">{p.name}</p>
                {p.name === plan.name && <Badge>Current</Badge>}
              </div>
              <p className="text-2xl font-display text-charcoal-800 mb-3">${p.price}<span className="text-sm text-charcoal-400 font-sans">/mo</span></p>
              <ul className="space-y-1.5 mb-4">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-charcoal-600">
                    <Check size={12} className="text-sage-500 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                disabled={p.name === plan.name}
                className={`w-full py-2 rounded-lg text-xs font-semibold transition-all ${
                  p.name === plan.name
                    ? 'bg-cream-200 text-charcoal-400 cursor-not-allowed'
                    : 'bg-charcoal-800 text-white hover:bg-charcoal-700'
                }`}
              >
                {p.name === plan.name ? 'Current plan' : 'Switch plan'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-charcoal-700 mb-3">Payment method</p>
        <div className="flex items-center justify-between rounded-xl border border-cream-300 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-7 rounded bg-charcoal-800 flex items-center justify-center text-white text-[9px] font-bold">VISA</div>
            <div>
              <p className="text-sm text-charcoal-700">•••• •••• •••• 4242</p>
              <p className="text-xs text-charcoal-400">Expires 08/2027</p>
            </div>
          </div>
          <button className="text-xs text-sage-600 font-medium hover:text-sage-800">Update</button>
        </div>
      </div>
    </div>
  )
}

// Small local Badge to avoid importing the shared one with mismatched variant prop
function Badge({ children }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sage-600 text-white">
      {children}
    </span>
  )
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <div className="max-w-4xl mx-auto animate-fade-in space-y-6">
      <div>
        <h1 className="font-display text-xl sm:text-2xl text-charcoal-800 mb-1">Settings</h1>
        <p className="text-sm text-charcoal-400">Manage your profile, business details, and preferences.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Tabs */}
        <div className="lg:w-56 flex-shrink-0">
          <div className="flex lg:flex-col gap-1 bg-cream-100 lg:bg-transparent p-1 lg:p-0 rounded-xl overflow-x-auto">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 lg:w-full ${
                  activeTab === id
                    ? 'bg-white shadow-sm text-charcoal-800 lg:bg-sage-50 lg:text-sage-800'
                    : 'text-charcoal-500 hover:text-charcoal-800 hover:bg-white/60'
                }`}
              >
                <Icon size={15} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Panel */}
        <Card className="flex-1 min-w-0">
          {activeTab === 'profile' && <ProfileTab />}
          {activeTab === 'business' && <BusinessTab />}
          {activeTab === 'notifications' && <NotificationsTab />}
          {activeTab === 'plan' && <PlanTab />}
        </Card>
      </div>
    </div>
  )
}
