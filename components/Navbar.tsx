"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Calendar, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800/50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Mobile: Logo and menu left, buttons right */}
        <div className="lg:hidden flex items-center h-14 py-2">
          {/* Logo y menú izquierda */}
          <div className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex-shrink-0"
            >
              <div className="relative w-24 h-24">
                <Image
                  src="/plantillas/lucvan-logo-web.webp"
                  alt="Lucván Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-slate-300 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Spacer */}
          <div className="flex-1"></div>

          {/* Botones derecha */}
          <div className="flex items-center gap-2">
            <motion.a
              href="/test"
              className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-white rounded-full font-semibold text-xs shadow-lg transition-all"
              whileTap={{ scale: 0.95 }}
            >
              Test
            </motion.a>
            <motion.a
              href="#contacto"
              className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold text-xs shadow-lg"
              whileTap={{ scale: 0.95 }}
            >
              <Calendar className="w-3 h-3" />
              Agendar
            </motion.a>
          </div>
        </div>

        {/* Desktop: Logo left, menu center, buttons right */}
        <div className="hidden lg:flex items-center justify-between h-20">
          <motion.div
            className="flex items-center flex-shrink-0"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative w-24 h-20">
              <Image
                src="/plantillas/lucvan-logo-web.webp"
                alt="Lucván Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>

          <div className="flex items-center gap-8">
            <a href="#quienes" className="text-slate-300 hover:text-white transition-colors font-medium">
              Quiénes Somos
            </a>
            <a href="#beneficios" className="text-slate-300 hover:text-white transition-colors font-medium">
              Beneficios
            </a>
            <a href="#testimonios" className="text-slate-300 hover:text-white transition-colors font-medium">
              Testimonios
            </a>
            <a href="#contacto" className="text-slate-300 hover:text-white transition-colors font-medium">
              Contacto
            </a>
            <a href="#lab" className="text-slate-300 hover:text-white transition-colors font-medium">
              Lucván LAB
            </a>
          </div>

          <div className="flex items-center gap-4">
            <motion.a
              href="/test"
              aria-label="Test: ¿Es para mi?"
              className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-white rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Test: ¿Es para mi?
            </motion.a>
            <motion.a
              href="#contacto"
              aria-label="Agendar Cita"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar className="w-4 h-4" />
              Agendar Cita
            </motion.a>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-slate-900 border-t border-slate-800/50 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2 max-h-[70vh] overflow-y-auto">
              <a
                href="#quienes"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-slate-300 hover:text-white transition-colors font-medium"
              >
                Quiénes Somos
              </a>
              <a
                href="#beneficios"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-slate-300 hover:text-white transition-colors font-medium"
              >
                Beneficios
              </a>
              <a
                href="#testimonios"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-slate-300 hover:text-white transition-colors font-medium"
              >
                Testimonios
              </a>
              <a
                href="#contacto"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-slate-300 hover:text-white transition-colors font-medium"
              >
                Contacto
              </a>
              <a
                href="#lab"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-slate-300 hover:text-white transition-colors font-medium"
              >
                Lucván LAB
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
