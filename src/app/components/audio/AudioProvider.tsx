import { TapeController } from "./TapeController";
import { ScrollController } from "./ScrollController";
import { ClickPlayer } from "./ClickPlayer";
import { easeOutCubic } from "./ResponseCurve";
import { engine } from "../../core/Engine";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";

import * as Tone from "tone";
import ambient from "../../../asset/audio/ambient.mp3";

type AudioContextType = {
  isPlaying: boolean;
  play: () => Promise<void>;
  pause: () => void;
  playClick: () => Promise<void>;

  player: Tone.Player;
  gain: Tone.Gain;
  filter: Tone.Filter;
};

const AudioContext = createContext<AudioContextType | null>(
  null,
);

export function AudioProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Change the gain value to control volume

  const gain = useMemo(() => new Tone.Gain(0.25), []);

  const filter = useMemo(
    () =>
      new Tone.Filter({
        type: "lowpass",
        frequency: 18000,
        rolloff: -24,
      }),
    [],
  );

  const player = useMemo(() => {
    return new Tone.Player({
      url: ambient,
      loop: true,
      autostart: false,
    });
  }, []);

  const clickPlayer = useMemo(() => {
    return new ClickPlayer();
  }, []);

  useEffect(() => {
    player.connect(gain);
    gain.connect(filter);
    filter.toDestination();

    const tape = new TapeController(player, gain, filter);

    const controller = new ScrollController((stretch) => {
      tape.setStretch(easeOutCubic(stretch));
    });

    const removeScroll = engine.add(() => {
      controller.update();
    });

    const removeTape = engine.add(() => {
      tape.update();
    });

    engine.start();

    return () => {
      removeScroll();
      removeTape();

      engine.stop();

      controller.destroy();
      tape.destroy();

      clickPlayer.dispose();

      player.dispose();
      gain.dispose();
      filter.dispose();
    };
  }, [player, gain, filter]);

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

        player,
        gain,
        filter,
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