"use client";

import Image from "next/image";
import { Calendar, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Mobile: Logo and menu left, buttons right */}
        <div className="lg:hidden flex items-center h-14 py-2">
          {/* Logo y menú izquierda */}
          <div className="flex items-center gap-2">
            <div className="flex-shrink-0 hover:scale-[1.02] transition-transform duration-300">
              <div className="relative w-24 h-24">
                <Image
                  src="/plantillas-optimized/lucvan-logo-web.webp"
                  alt="Lucván Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-[var(--color-primary-dark)] hover:text-[var(--color-primary)] transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Spacer */}
          <div className="flex-1"></div>

          {/* Botones derecha */}
          <div className="flex items-center gap-2">
            <a
              href="/test/"
              className="btn-primary px-3 py-1.5 text-xs shadow-lg transition-all hover:scale-[1.02] active:scale-95"
            >
              Test
            </a>
            <a
              href="/#contacto"
              className="btn-primary flex items-center gap-1 px-3 py-1.5 text-xs shadow-lg transition-all hover:scale-[1.02] active:scale-95"
            >
              <Calendar className="w-3 h-3" />
              Agendar
            </a>
          </div>
        </div>

        {/* Desktop: Logo left, menu center, buttons right */}
        <div className="hidden lg:flex items-center justify-between h-20">
          <div
            className="flex items-center flex-shrink-0 hover:scale-[1.02] transition-transform duration-300"
          >
            <div className="relative w-24 h-20">
              <Image
                src="/plantillas-optimized/lucvan-logo-web.webp"
                alt="Lucván Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="flex items-center gap-8">
            <a href="/#quienes" className="text-[var(--color-primary-dark)] hover:text-[var(--color-primary)] transition-colors font-medium">
              Quiénes Somos
            </a>
            <a href="/#beneficios" className="text-[var(--color-primary-dark)] hover:text-[var(--color-primary)] transition-colors font-medium">
              Beneficios
            </a>
            <a href="/#testimonios" className="text-[var(--color-primary-dark)] hover:text-[var(--color-primary)] transition-colors font-medium">
              Testimonios
            </a>
            <a href="/#contacto" className="text-[var(--color-primary-dark)] hover:text-[var(--color-primary)] transition-colors font-medium">
              Contacto
            </a>
            <a href="/#lab" className="text-[var(--color-primary-dark)] hover:text-[var(--color-primary)] transition-colors font-medium">
              Lucván LAB
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/test/"
              aria-label="Test: ¿Es para mi?"
              className="btn-primary px-5 py-2.5 text-sm shadow-lg hover:shadow-xl hover:scale-[1.05] active:scale-95 transition-all"
            >
              Test: ¿Es para mi?
            </a>
            <a
              href="/#contacto"
              aria-label="Agendar Cita"
              className="btn-primary flex items-center gap-2 px-6 py-3 text-sm shadow-lg hover:shadow-xl hover:scale-[1.05] active:scale-95 transition-all"
            >
              <Calendar className="w-4 h-4" />
              Agendar Cita
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 overflow-hidden max-h-[70vh] overflow-y-auto animate-in slide-in-from-top duration-300">
              <a
                href="/#quienes"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-[var(--color-primary-dark)] hover:text-[var(--color-primary)] transition-colors font-medium"
              >
                Quiénes Somos
              </a>
              <a
                href="/#beneficios"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-[var(--color-primary-dark)] hover:text-[var(--color-primary)] transition-colors font-medium"
              >
                Beneficios
              </a>
              <a
                href="/#testimonios"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-[var(--color-primary-dark)] hover:text-[var(--color-primary)] transition-colors font-medium"
              >
                Testimonios
              </a>
              <a
                href="/#contacto"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-[var(--color-primary-dark)] hover:text-[var(--color-primary)] transition-colors font-medium"
              >
                Contacto
              </a>
              <a
                href="/#lab"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-[var(--color-primary-dark)] hover:text-[var(--color-primary)] transition-colors font-medium"
              >
                Lucván LAB
              </a>
        </div>
      )}
    </nav>
  );
}
