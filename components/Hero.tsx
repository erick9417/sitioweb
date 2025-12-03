"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

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
    imagen: "/plantillas/Sport.webp",
    contexto: "Ideal para corredores, atletas y deportistas activos",
    gradiente: "from-orange-500 via-red-500 to-pink-500",
  },
  {
    nombre: "Pronación",
    tipo: "Corrección Postural",
    descripcion:
      "Especializadas en corregir la pronación del pie, mejorando tu postura y eliminando dolores articulares.",
    imagen: "/plantillas/Pronacion.webp",
    contexto: "Para quienes necesitan corrección de pisada",
    gradiente: "from-blue-500 via-cyan-500 to-teal-500",
  },
  {
    nombre: "Soporte",
    tipo: "Confort Premium",
    descripcion:
      "Máximo confort para uso diario prolongado. Perfectas para largas jornadas laborales y caminatas extensas.",
    imagen: "/plantillas/Soporte.webp",
    contexto: "Confort superior para el día a día",
    gradiente: "from-purple-500 via-indigo-500 to-blue-500",
  },
  {
    nombre: "Fascitis",
    tipo: "Tratamiento Especializado",
    descripcion:
      "Diseño ortopédico específico para tratar y prevenir la fascitis plantar y dolores en el talón.",
    imagen: "/plantillas/Fascitis.webp",
    contexto: "Solución para dolor de talón y fascitis",
    gradiente: "from-emerald-500 via-green-500 to-teal-500",
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [key, setKey] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload all images on mount
  useEffect(() => {
    const imagePromises = plantillas.map((plantilla) => {
      return new Promise((resolve, reject) => {
        const img = new window.Image();
        img.src = plantilla.imagen;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    Promise.all(imagePromises)
      .then(() => setImagesLoaded(true))
      .catch((err) => console.error("Error preloading images:", err));
  }, []);

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
    <section className="relative min-h-[85vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 scroll-mt-20 pt-16 lg:pt-0">
      {/* Gradient Overlay */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${currentPlantilla.gradiente} opacity-10`}
        key={`bg-${currentIndex}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 0.8 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full">
        {/* Mobile Layout */}
        <div className="lg:hidden flex flex-col gap-4 py-8">
          <div className="space-y-4">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-slate-800/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-purple-500/30 shadow-lg shadow-purple-900/30">
              <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600"></div>
              <span className="text-xs font-semibold text-purple-300">{currentPlantilla.tipo}</span>
            </div>

            {/* Title */}
            <h1 className="font-bold leading-tight">
              <span className="block text-white text-xl mb-1">Plantillas</span>
              <span className={`block text-5xl bg-gradient-to-r ${currentPlantilla.gradiente} bg-clip-text text-transparent`}>{currentPlantilla.nombre}</span>
            </h1>

            {/* Description */}
            <p className="text-sm text-slate-300 leading-relaxed">{currentPlantilla.descripcion}</p>

              {/* Image */}
              <div className="relative h-[280px] flex items-center justify-center">
                <div className={`absolute inset-0 bg-gradient-to-r ${currentPlantilla.gradiente} opacity-20 blur-3xl rounded-full`}></div>
                <div className="relative w-[260px] h-[260px] z-10">
                  <Image
                    src={plantillas[currentIndex].imagen}
                    alt={`Plantilla ${plantillas[currentIndex].nombre}`}
                    width={260}
                    height={260}
                    className="w-full h-full object-contain drop-shadow-2xl"
                    priority
                    unoptimized
                  />
                </div>
                {/* Navigation Arrows Mobile */}
                <button
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-slate-800/90 backdrop-blur-md rounded-full shadow-xl border border-slate-700/50 flex items-center justify-center z-20"
                  onClick={() => paginate(-1)}
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-slate-800/90 backdrop-blur-md rounded-full shadow-xl border border-slate-700/50 flex items-center justify-center z-20"
                  onClick={() => paginate(1)}
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>

            {/* CTA Buttons Mobile */}
            <div className="flex flex-col gap-3 max-w-sm ml-8">
                <motion.a
                  href="#contacto"
                  className={`px-6 py-3 bg-gradient-to-r ${currentPlantilla.gradiente} text-white rounded-full font-semibold text-sm shadow-2xl flex items-center justify-center gap-2`}
                  whileTap={{ scale: 0.95 }}
                >
                  <Calendar className="w-4 h-4" /> Agendar Consulta
                </motion.a>
                <motion.a
                  href="https://maps.app.goo.gl/96uE91jw1hAfGE948"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-slate-800/80 backdrop-blur-sm text-white rounded-full font-semibold text-sm shadow-xl border border-slate-700 flex items-center justify-center gap-2"
                  whileTap={{ scale: 0.95 }}
                >
                  <MapPin className="w-4 h-4" /> Visitar Consultorio
                </motion.a>
              </div>
            </div>

          {/* Dots Navigation Mobile */}
          <div className="flex gap-3 justify-center mt-4">
            {plantillas.map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all ${index === currentIndex ? "w-10 bg-gradient-to-r from-purple-600 to-pink-600" : "w-2 bg-slate-600"}`}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
              />
            ))}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid grid-cols-[0.9fr_1.1fr] gap-16 items-center py-20">
          {/* Text Content */}
          <motion.div className="text-left relative min-h-[500px]" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <AnimatePresence initial={false}>
              <motion.div key={currentIndex} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4, ease: "easeInOut" }} className="space-y-6 absolute top-0 left-0 right-0" style={{ willChange: 'auto' }}>
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-slate-800/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-purple-500/30 shadow-lg shadow-purple-900/30">
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600"></div>
                  <span className="text-xs font-semibold text-purple-300">{currentPlantilla.tipo}</span>
                </div>

                {/* Title */}
                <h1 className="font-bold leading-tight">
                  <span className="block text-white text-lg sm:text-2xl lg:text-4xl mb-1 lg:mb-2">Plantillas</span>
                  <span className={`block text-3xl sm:text-5xl lg:text-8xl bg-gradient-to-r ${currentPlantilla.gradiente} bg-clip-text text-transparent`}>{currentPlantilla.nombre}</span>
                </h1>

                {/* Description */}
                <p className="text-base text-slate-300 leading-relaxed max-w-xl">{currentPlantilla.descripcion}</p>

                {/* CTA Buttons Desktop */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <motion.a href="#contacto" className={`group px-6 py-3 bg-gradient-to-r ${currentPlantilla.gradiente} text-white rounded-full font-semibold text-base shadow-2xl shadow-purple-900/50 flex items-center justify-center gap-2 hover:shadow-purple-600/50 transition-all`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Calendar className="w-4 h-4 group-hover:rotate-12 transition-transform" /> Agendar Consulta
                  </motion.a>
                  <motion.a href="https://maps.app.goo.gl/96uE91jw1hAfGE948" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-slate-800/80 backdrop-blur-sm text-white rounded-full font-semibold text-base shadow-xl border border-slate-700 hover:bg-slate-700 transition-all flex items-center justify-center gap-2" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <MapPin className="w-4 h-4" /> Visitar Consultorio
                  </motion.a>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Image Content */}
          <div className="relative h-[300px] sm:h-[350px] lg:h-[550px] flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${currentPlantilla.gradiente} opacity-20 blur-3xl rounded-full transition-all duration-500`}></div>
                
                {/* Single Image element to avoid multiple requests */}
                <div className="relative w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] lg:w-[600px] lg:h-[600px] z-10">
                  <Image
                    src={plantillas[currentIndex].imagen}
                    alt={`Plantilla ${plantillas[currentIndex].nombre}`}
                    width={600}
                    height={600}
                    className="w-full h-full object-contain drop-shadow-2xl"
                    priority
                    unoptimized
                  />
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <motion.button className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-slate-800/90 backdrop-blur-md rounded-full shadow-xl border border-slate-700/50 flex items-center justify-center z-20 hover:bg-slate-700 transition-colors" onClick={() => paginate(-1)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <ChevronLeft className="w-6 h-6 text-white" />
            </motion.button>
            <motion.button className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-slate-800/90 backdrop-blur-md rounded-full shadow-xl border border-slate-700/50 flex items-center justify-center z-20 hover:bg-slate-700 transition-colors" onClick={() => paginate(1)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <ChevronRight className="w-6 h-6 text-white" />
            </motion.button>
          </div>

          {/* Dots Navigation Desktop */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {plantillas.map((_, index) => (
              <motion.button key={index} className={`h-2 rounded-full transition-all ${index === currentIndex ? "w-10 bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-600/50" : "w-2 bg-slate-600 hover:bg-slate-500"}`} onClick={() => { setDirection(index > currentIndex ? 1 : -1); setCurrentIndex(index); }} whileHover={{ scale: 1.2 }} />
            ))}
          </div>
        </div>
      </div>

      {/* Hidden preload images to force browser cache */}
      <div className="hidden">
        {plantillas.map((plantilla, index) => (
          <Image
            key={index}
            src={plantilla.imagen}
            alt={plantilla.nombre}
            width={600}
            height={600}
            priority
            unoptimized
          />
        ))}
      </div>
    </section>
  );
}
