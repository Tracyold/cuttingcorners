import { useState } from 'react';
import { useRouter } from 'next/router';

const questions = [
  {
    id: 'weight',
    question: 'What is the weight of your gemstone?',
    options: ['Under 1ct', '1–3ct', '3–5ct', '5–10ct', 'Over 10ct'],
  },
  {
    id: 'color',
    question: 'What is the color of your gemstone?',
    options: ['Colorless', 'Yellow', 'Blue', 'Green', 'Red', 'Pink', 'Purple', 'Orange', 'Brown', 'Black', 'Other'],
  },
  {
    id: 'shape',
    question: 'What is the shape of your gemstone?',
    options: ['Round', 'Oval', 'Cushion', 'Emerald', 'Pear', 'Marquise', 'Heart', 'Trillion', 'Other'],
  },
  {
    id: 'damage',
    question: 'How is your gemstone damaged?',
    options: ['Scratched', 'Chipped', 'Abraded facets', 'Broken', 'Poorly cut', 'No damage — recut for optics', 'Multiple issues'],
  },
  {
    id: 'species',
    question: 'What is the species of your gemstone?',
    options: ['Corundum (Sapphire / Ruby)', 'Beryl (Emerald / Aquamarine)', 'Chrysoberyl', 'Quartz', 'Tourmaline', 'Spinel', 'Garnet', 'Topaz', 'Other'],
  },
  {
    id: 'transparency',
    question: 'Is your gemstone transparent, translucent, or opaque?',
    options: ['Transparent', 'Translucent', 'Opaque'],
  },
  {
    id: 'service',
    question: 'What kind of cutting service do you need an estimate for?',
    options: [
      'Full recut',
      'Rough to finish',
      'Full repolish',
      'Crown repolish',
      'Crown cut and repolish',
      'Pavilion recut and repolish',
      'Girdle polish',
    ],
  },
];

export default function InstantEstimate() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState('');

  const current = questions[step];
  const isLast = step === questions.length - 1;
  const progress = (step / questions.length) * 100;

  function handleNext() {
    if (!selected) return;
    const updated = { ...answers, [current.id]: selected };
    setAnswers(updated);
    if (isLast) {
      const params = new URLSearchParams(updated).toString();
      router.push(`/estimate/result?${params}`);
    } else {
      setStep(step + 1);
      setSelected('');
    }
  }

  function handleBack() {
    if (step === 0) { router.push('/estimates'); return; }
    setSelected(answers[questions[step - 1].id] || '');
    setStep(step - 1);
  }

  return (
    <>
      <style>{`
        .eq-wrap {
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 120px 24px 60px;
          background: #050505;
        }
        .eq-inner { width: 100%; max-width: 580px; }
        .eq-progress-bar {
          width: 100%;
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin-bottom: 48px;
          position: relative;
        }
        .eq-progress-fill {
          position: absolute;
          top: 0; left: 0; height: 100%;
          background: rgba(212,175,55,0.6);
          transition: width 300ms ease;
        }
        .eq-step {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(212,175,55,0.7);
          margin-bottom: 20px;
        }
        .eq-question {
          font-family: 'Oranienbaum', serif;
          font-size: clamp(27px, 5vw, 42px);
          color: #FAFAFA;
          line-height: 1.2;
          margin-bottom: 48px;
        }
        .eq-options {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 48px;
        }
        .eq-option {
          padding: 17px 22px;
          border: 1px solid rgba(255,255,255,0.08);
          background: transparent;
          color: rgba(255,255,255,0.7);
          font-family: 'Montserrat', sans-serif;
          font-size: 15px;
          text-align: left;
          cursor: pointer;
          transition: all 150ms;
          letter-spacing: 0.02em;
        }
        .eq-option:hover {
          border-color: rgba(212,175,55,0.4);
          color: rgba(255,255,255,0.95);
          background: rgba(212,175,55,0.04);
        }
        .eq-option.selected {
          border-color: rgba(212,175,55,0.9);
          color: #FAFAFA;
          background: rgba(212,175,55,0.08);
        }
        .eq-actions { display: flex; gap: 12px; align-items: center; }
        .eq-btn-next {
          padding: 15px 36px;
          background: #d4af37;
          border: none;
          color: #050505;
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          cursor: pointer;
          transition: opacity 150ms;
        }
        .eq-btn-next:disabled { opacity: 0.3; cursor: not-allowed; }
        .eq-btn-back {
          padding: 15px 22px;
          background: none;
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.4);
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
        }
      `}</style>
      <div className="eq-wrap">
        <div className="eq-inner">
          <div className="eq-progress-bar">
            <div className="eq-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <p className="eq-step">{step + 1} of {questions.length}</p>
          <h1 className="eq-question">{current.question}</h1>
          <div className="eq-options">
            {current.options.map(opt => (
              <button
                key={opt}
                className={`eq-option${selected === opt ? ' selected' : ''}`}
                onClick={() => setSelected(opt)}>
                {opt}
              </button>
            ))}
          </div>
          <div className="eq-actions">
            <button className="eq-btn-back" onClick={handleBack}>
              {step === 0 ? 'Back' : 'Previous'}
            </button>
            <button className="eq-btn-next" disabled={!selected} onClick={handleNext}>
              {isLast ? 'Get Estimate' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
