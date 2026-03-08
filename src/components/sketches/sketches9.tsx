import p5, { Font } from "p5";
import P5Wrapper from "../commons/p5Wrapper";
import { Word } from "@/components/prefabs/word";

const sketch = (p: p5) => {
  let font: Font;
  let points: { x: number; y: number }[] = [];

  p.preload = () => {
    font = p.loadFont(
      "https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf"
    );
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.rectMode("center");
    p.angleMode("degrees");

    points = font.textToPoints("T", 100, 200, 300, {
      sampleFactor: 0.2, // lower = fewer points, higher = more detailed
    });
  };

  p.draw = () => {
    p.background(0, 0, 100);
    p.translate(p.width / 2, p.height / 2);

    p.fill(0);
    p.noStroke();

    for (let pt of points) {
      let x = pt.x;
      let y = pt.y;
      if (y > 100) {
        // adjust this threshold
        x += (p.frameCount % 100) * 0.5; // stretch over time
      }

      p.ellipse(x, y, 4, 4);
    }
  };
};

const Sketches = () => {
  return <P5Wrapper sketch={sketch} />;
};

export default Sketches;
