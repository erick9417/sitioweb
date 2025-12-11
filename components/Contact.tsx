"use client";

import { useState } from "react";
import { Send, MapPin, Phone, Mail, Instagram, Facebook, MessageCircle } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = "50663819141";
    const text = `Hola, soy ${formData.name || "[Sin nombre]"}.\nEmail: ${formData.email || "[Sin email]"}.\n\nMensaje: ${formData.message || "[Sin mensaje]"}.\n\nEnviado desde lucvanlatam.com`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <section id="contacto" className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-light)] text-[var(--color-dark)] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20 animate-gradient" style={{
        backgroundImage: "radial-gradient(circle at 20% 50%, rgba(0, 102, 164, 0.2), transparent 50%), radial-gradient(circle at 80% 80%, rgba(245, 196, 0, 0.2), transparent 50%)",
        backgroundSize: "200% 200%",
      }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]">
          <h2 className="text-5xl sm:text-6xl font-bold mb-6 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
            <span className="text-[var(--color-primary-dark)]">Visítanos o Contáctanos</span>
          </h2>
          <p className="text-xl text-[rgba(0,60,99,0.8)] max-w-2xl mx-auto opacity-0 animate-[fadeInUp_0.8s_ease-out_0.3s_forwards]">
            Agenda tu evaluación gratuita y descubre la plantilla perfecta para ti
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="opacity-0 animate-[fadeInLeft_0.8s_ease-out_forwards]">
            <div className="bg-white rounded-3xl p-8 border border-[rgba(0,60,99,0.1)] shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium mb-2 text-[var(--color-primary-dark)]">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[rgba(0,60,99,0.15)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[rgba(0,102,164,0.35)] focus:scale-[1.02] outline-none transition-all text-[var(--color-dark)] placeholder-slate-400"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-[var(--color-primary-dark)]">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[rgba(0,60,99,0.15)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[rgba(0,102,164,0.35)] focus:scale-[1.02] outline-none transition-all text-[var(--color-dark)] placeholder-slate-400"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-[var(--color-primary-dark)]">
                    Mensaje
                  </label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[rgba(0,60,99,0.15)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[rgba(0,102,164,0.35)] focus:scale-[1.02] outline-none transition-all text-[var(--color-dark)] placeholder-slate-400 resize-none"
                    placeholder="¿Cómo podemos ayudarte?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 btn-primary rounded-xl font-semibold text-lg flex items-center justify-center gap-2 group hover:scale-[1.02] hover:shadow-[0_20px_40px_-12px_rgba(0,60,99,0.35)] active:scale-[0.98] transition-all"
                >
                  Enviar Mensaje
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-xs text-[rgba(51,51,51,0.6)] text-center">Se abrirá WhatsApp con tu mensaje prellenado.</p>
              </form>
            </div>
          </div>

          {/* Contact Info - Nuevo orden: Horario, Teléfonos, Dirección, Redes */}
          <div className="space-y-6 opacity-0 animate-[fadeInRight_0.8s_ease-out_forwards]">
            {/* 1. Horario */}
            <div className="bg-white rounded-2xl p-6 border border-[rgba(0,60,99,0.1)] shadow-md opacity-0 animate-[fadeInUp_0.6s_ease-out_0.4s_forwards] hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-4 text-[var(--color-primary-dark)]">Horario de Atención</h3>
              <div className="space-y-2 text-[var(--color-dark)]">
                <p>Lunes - Viernes: 07:30 AM - 4:30 PM</p>
                <p>Sábados: 08:00 AM - 2:00 PM</p>
                <p>Domingos: Cerrado</p>
              </div>
            </div>

            {/* 2. Teléfonos */}
            <div className="flex items-start gap-4 group opacity-0 animate-[fadeInUp_0.6s_ease-out_0.5s_forwards]">
              <div className="w-14 h-14 rounded-2xl bg-[var(--color-accent)] flex items-center justify-center flex-shrink-0 group-hover:rotate-180 group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-7 h-7 text-[var(--color-primary-dark)]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1 text-[var(--color-primary-dark)]">Llámanos</h3>
                <p className="text-[var(--color-dark)]">(+506) 2430 4847</p>
                <p className="text-[var(--color-dark)]">(+506) 6381 9141</p>
              </div>
            </div>

            {/* 3. Dirección */}
            <div className="flex items-start gap-4 group opacity-0 animate-[fadeInUp_0.6s_ease-out_0.6s_forwards]">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0066A4] to-[#003C63] flex items-center justify-center flex-shrink-0 group-hover:rotate-180 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1 text-[var(--color-primary-dark)]">Visítanos</h3>
                <p className="text-[var(--color-dark)]">200m al oeste del Hospital San Rafael de Alajuela, Costa Rica</p>
              </div>
            </div>

            {/* 4. Email */}
            <div className="flex items-start gap-4 group opacity-0 animate-[fadeInUp_0.6s_ease-out_0.65s_forwards]">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4FA9E8] to-[#0066A4] flex items-center justify-center flex-shrink-0 group-hover:rotate-180 group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1 text-[var(--color-primary-dark)]">Escríbenos</h3>
                <p className="text-[var(--color-dark)]">info@lucvanlatam.com</p>
              </div>
            </div>

            {/* 5. Redes Sociales con Google Maps */}
            <div className="pt-4 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.7s_forwards]">
              <h3 className="text-xl font-bold mb-4 text-[var(--color-primary-dark)]">Síguenos y Contáctanos</h3>
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: Instagram, color: "from-[#F5C400] to-[#FFD933]", url: "https://www.instagram.com/lab.ortopedico_cr/", label: "Instagram" },
                  { icon: Facebook, color: "from-[#0066A4] to-[#003C63]", url: "https://www.facebook.com/p/Laboratorio-Ortop%C3%A9dico-100063572172602/?locale=es_LA", label: "Facebook" },
                  { icon: MapPin, color: "from-[#4FA9E8] to-[#0066A4]", url: "https://maps.app.goo.gl/96uE91jw1hAfGE948", label: "Google Maps" },
                  { icon: MessageCircle, color: "from-[#003C63] to-[#0066A4]", url: "https://wa.me/50663819141?text=Hola%2C%20necesito%20m%C3%A1s%20informaci%C3%B3n%20sobre%20las%20plantillas%20Lucv%C3%A1n.", label: "WhatsApp" },
                ].map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${social.color} flex items-center justify-center hover:scale-[1.15] hover:rotate-12 active:scale-90 transition-all duration-300`}
                      aria-label={social.label}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-[rgba(0,60,99,0.12)] text-center opacity-0 animate-[fadeIn_0.8s_ease-out_1.2s_forwards]">
          <p className="text-[rgba(51,51,51,0.7)]">&copy; 2025 LucvánLATAM. Todos los derechos reservados.</p>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--color-primary)] rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse" />
    </section>
  );
}
