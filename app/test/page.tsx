"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function TestPage() {
  const [step, setStep] = useState<"welcome" | "test" | "result">("welcome");
  const [currentSection, setCurrentSection] = useState(1);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [selectedZones, setSelectedZones] = useState<Set<string>>(new Set());

  const totalSections = 5;

  const startTest = () => {
    if (!formData.edad) return;
    setStep("test");
  };

  const [validationErrors, setValidationErrors] = useState<Set<string>>(new Set());

  const validateSection = () => {
    const errors = new Set<string>();
    
    if (currentSection === 1) {
      if (!formData.plantillasPrevias) errors.add('plantillasPrevias');
      if (!formData.sexo) errors.add('sexo');
      if (!formData.nivelActividad) errors.add('nivelActividad');
    }
    if (currentSection === 2) {
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

  const nextSection = () => {
    if (!validateSection()) {
      return;
    }
    
    setValidationErrors(new Set());
    
    if (currentSection < totalSections) {
      setCurrentSection(currentSection + 1);
      // Scroll suave al inicio de la página
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      calculateAndShowResult();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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

    // Análisis de objetivos
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

    // Análisis de desgaste del calzado
    if (formData.desgasteCalzado === 'interno') {
      scores.pronacion += 4;
    } else if (formData.desgasteCalzado === 'externo') {
      scores.supinacion += 4;
    }

    // Análisis de zonas de dolor
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

    // Análisis de condiciones
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

    // Análisis de nivel de actividad
    if (formData.nivelActividad === 'intenso') {
      scores.sport += 3;
    }

    // Análisis de intensidad del dolor
    const intensidad = parseInt(formData.intensidadDolor) || 0;
    if (intensidad === 0) {
      scores.confort += 2;
    } else if (intensidad >= 7) {
      scores.fascitis += 2;
      scores.soporte += 1;
    }

    // Regla especial: dedos + metatarsos = soporte directo
    if (selectedZones.has('dedos') && selectedZones.has('metatarsos')) {
      setFormData({ ...formData, resultado: 'soporte' });
      setStep("result");
      return;
    }

    // Determinar resultado con mayor puntuación
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

  const prevSection = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
      // Scroll suave al inicio de la página
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleInputChange = (name: string, value: any) => {
    setFormData({ ...formData, [name]: value });
  };

  const toggleZone = (zone: string) => {
    const newZones = new Set(selectedZones);
    if (newZones.has(zone)) {
      newZones.delete(zone);
    } else {
      newZones.add(zone);
    }
    setSelectedZones(newZones);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-12 pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {step === "welcome" && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mb-8"
              >
                <ArrowLeft className="w-5 h-5" />
                Volver al inicio
              </Link>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-center mb-8"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30">
                  <FileText className="w-8 h-8 text-cyan-400" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  Evaluación de Plantillas Ortopédicas
                </h1>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 mb-8"
              >
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <span className="text-purple-400 text-sm font-bold">1</span>
                  </div>
                  Información General
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-3">
                      Rango de edad *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      { [
                        { value: '18-30', label: '18-30 años' },
                        { value: '31-45', label: '31-45 años' },
                        { value: '46-60', label: '46-60 años' },
                        { value: '60+', label: '60+ años' },
                      ].map((age) => (
                        <button
                          key={age.value}
                          onClick={() => handleInputChange('edad', age.value)}
                          className={`p-4 rounded-lg border-2 transition-all text-center font-medium ${
                            formData.edad === age.value
                              ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                              : 'border-slate-600 bg-slate-800/30 text-slate-300 hover:border-slate-500'
                          }`}
                        >
                          {age.label}
                        </button>
                      )) }
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-700 space-y-3">
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Complete este formulario para recibir una recomendación personalizada basada en sus necesidades específicas.
                    </p>
                    <p className="text-xs text-slate-400 italic">
                      Tiempo estimado: 3-5 minutos
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={startTest}
                disabled={!formData.edad}
                className={`w-full px-8 py-4 rounded-xl text-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                  formData.edad
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40'
                    : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                }`}
              >
                Continuar con la evaluación
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <p className="text-center text-slate-400 text-xs mt-6 italic">
                * Esta evaluación es orientativa y no sustituye una consulta médica profesional
              </p>
            </motion.div>
          )}

          {step === "test" && (
            <motion.div
              key="test"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Progress */}
              <div className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  {Array.from({ length: totalSections }, (_, i) => (
                    <div key={i} className="flex items-center flex-1">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                          i + 1 < currentSection
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                            : i + 1 === currentSection
                            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md ring-4 ring-purple-500/20"
                            : "bg-slate-700 text-slate-400"
                        }`}
                      >
                        {i + 1 < currentSection ? <Check className="w-5 h-5" /> : i + 1}
                      </div>
                      {i < totalSections - 1 && (
                        <div className="flex-1 h-1 mx-2">
                          <div
                            className={`h-full rounded transition-all ${
                              i + 1 < currentSection
                                ? "bg-gradient-to-r from-purple-600 to-pink-600"
                                : "bg-slate-700"
                            }`}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-center text-slate-300 text-sm font-medium">
                  Paso {currentSection} de {totalSections}
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6 mb-6 min-h-[450px]">
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
            </motion.div>
          )}

          {step === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <ResultDisplay resultado={formData.resultado} formData={formData} selectedZones={selectedZones} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Result Display Component
function ResultDisplay({ resultado, formData, selectedZones }: any) {
  const results: Record<string, any> = {
    pronacion: {
      title: 'Lucván Pronación',
      description: 'Soporte para el pie que gira hacia adentro',
      details: 'Esta plantilla está diseñada específicamente para personas con pronación excesiva, donde el pie tiende a girar hacia adentro al caminar o correr. Proporciona soporte en el arco medial y ayuda a corregir el desgaste interno del calzado, mejorando la alineación y distribución del peso corporal.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    supinacion: {
      title: 'Lucván Supinación',
      description: 'Control lateral para el pie que gira hacia afuera',
      details: 'Ideal para personas con supinación, donde el pie tiende a rodar hacia afuera. Esta plantilla ofrece control lateral y amortiguación adicional en la parte externa del pie, ayudando a distribuir mejor la presión y prevenir lesiones asociadas con este tipo de pisada.',
      gradient: 'from-purple-500 to-pink-500',
    },
    fascitis: {
      title: 'Lucván Fascitis / Espolón',
      description: 'Alivio específico para dolor plantar',
      details: 'Diseñada especialmente para personas que sufren de fascitis plantar o espolón calcáneo. Cuenta con descarga en la zona del talón, soporte del arco y amortiguación estratégica para aliviar la tensión en la fascia plantar y reducir el dolor durante la actividad diaria.',
      gradient: 'from-red-500 to-orange-500',
    },
    sport: {
      title: 'Lucván Sport',
      description: 'Alto rendimiento deportivo',
      details: 'Perfecta para atletas y personas con alta actividad física. Ofrece máxima amortiguación, estabilidad y control durante movimientos de alto impacto. Su diseño optimiza el rendimiento deportivo mientras protege las articulaciones y reduce la fatiga muscular.',
      gradient: 'from-green-500 to-emerald-500',
    },
    soporte: {
      title: 'Lucván Soporte',
      description: 'Refuerzo estructural del pie',
      details: 'Recomendada para personas con pie plano, pie cavo o necesidades de soporte adicional. Proporciona un refuerzo firme del arco y estabilidad estructural, ayudando a mantener una postura correcta y reducir la fatiga en pies que requieren mayor apoyo.',
      gradient: 'from-indigo-500 to-purple-500',
    },
    confort: {
      title: 'Lucván Confort',
      description: 'Comodidad para el día a día',
      details: 'Ideal para uso diario y prevención. Esta plantilla ligera ofrece comodidad óptima durante largas jornadas, reduce la fatiga y previene molestias futuras. Perfecta para personas sin condiciones específicas que buscan mejorar su bienestar general.',
      gradient: 'from-cyan-500 to-blue-500',
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
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 md:p-12 text-center">
      <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30 flex items-center justify-center">
        <Check className="w-10 h-10 text-cyan-400" />
      </div>

      <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
        Tu resultado es:
      </h2>
      
      <div className={`inline-block px-6 py-3 rounded-xl bg-gradient-to-r ${result.gradient} text-white font-bold text-2xl mb-6`}>
        {result.title}
      </div>

      <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
        {result.details}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
        <button
          onClick={handleWhatsApp}
          className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
        >
          Agendar consulta
        </button>
        <Link
          href="/"
          className="px-8 py-4 rounded-xl border-2 border-slate-700 text-slate-300 font-semibold hover:border-purple-500 hover:text-purple-400 transition-all"
        >
          Volver al inicio
        </Link>
      </div>

      <button
        onClick={handleDownloadPDF}
        className="px-6 py-3 rounded-xl border-2 border-slate-600 text-slate-300 font-semibold hover:border-cyan-500 hover:text-cyan-400 transition-all inline-flex items-center gap-2"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        Descargar resultado en PDF
      </button>
    </div>
  );
}

// Section Components
function Section1({ formData, onChange, validationErrors }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white mb-1">Perfil Básico</h3>
        <p className="text-sm text-slate-400">Información sobre su experiencia previa y características físicas</p>
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
        <h3 className="text-xl font-bold text-white mb-1">Zonas de Molestia</h3>
        <p className="text-sm text-slate-400">Identifique las áreas donde experimenta dolor o incomodidad</p>
      </div>

      <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700">
        <label className="block text-base font-medium text-slate-200 mb-4">
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
        
        <p className="text-center text-slate-400 text-sm">
          Haz clic en las zonas donde sientes molestia
        </p>
      </div>

      <QuestionRadio
        label="Intensidad del dolor"
        name="intensidadDolor"
        value={formData.intensidadDolor}
        onChange={onChange}
        hasError={selectedZones.size === 0 && validationErrors?.has('intensidadDolor')}
        options={[
          { value: '0', label: '😊 Sin dolor' },
          { value: '3', label: '😐 Leve' },
          { value: '5', label: '😕 Moderado' },
          { value: '7', label: '😣 Fuerte' },
          { value: '10', label: '😫 Intenso' },
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
    const updated = current.includes(value)
      ? current.filter((v: string) => v !== value)
      : [...current, value];
    onChange('condiciones', updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white mb-1">Condiciones del Pie</h3>
        <p className="text-sm text-slate-400">Seleccione las condiciones que apliquen a su caso</p>
      </div>

      <div>
        <label className={`block text-base font-medium mb-4 ${
          validationErrors?.has('condiciones') ? 'text-red-400' : 'text-slate-200'
        }`}>
          ¿Te han diagnosticado alguna de estas condiciones?
        </label>
        <div className="space-y-3">
          {conditions.map((condition) => {
            const isChecked = (formData.condiciones || []).includes(condition.value);
            return (
              <button
                key={condition.value}
                onClick={() => handleCheckboxChange(condition.value)}
                className={`w-full text-left px-5 py-4 rounded-lg border-2 transition-all ${
                  isChecked
                    ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                    : validationErrors?.has('condiciones')
                    ? 'border-red-500 bg-red-500/5 text-slate-300 hover:border-red-400'
                    : 'border-slate-600 bg-slate-800/30 text-slate-300 hover:border-slate-500'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    isChecked
                      ? 'border-cyan-500 bg-cyan-500'
                      : 'border-slate-500'
                  }`}>
                    {isChecked && (
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    )}
                  </div>
                  <span className="font-medium">{condition.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Section4({ formData, onChange, validationErrors }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white mb-1">Calzado y Pisada</h3>
        <p className="text-sm text-slate-400">Información sobre su tipo de calzado y patrón de desgaste</p>
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
        <h3 className="text-xl font-bold text-white mb-1">Objetivos</h3>
        <p className="text-sm text-slate-400">¿Qué espera lograr con las plantillas ortopédicas?</p>
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

// Helper Component
function QuestionRadio({ label, name, value, onChange, options, hasError }: any) {
  return (
    <div>
      <label className={`block text-base font-medium mb-4 ${
        hasError ? 'text-red-400' : 'text-slate-200'
      }`}>
        {label}
        {hasError && <span className="text-red-400 ml-2">*</span>}
      </label>
      <div className="space-y-3">
        {options.map((option: any) => (
          <button
            key={option.value}
            onClick={() => onChange(name, option.value)}
            className={`w-full text-left px-5 py-4 rounded-lg border-2 transition-all ${
              value === option.value
                ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                : hasError
                ? 'border-red-500 bg-red-500/5 text-slate-300 hover:border-red-400'
                : 'border-slate-600 bg-slate-800/30 text-slate-300 hover:border-slate-500'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                value === option.value
                  ? 'border-cyan-500'
                  : hasError
                  ? 'border-red-500'
                  : 'border-slate-500'
              }`}>
                {value === option.value && (
                  <div className="w-3 h-3 rounded-full bg-cyan-500" />
                )}
              </div>
              <span className="font-medium">{option.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
