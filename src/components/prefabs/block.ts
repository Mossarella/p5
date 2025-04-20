import p5 from "p5";

export class Block {
  p: p5;
  x: number;
  y: number;
  angle: number;
  size: number;

  constructor(p: p5, x: number, y: number, size: number = 50) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.size = size;
  }

  display() {
    const { p } = this;
    p.push();
    p.translate(this.x, this.y);
    p.rotate(this.angle);
    p.rect(0, 0, this.size, this.size);
    p.pop();
  }

  move(distMouse = 50) {
    const { p } = this;
    let distance = Math.hypot(p.mouseX - this.x, p.mouseY - this.y);
    if (distance < distMouse) {
      this.angle += 1;
    }
  }
}
