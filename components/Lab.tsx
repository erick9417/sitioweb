"use client";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function Lab() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="lab" ref={ref} className="py-16 sm:py-24 px-6 lg:px-10 bg-[var(--color-light)]">
      <div className="max-w-7xl mx-auto grid gap-10 lg:gap-16 lg:grid-cols-2 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative w-full h-[400px] sm:h-[500px] md:h-[640px] order-last lg:order-first"
        >
          {/* Background vignette */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden bg-gradient-to-br from-[#E6F1F8] via-[#D9E9F5] to-[#F4F6F8]" />

          {/* Radial spotlight behind image */}
          <div
            className="absolute inset-0 rounded-3xl opacity-40"
            style={{
              background:
                "radial-gradient(ellipse at 40% 55%, rgba(59,130,246,0.35), transparent 60%)",
            }}
          />

          {/* Color glow to separate from background */}
          <div className="absolute -top-10 left-6 w-[520px] h-[520px] md:w-[600px] md:h-[600px] bg-gradient-to-r from-[#0066A4]/30 via-[#4FA9E8]/22 to-[#F5C400]/18 blur-3xl rounded-full" />

          <motion.div
            className="relative w-full h-full flex items-center justify-center"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className="relative w-full max-w-[600px] h-[350px] sm:w-[700px] sm:h-[400px] md:w-[860px] md:h-[470px] lg:w-[940px] lg:h-[520px] z-10">
              <Image
                src="/plantillas/Lab.webp"
                alt="Lucván Lab"
                fill
                unoptimized
                className="object-contain drop-shadow-[0_32px_64px_rgba(0,0,0,0.65)] saturate-125 contrast-115 brightness-110"
                priority
              />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="space-y-6 sm:space-y-10"
        >
          <span className="inline-block text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-wide text-[var(--color-primary)]">LucvánLab</span>
          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight text-[var(--color-primary-dark)]">
            <span className="block">Central de Fabricación</span>
            <span className="block bg-gradient-to-r from-[#4FA9E8] via-[#0066A4] to-[#003C63] bg-clip-text text-transparent">a Medida</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-8 text-[rgba(51,51,51,0.8)] text-sm leading-relaxed">
            <p>
              Servicio profesional para la fabricación de órtesis plantares personalizadas. Puedes enviarnos espumas de impresión, estudios de marcha o escaneados 3D junto a nuestro protocolo de fabricación.
            </p>
            <p>
              Indica preferencias o necesidades de tus pacientes. También puedes solicitar soporte técnico. Plazo máximo estimado: 7 días laborales para recibir las ortesis en tu centro.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary px-8 py-4 text-base shadow-xl flex items-center gap-2 w-fit"
            >
              Solicitar Información
              <span className="text-lg">›</span>
            </motion.button>
            <motion.a
              href="https://sistema.lucvanlatam.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full border-2 border-[var(--color-primary)] text-[var(--color-primary-dark)] hover:bg-[var(--color-light)] font-semibold shadow-lg flex items-center gap-2 w-fit transition-colors"
            >
              Iniciar Sesión
              <span className="text-lg">›</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
