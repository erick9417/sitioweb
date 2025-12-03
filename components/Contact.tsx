"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";

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
    <section id="contacto" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white relative overflow-hidden" ref={ref}>
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), transparent 50%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.3), transparent 50%)",
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
            <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Visítanos o Contáctanos
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-purple-200 max-w-2xl mx-auto"
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
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
              whileHover={{ boxShadow: "0 25px 50px -12px rgba(255, 255, 255, 0.25)" }}
            >
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium mb-2 text-purple-200">
                    Nombre Completo
                  </label>
                  <motion.input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 outline-none transition-all text-white placeholder-purple-300"
                    placeholder="Tu nombre"
                    whileFocus={{ scale: 1.02 }}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-purple-200">
                    Email
                  </label>
                  <motion.input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 outline-none transition-all text-white placeholder-purple-300"
                    placeholder="tu@email.com"
                    whileFocus={{ scale: 1.02 }}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-purple-200">
                    Mensaje
                  </label>
                  <motion.textarea
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 outline-none transition-all text-white placeholder-purple-300 resize-none"
                    placeholder="¿Cómo podemos ayudarte?"
                    whileFocus={{ scale: 1.02 }}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 group"
                  whileHover={{ scale: 1.02, boxShadow: "0 20px 40px -12px rgba(236, 72, 153, 0.5)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  Enviar Mensaje
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <p className="text-xs text-purple-300 text-center">Se abrirá WhatsApp con tu mensaje prellenado.</p>
              </form>
            </motion.div>
          </motion.div>

          {/* Contact Info - Reordenado: Ubicación, Teléfono, Email, Redes, Horario */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* 1. Ubicación con Mapa */}
            <motion.div
              className="flex items-start gap-4 group"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center flex-shrink-0"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MapPin className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold mb-1">Visítanos</h3>
                <p className="text-purple-200 mb-3">200m al oeste del Hospital San Rafael de Alajuela, Costa Rica</p>
                <motion.a
                  href="https://maps.app.goo.gl/96uE91jw1hAfGE948"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-shadow"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Ver en Google Maps
                </motion.a>
              </div>
            </motion.div>

            {/* Mapa embebido */}
            <motion.div
              className="rounded-2xl overflow-hidden border border-white/20 shadow-xl h-64"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.8967!2d-84.2185!3d10.0167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0fb700f3c1d47%3A0x4e9f7c0f9f7c0f9f!2sHospital%20San%20Rafael%20de%20Alajuela!5e0!3m2!1ses!2scr!4v1733000000000!5m2!1ses!2scr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>

            {/* 2. Teléfono */}
            <motion.div
              className="flex items-start gap-4 group"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.div
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center flex-shrink-0"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Phone className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold mb-1">Llámanos</h3>
                <p className="text-purple-200">(+506) 2430 4847 | 6096 1784</p>
              </div>
            </motion.div>

            {/* 3. Email */}
            <motion.div
              className="flex items-start gap-4 group"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <motion.div
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center flex-shrink-0"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Mail className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold mb-1">Escríbenos</h3>
                <p className="text-purple-200">info@lucvanlatam.com</p>
              </div>
            </motion.div>

            {/* 4. Redes Sociales */}
            <motion.div
              className="pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h3 className="text-xl font-bold mb-4">Síguenos</h3>
              <div className="flex gap-4">
                {[
                  { icon: Instagram, color: "from-pink-500 to-purple-500", url: "https://www.instagram.com/lab.ortopedico_cr/" },
                  { icon: Facebook, color: "from-blue-500 to-blue-600", url: "https://www.facebook.com/p/Laboratorio-Ortop%C3%A9dico-100063572172602/?locale=es_LA" },
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
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* 5. Horario */}
            <motion.div
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
              whileHover={{ boxShadow: "0 20px 40px -12px rgba(255, 255, 255, 0.2)" }}
            >
              <h3 className="text-xl font-bold mb-4">Horario de Atención</h3>
              <div className="space-y-2 text-purple-200">
                <p>Lunes - Viernes: 8:00 AM - 5:00 PM</p>
                <p>Sábados: 10:00 AM - 2:00 PM</p>
                <p>Domingos: Cerrado</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          className="mt-20 pt-8 border-t border-white/20 text-center text-purple-200"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <p>&copy; 2025 LucvánLATAM. Todos los derechos reservados.</p>
        </motion.div>
      </div>

      {/* Background Decoration */}
      <motion.div
        className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
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
