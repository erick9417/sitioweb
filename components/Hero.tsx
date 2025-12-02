"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

type Plantilla = {
  nombre: string;
  tipo: string;
  descripcion: string;
  imagen: string;
  contexto: string;
  gradiente: string;
};

const plantillas: Plantilla[] = [
  {
    nombre: "Sport",
    tipo: "Alto Rendimiento",
    descripcion:
      "Diseñado para deportistas que buscan máximo soporte y absorción de impacto en actividades de alta intensidad.",
    imagen: "/plantillas/Sport.png",
    contexto: "Ideal para corredores, atletas y deportistas activos",
    gradiente: "from-orange-500 via-red-500 to-pink-500",
  },
  {
    nombre: "Pronación",
    tipo: "Corrección Postural",
    descripcion:
      "Especializadas en corregir la pronación del pie, mejorando tu postura y eliminando dolores articulares.",
    imagen: "/plantillas/Pronacion.png",
    contexto: "Para quienes necesitan corrección de pisada",
    gradiente: "from-blue-500 via-cyan-500 to-teal-500",
  },
  {
    nombre: "Soporte",
    tipo: "Confort Premium",
    descripcion:
      "Máximo confort para uso diario prolongado. Perfectas para largas jornadas laborales y caminatas extensas.",
    imagen: "/plantillas/Soporte.png",
    contexto: "Confort superior para el día a día",
    gradiente: "from-purple-500 via-indigo-500 to-blue-500",
  },
  {
    nombre: "Fascitis",
    tipo: "Tratamiento Especializado",
    descripcion:
      "Diseño ortopédico específico para tratar y prevenir la fascitis plantar y dolores en el talón.",
    imagen: "/plantillas/Fascitis.png",
    contexto: "Solución para dolor de talón y fascitis",
    gradiente: "from-emerald-500 via-green-500 to-teal-500",
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % plantillas.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [key]);

  const slideVariants = {
    enter: { opacity: 0, scale: 0.98 },
    center: { zIndex: 1, opacity: 1, scale: 1 },
    exit: { zIndex: 0, opacity: 0, scale: 0.98 },
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (newDirection === 1 ? (prev + 1) % plantillas.length : prev === 0 ? plantillas.length - 1 : prev - 1));
    setKey((prev) => prev + 1);
  };

  const currentPlantilla = plantillas[currentIndex];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 scroll-mt-20">
      {/* Gradient Overlay */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${currentPlantilla.gradiente} opacity-10`}
        key={`bg-${currentIndex}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 0.8 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-16 items-center py-20">
          {/* Text Content */}
          <motion.div className="text-left relative min-h-[500px]" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <AnimatePresence initial={false}>
              <motion.div key={currentIndex} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4, ease: "easeInOut" }} className="space-y-6 absolute top-0 left-0 right-0" style={{ willChange: 'auto' }}>
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-slate-800/80 backdrop-blur-md px-4 py-2 rounded-full border border-purple-500/30 shadow-lg shadow-purple-900/30">
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600"></div>
                  <span className="text-xs font-semibold text-purple-300">{currentPlantilla.tipo}</span>
                </div>

                {/* Title */}
                <h1 className="font-bold leading-tight">
                  <span className="block text-white text-2xl sm:text-3xl lg:text-4xl mb-2">Plantillas</span>
                  <span className={`block text-5xl sm:text-7xl lg:text-8xl bg-gradient-to-r ${currentPlantilla.gradiente} bg-clip-text text-transparent`}>{currentPlantilla.nombre}</span>
                </h1>

                {/* Description */}
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">{currentPlantilla.descripcion}</p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <motion.button className={`group px-6 py-3 bg-gradient-to-r ${currentPlantilla.gradiente} text-white rounded-full font-semibold text-base shadow-2xl shadow-purple-900/50 flex items-center justify-center gap-2 hover:shadow-purple-600/50 transition-all`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Calendar className="w-4 h-4 group-hover:rotate-12 transition-transform" /> Agendar Consulta
                  </motion.button>
                  <motion.button className="px-6 py-3 bg-slate-800/80 backdrop-blur-sm text-white rounded-full font-semibold text-base shadow-xl border border-slate-700 hover:bg-slate-700 transition-all flex items-center justify-center gap-2" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <MapPin className="w-4 h-4" /> Visitar Consultorio
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Image Content */}
          <div className="relative h-[450px] lg:h-[550px] flex items-center justify-center">
            <AnimatePresence initial={false}>
              <motion.div key={`image-${currentIndex}`} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4, ease: "easeInOut" }} className="absolute inset-0 flex items-center justify-center">
                <motion.div className="relative w-full h-full flex items-center justify-center" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${currentPlantilla.gradiente} opacity-20 blur-3xl rounded-full`}></div>
                  
                  {/* Image */}
                  <div className="relative w-[480px] h-[480px] lg:w-[600px] lg:h-[600px] z-10">
                    <Image 
                      src={currentPlantilla.imagen} 
                      alt={`Plantilla ${currentPlantilla.nombre}`} 
                      fill 
                      className="object-contain drop-shadow-2xl" 
                      priority 
                      unoptimized
                    />
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <motion.button className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-slate-800/90 backdrop-blur-md rounded-full shadow-xl border border-slate-700/50 flex items-center justify-center z-20 hover:bg-slate-700 transition-colors" onClick={() => paginate(-1)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <ChevronLeft className="w-6 h-6 text-white" />
            </motion.button>
            <motion.button className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-slate-800/90 backdrop-blur-md rounded-full shadow-xl border border-slate-700/50 flex items-center justify-center z-20 hover:bg-slate-700 transition-colors" onClick={() => paginate(1)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <ChevronRight className="w-6 h-6 text-white" />
            </motion.button>
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {plantillas.map((_, index) => (
            <motion.button key={index} className={`h-2 rounded-full transition-all ${index === currentIndex ? "w-10 bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-600/50" : "w-2 bg-slate-600 hover:bg-slate-500"}`} onClick={() => { setDirection(index > currentIndex ? 1 : -1); setCurrentIndex(index); }} whileHover={{ scale: 1.2 }} />
          ))}
        </div>
      </div>
    </section>
  );
}
