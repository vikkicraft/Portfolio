import {
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as Tone from "tone";

import ambient from "../../asset/audio/ambient.mp3";
import click from "../../asset/audio/click.mp3";

import { AUDIO } from "./config";
import { AudioContext } from "./AudioContext";
import { ClickPlayer } from "./ClickPlayer";
import { ScrollController } from "./ScrollController";
import { TapeController } from "./TapeController";

interface Props {
  children: ReactNode;
}

export function AudioProvider({ children }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Ambient soundtrack
  const player = useMemo(
    () =>
      new Tone.Player({
        url: ambient,
        loop: true,
        autostart: false,
        fadeIn: 0.05,
        fadeOut: 0.08,
      }),
    [],
  );

  // Master gain
  const gain = useMemo(() => new Tone.Gain(AUDIO.volume), []);

  // Halo filter
  const filter = useMemo(
    () =>
      new Tone.Filter({
        type: "lowpass",
        frequency: AUDIO.filterBase,
        rolloff: -24,
      }),
    [],
  );

  // Click sound
  const clickPlayer = useMemo(() => new ClickPlayer(click), []);

  useEffect(() => {
    // Player → Gain → Filter → Speakers
    player.connect(gain);
    gain.connect(filter);
    filter.toDestination();

    // Controllers
    const tape = new TapeController(player, gain, filter);

    const scroll = new ScrollController(
      tape.setStretch.bind(tape),
    );

    return () => {
      scroll.destroy();
      tape.destroy();

      player.dispose();
      gain.dispose();
      filter.dispose();
      clickPlayer.dispose();
    };
  }, [player, gain, filter, clickPlayer]);

  const play = async () => {
    await Tone.start();

    if (player.state !== "started") {
      player.start();
      setIsPlaying(true);
    }
  };

  const pause = () => {
    if (player.state === "started") {
      player.stop();
      setIsPlaying(false);
    }
  };

  const playClick = async () => {
    if (!isPlaying) return;

    await clickPlayer.play();
  };

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        play,
        pause,
        playClick,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);

  if (!context) {
    throw new Error(
      "useAudio must be used inside AudioProvider",
    );
  }

  return context;
}