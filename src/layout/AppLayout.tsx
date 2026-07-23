import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { PageSkeleton } from '../components/PageSkeleton'

const SKELETON_DURATION_MS = 400

export function AppLayout() {
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    const timeout = setTimeout(() => setIsLoading(false), SKELETON_DURATION_MS)
    return () => clearTimeout(timeout)
  }, [location.pathname])

  return (
    <div className="flex min-h-screen bg-ice items-stretch">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <main className="flex-1 px-8 py-8">
          {isLoading ? (
            <PageSkeleton pathname={location.pathname} />
          ) : (
            <div key={location.pathname} className="animate-[fade-in_260ms_ease-out]">
              <Outlet />
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
