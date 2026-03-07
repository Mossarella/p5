import p5, { Font } from "p5";
import P5Wrapper from "../commons/p5Wrapper";
import { Block4 } from "@/components/prefabs/blocks4";
const sketch = (p: p5) => {
  let space: number = 50;
  let gridWidth: number = 500;
  let gridHeight: number = 500;

  p.preload = () => {
    // font = p.loadFont(
    //   "https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf"
    // );
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.rectMode("center");
    p.angleMode("degrees");
  };

  p.draw = () => {
    p.orbitControl();
    // p.translate(p.width / 2, p.height / 2);

    p.background(70, 148, 167);

    p.fill(0);
    p.stroke(0);
    p.strokeWeight(3);

    p.translate(-gridWidth / 2, -gridHeight / 2);

    for (let x = 0; x <= gridWidth; x += space) {
      for (let y = 0; y <= gridHeight; y += space) {
        if (x < gridWidth) {
          p.line(x, y, x + space, y);
        } // horizontal
        if (y < gridHeight) {
          p.line(x, y, x, y + space);
        } // vertical

        if (x < gridHeight && y < gridHeight) {
          p.square(x + space / 2, y + space / 2, 10); //center
        }

        p.square(x, y, 10); //intersection
      }
    }
  };
};

const Sketches = () => {
  return <P5Wrapper sketch={sketch} />;
};

export default Sketches;

// desc: perlin pattern
