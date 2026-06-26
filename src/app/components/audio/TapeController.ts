import * as Tone from "tone";
import { Spring } from "./Spring";

export class TapeController {
  private spring = new Spring();
  private animationFrame = 0;

  constructor(
    private player: Tone.Player,
    private gain: Tone.Gain,
    private filter: Tone.Filter,
  ) {
    this.animate();
  }

  setStretch(value: number) {
    this.spring.push(Math.max(0, Math.min(1, value)));
  }

  private animate = () => {
    // Smooth interpolation
    this.spring.update();

    const stretch = this.spring.value;

    // Gain
    this.gain.gain.value = 0.50;

    // Halo
    this.filter.frequency.rampTo(20000 - stretch * 14000, 0.08);
    // Tape
    this.player.playbackRate = 1.0 - stretch * 0.18;
    this.animationFrame = requestAnimationFrame(this.animate);
  };

  destroy() {
    cancelAnimationFrame(this.animationFrame);
  }
}