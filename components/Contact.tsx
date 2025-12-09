"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, MapPin, Phone, Mail, Instagram, Facebook, MessageCircle } from "lucide-react";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = "50663819141";
    const text = `Hola, soy ${formData.name || "[Sin nombre]"}.\nEmail: ${formData.email || "[Sin email]"}.\n\nMensaje: ${formData.message || "[Sin mensaje]"}.\n\nEnviado desde lucvanlatam.com`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <section id="contacto" className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-light)] text-[var(--color-dark)] relative overflow-hidden" ref={ref}>
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, rgba(0, 102, 164, 0.2), transparent 50%), radial-gradient(circle at 80% 80%, rgba(245, 196, 0, 0.2), transparent 50%)",
          backgroundSize: "200% 200%",
        }}
      />

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
            <span className="text-[var(--color-primary-dark)]">Visítanos o Contáctanos</span>
          </motion.h2>
          <motion.p
            className="text-xl text-[rgba(0,60,99,0.8)] max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Agenda tu evaluación gratuita y descubre la plantilla perfecta para ti
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 border border-[rgba(0,60,99,0.1)] shadow-xl"
              whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 60, 99, 0.2)" }}
            >
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium mb-2 text-[var(--color-primary-dark)]">
                    Nombre Completo
                  </label>
                  <motion.input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[rgba(0,60,99,0.15)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[rgba(0,102,164,0.35)] outline-none transition-all text-[var(--color-dark)] placeholder-slate-400"
                    placeholder="Tu nombre"
                    whileFocus={{ scale: 1.02 }}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-[var(--color-primary-dark)]">
                    Email
                  </label>
                  <motion.input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[rgba(0,60,99,0.15)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[rgba(0,102,164,0.35)] outline-none transition-all text-[var(--color-dark)] placeholder-slate-400"
                    placeholder="tu@email.com"
                    whileFocus={{ scale: 1.02 }}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-[var(--color-primary-dark)]">
                    Mensaje
                  </label>
                  <motion.textarea
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[rgba(0,60,99,0.15)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[rgba(0,102,164,0.35)] outline-none transition-all text-[var(--color-dark)] placeholder-slate-400 resize-none"
                    placeholder="¿Cómo podemos ayudarte?"
                    whileFocus={{ scale: 1.02 }}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full py-4 btn-primary rounded-xl font-semibold text-lg flex items-center justify-center gap-2 group"
                  whileHover={{ scale: 1.02, boxShadow: "0 20px 40px -12px rgba(0, 60, 99, 0.35)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  Enviar Mensaje
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <p className="text-xs text-[rgba(51,51,51,0.6)] text-center">Se abrirá WhatsApp con tu mensaje prellenado.</p>
              </form>
            </motion.div>
          </motion.div>

          {/* Contact Info - Nuevo orden: Horario, Teléfonos, Dirección, Redes */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* 1. Horario */}
            <motion.div
              className="bg-white rounded-2xl p-6 border border-[rgba(0,60,99,0.1)] shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ boxShadow: "0 20px 40px -12px rgba(0, 60, 99, 0.2)" }}
            >
              <h3 className="text-xl font-bold mb-4 text-[var(--color-primary-dark)]">Horario de Atención</h3>
              <div className="space-y-2 text-[var(--color-dark)]">
                <p>Lunes - Viernes: 07:30 AM - 4:30 PM</p>
                <p>Sábados: 08:00 AM - 2:00 PM</p>
                <p>Domingos: Cerrado</p>
              </div>
            </motion.div>

            {/* 2. Teléfonos */}
            <motion.div
              className="flex items-start gap-4 group"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.div
                className="w-14 h-14 rounded-2xl bg-[var(--color-accent)] flex items-center justify-center flex-shrink-0"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Phone className="w-7 h-7 text-[var(--color-primary-dark)]" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold mb-1 text-[var(--color-primary-dark)]">Llámanos</h3>
                <p className="text-[var(--color-dark)]">(+506) 2430 4847</p>
                <p className="text-[var(--color-dark)]">(+506) 6381 9141</p>
              </div>
            </motion.div>

            {/* 3. Dirección */}
            <motion.div
              className="flex items-start gap-4 group"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.div
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0066A4] to-[#003C63] flex items-center justify-center flex-shrink-0"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MapPin className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold mb-1 text-[var(--color-primary-dark)]">Visítanos</h3>
                <p className="text-[var(--color-dark)]">200m al oeste del Hospital San Rafael de Alajuela, Costa Rica</p>
              </div>
            </motion.div>

            {/* 4. Email */}
            <motion.div
              className="flex items-start gap-4 group"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.65 }}
            >
              <motion.div
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4FA9E8] to-[#0066A4] flex items-center justify-center flex-shrink-0"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Mail className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold mb-1 text-[var(--color-primary-dark)]">Escríbenos</h3>
                <p className="text-[var(--color-dark)]">info@lucvanlatam.com</p>
              </div>
            </motion.div>

            {/* 5. Redes Sociales con Google Maps */}
            <motion.div
              className="pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
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
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${social.color} flex items-center justify-center`}
                      whileHover={{ scale: 1.15, rotate: 360 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      aria-label={social.label}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          className="mt-20 pt-8 border-t border-[rgba(0,60,99,0.12)] text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <p className="text-[rgba(51,51,51,0.7)]">&copy; 2025 LucvánLATAM. Todos los derechos reservados.</p>
        </motion.div>
      </div>

      {/* Background Decoration */}
      <motion.div
        className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--color-primary)] rounded-full mix-blend-multiply filter blur-3xl opacity-15"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </section>
  );
}
