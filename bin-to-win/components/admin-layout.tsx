"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Settings,
  BarChart3,
  LogOut,
  Menu,
  Recycle,
  Bell,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { ModeToggle } from "@/components/mode-toggle"

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const routes = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Products",
      href: "/admin/products",
      icon: <ShoppingBag className="h-5 w-5" />,
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Analytics",
      href: "/admin/analytics",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <div className="flex min-h-screen bg-muted/40">
      {/* Sidebar for desktop */}
      <aside className="hidden lg:flex flex-col w-64 border-r bg-background">
        <div className="p-6">
          <Link href="/admin/dashboard" className="flex items-center gap-3 font-bold text-2xl">
            <Recycle className="h-8 w-8 text-primary" />
            <span>Bin to Win</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 py-2 space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                pathname === route.href ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
            >
              {route.icon}
              {route.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/logout">
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </Link>
          </Button>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <div className="p-6 border-b">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-3 font-bold text-2xl"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Recycle className="h-8 w-8 text-primary" />
              <span>Bin to Win</span>
            </Link>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  pathname === route.href ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                {route.icon}
                {route.name}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/logout" onClick={() => setIsSidebarOpen(false)}>
                <LogOut className="mr-2 h-5 w-5" />
                Logout
              </Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Button>
            <ModeToggle />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}

