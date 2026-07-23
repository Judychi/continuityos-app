import { Navigate, Route, Routes } from 'react-router-dom'
import { CaseProvider } from './context/CaseContext'
import { AppLayout } from './layout/AppLayout'
import { Incidents } from './pages/Incidents'
import { CaseDetail } from './pages/CaseDetail'
import { StatusHub } from './pages/StatusHub'
import { Account } from './pages/Account'
import { Contact } from './pages/Contact'
import { SelfService } from './pages/SelfService'

function App() {
  return (
    <CaseProvider>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/incidents" replace />} />
          <Route path="/incidents" element={<Incidents />} />
          <Route path="/incidents/rn-4821" element={<CaseDetail />} />
          <Route path="/status" element={<StatusHub />} />
          <Route path="/account" element={<Account />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/self-service" element={<SelfService />} />
        </Route>
      </Routes>
    </CaseProvider>
  )
}

export default App
