import p5 from "p5";

export class Block4 {
  p: p5;
  x: number;
  y: number;
  size: number;
  isLetter: boolean = false;
  angle: number = 0;
  depth: number = 0;
  constructor(p: p5, x: number, y: number, size: number) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.size = size;
  }

  display() {
    const { p } = this;
    // let x = p.map(p.mouseX, 0, p.width, 0, 360);

    p.stroke(255, 100);
    p.noFill();
    if (this.isLetter == true) {
      p.stroke(255);
      this.angle += 1;
      this.depth += 1 * p.sin(this.angle);
    } else {
      this.angle -= 1;
    }

    p.push();
    p.translate(this.x, this.y, this.depth);

    p.rotateX(this.angle);
    p.rotateY(this.angle);
    p.rotateZ(this.angle);

    p.box(this.size - (1 / 3) * this.size);
    p.pop();
  }
}
