import { AUDIO } from "./config";

export class ScrollController {
  constructor(private onStretch: (stretch: number) => void) {
    window.addEventListener("wheel", this.handleWheel, {
      passive: true,
    });
  }

  private handleWheel = (event: WheelEvent) => {
    // Normalize wheel movement
    const delta =
      event.deltaMode === WheelEvent.DOM_DELTA_LINE
        ? Math.abs(event.deltaY) * 16
        : Math.abs(event.deltaY);

    // Convert to 0–1
    const normalized = delta / AUDIO.wheelSensitivity;

    const stretch = Math.min(normalized, 1);

    this.onStretch(stretch);
  };

  destroy() {
    window.removeEventListener("wheel", this.handleWheel);
  }
}