import React from "react";
import { Link, useLocation } from "wouter";
import { cn, NAV_LINKS } from "@/lib/data";
import { Menu, X, Search, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [location] = useLocation();

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground flex flex-col">
      {/* Top Bar - Optional for "University" affiliation feel */}
      <div className="bg-primary text-primary-foreground py-2 px-6 text-xs font-medium tracking-wider uppercase hidden md:block">
        Department of Physics & Engineering • University of Innovation
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center gap-2 font-serif font-bold text-xl md:text-2xl tracking-tight text-primary hover:opacity-80 transition-opacity">
              <GraduationCap className="h-8 w-8 text-accent" />
              <span>Quantum Research Group</span>
            </a>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-accent",
                    location === link.href
                      ? "text-accent font-semibold"
                      : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </a>
              </Link>
            ))}
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-accent">
              <Search className="h-5 w-5" />
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-primary"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t bg-background p-4 shadow-lg absolute w-full z-50">
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href}>
                  <a
                    className={cn(
                      "text-base font-medium py-2 transition-colors hover:text-accent border-b border-border/50",
                      location === link.href ? "text-accent" : "text-foreground"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">{children}</main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground mt-auto">
        <div className="container mx-auto px-4 py-12 md:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-serif text-xl font-bold mb-4 flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-accent" />
              Quantum Research Group
            </h3>
            <p className="text-primary-foreground/80 max-w-sm leading-relaxed">
              Advancing the frontiers of science and technology through interdisciplinary research in quantum materials, sustainable energy, and bio-computation.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-accent">Quick Links</h4>
            <ul className="space-y-2">
              {NAV_LINKS.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <a className="text-primary-foreground/80 hover:text-white transition-colors">
                      {link.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-accent">Contact</h4>
            <address className="not-italic text-primary-foreground/80 space-y-2">
              <p>Science Building, Room 402</p>
              <p>123 University Ave</p>
              <p>Cambridge, MA 02139</p>
              <p className="mt-4">
                <a href="mailto:contact@quantum-group.edu" className="hover:text-white">
                  contact@quantum-group.edu
                </a>
              </p>
            </address>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 py-6 text-center text-sm text-primary-foreground/60">
          © {new Date().getFullYear()} Quantum Research Group. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
