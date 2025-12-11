"use client";

import { Zap, Shield, Heart, Sparkles } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Tecnología Avanzada",
    description: "Materiales de última generación que se adaptan perfectamente a tu pisada.",
    color: "from-[#F5C400] to-[#FFD933]",
  },
  {
    icon: Shield,
    title: "Máxima Durabilidad",
    description: "Diseñadas para resistir el uso intensivo manteniendo sus propiedades.",
    color: "from-[#0066A4] to-[#003C63]",
  },
  {
    icon: Heart,
    title: "Confort Premium",
    description: "Experiencia de uso superior que cuida tu salud postural cada día.",
    color: "from-[#4FA9E8] to-[#0066A4]",
  },
  {
    icon: Sparkles,
    title: "Diseño Personalizado",
    description: "Adaptamos cada plantilla a tus necesidades específicas y anatomía única.",
    color: "from-[#003C63] to-[#0066A4]",
  },
];

export default function Features() {
  return (
    <section id="caracteristicas" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[var(--color-light)]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]">
          <h2 className="text-5xl sm:text-6xl font-bold mb-6 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
            <span className="text-[var(--color-primary-dark)]">¿Por qué elegirnos?</span>
          </h2>
          <p className="text-xl text-[rgba(51,51,51,0.8)] max-w-2xl mx-auto opacity-0 animate-[fadeInUp_0.8s_ease-out_0.3s_forwards]">
            Calidad premium respaldada por innovación y experiencia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="relative group opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-full bg-white rounded-3xl p-8 shadow-xl border border-slate-100 relative overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-4 relative z-10">
                    {feature.title}
                  </h3>
                  <p className="text-[rgba(51,51,51,0.75)] leading-relaxed relative z-10">
                    {feature.description}
                  </p>

                  {/* Decorative Element */}
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-[#E6F1F8] to-[#FFF4C2] opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
