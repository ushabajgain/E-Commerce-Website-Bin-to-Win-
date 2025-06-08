"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, Recycle, LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/mode-toggle";
import { NavbarActions } from "@/components/navbar-actions";

export function Navbar() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <div className="px-7">
              <Link
                href="/"
                className="flex items-center gap-3 font-bold text-2xl"
              >
                <Recycle className="h-8 w-8 text-primary" />
                <span>Bin to Win</span>
              </Link>
            </div>
            <div className="mt-8 px-7">
              <nav className="flex flex-col gap-6">
                <Link href="/" className="text-lg font-medium">
                  Home
                </Link>
                <Link href="/categories" className="text-lg font-medium">
                  Categories
                </Link>
                <Link href="/deals" className="text-lg font-medium">
                  Today's Deals
                </Link>
                <Link href="/about" className="text-lg font-medium">
                  About Us
                </Link>
                <Link href="/contact" className="text-lg font-medium">
                  Contact
                </Link>
              </nav>
            </div>
            <div className="mt-auto px-7 pb-8">
              <div className="flex flex-col gap-4">
                <Button asChild>
                  <Link href="/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/register">Register</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <Link href="/" className="flex items-center gap-3 mr-6">
          <Recycle className="h-8 w-8 text-primary" />
          <span className="font-bold text-2xl hidden md:inline-block">
            Bin to Win
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium flex-1">
          <Link
            href="/"
            className={`transition-colors hover:text-primary ${
              pathname === "/" ? "text-primary" : ""
            }`}
          >
            Home
          </Link>
          <Link
            href="/categories"
            className={`transition-colors hover:text-primary ${
              pathname === "/categories" ? "text-primary" : ""
            }`}
          >
            Categories
          </Link>
          <Link
            href="/deals"
            className={`transition-colors hover:text-primary ${
              pathname === "/deals" ? "text-primary" : ""
            }`}
          >
            Today's Deals
          </Link>
          <Link
            href="/about"
            className={`transition-colors hover:text-primary ${
              pathname === "/about" ? "text-primary" : ""
            }`}
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className={`transition-colors hover:text-primary ${
              pathname === "/contact" ? "text-primary" : ""
            }`}
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          {isSearchOpen ? (
            <div className="flex items-center">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-[200px] md:w-[300px]"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close search</span>
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}
          <NavbarActions />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
