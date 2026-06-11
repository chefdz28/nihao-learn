import { Volume2, Square } from 'lucide-react';
import { useAudio } from '@/hooks/useAudio';

interface AudioButtonProps {
  text: string;
  lang?: string;
  size?: 'sm' | 'md' | 'lg';
  showPulse?: boolean;
}

const sizeMap = {
  sm: { btn: 'w-8 h-8', icon: 14 },
  md: { btn: 'w-10 h-10', icon: 16 },
  lg: { btn: 'w-14 h-14', icon: 22 },
};

export default function AudioButton({ text, lang = 'zh-CN', size = 'md', showPulse = true }: AudioButtonProps) {
  const { isPlaying, play, stop } = useAudio();
  const s = sizeMap[size];

  const handleClick = () => {
    if (isPlaying) {
      stop();
    } else {
      play(text, lang);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`${s.btn} rounded-full flex items-center justify-center transition-all ${
        isPlaying
          ? 'bg-[#FF3333] text-white'
          : 'bg-white/5 border border-white/10 text-[#a0a0a0] hover:text-white hover:border-[#FF3333]/30'
      }`}
      aria-label={isPlaying ? 'Stop audio' : `Play pronunciation of ${text}`}
      title={isPlaying ? 'Stop' : `Play: ${text}`}
    >
      {isPlaying ? (
        <Square size={s.icon * 0.6} className={showPulse ? 'animate-pulse' : ''} />
      ) : (
        <Volume2 size={s.icon} />
      )}
    </button>
  );
}
