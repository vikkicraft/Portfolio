import * as Tone from "tone";
import click from "../../../asset/audio/click.mp3";

export class ClickPlayer {
  private player = new Tone.Player({
    url: click,
    volume: -18,
  }).toDestination();

  async play() {
    await Tone.start();

    // Restart if already playing
    this.player.stop();
    this.player.start();
  }

  dispose() {
    this.player.dispose();
  }
}