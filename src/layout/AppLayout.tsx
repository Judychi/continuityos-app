import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

export function AppLayout() {
  const location = useLocation()

  return (
    <div className="flex min-h-screen bg-ice items-stretch">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <main className="flex-1 px-8 py-8">
          <div key={location.pathname} className="animate-[fade-in_260ms_ease-out]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
