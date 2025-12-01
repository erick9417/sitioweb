"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Star, ArrowRight } from "lucide-react";

const products = [
  {
    name: "Sport",
    description: "Alto rendimiento deportivo con absorción de impacto superior. Ideal para atletas y corredores.",
    benefit: "Mejora tu desempeño deportivo",
    image: "bg-gradient-to-br from-orange-500 to-pink-500",
    rating: 5,
  },
  {
    name: "Pronación",
    description: "Corrección especializada de la pisada para mejor postura y eliminación de dolores articulares.",
    benefit: "Corrige tu postura naturalmente",
    image: "bg-gradient-to-br from-blue-500 to-cyan-400",
    rating: 5,
  },
  {
    name: "Soporte",
    description: "Confort premium para uso diario prolongado. Perfectas para largas jornadas laborales.",
    benefit: "Confort durante todo el día",
    image: "bg-gradient-to-br from-purple-500 to-indigo-500",
    rating: 5,
  },
  {
    name: "Fascitis",
    description: "Tratamiento especializado para fascitis plantar y dolor de talón. Alivio inmediato.",
    benefit: "Elimina el dolor de talón",
    image: "bg-gradient-to-br from-emerald-500 to-teal-400",
    rating: 5,
  },
];

export default function Products() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="productos" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-b from-slate-950 to-slate-900" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-5xl sm:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Tipos de Plantillas
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-slate-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Soluciones personalizadas para cada necesidad ortopédica
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              style={{ perspective: 1000 }}
            >
              <motion.div
                className="relative bg-white rounded-3xl overflow-hidden shadow-2xl"
                whileHover={{ 
                  y: -20, 
                  rotateY: 5,
                  boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.3)" 
                }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                {/* Image Area */}
                <div className="relative h-80 overflow-hidden">
                  <motion.div
                    className={`absolute inset-0 ${product.image}`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Animated Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Floating Badge */}
                    <motion.div
                      className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
                      initial={{ x: 100, opacity: 0 }}
                      animate={isInView ? { x: 0, opacity: 1 } : {}}
                      transition={{ delay: index * 0.2 + 0.5 }}
                    >
                      <div className="flex items-center gap-1">
                        {[...Array(product.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </motion.div>

                    {/* Product Info Overlay */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 p-6 text-white"
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.button
                        className="w-full bg-white text-slate-900 py-3 rounded-full font-semibold flex items-center justify-center gap-2 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:text-white transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Ver Detalles
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    Plantillas {product.name}
                  </h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    <motion.div
                      className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                      whileHover={{ scale: 1.05 }}
                    >
                      ✓ {product.benefit}
                    </motion.div>
                  </div>
                  <motion.button
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-lg transition-shadow"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Consultar Disponibilidad
                  </motion.button>
                </div>

                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.button
            className="px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold text-lg shadow-2xl flex items-center gap-2 mx-auto"
            whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(147, 51, 234, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            Agendar Evaluación Gratuita
          </motion.button>
        </motion.div>
      </div>

      {/* Background Decoration */}
      <motion.div
        className="absolute top-20 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        style={{ y }}
      />
    </section>
  );
}
