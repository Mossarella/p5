import p5, { Font } from "p5";
import { easeInQuad } from "./easing";

export class Word {
  p: p5;
  r: number;
  sentence: string;
  sentenceArray: string[];
  x: number;
  y: number;
  angle: number = 0;
  dir: number;
  angleInc: number;
  a: number;
  s: number;
  amt: number;
  min: number;
  font: Font;

  constructor(
    p: p5,
    r: number,
    sentence: string,
    dir: number,
    angleInc: number,
    a: number,
    s: number,
    font: Font
  ) {
    this.p = p;
    this.dir = dir;
    this.font = font;

    this.r = r;
    this.sentence = sentence;
    this.sentenceArray = sentence.split("");

    this.x = r * p.cos(this.angle);
    this.y = r * p.sin(this.angle);

    this.amt = 0;
    this.min = 0;
    this.angleInc = angleInc;
    this.a = a;
    this.s = s;
  }

  update() {
    this.angle = this.min + easeInQuad(this.amt) * this.angleInc;

    if (this.amt > 1) {
      this.amt = 0;
      this.min += this.angleInc;
    } else {
      this.amt += 0.01;
    }
  }

  display() {
    const { p } = this;

    p.noStroke();
    p.fill(255, this.a);
    p.textSize(this.s);
    // p.textFont(this.font);

    p.push();
    p.rotate(this.angle * this.dir);
    for (let i = 0; i < this.sentenceArray.length; i++) {
      let startingAngle = 360 / this.sentenceArray.length;
      p.rotate(startingAngle);
      p.text(this.sentenceArray[i], this.x, this.y);
    }
    p.pop();
  }
}
