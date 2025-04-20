import p5, { Font } from "p5";
import P5Wrapper from "../commons/p5Wrapper";
import { Block4 } from "@/components/prefabs/blocks4";
const sketch = (p: p5) => {
  let numAxis = 8;
  let r = 10;
  let size = 50;
  let rows = 6;
  let cols = 6;
  let blocks: any = [];
  let font: Font;
  let message: string = "O";
  let messagePoints: any = [];
  let fontX;
  let fontY;
  let fontSize = 400;

  p.preload = () => {
    font = p.loadFont("/fonts/NotoSansJP-Regular.ttf");
    // font = p.loadFont(
    //   "https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf"
    // );
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    // p.rectMode("center");
    p.angleMode("degrees");
    cols = p.width / size;
    rows = p.height / size;

    let bounds = font.textBounds(message, 0, 0, fontSize) as any;

    let centerOffsetX = bounds.x + bounds.w / 2;
    let centerOffsetY = bounds.y + bounds.h / 2;
    p.push();

    p.translate(-centerOffsetX, -centerOffsetY);
    messagePoints = font.textToPoints(
      message,
      -centerOffsetX,
      -centerOffsetY,
      fontSize
    );

    for (let i = 0; i < cols; i++) {
      blocks[i] = [];
      for (let j = 0; j < rows; j++) {
        blocks[i][j] = new Block4(
          p,
          size / 2 + i * size - (size * cols) / 2,
          size / 2 + j * size - (size * rows) / 2,
          50
        );
      }
    }
    p.pop();
  };

  p.draw = () => {
    p.background(70, 148, 167);

    let distance;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        for (let k = 0; k < messagePoints.length; k++) {
          distance = p.dist(
            messagePoints[k].x,
            messagePoints[k].y,
            blocks[i][j].x,
            blocks[i][j].y
          );

          if (distance < 20) {
            blocks[i][j].isLetter = true;
          }
        }
        blocks[i][j].display();
      }
    }

    // let bounds = font.textBounds(message, 0, 0, fontSize) as {
    //   x: number;
    //   y: number;
    //   w: number;
    //   h: number;
    // };

    // bounds.x, bounds.y, bounds.w, bounds.h

    // // 1. Calculate real center offset
    // let centerOffsetX = bounds.x + bounds.w / 2;
    // let centerOffsetY = bounds.y + bounds.h / 2;

    // // 2. Move the text so bounds center = screen center
    // p.push();
    // p.translate(p.width / 2 - centerOffsetX, p.height / 2 - centerOffsetY);

    // p.textAlign(p.LEFT, p.BASELINE); // ⚠️ Important: force left-baseline alignment
    // p.textSize(fontSize);
    // p.textFont(font);
    // p.fill(255);
    // p.text(message, 0, 0);

    // p.pop();
  };
};

const Sketches = () => {
  return <P5Wrapper sketch={sketch} />;
};

export default Sketches;
