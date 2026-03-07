"use client";

import p5 from "p5";
import P5Wrapper from "../commons/p5Wrapper";

const sketch = (p: p5) => {
  let font: any;

  let size = 80;
  const cols = 6;
  const rows = 6;
  let gap = 20;
  let pg: p5.Graphics;

  p.preload = () => {
    font = p.loadFont(
      "https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf"
    );
  };

  p.setup = () => {
    p.rectMode("center");
    p.angleMode("degrees");

    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    pg = p.createGraphics(600, 600);
  };

  p.draw = () => {
    p.orbitControl();
    // p.noLoop();

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
    g.stroke(2);
    g.strokeWeight(2);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = i * (size + gap);
        let y = j * (size + gap);
        g.rect(x, y, size, size);
        g.rect(x + size / 4, y + size / 4, size / 2, size / 2);
        g.rect(x + size / 8, y + size / 8, size / 4, size / 4);
        g.rect(x + size / 16, y + size / 16, size / 8, size / 8);
      }
    }
  };
};

const Sketches = () => {
  return <P5Wrapper sketch={sketch} />;
};

export default Sketches;
