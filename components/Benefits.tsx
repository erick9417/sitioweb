"use client";

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
  return (
    <section id="beneficios" className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-light)]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Benefits List */}
          <div className="opacity-0 animate-[fadeInLeft_0.8s_ease-out_forwards]">
            <h2 className="text-5xl sm:text-6xl font-bold mb-6 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
              <span className="text-[var(--color-primary-dark)]">Tu Salud es Nuestra Prioridad</span>
            </h2>
            <p className="text-xl text-[rgba(51,51,51,0.85)] mb-10 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.3s_forwards]">
              Atención integral y personalizada en nuestro consultorio
            </p>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 group opacity-0 animate-[fadeInLeft_0.6s_ease-out_forwards]"
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center group-hover:scale-125 group-hover:rotate-180 transition-transform duration-300">
                    <Check className="w-5 h-5 text-[var(--color-primary-dark)]" />
                  </div>
                  <p className="text-lg text-[var(--color-dark)] pt-1 group-hover:translate-x-1 transition-transform">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Stats Cards */}
          <div className="space-y-6 opacity-0 animate-[fadeInRight_0.8s_ease-out_forwards]">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="relative group opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
                  style={{ animationDelay: `${0.5 + index * 0.2}s` }}
                >
                  <div className="bg-white rounded-3xl p-8 shadow-xl border border-[rgba(0,60,99,0.08)] relative overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-300">
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                    <div className="flex items-center gap-6 relative z-10">
                      {/* Icon */}
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center flex-shrink-0 group-hover:rotate-180 transition-transform duration-500`}>
                        <Icon className="w-10 h-10 text-white" />
                      </div>

                      {/* Content */}
                      <div>
                        <div className="text-5xl font-bold text-[var(--color-primary-dark)] mb-2 opacity-0 animate-[scaleIn_0.5s_ease-out_forwards]" style={{ animationDelay: `${0.7 + index * 0.2}s` }}>
                          {stat.value}
                        </div>
                        <div className="text-[rgba(51,51,51,0.7)] font-medium text-lg">
                          {stat.label}
                        </div>
                      </div>
                    </div>

                    {/* Decorative Circle */}
                    <div className={`absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br ${stat.color} opacity-10 animate-spin-slow`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
