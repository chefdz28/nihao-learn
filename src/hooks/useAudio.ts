import { useState, useCallback, useRef } from 'react';

interface UseAudioReturn {
  isPlaying: boolean;
  play: (text: string, lang?: string) => void;
  stop: () => void;
}

export function useAudio(): UseAudioReturn {
  const [isPlaying, setIsPlaying] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const stop = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    utteranceRef.current = null;
  }, []);

  const play = useCallback((text: string, lang: string = 'zh-CN') => {
    if (!window.speechSynthesis) {
      console.warn('Web Speech API not supported');
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.8; // Slightly slower for learners
    utterance.pitch = 1;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => {
      setIsPlaying(false);
      utteranceRef.current = null;
    };
    utterance.onerror = () => {
      setIsPlaying(false);
      utteranceRef.current = null;
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, []);

  return { isPlaying, play, stop };
}
