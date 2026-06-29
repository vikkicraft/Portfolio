import { Spring } from "./Spring";
import { interaction } from "./InteractionState";

export class ScrollController {
  private spring = new Spring();

  private gestureVelocity = 0;

  constructor(private onUpdate: (stretch: number) => void) {
    window.addEventListener("wheel", this.handleWheel, {
      passive: true,
    });
  }

  private handleWheel = (event: WheelEvent) => {
    const delta = Math.abs(event.deltaY);

    // Normalize different devices
    const normalized =
      event.deltaMode === WheelEvent.DOM_DELTA_LINE
        ? delta * 16
        : delta;

    this.gestureVelocity += normalized * 0.0025;

    this.gestureVelocity = Math.min(this.gestureVelocity, 1);
  };

  update = () => {
    const stretch = this.spring.value;

    this.spring.push(this.gestureVelocity);

    this.spring.update();

    interaction.stretch = this.spring.value;

    this.onUpdate(interaction.stretch);

    this.gestureVelocity *= 0.96;

    if (this.gestureVelocity < 0.0005) {
      this.gestureVelocity = 0;
    }
  };

  destroy() {
  window.removeEventListener(
    "wheel",
    this.handleWheel
  );
}}