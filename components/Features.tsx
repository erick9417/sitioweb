"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Shield, Heart, Sparkles } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Tecnología Avanzada",
    description: "Materiales de última generación que se adaptan perfectamente a tu pisada.",
    color: "from-yellow-400 to-orange-500",
  },
  {
    icon: Shield,
    title: "Máxima Durabilidad",
    description: "Diseñadas para resistir el uso intensivo manteniendo sus propiedades.",
    color: "from-blue-400 to-cyan-500",
  },
  {
    icon: Heart,
    title: "Confort Premium",
    description: "Experiencia de uso superior que cuida tu salud postural cada día.",
    color: "from-pink-400 to-rose-500",
  },
  {
    icon: Sparkles,
    title: "Diseño Personalizado",
    description: "Adaptamos cada plantilla a tus necesidades específicas y anatomía única.",
    color: "from-purple-400 to-indigo-500",
  },
];

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="caracteristicas" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-slate-950" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
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
              Por que elegirnos?
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-slate-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Calidad premium respaldada por innovacion y experiencia
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <motion.div
                  className="h-full bg-white rounded-3xl p-8 shadow-xl border border-slate-100 relative overflow-hidden"
                  whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Gradient Background on Hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  />

                  {/* Icon */}
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 relative z-10`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 relative z-10">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed relative z-10">
                    {feature.description}
                  </p>

                  {/* Decorative Element */}
                  <motion.div
                    className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
