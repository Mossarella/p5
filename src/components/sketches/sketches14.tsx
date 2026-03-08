import p5, { Font } from "p5";
import P5Wrapper from "../commons/p5Wrapper";
const sketch = (p: p5) => {
  let spacing = 15;
  let width = 200;
  let height = 200;

  p.keyPressed = () => {
    if (p.key === "0") {
      p.saveCanvas("mySketch", "png"); // Press 0 to save as .png
    }
  };

  p.preload = () => {
    // font = p.loadFont(
    //   "https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf"
    // );
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    // p.rectMode("center");
    p.angleMode("degrees");
    // p.noLoop();
  };

  p.draw = () => {
    p.translate(p.width / 2, p.height / 2);
    // p.background(255, 10);
    p.background(255);
    p.noFill();

    p.translate(-width / 2, -height / 2);
    p.fill("red");
    p.stroke("red");
    p.noFill();
    p.rect(0, 0, width, height);
    p.stroke("blue");

    const t = p.frameCount * 0.01;
    // const t = 0; // Time input to noise

    // 10 is the spacing between lines
    p.noiseSeed(0);
    for (let x = 0; x < width; x += spacing) {
      p.beginShape();
      for (let y = 0; y < height; y += spacing) {
        // Draws straight lines
        // p.vertex(x, y);

        // Draws bent lines
        const offX = 100 * p.noise(x * 0.005, y * 0.005, t);
        const offY = 100 * p.noise(x * 0.005, y * 0.005, 1000 + t);
        p.vertex(x + offX, y + offY);
      }
      p.endShape();
    }
    p.noiseSeed(1);

    for (let y = 0; y < height; y += spacing) {
      p.beginShape();
      for (let x = 0; x < width; x += spacing) {
        // Draws straight lines
        // p.vertex(x, y);

        // Draws bent lines
        const offX = 100 * p.noise(x * 0.005, y * 0.005, t);
        const offY = 100 * p.noise(x * 0.005, y * 0.005, 1000 + t);
        p.vertex(x + offX, y + offY);
      }
      p.endShape();
    }
  };
};

const Sketches = () => {
  return <P5Wrapper sketch={sketch} />;
};

export default Sketches;

// desc: perlin pattern
