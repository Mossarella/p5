import p5, { Font } from "p5";
import P5Wrapper from "../commons/p5Wrapper";
import { Smiley } from "@/components/prefabs/smiley";
const sketch = (p: p5) => {
  let size = 130;
  let cols = 6;
  let rows = 5;
  let smiley: any = [];
  p.preload = () => {};

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.rectMode("center");
    p.angleMode("degrees");

    for (let i = 0; i < cols; i++) {
      smiley[i] = [];
      for (let j = 0; j < rows; j++) {
        smiley[i][j] = new Smiley(p, i * size, j * size, size);
      }
    }
  };

  p.draw = () => {
    p.background(70, 148, 167);

    p.translate(size / 2 - (size * cols) / 2, size / 2 - (size * rows) / 2);
    p.translate(p.width / 2, p.height / 2);

    let mouseOffsetX = size / 2 - (size * cols) / 2 + p.width / 2;
    let mouseOffsetY = size / 2 - (size * rows) / 2 + p.height / 2;

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        smiley[i][j].display(mouseOffsetX, mouseOffsetY);
      }
    }
  };
};

const Sketches = () => {
  return <P5Wrapper sketch={sketch} />;
};

export default Sketches;
