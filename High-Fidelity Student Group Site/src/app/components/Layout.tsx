import { Outlet, NavLink } from 'react-router';
import { Home, DollarSign, Calculator, Users } from 'lucide-react';

export function Layout() {
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/payroll', label: 'Payroll Dashboard', icon: DollarSign },
    { path: '/gpa-calculator', label: 'GPA Calculator', icon: Calculator },
    { path: '/member-profiles', label: 'Member Profiles', icon: Users },
  ];

  return (
    <div className="flex h-screen bg-muted">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
        {/* Logo/Header */}
        <div className="p-6 border-b border-sidebar-border">
          <h1 className="text-sidebar-foreground">Student Group Portal</h1>
          <p className="text-sidebar-foreground/60 text-sm mt-1">Group Mini-Site</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <p className="text-sidebar-foreground/60 text-xs">
            © 2026 Student Group
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
