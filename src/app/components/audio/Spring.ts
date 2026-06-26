export class Spring {
  value = 0;
  velocity = 0;
  target = 0;

  stiffness = 0.035;
  damping = 0.88;

  push(amount: number) {
    this.target = amount;
  }

  update() {
    const force =
      (this.target - this.value) *
      this.stiffness;

    this.velocity += force;

    this.velocity *= this.damping;

    this.value += this.velocity;

    return this.value;
  }

  reset() {
    this.target = 0;
  }
}