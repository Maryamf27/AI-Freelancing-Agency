import { createContext, useContext, useMemo, useState, useCallback } from 'react'
import { invoices as initialInvoices, proposals as initialProposals } from '../data/mockData'

const AppDataContext = createContext(null)

let invoiceCounter = initialInvoices.length + 41 // continue INV-2024-04x numbering

function nextInvoiceId() {
  invoiceCounter += 1
  return `INV-2024-0${invoiceCounter}`
}

const todayISO = () => new Date().toISOString().slice(0, 10)

export function AppDataProvider({ children }) {
  const [invoices, setInvoices] = useState(initialInvoices)
  const [proposals] = useState(initialProposals)
  const [profile, setProfile] = useState({
    name: 'James Keller',
    studio: 'James Keller Studio',
    email: 'james@jamesellerstudio.com',
    phone: '+1 (555) 019-2231',
    website: 'jamesellerstudio.com',
    address: '128 Harbor Lane, Suite 4, Portland, OR',
    avatarInitials: 'JK',
    timezone: 'Pacific Time (US & Canada)',
  })
  const [business, setBusiness] = useState({
    legalName: 'James Keller Studio LLC',
    taxId: '82-1093345',
    defaultPaymentTerms: 'Net 14',
    currency: 'USD',
    invoicePrefix: 'INV-2024-0',
    lateFeePercent: 1.5,
    depositSplit: 40,
    milestoneSplit: 40,
    finalSplit: 20,
  })
  const [notificationPrefs, setNotificationPrefs] = useState({
    proposalViewed: true,
    proposalSigned: true,
    scopeAlerts: true,
    invoicePaid: true,
    invoiceOverdue: true,
    weeklyDigest: false,
    marketingEmails: false,
  })
  const [plan, setPlan] = useState({
    name: 'Studio',
    price: 79,
    renews: '2024-09-01',
    seats: 1,
  })

  const addInvoice = useCallback((partial) => {
    const invoice = {
      id: nextInvoiceId(),
      status: 'unpaid',
      issued: todayISO(),
      paid: null,
      ...partial,
    }
    setInvoices((prev) => [invoice, ...prev])
    return invoice
  }, [])

  const markInvoicePaid = useCallback((id) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === id ? { ...inv, status: 'paid', paid: todayISO() } : inv
      )
    )
  }, [])

  const getInvoice = useCallback(
    (id) => invoices.find((inv) => inv.id === id),
    [invoices]
  )

  const value = useMemo(
    () => ({
      invoices,
      proposals,
      profile,
      setProfile,
      business,
      setBusiness,
      notificationPrefs,
      setNotificationPrefs,
      plan,
      setPlan,
      addInvoice,
      markInvoicePaid,
      getInvoice,
    }),
    [invoices, proposals, profile, business, notificationPrefs, plan, addInvoice, markInvoicePaid, getInvoice]
  )

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
}

export function useAppData() {
  const ctx = useContext(AppDataContext)
  if (!ctx) throw new Error('useAppData must be used within AppDataProvider')
  return ctx
}
