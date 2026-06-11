import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PenTool, Headphones, BookOpen, Volume2, Check, X, ArrowRight, RotateCcw } from 'lucide-react';
import { useI18n } from '@/i18n';
import { levels } from '@/data/courses';
import type { VocabularyItem } from '@/types';

export default function Practice() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<'writing' | 'listening' | 'reading'>('writing');

  const allVocab = levels.flatMap(l => l.lessons).flatMap(l => l.vocabulary);
  const practiceChars = allVocab.slice(0, 10);

  return (
    <div className="max-w-[1000px] mx-auto px-6 py-8">
      <motion.h1 className="font-display font-black text-4xl text-white mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {t('nav.practice')}
      </motion.h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-8">
        {[
          { key: 'writing' as const, label: t('nav.writing'), icon: PenTool },
          { key: 'listening' as const, label: t('nav.pronunciation'), icon: Headphones },
          { key: 'reading' as const, label: 'Flashcards', icon: BookOpen },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-display font-semibold transition-all ${
              activeTab === tab.key ? 'bg-[#FF3333] text-white' : 'liquid-glass text-[#a0a0a0] hover:text-white'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'writing' && <WritingTab key="writing" chars={practiceChars} />}
        {activeTab === 'listening' && <ListeningTab key="listening" chars={practiceChars} />}
        {activeTab === 'reading' && <FlashcardTab key="reading" chars={practiceChars} />}
      </AnimatePresence>
    </div>
  );
}

function WritingTab({ chars }: { chars: VocabularyItem[] }) {
  const [selectedChar, setSelectedChar] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    clearCanvas();
  }, [selectedChar]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.strokeStyle = '#FF3333';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const handleStart = (e: MouseEvent | TouchEvent) => {
      setIsDrawing(true);
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      ctx.beginPath();
      ctx.moveTo(clientX - rect.left, clientY - rect.top);
    };
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      ctx.lineTo(clientX - rect.left, clientY - rect.top);
      ctx.stroke();
    };
    const handleEnd = () => { setIsDrawing(false); ctx.closePath(); };

    canvas.addEventListener('mousedown', handleStart);
    canvas.addEventListener('mousemove', handleMove);
    canvas.addEventListener('mouseup', handleEnd);
    canvas.addEventListener('touchstart', handleStart);
    canvas.addEventListener('touchmove', handleMove);
    canvas.addEventListener('touchend', handleEnd);
    return () => {
      canvas.removeEventListener('mousedown', handleStart);
      canvas.removeEventListener('mousemove', handleMove);
      canvas.removeEventListener('mouseup', handleEnd);
      canvas.removeEventListener('touchstart', handleStart);
      canvas.removeEventListener('touchmove', handleMove);
      canvas.removeEventListener('touchend', handleEnd);
    };
  }, [isDrawing]);

  const char = chars[selectedChar];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
      {/* Character Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {chars.map((c: VocabularyItem, i: number) => (
          <button
            key={c.id}
            onClick={() => setSelectedChar(i)}
            className={`w-12 h-12 rounded-xl font-chinese text-xl transition-all ${
              i === selectedChar ? 'bg-[#FF3333] text-white' : 'liquid-glass text-[#a0a0a0] hover:text-white'
            }`}
          >
            {c.chinese}
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center">
        <div className="mb-4 text-center">
          <span className="font-chinese text-3xl text-white mr-4">{char.chinese}</span>
          <span className="font-display text-[#a0a0a0]">{char.pinyin}</span>
        </div>
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            className="rounded-xl cursor-crosshair"
            style={{ background: 'url(/images/writing-bg.jpg) center/cover', touchAction: 'none' }}
          />
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
            <line x1="200" y1="0" x2="200" y2="400" stroke="rgba(255,51,51,0.15)" strokeDasharray="4" />
            <line x1="0" y1="200" x2="400" y2="200" stroke="rgba(255,51,51,0.15)" strokeDasharray="4" />
          </svg>
        </div>
        <div className="flex gap-3 mt-4">
          <button onClick={clearCanvas} className="btn-secondary text-sm py-2 px-4 flex items-center gap-2">
            <RotateCcw size={14} /> Clear
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function ListeningTab({ chars }: { chars: VocabularyItem[] }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const currentChar = chars[current];
  const options = [currentChar, ...chars.filter((_c: VocabularyItem, i: number) => i !== current).slice(0, 3)].sort(() => Math.random() - 0.5);

  const handleAnswer = (id: string) => {
    setSelected(id);
    setShowResult(true);
  };

  const next = () => {
    setCurrent((current + 1) % chars.length);
    setSelected(null);
    setShowResult(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center">
      <div className="liquid-glass-strong p-10 max-w-[600px] mx-auto">
        <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>What word did you hear?</p>

        <button className="w-20 h-20 rounded-full bg-[#FF3333] flex items-center justify-center mx-auto mb-8 hover:scale-105 transition-transform">
          <Volume2 size={32} className="text-white" />
        </button>

        <div className="grid grid-cols-2 gap-3">
          {options.map(opt => {
            const isCorrect = opt.id === currentChar.id;
            const isSelected = selected === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => !showResult && handleAnswer(opt.id)}
                disabled={showResult}
                className={`p-4 rounded-xl border transition-all ${
                  showResult && isCorrect ? 'border-[#10b981] bg-[#10b981]/10' :
                  showResult && isSelected && !isCorrect ? 'border-[#FF3333] bg-[#FF3333]/10' :
                  'border-white/10 hover:border-[#FF3333]/30'
                }`}
              >
                <span className="font-chinese text-2xl text-white block">{opt.chinese}</span>
                <span className="text-xs text-[#a0a0a0]">{opt.pinyin}</span>
              </button>
            );
          })}
        </div>

        {showResult && (
          <motion.div className="mt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className={`font-display font-bold mb-4 ${selected === currentChar.id ? 'text-[#10b981]' : 'text-[#FF3333]'}`}>
              {selected === currentChar.id ? 'Correct!' : `The answer is: ${currentChar.chinese}`}
            </p>
            <button onClick={next} className="btn-primary text-sm py-2 px-6">
              <ArrowRight size={14} /> Next
            </button>
          </motion.div>
        )}

        <p className="text-xs mt-4" style={{ color: 'var(--color-text-tertiary)' }}>Exercise {current + 1}/{chars.length}</p>
      </div>
    </motion.div>
  );
}

function FlashcardTab({ chars }: { chars: VocabularyItem[] }) {
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);

  const char = chars[current];

  const handleNext = (isKnown: boolean) => {
    if (isKnown) setKnown(k => k + 1);
    setFlipped(false);
    setCurrent((current + 1) % chars.length);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center">
      <div className="mb-4">
        <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Card {current + 1} of {chars.length} · Known: {known}</span>
      </div>

      <motion.div
        className="liquid-glass-strong w-[320px] h-[400px] mx-auto flex flex-col items-center justify-center cursor-pointer mb-6"
        onClick={() => setFlipped(!flipped)}
        whileHover={{ scale: 1.02 }}
      >
        <AnimatePresence mode="wait">
          {!flipped ? (
            <motion.div key="front" initial={{ rotateY: 90 }} animate={{ rotateY: 0 }} exit={{ rotateY: -90 }}>
              <span className="font-chinese text-8xl text-white">{char.chinese}</span>
              <p className="text-sm mt-4" style={{ color: 'var(--color-text-tertiary)' }}>Tap to reveal</p>
            </motion.div>
          ) : (
            <motion.div key="back" initial={{ rotateY: 90 }} animate={{ rotateY: 0 }} exit={{ rotateY: -90 }}>
              <p className="font-display text-2xl text-white mb-2">{char.pinyin}</p>
              <p className="font-arabic text-lg text-[#a0a0a0] mb-1">{char.arabic}</p>
              <p className="text-sm text-[#a0a0a0]">{char.english}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="flex justify-center gap-4">
        <button onClick={() => handleNext(false)} className="btn-secondary flex items-center gap-2 text-sm py-2 px-6">
          <X size={14} /> Don't Know
        </button>
        <button onClick={() => handleNext(true)} className="btn-primary flex items-center gap-2 text-sm py-2 px-6">
          <Check size={14} /> Know
        </button>
      </div>
    </motion.div>
  );
}
