"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import styles from './test.module.css';

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
    handleInputChange('zonas-dolor', Array.from(newZones).join(','));
  };

  const nextSection = () => {
    if (currentSection < totalSections) {
      setCurrentSection(currentSection + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setStep("result");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevSection = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.pageTest}>
      <AnimatePresence mode="wait">
        {step === "welcome" && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={styles.welcomeScreen}
          >
            <div className={styles.welcomeCard}>
              <h1 className={styles.welcomeTitle}>
                Descubre tu plantilla Lucván ideal
              </h1>
              
              <p className={styles.welcomeSubtitle}>
                Escoge tu rango de edad para iniciar el test
              </p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className={styles.formCard}
              >
                <div>
                  <div className={styles.ageSelection}>
                    {[
                      { value: '18-30', label: '18-30', emoji: '👟' },
                      { value: '31-45', label: '31-45', emoji: '🚶' },
                      { value: '46-60', label: '46-60', emoji: '🧘' },
                      { value: '60+', label: '60+', emoji: '👴' },
                    ].map((age) => (
                      <div
                        key={age.value}
                        onClick={() => handleInputChange('edad', age.value)}
                        className={`${styles.ageOption} ${formData.edad === age.value ? styles.selected : ''}`}
                      >
                        <div className={styles.ageCard}>
                          <span className={styles.ageEmoji}>{age.emoji}</span>
                          <span className={styles.ageLabel}>{age.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                onClick={startTest}
                disabled={!formData.edad}
                className={styles.btnPrimary}
              >
                Comenzar el test →
              </motion.button>

              <p className={styles.disclaimer}>
                Este test no sustituye una valoración médica profesional
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
          >
            <div className={styles.progressBar}>
              <div className={styles.progressSteps}>
                {Array.from({ length: totalSections }, (_, i) => (
                  <div key={i} className={styles.progressStep}>
                    <div className={`${styles.stepCircle} ${i + 1 < currentSection ? styles.completed : i + 1 === currentSection ? styles.active : ''}`}>
                      {i + 1 < currentSection ? <Check className="w-5 h-5" /> : i + 1}
                    </div>
                    {i < totalSections - 1 && (
                      <div className={`${styles.stepLine} ${i + 1 < currentSection ? styles.completed : ''}`} />
                    )}
                  </div>
                ))}
              </div>
              <p className={styles.progressText}>
                Sección {currentSection} de {totalSections}
              </p>
            </div>

            <div className={styles.sectionContainer}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSection}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentSection === 1 && <Section1 formData={formData} onChange={handleInputChange} />}
                  {currentSection === 2 && <Section2 formData={formData} onChange={handleInputChange} selectedZones={selectedZones} toggleZone={toggleZone} />}
                  {currentSection === 3 && <Section3 formData={formData} onChange={handleInputChange} />}
                  {currentSection === 4 && <Section4 formData={formData} onChange={handleInputChange} />}
                  {currentSection === 5 && <Section5 formData={formData} onChange={handleInputChange} />}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className={styles.navigationButtons}>
              <motion.button
                onClick={prevSection}
                disabled={currentSection === 1}
                className={styles.btnSecondary}
                whileHover={currentSection > 1 ? { scale: 1.02 } : {}}
                whileTap={currentSection > 1 ? { scale: 0.98 } : {}}
              >
                <ArrowLeft className="w-4 h-4" />
                Anterior
              </motion.button>

              <motion.button
                onClick={nextSection}
                className={styles.btnPrimary}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {currentSection === totalSections ? 'Ver resultados →' : 'Siguiente →'}
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
            <ResultDisplay />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ResultDisplay() {
  return (
    <div className={styles.resultScreen}>
      <div className={styles.resultCard}>
        <div className={styles.resultInfo}>
          <p className={styles.resultLabel}>TU RESULTADO ES:</p>
          <h1 className={styles.resultTitle}>Plantilla Recomendada</h1>
          <p className={styles.resultDescription}>Hemos analizado tus respuestas y recomendamos una plantilla personalizada para tu bienestar.</p>
          <div className={styles.resultActions}>
            <button className={styles.btnPrimary}>Agendar consulta</button>
            <button className={styles.btnSecondary}>Descargar resultado</button>
          </div>
        </div>
        <div className={styles.resultMedia}>
          <img src="/plantillas/Lab.webp" alt="Resultado" />
        </div>
      </div>
      <Link href="/" className={styles.backButton}>
        ← Volver al inicio
      </Link>
    </div>
  );
}

function Section1({ formData, onChange }: any) {
  return (
    <div className={styles.sectionContent}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>Perfil básico</h3>
      </div>

      <QuestionRadio label="¿Has usado plantillas antes?" name="plantillas-previas" value={formData['plantillas-previas']} onChange={onChange}
        options={[
          { value: 'actualmente', label: 'Sí, actualmente' },
          { value: 'antes', label: 'Las usé antes' },
          { value: 'nunca', label: 'Nunca' },
        ]} />

      <QuestionRadio label="Sexo" name="sexo" value={formData.sexo} onChange={onChange}
        options={[
          { value: 'masculino', label: 'Masculino' },
          { value: 'femenino', label: 'Femenino' },
          { value: 'otro', label: 'Otro' },
        ]} />

      <QuestionRadio label="Estatura" name="estatura" value={formData.estatura} onChange={onChange}
        options={[
          { value: 'bajo-160', label: '👤 Menos de 1.60m' },
          { value: '160-175', label: '👤 1.60 - 1.75m' },
          { value: '175-mas', label: '👤 Más de 1.75m' },
        ]} />

      <QuestionRadio label="Peso aproximado" name="peso" value={formData.peso} onChange={onChange}
        options={[
          { value: 'bajo-60', label: '⚖️ Menos de 60kg' },
          { value: '60-80', label: '⚖️ 60 - 80kg' },
          { value: '80-100', label: '⚖️ 80 - 100kg' },
          { value: '100-mas', label: '⚖️ Más de 100kg' },
        ]} />

      <QuestionRadio label="Nivel de actividad física" name="actividad" value={formData.actividad} onChange={onChange}
        options={[
          { value: 'sedentario', label: '🛋️ Sedentario' },
          { value: 'moderado', label: '🚶 Moderado' },
          { value: 'alto', label: '🏃 Activo' },
          { value: 'atleta', label: '💪 Atleta' },
        ]} />

      <QuestionRadio label="¿Cuántas horas pasas de pie al día?" name="horas-pie" value={formData['horas-pie']} onChange={onChange}
        options={[
          { value: '1-2', label: '⏰ 1-2 horas' },
          { value: '3-5', label: '⏰ 3-5 horas' },
          { value: '6-8', label: '⏰ 6-8 horas' },
          { value: 'mas-8', label: '⏰ Más de 8 horas' },
        ]} />
    </div>
  );
}

function Section2({ formData, onChange, selectedZones, toggleZone }: any) {
  return (
    <div className={styles.sectionContent}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>Zonas de molestia</h3>
      </div>

      <div className={styles.questionCard}>
        <label className={styles.questionLabel}>¿Dónde sientes más incomodidad o dolor?</label>
        <div className={styles.footDiagram}>
          <svg className={styles.footSvg} viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <style>{`
                .foot-zone { cursor: pointer; transition: all 0.2s ease; }
                .foot-zone:hover { opacity: 0.8; }
                .foot-zone.active { fill: #FF3CA6; }
              `}</style>
            </defs>
            <path d="M 50 10 L 60 40 L 65 70 L 60 120 L 50 180 L 40 120 L 35 70 L 40 40 Z" fill="none" stroke="#2affc0" strokeWidth="1.5" opacity="0.5"/>
            
            {/* Zona: Dedos */}
            <ellipse cx="50" cy="25" rx="12" ry="10" className={`foot-zone ${selectedZones.has('dedos') ? 'active' : ''}`} fill="#4a5568" opacity="0.3" onClick={() => toggleZone('dedos')} />
            
            {/* Zona: Metatarsos */}
            <ellipse cx="50" cy="50" rx="15" ry="12" className={`foot-zone ${selectedZones.has('metatarsos') ? 'active' : ''}`} fill="#4a5568" opacity="0.3" onClick={() => toggleZone('metatarsos')} />
            
            {/* Zona: Arco interno */}
            <ellipse cx="32" cy="85" rx="10" ry="20" className={`foot-zone ${selectedZones.has('arco-interno') ? 'active' : ''}`} fill="#4a5568" opacity="0.3" onClick={() => toggleZone('arco-interno')} />
            
            {/* Zona: Arco externo */}
            <ellipse cx="68" cy="85" rx="10" ry="20" className={`foot-zone ${selectedZones.has('arco-externo') ? 'active' : ''}`} fill="#4a5568" opacity="0.3" onClick={() => toggleZone('arco-externo')} />
            
            {/* Zona: Talón */}
            <ellipse cx="50" cy="155" rx="14" ry="18" className={`foot-zone ${selectedZones.has('talon') ? 'active' : ''}`} fill="#4a5568" opacity="0.3" onClick={() => toggleZone('talon')} />
          </svg>
          <p className={styles.footInstruction}>Haz clic en las zonas donde sientes molestia</p>
        </div>
      </div>

      <QuestionCheckbox label="Tipo de dolor" name="tipo-dolor" value={formData['tipo-dolor']} onChange={onChange}
        options={[
          { value: 'punzante', label: 'Dolor punzante' },
          { value: 'ardor', label: 'Ardor' },
          { value: 'fatiga', label: 'Fatiga' },
          { value: 'rigidez', label: 'Rigidez' },
        ]} />

      <div className={styles.questionCard}>
        <label className={styles.questionLabel}>Intensidad del dolor</label>
        <div className={styles.painScale}>
          {[
            { value: '0', label: 'Sin dolor' },
            { value: '3', label: 'Leve' },
            { value: '5', label: 'Moderado' },
            { value: '7', label: 'Fuerte' },
            { value: '10', label: 'Intenso' },
          ].map(option => (
            <button
              key={option.value}
              onClick={() => onChange('intensidad-dolor', option.value)}
              className={`${styles.painOption} ${formData['intensidad-dolor'] === option.value ? styles.selected : ''}`}
            >
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Section3({ formData, onChange }: any) {
  return (
    <div className={styles.sectionContent}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>Condiciones del pie</h3>
      </div>

      <QuestionCheckbox label="¿Te han dicho que tienes alguna de estas condiciones?" name="condiciones" value={formData.condiciones} onChange={onChange}
        options={[
          { value: 'pie-plano', label: 'Pie plano' },
          { value: 'pie-cavo', label: 'Pie cavo (arco alto)' },
          { value: 'metatarsalgia', label: 'Metatarsalgia' },
          { value: 'fascitis', label: 'Fascitis plantar' },
          { value: 'espolon', label: 'Espolón calcáneo' },
          { value: 'ninguna', label: 'Ninguna' },
        ]} />
    </div>
  );
}

function Section4({ formData, onChange }: any) {
  return (
    <div className={styles.sectionContent}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>Pisada y calzado</h3>
      </div>

      <QuestionRadio label="¿Dónde se desgasta más tu calzado?" name="desgaste" value={formData.desgaste} onChange={onChange}
        options={[
          { value: 'interno', label: 'Parte interna' },
          { value: 'externo', label: 'Parte externa' },
          { value: 'sin-desgaste', label: 'No presenta desgaste' },
        ]} />

      <QuestionRadio label="¿Sientes que cargas más un pie que otro?" name="carga-pie" value={formData['carga-pie']} onChange={onChange}
        options={[
          { value: 'derecho', label: 'Derecho' },
          { value: 'izquierdo', label: 'Izquierdo' },
          { value: 'igual', label: 'No, ambos igual' },
        ]} />
    </div>
  );
}

function Section5({ formData, onChange }: any) {
  return (
    <div className={styles.sectionContent}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>Objetivos</h3>
      </div>

      <QuestionRadio label="¿Qué te gustaría mejorar con las plantillas?" name="objetivos" value={formData.objetivos} onChange={onChange}
        options={[
          { value: 'aliviar-dolor', label: 'Aliviar el dolor' },
          { value: 'alineacion', label: 'Mejorar la alineación' },
          { value: 'rendimiento', label: 'Mejorar el rendimiento deportivo' },
          { value: 'prevencion', label: 'Prevención / confort' },
        ]} />
    </div>
  );
}

function QuestionRadio({ label, name, value, onChange, options }: any) {
  return (
    <div className={styles.questionCard}>
      <label className={styles.questionLabel}>{label}</label>
      <div className={styles.optionsGrid}>
        {options.map((option: any) => (
          <button
            key={option.value}
            onClick={() => onChange(name, option.value)}
            className={`${styles.optionCard} ${value === option.value ? styles.selected : ''}`}
          >
            <span>{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function QuestionCheckbox({ label, name, value, onChange, options }: any) {
  return (
    <div className={styles.questionCard}>
      <label className={styles.questionLabel}>{label}</label>
      <div className={styles.optionsGrid}>
        {options.map((option: any) => (
          <button
            key={option.value}
            onClick={() => {
              const current = value || [];
              const updated = current.includes(option.value)
                ? current.filter((v: string) => v !== option.value)
                : [...current, option.value];
              onChange(name, updated);
            }}
            className={`${styles.optionCard} ${(value || []).includes(option.value) ? styles.selected : ''}`}
          >
            <span>{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
