import p5, { Font } from "p5";
import P5Wrapper from "../commons/p5Wrapper";
const sketch = (p: p5) => {
  let space: number = 20;
  let gridWidth: number = 200;
  let gridHeight: number = 200;

  p.preload = () => {
    // font = p.loadFont(
    //   "https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf"
    // );
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.rectMode("center");
    p.angleMode("degrees");

    p.translate(p.width / 2, p.height / 2);

    p.background(70, 148, 167);

    p.fill(0);
    p.stroke(0);
    p.strokeWeight(2);

    p.translate(-gridWidth / 2, -gridHeight / 2);

    for (let x = 0; x <= gridWidth; x += space) {
      for (let y = 0; y <= gridHeight; y += space) {
        // if (x < gridWidth) {
        //   p.line(x, y, x + space, y);
        // } // horizontal
        // if (y < gridHeight) {
        //   p.line(x, y, x, y + space);
        // } // vertical

        if (x < gridHeight && y < gridHeight) {
          let c = p.random(0, 2);

          if (c < 1) {
            p.line(x, y, x + space, y + space);
          } else if (c < 2) {
            p.line(x, y + space, x + space, y);
          } else if (c < 3) {
            p.line(x, y, x, y + space);
          } else if (c < 4) {
            p.line(x, y, x + space, y);
          }
        }
      }
    }
  };

  p.draw = () => {};
};

const Sketches = () => {
  return <P5Wrapper sketch={sketch} />;
};

export default Sketches;

// desc: perlin pattern
