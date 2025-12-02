"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "María González",
    role: "Atleta Profesional",
    image: "bg-gradient-to-br from-pink-400 to-rose-500",
    content: "Desde que uso estas plantillas, mi rendimiento mejoró notablemente. El soporte es excepcional y el confort incomparable.",
    rating: 5,
  },
  {
    name: "Carlos Ramírez",
    role: "Ejecutivo",
    image: "bg-gradient-to-br from-blue-400 to-cyan-500",
    content: "Paso muchas horas de pie en reuniones. Estas plantillas transformaron mi día a día, eliminando el dolor de espalda completamente.",
    rating: 5,
  },
  {
    name: "Ana Martínez",
    role: "Enfermera",
    image: "bg-gradient-to-br from-purple-400 to-pink-500",
    content: "Trabajo en turnos largos y estas plantillas son un salvavidas. La calidad es premium y se nota desde el primer uso.",
    rating: 5,
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="testimonios" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-950 relative overflow-hidden" ref={ref}>
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-blue-900/10 opacity-50" />
      
      <div className="max-w-7xl mx-auto relative z-10">
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
              Lo que dicen nuestros clientes
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-slate-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Miles de personas confían en nosotros cada día
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="group"
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              style={{ perspective: 1000 }}
            >
              <motion.div
                className="h-full bg-white rounded-3xl p-8 shadow-xl border border-slate-100 relative overflow-hidden"
                whileHover={{ 
                  y: -10,
                  rotateY: 5,
                  boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.3)" 
                }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                {/* Quote Icon */}
                <motion.div
                  className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Quote className="w-12 h-12 text-purple-400" />
                </motion.div>

                {/* Rating */}
                <div className="flex gap-1 mb-6 relative z-10">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: index * 0.2 + i * 0.1 }}
                    >
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                </div>

                {/* Content */}
                <motion.p
                  className="text-slate-700 text-lg leading-relaxed mb-8 relative z-10"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: index * 0.2 + 0.3 }}
                >
                  "{testimonial.content}"
                </motion.p>

                {/* Author */}
                <div className="flex items-center gap-4 relative z-10">
                  <motion.div
                    className={`w-16 h-16 rounded-full ${testimonial.image} flex items-center justify-center text-white font-bold text-xl`}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {testimonial.name.charAt(0)}
                  </motion.div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-slate-600">{testimonial.role}</p>
                  </div>
                </div>

                {/* Gradient Overlay on Hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators (certificate removed) */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="flex flex-wrap justify-center items-center gap-8 text-slate-500">
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.1 }}
            >
              <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              <span className="text-lg font-semibold">4.9/5 de 2,000+ reseñas</span>
            </motion.div>
            <div className="w-px h-8 bg-slate-300" />
            <motion.span
              className="text-lg font-semibold"
              whileHover={{ scale: 1.1 }}
            >
              Garantía de Satisfacción
            </motion.span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
