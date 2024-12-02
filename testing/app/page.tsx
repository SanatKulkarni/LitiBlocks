import { Header } from '@/components/header'
import { Dashboard } from '@/components/dashboard'

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
        <Dashboard />
      </main>
    </div>
  )
}

