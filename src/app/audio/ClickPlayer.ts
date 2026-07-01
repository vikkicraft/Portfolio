import * as Tone from "tone";
import { AUDIO } from "./config";

export class ClickPlayer {
  private player: Tone.Player;

  constructor(url: string) {
    this.player = new Tone.Player({
      url,
      autostart: false,
    }).toDestination();

    // Slightly reduce click volume
    this.player.volume.value = AUDIO.clickVolume;
  }

  async play() {
    await Tone.start();

    if (this.player.state === "started") {
      this.player.stop();
    }

    this.player.start();
  }

  dispose() {
    this.player.dispose();
  }
}