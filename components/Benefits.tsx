import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, TrendingUp, Users, Award } from "lucide-react";

const benefits = [
  "Evaluación biomecánica completa",
  "Diagnóstico personalizado por especialistas",
  "Ajustes y seguimiento incluidos",
  "Materiales hipoalergénicos certificados",
  "Atención inmediata con cita previa",
  "Asesoría integral para tu salud postural",
];

const stats = [
  {
    icon: TrendingUp,
    value: "95%",
    label: "Mejora en postura",
    color: "from-[#F5C400] to-[#FFD933]",
  },
  {
    icon: Users,
    value: "50K+",
    label: "Clientes activos",
    color: "from-[#0066A4] to-[#003C63]",
  },
  {
    icon: Award,
    value: "30+",
    label: "Años en el mercado",
    color: "from-[#4FA9E8] to-[#0066A4]",
  },
];

export default function Benefits() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="beneficios" className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-light)]" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Benefits List */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-5xl sm:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-[var(--color-primary-dark)]">Tu Salud es Nuestra Prioridad</span>
            </motion.h2>
            <motion.p
              className="text-xl text-[rgba(51,51,51,0.85)] mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Atención integral y personalizada en nuestro consultorio
            </motion.p>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4 group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  <motion.div
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Check className="w-5 h-5 text-[var(--color-primary-dark)]" />
                  </motion.div>
                  <motion.p
                    className="text-lg text-[var(--color-dark)] pt-1"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {benefit}
                  </motion.p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Stats Cards */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  className="relative group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.2 }}
                >
                  <motion.div
                    className="bg-white rounded-3xl p-8 shadow-xl border border-[rgba(0,60,99,0.08)] relative overflow-hidden"
                    whileHover={{ 
                      scale: 1.03,
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" 
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {/* Background Gradient */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                    />

                    <div className="flex items-center gap-6 relative z-10">
                      {/* Icon */}
                      <motion.div
                        className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center flex-shrink-0`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="w-10 h-10 text-white" />
                      </motion.div>

                      {/* Content */}
                      <div>
                        <motion.div
                          className="text-5xl font-bold text-[var(--color-primary-dark)] mb-2"
                          initial={{ scale: 0 }}
                          animate={isInView ? { scale: 1 } : {}}
                          transition={{ delay: 0.7 + index * 0.2, type: "spring" }}
                        >
                          {stat.value}
                        </motion.div>
                        <div className="text-[rgba(51,51,51,0.7)] font-medium text-lg">
                          {stat.label}
                        </div>
                      </div>
                    </div>

                    {/* Decorative Circle */}
                    <motion.div
                      className={`absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br ${stat.color} opacity-10`}
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
