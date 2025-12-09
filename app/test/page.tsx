"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function TestPage() {
  const [step, setStep] = useState<"welcome" | "test" | "result">("welcome");
  const [currentSection, setCurrentSection] = useState(1);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [selectedZones, setSelectedZones] = useState<Set<string>>(new Set());
  const [validationErrors, setValidationErrors] = useState<Set<string>>(new Set());

  const totalSections = 5;

  const startTest = () => {
    if (!formData.edad) return;
    setStep("test");
  };

  const handleInputChange = (name: string, value: any) => {
    setFormData({ ...formData, [name]: value });
  };

  const toggleZone = (zoneId: string) => {
    const newZones = new Set(selectedZones);
    if (newZones.has(zoneId)) {
      newZones.delete(zoneId);
    } else {
      newZones.add(zoneId);
    }
    setSelectedZones(newZones);
  };

  const validateSection = () => {
    const errors = new Set<string>();
    
    if (currentSection === 1) {
      if (!formData.plantillasPrevias) errors.add('plantillasPrevias');
      if (!formData.sexo) errors.add('sexo');
      if (!formData.nivelActividad) errors.add('nivelActividad');
    }
    if (currentSection === 2) {
      // Intensidad del dolor es obligatoria
      if (!formData.intensidadDolor) errors.add('intensidadDolor');
    }
    if (currentSection === 3) {
      if (!formData.condiciones || formData.condiciones.length === 0) errors.add('condiciones');
    }
    if (currentSection === 4) {
      if (!formData.desgasteCalzado) errors.add('desgasteCalzado');
      if (!formData.cargaPie) errors.add('cargaPie');
    }
    if (currentSection === 5) {
      if (!formData.objetivo) errors.add('objetivo');
    }
    
    setValidationErrors(errors);
    return errors.size === 0;
  };

  const calculateAndShowResult = () => {
    const scores = {
      pronacion: 0,
      supinacion: 0,
      fascitis: 0,
      sport: 0,
      soporte: 0,
      confort: 0
    };

    if (formData.objetivo) {
      if (formData.objetivo === 'alineacion') {
        scores.pronacion += 2;
        scores.supinacion += 2;
      }
      if (formData.objetivo === 'aliviar-dolor') {
        scores.fascitis += 3;
        scores.soporte += 2;
      }
      if (formData.objetivo === 'rendimiento') {
        scores.sport += 4;
      }
      if (formData.objetivo === 'prevencion') {
        scores.confort += 3;
      }
    }

    if (formData.desgasteCalzado === 'interno') {
      scores.pronacion += 4;
    } else if (formData.desgasteCalzado === 'externo') {
      scores.supinacion += 4;
    }

    if (selectedZones.size > 0) {
      if (selectedZones.has('talon')) {
        scores.fascitis += 3;
      }
      if (selectedZones.has('arco-interno') || selectedZones.has('arco-externo')) {
        scores.soporte += 2;
      }
      if (selectedZones.has('metatarsos')) {
        scores.soporte += 2;
      }
      if (selectedZones.has('dedos') && selectedZones.has('metatarsos')) {
        scores.soporte += 3;
      }
    }

    if (formData.condiciones && formData.condiciones.length > 0) {
      if (formData.condiciones.includes('pie-plano') || formData.condiciones.includes('pie-cavo')) {
        scores.soporte += 3;
      }
      if (formData.condiciones.includes('metatarsalgia')) {
        scores.soporte += 3;
      }
      if (formData.condiciones.includes('fascitis') || formData.condiciones.includes('espolon')) {
        scores.fascitis += 4;
      }
      if (formData.condiciones.includes('ninguna')) {
        scores.confort += 2;
      }
    }

    if (formData.nivelActividad === 'intenso') {
      scores.sport += 3;
    }

    const intensidad = parseInt(formData.intensidadDolor) || 0;
    if (intensidad === 0) {
      scores.confort += 2;
    } else if (intensidad >= 7) {
      scores.fascitis += 2;
      scores.soporte += 1;
    }

    if (selectedZones.has('dedos') && selectedZones.has('metatarsos')) {
      setFormData({ ...formData, resultado: 'soporte' });
      setStep("result");
      return;
    }

    let maxScore = 0;
    let resultado = 'confort';

    for (const [key, score] of Object.entries(scores)) {
      if (score > maxScore) {
        maxScore = score;
        resultado = key;
      }
    }

    setFormData({ ...formData, resultado });
    setStep("result");
  };

  const nextSection = () => {
    if (!validateSection()) {
      return;
    }
    
    setValidationErrors(new Set());
    
    if (currentSection < totalSections) {
      setCurrentSection(currentSection + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      calculateAndShowResult();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevSection = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
      setValidationErrors(new Set());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-20 pb-8 px-4 relative overflow-hidden">
      {/* Premium Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large purple gradient blob - top left */}
        <motion.div
          animate={{
            y: [0, 20, 0],
            x: [0, 10, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-20 w-96 h-96 bg-gradient-to-br from-purple-900/40 via-purple-800/20 to-transparent rounded-full blur-3xl"
        />
        
        {/* Cyan gradient blob - bottom right */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            x: [0, -10, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute -bottom-40 -right-20 w-96 h-96 bg-gradient-to-tl from-cyan-900/40 via-blue-900/20 to-transparent rounded-full blur-3xl"
        />
        
        {/* Pink gradient blob - top right */}
        <motion.div
          animate={{
            y: [0, 15, 0],
            x: [0, -15, 0],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/3 -right-32 w-80 h-80 bg-gradient-to-l from-pink-900/30 via-rose-900/15 to-transparent rounded-full blur-3xl"
        />
        
        {/* Additional blue-violet accent - middle left */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            x: [0, 15, 0],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute top-1/2 -left-32 w-72 h-72 bg-gradient-to-r from-blue-900/25 via-indigo-900/15 to-transparent rounded-full blur-3xl"
        />
        
        {/* Grid overlay for premium look */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.02] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/[0.02] via-transparent to-pink-500/[0.02]" />
      </div>
      
      <div className="relative z-10 w-full min-h-screen flex flex-col">
        <AnimatePresence mode="wait">
          {step === "welcome" && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full px-8 py-6 space-y-6 flex-1"
            >
              <div className="max-w-4xl mx-auto">
                {/* Hero Section */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-center py-4 space-y-6"
                >
                  <h1 className="text-4xl md:text-5xl font-black leading-tight" style={{ color: '#ffffff' }}>
                    Bienvenido al test, descubre si Lucván es para ti
                  </h1>
                  <p className="text-xl md:text-2xl text-cyan-400 font-bold">
                    Escoge tu edad para iniciar el test
                  </p>
                </motion.div>

                {/* Age Selection */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="py-2 space-y-4"
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { value: '18-30', label: '18-30' },
                      { value: '31-45', label: '31-45' },
                      { value: '46-60', label: '46-60' },
                      { value: '60+', label: '60+' },
                    ].map((age) => (
                      <motion.button
                        key={age.value}
                        onClick={() => handleInputChange('edad', age.value)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-4 rounded-xl border-2 transition-all text-center font-bold text-base ${
                          formData.edad === age.value
                            ? 'border-cyan-500 bg-cyan-500/20 text-cyan-300'
                            : 'border-slate-600 bg-slate-900/50 text-slate-300 hover:border-cyan-400'
                        }`}
                      >
                        {age.label} años
                      </motion.button>
                    ))}
                  </div>

                  <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={startTest}
                    disabled={!formData.edad}
                    className={`w-full px-8 py-4 rounded-xl text-lg font-bold transition-all flex items-center justify-center gap-2 ${
                      formData.edad
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/50'
                        : 'bg-slate-700 text-slate-500 cursor-not-allowed opacity-50'
                    }`}
                  >
                    Continuar
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </motion.div>

                <p className="text-center text-slate-400 text-sm">
                  * Esta evaluación es orientativa y no sustituye una consulta médica profesional
                </p>
              </div>
            </motion.div>
          )}

          {step === "test" && (
            <motion.div
              key="test"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full px-8 py-6 space-y-6 flex-1"
            >
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center justify-end mb-6">
                  <p className="text-slate-400 text-sm">
                    Sección {currentSection} de {totalSections}
                  </p>
                </div>

                <div className="flex items-center justify-center mb-6">
                  <div className="flex items-center max-w-2xl w-full">
                    {Array.from({ length: totalSections }, (_, i) => (
                      <div key={i} className="flex items-center flex-1">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                            i + 1 < currentSection
                              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                              : i + 1 === currentSection
                              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                              : "bg-slate-700 text-slate-400"
                          }`}
                        >
                          {i + 1 < currentSection ? <Check className="w-5 h-5" /> : i + 1}
                        </div>
                        {i < totalSections - 1 && (
                          <div className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                            i + 1 < currentSection ? "bg-gradient-to-r from-purple-600 to-pink-600" : "bg-slate-700"
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/40 backdrop-blur-sm rounded-2xl border-2 border-cyan-500/50 p-8 min-h-auto shadow-lg shadow-cyan-500/10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSection}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {currentSection === 1 && <Section1 formData={formData} onChange={handleInputChange} validationErrors={validationErrors} />}
                      {currentSection === 2 && <Section2 formData={formData} onChange={handleInputChange} selectedZones={selectedZones} toggleZone={toggleZone} validationErrors={validationErrors} />}
                      {currentSection === 3 && <Section3 formData={formData} onChange={handleInputChange} validationErrors={validationErrors} />}
                      {currentSection === 4 && <Section4 formData={formData} onChange={handleInputChange} validationErrors={validationErrors} />}
                      {currentSection === 5 && <Section5 formData={formData} onChange={handleInputChange} validationErrors={validationErrors} />}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex gap-4">
                  <motion.button
                    onClick={prevSection}
                    disabled={currentSection === 1}
                    className="px-6 py-3 rounded-xl border-2 border-slate-700 text-slate-300 font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:border-purple-500 hover:text-purple-400 transition-all flex items-center gap-2"
                    whileHover={currentSection > 1 ? { scale: 1.02 } : {}}
                    whileTap={currentSection > 1 ? { scale: 0.98 } : {}}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Anterior
                  </motion.button>

                  <motion.button
                    onClick={nextSection}
                    className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {currentSection === totalSections ? 'Ver resultados' : 'Siguiente'}
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {step === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex-1 flex flex-col"
            >
              <ResultDisplay resultado={formData.resultado} formData={formData} selectedZones={selectedZones} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
    </>
  );
}

function ResultDisplay({ resultado, formData, selectedZones }: any) {
  const results: Record<string, any> = {
    pronacion: {
      title: 'Lucván Pronación',
      description: 'Soporte para el pie que gira hacia adentro',
      details: 'Esta plantilla está diseñada específicamente para personas con pronación excesiva. Proporciona soporte en el arco medial y ayuda a corregir el desgaste interno del calzado, mejorando la alineación y distribución del peso corporal.',
      image: '/plantillas/Pronacion.webp'
    },
    supinacion: {
      title: 'Lucván Supinación',
      description: 'Control lateral para el pie que gira hacia afuera',
      details: 'Ideal para personas con supinación, donde el pie tiende a rodar hacia afuera. Esta plantilla ofrece control lateral y amortiguación adicional en la parte externa del pie.',
      image: '/plantillas/Supinacion.webp'
    },
    fascitis: {
      title: 'Lucván Fascitis / Espolón',
      description: 'Alivio específico para dolor plantar',
      details: 'Diseñada para personas que sufren de fascitis plantar o espolón calcáneo. Cuenta con descarga en la zona del talón, soporte del arco y amortiguación estratégica.',
      image: '/plantillas/Fascitis.webp'
    },
    sport: {
      title: 'Lucván Sport',
      description: 'Alto rendimiento deportivo',
      details: 'Perfecta para atletas y personas con alta actividad física. Ofrece máxima amortiguación, estabilidad y control durante movimientos de alto impacto.',
      image: '/plantillas/Sport.webp'
    },
    soporte: {
      title: 'Lucván Soporte',
      description: 'Refuerzo estructural del pie',
      details: 'Recomendada para personas con pie plano, pie cavo o necesidades de soporte adicional. Proporciona un refuerzo firme del arco y estabilidad estructural.',
      image: '/plantillas/Soporte.webp'
    },
    confort: {
      title: 'Lucván Confort',
      description: 'Comodidad para el día a día',
      details: 'Ideal para uso diario y prevención. Esta plantilla ligera ofrece comodidad óptima durante largas jornadas, reduce la fatiga y previene molestias futuras.',
      image: '/plantillas/Lucvan Confort.webp'
    },
  };

  const result = results[resultado] || results.confort;

  const handleDownloadPDF = () => {
    alert('La función de descarga de PDF estará disponible próximamente. Por favor, tome una captura de pantalla de sus resultados.');
  };

  const handleWhatsApp = () => {
    const phone = '50663819141';
    const message = `Hola, completé el test de Lucván y mi resultado es: ${result.title}. Me gustaría más información sobre esta plantilla.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="w-full">
      {/* Full Width Result Section */}
      <div className="w-full bg-gradient-to-b from-slate-900/80 to-slate-900/60 py-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative w-full"
        >
          {/* Glow Effects */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-b from-cyan-500 to-transparent rounded-full blur-3xl opacity-20 pointer-events-none z-0" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-t from-blue-600 to-transparent rounded-full blur-3xl opacity-15 pointer-events-none z-0" />

          {/* Main Content Grid */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center px-8 lg:px-12 py-8 max-w-6xl mx-auto">
            
            {/* Left Side - Text Content */}
            <div className="flex flex-col justify-center">
              <p className="text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-2">Tu Resultado Es:</p>
              <h1 className="text-4xl lg:text-5xl font-black mb-1" style={{ color: '#15e1a6' }}>
                Plantillas
              </h1>
              <h2 className="text-4xl lg:text-5xl font-black mb-4" style={{ color: '#15e1a6' }}>
                {result.title.split(' ').pop()}
              </h2>
              <p className="text-white/90 text-base mb-3 font-medium leading-relaxed">{result.description}</p>
              <p className="text-slate-200 mb-6 leading-relaxed text-sm">{result.details}</p>
              
              <div className="flex flex-col items-start gap-3">
                <motion.button
                  onClick={handleWhatsApp}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-64 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white font-bold shadow-[0_12px_24px_rgba(255,0,128,0.35)] transition-all text-sm hover:shadow-[0_16px_30px_rgba(255,0,128,0.4)]"
                >
                  ✓ Agendar consulta
                </motion.button>
                <motion.button
                  onClick={handleDownloadPDF}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-64 px-6 py-3 rounded-full border border-slate-500/80 bg-slate-900/60 text-slate-200 font-semibold transition-all flex items-center justify-center gap-2 text-sm hover:border-slate-300 hover:text-white"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Descargar resultado
                </motion.button>
              </div>
            </div>

            {/* Right Side - Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative flex items-center justify-center h-[350px]"
            >
              {/* Glow Background */}
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/40 to-blue-500/10 rounded-full blur-3xl opacity-60" />
              
              {/* Image Container */}
              <div className="relative w-full h-full flex items-center justify-center z-10">
                <Image
                  src={result.image}
                  alt={result.title}
                  width={500}
                  height={500}
                  className="object-contain drop-shadow-[0_20px_60px_rgba(0,200,255,0.5)] w-auto h-auto max-h-full"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Section1({ formData, onChange, validationErrors }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold mb-2" style={{ color: '#06b6d4' }}>Perfil Básico</h3>
        <p className="text-slate-400 text-sm">Información sobre su experiencia previa y características físicas</p>
      </div>

      <QuestionRadio
        label="¿Ha utilizado plantillas ortopédicas anteriormente?"
        name="plantillasPrevias"
        value={formData.plantillasPrevias}
        onChange={onChange}
        hasError={validationErrors?.has('plantillasPrevias')}
        options={[
          { value: 'si', label: 'Sí, las uso actualmente' },
          { value: 'antes', label: 'Sí, pero ya no las uso' },
          { value: 'no', label: 'No, nunca las he usado' },
        ]}
      />

      <QuestionRadio
        label="Sexo biológico"
        name="sexo"
        value={formData.sexo}
        onChange={onChange}
        hasError={validationErrors?.has('sexo')}
        options={[
          { value: 'masculino', label: 'Masculino' },
          { value: 'femenino', label: 'Femenino' },
          { value: 'prefiero-no-decir', label: 'Prefiero no decirlo' },
        ]}
      />

      <QuestionRadio
        label="Nivel de actividad física"
        name="nivelActividad"
        value={formData.nivelActividad}
        onChange={onChange}
        hasError={validationErrors?.has('nivelActividad')}
        options={[
          { value: 'sedentario', label: 'Sedentario - Principalmente sentado' },
          { value: 'ligero', label: 'Ligero - Caminar ocasionalmente' },
          { value: 'moderado', label: 'Moderado - Ejercicio regular' },
          { value: 'intenso', label: 'Intenso - Deportista o trabajo físico' },
        ]}
      />
    </div>
  );
}

function Section2({ formData, onChange, selectedZones, toggleZone, validationErrors }: any) {
  const zones = [
    { id: 'dedos', label: 'Dedos', top: '5%', left: '35%', width: '30%', height: '15%' },
    { id: 'metatarsos', label: 'Metatarsos', top: '22%', left: '30%', width: '40%', height: '12%' },
    { id: 'arco-interno', label: 'Arco Int.', top: '40%', left: '15%', width: '20%', height: '25%' },
    { id: 'arco-externo', label: 'Arco Ext.', top: '40%', left: '65%', width: '20%', height: '25%' },
    { id: 'talon', label: 'Talón', top: '72%', left: '30%', width: '40%', height: '20%' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold mb-2" style={{ color: '#06b6d4' }}>Zonas de Molestia</h3>
        <p className="text-slate-400 text-sm">Identifique las áreas donde experimenta dolor o incomodidad</p>
      </div>

      <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700">
        <label className="block text-base font-medium text-white mb-4">
          ¿Dónde sientes más incomodidad o dolor?
        </label>

        <div className="relative mx-auto mb-4" style={{ maxWidth: '150px' }}>
          <Image
            src="/foot-diagram.png"
            alt="Diagrama del pie"
            width={150}
            height={225}
            className="w-full h-auto"
          />
          {zones.map((zone) => (
            <button
              key={zone.id}
              onClick={() => toggleZone(zone.id)}
              className={`absolute rounded-md border-2 transition-all flex items-center justify-center ${
                selectedZones.has(zone.id)
                  ? 'bg-cyan-500/70 border-cyan-300 shadow-lg shadow-cyan-500/50'
                  : 'bg-slate-800/50 border-slate-300/70 hover:border-cyan-400 hover:bg-cyan-500/40'
              }`}
              style={{
                top: zone.top,
                left: zone.left,
                width: zone.width,
                height: zone.height,
              }}
            >
              <span
                className={`text-xs font-extrabold ${
                  selectedZones.has(zone.id) ? 'text-white' : 'text-white'
                }`}
                style={{
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.9), 0 0 4px rgba(0, 0, 0, 0.8)'
                }}
              >
                {zone.label}
              </span>
            </button>
          ))}
        </div>

        <p className="text-center text-slate-200 text-sm italic">
          Haz clic en las zonas donde sientes molestia (opcional)
        </p>
      </div>

      <QuestionRadio
        label="Intensidad del dolor"
        name="intensidadDolor"
        value={formData.intensidadDolor}
        onChange={onChange}
        hasError={selectedZones.size === 0 && validationErrors?.has('intensidadDolor')}
        options={[
          { value: '0', label: 'Sin dolor' },
          { value: '3', label: 'Leve' },
          { value: '5', label: 'Moderado' },
          { value: '7', label: 'Fuerte' },
          { value: '10', label: 'Intenso' },
        ]}
      />
    </div>
  );
}

function Section3({ formData, onChange, validationErrors }: any) {
  const conditions = [
    { value: 'pie-plano', label: 'Pie plano' },
    { value: 'pie-cavo', label: 'Pie cavo (arco alto)' },
    { value: 'metatarsalgia', label: 'Metatarsalgia' },
    { value: 'fascitis', label: 'Fascitis plantar' },
    { value: 'espolon', label: 'Espolón calcáneo' },
    { value: 'ninguna', label: 'Ninguna' },
  ];

  const handleCheckboxChange = (value: string) => {
    const current = formData.condiciones || [];
    
    // Si selecciona "ninguna", deselecciona todo lo demás
    if (value === 'ninguna' && !current.includes('ninguna')) {
      onChange('condiciones', ['ninguna']);
      return;
    }
    
    // Si ya tiene "ninguna" y selecciona otra, quita "ninguna"
    if (value !== 'ninguna' && current.includes('ninguna')) {
      const updated = current.filter((v: string) => v !== 'ninguna');
      if (updated.includes(value)) {
        onChange('condiciones', updated.filter((v: string) => v !== value));
      } else {
        onChange('condiciones', [...updated, value]);
      }
      return;
    }
    
    // Restricción: pie-plano y pie-cavo son mutuamente exclusivos
    if (value === 'pie-plano' && current.includes('pie-plano')) {
      const updated = current.filter((v: string) => v !== value);
      onChange('condiciones', updated);
      return;
    }
    
    if (value === 'pie-plano' && current.includes('pie-cavo')) {
      const updated = current.filter((v: string) => v !== 'pie-cavo');
      onChange('condiciones', [...updated, value]);
      return;
    }
    
    if (value === 'pie-cavo' && current.includes('pie-cavo')) {
      const updated = current.filter((v: string) => v !== value);
      onChange('condiciones', updated);
      return;
    }
    
    if (value === 'pie-cavo' && current.includes('pie-plano')) {
      const updated = current.filter((v: string) => v !== 'pie-plano');
      onChange('condiciones', [...updated, value]);
      return;
    }
    
    // Toggle normal para otras opciones
    const isChecked = current.includes(value);
    if (isChecked) {
      onChange('condiciones', current.filter((v: string) => v !== value));
    } else {
      onChange('condiciones', [...current, value]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold mb-2" style={{ color: '#06b6d4' }}>Condiciones del Pie</h3>
        <p className="text-slate-400 text-sm">Seleccione las condiciones que apliquen a su caso</p>
      </div>

      <div>
        <label className={`block text-base font-medium mb-4 ${validationErrors?.has('condiciones') ? 'text-red-400' : 'text-white'}`}>
          ¿Te han diagnosticado alguna de estas condiciones?
        </label>
        <div className="space-y-3">
          {conditions.map((condition) => {
            const isChecked = (formData.condiciones || []).includes(condition.value);
            const isDisabled = 
              (condition.value === 'pie-cavo' && (formData.condiciones || []).includes('pie-plano')) ||
              (condition.value === 'pie-plano' && (formData.condiciones || []).includes('pie-cavo')) ||
              (condition.value !== 'ninguna' && (formData.condiciones || []).includes('ninguna')) ||
              (condition.value === 'ninguna' && (formData.condiciones || []).length > 0 && !(formData.condiciones || []).includes('ninguna'));
            
            return (
              <button
                key={condition.value}
                onClick={() => !isDisabled && handleCheckboxChange(condition.value)}
                disabled={isDisabled}
                className={`w-full text-left px-5 py-4 rounded-lg border-2 transition-all ${
                  isDisabled
                    ? 'border-slate-500 bg-slate-800/10 text-slate-400 cursor-not-allowed opacity-50'
                    : isChecked
                    ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300'
                    : 'border-slate-600 bg-slate-800/30 text-white hover:border-slate-500'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                    isChecked ? 'bg-cyan-500 border-cyan-500' : 'border-slate-400'
                  }`}>
                    {isChecked && <Check className="w-3 h-3 text-white" />}
                  </span>
                  {condition.label}
                </span>
              </button>
            );
          })}
        </div>
        {validationErrors?.has('condiciones') && (
          <p className="text-red-400 text-sm mt-2">Por favor selecciona al menos una condición</p>
        )}
      </div>
    </div>
  );
}

function Section4({ formData, onChange, validationErrors }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold mb-2" style={{ color: '#06b6d4' }}>Calzado y Pisada</h3>
        <p className="text-slate-400 text-sm">Información sobre su tipo de calzado y patrón de desgaste</p>
      </div>

      <QuestionRadio
        label="¿Dónde se desgasta más tu calzado?"
        name="desgasteCalzado"
        value={formData.desgasteCalzado}
        onChange={onChange}
        hasError={validationErrors?.has('desgasteCalzado')}
        options={[
          { value: 'interno', label: 'Parte interna' },
          { value: 'externo', label: 'Parte externa' },
          { value: 'sin-desgaste', label: 'No presenta desgaste notable' },
        ]}
      />

      <QuestionRadio
        label="¿Sientes que cargas más un pie que otro?"
        name="cargaPie"
        value={formData.cargaPie}
        onChange={onChange}
        hasError={validationErrors?.has('cargaPie')}
        options={[
          { value: 'derecho', label: 'Pie derecho' },
          { value: 'izquierdo', label: 'Pie izquierdo' },
          { value: 'igual', label: 'No, ambos por igual' },
        ]}
      />
    </div>
  );
}

function Section5({ formData, onChange, validationErrors }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold mb-2" style={{ color: '#06b6d4' }}>Objetivos</h3>
        <p className="text-slate-400 text-sm">¿Qué espera lograr con las plantillas ortopédicas?</p>
      </div>

      <QuestionRadio
        label="¿Cuál es tu principal objetivo?"
        name="objetivo"
        value={formData.objetivo}
        onChange={onChange}
        hasError={validationErrors?.has('objetivo')}
        options={[
          { value: 'aliviar-dolor', label: 'Aliviar el dolor' },
          { value: 'alineacion', label: 'Mejorar la alineación postural' },
          { value: 'rendimiento', label: 'Mejorar el rendimiento deportivo' },
          { value: 'prevencion', label: 'Prevención y confort general' },
        ]}
      />
    </div>
  );
}

function QuestionRadio({ label, name, value, onChange, options, hasError }: any) {
  return (
    <div>
      <label className={`block text-base font-medium mb-4 ${hasError ? 'text-red-400' : 'text-white'}`}>
        {label}
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {options.map((option: any) => (
          <button
            key={option.value}
            onClick={() => onChange(name, option.value)}
            className={`w-full text-left px-5 py-4 rounded-lg border-2 transition-all font-medium ${
              value === option.value
                ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300'
                : 'border-slate-600 bg-slate-800/30 text-white hover:border-slate-500'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      {hasError && (
        <p className="text-red-400 text-sm mt-2">Este campo es requerido</p>
      )}
    </div>
  );
}
