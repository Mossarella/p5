"use client";

import p5 from "p5";
import P5Wrapper from "../commons/p5Wrapper";

const sketch = (p: p5) => {
  let font: any;
  const message = "a";
  const fontSize = 800;
  const cols = 6;
  const rows = 6;
  let graphics: p5.Graphics;

  p.preload = () => {
    font = p.loadFont(
      "https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf"
    );
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    graphics = p.createGraphics(p.width, p.height);
    graphics.background(0);
    graphics.textFont(font);
    graphics.textSize(fontSize);
    graphics.fill(255);
    graphics.textAlign(p.CENTER, p.CENTER);
    graphics.text(message, graphics.width / 2, graphics.height / 2);
  };

  p.draw = () => {
    p.background(0);

    const tileW = p.width / cols;
    const tileH = p.height / rows;

    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        const sx = x * tileW;
        const sy = y * tileH;
        const dx = sx + p.sin(p.frameCount * 0.05 + x + y) * 10;
        const dy = sy + p.cos(p.frameCount * 0.05 + x + y) * 10;

        p.copy(graphics, sx, sy, tileW, tileH, dx, dy, tileW, tileH);
      }
    }
  };
};

export default function TextWarpPage() {
  return (
    <P5Wrapper
      sketch={sketch}
      name="TextWarp"
    />
  );
}
