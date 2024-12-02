import { Bell } from 'lucide-react'
import { ModeToggle } from './mode-toggle'

export function Header() {
  return (
    <header className="bg-background shadow-md">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold leading-tight text-foreground">
            Global Model
          </h2>
          <div className="flex items-center space-x-4">
            <ModeToggle />
            <button className="p-1 rounded-full text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" />
            </button>
            <div className="relative">
              <button className="flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary" id="user-menu" aria-haspopup="true">
                <span className="sr-only">Open user menu</span>
                <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

