import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import { AppDataProvider } from './context/AppDataContext'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import ProposalBuilder from './pages/ProposalBuilder'
import ProposalsList from './pages/ProposalsList'
import ProposalDetail from './pages/ProposalDetail'
import InvoicesList from './pages/InvoicesList'
import InvoiceDetail from './pages/InvoiceDetail'
import NewInvoice from './pages/NewInvoice'
import Settings from './pages/Settings'
import ClientPortal from './pages/ClientPortal'

export default function App() {
  return (
    <AppDataProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/client/:token" element={<ClientPortal />} />

          {/* App routes with sidebar layout */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/proposals" element={<ProposalsList />} />
            <Route path="/proposals/new" element={<ProposalBuilder />} />
            <Route path="/proposals/:id" element={<ProposalDetail />} />
            <Route path="/invoices" element={<InvoicesList />} />
            <Route path="/invoices/new" element={<NewInvoice />} />
            <Route path="/invoices/:id" element={<InvoiceDetail />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/app" element={<Navigate to="/dashboard" replace />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppDataProvider>
  )
}

