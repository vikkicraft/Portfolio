import * as Tone from "tone";
import { AUDIO } from "./config";

export class TapeController {
  private targetStretch = 0;

  private currentStretch = 0;

  private animationFrame = 0;

  private running = false;

  constructor(
    private player: Tone.Player,
    private gain: Tone.Gain,
    private filter: Tone.Filter,
  ) {}

  setStretch(stretch: number) {
    this.targetStretch = Math.min(
      this.targetStretch + stretch * AUDIO.stretchImpulse,
      1,
    );

    if (!this.running) {
      this.running = true;
      this.animate();
    }
  }

  private animate = () => {
    // Smoothly move toward the target
    this.currentStretch +=
      (this.targetStretch - this.currentStretch) *
      AUDIO.smoothing;

    const stretch = this.currentStretch;

    // Tape slowdown
    this.player.playbackRate =
      1 - stretch * AUDIO.playbackDepth;

    // Halo filter
    this.filter.frequency.value =
      AUDIO.filterBase - stretch * AUDIO.filterDepth;

    // Small volume dip
    this.gain.gain.value =
      AUDIO.volume - stretch * AUDIO.gainDip;

    // Let the target slowly lose energy
    this.targetStretch *= 0.9;

    if (this.targetStretch < 0.001) {
      this.targetStretch = 0;
    }

    // Stop animation when everything is back to rest.
    const settled =
      this.targetStretch === 0 &&
      Math.abs(stretch) < AUDIO.settleThreshold;

    if (settled) {
      this.currentStretch = 0;

      this.player.playbackRate = 1;
      this.filter.frequency.value = AUDIO.filterBase;
      this.gain.gain.value =
        AUDIO.volume - stretch * AUDIO.gainDip;

      this.running = false;
      return;
    }

    this.animationFrame = requestAnimationFrame(this.animate);
  };

  destroy() {
    this.running = false;

    cancelAnimationFrame(this.animationFrame);
  }
}