"use client";

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
    text: "Celebrando 30 años, garantizando estándares altos para productos sanitarios y consistencia productiva.",
  },
];

export default function About() {
  return (
    <section id="quienes" className="py-24 px-6 lg:px-10 bg-[var(--color-light)]">
      <div className="max-w-7xl mx-auto space-y-14">
        <div className="text-center space-y-4 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]">
          <span className="inline-block text-sm font-semibold tracking-wide text-[var(--color-primary)]">30+ AÑOS RESPALDANDO</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[var(--color-primary-dark)]">
            Historia y Compromiso
          </h2>
          <p className="max-w-3xl mx-auto text-[rgba(51,51,51,0.8)] text-sm sm:text-base leading-relaxed">
            Trayectoria construida sobre innovación, calidad y soporte constante a profesionales de ortopedia y podología.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {blocks.map((b, i) => (
            <div
              key={i}
              className="group p-8 rounded-3xl bg-[var(--color-white)] border border-[rgba(0,60,99,0.12)] shadow-lg relative overflow-hidden opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards] hover:shadow-2xl transition-all duration-300"
              style={{ animationDelay: `${0.15 * i}s` }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-r from-[#0066A4] via-[#4FA9E8] to-[#F5C400]" />
              <h3 className="text-xl font-semibold mb-3 text-[var(--color-primary-dark)]">{b.title}</h3>
              <p className="text-[rgba(51,51,51,0.75)] text-sm leading-relaxed">{b.text}</p>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}
