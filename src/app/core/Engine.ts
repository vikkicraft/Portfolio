type UpdateCallback = (delta: number) => void;

export class Engine {
  private callbacks = new Set<UpdateCallback>();

  private lastTime = performance.now();

  private animationFrame = 0;
  private running = false;

  add(callback: UpdateCallback) {
    this.callbacks.add(callback);

    return () => {
      this.callbacks.delete(callback);
    };
  }

  start() {
    if (this.running) return;

    this.running = true;

    const loop = (time: number) => {
      const delta = (time - this.lastTime) / 1000;

      this.lastTime = time;

      this.callbacks.forEach((callback) => {
        callback(delta);
      });

      this.animationFrame = requestAnimationFrame(loop);
    };

    this.animationFrame = requestAnimationFrame(loop);
  }

  stop() {
    this.running = false;

    cancelAnimationFrame(this.animationFrame);
  }
}

export const engine = new Engine();