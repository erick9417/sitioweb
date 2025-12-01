"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, MapPin, Phone, Mail, Instagram, Facebook, Twitter } from "lucide-react";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

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
              <form className="space-y-6">
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
              </form>
            </motion.div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Info Cards */}
            {[
              {
                icon: MapPin,
                title: "Visítanos",
                content: "Av. Principal 123, Ciudad, País",
                color: "from-blue-400 to-cyan-500",
              },
              {
                icon: Phone,
                title: "Llámanos",
                content: "+1 (555) 123-4567",
                color: "from-purple-400 to-pink-500",
              },
              {
                icon: Mail,
                title: "Escríbenos",
                content: "info@plantillaspremium.com",
                color: "from-pink-400 to-rose-500",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  className="flex items-start gap-4 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  <motion.div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                    <p className="text-purple-200">{item.content}</p>
                  </div>
                </motion.div>
              );
            })}

            {/* Social Media */}
            <motion.div
              className="pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h3 className="text-xl font-bold mb-4">Síguenos</h3>
              <div className="flex gap-4">
                {[
                  { icon: Instagram, color: "from-pink-500 to-purple-500" },
                  { icon: Facebook, color: "from-blue-500 to-blue-600" },
                  { icon: Twitter, color: "from-cyan-400 to-blue-500" },
                ].map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href="#"
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

            {/* Hours */}
            <motion.div
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
              whileHover={{ boxShadow: "0 20px 40px -12px rgba(255, 255, 255, 0.2)" }}
            >
              <h3 className="text-xl font-bold mb-4">Horario de Atención</h3>
              <div className="space-y-2 text-purple-200">
                <p>Lunes - Viernes: 9:00 AM - 7:00 PM</p>
                <p>Sábados: 10:00 AM - 6:00 PM</p>
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
          <p>&copy; 2025 Plantillas Premium. Todos los derechos reservados.</p>
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
