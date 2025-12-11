"use client";

import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "María González",
    role: "Atleta Profesional",
    image: "bg-gradient-to-br from-[#F5C400] to-[#FFD933]",
    content: "Desde que uso estas plantillas, mi rendimiento mejoró notablemente. El soporte es excepcional y el confort incomparable.",
    rating: 5,
  },
  {
    name: "Carlos Ramírez",
    role: "Ejecutivo",
    image: "bg-gradient-to-br from-[#0066A4] to-[#003C63]",
    content: "Paso muchas horas de pie en reuniones. Estas plantillas transformaron mi día a día, eliminando el dolor de espalda completamente.",
    rating: 5,
  },
  {
    name: "Ana Martínez",
    role: "Enfermera",
    image: "bg-gradient-to-br from-[#4FA9E8] to-[#0066A4]",
    content: "Trabajo en turnos largos y estas plantillas son un salvavidas. La calidad es premium y se nota desde el primer uso.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonios" className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-light)] relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0066A4]/10 via-transparent to-[#F5C400]/10 opacity-70" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]">
          <h2 className="text-5xl sm:text-6xl font-bold mb-6 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
            <span className="text-[var(--color-primary-dark)]">Lo que dicen nuestros clientes</span>
          </h2>
          <p className="text-xl text-[rgba(51,51,51,0.8)] max-w-2xl mx-auto opacity-0 animate-[fadeInUp_0.8s_ease-out_0.3s_forwards]">
            Miles de personas confían en nosotros cada día
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="h-full bg-white rounded-3xl p-8 shadow-xl border border-[rgba(0,60,99,0.08)] relative overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
                {/* Quote Icon */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#E6F1F8] to-[#FFF4C2] rounded-full flex items-center justify-center animate-spin-slow">
                  <Quote className="w-12 h-12 text-[var(--color-primary)]" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-6 relative z-10">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <div
                      key={i}
                      className="opacity-0 animate-[scaleIn_0.3s_ease-out_forwards]"
                      style={{ animationDelay: `${index * 0.2 + i * 0.1}s` }}
                    >
                      <Star className="w-5 h-5 fill-[var(--color-accent)] text-[var(--color-accent)]" />
                    </div>
                  ))}
                </div>

                {/* Content */}
                <p className="text-[var(--color-dark)] text-lg leading-relaxed mb-8 relative z-10 opacity-0 animate-[fadeIn_0.8s_ease-out_forwards]" style={{ animationDelay: `${index * 0.2 + 0.3}s` }}>
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 relative z-10">
                  <div className={`w-16 h-16 rounded-full ${testimonial.image} flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300`}>
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--color-primary-dark)] text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-[rgba(51,51,51,0.7)]">{testimonial.role}</p>
                  </div>
                </div>

                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0066A4]/8 to-[#F5C400]/8 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators (certificate removed) */}
        <div className="mt-20 text-center opacity-0 animate-[fadeInUp_0.8s_ease-out_0.8s_forwards]">
          <div className="flex flex-wrap justify-center items-center gap-8 text-slate-500">
            <div className="flex items-center gap-2 hover:scale-110 transition-transform">
              <Star className="w-6 h-6 fill-[var(--color-accent)] text-[var(--color-accent)]" />
              <span className="text-lg font-semibold text-[var(--color-primary-dark)]">4.9/5 de 2,000+ reseñas</span>
            </div>
            <div className="w-px h-8 bg-slate-300" />
            <span className="text-lg font-semibold text-[var(--color-primary-dark)] hover:scale-110 transition-transform">
              Garantía de Satisfacción
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
