"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const blocks = [
  {
    title: "Conócenos",
    text: "Lucván es una línea de productos ortopédicos con amplia experiencia en confección de plantillas. Ayudamos a profesionales a optimizar tiempo con procesos claros y materiales certificados de primera calidad.",
  },
  {
    title: "En la actualidad",
    text: "Fabricamos más de 95K pares de plantillas al año con presencia en Europa y América. Ampliamos catálogo a ortesis de miembro inferior, superior y tronco.",
  },
  {
    title: "Expertos en Ortopedia",
    text: "El pie sustenta el aparato locomotor. Nuestro conocimiento del mercado y la confianza de clientes impulsan la expansión de nuevas gamas ortopédicas.",
  },
  {
    title: "Calidad Certificada",
    text: "Celebrando 30 años, certificamos procesos según ISO 13485, garantizando estándares altos para productos sanitarios y consistencia productiva.",
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="quienes" ref={ref} className="py-24 px-6 lg:px-10 bg-slate-950">
      <div className="max-w-7xl mx-auto space-y-14">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4"
        >
          <span className="inline-block text-sm font-semibold tracking-wide bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">30+ AÑOS RESPALDANDO LA SALUD DEL PIE</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Historia y Compromiso
          </h2>
          <p className="max-w-3xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed">
            Trayectoria construida sobre innovación, calidad y soporte constante a profesionales de ortopedia y podología.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {blocks.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * i }}
              className="group p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/60 shadow-xl relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500" />
              <h3 className="text-xl font-semibold mb-3 text-white">{b.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{b.text}</p>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
}
