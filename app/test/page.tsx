"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function TestPage() {
  const [step, setStep] = useState<"welcome" | "test" | "result">("welcome");
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [currentSection, setCurrentSection] = useState(1);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [selectedZones, setSelectedZones] = useState<Set<string>>(new Set());

  const totalSections = 5;

  const ageOptions = [
    { value: "18-30", emoji: "👟", label: "18-30" },
    { value: "31-45", emoji: "🚶", label: "31-45" },
    { value: "46-60", emoji: "🧘", label: "46-60" },
    { value: "60+", emoji: "👴", label: "60+" },
  ];

  const startTest = () => {
    if (!selectedAge) return;
    setFormData({ ...formData, "rango-edad": selectedAge });
    setStep("test");
  };

  const nextSection = () => {
    if (currentSection < totalSections) {
      setCurrentSection(currentSection + 1);
    } else {
      // Calculate result
      setStep("result");
    }
  };

  const prevSection = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-width: 900px;">
        <AnimatePresence mode="wait">
          {step === "welcome" && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-slate-900/95 backdrop-blur-xl rounded-3xl p-12 border border-slate-700/50 shadow-2xl"
            >
              <Link href="/" className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-8 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                Volver al inicio
              </Link>

              <div className="text-center mb-12">
                <div className="flex justify-center mb-6">
                  <Image
                    src="/plantillas/lucvan-logo-web.png"
                    alt="Lucvan"
                    width={140}
                    height={60}
                    className="opacity-90"
                  />
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-200 via-pink-200 to-cyan-200 bg-clip-text text-transparent mb-4">
                  Descubre tu plantilla Lucvan ideal
                </h1>
                <p className="text-lg text-slate-300">
                  Escoge tu rango de edad para iniciar el test
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {ageOptions.map((option) => (
                  <motion.button
                    key={option.value}
                    onClick={() => setSelectedAge(option.value)}
                    className={`p-8 rounded-2xl border-2 transition-all ${
                      selectedAge === option.value
                        ? "border-purple-500 bg-purple-500/10 scale-105"
                        : "border-slate-700 bg-slate-800/50 hover:border-purple-400 hover:bg-purple-500/5"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-5xl mb-3">{option.emoji}</div>
                    <div className={`text-xl font-bold ${
                      selectedAge === option.value
                        ? "bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent"
                        : "text-slate-200"
                    }`}>
                      {option.label}
                    </div>
                  </motion.button>
                ))}
              </div>

              <motion.button
                onClick={startTest}
                disabled={!selectedAge}
                className="w-full py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all"
                whileHover={selectedAge ? { scale: 1.02 } : {}}
                whileTap={selectedAge ? { scale: 0.98 } : {}}
              >
                Comenzar el test →
              </motion.button>

              <p className="text-center text-slate-400 text-sm mt-6 italic">
                Este test no sustituye una valoración médica profesional
              </p>
            </motion.div>
          )}

          {step === "test" && (
            <motion.div
              key="test"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-slate-900/95 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-slate-700/50 shadow-2xl"
            >
              {/* Progress */}
              <div className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  {Array.from({ length: totalSections }, (_, i) => (
                    <div key={i} className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                          i + 1 < currentSection
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                            : i + 1 === currentSection
                            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                            : "bg-slate-700 text-slate-400"
                        }`}
                      >
                        {i + 1 < currentSection ? <Check className="w-5 h-5" /> : i + 1}
                      </div>
                      {i < totalSections - 1 && (
                        <div
                          className={`h-1 w-12 md:w-20 ${
                            i + 1 < currentSection
                              ? "bg-gradient-to-r from-purple-600 to-pink-600"
                              : "bg-slate-700"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-center text-slate-300 text-sm">
                  Sección {currentSection} de {totalSections}
                </p>
              </div>

              {/* Section content */}
              <div className="min-h-[400px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSection}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    {currentSection === 1 && <Section1 formData={formData} onChange={handleInputChange} />}
                    {currentSection === 2 && <Section2 formData={formData} onChange={handleInputChange} selectedZones={selectedZones} toggleZone={toggleZone} />}
                    {currentSection === 3 && <Section3 formData={formData} onChange={handleInputChange} />}
                    {currentSection === 4 && <Section4 formData={formData} onChange={handleInputChange} />}
                    {currentSection === 5 && <Section5 formData={formData} onChange={handleInputChange} />}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div className="flex gap-4 mt-10">
                <motion.button
                  onClick={prevSection}
                  disabled={currentSection === 1}
                  className="px-6 py-3 rounded-full border-2 border-slate-700 text-slate-300 font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:border-purple-500 hover:text-purple-400 transition-all"
                  whileHover={currentSection > 1 ? { scale: 1.02 } : {}}
                  whileTap={currentSection > 1 ? { scale: 0.98 } : {}}
                >
                  ← Anterior
                </motion.button>
                <motion.button
                  onClick={nextSection}
                  className="flex-1 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {currentSection === totalSections ? "Ver Resultado" : "Siguiente →"}
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-900/95 backdrop-blur-xl rounded-3xl p-12 border border-slate-700/50 shadow-2xl text-center"
            >
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent mb-6">
                Tu Plantilla Recomendada
              </h2>
              <p className="text-slate-300 mb-8">
                Basado en tus respuestas, te recomendamos contactarnos para una evaluación personalizada.
              </p>
              <div className="flex gap-4 justify-center">
                <Link
                  href="/#contacto"
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Agendar Evaluación
                </Link>
                <Link
                  href="/"
                  className="px-8 py-4 rounded-full border-2 border-slate-700 text-slate-300 font-semibold hover:border-purple-500 hover:text-purple-400 transition-all"
                >
                  Volver al inicio
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Section components
function Section1({ formData, onChange }: any) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white mb-6">Perfil básico</h2>
      
      <QuestionRadio
        label="¿Has usado plantillas antes?"
        name="plantillas-previas"
        options={[
          { value: "actualmente", label: "Sí, actualmente" },
          { value: "antes", label: "Las usé antes" },
          { value: "nunca", label: "Nunca" },
        ]}
        value={formData["plantillas-previas"]}
        onChange={onChange}
      />

      <QuestionRadio
        label="Sexo"
        name="sexo"
        options={[
          { value: "masculino", label: "Masculino" },
          { value: "femenino", label: "Femenino" },
          { value: "otro", label: "Otro" },
        ]}
        value={formData["sexo"]}
        onChange={onChange}
      />

      <QuestionRadio
        label="Nivel de actividad física"
        name="actividad"
        options={[
          { value: "sedentario", label: "🛋️ Sedentario" },
          { value: "moderado", label: "🚶 Moderado" },
          { value: "alto", label: "🏃 Activo" },
          { value: "atleta", label: "💪 Atleta" },
        ]}
        value={formData["actividad"]}
        onChange={onChange}
      />
    </div>
  );
}

function Section2({ formData, onChange, selectedZones, toggleZone }: any) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white mb-6">Zonas de molestia</h2>
      <p className="text-slate-300 text-sm mb-4">
        Selecciona las zonas donde sientes molestia (opcional)
      </p>
    </div>
  );
}

function Section3({ formData, onChange }: any) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white mb-6">Condiciones del pie</h2>
      <p className="text-slate-300">Sección en desarrollo...</p>
    </div>
  );
}

function Section4({ formData, onChange }: any) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white mb-6">Calzado y pisada</h2>
      <p className="text-slate-300">Sección en desarrollo...</p>
    </div>
  );
}

function Section5({ formData, onChange }: any) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white mb-6">Objetivos</h2>
      <p className="text-slate-300">Sección en desarrollo...</p>
    </div>
  );
}

function QuestionRadio({ label, name, options, value, onChange }: any) {
  return (
    <div>
      <label className="block text-slate-200 font-semibold mb-4">{label}</label>
      <div className="grid gap-3">
        {options.map((option: any) => (
          <label
            key={option.value}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
              value === option.value
                ? "border-purple-500 bg-purple-500/10"
                : "border-slate-700 bg-slate-800/50 hover:border-purple-400"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(name, e.target.value)}
              className="sr-only"
            />
            <span className="text-slate-200">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
