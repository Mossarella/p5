import p5, { Font } from "p5";
import P5Wrapper from "../commons/p5Wrapper";
import { useParams } from "next/navigation";
import { Monster } from "@/components/prefabs/monster";

let gridSize = 8;
let pixelSize = 8;
const palette = [
  "#FBF5EF",
  "#F2D3AB",
  "#C69FA5",
  "#8B6D9C",
  "#494D7E",
  "#272744",

  "#bb0011",
  //   "#ff7f00",
];
let monster: any = [];
let cols = 6;
let rows = 4;
let gapX = 60; // horizontal gap between monsters
let gapY = 60; // vertical gap between monsters

const sketch = (p: p5) => {
  p.preload = () => {};

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.rectMode("center");
    p.angleMode("degrees");
    p.noSmooth();
    p.noStroke();
    p.frameRate(60);

    // p.translate(p.windowWidth / 2, p.windowHeight / 2);
    // // p.rect(0, 0, gridSize * pixelSize * cols, gridSize * pixelSize * rows);
    // p.translate(
    //   -(gridSize * pixelSize * cols) / 2,
    //   -(gridSize * pixelSize * rows) / 2
    // );

    for (let i = 0; i < cols; i++) {
      monster[i] = [];
      for (let j = 0; j < rows; j++) {
        const posX = i * (gridSize * pixelSize + gapX);
        const posY = j * (gridSize * pixelSize + gapY);

        // p.fill("red");
        // p.ellipse(posX, posY, 20, 20);
        monster[i][j] = new Monster(
          p,
          posX,
          posY,
          palette,
          gridSize,
          pixelSize
        );
      }
    }
  };

  p.mousePressed = () => {
    const gridWidth = cols * gridSize * pixelSize + (cols - 1) * gapX;
    const gridHeight = rows * gridSize * pixelSize + (rows - 1) * gapY;

    const offsetX = p.windowWidth / 2 - gridWidth / 2;
    const offsetY = p.windowHeight / 2 - gridHeight / 2;

    const localX = p.mouseX - offsetX;
    const localY = p.mouseY - offsetY;

    // Optional: Visual debug
    // p.fill("red");
    // p.ellipse(p.mouseX, p.mouseY, 10, 10); // Raw mouse pos
    // p.fill("blue");
    // p.ellipse(localX + offsetX, localY + offsetY, 10, 10); // Translated back

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (monster[i][j].contains(localX, localY)) {
          monster[i][j].regenerate();
        }
      }
    }
  };

  p.draw = () => {
    p.background(18, 18, 18, 80);

    // const scaleAmount = 1 + 0.03 * p.sin(p.millis() / 500);
    // p.scale(scaleAmount);

    p.push();
    p.translate(p.windowWidth / 2, p.windowHeight / 2);
    p.translate(
      -(cols * gridSize * pixelSize + (cols - 1) * gapX) / 2,
      -(rows * gridSize * pixelSize + (rows - 1) * gapY) / 2
    );
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        monster[i][j].display();
      }
    }
    p.pop();
  };
};

const Sketches = () => {
  const params = useParams();
  const slug = params.sketch as string;

  return (
    <P5Wrapper
      name={slug}
      sketch={sketch}
    />
  );
};

export default Sketches;

// desc: pixel monster
