import { createContext } from "react";

export interface AudioContextType {
  isPlaying: boolean;

  play: () => Promise<void>;

  pause: () => void;

  playClick: () => Promise<void>;
}

export const AudioContext =
  createContext<AudioContextType | null>(null);