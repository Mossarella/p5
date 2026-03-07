"use client";

import p5 from "p5";
import P5Wrapper from "../commons/p5Wrapper";

const sketch = (p: p5) => {
  let font: any;

  let pg: p5.Graphics;

  let r = 75;
  let dashCount = 12;
  let gapRatio = 0.5; // 0 = solid, 1 = all gap, 0.5 = equal dash+gap

  let angleStep = 360 / dashCount;
  let dashAngle = angleStep * (1 - gapRatio);

  let angleSlider;

  p.preload = () => {
    font = p.loadFont(
      "https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf"
    );
  };

  p.setup = () => {
    // p.rectMode("center");
    // p.angleMode("degrees");

    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    pg = p.createGraphics(600, 600);

    angleSlider = p.createSlider(0, 360, 23, 1); // min, max, default, step
    angleSlider.position(20, 20);
    angleSlider.style("width", "200px");
  };

  p.draw = () => {
    // p.orbitControl();

    p.background(180);

    // p.translate(p.windowWidth / 2, p.windowHeight / 2);
    p.translate(-pg.width / 2, -pg.height / 2);

    drawArt(pg);
    p.image(pg, 0, 0);
  };

  const drawArt = (g: p5.Graphics) => {
    p.noLoop();

    g.clear();
    g.noFill();
    g.background(160);
    g.angleMode("degrees");
    g.strokeCap(g.SQUARE);

    g.push();
    g.translate(g.width / 2, g.height / 2); // center point

    g.push();
    g.rotate(angleSlider.value());
    console.log(angleSlider.value());
    for (let i = 0; i < dashCount; i++) {
      let start = i * angleStep;
      let end = start + dashAngle;
      g.strokeWeight(g.random(2, 7));

      g.arc(0, 0, r * 2, r * 2, start, end);
    }
    g.pop();

    for (let i = 0; i < 360; i += 30) {
      g.push();

      g.rotate(i);
      g.strokeWeight(g.random(2, 7));

      g.line(0, 50, 0, 100);
      g.pop();
    }
    g.pop();
  };
};

const Sketches = () => {
  return <P5Wrapper sketch={sketch} />;
};

export default Sketches;
