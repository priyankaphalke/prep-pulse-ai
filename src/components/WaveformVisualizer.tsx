import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

interface WaveformVisualizerProps {
  isRecording: boolean;
  audioStream?: MediaStream | null;
}

export function WaveformVisualizer({ isRecording, audioStream }: WaveformVisualizerProps) {
  const [bars, setBars] = useState<number[]>(Array(40).fill(4));
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRecording && audioStream) {
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(audioStream);
      const analyzer = audioContext.createAnalyser();
      analyzer.fftSize = 128;
      source.connect(analyzer);
      analyzerRef.current = analyzer;

      const bufferLength = analyzer.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const updateBars = () => {
        if (!analyzerRef.current) return;
        
        analyzerRef.current.getByteFrequencyData(dataArray);
        
        const newBars = Array.from({ length: 40 }, (_, i) => {
          const index = Math.floor((i / 40) * bufferLength);
          const value = dataArray[index] || 0;
          return Math.max(4, (value / 255) * 60);
        });
        
        setBars(newBars);
        animationRef.current = requestAnimationFrame(updateBars);
      };

      updateBars();

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        audioContext.close();
      };
    } else {
      setBars(Array(40).fill(4));
    }
  }, [isRecording, audioStream]);

  return (
    <div className="flex items-center justify-center gap-[3px] h-16 px-4">
      {bars.map((height, index) => (
        <motion.div
          key={index}
          className={`w-1 rounded-full ${isRecording ? 'bg-primary' : 'bg-muted-foreground/30'}`}
          animate={{
            height: height,
            opacity: isRecording ? 0.8 + (height / 60) * 0.2 : 0.3,
          }}
          transition={{
            duration: 0.05,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}
