import Head from 'next/head';
import { useState } from 'react';

export default function TestPage() {
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});

  const ageRanges = [
    { label: '18-30 años', value: '18-30', emoji: '👟' },
    { label: '31-45 años', value: '31-45', emoji: '🚶' },
    { label: '46-60 años', value: '46-60', emoji: '🧘' },
    { label: '60+ años', value: '60+', emoji: '👴' },
  ];

  const questions = [
    {
      title: 'Información General',
      questions: [
        {
          id: 'experience',
          label: '¿Has usado plantillas antes?',
          options: ['Sí, actualmente', 'Las usé antes', 'Nunca'],
        },
        {
          id: 'gender',
          label: 'Sexo',
          options: ['Masculino', 'Femenino', 'Otro'],
        },
      ],
    },
    {
      title: 'Actividad Física',
      questions: [
        {
          id: 'activity',
          label: '¿Cuál es tu nivel de actividad?',
          options: ['Sedentario', 'Moderado', 'Muy activo', 'Atleta'],
        },
      ],
    },
    {
      title: 'Problemas de Pies',
      questions: [
        {
          id: 'problems',
          label: '¿Tienes algún problema en los pies?',
          options: ['Dolor de talón', 'Fascitis plantar', 'Pronación', 'Ninguno'],
        },
      ],
    },
  ];

  const startTest = () => {
    if (selectedAge) {
      setCurrentStep(1);
      setResponses({ age: selectedAge });
    }
  };

  const handleResponse = (questionId: string, answer: string) => {
    setResponses(prev => ({ ...prev, [questionId]: answer }));
  };

  const nextQuestion = () => {
    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      submitTest();
    }
  };

  const submitTest = () => {
    const phone = '50663819141';
    const text = `*Test Lucván Completado*\n\nEdad: ${responses.age}\n${Object.entries(responses)
      .filter(([key]) => key !== 'age')
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n')}\n\n¿Me interesa conocer más sobre plantillas Lucván!`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      <Head>
        <title>Descubre tu Plantilla Ideal | Test Lucván</title>
        <meta name="description" content="Realiza nuestro test interactivo para descubrir la plantilla Lucván perfecta para ti." />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-20 pb-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Screen */}
          {!selectedAge ? (
            <div className="text-center space-y-8">
              <h1 className="text-5xl font-bold text-white mb-4">
                Bienvenido al test, descubre si Lucván es para ti
              </h1>
              <p className="text-2xl text-cyan-400 font-bold">Escoge tu edad para iniciar el test</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {ageRanges.map(range => (
                  <button
                    key={range.value}
                    onClick={() => setSelectedAge(range.value)}
                    className="p-6 rounded-xl border-2 border-slate-600 bg-slate-900/50 text-slate-300 hover:border-cyan-400 hover:text-cyan-400 transition-all text-center font-bold text-base"
                  >
                    <div className="text-3xl mb-2">{range.emoji}</div>
                    {range.label}
                  </button>
                ))}
              </div>

              <button
                onClick={startTest}
                disabled={!selectedAge}
                className="px-8 py-4 rounded-xl text-lg font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Continuar →
              </button>

              <p className="text-slate-400 text-sm">
                * Esta evaluación es orientativa y no sustituye una consulta médica profesional
              </p>
            </div>
          ) : currentStep <= questions.length ? (
            // Test Screen
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {questions[currentStep - 1].title}
                </h2>
                <p className="text-slate-400">Sección {currentStep} de {questions.length}</p>
              </div>

              <div className="space-y-6 bg-slate-900/50 rounded-xl p-8 border border-slate-800">
                {questions[currentStep - 1].questions.map(question => (
                  <div key={question.id}>
                    <label className="block text-white font-semibold mb-4">{question.label}</label>
                    <div className="space-y-3">
                      {question.options.map(option => (
                        <label
                          key={option}
                          className="flex items-center p-4 rounded-lg border-2 border-slate-600 hover:border-cyan-400 cursor-pointer transition-all"
                        >
                          <input
                            type="radio"
                            name={question.id}
                            value={option}
                            onChange={() => handleResponse(question.id, option)}
                            className="w-4 h-4 mr-3"
                          />
                          <span className="text-slate-300">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 justify-between">
                <button
                  onClick={() => {
                    setCurrentStep(currentStep - 1);
                    if (currentStep === 1) {
                      setSelectedAge(null);
                      setResponses({});
                    }
                  }}
                  className="px-8 py-3 rounded-xl border-2 border-slate-600 text-slate-300 hover:border-cyan-400 hover:text-cyan-400 font-bold transition-all"
                >
                  ← Atrás
                </button>
                <button
                  onClick={nextQuestion}
                  className="px-8 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold transition-all"
                >
                  {currentStep === questions.length ? 'Finalizar →' : 'Siguiente →'}
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </main>
    </>
  );
}
