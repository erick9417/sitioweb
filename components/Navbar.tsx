"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar } from "lucide-react";

export default function Navbar() {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800/50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative w-16 h-16">
              <Image
                src="/plantillas/lucvan-logo-web.png"
                alt="Lucvan Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#productos" className="text-slate-300 hover:text-white transition-colors font-medium">
              Productos
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
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4">
            <motion.a
              href="#beneficios"
              aria-label="Test: ¿Es para mi?"
              className="hidden sm:block px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-white rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Test: ¿Es para mi?
            </motion.a>
            <motion.a
              href="#contacto"
              aria-label="Agendar Cita"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar className="w-4 h-4" />
              Agendar Cita
            </motion.a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
