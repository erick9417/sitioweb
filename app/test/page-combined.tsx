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
  const [validationErrors, setValidationErrors] = useState<Set<string>>(new Set());

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
  };

  const validateSection = () => {
    return true;
  };

  const nextSection = () => {
    if (!validateSection()) return;
    
    if (currentSection < totalSections) {
      setCurrentSection(currentSection + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setFormData({ ...formData, resultado: 'confort' });
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
                Evaluación de Plantillas Ortopédicas
              </h1>
              
              <p className={styles.welcomeSubtitle}>
                Completa esta evaluación para descubrir qué tipo de plantilla se adapta mejor a tus necesidades
              </p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className={styles.formCard}
              >
                <div>
                  <label className={styles.questionLabel}>
                    Selecciona tu rango de edad *
                  </label>
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
                Continuar con la evaluación
              </motion.button>

              <p className={styles.disclaimer}>
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
                Paso {currentSection} de {totalSections}
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
            <ResultDisplay resultado={formData.resultado} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ResultDisplay({ resultado }: any) {
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
        Volver al inicio
      </Link>
    </div>
  );
}

function Section1({ formData, onChange }: any) {
  return (
    <div className={styles.sectionContent}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>Perfil básico</h3>
        <p className={styles.sectionSubtitle}>Información sobre su experiencia previa</p>
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
          { value: 'bajo-160', label: 'Menos de 1.60m' },
          { value: '160-175', label: '1.60 - 1.75m' },
          { value: '175-mas', label: 'Más de 1.75m' },
        ]} />

      <QuestionRadio label="Peso aproximado" name="peso" value={formData.peso} onChange={onChange}
        options={[
          { value: 'bajo-60', label: 'Menos de 60kg' },
          { value: '60-80', label: '60 - 80kg' },
          { value: '80-100', label: '80 - 100kg' },
          { value: '100-mas', label: 'Más de 100kg' },
        ]} />

      <QuestionRadio label="Nivel de actividad física" name="actividad" value={formData.actividad} onChange={onChange}
        options={[
          { value: 'sedentario', label: 'Sedentario' },
          { value: 'moderado', label: 'Moderado' },
          { value: 'alto', label: 'Activo' },
          { value: 'atleta', label: 'Atleta' },
        ]} />

      <QuestionRadio label="¿Cuántas horas pasas de pie al día?" name="horas-pie" value={formData['horas-pie']} onChange={onChange}
        options={[
          { value: '1-2', label: '1-2 horas' },
          { value: '3-5', label: '3-5 horas' },
          { value: '6-8', label: '6-8 horas' },
          { value: 'mas-8', label: 'Más de 8 horas' },
        ]} />
    </div>
  );
}

function Section2({ formData, onChange, selectedZones, toggleZone }: any) {
  return (
    <div className={styles.sectionContent}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>Zonas de molestia</h3>
        <p className={styles.sectionSubtitle}>Identifique las áreas donde experimenta dolor</p>
      </div>

      <QuestionRadio label="Tipo de dolor" name="tipo-dolor" value={formData['tipo-dolor']} onChange={onChange}
        options={[
          { value: 'punzante', label: 'Dolor punzante' },
          { value: 'ardor', label: 'Ardor' },
          { value: 'fatiga', label: 'Fatiga' },
          { value: 'rigidez', label: 'Rigidez' },
        ]} />

      <QuestionRadio label="Intensidad del dolor" name="intensidad-dolor" value={formData['intensidad-dolor']} onChange={onChange}
        options={[
          { value: '0', label: 'Sin dolor' },
          { value: '3', label: 'Leve' },
          { value: '5', label: 'Moderado' },
          { value: '7', label: 'Fuerte' },
          { value: '10', label: 'Intenso' },
        ]} />
    </div>
  );
}

function Section3({ formData, onChange }: any) {
  return (
    <div className={styles.sectionContent}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>Condiciones del pie</h3>
        <p className={styles.sectionSubtitle}>Seleccione las condiciones que apliquen</p>
      </div>

      <div className={styles.questionCard}>
        <label className={styles.questionLabel}>¿Te han diagnosticado alguna de estas condiciones?</label>
        <div className={styles.optionsGrid}>
          {[
            { value: 'pie-plano', label: 'Pie plano' },
            { value: 'pie-cavo', label: 'Pie cavo (arco alto)' },
            { value: 'metatarsalgia', label: 'Metatarsalgia' },
            { value: 'fascitis', label: 'Fascitis plantar' },
            { value: 'espolon', label: 'Espolón calcáneo' },
            { value: 'ninguna', label: 'Ninguna' },
          ].map(option => (
            <button
              key={option.value}
              onClick={() => {
                const current = formData.condiciones || [];
                const updated = current.includes(option.value)
                  ? current.filter((v: string) => v !== option.value)
                  : [...current, option.value];
                onChange('condiciones', updated);
              }}
              className={`${styles.optionCard} ${(formData.condiciones || []).includes(option.value) ? styles.selected : ''}`}
            >
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Section4({ formData, onChange }: any) {
  return (
    <div className={styles.sectionContent}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>Pisada y calzado</h3>
        <p className={styles.sectionSubtitle}>Información sobre su tipo de pisada</p>
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
        <p className={styles.sectionSubtitle}>¿Qué te gustaría mejorar?</p>
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
