"use client";

import p5 from "p5";
import P5Wrapper from "../commons/p5Wrapper";

const sketch = (p: p5) => {
  let font: any;

  let pg: p5.Graphics;

  p.preload = () => {
    font = p.loadFont(
      "https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf"
    );
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    pg = p.createGraphics(800, 800);
  };

  p.draw = () => {
    p.orbitControl();

    p.background(180);

    // p.translate(p.windowWidth / 2, p.windowHeight / 2);
    p.translate(-pg.width / 2, -pg.height / 2);

    drawArt(pg);
    p.image(pg, 0, 0);
  };

  const drawArt = (g: p5.Graphics) => {
    g.clear();
    g.noFill();
    g.background(160);
    g.angleMode("degrees");
    g.strokeCap(g.SQUARE);

    // g.translate(g.width / 2, g.height / 2); // center point
  };
};

const Sketches = () => {
  return <P5Wrapper sketch={sketch} />;
};

export default Sketches;
