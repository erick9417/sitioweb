"use client";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function Lab() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="lab" ref={ref} className="py-24 px-6 lg:px-10 bg-slate-950">
      <div className="max-w-7xl mx-auto grid gap-16 lg:grid-cols-2 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative w-full h-[600px] md:h-[640px] order-last lg:order-first"
        >
          {/* Background vignette */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800" />

          {/* Radial spotlight behind image */}
          <div
            className="absolute inset-0 rounded-3xl opacity-40"
            style={{
              background:
                "radial-gradient(ellipse at 40% 55%, rgba(59,130,246,0.35), transparent 60%)",
            }}
          />

          {/* Color glow to separate from background */}
          <div className="absolute -top-10 left-6 w-[520px] h-[520px] md:w-[600px] md:h-[600px] bg-gradient-to-r from-blue-500/35 via-cyan-400/25 to-purple-500/25 blur-3xl rounded-full" />

          <motion.div
            className="relative w-full h-full flex items-center justify-center"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className="relative w-[760px] h-[420px] md:w-[860px] md:h-[470px] lg:w-[940px] lg:h-[520px] z-10">
              <Image
                src="/plantillas/Lab.png"
                alt="Lucvan Lab"
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
          className="space-y-8"
        >
          <span className="inline-block text-2xl sm:text-3xl font-extrabold tracking-wide bg-gradient-to-r from-cyan-300 to-blue-400 text-transparent bg-clip-text drop-shadow-[0_2px_8px_rgba(34,211,238,0.35)]">LucvanLab</span>
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
            <span className="block text-white">Central de Fabricacion</span>
            <span className="block bg-gradient-to-r from-purple-200 via-pink-200 to-cyan-200 bg-clip-text text-transparent">a Medida</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-8 text-slate-300 text-sm leading-relaxed">
            <p>
              Servicio profesional para la fabricacion de ortesis plantares personalizadas. Puedes enviarnos espumas de impresion, estudios de marcha o escaneados 3D junto a nuestro protocolo de fabricacion.
            </p>
            <p>
              Indica preferencias o necesidades de tus pacientes. Tambien puedes solicitar soporte tecnico. Plazo maximo estimado: 7 dias laborales para recibir las ortesis en tu centro.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-xl flex items-center gap-2 w-fit"
            >
              Solicitar Informacion
              <span className="text-lg">›</span>
            </motion.button>
            <motion.a
              href="https://sistema.lucvanlatam.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 font-semibold shadow-lg flex items-center gap-2 w-fit transition-colors"
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
